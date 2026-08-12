import { describe, expect, it } from "vitest";
import { calculateAssessmentResult } from "./assessmentLogic";

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
});
