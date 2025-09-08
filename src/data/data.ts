export interface ProjetosProps {
  id: number;
  titulo: string;
  descricao: string;
  tags: string[];
  imagem: string;
  LinkGit: string;
  Link: string;
  LinkGoogle?: string;
  LinkApple?: string;
  tipo: string[];
}

export const listaProjetos: ProjetosProps[] = [
  {
    id: 29,
    titulo: "DubPay",
    descricao:
      "Fintech de pagamentos que oferece soluções inovadoras para facilitar transações financeiras, tanto para consumidores quanto para empresas.",
    tags: ["Projeto Real", "NextJs", "Vite", "React App"],
    imagem: "/imagens/dubpay.png",
    Link: "https://www.dubpay.com/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend", "principais"],
  },
  {
    id: 28,
    titulo: "Mouv Brasil",
    descricao:
      "Aplicação para compra e venda de ingressos, permitindo que os usuários comprem ingressos para eventos e parceiros podem criar e editar eventos.",
    tags: ["Projeto Real", "NextJs", "NestJS"],
    imagem: "/imagens/mouv.png",
    Link: "https://www.mouvbrasil.com/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 27,
    titulo: "Nacional Go",
    descricao:
      "Maior plataforma/empresa de transporte de veículos, oferecendo todo o processo de tranporte veicular no Brasil todo, conta com área para clientes e um e-commerce integrado.",
    tags: ["Projeto Real", "React", "PHP"],
    imagem: "/imagens/nacional.png",
    Link: "https://app.nacionalgo.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 26,
    titulo: "SporTickets",
    descricao:
      "Aplicação para compra e venda de ingressos, permitindo que os usuários comprem ingressos para eventos esportivos e parceiros podem criar e editar eventos.",
    tags: ["Projeto Real", "NextJs", "NestJS"],
    imagem: "/imagens/sporticket.png",
    Link: "https://sportickets.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["backend", "frontend", "principais"],
  },
  {
    id: 25,
    titulo: "Vale Energia",
    descricao:
      "Aplicação web para pagamento de contas de energia, onde um usuário pode pagar contas e adiquirir vales e a empresa parceira pode cadastrar e gerenciar campanhas e vales.",
    tags: ["Projeto Real", "React", "Vite", "NodeJS"],
    imagem: "/imagens/valeenergia.png",
    Link: "https://hml.valeenergia.site",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend", "backend", "principais"],
  },
  {
    id: 24,
    titulo: "Anac Arquitetura",
    descricao:
      "Site de portfólio para uma empresa de arquitetura, apresentando projetos e serviços oferecidos.",
    tags: ["Projeto Real", "React", "Next", "TypeScript"],
    imagem: "/imagens/anac.png",
    Link: "https://anacotrim.com.br/",
    LinkGit: "",
    LinkGoogle: "",
    LinkApple: "",
    tipo: ["frontend", "principais"],
  },
  {
    id: 23,
    titulo: "Cortex",
    descricao:
      "Com os dados dos sensores IoT enviados em tempo real para a nuvem, é possível monitorar constantemente o consumo e verificar a situação dos recursos, como a água, podendo identificar vazamentos ou diminuição nos níveis por meio de gráficos e alarmes configuráveis.",
    tags: ["Projeto Real", "React Native", "Expo"],
    imagem: "/imagens/cortex.png",
    Link: "",
    LinkGit: "",
    LinkGoogle: "https://play.google.com/store/apps/details?id=com.besx.core",
    LinkApple: "https://apps.apple.com/us/app/cortex-app/id6449041878",
    tipo: ["mobile", "principais"],
  },
  {
    id: 15,
    titulo: "Quiz Programing",
    descricao:
      "Aplicativo mobile de quiz sobre programação, oferecendo perguntas dinâmicas e desafios para testar conhecimentos em diversas linguagens e conceitos.",
    tags: ["React Native", "Native Base"],
    imagem: "/imagens/quizprogram.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Quiz-Programing",
    tipo: ["mobile"],
  },
  {
    id: 18,
    titulo: "I Weather",
    descricao:
      "Uma aplicação React Native que fornece informações meteorológicas em tempo real. Aplicação de testes unitários e automatizados ",
    tags: ["React Native", "Jest"],
    imagem: "/imagens/iweather.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IWeather",
    tipo: ["mobile"],
  },
  {
    id: 21,
    titulo: "Arthos",
    descricao:
      "O Arthos é um aplicativo inovador projetado para oferecer controle de acesso seguro e eficiente a diferentes espaços, como salas, prédios e áreas restritas.",
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
    id: 14,
    titulo: "Gym Train",
    descricao:
      "Aplicativo para organização e acompanhamento de treinos de academia. Permite o cadastro de exercícios, divisão por grupos musculares e histórico de evolução.",
    tags: ["React Native", "TypeScript", "Styled Components"],
    imagem: "/imagens/gyntrain.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Gym-Train",
    tipo: ["mobile"],
  },
  {
    id: 17,
    titulo: "DT Money",
    descricao:
      "Aplicação para controle financeiro pessoal. Ajudando os usuários a gerenciar suas finanças pessoais de forma eficiente",
    tags: ["React", "TypeScript", "json-server"],
    imagem: "/imagens/dt_money.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/DT-Money",
    tipo: ["frontend"],
  },
  {
    id: 4,
    titulo: "Timer Pomodoro",
    descricao:
      "Timer para organização de tarefas com foco na técnica Pomodoro, permitindo a configuração de tempo e intervalos para aumentar a produtividade.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/timer_pomoro_1.png",
    Link: "https://lucasharosa.github.io/Timer-Pomodoro/",
    LinkGit: "https://github.com/LucasHARosa/Timer-Pomodoro",
    tipo: ["frontend"],
  },
  {
    id: 1,
    titulo: "Habits",
    descricao:
      "Aplicação full stack para criação e monitoramento de hábitos. Possui uma interface interativa e estatísticas diárias para auxiliar no acompanhamento de metas.",
    tags: ["React", "React Native", "NodeJS"],
    imagem: "/imagens/habits.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Habit",
    tipo: ["mobile", "frontend", "backend"],
  },

  {
    id: 2,
    titulo: "Coffee Delivery",
    descricao:
      "Aplicação de e-commerce para compra de cafés, simulando um sistema de pedidos com carrinho de compras e cálculo de preços.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/coffe_deliveryHome.png",
    Link: "https://lucasharosa.github.io/Coffee-Delivery/",
    LinkGit: "https://github.com/LucasHARosa/Coffe-Delivery",
    tipo: ["frontend"],
  },
  {
    id: 3,
    titulo: "Enigm",
    descricao:
      "Jogo de palavras estilo TERMO, desenvolvido em Next.js, permitindo que os usuários desafiem seus conhecimentos em um jogo divertido e interativo.",
    tags: ["NextJs", "TypeScript", "React"],
    imagem: "/imagens/Enigm.png",
    Link: "https://enigm.vercel.app/",
    LinkGit: "https://github.com/LucasHARosa/Enigm",
    tipo: ["frontend"],
  },
  {
    id: 12,
    titulo: "TCC: IA para Soldagem",
    descricao:
      "Sistema de Inteligência Artificial baseado em YOLOV8 para detecção de padrões em processos de soldagem, auxiliando no monitoramento da qualidade.",
    tags: ["CNN", "TCC", "YOLOV8"],
    imagem: "/imagens/tcc.PNG",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/UnB-TCC-IA",
    tipo: ["ia"],
  },
  {
    id: 7,
    titulo: "Redes Neurais: Classificação",
    descricao: "Projeto de IA para tarefas de classificação de dados.",
    tags: ["Python", "Redes Neurais"],
    imagem:
      "https://static.imasters.com.br/wp-content/uploads/2016/06/redes-1.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Classification",
    tipo: ["ia"],
  },
  {
    id: 8,
    titulo: "Redes Neurais: Regressão",
    descricao: "Projeto de IA para prever valores numéricos contínuos.",
    tags: ["Python", "Redes Neurais"],
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXAcZTGYRe0OSumsIhXkiXB44sVkhC-X64ig&usqp=CAU",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Regression",
    tipo: ["ia"],
  },
  {
    id: 9,
    titulo: "Redes Neurais Convolucionais",
    descricao: "Projeto de CNN para processamento de imagens.",
    tags: ["Python", "Redes Neurais", "CNN"],
    imagem:
      "https://www.sakurai.dev.br/assets/images/posts/2017-12-20-cnn-mapreduce.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Convolution",
    tipo: ["ia"],
  },
  {
    id: 11,
    titulo: "Redes Neurais com Ruído",
    descricao:
      "Análise dos efeitos de ruído em redes neurais para classificação.",
    tags: ["CNN", "Redes Neurais", "Ruído"],
    imagem: "/imagens/ruidos.PNG",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/IA-Ruidos",
    tipo: ["ia"],
  },
  {
    id: 5,
    titulo: "Feed de notícias",
    descricao:
      "Simula um feed de rede social com postagens, comentários e curtidas.",
    tags: ["React", "TypeScript"],
    imagem: "/imagens/telaInicial.png",
    Link: "https://lucasharosa.github.io/Ignite-Feed/",
    LinkGit: "https://github.com/LucasHARosa/Ignite-Feed",
    tipo: [""],
  },
  {
    id: 16,
    titulo: "Game Tracker",
    descricao: "E-commerce de jogos com filtros e informações detalhadas.",
    tags: ["React", "JavaScript"],
    imagem: "/imagens/Game_tracker_web.png",
    Link: "https://lucasharosa.github.io/Game-Tracker/",
    LinkGit: "https://github.com/LucasHARosa/Game-Tracker",
    tipo: [""],
  },
  {
    id: 13,
    titulo: "E-Commerce",
    descricao:
      "Loja virtual de produtos de tecnologia com integração de API, onde os usuários podem visualizar produtos, adicionar ao carrinho e simular pedidos.",
    tags: ["React", "TypeScript", "Frame Motion"],
    imagem: "/imagens/home.png",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/MKS-Sistemas",
    tipo: [""],
  },
  {
    id: 19,
    titulo: "Keyboard Test",
    descricao:
      "Teste de teclado qual tecla está sendo pressionada em um teclado 65% com som e histórico de teclas. Idealmente feito para testar meus teclados mecânicos.",
    tags: ["React", "NextJs"],
    imagem: "/imagens/testKeyboard.png",
    Link: "https://keyboard-test-eight.vercel.app/",
    LinkGit: "",
    tipo: [""],
  },
  {
    id: 10,
    titulo: "Teams",
    descricao:
      "Aplicativo mobile para gerenciamento de times e eventos, é possível criar turmas de jogos e atividades e dividir pessoas entre as duas turmas",
    tags: ["React Native", "TypeScript"],
    imagem: "/imagens/teams.PNG",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Teams",
    tipo: ["mobile"],
  },
  {
    id: 6,
    titulo: "To do List",
    descricao:
      "Lista de tarefas para facilitar e organizar as atividades diárias, com opções de adicionar, remover e marcar como concluída.",
    tags: ["React", "React Native"],
    imagem: "/imagens/todolist.png",
    Link: "https://lucasharosa.github.io/To-Do-List/",
    LinkGit: "https://github.com/LucasHARosa/To-Do-List",
    tipo: [""],
  },
  {
    id: 20,
    titulo: "Transações Financeiras",
    descricao:
      "Aplicação backend para controle de transações financeiras, permitindo a criação, listagem e remoção de transações.",
    tags: ["Spring Boot", "Java", "MySQL"],
    imagem: "/imagens/bank.jpg",
    Link: "",
    LinkGit: "https://github.com/LucasHARosa/Bank-Transactions",
    tipo: ["backend"],
  },
];

