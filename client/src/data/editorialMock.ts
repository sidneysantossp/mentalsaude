export type ContentType = "ARTICLE" | "GUIDE" | "EXPLAINER" | "COMPARISON" | "EVIDENCE_REVIEW" | "TEST_GUIDE" | "SYMPTOM_GUIDE";
export type FunnelStage = "awareness" | "consideration" | "action";

export type EditorialItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentType: ContentType;
  primaryEntity: string;
  category: string;
  funnelStage: FunnelStage;
  author: string;
  reviewer?: string;
  readingTime: string;
  publishedAt: string;
  reviewedAt?: string;
  isFeatured?: boolean;
  isGuide?: boolean;
  image?: string;
};

export type TopicEntity = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  iconName: string;
};

export const EDITORIAL_TOPICS: TopicEntity[] = [
  { id: "1", name: "Ansiedade", slug: "/ansiedade", description: "Sinais de apreensão, preocupação persistente e manejo físico e mental.", category: "Ansiedade e Tensão", iconName: "Activity" },
  { id: "2", name: "Depressão", slug: "/depressao", description: "Compreensão de desânimo prolongado, perda de interesse e suporte acolhedor.", category: "Humor e Energia", iconName: "Heart" },
  { id: "3", name: "TDAH", slug: "/tdah", description: "Atenção, foco, impulsividade e estratégias de organização em adultos.", category: "Neurodiversidade", iconName: "Zap" },
  { id: "4", name: "Estresse", slug: "/estresse", description: "Sobrecarga cotidiana, esgotamento e práticas de regulação emocional.", category: "Equilíbrio", iconName: "Shield" },
  { id: "5", name: "Sono", slug: "/sono", description: "Insônia, higiene do sono e a relação entre descanso e saúde mental.", category: "Hábitos", iconName: "Moon" },
  { id: "6", name: "TOC", slug: "/toc", description: "Pensamentos intrusivos e comportamentos repetitivos explicados com clareza.", category: "Condições", iconName: "Compass" },
  { id: "7", name: "Transtorno de Pânico", slug: "/transtorno-do-panico", description: "Crises súbitas, sensações físicas intensas e caminhos para o acolhimento.", category: "Ansiedade", iconName: "AlertCircle" },
  { id: "8", name: "Ansiedade Social", slug: "/ansiedade-social", description: "Medo de julgamento, interações sociais e estratégias de autoobservação.", category: "Relacionamentos", iconName: "Users" },
  { id: "9", name: "Burnout", slug: "/burnout", description: "Esgotamento profissional, esvaziamento de sentido e limites saudáveis.", category: "Trabalho", iconName: "Flame" },
  { id: "10", name: "Bem-estar", slug: "/bem-estar", description: "Hábitos diários, autocompaixão e manutenção da saúde emocional.", category: "Estilo de vida", iconName: "Smile" },
];

export const EDITORIAL_SEARCH_SUGGESTIONS = [
  { label: "Ansiedade", type: "CONDIÇÃO", slug: "/testes" },
  { label: "Depressão", type: "CONDIÇÃO", slug: "/testes" },
  { label: "TDAH", type: "CONDIÇÃO", slug: "/tdah" },
  { label: "Insônia e Sono", type: "SINTOMA", slug: "/testes" },
  { label: "Estresse Crônico", type: "CONDIÇÃO", slug: "/testes" },
  { label: "GAD-7 (Teste de Ansiedade)", type: "TESTE", slug: "/testes" },
  { label: "Guia completo sobre ansiedade", type: "CONTEÚDO", slug: "/testes" },
  { label: "TDAH em adultos: guia prático", type: "CONTEÚDO", slug: "/conteudos/tdah-em-adultos" },
  { label: "Sintomas de depressão", type: "CONTEÚDO", slug: "/conteudos/sintomas-de-depressao" },
  { label: "Qual profissional procurar para depressão", type: "CONTEÚDO", slug: "/conteudos/qual-profissional-procurar-depressao" },
  { label: "Tratamento da depressão", type: "CONTEÚDO", slug: "/conteudos/tratamento-depressao" },
];

