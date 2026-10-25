/**
 * Templates de projeto da página /templates.
 * Para publicar um template: preencha `repo` e mude `status` para "disponivel".
 */
export interface TemplateProps {
  slug: string;
  nome: string;
  /** Camada do projeto — cabeçalho do card. */
  camada: string;
  descricao: string;
  stack: string[];
  status: "em-breve" | "disponivel";
  repo?: string;
}

export const listaTemplates: TemplateProps[] = [
  {
    slug: "nestjs",
    nome: "NestJS",
    camada: "Back-end",
    descricao:
      "API REST em módulos com autenticação JWT, validação, ORM, migrations, testes e Docker prontos.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
    status: "em-breve",
  },
  {
    slug: "fastapi",
    nome: "FastAPI",
    camada: "Back-end",
    descricao:
      "API assíncrona com arquitetura em camadas, SQLAlchemy 2.0, Alembic, autenticação e testes com pytest.",
    stack: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "Docker"],
    status: "em-breve",
  },
  {
    slug: "go",
    nome: "Go",
    camada: "Back-end",
    descricao:
      "Serviço HTTP em Go com arquitetura em camadas, migrations, configuração por ambiente e testes.",
    stack: ["Go", "PostgreSQL", "Docker"],
    status: "em-breve",
  },
  {
    slug: "java",
    nome: "Java · Spring Boot",
    camada: "Back-end",
    descricao:
      "API em Spring Boot com Spring Security, JPA, Flyway, documentação OpenAPI e testes.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    status: "em-breve",
  },
  {
    slug: "nextjs",
    nome: "Next.js",
    camada: "Web",
    descricao:
      "Aplicação web com App Router, Tailwind, autenticação, SEO e estrutura de componentes pronta para crescer.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    status: "em-breve",
  },
  {
    slug: "react-native",
    nome: "React Native",
    camada: "Mobile",
    descricao:
      "App com Expo, navegação, tema, consumo de API e build configurado para Android e iOS.",
    stack: ["React Native", "Expo", "TypeScript"],
    status: "em-breve",
  },
  {
    slug: "ia",
    nome: "Direcionamento para IA",
    camada: "Agentes de IA",
    descricao:
      "Base para trabalhar com agentes de código: CLAUDE.md/AGENTS.md, regras do projeto, prompts e fluxos de revisão.",
    stack: ["CLAUDE.md", "AGENTS.md", "Prompts"],
    status: "em-breve",
  },
];
