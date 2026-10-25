import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { Pagination } from "@/components/Pagination";
import { ProjectCardHorizontal } from "@/components/ProjectCardHorizontal";
import { ProjectsFilterBar } from "@/components/ProjectsFilterBar";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { filtrarProjetos, labelCategoria, projetoCategorias } from "@/data/data";

const ITEMS_PER_PAGE = 12;

const CATEGORY_TITLES: Record<string, string> = {
  todos: "Todos os Projetos",
  backend: "Projetos de Back-end",
  fullstack: "Projetos Full-Stack",
  frontend: "Projetos de Front-end",
  mobile: "Projetos Mobile",
  ia: "Projetos de Inteligência Artificial",
  academicos: "Projetos Acadêmicos e Históricos",
};

export function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("categoria") ?? "todos";
  const activeFilter = projetoCategorias.some((c) => c.value === param) ? param : "todos";
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top quando a página é montada
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset para página 1 quando filtro muda
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const setFilter = (value: string) => {
    setSearchParams(value === "todos" ? {} : { categoria: value }, { replace: false });
  };

  const filteredProjects = filtrarProjetos(activeFilter);
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const count = filteredProjects.length;
  const summary = `Mostrando ${count} ${count === 1 ? "projeto" : "projetos"}${
    activeFilter !== "todos" ? ` na categoria ${labelCategoria(activeFilter)}` : ""
  }`;

  return (
    <>
      <PageMeta path="/projetos" />

      <Frame>
        <Header />
        <main>
          <header className="grid gap-4 px-4 pt-16 pb-10 sm:px-8 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-14 lg:px-12">
            <div className="md:col-span-7">
              <p className="font-mono text-label text-dim">Meu Portfólio Completo</p>
              <h1 className="mt-3 font-mono text-h2 tracking-tight">{CATEGORY_TITLES[activeFilter]}</h1>
            </div>
            <p className="text-dim md:col-span-5 md:self-end" aria-live="polite">
              {summary}
            </p>
          </header>

          <ProjectsFilterBar activeFilter={activeFilter} onFilterChange={setFilter} />

          {paginatedProjects.length > 0 ? (
            <>
              <ul className="grid md:grid-cols-2">
                {paginatedProjects.map((projeto) => (
                  <li
                    key={projeto.id}
                    className="border-b border-line md:odd:border-r"
                  >
                    <ProjectCardHorizontal projeto={projeto} />
                  </li>
                ))}
              </ul>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="grid place-items-center gap-4 px-4 py-24 text-center">
              <h2 className="font-mono text-h3">Nenhum projeto encontrado</h2>
              <p className="text-dim">Não há projetos nesta categoria no momento.</p>
              <Button onClick={() => setFilter("todos")}>Ver todos os projetos</Button>
            </div>
          )}
          <div className="h-16 md:h-24" />
        </main>
        <Footer />
      </Frame>
    </>
  );
}
