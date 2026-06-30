import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
import { listaSkills } from "../../data/data";
import { Tag } from "../Tag";
import { Title } from "../Title";
import {
  BarProgress,
  ButtonSkill,
  ContainerButtons,
  ContainerSection,
  ContainerTechs,
  IconWrapper,
  Progress,
  Space,
  Techs,
  TechsDescription,
  TechsLogo,
  Text,
  TextProgress,
} from "./styles";

export function Skills() {
  const [numberSkill, setNumberSkill] = useState(0);
  const [skill, setSkill] = useState(listaSkills[numberSkill]);
  const [stop, setStop] = useState(false);

  function handleChangeSkill(id: string) {
    setStop(true);

    listaSkills.filter((item) => {
      if (item.id === id) {
        setSkill(item);
      }
    });
  }

  const ImagemFundo = () => {
    switch (skill.id) {
      case "nodejs":
        return <DiNodejs />;
      case "react":
        return <FaReact />;
      case "java":
        return <FaJava />;
      case "python":
        return <FaPython />;
      case "react-native":
        return <FaReact />;
      case "typescript":
        return <SiTypescript />;
      case "github":
        return <FaGithub />;
      case "nextjs":
        return <SiNextdotjs />;
      case "code":
        return <SiCplusplus />;
      case "nestjs":
        return <SiNestjs />;
      case "fastapi":
        return <SiFastapi />;
      case "go":
        return <SiGo />;
      default:
        return <FaReact />;
    }
  };

  const currentYear = new Date().getFullYear();
  const yearsOfExp = currentYear - skill.desde;
  const experienciaLabel = `${yearsOfExp} ano${yearsOfExp !== 1 ? "s" : ""} (desde ${skill.desde})`;

  const normalizedPercentage = Math.min(100, Math.max(0, skill.nivel * 10));

  // Defina a configuração da animação
  const barAnimation = {
    width: `${normalizedPercentage}%`,
    opacity: 1,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (stop) return;
      if (numberSkill === listaSkills.length - 1) {
        setNumberSkill(0);
      } else {
        setNumberSkill(numberSkill + 1);
      }
      setSkill(listaSkills[numberSkill]);
    }, 4000);
    return () => clearInterval(interval);
  }, [skill, stop, numberSkill]);

  return (
    <ContainerSection id="Skills">
      <Title
        title="Habilidades e Tecnologias"
        subTitle="Tecnologias que uso"
        description="Aqui estão algumas das tecnologias que tenho experiência e conhecimento. Clique em cada uma delas para ver mais detalhes."
      />

      <ContainerTechs>
        <Techs>
          <TechsLogo
            key={skill.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <IconWrapper>{ImagemFundo()}</IconWrapper>
          </TechsLogo>

          <ContainerButtons>
            <ButtonSkill
              onClick={() => handleChangeSkill("react")}
              active={skill.id === "react"}
            >
              <FaReact size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("nodejs")}
              active={skill.id === "nodejs"}
            >
              <DiNodejs size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("react-native")}
              active={skill.id === "react-native"}
            >
              <FaReact size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("java")}
              active={skill.id === "java"}
            >
              <FaJava size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("nextjs")}
              active={skill.id === "nextjs"}
            >
              <SiNextdotjs size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("nestjs")}
              active={skill.id === "nestjs"}
            >
              <SiNestjs size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("python")}
              active={skill.id === "python"}
            >
              <FaPython size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("typescript")}
              active={skill.id === "typescript"}
            >
              <SiTypescript size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("github")}
              active={skill.id === "github"}
            >
              <FaGithub size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("code")}
              active={skill.id === "code"}
            >
              <SiCplusplus size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("fastapi")}
              active={skill.id === "fastapi"}
            >
              <SiFastapi size={30} />
            </ButtonSkill>
            <ButtonSkill
              onClick={() => handleChangeSkill("go")}
              active={skill.id === "go"}
            >
              <SiGo size={30} />
            </ButtonSkill>
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
          <Space />
          <Text>
            <span>Experiência: </span>
            {experienciaLabel}
          </Text>
          <Progress>
            <TextProgress>Conhecimento:</TextProgress>
            <BarProgress>
              <motion.div
                initial={{ width: "0%", opacity: 0 }}
                animate={barAnimation}
                transition={{ ease: "easeOut", duration: 1 }}
                style={{
                  height: "100%",
                  backgroundColor: "#60a5fa",
                  borderRadius: "1rem",
                }}
              />
            </BarProgress>
          </Progress>
        </TechsDescription>
      </ContainerTechs>
    </ContainerSection>
  );
}
