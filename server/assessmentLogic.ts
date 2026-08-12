export type ResultBand = "atenção inicial" | "atenção moderada" | "atenção prioritária";

export type AssessmentResult = {
  score: number;
  percentage: number;
  band: ResultBand;
  summary: string;
};

export function calculateAssessmentResult(scores: number[], maximumScore: number): AssessmentResult {
  const score = scores.reduce((total, current) => total + current, 0);
  const percentage = maximumScore > 0 ? Math.round((score / maximumScore) * 100) : 0;

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
