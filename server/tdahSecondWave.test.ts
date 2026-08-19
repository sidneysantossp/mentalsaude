import { describe, it, expect } from "vitest";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { getCanonicalTest } from "../client/src/data/testsCanonicalDatabase";

const WAVE_SLUGS = [
  "tdah-ou-procrastinacao",
  "qual-profissional-procurar-tdah",
  "tratamento-tdah-adultos",
] as const;

const INTERNAL_TARGETS = new Set([
  "/conteudos/tdah-em-adultos",
  "/conteudos/sintomas-de-tdah-em-adultos",
  "/conteudos/teste-de-tdah-online",
  "/conteudos/tdah-ou-procrastinacao",
  "/conteudos/qual-profissional-procurar-tdah",
  "/conteudos/tratamento-tdah-adultos",
  "/testes/asrs",
  "/tdah",
]);

describe("TDAH Second Wave", () => {
  it("publishes exactly the three required article routes", () => {
    expect(WAVE_SLUGS).toHaveLength(3);
    for (const slug of WAVE_SLUGS) {
      expect(ARTICLES_DATABASE[slug]).toBeDefined();
      expect(ARTICLES_DATABASE[slug].slug).toBe(slug);
    }
  });

  it("keeps semantic ownership distinct from the general TDAH guide", () => {
    expect(ARTICLES_DATABASE["tdah-ou-procrastinacao"].primaryEntity).toBe("TDAH");
    expect(ARTICLES_DATABASE["qual-profissional-procurar-tdah"].primaryEntity).toBe("TDAH");
    expect(ARTICLES_DATABASE["tratamento-tdah-adultos"].primaryEntity).toBe("TDAH");
    expect(ARTICLES_DATABASE["tdah-em-adultos"].primaryEntity).toBe("TDAH");
  });

  it("maps all new articles to the canonical ASRS entity", () => {
    const asrs = getCanonicalTest("asrs");
    expect(asrs?.targetRoute).toBe("/testes/asrs");
    for (const slug of WAVE_SLUGS) {
      const article = ARTICLES_DATABASE[slug];
      expect(article.relatedTestSlug).toBe("asrs");
    }
  });

  it("passes clinical safety constraints for comparison and professional help", () => {
    const comparison = ARTICLES_DATABASE["tdah-ou-procrastinacao"];
    const professionalHelp = ARTICLES_DATABASE["qual-profissional-procurar-tdah"];
    const text = JSON.stringify([comparison.directAnswer, ...comparison.keyTakeaways, ...comparison.sections, ...comparison.faqs]);
    const professionalText = JSON.stringify([professionalHelp.directAnswer, ...professionalHelp.keyTakeaways, ...professionalHelp.sections, ...professionalHelp.faqs]);
    expect(text).not.toMatch(/quem procrastina muito pode ter TDAH|procrastinação é sinal de TDAH/i);
    expect(professionalText).not.toMatch(/primeiro procure (o|a) (psicólogo|psiquiatra)/i);
  });

  it("passes treatment YMYL constraints with medication boundaries", () => {
    const treatment = ARTICLES_DATABASE["tratamento-tdah-adultos"];
    const text = JSON.stringify([treatment.directAnswer, ...treatment.keyTakeaways, ...treatment.sections, treatment.evidenceBox, ...treatment.faqs]);
    expect(treatment.references.length).toBeGreaterThanOrEqual(1);
    expect(text).not.toMatch(/melhor remédio|dosagem|prescrição|qual remédio devo tomar/i);
  });

  it("has internal links that resolve to known editorial destinations", () => {
    for (const slug of WAVE_SLUGS) {
      const article = ARTICLES_DATABASE[slug];
      const hrefs = article.sections.flatMap(section => section.paragraphs.flatMap(paragraph => paragraph.segments.flatMap(segment => segment.href ? [segment.href] : [])));
      expect(hrefs.length).toBeGreaterThan(0);
      hrefs.forEach(href => expect(INTERNAL_TARGETS.has(href)).toBe(true));
    }
  });
});
