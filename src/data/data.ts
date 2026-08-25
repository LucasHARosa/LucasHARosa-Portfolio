import { GiOctopus } from "react-icons/gi";
import { IoDesktopOutline } from "react-icons/io5";
import { MdOutlineDevices } from "react-icons/md";
import { TbDeviceMobileCode } from "react-icons/tb";
import type { IconType } from "react-icons";

export type ProjetoTipo =
  | "principais"
  | "backend"
  | "fullstack"
  | "frontend"
  | "mobile"
  | "ia"
  | "academicos";

export interface ProjetosProps {
  id: number;
  titulo: string;
  descricao: string;
  tags: string[];
  imagem: string;
  LinkGit: string;
  LinkGitBack?: string;
  LinkGitFront?: string;
  Link: string;
  LinkGoogle?: string;
  LinkApple?: string;
  tipo: ProjetoTipo[];
}

export const listaProjetos: ProjetosProps[] = [
  {
    id: 25,
    titulo: "RosaBet",
    descricao:
      "Plataforma de apostas esportivas e cassino online. API em FastAPI com arquitetura limpa em camadas (API, Aplicação, Domínio e Infraestrutura), SQLAlchemy 2.0 async, PostgreSQL e Redis para cache e pub/sub. Odds ao vivo via WebSocket atualizadas a cada 5s, liquidação automática de apostas em background, autenticação JWT e depósitos PIX simulados. Front-end em Next.js consumindo os dados em tempo real.",
    tags: ["FastAPI", "Python", "WebSocket", "PostgreSQL", "Redis", "Next.js"],
    imagem: "/imagens/RosaBet.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/BE-RosaBet",
    LinkGitBack: "https://github.com/LucasHARosa/BE-RosaBet",
    LinkGitFront: "https://github.com/LucasHARosa/FE-RosaBet",
    tipo: ["principais", "backend", "fullstack", "frontend"],
  },
  {
    id: 24,
    titulo: "Daily Diet",
    descricao:
      "Acompanhamento de dieta e refeições diárias, com app mobile em React Native (Expo) e API REST em Go. Back-end com arquitetura em camadas, autenticação JWT, PostgreSQL, cálculo das métricas de progresso e estimativa de calorias com IA via Google Gemini.",
    tags: ["Go", "PostgreSQL", "React Native", "Expo", "JWT"],
    imagem: "/imagens/dailydiet.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/BE-Daily-Diet",
    LinkGitBack: "https://github.com/LucasHARosa/BE-Daily-Diet",
    LinkGitFront: "https://github.com/LucasHARosa/APP-Daily-Diet",
    tipo: ["principais", "backend", "mobile", "fullstack"],
  },
  // Slot reservado para um projeto Java/Spring Boot em destaque.
  // Basta descomentar e preencher os campos para ele entrar no carrossel da Home.
  // {
  //   id: 26,
  //   titulo: "",
  //   descricao: "",
  //   tags: ["Java", "Spring Boot", "PostgreSQL"],
  //   imagem: "/imagens/.png",
  //   Link: "",
  //   LinkGit: "",
  //   tipo: ["principais", "backend"],
  // },
  {
    id: 3,
    titulo: "SporTickets",
    descricao:
      "Venda de ingressos para eventos esportivos, com checkout para o torcedor e painel de gestão para o organizador. Responsável pelas APIs em NestJS, pelas regras de disponibilidade e emissão de ingressos e pelas telas em Next.js. Stack: NestJS, Next.js, TypeScript.",
    tags: ["Projeto Real", "NextJs", "NestJS"],
    imagem: "/imagens/sporticket.png",
    Link: "https://www.sportickets.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["principais", "fullstack", "backend", "frontend"],
  },
  {
    id: 5,
    titulo: "Nacional Go",
    descricao:
      "Sistema de transporte e logística veicular, com área do cliente, e-commerce e acompanhamento das ordens de transporte em todo o território nacional. Atuei no back-end em PHP e no front-end em React, implementando funcionalidades, integrações entre sistemas e ajustes de regras de negócio. Stack: PHP, React, MySQL.",
    tags: ["Projeto Real", "React", "PHP"],
    imagem: "/imagens/nacional.png",
    Link: "https://app.nacionalgo.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["principais", "fullstack", "backend", "frontend"],
  },
  {
    id: 7,
    titulo: "Cortex",
    descricao:
      "App mobile de monitoramento IoT publicado na Play Store e na App Store. Recebe leituras de sensores na nuvem, exibe séries temporais em gráficos, sinaliza anomalias como vazamentos e permite configurar alarmes. Fui responsável pelas telas, pela integração com a API de telemetria e pela publicação nas lojas. Stack: React Native, Expo, TypeScript.",
    tags: ["Projeto Real", "React Native", "Expo"],
    imagem: "/imagens/cortex.png",
    Link: "",
    LinkGit: "",
    LinkGoogle: "https://play.google.com/store/apps/details?id=com.besx.core",
    LinkApple: "https://apps.apple.com/us/app/cortex-app/id6449041878",
    tipo: ["principais", "mobile"],
  },
  {
    id: 17,
    titulo: "TCC: IA para Soldagem",
    descricao:
      "Trabalho de conclusão do curso de Engenharia Mecatrônica na UnB: detecção e classificação de padrões em cordões de solda por visão computacional. Treinei modelos YOLOv8 sobre um conjunto de imagens de soldagem para automatizar a inspeção de qualidade na manufatura. Stack: Python, YOLOv8, CNN.",
    tags: ["CNN", "TCC", "YOLOV8"],
    imagem: "/imagens/tcc1.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/UnB-TCC-IA",
    tipo: ["principais", "ia", "academicos"],
  },
  {
    id: 2,
    titulo: "Mouv Brasil",
    descricao:
      "Venda e gestão de ingressos para eventos, com criação de eventos, lotes, checkout e painel do organizador. Atuei no back-end em NestJS — APIs REST, regras de negócio de lotes e pedidos e modelagem de dados — e no front-end em Next.js. Stack: NestJS, Next.js, TypeScript, PostgreSQL.",
    tags: ["Projeto Real", "NextJs", "NestJS"],
    imagem: "/imagens/mouv.png",
    Link: "https://www.mouvbrasil.com/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["fullstack", "backend", "frontend"],
  },
  {
    id: 4,
    titulo: "Base 3",
    descricao:
      "Sistema de gestão acadêmica para escolas e cursos: cadastro de turmas e alunos, acompanhamento de desempenho e geração de relatórios. Atuei nas APIs em NestJS e na modelagem das entidades acadêmicas, além das interfaces em React. Stack: NestJS, React, TypeScript.",
    tags: ["Projeto Real", "React", "NestJS"],
    imagem: "/imagens/base3.png",
    Link: "https://base3edu.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["fullstack", "backend", "frontend"],
  },
  {
    id: 8,
    titulo: "Vale Energia",
    descricao:
      "Sistema web para pagamento de contas de energia e aquisição de vales-energia, com painel para empresas parceiras cadastrarem e acompanharem campanhas. Atuei no back-end em Node.js e no front-end em React com Vite. Stack: Node.js, React, Vite.",
    tags: ["Projeto Real", "React", "Vite", "NodeJS"],
    imagem: "/imagens/valeenergia.png",
    Link: "https://hml.valeenergia.site",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["fullstack", "backend", "frontend"],
  },
  {
    id: 1,
    titulo: "DubPay",
    descricao:
      "Fintech de pagamentos com checkout, gestão de transações e área do cliente. Atuei no front-end das aplicações web em Next.js e Vite, consumindo as APIs de pagamento e implementando os fluxos de checkout e de acompanhamento de transações. Stack: Next.js, React, Vite, TypeScript.",
    tags: ["Projeto Real", "NextJs", "Vite", "React App"],
    imagem: "/imagens/dubpay.png",
    Link: "https://dubpay.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend"],
  },
  {
    id: 23,
    titulo: "Studio Cole",
    descricao:
      "Site institucional de um escritório de arquitetura, com portfólio de projetos e páginas de serviços. Desenvolvi o site em Next.js com foco em renderização estática, otimização de imagens e SEO. Stack: Next.js, TypeScript.",
    tags: ["Projeto Real", "NextJs", "TypeScript"],
    imagem: "/imagens/studiocole.png",
    Link: "https://studiocole.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend"],
  },
  {
    id: 6,
    titulo: "Anac Arquitetura",
    descricao:
      "Site institucional de escritório de arquitetura, com portfólio de projetos e páginas de serviços. Desenvolvido em Next.js, com foco em performance de carregamento e SEO. Stack: Next.js, React, TypeScript.",
    tags: ["Projeto Real", "React", "Next", "TypeScript"],
    imagem: "/imagens/anac.png",
    Link: "https://anacotrim.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend"],
  },
  {
    id: 11,
    titulo: "Arthos",
    descricao:
      "App mobile de controle de acesso publicado na Play Store e na App Store, usado para gerenciar permissões de entrada em salas, prédios e áreas restritas. Responsável pelas telas, pela integração com a API de credenciais e pela publicação nas lojas. Stack: React Native, Expo.",
    tags: ["Projeto Real", "React Native", "Expo"],
    imagem: "/imagens/Arthos.png",
    Link: "",
    LinkGit: "",
    LinkGoogle:
      "https://play.google.com/store/apps/details?id=com.lucash_rosa.remapp",
    LinkApple: "https://apps.apple.com/br/app/arthos/id6526462876",
    tipo: ["mobile"],
  },
  {
    id: 12,
    titulo: "Gym Train",
    descricao:
      "App mobile para montar treinos e registrar evolução física: cadastro de exercícios por grupo muscular, séries e histórico de execuções. Stack: React Native, TypeScript, Styled Components.",
    tags: ["React Native", "TypeScript", "Styled Components"],
    imagem: "/imagens/gyntrain.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Gym-Train",
    tipo: ["mobile", "academicos"],
  },
  {
    id: 10,
    titulo: "I Weather",
    descricao:
      "App mobile de previsão do tempo consumindo uma API pública de meteorologia. O foco do projeto foi qualidade de código: cobertura de testes unitários e de componentes com Jest. Stack: React Native, Jest.",
    tags: ["React Native", "Jest"],
    imagem: "/imagens/iweather.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IWeather",
    tipo: ["mobile", "academicos"],
  },
  {
    id: 9,
    titulo: "Quiz Programing",
    descricao:
      "App mobile de quiz sobre programação, com perguntas separadas por linguagem e progressão de dificuldade. Projeto de estudo focado em navegação, estado local e componentização com Native Base. Stack: React Native, Native Base.",
    tags: ["React Native", "Native Base"],
    imagem: "/imagens/quizprogram.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Quiz-Programing",
    tipo: ["mobile", "academicos"],
  },
  {
    id: 13,
    titulo: "DT Money",
    descricao:
      "Aplicação web de controle financeiro pessoal: cadastro de entradas e saídas, categorização das transações e resumo do saldo. Projeto de estudo com foco em formulários, filtros e consumo de API. Stack: React, TypeScript, json-server.",
    tags: ["React", "TypeScript", "json-server"],
    imagem: "/imagens/dt_money.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/DT-Money",
    tipo: ["frontend", "academicos"],
  },
  {
    id: 14,
    titulo: "Timer Pomodoro",
    descricao:
      "Aplicação web de ciclos Pomodoro com registro de tarefas e histórico de ciclos concluídos, interrompidos e em andamento. Projeto de estudo com foco em Context API e reducers para controlar o estado do timer. Stack: React, TypeScript.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/timer_pomoro_1.png",
    Link: "https://lucasharosa.github.io/Timer-Pomodoro/",
    LinkGit: "https://github.com/LucasHARosa/Timer-Pomodoro",
    tipo: ["frontend", "academicos"],
  },
  {
    id: 15,
    titulo: "Coffee Delivery",
    descricao:
      "E-commerce de cafés com catálogo, carrinho, cálculo do pedido, escolha da forma de pagamento e endereço de entrega. Projeto de estudo com foco em estado global do carrinho e validação de formulários. Stack: React, TypeScript.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/coffe_deliveryHome.png",
    Link: "https://lucasharosa.github.io/Coffee-Delivery/",
    LinkGit: "https://github.com/LucasHARosa/Coffe-Delivery",
    tipo: ["frontend", "academicos"],
  },
  {
    id: 16,
    titulo: "Enigm",
    descricao:
      "Jogo de adivinhação de palavras no estilo Termo/Wordle, com validação das tentativas e feedback visual por letra a cada rodada. Stack: Next.js, React, TypeScript.",
    tags: ["NextJs", "TypeScript", "React"],
    imagem: "/imagens/Enigm.png",
    Link: "https://enigm.vercel.app/",
    LinkGit: "https://github.com/LucasHARosa/Enigm",
    tipo: ["frontend", "academicos"],
  },
  {
    id: 22,
    titulo: "Feed de notícias",
    descricao:
      "Interface de feed social com publicações, comentários e reações. Projeto de estudo com foco em composição de componentes e tipagem de props. Stack: React, TypeScript.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/telaInicial.png",
    Link: "https://lucasharosa.github.io/Ignite-Feed/",
    LinkGit: "https://github.com/LucasHARosa/Ignite-Feed",
    tipo: ["frontend", "academicos"],
  },
  {
    id: 18,
    titulo: "Redes Neurais: Classificação",
    descricao:
      "Projeto acadêmico de classificação com redes neurais: comparação de arquiteturas e hiperparâmetros e avaliação por métricas de acurácia sobre um conjunto de dados rotulado. Stack: Python, Redes Neurais.",
    tags: ["Python", "Redes Neurais"],
    imagem:
      "https://static.imasters.com.br/wp-content/uploads/2016/06/redes-1.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Classification",
    tipo: ["ia", "academicos"],
  },
  {
    id: 19,
    titulo: "Redes Neurais: Regressão",
    descricao:
      "Projeto acadêmico de regressão com redes neurais para previsão de valores contínuos, cobrindo treinamento, validação e análise do erro do modelo. Stack: Python, Redes Neurais.",
    tags: ["Python", "Redes Neurais"],
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXAcZTGYRe0OSumsIhXkiXB44sVkhC-X64ig&usqp=CAU",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Regression",
    tipo: ["ia", "academicos"],
  },
  {
    id: 20,
    titulo: "Redes Neurais Convolucionais",
    descricao:
      "Projeto acadêmico de redes neurais convolucionais aplicadas a imagens: extração de características, classificação e avaliação dos mapas de ativação. Stack: Python, CNN.",
    tags: ["Python", "Redes Neurais", "CNN"],
    imagem:
      "https://www.sakurai.dev.br/assets/images/posts/2017-12-20-cnn-mapreduce.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Convolution",
    tipo: ["ia", "academicos"],
  },
  {
    id: 21,
    titulo: "Redes Neurais com Ruído",
    descricao:
      "Estudo acadêmico sobre a robustez de redes neurais a ruído: aplicação de diferentes tipos e intensidades de ruído nas entradas e medição da degradação da acurácia do modelo. Stack: Python, CNN.",
    tags: ["CNN", "Redes Neurais", "Ruído"],
    imagem: "/imagens/ruidos.PNG",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Ruidos",
    tipo: ["ia", "academicos"],
  },
];

