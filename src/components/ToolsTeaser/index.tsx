import { ToolCard } from "@/components/tools/ToolCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { listaFerramentas } from "@/data/ferramentas";

const HOME_LIMIT = 6;

/** Seção da Home: atalho para as ferramentas. */
export function ToolsTeaser() {
  return (
    <Section
      id="Ferramentas"
      title="Ferramentas"
      description="Utilitários que uso no dia a dia: UUID, hash, JSON, JWT, senhas, QR Code e cores. Rodam no navegador, sem enviar nada."
      aside={
        <Button to="/ferramentas" variant="ghost" className="self-start underline decoration-line-strong underline-offset-4">
          Ver todas as ferramentas
        </Button>
      }
      flush
    >
      <ul className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {listaFerramentas.slice(0, HOME_LIMIT).map((ferramenta) => (
          <li key={ferramenta.slug} className="bg-bg">
            <ToolCard ferramenta={ferramenta} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
