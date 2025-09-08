import { useEffect, useState } from "react";
import { GiOctopus } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoDesktopOutline } from "react-icons/io5";
import { MdOutlineDevices } from "react-icons/md";

import { FaGears } from "react-icons/fa6";
import { PiGraduationCapFill } from "react-icons/pi";
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
    title: "Founder & Desenvolvedor Full Stack",
    subtitle: "Octopus Studio (Software House)",
    description:
      "Atualmente presto serviços como desenvolvedor full stack por meio da minha própria software house. Atuo com desenvolvimento sob demanda de aplicações web e mobile, integrações com APIs de terceiros, automações de processos, gateways de pagamento (Pagar.me, Mercado Pago), deploy em cloud (Heroku, Vercel, S3) e arquitetura de software com foco em escalabilidade.",
    tags: ["Next.js", "NestJS", "React Native"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full Stack",
    subtitle: "DubPay",
    description:
      "Fintech de pagamentos que oferece soluções inovadoras para transações financeiras. Atuei no desenvolvimento e manutenção de aplicações web e mobile, integrações com gateways de pagamento e automações para consumidores e empresas.",
    tags: ["Next.js", "Vite", "React"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full Stack",
    subtitle: "Sportickets",
    description:
      "Plataforma de compra e venda de ingressos esportivos. Participei no desenvolvimento de funcionalidades para usuários finais e painel de parceiros, com foco em escalabilidade, performance e experiência de compra simplificada.",
    tags: ["Next.js", "NestJS", "React Native"],
  },
  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Full Stack",
    subtitle: "Nacional GO",
    description:
      "Responsável pelo novo ecommerce da Nacional GO, assim como o novo site da empresa. Atuei com funcionalidades front-end e back-end do sistema interno da empresa. Desenvolvi um app mobile para motoristas em React Native, otimizando operações logísticas. Também trabalhei na refatoração completa do site principal com React, com foco em performance, SEO e acessibilidade. Utilizei React, React Native e PHP",
    tags: ["PHP", "React", "React Native"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full Stack",
    subtitle: "Mouv Brasil",
    description:
      "Aplicação para compra e venda de ingressos online. Atuei tanto no frontend quanto no backend, construindo fluxos de compra, dashboards administrativos e integrações com sistemas de parceiros para gestão de eventos.",
    tags: ["Next.js", "NestJS"],
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
    title: "Desenvolvedor Full Stack",
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
    title: "Desenvolvedor Full Stack",
    subtitle: "Asset Tecnologia",
    description:
      "Atuação em sistema de gestão industrial, com React Native no front e Java no backend. Desenvolvi dashboards e funcionalidades críticas para fábricas, além de realizar integrações com sensores e equipamentos industriais. Também ofereci suporte técnico contínuo aos usuários.",
    tags: ["React Native", "Java", "Spring Boot", "Indústria", "APIs"],
  },
  {
    icon: IoDesktopOutline,
    title: "Estagiário de Desenvolvimento",
    subtitle: "Ministério das Comunicações",
    description:
      "Trabalhei com dados educacionais para inclusão digital de escolas públicas. Automatizei análises com Python, BI e SQL, além de desenvolver APIs internas com Java. Fiz parte da equipe de decisão de políticas públicas voltadas à infraestrutura escolar.",
    tags: ["Java", "Python", "Power BI", "SQL", "Dados Públicos"],
  },
  {
    icon: FaGears,
    title: "Engenheiro de Automação e Controle",
    subtitle: "Lockin",
    description:
      "Desenvolvi firmware para microcontroladores ESP32 e Arduino utilizados em armários inteligentes. Também criei aplicativos para tablets com React Native, documentei processos e liderava manutenções de sistemas integrados. Foco em eficiência operacional e escalabilidade de hardware.",
    tags: ["ESP32", "Arduino", "React Native", "Automação", "Firmware"],
  },
  {
    icon: PiGraduationCapFill,
    title: "Desenvolvedor de Projetos de Automação",
    subtitle: "Mecajun",
    description:
      "Atuei no desenvolvimento completo de projetos de automação residencial e predial, desde concepção até testes finais. Trabalhei com sensores, atuadores, e integração com microcontroladores, promovendo soluções inovadoras de baixo custo.",
    tags: ["Automação", "Microcontroladores", "Sensores", "Projetos"],
  },
  {
    icon: PiGraduationCapFill,
    title: "Analista de Negócios",
    subtitle: "Mecajun",
    description:
      "Responsável pela interface com clientes, definição de escopo e elaboração de contratos. Transformei requisitos de automação em soluções técnicas eficientes, alinhadas às necessidades de empresas e residências.",
    tags: ["Negócios", "Projetos", "Clientes", "Requisitos"],
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
              entry.target.getAttribute("data-index") || "0"
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
      }
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