/**
 * Categorias usadas nos filtros da página /projetos.
 * O ícone é uma chave: cada componente mapeia para o ícone que já utiliza.
 * "principais" não aparece aqui — alimenta apenas o carrossel de destaques da Home.
 */
export type CategoriaIcone =
  | "grid"
  | "server"
  | "globe"
  | "code"
  | "mobile"
  | "cpu"
  | "cap";

export interface ProjetoCategoria {
  label: string;
  value: string;
  icon: CategoriaIcone;
}

export const projetoCategorias: ProjetoCategoria[] = [
  { label: "Todos", value: "todos", icon: "grid" },
  { label: "Back-end", value: "backend", icon: "server" },
  { label: "Full-Stack", value: "fullstack", icon: "globe" },
  { label: "Front-end", value: "frontend", icon: "code" },
  { label: "Mobile", value: "mobile", icon: "mobile" },
  { label: "IA", value: "ia", icon: "cpu" },
  { label: "Acadêmicos", value: "academicos", icon: "cap" },
];

export function contarProjetos(value: string) {
  if (value === "todos") return listaProjetos.length;
  return listaProjetos.filter((p) => p.tipo.includes(value as ProjetoTipo))
    .length;
}

export function filtrarProjetos(value: string) {
  if (value === "todos") return listaProjetos;
  return listaProjetos.filter((p) => p.tipo.includes(value as ProjetoTipo));
}

