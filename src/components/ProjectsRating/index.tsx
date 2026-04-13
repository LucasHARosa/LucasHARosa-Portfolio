import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { listaProjetos } from "../../data/data";
import { SectionContainer } from "../MainProjetos/styles";
import ProjectCarousel from "../ProjetosCarousel";
import { Title } from "../Title";

const DesktopLink = styled(Link)`
  color: inherit;
  text-decoration: underline;
  text-decoration-style: dotted;

  transition: opacity 0.3s;
  position: relative;
  z-index: 10;
  cursor: pointer;
  font-weight: 800;
  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    margin: 0;

    color: ${({ theme }) => theme.white};
    border: none;

    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: ${({ theme }) => theme["shadow-sm"]};
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    vertical-align: baseline;

    &:active {
      transform: scale(0.95);
      background-color: ${({ theme }) => theme["Blue-600"]};
    }
  }
`;

export function ProjectsRating() {
  const navigate = useNavigate();

  return (
    <SectionContainer id="ProjetosRating">
      <div style={{ width: "100%", marginTop: "4rem" }}>
        <Title
          title="Projetos em Destaque"
          subTitle="Navegue pelos destaques"
          description={
            <>
              Confira uma seleção especial dos meus principais projetos.{" "}
              <DesktopLink to="/projetos">Ver todos</DesktopLink>
              <MobileButton onClick={() => navigate("/projetos")}>
                Ver todos
              </MobileButton>
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
