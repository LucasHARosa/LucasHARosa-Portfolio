import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { DiNodejs } from "react-icons/di";
import { FaGithub, FaJava, FaPython, FaReact } from "react-icons/fa";
import {
  SiCplusplus,
  SiFastapi,
  SiGo,
  SiNestjs,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { listaSkills, ondeUsei } from "../../data/data";
import { Tag } from "../Tag";
import { Title } from "../Title";
import {
  ButtonSkill,
  ContainerButtons,
  ContainerSection,
  ContainerTechs,
  IconWrapper,
  Techs,
  TechsDescription,
  TechsLogo,
  Text,
  UsageBlock,
  UsageGrid,
  UsageKey,
  UsageLabel,
  UsageValue,
} from "./styles";

const MAX_PROJETOS = 6;

/** Ícone de cada skill. Para adicionar uma nova: 1 entrada em data.ts + 1 linha aqui. */
const skillIcons: Record<string, IconType> = {
  java: FaJava,
  nodejs: DiNodejs,
  nestjs: SiNestjs,
  python: FaPython,
  fastapi: SiFastapi,
  go: SiGo,
  react: FaReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  "react-native": TbBrandReactNative,
  github: FaGithub,
  code: SiCplusplus,
};

export function Skills() {
  const [numberSkill, setNumberSkill] = useState(0);
  const [skill, setSkill] = useState(listaSkills[numberSkill]);
  const [stop, setStop] = useState(false);

  function handleChangeSkill(id: string) {
    setStop(true);

    const index = listaSkills.findIndex((item) => item.id === id);
    if (index >= 0) {
      setNumberSkill(index);
      setSkill(listaSkills[index]);
    }
  }

  const CurrentIcon = skillIcons[skill.id] ?? FaReact;
  const { empresas, projetos } = ondeUsei(skill.id);
  const projetosVisiveis = projetos.slice(0, MAX_PROJETOS);
  const projetosRestantes = projetos.length - projetosVisiveis.length;

  useEffect(() => {
    if (stop) return;

    const interval = setInterval(() => {
      setNumberSkill((prev) => {
        const next = (prev + 1) % listaSkills.length;
        setSkill(listaSkills[next]);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [stop]);

  return (
    <ContainerSection id="Skills">
      <Title
        title="Habilidades e Tecnologias"
        subTitle="Tecnologias que uso"
        description="Tecnologias com que trabalho no dia a dia, em back-end, web e mobile. Clique em cada uma para ver mais detalhes."
      />

      <ContainerTechs>
        <Techs>
          <TechsLogo
            key={skill.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <IconWrapper>
              <CurrentIcon />
            </IconWrapper>
          </TechsLogo>

          <ContainerButtons>
            {listaSkills.map((item) => {
              const Icon = skillIcons[item.id] ?? FaReact;
              return (
                <ButtonSkill
                  key={item.id}
                  type="button"
                  title={item.titulo}
                  aria-label={item.titulo}
                  onClick={() => handleChangeSkill(item.id)}
                  active={skill.id === item.id}
                >
                  <Icon size={30} />
                </ButtonSkill>
              );
            })}
          </ContainerButtons>
        </Techs>
        <TechsDescription
          key={skill.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2>{skill.titulo}</h2>
          <Text>{skill.description}</Text>
          <motion.div transition={{ staggerChildren: 1 }}>
            {skill.tecnologiasAxiliares.map((tag) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </motion.div>

          {(empresas.length > 0 || projetos.length > 0) && (
            <UsageBlock>
              <UsageLabel>Onde usei</UsageLabel>

              <UsageGrid>
                {empresas.length > 0 && (
                  <>
                    <UsageKey>Experiências</UsageKey>
                    <UsageValue>{empresas.join(" · ")}</UsageValue>
                  </>
                )}

                {projetosVisiveis.length > 0 && (
                  <>
                    <UsageKey>Projetos</UsageKey>
                    <UsageValue>
                      {projetosVisiveis.join(" · ")}
                      {projetosRestantes > 0 && ` +${projetosRestantes}`}
                    </UsageValue>
                  </>
                )}
              </UsageGrid>
            </UsageBlock>
          )}
        </TechsDescription>
      </ContainerTechs>
    </ContainerSection>
  );
}
