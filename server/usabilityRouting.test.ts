import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getCanonicalTest } from "../client/src/data/testsCanonicalDatabase";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("jornadas críticas de usabilidade", () => {
  it("preserva o teste escolhido durante o login de visitante", () => {
    const guard = read("client/src/components/ProtectedRoute.tsx");
    const catalog = read("client/src/pages/TestCatalog.tsx");
    expect(guard).toContain('destination = "/dashboard"');
    expect(guard).toContain('setItem("mental-saude:post-login", destination)');
    expect(catalog).toContain("beginLogin(`/avaliacao/${assessment.id}`)");
    expect(catalog).not.toContain('sessionStorage.setItem("mental-saude:selected-assessment"');
  });

  it("não envia GAD-7 e PHQ-9 para a execução genérica nem para o catálogo por engano", () => {
    expect(getCanonicalTest("gad-7")?.executionRoute).toBeNull();
    expect(getCanonicalTest("phq-9")?.executionRoute).toBeNull();
    expect(getCanonicalTest("asrs")?.targetRoute).toBe("/testes/asrs");
    expect(getCanonicalTest("asrs")?.executionRoute).toBe("/testes/asrs/iniciar");
  });

  it("usa fallback explícito quando uma entidade não tem execução pública", () => {
    const detail = read("client/src/pages/CanonicalTestDetailPage.tsx");
    const cta = read("client/src/components/ContextualTestCTA.tsx");
    expect(detail).toContain("Execução pública ainda não publicada");
    expect(cta).toContain("test.executionRoute ?");
  });
});
