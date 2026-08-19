import { describe, expect, it } from "vitest";
import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { RECENT_ARTICLES, EDITORIAL_SEARCH_SUGGESTIONS } from "../client/src/data/editorialMock";
import { getCanonicalTest } from "../client/src/data/testsCanonicalDatabase";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const pillarSource = readFileSync(resolve(process.cwd(), "client/src/pages/TdahPillarPage.tsx"), "utf8");
const asrsSource = readFileSync(resolve(process.cwd(), "client/src/pages/AsrsEntityPage.tsx"), "utf8");
const assessmentSource = readFileSync(resolve(process.cwd(), "client/src/pages/AssessmentFlow.tsx"), "utf8");

const waveSlugs = ["tdah-em-adultos", "sintomas-de-tdah-em-adultos", "teste-de-tdah-online"] as const;

function hrefsFor(slug: string) {
  const article = ARTICLES_DATABASE[slug];
  return article.sections.flatMap(section => section.paragraphs.flatMap(paragraph => paragraph.segments.map(segment => segment.href).filter(Boolean)));
}

describe("TDAH First Wave Integrity Closeout", () => {
  it("mantém os três slugs publicados e mapeados ao ASRS canônico", () => {
    const asrs = getCanonicalTest("ASRS v1.1");
    expect(asrs?.acronym).toBe("ASRS v1.1");
    waveSlugs.forEach(slug => {
      expect(ARTICLES_DATABASE[slug]).toBeDefined();
      expect(ARTICLES_DATABASE[slug].relatedTestSlug).toBe("asrs");
      expect(ARTICLES_DATABASE[slug].relatedTest?.acronym).toBe("ASRS v1.1");
      expect(ARTICLES_DATABASE[slug].primaryEntity).toMatch(/TDAH|ADHD/);
    });
  });

  it("prova os quatro links semânticos reais do Condition Hub", () => {
    expect(pillarSource).toContain('href="/conteudos/tdah-em-adultos"');
    expect(pillarSource).toContain('href="/conteudos/sintomas-de-tdah-em-adultos"');
    expect(pillarSource).toContain('href="/conteudos/teste-de-tdah-online"');
    expect(pillarSource).toContain('href="/testes/asrs"');
  });

  it("prova links bidirecionais dos artigos para o hub e ASRS", () => {
    expect(hrefsFor("tdah-em-adultos")).toContain("/tdah");
    expect(hrefsFor("tdah-em-adultos")).toContain("/testes/asrs");
    expect(hrefsFor("sintomas-de-tdah-em-adultos")).toContain("/tdah");
    expect(hrefsFor("sintomas-de-tdah-em-adultos")).toContain("/testes/asrs");
    expect(hrefsFor("teste-de-tdah-online")).toContain("/tdah");
    expect(hrefsFor("teste-de-tdah-online")).toContain("/testes/asrs");
  });

  it("integra os três conteúdos ao Hub Editorial sem promovê-los a Featured", () => {
    waveSlugs.forEach(slug => expect(RECENT_ARTICLES.some(item => item.slug === `/conteudos/${slug}`)).toBe(true));
    expect(EDITORIAL_SEARCH_SUGGESTIONS.some(item => item.slug === "/conteudos/tdah-em-adultos")).toBe(true);
  });

  it("mantém entidade ASRS separada da execução e registra a rota real", () => {
    expect(appSource).toContain('path="/testes/asrs"');
    expect(appSource).toContain('path="/testes/asrs/iniciar"');
    expect(appSource).toContain('path="/avaliacao/:id"');
    expect(asrsSource).toContain('href="/testes/asrs/iniciar"');
    expect(asrsSource).toContain("assessments.listPublished.useQuery");
    expect(asrsSource).toContain("const destination = `/avaliacao/${assessment.id}`");
    expect(asrsSource).toContain("if (user) setLocation(destination)");
  });

  it("marca o resultado privado como noindex e preserva screening != diagnosis", () => {
    expect(assessmentSource).toContain('content", "noindex,nofollow,noarchive"');
    expect(assessmentSource).toContain("não confirma nem exclui TDAH");
    expect(asrsSource).toContain("ASRS ≠ Diagnóstico Clínico");
  });
});
