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
          description="Confira uma seleção especial dos meus principais projetos em um carrossel interativo."
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
