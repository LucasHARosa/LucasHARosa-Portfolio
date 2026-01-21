import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FolderOpen } from "phosphor-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ProjectsSidebar } from "../../components/ProjectsSidebar";
import { ProjectsFilterBar } from "../../components/ProjectsFilterBar";
import { ProjectCardHorizontal } from "../../components/ProjectCardHorizontal";
import { Pagination } from "../../components/Pagination";
import { Title } from "../../components/Title";
import { listaProjetos } from "../../data/data";

import {
  PageContainer,
  ContentWrapper,
  TitleSection,
  ProjectsGrid,
  EmptyState,
} from "./styles";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset para página 1 quando filtro muda
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Filtrar projetos
  const filteredProjects =
    activeFilter === "todos"
      ? listaProjetos
      : listaProjetos.filter((p) => p.tipo.includes(activeFilter));

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Paginar projetos
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryTitle = (filter: string) => {
    const titles: { [key: string]: string } = {
      todos: "Todos os Projetos",
      principais: "Principais Projetos",
      mobile: "Projetos Mobile",
      frontend: "Projetos Frontend",
      backend: "Projetos Backend",
      ia: "Projetos de Inteligência Artificial",
    };
    return titles[filter] || "Projetos";
  };

  return (
    <>
      <Helmet>
        <title>Projetos - Lucas Rosa | Portfolio</title>
        <meta
          name="description"
          content="Explore todos os meus projetos de desenvolvimento web, mobile, backend e inteligência artificial."
        />
      </Helmet>

      <Header />

      <PageContainer>
        <ProjectsSidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <ContentWrapper>
          <ProjectsFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <TitleSection>
            <Title
              title={getCategoryTitle(activeFilter)}
              subTitle="Meu Portfólio Completo"
              description={`Mostrando ${filteredProjects.length} ${
                filteredProjects.length === 1 ? "projeto" : "projetos"
              } ${activeFilter !== "todos" ? `na categoria ${activeFilter}` : ""}`}
            />
          </TitleSection>

          {paginatedProjects.length > 0 ? (
            <>
              <ProjectsGrid>
                {paginatedProjects.map((projeto) => (
                  <ProjectCardHorizontal key={projeto.id} projeto={projeto} />
                ))}
              </ProjectsGrid>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <EmptyState>
              <FolderOpen size={64} />
              <h3>Nenhum projeto encontrado</h3>
              <p>Não há projetos nesta categoria no momento.</p>
            </EmptyState>
          )}
        </ContentWrapper>
      </PageContainer>

      <Footer />
    </>
  );
}
