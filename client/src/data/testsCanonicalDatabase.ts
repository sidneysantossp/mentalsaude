export type CanonicalTestEntity = {
  id: string;
  slug: string;
  title: string;
  acronym: string;
  category: string;
  description: string;
  fullOverview: string;
  questionCount: number;
  durationMinutes: number;
  difficulty: "Leve" | "Moderada" | "Profunda";
  targetRoute: string; // ex: /testes (ou /testes/gad-7)
  executionRoute: string; // /testes
  methodologyNotes: string;
};

export const CANONICAL_TESTS: Record<string, CanonicalTestEntity> = {
  "gad-7": {
    id: "gad-7",
    slug: "gad-7",
    title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
    acronym: "GAD-7",
    category: "Ansiedade e Tensão",
    description: "Instrumento breve de 7 perguntas para rastreio e mensuração da gravidade de sintomas ansiosos.",
    fullOverview: "O GAD-7 é uma ferramenta de autoavaliação amplamente validada internacionalmente para quantificar a gravidade dos sintomas de ansiedade nos últimos 14 dias. Ele auxilia na organização das percepções do indivíduo, servindo como ponto de partida para um diálogo produtivo com profissionais de saúde mental.",
    questionCount: 7,
    durationMinutes: 3,
    difficulty: "Leve",
    targetRoute: "/testes/gad-7",
    executionRoute: "/testes",
    methodologyNotes: "Desenvolvido por Spitzer, Kroenke, Williams e Löwe (2006). Não substitui diagnóstico clínico formal."
  },
  "phq-9": {
    id: "phq-9",
    slug: "phq-9",
    title: "Questionário de Saúde do Paciente (PHQ-9)",
    acronym: "PHQ-9",
    category: "Humor e Energia",
    description: "Instrumento validado de 9 itens para rastreio e avaliação da severidade de sintomas depressivos.",
    fullOverview: "O PHQ-9 é a seção de depressão do PRIME-MD, avaliando a frequência de sintomas depressivos nas últimas duas semanas. É amplamente utilizado na prática clínica e em pesquisas para monitorar o bem-estar emocional.",
    questionCount: 9,
    durationMinutes: 3,
    difficulty: "Moderada",
    targetRoute: "/testes/phq-9",
    executionRoute: "/testes",
    methodologyNotes: "Validado por Kroenke, Spitzer e Williams (2001). Fornece escore de severidade indicativo."
  },
  "asrs-v1-1": {
    id: "asrs-v1-1",
    slug: "asrs-v1-1",
    title: "Adult ADHD Self-Report Scale (ASRS v1.1)",
    acronym: "ASRS v1.1",
    category: "Atenção e Foco",
    description: "Screener oficial de 6 perguntas da OMS para rastreio de sintomas de TDAH em adultos.",
    fullOverview: "Desenvolvido em conjunto com a Organização Mundial da Saúde (OMS), o ASRS v1.1 rastreia sintomas de desatenção e hiperatividade/impulsividade em adultos, considerando o funcionamento nos últimos seis meses.",
    questionCount: 6,
    durationMinutes: 2,
    difficulty: "Leve",
    targetRoute: "/testes/asrs-v1-1",
    executionRoute: "/testes",
    methodologyNotes: "Instrumento oficial OMS / Kessler et al. (2005). Focado em autoobservação adulta."
  }
};

export function getCanonicalTest(slugOrAcronym: string): CanonicalTestEntity | undefined {
  const normalized = slugOrAcronym.toLowerCase().trim();
  if (normalized === "asrs") return CANONICAL_TESTS["asrs-v1-1"];
  if (CANONICAL_TESTS[normalized]) return CANONICAL_TESTS[normalized];
  return Object.values(CANONICAL_TESTS).find(
    t => t.slug === normalized || t.acronym.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized.replace(/[^a-z0-9]/g, "")
  );
}
