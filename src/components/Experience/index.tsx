"use client";

import { useState } from "react";
import { GiOctopus } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoDesktopOutline } from "react-icons/io5";
import { MdOutlineDevices } from "react-icons/md";
import { TbDeviceMobileCode } from "react-icons/tb";

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
    subtitle: "OctoLuna",
    description:
      "Presto serviços como desenvolvedor full stack pela minha própria software house. Atuo na arquitetura e desenvolvimento de APIs REST, integrações com serviços externos, automações de processos, gateways de pagamento (Pagar.me, Mercado Pago), deploy em cloud (Heroku, Vercel, AWS S3) e modelagem de banco de dados com foco em escalabilidade e segurança.",
    tags: ["NestJS", "Node.js", "Next.js", "PostgreSQL", "React Native"],
  },
  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Full Stack | Node.js | NestJS | Next.js",
    subtitle: "Power Pick",
    description:
      "Responsável pela arquitetura e desenvolvimento de uma plataforma brasileira de comparação de tarifas e serviços de energia. Atuei no desenvolvimento de APIs, modelagem de banco de dados, regras de negócio e integrações com foco em performance, segurança e confiabilidade. Também estruturei o front-end com Next.js utilizando SSR, SEO e otimização da experiência do usuário, participando das decisões técnicas do produto.",
    tags: ["NestJS", "Node.js", "Next.js", "PostgreSQL", "TypeScript"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full Stack | Next.js | PHP | Laravel",
    subtitle: "DubPay",
    description:
      "Atuei no desenvolvimento e manutenção de uma fintech de pagamentos, trabalhando tanto no back-end (PHP/Laravel) quanto no front-end (Next.js/Vite). Implementei integrações com gateways de pagamento, regras de negócio financeiras, autenticação segura e fluxos críticos de transações para consumidores e empresas.",
    tags: ["PHP", "Laravel", "Next.js", "Vite", "React"],
  },
  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Full Stack | PHP | React | React Native",
    subtitle: "Nacional GO",
    description:
      "Desenvolvi e mantive o sistema interno da empresa, atuando no back-end e front-end com PHP. Implementei funcionalidades, ajustei regras de negócio, mantive fluxos internos e realizei integrações entre sistemas. Desenvolvi um aplicativo mobile para motoristas em React Native, melhorando a eficiência operacional da logística. Também implementei automações de processos com inteligência artificial e N8N, otimizando fluxos internos e reduzindo custos operacionais.",
    tags: ["PHP", "React", "React Native", "N8N", "MySQL"],
  },
  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Full Stack | FastAPI | React | React Native",
    subtitle: "Grupo Bseen",
    description:
      "Atuei no desenvolvimento de uma plataforma de gestão de energia (MVP), com foco full stack em web e mobile. No back-end com FastAPI, contribuí com criação de APIs, estruturação de endpoints, regras de negócio, autenticação, integrações com serviços externos, fluxos de pagamento e leitura de documentos com OCR. No front-end e mobile, implementei interfaces, painéis administrativos e integração com APIs.",
    tags: ["FastAPI", "Python", "React", "React Native", "OCR", "PostgreSQL"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full Stack | Python/Django | React Native | Kotlin",
    subtitle: "MarjoSports",
    description:
      "Atuei na manutenção de apps Kotlin e fui responsável pela criação de um novo app em React Native, substituindo tecnologias defasadas. No back-end, trabalhei com Python/Django na manutenção e evolução de funcionalidades, integrações com APIs e regras de negócio da plataforma. Implementei comunicação em tempo real com WebSockets e Server-Sent Events (SSE) para melhorar o fluxo de dados e a experiência dos usuários.",
    tags: ["Python", "Django", "React Native", "Kotlin", "WebSocket", "SSE"],
  },
  {
    icon: TbDeviceMobileCode,
    title: "Desenvolvedor Mobile | React Native | Expo | IoT",
    subtitle: "Grupo Orion",
    description:
      "Desenvolvi aplicações mobile cross-platform para iOS e Android com React Native e Expo, focadas em automação predial e IoT. As aplicações consumiam dados de sensores em tempo real, exibindo métricas operacionais e informações de áreas monitoradas. Atuei no desenvolvimento das interfaces, integração com APIs, tratamento de dados em tempo real e publicação dos aplicativos nas lojas.",
    tags: ["React Native", "Expo", "IoT", "TypeScript"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full Stack | Java | Spring Boot | React Native",
    subtitle: "Asset Tecnologia e Dados",
    description:
      "Atuei no desenvolvimento de um sistema de gestão industrial voltado à otimização de processos de chão de fábrica. No back-end com Java e Spring Boot, criei e mantive APIs REST, implementei regras de negócio, integrei sistemas e realizei suporte técnico. No mobile, desenvolvi funcionalidades com React Native para operadores de fábrica, integrando com sensores e equipamentos industriais.",
    tags: ["Java", "Spring Boot", "React Native", "MySQL", "REST API"],
  },
  {
    icon: IoDesktopOutline,
    title: "Estagiário Back-end e Dados | Java | Python | SQL",
    subtitle: "Ministério das Comunicações",
    description:
      "Atuei na análise, automação e gestão de dados utilizando Python, SQL, Power BI e Excel, com foco em integração de processos e consolidação de informações estratégicas. Desenvolvi e mantive soluções back-end em Java para sistemas relacionados ao programa de inclusão de internet em escolas públicas de áreas afastadas, integrando bases de dados diversas para apoiar a tomada de decisão.",
    tags: ["Java", "Python", "SQL", "Power BI", "PostgreSQL"],
  },
  {
    icon: TbDeviceMobileCode,
    title: "Desenvolvedor de Projetos | Automação | IoT | Sistemas Embarcados",
    subtitle: "Mecajun",
    description:
      "Responsável pelo desenvolvimento e implementação de projetos de automação utilizando microcontroladores, sensores e dispositivos integrados. Trabalhei em soluções de automação residencial e predial, cobrindo todo o ciclo: levantamento de requisitos, prototipação, desenvolvimento de firmware em C/C++, testes e entrega das soluções.",
    tags: ["C++", "IoT", "Microcontroladores", "Arduino", "Automação"],
  },
];

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
        description=" Minha jornada como desenvolvedor, trabalhando com diversas
            tecnologias e projetos."
      />
      <ExperienceContainer>
        <TimelineContainer>
          {experiences.slice(0, visibleCards).map((exp, index) => (
            <ExperienceCardWrapper key={index}>
              <ExperienceCard {...exp} />
            </ExperienceCardWrapper>
          ))}
        </TimelineContainer>

        {visibleCards < experiences.length && (
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
