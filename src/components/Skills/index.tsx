import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { IsoGlyph } from "@/components/ui/IsoGlyph";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { listaSkills, ondeUsei } from "@/data/data";
import { cn } from "@/lib/utils";

const MAX_PROJETOS = 6;

/** Camada em que cada skill atua — cabeçalho da coluna. */
const camada: Record<string, string> = {
  java: "Back-end",
  nodejs: "Back-end",
  nestjs: "Back-end",
  python: "Back-end",
  fastapi: "Back-end",
  go: "Back-end",
  react: "Web",
  nextjs: "Web",
  typescript: "Web e Back-end",
  "react-native": "Mobile",
  github: "Workflow",
  code: "Embarcados",
};

const usos = Object.fromEntries(listaSkills.map((s) => [s.id, ondeUsei(s.id)]));

export function Skills() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const skill = listaSkills[selected];
  const { empresas, projetos } = usos[skill.id];
  const projetosVisiveis = projetos.slice(0, MAX_PROJETOS);
  const projetosRestantes = projetos.length - projetosVisiveis.length;

  function scrollByColumn(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const column = el.querySelector<HTMLElement>("article");
    el.scrollBy({
      left: direction * (column?.offsetWidth ?? el.clientWidth),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  const arrows = (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => scrollByColumn(-1)}
        aria-label="Tecnologias anteriores"
        className="grid size-11 place-items-center rounded-xs border border-line text-dim transition-colors hover:border-ink hover:text-ink"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => scrollByColumn(1)}
        aria-label="Próximas tecnologias"
        className="grid size-11 place-items-center rounded-xs border border-line text-dim transition-colors hover:border-ink hover:text-ink"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );

  return (
    <Section
      id="Skills"
      title="Habilidades e Tecnologias"
      description="Tecnologias com que trabalho no dia a dia, em back-end, web e mobile. Clique em cada uma para ver mais detalhes."
      aside={arrows}
      flush
    >
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto border-y border-line"
      >
        {listaSkills.map((item, i) => {
          const active = i === selected;
          const { empresas: e, projetos: p } = usos[item.id];
          const total = e.length + p.length;

          return (
            <article
              key={item.id}
              className="relative flex w-[85%] shrink-0 snap-start flex-col border-r border-line sm:w-1/2 lg:w-1/4"
              onPointerEnter={() => setHovered(i)}
              onPointerLeave={() => setHovered(null)}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 bg-signal transition-opacity",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
              <header className="dashed-b flex items-center justify-between px-5 py-4 font-mono text-label">
                <span className={active ? "text-ink" : "text-dim"}>{camada[item.id]?.toUpperCase()}</span>
                <span className="text-dim" title={`Usada em ${total} experiências e projetos`}>
                  [{String(total).padStart(2, "0")}]
                </span>
              </header>

              <div
                className={cn(
                  "grid h-52 place-items-center px-8 transition-colors md:h-64",
                  active ? "text-ink" : "text-dim",
                )}
              >
                <IsoGlyph name={item.id} active={!reduce && (active || hovered === i)} className="max-w-[150px] md:max-w-[170px]" />
              </div>

              <div className="dashed-t flex flex-1 flex-col px-5 pt-7 pb-7">
                <h3 className="text-[2rem] leading-[0.95] font-semibold tracking-[-0.02em] uppercase">
                  {item.titulo}
                </h3>
                <p className="mt-auto pt-8 text-[0.9375rem] leading-relaxed text-dim">{item.description}</p>
              </div>

              {/* Botão que cobre a coluna inteira */}
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={active}
                aria-controls="skill-detalhes"
                aria-label={`${item.titulo}: ver onde usei`}
                className="absolute inset-0 cursor-pointer focus-visible:outline-offset-[-2px]"
              />
            </article>
          );
        })}
      </div>

      {/* Detalhes da skill selecionada */}
      <div id="skill-detalhes" aria-live="polite" className="px-4 pt-10 sm:px-8 lg:px-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={skill.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
            className="grid gap-8 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <p className="font-mono text-label text-dim">Onde usei</p>
              <h3 className="mt-2 font-mono text-h3">{skill.titulo}</h3>
            </div>

            <dl className="grid gap-x-8 gap-y-5 text-[0.9375rem] sm:grid-cols-[8rem_1fr] md:col-span-8">
              <dt className="font-mono text-label text-dim sm:pt-1">Ferramentas</dt>
              <dd className="flex flex-wrap gap-1.5">
                {skill.tecnologiasAxiliares.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </dd>

              {empresas.length > 0 && (
                <>
                  <dt className="font-mono text-label text-dim sm:pt-0.5">Experiências</dt>
                  <dd>{empresas.join(", ")}</dd>
                </>
              )}

              {projetosVisiveis.length > 0 && (
                <>
                  <dt className="font-mono text-label text-dim sm:pt-0.5">Projetos</dt>
                  <dd>
                    {projetosVisiveis.join(", ")}
                    {projetosRestantes > 0 && <span className="text-dim"> +{projetosRestantes}</span>}
                  </dd>
                </>
              )}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
