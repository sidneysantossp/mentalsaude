export type ResultBand = "atenção inicial" | "atenção moderada" | "atenção prioritária";

export type AssessmentResult = {
  score: number;
  percentage: number;
  band: string;
  summary: string;
  displayValue?: string;
  metricLabel?: string;
};

export type AssessmentScoringGuide = {
  kind?: string;
};

export type ScoreBoundedRecommendation = {
  minScore: number | null;
  maxScore: number | null;
};

export function matchesScoreRange(score: number, recommendation: ScoreBoundedRecommendation): boolean {
  const isAboveMinimum = recommendation.minScore === null || score >= recommendation.minScore;
  const isBelowMaximum = recommendation.maxScore === null || score <= recommendation.maxScore;
  return isAboveMinimum && isBelowMaximum;
}

export type SubmissionQuestion = {
  id: number;
  options: Array<{ id: number; questionId: number; score: number }>;
};

export type SubmissionAnswer = { questionId: number; optionId: number };

export function prepareAssessmentSubmission<T extends ScoreBoundedRecommendation>({
  questions,
  answers,
  scoringGuide,
  recommendations,
}: {
  questions: SubmissionQuestion[];
  answers: SubmissionAnswer[];
  scoringGuide?: unknown;
  recommendations: Array<T>;
}) {
  if (answers.length !== questions.length) throw new Error("Responda todas as perguntas antes de concluir.");
  if (new Set(answers.map(answer => answer.questionId)).size !== questions.length) throw new Error("Há respostas duplicadas na avaliação.");

  const validQuestionIds = new Set(questions.map(question => question.id));
  const validOptions = new Map(questions.flatMap(question => question.options.map(option => [option.id, option])));
  const normalizedAnswers = answers.map(answer => {
    const option = validOptions.get(answer.optionId);
    if (!option || option.questionId !== answer.questionId || !validQuestionIds.has(answer.questionId)) {
      throw new Error("Uma das respostas enviadas é inválida.");
    }
    return { ...answer, score: option.score };
  });
  const maximumScore = questions.reduce((sum, question) => sum + Math.max(...question.options.map(option => option.score), 0), 0);
  const outcome = calculateAssessmentResult(normalizedAnswers.map(answer => answer.score), maximumScore, scoringGuide);
  return { normalizedAnswers, outcome, recommendations: recommendations.filter(item => matchesScoreRange(outcome.score, item)) };
}

function isAsrsV11SixQuestionScreener(guide: unknown): guide is AssessmentScoringGuide {
  return Boolean(
    guide &&
      typeof guide === "object" &&
      "kind" in guide &&
      (guide as AssessmentScoringGuide).kind === "asrs-v1-1-6",
  );
}

function isPcl5Scorer(guide: unknown): boolean {
  return Boolean(
    guide &&
      typeof guide === "object" &&
      "kind" in guide &&
      (guide as any).kind === "pcl-5-standard",
  );
}

export function calculateAssessmentResult(scores: number[], maximumScore: number, scoringGuide?: unknown): AssessmentResult {
  const score = scores.reduce((total, current) => total + current, 0);
  const percentage = maximumScore > 0 ? Math.round((score / maximumScore) * 100) : 0;

  if (isAsrsV11SixQuestionScreener(scoringGuide)) {
    const reachedScreeningThreshold = score >= 4;
    return {
      score,
      percentage,
      displayValue: `${score} de 6`,
      metricLabel: "respostas na faixa destacada",
      band: reachedScreeningThreshold ? "Converse com profissional habilitado" : "Abaixo do ponto de corte do screener",
      summary: reachedScreeningThreshold
        ? "Quatro ou mais respostas ficaram nas faixas destacadas pelo ASRS v1.1. Isso não confirma TDAH, mas indica que pode ser útil conversar com profissional habilitado para uma avaliação clínica."
        : "Menos de quatro respostas ficaram nas faixas destacadas pelo ASRS v1.1. Este resultado não confirma nem exclui TDAH e não substitui uma avaliação clínica.",
    };
  }

  if (isPcl5Scorer(scoringGuide)) {
    const reachedCutoff = score >= 33;
    return {
      score,
      percentage,
      displayValue: `${score} de 80`,
      metricLabel: "pontuação total PCL-5",
      band: reachedCutoff ? "Atenção Prioritária (Sintomas Elevados de TEPT)" : "Baixo Indicador de Sintomas de TEPT",
      summary: reachedCutoff
        ? "Sua pontuação total atingiu ou ultrapassou o ponto de corte indicativo do PCL-5 (33 pontos). Isso sugere sintomas significativos de estresse pós-traumático no último mês e aponta para a importância de buscar avaliação especializada com psicólogo ou psiquiatra."
        : "Sua pontuação total ficou abaixo do ponto de corte indicativo do PCL-5. Isso indica baixa frequência de sintomas de estresse pós-traumático no último período, mas caso sinta desconforto persistente, converse com um profissional.",
    };
  }

  if (percentage < 35) {
    return {
      score,
      percentage,
      band: "atenção inicial",
      summary:
        "Suas respostas indicam alguns pontos de atenção. Use este resultado como convite ao autocuidado e à observação de como você tem se sentido.",
    };
  }

  if (percentage < 65) {
    return {
      score,
      percentage,
      band: "atenção moderada",
      summary:
        "Suas respostas sugerem que vale olhar com mais cuidado para seu bem-estar. Considere conversar com uma pessoa de confiança ou profissional habilitado.",
    };
  }

  return {
    score,
    percentage,
    band: "atenção prioritária",
    summary:
      "Suas respostas sugerem que buscar apoio profissional pode ser importante. Esta autoavaliação não substitui atendimento ou diagnóstico clínico.",
  };
}

export function progressPercent(answeredCount: number, questionCount: number): number {
  if (questionCount <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((answeredCount / questionCount) * 100)));
}
