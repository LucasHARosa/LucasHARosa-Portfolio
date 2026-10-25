import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { TemplateProps } from "@/data/templates";

/** Célula de uma grade hairline. */
export function TemplateCard({ template }: { template: TemplateProps }) {
  const repo = template.status === "disponivel" ? template.repo : undefined;

  return (
    <article className="flex h-full flex-col bg-bg">
      <header className="dashed-b flex items-center justify-between px-5 py-4 font-mono text-label">
        <span className="text-dim">{template.camada.toUpperCase()}</span>
        {repo ? (
          <span className="flex items-center gap-2 text-ink">
            <span aria-hidden="true" className="size-1.5 bg-signal" />
            DISPONÍVEL
          </span>
        ) : (
          <span className="text-dim">EM BREVE</span>
        )}
      </header>

      <div className="flex flex-1 flex-col px-5 pt-6 pb-6">
        <h3 className="text-[1.75rem] leading-[0.95] font-semibold tracking-[-0.02em] uppercase">{template.nome}</h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-dim">{template.descricao}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {template.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        {repo && (
          <Button href={repo} size="sm" className="mt-6 self-start" aria-label={`${template.nome} no GitHub (abre em nova aba)`}>
            <FaGithub /> Usar template
          </Button>
        )}
      </div>
    </article>
  );
}
