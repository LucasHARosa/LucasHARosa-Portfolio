// Pós-build: gera um HTML por rota com título, descrição e URL próprios.
// Robôs de prévia (WhatsApp, LinkedIn, X, Discord) não executam JavaScript,
// então leem só as meta tags do HTML servido — o Helmet não chega até eles.
// Com `cleanUrls` (vercel.json) e no GitHub Pages, /projetos serve projetos.html.
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://lucasrosa.dev.br";

const routes = [
  {
    file: "projetos.html",
    path: "/projetos",
    title: "Projetos | Lucas Rosa",
    description:
      "Projetos de back-end, full-stack, front-end, mobile e IA: APIs em Java, Node.js, Python e Go, aplicações web em React e Next.js e apps em React Native.",
  },
  {
    file: "blog.html",
    path: "/blog",
    title: "Artigos | Lucas Rosa",
    description:
      "Artigos de Lucas Rosa sobre JavaScript, React e desenvolvimento de software, publicados no dev.to.",
  },
];

const base = readFileSync("dist/index.html", "utf8");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" não encontrada em dist/index.html`);
  return html.replace(re, `$1${value}$2`);
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
  writeFileSync(`dist/${route.file}`, html);
  console.log(`route-meta: dist/${route.file}`);
}
