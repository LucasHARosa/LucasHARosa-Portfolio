import { Link } from "react-router-dom";
import { listaProjetos } from "../../data/data";
import { SectionContainer } from "../MainProjetos/styles";
import ProjectCarousel from "../ProjetosCarousel";
import { Title } from "../Title";

export function ProjectsRating() {
  return (
    <SectionContainer id="ProjetosRating">
      {/* Carrossel de Projetos em Destaque */}
      <div style={{ width: "100%", marginTop: "4rem" }}>
        <Title
          title="Projetos em Destaque"
          subTitle="Navegue pelos destaques"
          description={
            <>
              Confira uma seleção especial dos meus principais projetos.{" "}
              <Link
                to="/projetos"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  opacity: 0.7,
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              >
                Ver todos
              </Link>
            </>
          }
        />
        <div style={{ marginTop: "3rem" }}>
          <ProjectCarousel
            projects={listaProjetos.filter((p) =>
              p.tipo.includes("principais"),
            )}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
