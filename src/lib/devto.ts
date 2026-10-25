import { useEffect, useState } from "react";

const DEVTO_USERNAME = "lucasharosa";
export const DEVTO_PROFILE = `https://dev.to/${DEVTO_USERNAME}`;

/** Campos usados da API pública do dev.to (GET /api/articles). */
export interface DevtoArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
  cover_image: string | null;
}

/**
 * Categorias do site. As tags do dev.to são muitas e genéricas (webdev,
 * programming…), então cada artigo entra nas categorias das suas tags.
 * Para uma tag nova cair numa categoria, basta incluí-la aqui.
 */
export const ARTICLE_CATEGORIES = [
  {
    value: "ia",
    label: "IA",
    tags: ["ai", "llm", "rag", "machinelearning", "genai", "openai", "agents", "mcp", "promptengineering", "claude"],
  },
  {
    value: "system-design",
    label: "System Design",
    tags: ["systemdesign", "architecture", "distributedsystems", "microservices", "scalability", "designpatterns", "cloud"],
  },
  {
    value: "back-end",
    label: "Back-end",
    tags: ["backend", "node", "nodejs", "nestjs", "java", "springboot", "python", "fastapi", "go", "golang", "api", "database", "postgres", "sql", "docker", "kubernetes", "devops"],
  },
  {
    value: "front-end",
    label: "Front-end",
    tags: ["frontend", "javascript", "typescript", "react", "nextjs", "css", "html", "webdev", "reactnative", "mobile"],
  },
  {
    value: "fundamentos",
    label: "Fundamentos",
    tags: ["computerscience", "programming", "algorithms", "datastructures", "beginners", "learning", "career"],
  },
] as const;

/** Artigo sem nenhuma tag mapeada. */
export const OTHER_CATEGORY = { value: "outros", label: "Outros" } as const;

export function articleCategories(article: DevtoArticle): string[] {
  const found = ARTICLE_CATEGORIES.filter((c) => article.tag_list.some((t) => (c.tags as readonly string[]).includes(t)));
  return found.length ? found.map((c) => c.value) : [OTHER_CATEGORY.value];
}

type State =
  | { status: "loading"; articles: [] }
  | { status: "ready"; articles: DevtoArticle[] }
  | { status: "error"; articles: [] };

/** O dev.to devolve título e resumo com entidades HTML (ex.: &gt;). */
function decodeEntities(text: string) {
  return new DOMParser().parseFromString(text, "text/html").documentElement.textContent ?? text;
}

// Uma única requisição por visita, compartilhada entre a Home e /blog.
let request: Promise<DevtoArticle[]> | null = null;

function fetchArticles() {
  if (!request) {
    request = fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=100`)
      .then((res) => {
        if (!res.ok) throw new Error(`dev.to respondeu ${res.status}`);
        return res.json() as Promise<DevtoArticle[]>;
      })
      .then((articles) =>
        articles.map((a) => ({
          ...a,
          title: decodeEntities(a.title),
          description: decodeEntities(a.description ?? ""),
        })),
      )
      .catch((error) => {
        request = null; // permite tentar de novo na próxima montagem
        throw error;
      });
  }
  return request;
}

/** Artigos publicados no dev.to, do mais recente para o mais antigo. */
export function useDevtoArticles(): State {
  const [state, setState] = useState<State>({ status: "loading", articles: [] });

  useEffect(() => {
    let alive = true;
    fetchArticles()
      .then((articles) => alive && setState({ status: "ready", articles }))
      .catch((error) => {
        console.error("Falha ao carregar artigos do dev.to:", error);
        if (alive) setState({ status: "error", articles: [] });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

export function formatArticleDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC", // mesma data exibida no dev.to
  });
}
