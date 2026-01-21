import { useEffect, useState } from "react";
import { GiOctopus } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoDesktopOutline } from "react-icons/io5";
import { MdOutlineDevices } from "react-icons/md";

import { TbDeviceMobileCode } from "react-icons/tb";
import { Button } from "../Button";
import { ExperienceCard } from "../ExperienceCard";
import { Title } from "../Title";
import {
  ExperienceCardWrapper,
  ExperienceContainer,
  ExperienceSection,
  LoadMoreButton,
  TimelineContainer,
} from "./styles";

const experiences = [
  {
    icon: GiOctopus,
    title: "Founder & Desenvolvedor Next.js, NestJS e React Native",
    subtitle: "Octopus Studio (Software House)",
    description:
      "Atualmente presto serviços como desenvolvedor full stack por meio da minha própria software house. Atuo com desenvolvimento sob demanda de aplicações web e mobile, integrações com APIs de terceiros, automações de processos, gateways de pagamento (Pagar.me, Mercado Pago), deploy em cloud (Heroku, Vercel, S3) e arquitetura de software com foco em escalabilidade.",
    tags: ["Next.js", "NestJS", "React Native"],
  },

  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor React, Next.js e Node.js",
    subtitle: "Power Pick",
    description:
      "Responsável pelo desenvolvimento do site principal da Power Pick, uma plataforma de compra de energia, comparando preços de diversos fornecedores. Trabalhei na criação de uma interface intuitiva para os usuários, permitindo a comparação fácil e rápida dos planos de energia disponíveis. Utilizei React para o front-end, Next.js para server-side rendering e Node.js para o back-end, garantindo uma experiência fluida e eficiente.",
    tags: ["React", "Next.js", "Node.js", "NestJS"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Next.js, React e Laravel",
    subtitle: "DubPay",
    description:
      "Fintech de pagamentos que oferece soluções inovadoras para transações financeiras. Atuei no desenvolvimento e manutenção de aplicações web e mobile, integrações com gateways de pagamento e automações para consumidores e empresas.",
    tags: ["Next.js", "Vite", "React", "PHP", "Laravel"],
  },

  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor PHP, React e React Native",
    subtitle: "Nacional GO",
    description:
      "Responsável pelo novo ecommerce da Nacional GO, assim como o novo site da empresa. Atuei com funcionalidades front-end e back-end do sistema interno da empresa. Desenvolvi um app mobile para motoristas em React Native, otimizando operações logísticas. Também trabalhei na refatoração completa do site principal com React, com foco em performance, SEO e acessibilidade. Utilizei React, React Native e PHP",
    tags: ["PHP", "React", "React Native"],
  },

  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Front-end e Mobile",
    subtitle: "Grupo Bseen",
    description:
      "Participei do desenvolvimento de uma aplicação mobile e web no setor energético, semelhante ao Méliuz, voltada para cashback e economia de energia elétrica. Atuei com foco em frontend e mobile, implementando telas responsivas, integração com APIs REST, fluxos de autenticação, e visualizações de consumo energético. Utilizei React com TypeScript.",
    tags: ["React", "React Native"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Next.js, React Native e Kotlin",
    subtitle: "MarjoSports",
    description:
      "Criação de um novo app mobile em React Native, substituindo tecnologias defasadas. Também atuei na reformulação completa do site principal com Next.js, com foco em performance, SEO e acessibilidade. Desenvolvi funcionalidades em tempo real utilizando WebSocket e Server-Sent Events (SSE) para experiências dinâmicas de apostas esportivas.",
    tags: ["Next.js", "React Native", "Kotlin", "WebSocket", "SSE"],
  },
  {
    icon: TbDeviceMobileCode,
    title: "Desenvolvedor Mobile",
    subtitle: "Grupo Orion",
    description:
      "Desenvolvimento de apps mobile focados em automação predial e IoT, com React Native e Expo. Os apps exibiam métricas em tempo real de sensores, controle de acesso e acionamento remoto. Participei desde o desenvolvimento até publicação nas lojas Android e iOS.",
    tags: ["React Native", "Expo", "IoT", "Automação Predial"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor React Native e Java",
    subtitle: "Asset Tecnologia",
    description:
      "Atuação em sistema de gestão industrial, com React Native no front e Java no backend. Desenvolvi dashboards e funcionalidades críticas para fábricas, além de realizar integrações com sensores e equipamentos industriais. Também ofereci suporte técnico contínuo aos usuários.",
    tags: ["React Native", "Java", "Spring Boot", "Indústria", "APIs"],
  },
];

export function Experience() {
  const [visibleCards, setVisibleCards] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleElements, setVisibleElements] = useState<boolean[]>([]);

  useEffect(() => {
    // Inicializa o array de visibilidade com false para todos os elementos
    setVisibleElements(new Array(experiences.length).fill(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleElements((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    // Observa apenas os elementos visíveis
    const elements = document.querySelectorAll(".experience-card");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [visibleCards]);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulando um delay de carregamento
    setTimeout(() => {
      setVisibleCards((prev) => prev + 5);
      setIsLoading(false);
    }, 500);
  };

  return (
    <ExperienceSection id="Experiencia">
      <ExperienceContainer>
        <Title
          title="Experiência"
          subTitle="Minha jornada"
          description="Minhas experiências profissionais"
        />
        <TimelineContainer>
          {experiences.slice(0, visibleCards).map((exp, index) => (
            <ExperienceCardWrapper
              key={index}
              isVisible={visibleElements[index]}
              className="experience-card"
              data-index={index}
            >
              <ExperienceCard {...exp} />
            </ExperienceCardWrapper>
          ))}
        </TimelineContainer>
        <LoadMoreButton>
          {visibleCards < experiences.length && (
            <Button onClick={handleLoadMore}>
              {isLoading ? "Carregando..." : "Ver mais"}
              <IoIosArrowDown />
            </Button>
          )}
        </LoadMoreButton>
      </ExperienceContainer>
    </ExperienceSection>
  );
}
