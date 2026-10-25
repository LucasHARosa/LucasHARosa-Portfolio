import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { ToolCard } from "@/components/tools/ToolCard";
import { Frame } from "@/components/ui/Frame";
import { PageHeader } from "@/components/ui/PageHeader";
import { listaFerramentas } from "@/data/ferramentas";
import { useFavoriteTools } from "@/hooks/useFavoriteTools";

export function Tools() {
  const { isFavorite } = useFavoriteTools();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Favoritas primeiro, mantendo a ordem do data entre elas
  const ordered = [...listaFerramentas].sort((a, b) => Number(isFavorite(b.slug)) - Number(isFavorite(a.slug)));

  return (
    <>
      <PageMeta path="/ferramentas" />

      <Frame>
        <Header />
        <main>
          <PageHeader
            eyebrow="Recursos"
            title="Ferramentas"
            aside={
              <p>
                Utilitários que uso no dia a dia de desenvolvimento. Rodam no seu navegador: nada do que você digita é
                enviado para servidor nenhum. Marque com estrela as que mais usa.
              </p>
            }
          />

          <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((ferramenta) => (
              <li key={ferramenta.slug} className="border-b border-line sm:max-lg:odd:border-r lg:[&:not(:nth-child(3n))]:border-r">
                <ToolCard ferramenta={ferramenta} favorite={isFavorite(ferramenta.slug)} />
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
