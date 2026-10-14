import { useEffect, useRef } from "react";
import { contarProjetos, projetoCategorias } from "@/data/data";
import { cn } from "@/lib/utils";

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectsFilterBar({ activeFilter, onFilterChange }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Mantém o filtro ativo visível na barra rolável (ex.: ?categoria=mobile no celular)
  useEffect(() => {
    const scroller = scrollerRef.current;
    const button = scroller?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!scroller || !button) return;
    const left = button.offsetLeft - scroller.clientWidth / 2 + button.offsetWidth / 2;
    scroller.scrollTo({ left: Math.max(0, left) });
  }, [activeFilter]);

  return (
    <div className="sticky top-14 z-30 border-y border-line bg-bg">
      <div
        ref={scrollerRef}
        role="group"
        aria-label="Filtrar projetos por categoria"
        className="no-scrollbar flex overflow-x-auto"
      >
        {projetoCategorias.map(({ label, value }) => {
          const isActive = activeFilter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onFilterChange(value)}
              className={cn(
                "flex h-12 shrink-0 items-center gap-2 border-r border-line px-4 font-mono text-label transition-colors sm:px-5",
                isActive ? "text-ink" : "text-dim hover:text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-1.5 bg-signal transition-opacity", isActive ? "opacity-100" : "opacity-0")}
              />
              {label}
              <span className="text-dim">{contarProjetos(value)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