export const FEATURED_ARTICLES: EditorialItem[] = [
  {
    id: "f-1",
    slug: "/conteudos/ansiedade-o-que-e-sintomas-causas",
    title: "Ansiedade: o que é, sintomas, causas e quando procurar ajuda",
    excerpt: "Compreenda a diferença entre a preocupação cotidiana e os estados de ansiedade prolongados, com referências baseadas em evidências e orientações acolhedoras.",
    contentType: "ARTICLE",
    primaryEntity: "Ansiedade",
    category: "Ansiedade e Tensão",
    funnelStage: "awareness",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    readingTime: "7 min de leitura",
    publishedAt: "10 de agosto de 2026",
    reviewedAt: "11 de agosto de 2026",
    isFeatured: true,
    image: "/manus-storage/editorial-ansiedade-2026_657da1b2.png",
  },
  {
    id: "f-2",
    slug: "/conteudos/tdah-em-adultos",
    title: "TDAH em adultos: sintomas, avaliação e tratamento",
    excerpt: "Sinais sutis que frequentemente passam despercebidos na infância e como a autoobservação pode ajudar.",
    contentType: "EXPLAINER",
    primaryEntity: "TDAH",
    category: "Neurodiversidade",
    funnelStage: "awareness",
    author: "Redação Mental Saúde",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    readingTime: "5 min de leitura",
    publishedAt: "8 de agosto de 2026",
    isFeatured: false,
    image: "/manus-storage/editorial-tdah-2026-retry_f2b4efc6.png",
  },
  {
    id: "f-3",
    slug: "/conteudos/depressao-sintomas-causas-tratamento",
    title: "Depressão: sintomas, causas, tratamento e quando procurar ajuda",
    excerpt: "Entenda o papel dos instrumentos de triagem como ferramentas educativas de autoconhecimento.",
    contentType: "EVIDENCE_REVIEW",
    primaryEntity: "Testes",
    category: "Metodologia",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    readingTime: "4 min de leitura",
    publishedAt: "5 de agosto de 2026",
    isFeatured: false,
    image: "/manus-storage/editorial-autocuidado-2026-retry_58973d1e.png",
  },
];

export const ESSENTIAL_GUIDES: EditorialItem[] = [
  {
    id: "g-1",
    slug: "/conteudos/ansiedade-o-que-e-sintomas-causas",
    title: "Guia completo sobre ansiedade",
    excerpt: "Sintomas, tipos, avaliação, tratamento e quando procurar ajuda profissional.",
    contentType: "GUIDE",
    primaryEntity: "Ansiedade",
    category: "Guia Essencial",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    readingTime: "12 min de leitura",
    publishedAt: "1 de agosto de 2026",
    isGuide: true,
    image: "/manus-storage/editorial-ansiedade-2026_657da1b2.png",
  },
  {
    id: "g-2",
    slug: "/conteudos/depressao-sintomas-causas-tratamento",
    title: "Guia completo sobre depressão",
    excerpt: "Entenda sintomas persistentes, avaliação responsável, tratamento e acompanhamento.",
    contentType: "GUIDE",
    primaryEntity: "Depressão",
    category: "Guia Essencial",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    readingTime: "10 min de leitura",
    publishedAt: "28 de julho de 2026",
    isGuide: true,
    image: "/manus-storage/editorial-depressao-2026-retry_518ee307.png",
  },
  {
    id: "g-3",
    slug: "/conteudos/tdah-em-adultos",
    title: "TDAH em adultos: guia de orientação",
    excerpt: "Guia prático sobre atenção, organização, funcionamento executivo e acolhimento.",
    contentType: "GUIDE",
    primaryEntity: "TDAH",
    category: "Guia Essencial",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    readingTime: "9 min de leitura",
    publishedAt: "25 de julho de 2026",
    isGuide: true,
    image: "/manus-storage/editorial-tdah-2026-retry_f2b4efc6.png",
  },
  {
    id: "g-4",
    slug: "/conteudos/guia-testes",
    title: "Guia dos testes de saúde mental",
    excerpt: "Conheça os principais instrumentos de rastreio, faixas de interpretação e limites.",
    contentType: "TEST_GUIDE",
    primaryEntity: "Testes",
    category: "Guia Essencial",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    readingTime: "8 min de leitura",
    publishedAt: "20 de julho de 2026",
    isGuide: true,
    image: "/manus-storage/editorial-autocuidado-2026-retry_58973d1e.png",
  },
];

