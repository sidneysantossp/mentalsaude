import { describe, expect, it } from "vitest";
import { calculateAssessmentResult, prepareAssessmentSubmission } from "./assessmentLogic";

describe("Testes autorais de autoobservação (IDs 2 a 10)", () => {
  const scoringGuide = { kind: "general" };

  it("calcula corretamente a porcentagem e a faixa de escore geral", () => {
    const result = calculateAssessmentResult([3, 3, 3], 9, scoringGuide);

    expect(result.score).toBe(9);
    expect(result.percentage).toBe(100);
    expect(result.band).toBe("atenção prioritária");
  });

  it("classifica escores moderados ou baixos adequadamente", () => {
    const lowResult = calculateAssessmentResult([0, 1, 0], 9, scoringGuide);
    expect(lowResult.score).toBe(1);
    expect(lowResult.percentage).toBe(11);
    expect(lowResult.band).toBe("atenção inicial");
  });

  it("prepara a submissão e filtra as recomendações específicas por faixa de escore", () => {
    const questions = [
      { id: 101, options: [{ id: 1, questionId: 101, score: 0 }, { id: 2, questionId: 101, score: 3 }] },
      { id: 102, options: [{ id: 3, questionId: 102, score: 0 }, { id: 4, questionId: 102, score: 3 }] },
      { id: 103, options: [{ id: 5, questionId: 103, score: 0 }, { id: 6, questionId: 103, score: 3 }] },
    ];
    const recommendations = [
      { minScore: 0, maxScore: 3, title: "Autocuidado diário" },
      { minScore: 4, maxScore: 9, title: "Apoio profissional recomendado" },
    ];

    const submission = prepareAssessmentSubmission({
      questions,
      answers: [
        { questionId: 101, optionId: 2 },
        { questionId: 102, optionId: 4 },
        { questionId: 103, optionId: 6 },
      ],
      scoringGuide,
      recommendations,
    });

    expect(submission.outcome.score).toBe(9);
    expect(submission.recommendations).toHaveLength(1);
    expect(submission.recommendations[0]?.title).toBe("Apoio profissional recomendado");
  });
});
