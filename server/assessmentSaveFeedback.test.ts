import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const assessmentFlow = readFileSync(resolve(process.cwd(), "client/src/pages/AssessmentFlow.tsx"), "utf8");
const savedResultPage = readFileSync(resolve(process.cwd(), "client/src/pages/SavedAssessmentResultPage.tsx"), "utf8");

describe("feedback de salvamento da autoavaliação", () => {
  it("exibe animação e mensagem acessível durante o salvamento", () => {
    expect(assessmentFlow).toContain("Salvando seu resultado no painel…");
    expect(assessmentFlow).toContain('role="status" aria-live="polite"');
    expect(assessmentFlow).toContain('aria-hidden="true" />Salvando…');
  });

  it("confirma que o resultado foi salvo no painel", () => {
    expect(assessmentFlow).toContain("Resultado salvo com sucesso.");
    expect(assessmentFlow).toContain("A devolutiva já está disponível no seu painel em “Meus testes”.");
    expect(assessmentFlow).toContain("savedToPanel: true");
    expect(savedResultPage).toContain("savedToPanel: true");
  });

  it("mantém uma mensagem segura quando a persistência falha", () => {
    expect(assessmentFlow).toContain("Não foi possível salvar seu resultado agora. Tente novamente.");
    expect(assessmentFlow).toContain('onError: () => setError("Não foi possível salvar seu resultado agora. Tente novamente.")');
  });
});