export const SYMPTOMS_LIST = [
  "Falta de ar",
  "Palpitação",
  "Pensamentos excessivos",
  "Cansaço persistente",
  "Falta de concentração",
  "Insônia",
  "Irritabilidade",
  "Tristeza profunda",
  "Medo intenso",
  "Procrastinação",
  "Compulsões",
  "Desânimo",
];

export const START_PATHS = [
  {
    id: "p1",
    title: "Não sei exatamente o que estou sentindo",
    description: "Comece entendendo sinais e encontrando conteúdos relacionados.",
    cta: "Explorar sinais",
    href: "/conteudos",
  },
  {
    id: "p2",
    title: "Quero entender um sintoma",
    description: "Conheça possíveis relações entre sintomas físicos, emocionais e saúde mental.",
    cta: "Ver sintomas",
    href: "/conteudos",
  },
  {
    id: "p3",
    title: "Quero entender uma condição",
    description: "Encontre guias sobre ansiedade, depressão, TDAH e outros temas.",
    cta: "Explorar condições",
    href: "/conteudos",
  },
  {
    id: "p4",
    title: "Quero conhecer os testes",
    description: "Entenda o que diferentes instrumentos avaliam e quais são suas limitações.",
    cta: "Conhecer testes",
    href: "/testes",
  },
  {
    id: "p5",
    title: "Quero entender tratamentos",
    description: "Conheça abordagens, profissionais e formas de cuidado utilizadas em saúde mental.",
    cta: "Explorar tratamentos",
    href: "/conteudos",
  },
];

