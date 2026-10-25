import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { listaTemplates } from "@/data/templates";

/** Seção da Home: lista compacta dos templates de projeto. */
export function TemplatesTeaser() {
  return (
    <Section
      id="Templates"
      title="Templates"
      description="Bases de projeto com a estrutura que uso em produção, prontas para clonar. Em preparação."
      aside={
        <Button to="/templates" variant="ghost" className="self-start underline decoration-line-strong underline-offset-4">
          Ver templates
        </Button>
      }
    >
      <ul className="border-t border-line">
        {listaTemplates.map((template) => (
          <li key={template.slug} className="border-b border-line">
            <Link
              to="/templates"
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 md:grid-cols-[10rem_1fr_auto]"
            >
              <span className="font-mono text-label text-dim max-md:col-span-2">{template.camada.toUpperCase()}</span>
              <span className="text-lead leading-snug font-medium tracking-tight transition-colors group-hover:text-signal">
                {template.nome}
              </span>
              <span className="flex items-center gap-3 font-mono text-label text-dim">
                {template.status === "disponivel" ? (
                  <span className="text-ink">DISPONÍVEL</span>
                ) : (
                  "EM BREVE"
                )}
                <ArrowUpRight className="size-4 transition-colors group-hover:text-ink" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
