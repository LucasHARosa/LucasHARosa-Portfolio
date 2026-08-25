"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { listaExperiencias } from "../../data/data";
import { ExperienceCard } from "../ExperienceCard";
import { Title } from "../Title";
import {
  ExperienceCardWrapper,
  ExperienceContainer,
  ExperienceSection,
  LoadMoreButton,
  TimelineContainer,
} from "./styles";

export function Experience() {
  const [visibleCards, setVisibleCards] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCards((prev) => prev + 4);
      setIsLoading(false);
    }, 300);
  };

  return (
    <ExperienceSection id="Experiencia">
      <Title
        title="Experiência Profissional"
        subTitle="Trajetória"
        description="Onde atuei e o que fiz em cada contexto — back-end, web e mobile."
      />
      <ExperienceContainer>
        <TimelineContainer>
          {listaExperiencias.slice(0, visibleCards).map((exp, index) => (
            <ExperienceCardWrapper key={index}>
              <ExperienceCard {...exp} />
            </ExperienceCardWrapper>
          ))}
        </TimelineContainer>

        {visibleCards < listaExperiencias.length && (
          <LoadMoreButton>
            <button onClick={handleLoadMore} type="button">
              {isLoading ? "Carregando..." : "Ver mais experiências"}
              <IoIosArrowDown size={16} />
            </button>
          </LoadMoreButton>
        )}
      </ExperienceContainer>
    </ExperienceSection>
  );
}
