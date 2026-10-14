import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Conteúdo extra à direita do cabeçalho (ex.: link "Ver todos"). */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Remove o padding lateral do corpo, para grades que encostam nos trilhos. */
  flush?: boolean;
}

/** Seção da prancha: hairline de trilho a trilho e cabeçalho em duas colunas. */
export function Section({
  id,
  title,
  description,
  aside,
  children,
  className,
  flush,
}: SectionProps) {
  const headingId = id ? `${id}-titulo` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-t border-line", className)}
    >
      <header className="grid gap-4 px-4 pt-16 pb-10 sm:px-8 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-14 lg:px-12">
        <h2
          id={headingId}
          className="font-mono text-h2 tracking-tight md:col-span-6"
        >
          {title}
        </h2>
        {(description || aside) && (
          <div className="flex flex-col gap-4 md:col-span-6 md:col-start-7 md:self-end lg:col-span-5 lg:col-start-8">
            {description && <p className="max-w-read text-dim">{description}</p>}
            {aside}
          </div>
        )}
      </header>
      <div className={cn(flush ? "" : "px-4 sm:px-8 lg:px-12", "pb-16 md:pb-24")}>
        {children}
      </div>
    </section>
  );
}
