import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ferramentas-favoritas";
const EVENT = "ferramentas-favoritas";

function read(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** Slugs das ferramentas favoritas, guardados no navegador do visitante. */
export function useFavoriteTools() {
  const [favorites, setFavorites] = useState<string[]>(read);

  // Mantém o índice e a página da ferramenta em sincronia (e entre abas)
  useEffect(() => {
    const sync = () => setFavorites(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      const next = favorites.includes(slug) ? favorites.filter((s) => s !== slug) : [...favorites, slug];
      setFavorites(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(EVENT));
      } catch {
        // Sem storage (aba anônima, bloqueado): o favorito vale só nesta visita
      }
    },
    [favorites],
  );

  return { favorites, isFavorite: (slug: string) => favorites.includes(slug), toggle };
}