export const listaSkills = [
  {
    experiencia: "5 anos",
    nivel: 10,
    id: "react",
    titulo: "React",
    description:
      "Construção de aplicações web modernas e performáticas com React. Experiência com hooks, context API e melhores práticas de componentização.",
    tecnologiasAxiliares: [
      "NextJS",
      "Styled Components",
      "Redux",
      "TypeScript",
      "BootStrap",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Jest",
    ],
  },
  {
    experiencia: "2 anos",
    nivel: 7,
    id: "nodejs",
    titulo: "NodeJS",
    description:
      "Criação de APIs performáticas e escaláveis utilizando Node.js, com foco em microsserviços e mensageria.",
    tecnologiasAxiliares: [
      "NestJS",
      "Express",
      "TypeORM",
      "Prisma",
      "Socket.io",
      "JWT",
      "GraphQL",
    ],
  },
  {
    experiencia: "5 anos",
    nivel: 10,
    id: "react-native",
    titulo: "React Native",
    description:
      "Desenvolvimento de aplicativos mobile para Android e iOS com alta performance e integração nativa.",
    tecnologiasAxiliares: [
      "Expo",
      "Native Base",
      "React Navigation",
      "React Native Gesture Handler",
      "React Native Reanimated",
    ],
  },
  {
    experiencia: "2 anos",
    nivel: 7,
    id: "java",
    titulo: "Java",
    description:
      "Desenvolvimento backend robusto e seguro com Java, focado em APIs RESTful e sistemas distribuídos.",
    tecnologiasAxiliares: [
      "Spring Boot",
      "Spring Web",
      "Spring Data JPA",
      "Spring Security",
      "Spring Cloud",
      "Hibernate",
    ],
  },
  {
    experiencia: "2 anos",
    nivel: 10,
    id: "nextjs",
    titulo: "NextJs",
    description:
      "Criação de aplicações SSR e SSG utilizando Next.js, otimizando performance e SEO.",
    tecnologiasAxiliares: ["React", "TypeScript"],
  },
  {
    experiencia: "2 anos",
    nivel: 8,
    id: "nestjs",
    titulo: "NestJS",
    description:
      "Desenvolvimento backend modular e escalável com NestJS, utilizando arquitetura limpa e princípios SOLID.",
    tecnologiasAxiliares: ["TypeScript", "NodeJS", "JWT", "TypeORM", "Swagger"],
  },
  {
    experiencia: "7 anos",
    nivel: 10,
    id: "python",
    titulo: "Python",
    description:
      "Desenvolvimento de scripts, automação e projetos de IA/Machine Learning utilizando Python.",
    tecnologiasAxiliares: [
      "Pandas",
      "Numpy",
      "Matplotlib",
      "Scikit-Learn",
      "Keras",
      "TensorFlow",
      "PyTorch",
      "FastAPI",
    ],
  },
  {
    experiencia: "6 anos",
    nivel: 10,
    id: "typescript",
    titulo: "TypeScript",
    description:
      "Uso avançado do TypeScript para tipagem segura e escalável em aplicações frontend e backend.",
    tecnologiasAxiliares: ["React", "NodeJs", "NestJS"],
  },

  {
    experiencia: "7 anos",
    nivel: 10,
    id: "github",
    titulo: "Git/GitHub",
    description:
      "Gestão de versionamento de código, repositórios e colaboração eficiente em projetos com Git.",
    tecnologiasAxiliares: ["Git", "GitHub", "GitFlow", "CI/CD"],
  },
  {
    experiencia: "7 anos",
    nivel: 10,
    id: "code",
    titulo: "C++",
    description:
      "C++ é o código raiz: se você quer entender o que acontece debaixo do capô, essa é a chave da ignição.",
    tecnologiasAxiliares: ["C++", "Microcontroladores"],
  },
];
