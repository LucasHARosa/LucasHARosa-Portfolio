import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleList } from "@/components/Articles";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { ARTICLE_CATEGORIES, articleCategories, DEVTO_PROFILE, OTHER_CATEGORY, useDevtoArticles } from "@/lib/devto";
import { cn } from "@/lib/utils";

export function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { status, articles } = useDevtoArticles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Só aparecem as categorias que têm artigo, na ordem de ARTICLE_CATEGORIES
  const counts = new Map<string, number>();
  articles.forEach((a) => articleCategories(a).forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));
  const categories = [...ARTICLE_CATEGORIES, OTHER_CATEGORY].filter((c) => counts.has(c.value));

  const param = searchParams.get("categoria");
  const active = categories.find((c) => c.value === param);
  const categoria = active?.value ?? null;

  const total = categoria ? (counts.get(categoria) ?? 0) : articles.length;
  const summary =
    status === "ready"
      ? `${total} ${total === 1 ? "artigo" : "artigos"}${active ? ` em ${active.label}` : ""}, publicados no dev.to`
      : "Artigos publicados no dev.to";

  const filterButton = (value: string | null, label: string, count: number) => {
    const pressed = categoria === value;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={pressed}
        onClick={() => setSearchParams(value ? { categoria: value } : {})}
        className={cn(
          "flex h-12 shrink-0 items-center gap-2 border-r border-line px-4 font-mono text-label transition-colors sm:px-5",
          pressed ? "text-ink" : "text-dim hover:text-ink",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("size-1.5 bg-signal transition-opacity", pressed ? "opacity-100" : "opacity-0")}
        />
        {label}
        <span className="text-dim">{count}</span>
      </button>
    );
  };

  return (
    <>
      <PageMeta path="/blog" />

      <Frame>
        <Header />
        <main>
          <header className="grid gap-4 px-4 pt-16 pb-10 sm:px-8 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-14 lg:px-12">
            <div className="md:col-span-7">
              <h1 className="font-mono text-h2 tracking-tight">Artigos</h1>
            </div>
            <div className="flex flex-col items-start gap-4 md:col-span-5 md:self-end">
              <p className="text-dim" aria-live="polite">
                {summary}
              </p>
              <Button href={DEVTO_PROFILE} variant="ghost" className="underline decoration-line-strong underline-offset-4">
                Seguir no dev.to
              </Button>
            </div>
          </header>

          {categories.length > 0 && (
            <div className="sticky top-14 z-30 border-y border-line bg-bg">
              <div role="group" aria-label="Filtrar artigos por categoria" className="no-scrollbar flex overflow-x-auto">
                {filterButton(null, "Todos", articles.length)}
                {categories.map((c) => filterButton(c.value, c.label, counts.get(c.value) ?? 0))}
              </div>
            </div>
          )}

          <div className="px-4 pt-10 pb-16 sm:px-8 md:pb-24 lg:px-12">
            <ArticleList showDescription categoria={categoria} categoriaLabel={active?.label} />
          </div>
        </main>
        <Footer />
      </Frame>
    </>
  );
}
