import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleList } from "@/components/Articles";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { DEVTO_PROFILE, useDevtoArticles } from "@/lib/devto";
import { cn } from "@/lib/utils";

export function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const { status, articles } = useDevtoArticles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Tags ordenadas pela quantidade de artigos
  const counts = new Map<string, number>();
  articles.forEach((a) => a.tag_list.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const tags = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const total = tag ? (counts.get(tag) ?? 0) : articles.length;
  const summary =
    status === "ready"
      ? `${total} ${total === 1 ? "artigo" : "artigos"}${tag ? ` com a tag #${tag}` : ""}, publicados no dev.to`
      : "Artigos publicados no dev.to";

  const filterButton = (value: string | null, label: string, count: number) => {
    const active = tag === value;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={active}
        onClick={() => setSearchParams(value ? { tag: value } : {})}
        className={cn(
          "flex h-12 shrink-0 items-center gap-2 border-r border-line px-4 font-mono text-label transition-colors sm:px-5",
          active ? "text-ink" : "text-dim hover:text-ink",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("size-1.5 bg-signal transition-opacity", active ? "opacity-100" : "opacity-0")}
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

          {tags.length > 0 && (
            <div className="sticky top-14 z-30 border-y border-line bg-bg">
              <div role="group" aria-label="Filtrar artigos por tag" className="no-scrollbar flex overflow-x-auto">
                {filterButton(null, "Todos", articles.length)}
                {tags.map(([t, n]) => filterButton(t, `#${t}`, n))}
              </div>
            </div>
          )}

          <div className="px-4 pt-10 pb-16 sm:px-8 md:pb-24 lg:px-12">
            <ArticleList showDescription tag={tag} />
          </div>
        </main>
        <Footer />
      </Frame>
    </>
  );
}
