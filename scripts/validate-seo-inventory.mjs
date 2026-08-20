import { EDITORIAL_SLUGS } from "../shared/editorialSlugs.js";
import { ADDITIONAL_ARTICLE_SLUGS } from "../client/src/data/expandedArticleAdditional.ts";

const expectedNew = [
  "fobia-social-timidez-excesso",
  "transtorno-de-panico-crises-manejo",
  "compulsao-alimentar-emocoes-saude",
  "sofrimento-mental-sinais-cuidado",
  "saude-mental-preventiva-habitos",
  ...ADDITIONAL_ARTICLE_SLUGS,
];

if (EDITORIAL_SLUGS.length !== 53) throw new Error(`Expected 53 slugs, received ${EDITORIAL_SLUGS.length}`);
if (new Set(EDITORIAL_SLUGS).size !== EDITORIAL_SLUGS.length) throw new Error("Duplicate editorial slug");
for (const slug of expectedNew) {
  if (!EDITORIAL_SLUGS.includes(slug)) throw new Error(`Missing new slug: ${slug}`);
}
console.log(JSON.stringify({ total: EDITORIAL_SLUGS.length, newArticles: expectedNew.length, unique: true }));
