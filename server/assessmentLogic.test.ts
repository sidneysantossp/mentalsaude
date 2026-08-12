import { describe, expect, it } from "vitest";
import { calculateAssessmentResult, progressPercent } from "./assessmentLogic";

describe("calculateAssessmentResult", () => {
  it("categoriza uma pontuação baixa como atenção inicial", () => {
    expect(calculateAssessmentResult([0, 1, 0, 1], 12)).toMatchObject({
      score: 2,
      percentage: 17,
      band: "atenção inicial",
    });
  });

  it("categoriza uma pontuação intermediária como atenção moderada", () => {
    expect(calculateAssessmentResult([2, 2, 2], 9)).toMatchObject({
      percentage: 67,
      band: "atenção prioritária",
    });
  });

  it("mantém o progresso entre zero e cem", () => {
    expect(progressPercent(3, 8)).toBe(38);
    expect(progressPercent(12, 8)).toBe(100);
    expect(progressPercent(0, 0)).toBe(0);
  });
});
