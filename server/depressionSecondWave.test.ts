import { describe, expect, it } from "vitest";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { getCanonicalTest } from "../client/src/data/testsCanonicalDatabase";

const WAVE_SLUGS = [
  "sintomas-de-depressao",
  "qual-profissional-procurar-depressao",
  "tratamento-depressao",
] as const;

const INTERNAL_TARGETS = new Set([
  "/conteudos/depressao-sintomas-causas-tratamento",
  "/conteudos/teste-de-depressao-online",
  "/conteudos/qual-profissional-procurar-depressao",
  "/conteudos/tratamento-depressao",
  "/conteudos/sintomas-de-depressao",
  "/testes/phq-9",
]);

describe("Depression Second Wave", () => {
  it("publishes exactly the three required article routes", () => {
    expect(WAVE_SLUGS).toHaveLength(3);
    for (const slug of WAVE_SLUGS) {
      expect(ARTICLES_DATABASE[slug]).toBeDefined();
      expect(ARTICLES_DATABASE[slug].slug).toBe(slug);
    }
  });

  it("keeps semantic ownership distinct from the general depression guide", () => {
    expect(ARTICLES_DATABASE["sintomas-de-depressao"].primaryEntity).toBe("Sintomas de Depressão");
    expect(ARTICLES_DATABASE["qual-profissional-procurar-depressao"].primaryEntity).toBe("Busca de Ajuda Profissional para Depressão");
    expect(ARTICLES_DATABASE["tratamento-depressao"].primaryEntity).toBe("Tratamento da Depressão");
    expect(ARTICLES_DATABASE["depressao-sintomas-causas-tratamento"].primaryEntity).toBe("Depressão");
  });

  it("maps all new articles to the canonical PHQ-9 entity without duplicated instrument metadata", () => {
    const phq9 = getCanonicalTest("phq-9");
    expect(phq9?.targetRoute).toBe("/testes/phq-9");
    for (const slug of WAVE_SLUGS) {
      const article = ARTICLES_DATABASE[slug];
      expect(article.relatedTestSlug).toBe("phq-9");
      expect(article.relatedTest).toBeUndefined();
    }
  });

  it("uses the required original-value frameworks", () => {
    expect(ARTICLES_DATABASE["sintomas-de-depressao"].originalValue?.map(value => value.type)).toEqual(["SYMPTOM_MAP", "ORIGINAL_TABLE"]);
    expect(ARTICLES_DATABASE["qual-profissional-procurar-depressao"].originalValue?.map(value => value.type)).toEqual(["DECISION_FRAMEWORK"]);
    expect(ARTICLES_DATABASE["tratamento-depressao"].originalValue?.map(value => value.type)).toEqual(["EVIDENCE_SYNTHESIS", "TREATMENT_OVERVIEW_FRAMEWORK"]);
  });

  it("passes clinical safety constraints for symptoms and professional help", () => {
    const symptom = ARTICLES_DATABASE["sintomas-de-depressao"];
    const professionalHelp = ARTICLES_DATABASE["qual-profissional-procurar-depressao"];
    const text = JSON.stringify([symptom.directAnswer, ...symptom.keyTakeaways, ...symptom.sections, ...symptom.faqs]);
    const professionalText = JSON.stringify([professionalHelp.directAnswer, ...professionalHelp.keyTakeaways, ...professionalHelp.sections, ...professionalHelp.faqs]);
    expect(text).not.toMatch(/x\s* sintomas\s*=\s*depressão|você tem depressão/i);
    expect(text).toMatch(/não.*diagnóstico|não.*confirma/i);
    expect(professionalText).toMatch(/não há uma ordem universal|não existe uma ordem universal/i);
    expect(professionalText).not.toMatch(/primeiro procure (o|a) (psicólogo|psiquiatra)/i);
  });

  it("passes treatment YMYL constraints with source-backed overview language", () => {
    const treatment = ARTICLES_DATABASE["tratamento-depressao"];
    const text = JSON.stringify([treatment.directAnswer, ...treatment.keyTakeaways, ...treatment.sections, treatment.evidenceBox, ...treatment.faqs]);
    expect(treatment.references.length).toBeGreaterThanOrEqual(3);
    expect(text).toMatch(/quando.*indicad|avaliação profissional|avaliação/i);
    expect(text).not.toMatch(/melhor antidepressivo|dosagem|prescreva|inicie por conta própria|ajuste a dose por conta própria/i);
  });

  it("has internal links that resolve to known editorial destinations", () => {
    for (const slug of WAVE_SLUGS) {
      const article = ARTICLES_DATABASE[slug];
      const hrefs = article.sections.flatMap(section => section.paragraphs.flatMap(paragraph => paragraph.segments.flatMap(segment => segment.href ? [segment.href] : [])));
      expect(hrefs.length).toBeGreaterThan(0);
      hrefs.forEach(href => expect(INTERNAL_TARGETS.has(href)).toBe(true));
    }
  });

  it("keeps the depression wave distinct from the anxiety-depression bridge", () => {
    const bridge = ARTICLES_DATABASE["ansiedade-ou-depressao"];
    expect(bridge).toBeDefined();
    expect(bridge.primaryEntity).not.toBe("Sintomas de Depressão");
    expect(bridge.primaryEntity).not.toBe("Tratamento da Depressão");
  });
});
