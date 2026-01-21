import { Code, Cpu, DeviceMobile, Globe, HardDrives, ArrowRight } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { listaProjetos } from "../../data/data";
import { Projetos } from "../Projetos";
import { Title } from "../Title";
import ProjectCarousel from "../ProjetosCarousel";
import {
  ButtonSelect,
  ContainerButtonSelect,
  ContainerProjetos,
  SectionContainer,
  SelectContainer,
  ViewAllButton,
  ViewAllContainer,
} from "./styles";

const categorias = [
  { label: "Principais", value: "principais", icon: <Globe size={22} /> },
  { label: "Mobile", value: "mobile", icon: <DeviceMobile size={22} /> },
  { label: "Frontend", value: "frontend", icon: <Code size={22} /> },
  { label: "Backend", value: "backend", icon: <HardDrives size={22} /> },
  { label: "IA", value: "ia", icon: <Cpu size={22} /> },
];

export function MainProjetos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("principais");

  const listaFiltrada = listaProjetos.filter((projeto) =>
    projeto.tipo.includes(categoriaAtiva)
  );

  return (
    <SectionContainer id="Projetos">
      <SelectContainer>
        <Title
          title="Projetos e Trabalhos"
          subTitle="Resultados do meu trabalho"
          description="Aqui estão alguns dos meus projetos mais recentes. Clique em cada um deles para ver mais detalhes."
        />

        <ContainerButtonSelect>
          {categorias.map(({ label, value, icon }) => (
            <ButtonSelect
              key={value}
              isActive={categoriaAtiva === value}
              onClick={() => setCategoriaAtiva(value)}
            >
              {icon}
              {label}
            </ButtonSelect>
          ))}
        </ContainerButtonSelect>
      </SelectContainer>

      <ContainerProjetos>
        {listaFiltrada.map((item) => (
          <Projetos key={item.id} projeto={item} />
        ))}
      </ContainerProjetos>

      <ViewAllContainer>
        <Link to="/projetos" style={{ textDecoration: "none" }}>
          <ViewAllButton>
            Ver Todos os Projetos ({listaProjetos.length})
            <ArrowRight size={20} weight="bold" />
          </ViewAllButton>
        </Link>
      </ViewAllContainer>

      {/* Carrossel de Projetos em Destaque */}
      <div style={{ width: '100%', marginTop: '4rem' }}>
        <Title
          title="Projetos em Destaque"
          subTitle="Navegue pelos destaques"
          description="Confira uma seleção especial dos meus principais projetos em um carrossel interativo."
        />
        <div style={{ marginTop: '3rem' }}>
          <ProjectCarousel projects={listaProjetos.filter(p => p.tipo.includes('principais'))} />
        </div>
      </div>
    </SectionContainer>
  );
}
