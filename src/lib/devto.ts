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
