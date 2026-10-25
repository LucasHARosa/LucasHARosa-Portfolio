// Pós-build: gera um HTML por rota com título, descrição e URL próprios.
// Robôs de prévia (WhatsApp, LinkedIn, X, Discord) não executam JavaScript,
// então leem só as meta tags do HTML servido — o Helmet não chega até eles.
// Com `cleanUrls` (vercel.json) e no GitHub Pages, /projetos serve projetos.html.
// As rotas vêm de src/data/routes.json e src/data/ferramentas.json, os mesmos
// arquivos que as páginas usam no <Helmet>.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SITE = "https://lucasrosa.dev.br";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const pages = readJson("src/data/routes.json");
const ferramentas = readJson("src/data/ferramentas.json");

const routes = [
  ...Object.entries(pages).map(([path, meta]) => ({ path, ...meta })),
  // Mesmo título que src/pages/Tools/Tool.tsx
  ...ferramentas.map((f) => ({
    path: `/ferramentas/${f.slug}`,
    title: `${f.nome} | Lucas Rosa`,
    description: f.descricao,
  })),
];

const base = readFileSync("dist/index.html", "utf8");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" não encontrada em dist/index.html`);
  return html.replace(re, `$1${value}$2`);
}

function write(file, html) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`route-meta: ${file}`);
}

for (const route of routes) {
  const url = SITE + route.path;
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  write(`dist${route.path}.html`, html);
  // Rota que também é pasta (/ferramentas e /ferramentas/uuid): o GitHub Pages
  // prioriza a pasta, então ela precisa do próprio index.html.
  if (routes.some((r) => r.path.startsWith(`${route.path}/`))) {
    write(`dist${route.path}/index.html`, html);
  }
}
