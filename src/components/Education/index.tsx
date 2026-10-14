import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { listaEducacao } from "@/data/data";

export function Education() {
  return (
    <Section
      id="Educacao"
      title="Educação"
      description="Minhas formações. Sempre buscando novos conhecimentos e habilidades!"
    >
      <ol className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
        {listaEducacao.map((edu, i) => (
          <li key={edu.title} className="flex flex-col border-r border-b border-line">
            <div className="dashed-b flex items-center justify-between px-5 py-4 font-mono text-label text-dim">
              <span>{edu.subtitle}</span>
              <span>[{String(i + 1).padStart(2, "0")}]</span>
            </div>
            <div className="flex flex-1 flex-col px-5 pt-6 pb-6">
              <h3 className="text-[1.375rem] leading-tight font-medium tracking-tight">{edu.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-dim">{edu.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {edu.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
