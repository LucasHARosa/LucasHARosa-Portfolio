import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { TemplateCard } from "@/components/TemplateCard";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { PageHeader } from "@/components/ui/PageHeader";
import { listaTemplates } from "@/data/templates";

export function Templates() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const disponiveis = listaTemplates.filter((t) => t.status === "disponivel").length;

  return (
    <>
      <PageMeta path="/templates" />

      <Frame>
        <Header />
        <main>
          <PageHeader
            eyebrow="Recursos"
            title="Templates"
            aside={
              <>
                <p>
                  Bases de projeto com a estrutura que uso em produção: arquitetura, autenticação, testes e Docker já
                  configurados, para começar pelo que importa.
                </p>
                <p className="font-mono text-label" aria-live="polite">
                  {disponiveis > 0
                    ? `${disponiveis} de ${listaTemplates.length} disponíveis`
                    : `${listaTemplates.length} templates em preparação`}
                </p>
                <Button
                  href="https://github.com/LucasHARosa"
                  variant="ghost"
                  className="underline decoration-line-strong underline-offset-4"
                >
                  Acompanhar no GitHub
                </Button>
              </>
            }
          />

          <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {listaTemplates.map((template) => (
              <li key={template.slug} className="border-b border-line sm:max-lg:odd:border-r lg:[&:not(:nth-child(3n))]:border-r">
                <TemplateCard template={template} />
              </li>
            ))}
          </ul>
          <div className="h-16 md:h-24" />
        </main>
        <Footer />
      </Frame>
    </>
  );
}
