import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { listaExperiencias } from "@/data/data";
import { cn } from "@/lib/utils";

/** Separa "Cargo · Foco" em duas linhas. */
function splitTitle(title: string) {
  const [role, ...focus] = title.split(" · ");
  return { role, focus: focus.join(", ") };
}

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section
      id="Experiencia"
      title="Experiência Profissional"
      description="Onde atuei e o que fiz em cada contexto — back-end, web e mobile."
    >
      <ol className="border-t border-line">
        {listaExperiencias.map((exp, i) => {
          const isOpen = open === i;
          const { role, focus } = splitTitle(exp.title);
          const panelId = `experiencia-${i}`;

          return (
            <li key={exp.subtitle} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-x-3 py-5 text-left sm:grid-cols-[4rem_1fr_auto] md:grid-cols-[5rem_minmax(0,16rem)_1fr_auto] md:items-center md:gap-x-6"
                >
                  <span className="font-mono text-label text-dim md:pt-0">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="font-mono text-[1.375rem] leading-tight text-ink">
                    {exp.subtitle}
                  </span>
                  <span className="col-start-2 mt-1 text-[0.9375rem] leading-snug text-dim md:col-start-auto md:mt-0">
                    <span className="text-ink">{role}</span>
                    {focus && <span className="block">{focus}</span>}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "col-start-3 row-start-1 grid size-8 place-items-center rounded-xs border border-line text-dim transition-colors group-hover:border-ink group-hover:text-ink md:col-start-auto md:row-start-auto",
                      isOpen && "border-ink text-ink",
                    )}
                  >
                    <Plus className={cn("size-4 transition-transform duration-200", isOpen && "rotate-45")} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-5 pb-7 pl-15 sm:pl-19 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-x-6 md:pl-26">
                      <p className="max-w-read text-[0.9375rem] leading-relaxed text-dim md:col-start-2">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 md:col-start-2">
                        {exp.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
