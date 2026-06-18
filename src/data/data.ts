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
  tipo: string[];
}

export const listaProjetos: ProjetosProps[] = [
  {
    id: 1,
    titulo: "DubPay",
    descricao:
      "Plataforma completa de fintech desenvolvida para revolucionar transações financeiras digitais. Sistema robusto que oferece soluções de pagamento seguras e eficientes para consumidores e empresas, com interface moderna e processos otimizados.",
    tags: ["Projeto Real", "NextJs", "Vite", "React App"],
    imagem: "/imagens/dubpay.png",
    Link: "https://dubpay.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend", "principais"],
  },
  {
    id: 2,
    titulo: "Mouv Brasil",
    descricao:
      "Sistema completo de gestão e comercialização de ingressos para eventos. Plataforma que conecta organizadores e público, permitindo compra segura de ingressos e ferramentas administrativas completas para criação e gerenciamento de eventos.",
    tags: ["Projeto Real", "NextJs", "NestJS"],
    imagem: "/imagens/mouv.png",
    Link: "https://www.mouvbrasil.com/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 3,
    titulo: "SporTickets",
    descricao:
      "Plataforma especializada em comercialização de ingressos para eventos esportivos. Sistema que oferece experiência otimizada de compra para torcedores e painel administrativo completo para organizadores gerenciarem eventos esportivos.",
    tags: ["Projeto Real", "NextJs", "NestJS"],
    imagem: "/imagens/sporticket.png",
    Link: "https://www.sportickets.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 4,
    titulo: "Base 3",
    descricao:
      "Plataforma de gestão de escolas, cursos e alunos. Sistema integrado que facilita administração acadêmica, acompanhamento de desempenho estudantil e geração de relatórios detalhados para instituições educacionais.",
    tags: ["Projeto Real", "React", "NestJS"],
    imagem: "/imagens/base3.png",
    Link: "https://base3edu.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 5,
    titulo: "Nacional Go",
    descricao:
      "Plataforma líder nacional em transporte veicular que gerencia todo processo logístico de movimentação de veículos. Sistema integrado com área do cliente, e-commerce completo e rastreamento em tempo real, atendendo todo território brasileiro.",
    tags: ["Projeto Real", "React", "PHP"],
    imagem: "/imagens/nacional.png",
    Link: "https://app.nacionalgo.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 24,
    titulo: "Daily Diet",
    descricao:
      "Sistema completo para acompanhamento de dieta e refeições diárias, com app mobile em React Native (Expo) e API REST em Go. Backend com arquitetura em camadas, autenticação JWT, PostgreSQL, métricas de progresso e estimativa de calorias com IA via Google Gemini.",
    tags: ["Go", "PostgreSQL", "React Native", "Expo", "JWT"],
    imagem: "/imagens/dailydiet.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/BE-Daily-Diet",
    LinkGitBack: "https://github.com/LucasHARosa/BE-Daily-Diet",
    LinkGitFront: "https://github.com/LucasHARosa/APP-Daily-Diet",
    tipo: ["backend", "mobile"],
  },
  {
    id: 23,
    titulo: "Studio Cole",
    descricao:
      "Website institucional desenvolvido para escritório de arquitetura. Plataforma moderna que apresenta portfólio de projetos arquitetônicos, serviços oferecidos e identidade visual refinada, com foco em performance e experiência do usuário.",
    tags: ["Projeto Real", "NextJs", "TypeScript"],
    imagem: "/imagens/studioCole.png",
    Link: "https://studiocole.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend", "principais"],
  },
  {
    id: 7,
    titulo: "Cortex",
    descricao:
      "Aplicativo mobile para monitoramento IoT de recursos em tempo real. Sistema inteligente que recebe dados de sensores na nuvem, detecta anomalias como vazamentos, apresenta análises através de gráficos dinâmicos e permite configuração de alarmes personalizados.",
    tags: ["Projeto Real", "React Native", "Expo"],
    imagem: "/imagens/cortex.png",
    Link: "",
    LinkGit: "",
    LinkGoogle: "https://play.google.com/store/apps/details?id=com.besx.core",
    LinkApple: "https://apps.apple.com/us/app/cortex-app/id6449041878",
    tipo: ["mobile", "principais"],
  },
  {
    id: 8,
    titulo: "Vale Energia",
    descricao:
      "Sistema web completo para gestão e pagamento de contas de energia elétrica. Plataforma que facilita pagamentos, permite aquisição de vales-energia e oferece ferramentas para empresas parceiras cadastrarem e gerenciarem campanhas promocionais.",
    tags: ["Projeto Real", "React", "Vite", "NodeJS"],
    imagem: "/imagens/valeenergia.png",
    Link: "https://hml.valeenergia.site",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend", "backend", "principais"],
  },
  {
    id: 6,
    titulo: "Anac Arquitetura",
    descricao:
      "Website institucional desenvolvido para escritório de arquitetura renomado. Plataforma elegante que apresenta portfólio completo de projetos, serviços especializados e identidade visual sofisticada, refletindo excelência em design arquitetônico.",
    tags: ["Projeto Real", "React", "Next", "TypeScript"],
    imagem: "/imagens/anac.png",
    Link: "https://anacotrim.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend"],
  },
  {
    id: 9,
    titulo: "Quiz Programing",
    descricao:
      "Aplicativo mobile interativo para avaliação de conhecimentos em programação. Plataforma gamificada com perguntas dinâmicas, desafios progressivos e cobertura de múltiplas linguagens e conceitos fundamentais de desenvolvimento de software.",
    tags: ["React Native", "Native Base"],
    imagem: "/imagens/quizprogram.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Quiz-Programing",
    tipo: ["mobile"],
  },
  {
    id: 10,
    titulo: "I Weather",
    descricao:
      "Aplicativo mobile de previsão meteorológica com dados em tempo real. Projeto desenvolvido com foco em qualidade de código, implementando cobertura completa de testes unitários e automatizados utilizando Jest para garantir confiabilidade.",
    tags: ["React Native", "Jest"],
    imagem: "/imagens/iweather.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IWeather",
    tipo: ["mobile"],
  },
  {
    id: 11,
    titulo: "Arthos",
    descricao:
      "Sistema mobile de controle de acesso inteligente para ambientes corporativos. Solução tecnológica que gerencia permissões de entrada em salas, prédios e áreas restritas, oferecendo segurança avançada e facilidade operacional através de dispositivos móveis.",
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
      "Aplicativo mobile completo para gestão de treinos e evolução física. Ferramenta que permite cadastro personalizado de exercícios, organização por grupos musculares, acompanhamento de progresso e visualização de histórico detalhado de performance.",
    tags: ["React Native", "TypeScript", "Styled Components"],
    imagem: "/imagens/gyntrain.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Gym-Train",
    tipo: ["mobile"],
  },
  {
    id: 13,
    titulo: "DT Money",
    descricao:
      "Aplicação web para gestão completa de finanças pessoais. Sistema intuitivo que permite controle de receitas e despesas, categorização de transações, visualização de balanços e análise de gastos para melhor planejamento financeiro.",
    tags: ["React", "TypeScript", "json-server"],
    imagem: "/imagens/dt_money.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/DT-Money",
    tipo: ["frontend"],
  },
  {
    id: 14,
    titulo: "Timer Pomodoro",
    descricao:
      "Aplicação web baseada na técnica Pomodoro para otimização de produtividade. Ferramenta que permite configuração personalizada de ciclos de trabalho e descanso, gerenciamento de tarefas e acompanhamento de tempo focado em atividades.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/timer_pomoro_1.png",
    Link: "https://lucasharosa.github.io/Timer-Pomodoro/",
    LinkGit: "https://github.com/LucasHARosa/Timer-Pomodoro",
    tipo: ["frontend"],
  },
  {
    id: 15,
    titulo: "Coffee Delivery",
    descricao:
      "E-commerce completo especializado em cafés especiais e produtos relacionados. Plataforma que simula sistema real de pedidos online com carrinho de compras interativo, cálculo automático de valores, seleção de métodos de pagamento e endereço de entrega.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/coffe_deliveryHome.png",
    Link: "https://lucasharosa.github.io/Coffee-Delivery/",
    LinkGit: "https://github.com/LucasHARosa/Coffe-Delivery",
    tipo: ["frontend"],
  },
  {
    id: 16,
    titulo: "Enigm",
    descricao:
      "Jogo de adivinhação de palavras inspirado no TERMO/Wordle. Aplicação web interativa que desafia jogadores a descobrir palavras através de tentativas estratégicas, com feedback visual em tempo real e mecânica envolvente de progressão.",
    tags: ["NextJs", "TypeScript", "React"],
    imagem: "/imagens/Enigm.png",
    Link: "https://enigm.vercel.app/",
    LinkGit: "https://github.com/LucasHARosa/Enigm",
    tipo: ["frontend"],
  },
  {
    id: 17,
    titulo: "TCC: IA para Soldagem",
    descricao:
      "Trabalho de Conclusão de Curso aplicando visão computacional para inspeção de qualidade industrial. Sistema de IA baseado em YOLOV8 que detecta e classifica padrões em processos de soldagem, automatizando controle de qualidade em manufatura.",
    tags: ["CNN", "TCC", "YOLOV8"],
    imagem: "/imagens/tcc1.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/UnB-TCC-IA",
    tipo: ["ia"],
  },
  {
    id: 18,
    titulo: "Redes Neurais: Classificação",
    descricao:
      "Projeto acadêmico de Machine Learning focado em algoritmos de classificação. Implementação de redes neurais para categorização de dados, explorando diferentes arquiteturas e técnicas de otimização para maximizar precisão e desempenho preditivo.",
    tags: ["Python", "Redes Neurais"],
    imagem:
      "https://static.imasters.com.br/wp-content/uploads/2016/06/redes-1.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Classification",
    tipo: ["ia"],
  },
  {
    id: 19,
    titulo: "Redes Neurais: Regressão",
    descricao:
      "Projeto de Machine Learning aplicando modelos de regressão para previsão de valores contínuos. Desenvolvimento de redes neurais especializadas em estimativa numérica, utilizando técnicas avançadas de treinamento e validação de modelos.",
    tags: ["Python", "Redes Neurais"],
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXAcZTGYRe0OSumsIhXkiXB44sVkhC-X64ig&usqp=CAU",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Regression",
    tipo: ["ia"],
  },
  {
    id: 20,
    titulo: "Redes Neurais Convolucionais",
    descricao:
      "Projeto de Deep Learning aplicando CNNs para visão computacional. Implementação de arquiteturas convolucionais para processamento e análise de imagens, incluindo detecção de padrões, extração de características e reconhecimento de objetos.",
    tags: ["Python", "Redes Neurais", "CNN"],
    imagem:
      "https://www.sakurai.dev.br/assets/images/posts/2017-12-20-cnn-mapreduce.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Convolution",
    tipo: ["ia"],
  },
  {
    id: 21,
    titulo: "Redes Neurais com Ruído",
    descricao:
      "Pesquisa sobre robustez de modelos de IA em ambientes adversos. Análise experimental dos impactos de diferentes tipos de ruído em redes neurais, avaliando degradação de performance e técnicas de mitigação para melhorar resiliência.",
    tags: ["CNN", "Redes Neurais", "Ruído"],
    imagem: "/imagens/ruidos.PNG",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Ruidos",
    tipo: ["ia"],
  },
  {
    id: 22,
    titulo: "Feed de notícias",
    descricao:
      "Interface de rede social simulando funcionalidades completas de interação. Aplicação web com sistema de postagens, comentários aninhados, reações e interações em tempo real, replicando experiência de mídias sociais modernas.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/telaInicial.png",
    Link: "https://lucasharosa.github.io/Ignite-Feed/",
    LinkGit: "https://github.com/LucasHARosa/Ignite-Feed",
    tipo: ["frontend"],
  },
];