export const RECENT_ARTICLES: EditorialItem[] = [
  {
    id: "r-1",
    slug: "/conteudos/ansiedade-o-que-e-sintomas-causas",
    title: "Ansiedade: o que é, sintomas, causas e quando procurar ajuda",
    excerpt: "Como o descanso inadequado altera a regulação emocional e o que fazer para melhorar a higiene do sono.",
    contentType: "ARTICLE",
    primaryEntity: "Sono",
    category: "Hábitos e Bem-estar",
    funnelStage: "awareness",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    readingTime: "6 min de leitura",
    publishedAt: "9 de agosto de 2026",
    image: "/manus-storage/editorial-sono-2026-retry_826aa69f.png",
  },
  {
    id: "r-2",
    slug: "/conteudos/depressao-sintomas-causas-tratamento",
    title: "Depressão: sintomas, causas, tratamento e quando procurar ajuda",
    excerpt: "Identificando o esgotamento antes que ele evolua para exaustão severa.",
    contentType: "EXPLAINER",
    primaryEntity: "Estresse",
    category: "Equilíbrio",
    funnelStage: "awareness",
    author: "Redação Mental Saúde",
    readingTime: "5 min de leitura",
    publishedAt: "7 de agosto de 2026",
    image: "/manus-storage/editorial-estresse-2026-retry_5bbd8a13.png",
  },
  {
    id: "r-3",
    slug: "/conteudos/tdah-em-adultos",
    title: "TDAH em adultos: sintomas, avaliação e tratamento",
    excerpt: "Como a autocrítica excessiva alimenta ciclos de sofrimento e como desenvolver uma postura compreensiva.",
    contentType: "ARTICLE",
    primaryEntity: "Bem-estar",
    category: "Psicoeducação",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    readingTime: "6 min de leitura",
    publishedAt: "4 de agosto de 2026",
    image: "/manus-storage/editorial-autocuidado-2026-retry_58973d1e.png",
  },
  {
    id: "r-4",
    slug: "/conteudos/sintomas-de-depressao",
    title: "Sintomas de depressão: sinais emocionais, cognitivos e físicos",
    excerpt: "Um mapa educativo para observar humor, interesse, energia, sono, apetite e concentração sem transformar sinais em diagnóstico.",
    contentType: "ARTICLE",
    primaryEntity: "Depressão",
    category: "Sintomas e Manifestações",
    funnelStage: "awareness",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    readingTime: "8 min de leitura",
    publishedAt: "14 de agosto de 2026",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-depressao-2026-retry_518ee307.png",
  },
  {
    id: "r-5",
    slug: "/conteudos/qual-profissional-procurar-depressao",
    title: "Qual profissional procurar para depressão: psicólogo ou psiquiatra?",
    excerpt: "Entenda caminhos possíveis de cuidado, sem transformar a busca por ajuda em uma regra universal.",
    contentType: "GUIDE",
    primaryEntity: "Depressão",
    category: "Ajuda Profissional",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    readingTime: "8 min de leitura",
    publishedAt: "14 de agosto de 2026",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-depressao-2026-retry_518ee307.png",
  },
  {
    id: "r-6",
    slug: "/conteudos/tratamento-depressao",
    title: "Depressão tem tratamento? Conheça as principais abordagens",
    excerpt: "Uma visão geral de psicoterapia, acompanhamento médico, medicamentos quando indicados e suporte complementar.",
    contentType: "EVIDENCE_REVIEW",
    primaryEntity: "Depressão",
    category: "Tratamento e Cuidado",
    funnelStage: "consideration",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    readingTime: "9 min de leitura",
    publishedAt: "14 de agosto de 2026",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-depressao-2026-retry_518ee307.png",
  },
  {
    id: "r-7",
    slug: "/conteudos/sintomas-de-tdah-em-adultos",
    title: "Sintomas de TDAH em adultos: sinais de desatenção, impulsividade e hiperatividade",
    excerpt: "Aprofundamento em sinais de desatenção, organização, impulsividade e diferenças que exigem avaliação contextual.",
    contentType: "ARTICLE",
    primaryEntity: "TDAH",
    category: "Sintomas e Manifestações",
    funnelStage: "awareness",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    readingTime: "8 min de leitura",
    publishedAt: "14 de agosto de 2026",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-tdah-2026-retry_f2b4efc6.png",
  },
  {
    id: "r-8",
    slug: "/conteudos/teste-de-tdah-online",
    title: "Teste de TDAH online: como funciona o ASRS e o que o resultado significa",
    excerpt: "Entenda o rastreio ASRS, seus limites e o caminho seguro entre artigo, entidade do instrumento e resultado privado.",
    contentType: "TEST_GUIDE",
    primaryEntity: "ASRS",
    category: "Testes e Avaliação",
    funnelStage: "action",
    author: "Equipe Editorial Mental Saúde",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    readingTime: "6 min de leitura",
    publishedAt: "14 de agosto de 2026",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-tdah-2026-retry_f2b4efc6.png",
  },
];

export const EDITORIAL_SPECIALISTS = [
  {
    name: "Dra. Camila Mendes",
    role: "Psicóloga Clínica e Pesquisadora",
    credentials: "CRP 06/88921 · Doutora em Psicologia USP",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    reviewedCount: "42 conteúdos revisados",
  },
  {
    name: "Dr. Roberto S.",
    role: "Médico Psiquiatra",
    credentials: "CRM 112340 · Especialista em Psiquiatria ABTPnM",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    reviewedCount: "38 conteúdos revisados",
  },
];
