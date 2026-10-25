import { ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Ferramenta } from "@/data/ferramentas";

/** Célula de uma grade hairline. */
export function ToolCard({ ferramenta, favorite }: { ferramenta: Ferramenta; favorite?: boolean }) {
  const Icon = ferramenta.icone;

  return (
    <Link
      to={`/ferramentas/${ferramenta.slug}`}
      className="group flex h-full flex-col gap-6 bg-bg p-5 transition-colors hover:bg-surface sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xs border border-line text-dim transition-colors group-hover:border-ink group-hover:text-ink">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="flex items-center gap-2 text-dim">
          {favorite && <Star className="size-4 fill-signal text-signal" aria-label="Favorita" />}
          <ArrowUpRight className="size-4 transition-colors group-hover:text-ink" aria-hidden="true" />
        </span>
      </div>
      <div>
        <h3 className="text-lead leading-snug font-medium tracking-tight transition-colors group-hover:text-signal">
          {ferramenta.nome}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-dim">{ferramenta.descricao}</p>
      </div>
    </Link>
  );
}
