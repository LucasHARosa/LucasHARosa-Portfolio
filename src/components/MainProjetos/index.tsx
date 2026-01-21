import { Code, Cpu, DeviceMobile, Globe, HardDrives } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { listaProjetos } from "../../data/data";
import { Projetos } from "../Projetos";
import { Title } from "../Title";
import {
  ButtonSelect,
  ContainerButtonSelect,
  ContainerProjetos,
  SectionContainer,
  SelectContainer,
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
    projeto.tipo.includes(categoriaAtiva),
  );

  return (
    <SectionContainer id="Projetos">
      <SelectContainer>
        <Title
          title="Projetos e Trabalhos"
          subTitle="Resultados do meu trabalho"
          description={
            <>
              Aqui estão alguns dos meus projetos mais recentes. Clique em cada
              um deles para ver mais detalhes.{" "}
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
                Ver todos ({listaProjetos.length})
              </Link>
            </>
          }
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
    </SectionContainer>
  );
}
