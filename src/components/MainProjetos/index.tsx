import { useState } from "react";
import { Link } from "react-router-dom";
import {
  filtrarProjetos,
  listaProjetos,
  projetoCategorias,
} from "../../data/data";
import { categoriaIcones } from "../ProjectsFilterBar/icons";
import { Projetos } from "../Projetos";
import { Title } from "../Title";
import {
  ButtonSelect,
  ContainerButtonSelect,
  ContainerProjetos,
  SectionContainer,
  SelectContainer,
} from "./styles";

export function MainProjetos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");

  const listaFiltrada = filtrarProjetos(categoriaAtiva);

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
          {projetoCategorias.map(({ label, value, icon }) => {
            const Icon = categoriaIcones[icon];
            return (
              <ButtonSelect
                key={value}
                isActive={categoriaAtiva === value}
                onClick={() => setCategoriaAtiva(value)}
              >
                <Icon size={22} />
                {label}
              </ButtonSelect>
            );
          })}
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
