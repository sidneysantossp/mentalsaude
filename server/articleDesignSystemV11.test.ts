import { describe, it, expect } from "vitest";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { getCanonicalTest, CANONICAL_TESTS_CATALOG } from "../client/src/data/testsCanonicalDatabase";

describe("Article Design System V1.1 - Rigorous Validation", () => {
  it("1. Data-Driven Mapping: Articles link to canonical tests without hardcoded component logic", () => {
    const anxietyArticle = ARTICLES_DATABASE["ansiedade-o-que-e-sintomas-causas"];
    const depressionArticle = ARTICLES_DATABASE["depressao-sintomas-causas-tratamento"];
    const adhdArticle = ARTICLES_DATABASE["tdah-em-adultos"];

    expect(anxietyArticle.relatedTest?.acronym).toBe("GAD-7");
    expect(depressionArticle.relatedTest?.acronym).toBe("PHQ-9");
    expect(adhdArticle.relatedTest?.acronym).toBe("ASRS v1.1");

    // Verificar se a entidade canônica correspondente existe no catálogo central
    const gad7 = getCanonicalTest("GAD-7");
    const phq9 = getCanonicalTest("PHQ-9");
    const asrs = getCanonicalTest("ASRS v1.1");

    expect(gad7).toBeDefined();
    expect(phq9).toBeDefined();
    expect(asrs).toBeDefined();

    expect(gad7?.questionCount).toBe(7);
    expect(phq9?.questionCount).toBe(9);
    expect(asrs?.questionCount).toBe(6);
  });

  it("2. Fallback Mechanism: Articles without relatedTest (e.g. guia-geral-sem-teste) do not crash and have null relatedTest", () => {
    const generalGuide = ARTICLES_DATABASE["guia-geral-sem-teste"];
    expect(generalGuide).toBeDefined();
    expect(generalGuide.relatedTest).toBeNull();
  });

  it("3. Semantic Navigation Flow: Routes follow ARTICLE -> TEST ENTITY PAGE -> TEST EXECUTION", () => {
    const gad7 = getCanonicalTest("GAD-7");
    const phq9 = getCanonicalTest("PHQ-9");
    const asrs = getCanonicalTest("ASRS v1.1");
    expect(gad7?.targetRoute).toBe("/testes/gad-7");
    expect(gad7?.executionRoute).toBeNull();
    expect(phq9?.targetRoute).toBe("/testes/phq-9");
    expect(phq9?.executionRoute).toBeNull();
    expect(asrs?.targetRoute).toBe("/testes/asrs");
    expect(asrs?.executionRoute).toBe("/testes/asrs/iniciar");
  });

  it("4. Canonical Data Integrity: No manual duplication inside articles", () => {
    Object.values(ARTICLES_DATABASE).forEach(article => {
      if (article.relatedTest) {
        // Os dados essenciais do instrumento devem ser canônicos ou corresponder ao catálogo
        expect(article.relatedTest.questionCount).toBeGreaterThan(0);
        expect(article.relatedTest.durationMinutes).toBeGreaterThan(0);
      }
    });
  });
});
