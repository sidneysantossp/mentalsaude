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

function isAsrsV11SixQuestionScreener(guide: unknown): guide is AssessmentScoringGuide {
  return Boolean(
    guide &&
      typeof guide === "object" &&
      "kind" in guide &&
      (guide as AssessmentScoringGuide).kind === "asrs-v1-1-6",
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
