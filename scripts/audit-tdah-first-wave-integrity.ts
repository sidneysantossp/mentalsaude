import { ARTICLES_DATABASE } from "../client/src/data/articlesDatabase";
import { seedTdahFirstWaveIfNeeded, getContentOpportunities, getContentBriefs, getContentEvidence, getInternalLinksGraph, getPublicationGates, evaluatePublicationGate } from "../server/db";

const articleSlugs = ["tdah-em-adultos", "sintomas-de-tdah-em-adultos", "teste-de-tdah-online"];
const publicRoutes = new Set([
  "/tdah",
  "/testes/asrs",
  "/conteudos/tdah-em-adultos",
  "/conteudos/sintomas-de-tdah-em-adultos",
  "/conteudos/teste-de-tdah-online",
]);

const result = await seedTdahFirstWaveIfNeeded();
const opportunities = await getContentOpportunities("tdah");
const briefs = await getContentBriefs("tdah");
const evidence = await getContentEvidence();
const links = await getInternalLinksGraph("tdah");
const gates = await getPublicationGates();
const gateResults = await Promise.all(articleSlugs.map(slug => evaluatePublicationGate(slug)));
const relevantEvidence = evidence.filter(item => articleSlugs.includes(item.articleSlug ?? ""));
const relevantGates = gates.filter(gate => articleSlugs.includes(gate.articleSlug));
const relevantLinks = links.filter(link => articleSlugs.includes(link.sourceSlug) || ["tdah", "asrs"].includes(link.sourceSlug));
const brokenLinks = relevantLinks.filter(link => {
  const target = `/${link.targetSlug}`;
  return !publicRoutes.has(target) && !publicRoutes.has(`/conteudos${target}`) && link.targetSlug !== "asrs" && link.targetSlug !== "tdah";
});
const orphanContents = articleSlugs.filter(slug => !links.some(link => link.sourceSlug === slug || link.targetSlug === slug));
const report = {
  generatedAt: new Date().toISOString(),
  wave: "TDAH First Wave",
  persisted: {
    opportunityCount: opportunities.length,
    publishedArticleCount: opportunities.filter(item => item.status === "published" && articleSlugs.includes(item.slug)).length,
    briefCount: briefs.length,
    evidenceCount: relevantEvidence.length,
    linkCount: relevantLinks.length,
    gateCount: relevantGates.length,
  },
  routes: {
    hub: "/tdah",
    entity: "/testes/asrs",
    articles: articleSlugs.map(slug => `/conteudos/${slug}`),
    executionBridge: "/testes/asrs/iniciar",
    execution: "/avaliacao/:id",
  },
  graph: { orphanContents, brokenLinks },
  gates: gateResults,
  contentAuthorityRegistration: opportunities.length >= 5 && briefs.length >= 3 && relevantEvidence.length >= 3 && relevantGates.length >= 3,
  canonicalAsrs: articleSlugs.every(slug => ARTICLES_DATABASE[slug]?.relatedTest?.acronym === "ASRS v1.1"),
  screeningNotDiagnosis: articleSlugs.every(slug => !/você tem TDAH|diagnóstico confirmado/i.test(JSON.stringify(ARTICLES_DATABASE[slug]))),
};
process.stdout.write(JSON.stringify(report, null, 2));
process.exit(0);
