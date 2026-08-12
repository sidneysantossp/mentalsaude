import { describe, expect, it } from "vitest";
import { calculateAssessmentResult, matchesScoreRange, prepareAssessmentSubmission } from "./assessmentLogic";

describe("ASRS v1.1 de seis perguntas", () => {
  const scoringGuide = { kind: "asrs-v1-1-6" };

  it("recomenda avaliação clínica a partir de quatro respostas nas faixas destacadas", () => {
    const result = calculateAssessmentResult([1, 1, 1, 1, 0, 0], 6, scoringGuide);

    expect(result.score).toBe(4);
    expect(result.band).toBe("Converse com profissional habilitado");
    expect(result.displayValue).toBe("4 de 6");
  });

  it("não interpreta uma pontuação abaixo do corte como exclusão diagnóstica", () => {
    const result = calculateAssessmentResult([1, 1, 1, 0, 0, 0], 6, scoringGuide);

    expect(result.band).toBe("Abaixo do ponto de corte do screener");
    expect(result.summary).toContain("não confirma nem exclui TDAH");
  });

  it("seleciona a recomendação adequada nos dois lados do ponto de corte", () => {
    const conversaClinica = { minScore: 4, maxScore: 6 };
    const registroPessoal = { minScore: 0, maxScore: 3 };
    const apoioEmCrise = { minScore: 0, maxScore: 6 };

    expect(matchesScoreRange(4, conversaClinica)).toBe(true);
    expect(matchesScoreRange(4, registroPessoal)).toBe(false);
    expect(matchesScoreRange(4, apoioEmCrise)).toBe(true);
    expect(matchesScoreRange(3, conversaClinica)).toBe(false);
    expect(matchesScoreRange(3, registroPessoal)).toBe(true);
    expect(matchesScoreRange(3, apoioEmCrise)).toBe(true);
  });

  it("prepara a submissão completa com respostas válidas e recomendações corretas", () => {
    const questions = Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      options: [
        { id: (index + 1) * 10, questionId: index + 1, score: 0 },
        { id: (index + 1) * 10 + 1, questionId: index + 1, score: 1 },
      ],
    }));
    const recommendations = [
      { minScore: 0, maxScore: 3, title: "registro" },
      { minScore: 4, maxScore: 6, title: "avaliação clínica" },
      { minScore: 0, maxScore: 6, title: "apoio" },
    ];

    const scoreThree = prepareAssessmentSubmission({
      questions,
      answers: questions.map((question, index) => ({ questionId: question.id, optionId: index < 3 ? question.options[1]!.id : question.options[0]!.id })),
      scoringGuide,
      recommendations,
    });
    const scoreFour = prepareAssessmentSubmission({
      questions,
      answers: questions.map((question, index) => ({ questionId: question.id, optionId: index < 4 ? question.options[1]!.id : question.options[0]!.id })),
      scoringGuide,
      recommendations,
    });

    expect(scoreThree.outcome.score).toBe(3);
    expect(scoreThree.recommendations.map(item => item.title)).toEqual(["registro", "apoio"]);
    expect(scoreFour.outcome.score).toBe(4);
    expect(scoreFour.recommendations.map(item => item.title)).toEqual(["avaliação clínica", "apoio"]);
  });
});
