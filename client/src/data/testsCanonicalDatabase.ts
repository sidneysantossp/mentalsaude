import { PCL5_ASSESSMENT } from "./pcl5TestData";

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
  targetRoute: string;
  executionRoute: string | null;
  methodologyNotes: string;
  scoringGuide?: any;
  questions?: Array<{ id: number; statement: string; options: Array<{ id: number; label: string; score: number }> }>;
};

export const CANONICAL_TESTS: Record<string, CanonicalTestEntity> = {
  "gad-7": {
    id: "gad-7",
    slug: "gad-7",
    title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
    acronym: "GAD-7",
    category: "Ansiedade e Tensão",
    description: "Instrumento breve de 7 perguntas para rastreio e mensuração da gravidade de sintomas ansiosos.",
    fullOverview: "O GAD-7 é uma ferramenta de autoavaliação amplamente validada internacionalmente para quantificar a gravidade dos sintomas de ansiedade nos últimos 14 dias.",
    questionCount: 7,
    durationMinutes: 3,
    difficulty: "Leve",
    targetRoute: "/testes/gad-7",
    executionRoute: null,
    methodologyNotes: "Desenvolvido por Spitzer, Kroenke, Williams e Löwe (2006). Não substitui diagnóstico clínico formal."
  },
  "phq-9": {
    id: "phq-9",
    slug: "phq-9",
    title: "Questionário de Saúde do Paciente (PHQ-9)",
    acronym: "PHQ-9",
    category: "Humor e Energia",
    description: "Instrumento validado de 9 itens para rastreio e avaliação da severidade de sintomas depressivos.",
    fullOverview: "O PHQ-9 é a seção de depressão do PRIME-MD, avaliando a frequência de sintomas depressivos nas últimas duas semanas.",
    questionCount: 9,
    durationMinutes: 3,
    difficulty: "Moderada",
    targetRoute: "/testes/phq-9",
    executionRoute: null,
    methodologyNotes: "Validado por Kroenke, Spitzer e Williams (2001). Fornece escore de severidade indicativo."
  },
  "asrs-v1-1": {
    id: "asrs-v1-1",
    slug: "asrs-v1-1",
    title: "Adult ADHD Self-Report Scale (ASRS v1.1)",
    acronym: "ASRS v1.1",
    category: "Atenção e Foco",
    description: "Screener oficial de 6 perguntas da OMS para rastreio de sintomas de TDAH em adultos.",
    fullOverview: "Desenvolvido em conjunto com a Organização Mundial da Saúde (OMS), o ASRS v1.1 rastreia sintomas de desatenção e hiperatividade/impulsividade em adultos.",
    questionCount: 6,
    durationMinutes: 2,
    difficulty: "Leve",
    targetRoute: "/testes/asrs",
    executionRoute: "/testes/asrs/iniciar",
    methodologyNotes: "Instrumento oficial OMS / Kessler et al. (2005). Focado em autoobservação adulta."
  },
  "pcl-5": {
    id: "pcl-5",
    slug: "pcl-5",
    title: PCL5_ASSESSMENT.title,
    acronym: PCL5_ASSESSMENT.acronym,
    category: PCL5_ASSESSMENT.category,
    description: PCL5_ASSESSMENT.description,
    fullOverview: PCL5_ASSESSMENT.fullOverview,
    questionCount: PCL5_ASSESSMENT.questionCount,
    durationMinutes: PCL5_ASSESSMENT.durationMinutes,
    difficulty: PCL5_ASSESSMENT.difficulty,
    targetRoute: PCL5_ASSESSMENT.targetRoute,
    executionRoute: PCL5_ASSESSMENT.executionRoute,
    methodologyNotes: PCL5_ASSESSMENT.methodologyNotes,
    scoringGuide: PCL5_ASSESSMENT.scoringGuide,
    questions: PCL5_ASSESSMENT.questions
  }
};

export function getCanonicalTest(slugOrAcronym: string): CanonicalTestEntity | undefined {
  const normalized = slugOrAcronym.toLowerCase().trim();
  if (normalized === "asrs") return CANONICAL_TESTS["asrs-v1-1"];
  if (normalized === "pcl5" || normalized === "pcl-5") return CANONICAL_TESTS["pcl-5"];
  if (CANONICAL_TESTS[normalized]) return CANONICAL_TESTS[normalized];
  return Object.values(CANONICAL_TESTS).find(
    t => t.slug === normalized || t.acronym.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized.replace(/[^a-z0-9]/g, "")
  );
}
