import { describe, expect, it } from "vitest";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { ADDITIONAL_ARTICLE_SLUGS } from "../client/src/data/expandedArticleAdditional";
import { RECENT_ARTICLES } from "../client/src/data/editorialMock";

const firstWaveSlugs = [
  "fobia-social-timidez-excesso",
  "transtorno-de-panico-crises-manejo",
  "compulsao-alimentar-emocoes-saude",
  "sofrimento-mental-sinais-cuidado",
  "saude-mental-preventiva-habitos",
];

const additionalClusterSlugs = {
  "Relações e Sociedade": [
    "ansiedade-desempenho-apresentacoes",
    "medo-de-julgamento-rejeicao",
    "isolamento-social-ciclo-ansiedade",
    "exposicao-gradual-fobia-social",
  ],
  "Ansiedade e Crises": [
    "agorafobia-panico-esquiva",
    "sintomas-fisicos-ansiedade-aguda",
    "respiracao-diafragmatica-crises",
    "recaidas-panico-superacao",
  ],
  "Hábitos e Comportamento": [
    "fome-emocional-vs-fome-fisiologica",
    "culpa-alimentar-auto-cobranca",
    "nutricao-compassiva-relacao-comida",
    "transtorno-binge-eating-tratamento",
  ],
  "Bem-estar e Prevenção": [
    "fadiga-mental-cronica-esgotamento",
    "perfeccionismo-toxico-saude",
    "mascara-emocional-alta-funcionalidade",
    "pedir-ajuda-primeiro-passo",
  ],
  "Prevenção e Longevidade": [
    "higiene-mental-pausas-cognitivas",
    "conexao-social-bateria-emocional",
    "movimento-corpo-mente-exercicio",
    "mindfulness-atencao-plena-cotidiano",
  ],
};

describe("expanded editorial clusters", () => {
  it("exposes all 25 new articles through the canonical article database", () => {
    const allNewSlugs = [...firstWaveSlugs, ...ADDITIONAL_ARTICLE_SLUGS];

    expect(Object.keys(ARTICLES_DATABASE)).toHaveLength(53);

    expect(allNewSlugs).toHaveLength(25);
    expect(new Set(allNewSlugs).size).toBe(25);
    allNewSlugs.forEach((slug) => {
      expect(ARTICLES_DATABASE[slug]).toBeDefined();
      expect(ARTICLES_DATABASE[slug].slug).toBe(slug);
      expect(ARTICLES_DATABASE[slug].directAnswer.length).toBeGreaterThan(40);
      expect(ARTICLES_DATABASE[slug].evidenceBox).toBeDefined();
      expect(ARTICLES_DATABASE[slug].faqs.length).toBeGreaterThan(0);
      expect(ARTICLES_DATABASE[slug].references.length).toBeGreaterThan(0);
    });
  });

  it("exposes the expanded slugs through the public Hub Editorial inventory", () => {
    const recentSlugs = new Set(RECENT_ARTICLES.map((item) => item.slug.replace("/conteudos/", "")));
    const allNewSlugs = [...firstWaveSlugs, ...ADDITIONAL_ARTICLE_SLUGS];

    allNewSlugs.forEach((slug) => {
      expect(recentSlugs.has(slug)).toBe(true);
    });
  });

  it("keeps five editorial entries in each expansion cluster", () => {
    for (const [category, slugs] of Object.entries(additionalClusterSlugs)) {
      const firstWaveInCategory = firstWaveSlugs.filter((slug) => ARTICLES_DATABASE[slug].category === category);
      const allSlugs = [...firstWaveInCategory, ...slugs];

      expect(allSlugs).toHaveLength(5);
      expect(new Set(allSlugs).size).toBe(5);
      allSlugs.forEach((slug) => {
        expect(ARTICLES_DATABASE[slug].category).toBe(category);
      });
    }
  });
});
