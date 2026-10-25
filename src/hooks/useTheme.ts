import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const THEME_COLORS: Record<Theme, string> = {
  dark: "#000000",
  light: "#F2F1EC",
};

/** O claro é o padrão; o escuro só quando escolhido (salvo no localStorage). */
function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** Tema atual (aplicado em <html data-theme>) e alternância persistida. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[next]);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // armazenamento indisponível: o tema vale só para esta visita
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(readTheme() === "dark" ? "light" : "dark"),
    [setTheme],
  );

  return { theme, setTheme, toggleTheme };
}
