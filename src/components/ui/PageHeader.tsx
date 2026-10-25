import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Rótulo mono acima do título. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Coluna da direita: descrição, contadores, ações. */
  aside?: ReactNode;
}

/** Cabeçalho das páginas internas (mesmo grid de Projetos e Artigos). */
export function PageHeader({ eyebrow, title, aside }: PageHeaderProps) {
  return (
    <header className="grid gap-4 px-4 pt-16 pb-10 sm:px-8 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-14 lg:px-12">
      <div className="md:col-span-7">
        {eyebrow && <div className="mb-3 font-mono text-label text-dim">{eyebrow}</div>}
        <h1 className="font-mono text-h2 tracking-tight">{title}</h1>
      </div>
      {aside && <div className="flex flex-col items-start gap-4 text-dim md:col-span-5 md:self-end">{aside}</div>}
    </header>
  );
}