export function labelCategoria(value: string) {
  return projetoCategorias.find((c) => c.value === value)?.label ?? "Projetos";
}

export interface SkillProps {
  id: string;
  titulo: string;
  description: string;
  tecnologiasAxiliares: string[];
}

export const listaSkills: SkillProps[] = [
  {
    id: "java",
    titulo: "Java",
    description:
      "Desenvolvimento back-end com Java e Spring Boot: APIs REST, regras de negócio, integração entre sistemas e persistência com JPA. Experiência em contextos industriais, fintech e sistemas governamentais.",
    tecnologiasAxiliares: [
      "Spring Boot",
      "Spring Web",
      "Spring Data JPA",
      "Spring Security",
      "Hibernate",
      "PostgreSQL",
      "DB2",
    ],
  },
  {
    id: "nodejs",
    titulo: "Node.js",
    description:
      "Construção de APIs e serviços com Node.js: autenticação JWT, filas de mensageria, WebSockets, microsserviços e integração com bancos relacionais e NoSQL.",
    tecnologiasAxiliares: [
      "NestJS",
      "Express",
      "TypeORM",
      "Prisma",
      "Socket.io",
      "JWT",
      "RabbitMQ",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    id: "nestjs",
    titulo: "NestJS",
    description:
      "Back-end modular com NestJS: arquitetura em camadas, princípios SOLID, injeção de dependência, guards, interceptors e pipes, com persistência via TypeORM ou Prisma e documentação por Swagger.",
    tecnologiasAxiliares: [
      "TypeScript",
      "Node.js",
      "JWT",
      "TypeORM",
      "Prisma",
      "Swagger",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    id: "python",
    titulo: "Python",
    description:
      "APIs, automações e soluções de IA com Python. Experiência com FastAPI e Django, análise de dados, visão computacional e integração com modelos de machine learning.",
    tecnologiasAxiliares: [
      "FastAPI",
      "Django",
      "Pandas",
      "Numpy",
      "Scikit-Learn",
      "TensorFlow",
      "PyTorch",
      "N8N",
    ],
  },
  {
    id: "fastapi",
    titulo: "FastAPI",
    description:
      "APIs REST assíncronas e documentadas com FastAPI: autenticação, SQLAlchemy async, OCR, integração com gateways de pagamento e arquitetura de microsserviços em Python.",
    tecnologiasAxiliares: [
      "Python",
      "Pydantic",
      "SQLAlchemy",
      "PostgreSQL",
      "Redis",
      "JWT",
      "Docker",
      "Swagger",
    ],
  },
  {
    id: "go",
    titulo: "Go",
    description:
      "Serviços back-end em Go com foco em concorrência e baixa latência: APIs REST em arquitetura de camadas, autenticação JWT e integração com PostgreSQL.",
    tecnologiasAxiliares: [
      "Gin",
      "Fiber",
      "GORM",
      "PostgreSQL",
      "Docker",
      "gRPC",
    ],
  },
  {
    id: "react",
    titulo: "React",
    description:
      "Aplicações web com React: hooks, Context API, gerenciamento de estado, componentização e padrões de organização para bases de código grandes.",
    tecnologiasAxiliares: [
      "Next.js",
      "Styled Components",
      "Redux",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Jest",
    ],
  },
  {
    id: "nextjs",
    titulo: "Next.js",
    description:
      "Aplicações com SSR, SSG e ISR em Next.js, com atenção a performance, SEO e Core Web Vitals em plataformas de alto tráfego.",
    tecnologiasAxiliares: [
      "React",
      "TypeScript",
      "Vercel",
      "App Router",
      "API Routes",
    ],
  },
  {
    id: "typescript",
    titulo: "TypeScript",
    description:
      "TypeScript no front-end e no back-end: tipos genéricos, utility types, decorators e tipagem compartilhada entre camadas.",
    tecnologiasAxiliares: ["React", "Node.js", "NestJS", "Next.js"],
  },
  {
    id: "react-native",
    titulo: "React Native",
    description:
      "Aplicativos cross-platform para Android e iOS com React Native e Expo: integração com APIs e sensores, dados em tempo real e publicação nas lojas.",
    tecnologiasAxiliares: [
      "Expo",
      "Native Base",
      "React Navigation",
      "Gesture Handler",
      "Reanimated",
    ],
  },
  {
    id: "github",
    titulo: "Git/GitHub",
    description:
      "Versionamento e colaboração em equipe: GitFlow, pull requests, code review e pipelines de CI/CD com GitHub Actions.",
    tecnologiasAxiliares: [
      "Git",
      "GitHub",
      "GitFlow",
      "CI/CD",
      "GitHub Actions",
    ],
  },
  {
    id: "code",
    titulo: "C++",
    description:
      "Base em C/C++ para sistemas embarcados, microcontroladores e automação — a fundação por trás do entendimento de performance, memória e arquitetura de baixo nível.",
    tecnologiasAxiliares: ["C++", "C", "Microcontroladores", "Arduino", "IoT"],
  },
];

export const dadosEInfra: { titulo: string; itens: string[] }[] = [
  {
    titulo: "Dados",
    itens: ["PostgreSQL", "DB2", "MongoDB", "Redis"],
  },
  {
    titulo: "Infra / Engenharia",
    itens: [
      "Docker",
      "Kubernetes",
      "RabbitMQ",
      "CI/CD",
      "Git",
      "Testes automatizados",
      "APIs REST",
      "Microsserviços",
      "SOLID",
    ],
  },
];

/**
 * Tags que identificam cada skill nas experiências e nos projetos.
 * Usadas por `ondeUsei` para montar o bloco "Onde usei" a partir dos dados
 * que já existem — nada é escrito à mão lá.
 */
const skillMatchers: Record<string, string[]> = {
  java: ["Java", "Spring Boot"],
  nodejs: ["Node.js", "NodeJS", "NestJS"],
  nestjs: ["NestJS"],
  python: ["Python", "Django", "FastAPI"],
  fastapi: ["FastAPI"],
  go: ["Go"],
  react: ["React", "React App"],
  nextjs: ["Next.js", "NextJs", "Next"],
  typescript: ["TypeScript"],
  "react-native": ["React Native"],
  github: ["CI/CD", "GitFlow"],
  code: ["C++", "IoT", "Microcontroladores", "Arduino"],
};

const normalizar = (valor: string) => valor.toLowerCase().trim();

export function ondeUsei(skillId: string) {
  const termos = (skillMatchers[skillId] ?? []).map(normalizar);

  if (termos.length === 0) {
    return { empresas: [], projetos: [] };
  }

  const combina = (tags: string[]) =>
    tags.some((tag) => termos.includes(normalizar(tag)));

  return {
    empresas: listaExperiencias
      .filter((exp) => combina(exp.tags))
      .map((exp) => exp.subtitle),
    projetos: listaProjetos
      .filter((projeto) => combina(projeto.tags))
      .map((projeto) => projeto.titulo),
  };
}

export interface ExperienciaProps {
  icon: IconType;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const listaExperiencias: ExperienciaProps[] = [
  {
    icon: GiOctopus,
    title: "Founder & Desenvolvedor Full-Stack · Back-end, Web e Mobile",
    subtitle: "OctoLuna",
    description:
      "Presto serviços de desenvolvimento pela minha própria software house. Atuo na arquitetura e no desenvolvimento de APIs REST, integrações com serviços externos, gateways de pagamento (Pagar.me, Mercado Pago), automações de processos, modelagem de banco de dados e deploy em cloud (Heroku, Vercel, AWS S3) — além das aplicações web e mobile que consomem essas APIs.",
    tags: [
      "NestJS",
      "Node.js",
      "Next.js",
      "React Native",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Full-Stack · Arquitetura, APIs e Web",
    subtitle: "Power Pick",
    description:
      "Responsável pela arquitetura e pelo desenvolvimento de uma plataforma de comparação de tarifas e serviços de energia. No back-end em NestJS, defini a estrutura em módulos, as APIs REST, as regras de negócio da comparação e a modelagem de dados, usando Redis para cache das consultas e integrações com provedores externos. No front-end, estruturei a aplicação em Next.js com SSR e SEO, participando das decisões técnicas do produto.",
    tags: [
      "NestJS",
      "Node.js",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "TypeScript",
    ],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full-Stack · Fintech, Pagamentos e Web",
    subtitle: "DubPay",
    description:
      "Desenvolvimento e manutenção de uma fintech de pagamentos. Atuei nos fluxos de checkout, no processamento e na conciliação de transações e nas integrações com gateways, trabalhando no back-end em Java e PHP/Laravel e nas aplicações web em React e Next.js. Mensageria com RabbitMQ para o processamento assíncrono das transações, containers com Docker e Kubernetes, monitoramento das aplicações e pipelines de CI/CD.",
    tags: [
      "Java",
      "PHP",
      "Laravel",
      "Next.js",
      "React",
      "RabbitMQ",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
  },
  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Full-Stack · Web, Mobile e Automações",
    subtitle: "Nacional GO",
    description:
      "Desenvolvi e mantive o sistema web interno da empresa de logística veicular: back-end em PHP, front-end em React, novas funcionalidades, ajustes de regras de negócio e integrações entre sistemas. Desenvolvi também o aplicativo dos motoristas em React Native, usado na operação de transporte, e automações de processos internos com N8N e IA.",
    tags: ["PHP", "React", "React Native", "N8N", "MySQL"],
  },
  {
    icon: MdOutlineDevices,
    title: "Desenvolvedor Full-Stack · Back-end, Web e Mobile",
    subtitle: "Grupo Bseen",
    description:
      "Desenvolvimento do MVP de uma plataforma de gestão de energia. No back-end em FastAPI, criei endpoints, regras de negócio, autenticação, integrações com serviços externos, fluxos de pagamento e leitura de faturas com OCR. No front-end e no mobile, implementei os painéis administrativos e as telas que consomem essas APIs.",
    tags: ["FastAPI", "Python", "React", "React Native", "OCR", "PostgreSQL"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full-Stack · Back-end e Mobile",
    subtitle: "MarjoSports",
    description:
      "No back-end, trabalhei com Python/Django na evolução dos microsserviços da plataforma, nas integrações com APIs e nas regras de negócio, implementando comunicação em tempo real com WebSockets e Server-Sent Events (SSE) para a atualização contínua dos dados. No mobile, mantive os apps existentes em Kotlin e fui responsável pela criação do novo aplicativo em React Native, substituindo a base defasada.",
    tags: [
      "Python",
      "Django",
      "Microsserviços",
      "React Native",
      "Kotlin",
      "WebSocket",
      "SSE",
    ],
  },
  {
    icon: TbDeviceMobileCode,
    title: "Desenvolvedor Mobile · Arquitetura React Native e IoT",
    subtitle: "Grupo Orion",
    description:
      "Desenvolvi e defini a arquitetura de aplicações mobile cross-platform para automação predial e IoT. Os apps consomem dados de sensores em tempo real e exibem métricas operacionais das áreas monitoradas. Atuei na estrutura dos projetos, nas interfaces, na integração com as APIs de telemetria, no tratamento dos dados em tempo real e na publicação nas lojas Android e iOS.",
    tags: ["React Native", "Expo", "IoT", "TypeScript", "Android", "iOS"],
  },
  {
    icon: IoDesktopOutline,
    title: "Desenvolvedor Full-Stack · Back-end Java e Mobile",
    subtitle: "Asset Tecnologia e Dados",
    description:
      "Sistema de gestão industrial voltado à otimização de processos de chão de fábrica. No back-end com Java e Spring Boot, criei e mantive APIs REST, implementei regras de negócio e integrações entre sistemas. No mobile, desenvolvi funcionalidades em React Native para os operadores de fábrica, integrando com sensores e equipamentos industriais.",
    tags: ["Java", "Spring Boot", "React Native", "MySQL", "APIs REST"],
  },
  {
    icon: IoDesktopOutline,
    title: "Estagiário · Back-end Java e Dados",
    subtitle: "Ministério das Comunicações",
    description:
      "Atuei no programa de inclusão de internet em escolas públicas de áreas afastadas. Desenvolvi e mantive serviços back-end em Java para os sistemas do programa e trabalhei na integração e consolidação de bases de dados com Python e SQL, além de relatórios em Power BI para apoiar a tomada de decisão.",
    tags: ["Java", "Python", "SQL", "PostgreSQL", "Power BI"],
  },
  {
    icon: TbDeviceMobileCode,
    title: "Desenvolvedor de Projetos · Automação, IoT e Embarcados",
    subtitle: "Mecajun",
    description:
      "Projetos de automação residencial e predial com microcontroladores, sensores e dispositivos integrados. Cobri o ciclo completo: levantamento de requisitos, prototipação, desenvolvimento de firmware em C/C++, testes e entrega.",
    tags: ["C++", "IoT", "Microcontroladores", "Arduino", "Automação"],
  },
];