export const listaSkills = [
  {
    desde: 2019,
    nivel: 10,
    id: "react",
    titulo: "React",
    description:
      "Construção de aplicações web modernas e performáticas com React. Experiência aprofundada com hooks, context API, gerenciamento de estado e melhores práticas de componentização em projetos de grande escala.",
    tecnologiasAxiliares: [
      "NextJS",
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
    desde: 2020,
    nivel: 10,
    id: "nodejs",
    titulo: "NodeJS",
    description:
      "Criação de APIs performáticas, escaláveis e seguras com Node.js. Experiência com microsserviços, filas de mensageria, autenticação JWT, WebSockets e integração com bancos de dados relacionais e NoSQL.",
    tecnologiasAxiliares: [
      "NestJS",
      "Express",
      "TypeORM",
      "Prisma",
      "Socket.io",
      "JWT",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    desde: 2019,
    nivel: 10,
    id: "react-native",
    titulo: "React Native",
    description:
      "Desenvolvimento de aplicativos mobile cross-platform para Android e iOS com alta performance, integração nativa, publicação nas lojas e arquitetura escalável.",
    tecnologiasAxiliares: [
      "Expo",
      "Native Base",
      "React Navigation",
      "React Native Gesture Handler",
      "React Native Reanimated",
    ],
  },
  {
    desde: 2022,
    nivel: 8,
    id: "java",
    titulo: "Java",
    description:
      "Desenvolvimento backend robusto com Java, focado em APIs RESTful, sistemas distribuídos e integração com bancos de dados. Experiência em contextos industriais e sistemas governamentais.",
    tecnologiasAxiliares: [
      "Spring Boot",
      "Spring Web",
      "Spring Data JPA",
      "Spring Security",
      "Hibernate",
      "MySQL",
    ],
  },
  {
    desde: 2021,
    nivel: 10,
    id: "nextjs",
    titulo: "NextJs",
    description:
      "Criação de aplicações SSR, SSG e ISR com Next.js, com foco em performance, SEO, otimização de Core Web Vitals e experiência do usuário em plataformas de alto tráfego.",
    tecnologiasAxiliares: ["React", "TypeScript", "Vercel", "App Router", "API Routes"],
  },
  {
    desde: 2021,
    nivel: 9,
    id: "nestjs",
    titulo: "NestJS",
    description:
      "Desenvolvimento backend modular e escalável com NestJS. Arquitetura limpa, princípios SOLID, injeção de dependência, guards, interceptors, pipes, e integração com bancos de dados via TypeORM e Prisma.",
    tecnologiasAxiliares: ["TypeScript", "NodeJS", "JWT", "TypeORM", "Prisma", "Swagger", "PostgreSQL"],
  },
  {
    desde: 2017,
    nivel: 10,
    id: "python",
    titulo: "Python",
    description:
      "Desenvolvimento de APIs, automações, scripts e soluções de IA/Machine Learning com Python. Experiência com FastAPI, Django, análise de dados, visão computacional e integração com modelos de ML.",
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
    desde: 2025,
    nivel: 8,
    id: "fastapi",
    titulo: "FastAPI",
    description:
      "Desenvolvimento de APIs REST modernas, rápidas e documentadas com FastAPI. Experiência com autenticação, integração com bancos de dados, OCR, gateways de pagamento e arquitetura de microsserviços em Python.",
    tecnologiasAxiliares: [
      "Python",
      "Pydantic",
      "SQLAlchemy",
      "PostgreSQL",
      "JWT",
      "Docker",
      "Swagger",
    ],
  },
  {
    desde: 2025,
    nivel: 7,
    id: "go",
    titulo: "Go",
    description:
      "Desenvolvimento de serviços backend de alta performance com Go. Foco em concorrência, APIs REST eficientes, microsserviços e sistemas que exigem baixa latência e escalabilidade.",
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
    desde: 2018,
    nivel: 10,
    id: "typescript",
    titulo: "TypeScript",
    description:
      "Uso avançado de TypeScript para tipagem segura e escalável em aplicações frontend e backend. Experiência com tipos genéricos, decorators, utility types e integração com frameworks modernos.",
    tecnologiasAxiliares: ["React", "NodeJs", "NestJS", "Next.js"],
  },
  {
    desde: 2017,
    nivel: 10,
    id: "github",
    titulo: "Git/GitHub",
    description:
      "Gestão eficiente de versionamento de código, repositórios e colaboração em equipe. Experiência com GitFlow, pull requests, code review, CI/CD e automações com GitHub Actions.",
    tecnologiasAxiliares: ["Git", "GitHub", "GitFlow", "CI/CD", "GitHub Actions"],
  },
  {
    desde: 2017,
    nivel: 10,
    id: "code",
    titulo: "C++",
    description:
      "Base sólida em C/C++ para sistemas embarcados, microcontroladores e automação. Fundação técnica que sustenta o entendimento de performance, memória e arquitetura de baixo nível.",
    tecnologiasAxiliares: ["C++", "C", "Microcontroladores", "Arduino", "IoT"],
  },
];
