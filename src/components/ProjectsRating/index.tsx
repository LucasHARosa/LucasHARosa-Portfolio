import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ProjectLinks } from "@/components/ProjectLinks";
import { Button } from "@/components/ui/Button";
import { Marker } from "@/components/ui/Marker";
import { Section } from "@/components/ui/Section";
import { labelCategoria, listaDestaques } from "@/data/data";
import { cn } from "@/lib/utils";

const destaques = listaDestaques;
const SLIDE_MS = 7000;

function useCoarsePointer() {
  const [coarse] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
  );
  return coarse;
}

export function ProjectsRating() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });

  const projeto = destaques[index];
  const total = destaques.length;
  const go = (next: number) => setIndex((next + total) % total);
  const paused = hovering || focused || !inView;
  const autoplay = !reduce;
  const coarse = useCoarsePointer();

  const categorias = projeto.tipo
    .filter((t) => t !== "principais")
    .map(labelCategoria)
    .join(", ");

  return (
    <Section
      id="ProjetosRating"
      title="Projetos em destaque"
      description="Uma seleção que cobre back-end, full-stack, mobile e IA."
      aside={
        <Button to="/projetos" variant="ghost" className="self-start underline decoration-line-strong underline-offset-4">
          Ver todos os projetos
        </Button>
      }
    >
      <div
        ref={rootRef}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
        }}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos em destaque"
      >
        <motion.div
          drag={coarse ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(index + 1);
            else if (info.offset.x > 60) go(index - 1);
          }}
          className="border border-line bg-bg"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={projeto.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
              className="grid lg:grid-cols-12"
            >
              <div className="flex flex-col p-5 sm:p-8 lg:col-span-5 lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <Marker>Projeto em destaque</Marker>
                  <p className="font-mono text-label text-dim" aria-live="polite">
                    {index + 1}/{total}
                  </p>
                </div>

                <h3 className="mt-6 font-mono text-[clamp(2.0625rem,1.6rem+1.2vw,2.75rem)] leading-none tracking-tight">
                  {projeto.titulo}
                </h3>
                <p className="mt-5 max-w-read text-[0.9375rem] leading-relaxed text-dim">
                  {projeto.descricao}
                </p>

                <div className="mt-8 grid grid-cols-2 border-y border-line">
                  <div className="py-3 pr-4">
                    <p className="text-[0.9375rem] text-ink">{projeto.tags.slice(0, 3).join(", ")}</p>
                    <p className="text-[0.8125rem] text-dim">Stack principal</p>
                  </div>
                  <div className="border-l border-line py-3 pl-4">
                    <p className="text-[0.9375rem] text-ink">{categorias}</p>
                    <p className="text-[0.8125rem] text-dim">Categorias</p>
                  </div>
                </div>

                <div className="mt-8 lg:mt-auto lg:pt-10">
                  <ProjectLinks projeto={projeto} />
                </div>
              </div>

              <div className="border-line max-lg:order-first max-lg:border-b lg:col-span-7 lg:border-l">
                <img
                  src={projeto.imagem}
                  alt={`Tela do projeto ${projeto.titulo}`}
                  loading="lazy"
                  draggable={false}
                  className="aspect-16/10 h-full w-full bg-surface object-cover object-center"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Abas com progresso linear */}
        <div className="flex border-x border-b border-line">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Projeto anterior"
            className="grid w-12 shrink-0 place-items-center border-r border-line text-dim transition-colors hover:text-ink"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div role="tablist" aria-label="Escolher projeto" className="no-scrollbar flex flex-1 snap-x overflow-x-auto">
            {destaques.map((p, i) => {
              const active = i === index;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => go(i)}
                  className={cn(
                    "relative min-w-38 flex-1 snap-start border-r border-line px-4 py-4 text-left font-mono text-label transition-colors last:border-r-0",
                    active ? "text-ink" : "text-dim hover:text-ink",
                  )}
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-line" aria-hidden="true">
                    {active && (
                      <span
                        key={`${p.id}-${index}`}
                        className="block h-full origin-left bg-signal"
                        style={
                          autoplay
                            ? {
                                animation: `progress ${SLIDE_MS}ms linear both`,
                                animationPlayState: paused ? "paused" : "running",
                              }
                            : undefined
                        }
                        onAnimationEnd={() => autoplay && go(index + 1)}
                      />
                    )}
                  </span>
                  <span className="block truncate" title={p.titulo}>
                    {p.titulo}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Próximo projeto"
            className="grid w-12 shrink-0 place-items-center border-l border-line text-dim transition-colors hover:text-ink"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </Section>
  );
}
