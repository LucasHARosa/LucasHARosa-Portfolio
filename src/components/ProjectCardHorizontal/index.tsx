import { useState } from "react";
import { ProjectLinks } from "@/components/ProjectLinks";
import { Tag } from "@/components/ui/Tag";
import { labelCategoria, type ProjetosProps } from "@/data/data";

interface Props {
  projeto: ProjetosProps;
}

/** Célula da grade de projetos: bordas compartilhadas, sem cartão flutuante. */
export function ProjectCardHorizontal({ projeto }: Props) {
  const [expanded, setExpanded] = useState(false);
  const descId = `projeto-${projeto.id}-descricao`;
  const real = projeto.tags.includes("Projeto Real");
  const categorias = projeto.tipo
    .filter((t) => t !== "principais")
    .map(labelCategoria)
    .join(", ");

  return (
    <article className="flex h-full flex-col">
      <header className="dashed-b flex min-h-12 items-center justify-between gap-4 px-5 py-3 font-mono text-label">
        <span className="text-dim">{categorias}</span>
        {real && (
          <span className="flex shrink-0 items-center gap-2 text-ink">
            <span aria-hidden="true" className="size-1.5 bg-signal" />
            Projeto Real
          </span>
        )}
      </header>

      <img
        src={projeto.imagem || "/placeholder.svg"}
        loading="lazy"
        alt={`Tela do projeto ${projeto.titulo}`}
        className="aspect-16/10 w-full border-b border-line bg-surface object-cover object-top"
      />

      <div className="flex flex-1 flex-col px-5 pt-6 pb-6">
        <h2 className="text-[1.375rem] leading-tight font-medium tracking-tight">{projeto.titulo}</h2>
        <p
          id={descId}
          className={expanded ? "mt-3 text-[0.9375rem] leading-relaxed text-dim" : "mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-dim"}
        >
          {projeto.descricao}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={descId}
          className="mt-2 self-start font-mono text-label text-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
        >
          {expanded ? "Ler menos" : "Ler mais"}
        </button>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {projeto.tags
            .filter((tag) => tag !== "Projeto Real")
            .map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
        </div>

        <div className="mt-auto pt-6">
          <ProjectLinks projeto={projeto} size="sm" />
        </div>
      </div>
    </article>
  );
}
