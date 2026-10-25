import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  DEVTO_PROFILE,
  formatArticleDate,
  useDevtoArticles,
  type DevtoArticle,
} from "@/lib/devto";

const HOME_LIMIT = 3;

function ArticleRow({ article, showDescription }: { article: DevtoArticle; showDescription?: boolean }) {
  return (
    <li className="border-b border-line">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid gap-x-6 gap-y-2 py-6 md:grid-cols-[8rem_1fr_auto] md:items-baseline"
      >
        <time dateTime={article.published_at} className="font-mono text-label text-dim">
          {formatArticleDate(article.published_at)}
        </time>
        <div className="min-w-0">
          <h3 className="text-lead leading-snug font-medium tracking-tight transition-colors group-hover:text-signal">
            {article.title}
          </h3>
          {showDescription && article.description && (
            <p className="mt-2 max-w-read text-[0.9375rem] leading-relaxed text-dim">{article.description}</p>
          )}
          {article.tag_list.length > 0 && (
            <p className="mt-3 font-mono text-label text-dim">
              {article.tag_list.map((tag) => `#${tag}`).join("  ")}
            </p>
          )}
        </div>
        <p className="flex items-center gap-3 font-mono text-label text-dim md:justify-end">
          <span>{article.reading_time_minutes} min de leitura</span>
          <ArrowUpRight
            className="size-4 shrink-0 transition-colors group-hover:text-ink"
            aria-label="abre no dev.to"
          />
        </p>
      </a>
    </li>
  );
}

function SkeletonRows({ count }: { count: number }) {
  return (
    <ol aria-hidden="true" className="border-t border-line">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="grid gap-x-6 gap-y-3 border-b border-line py-6 md:grid-cols-[8rem_1fr_auto]">
          <span className="h-3 w-20 bg-line" />
          <span className="h-5 w-3/4 bg-line" />
          <span className="h-3 w-24 bg-line" />
        </li>
      ))}
    </ol>
  );
}

interface ArticleListProps {
  /** Quantos mostrar (sem limite quando omitido). */
  limit?: number;
  showDescription?: boolean;
  /** Filtra por tag do dev.to. */
  tag?: string | null;
}

export function ArticleList({ limit, showDescription, tag }: ArticleListProps) {
  const { status, articles } = useDevtoArticles();

  if (status === "loading") {
    return (
      <>
        <p className="sr-only" role="status">
          Carregando artigos
        </p>
        <SkeletonRows count={limit ?? 3} />
      </>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-start gap-4 border-y border-line py-8">
        <p className="text-dim">Não foi possível carregar os artigos agora. Eles continuam disponíveis no dev.to.</p>
        <Button href={DEVTO_PROFILE}>Abrir perfil no dev.to</Button>
      </div>
    );
  }

  const visible = (tag ? articles.filter((a) => a.tag_list.includes(tag)) : articles).slice(0, limit);

  if (visible.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 border-y border-line py-8">
        <p className="text-dim">
          {tag ? `Nenhum artigo com a tag #${tag}.` : "Nenhum artigo publicado ainda."}
        </p>
        <Button href={DEVTO_PROFILE}>Abrir perfil no dev.to</Button>
      </div>
    );
  }

  return (
    <ol className="border-t border-line">
      {visible.map((article) => (
        <ArticleRow key={article.id} article={article} showDescription={showDescription} />
      ))}
    </ol>
  );
}

/** Seção da Home: os artigos mais recentes. */
export function Articles() {
  return (
    <Section
      id="Artigos"
      title="Artigos"
      description="O que escrevo no dev.to sobre IA, system design, back-end, front-end e engenharia de software."
      aside={
        <Button to="/blog" variant="ghost" className="self-start underline decoration-line-strong underline-offset-4">
          Ver todos os artigos
        </Button>
      }
    >
      <ArticleList limit={HOME_LIMIT} />
    </Section>
  );
}
