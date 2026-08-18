import mysql from "mysql2/promise";
import postgres from "postgres";

const legacyUrl = process.env.DATABASE_URL;
const postgresUrl = process.env.POSTGRES_DATABASE_URL;

if (!legacyUrl || !postgresUrl) {
  throw new Error("DATABASE_URL e POSTGRES_DATABASE_URL são obrigatórias para a auditoria STG-01.");
}

const psychometricKinds = new Set(["gad-7", "phq-9", "asrs-v1-1-6", "dass-21"]);
const isPsychometric = (guide) => Boolean(guide && typeof guide === "object" && psychometricKinds.has(guide.kind));
const typeFor = (guide) => (isPsychometric(guide) ? "instrumento psicométrico" : "autoobservação/editorial");

const legacy = await mysql.createConnection(legacyUrl);
const target = postgres(postgresUrl, { prepare: false, max: 1 });

try {
  const [legacyRows] = await legacy.query(`
    select slug, title, status, scoringGuide
    from assessments
    order by id asc
  `);
  const targetRows = await target`
    select slug, title, status, "scoringGuide"
    from assessments
    where status = 'publicado'
    order by id asc
  `;

  const legacyBySlug = new Map(
    legacyRows.map((row) => [
      row.slug,
      {
        title: row.title,
        status: row.status,
        scoringGuide: typeof row.scoringGuide === "string" ? JSON.parse(row.scoringGuide) : row.scoringGuide ?? null,
      },
    ]),
  );

  const catalog = targetRows.map((row) => {
    const scoringGuide = typeof row.scoringGuide === "string" ? JSON.parse(row.scoringGuide) : row.scoringGuide ?? null;
    const legacyItem = legacyBySlug.get(row.slug);

    return {
      slug: row.slug,
      nome: row.title,
      tipo: typeFor(scoringGuide),
      status: row.status,
      instrumentoPsicometrico: isPsychometric(scoringGuide),
      presenteNoRc1: Boolean(legacyItem),
      esperadoNoCatalogo: Boolean(legacyItem && legacyItem.status === "publicado"),
      classificacao: legacyItem && legacyItem.status === "publicado" ? "EXPECTED" : "UNEXPECTED_CATALOG_EXPOSURE",
    };
  });

  const missingExpected = [...legacyBySlug.entries()]
    .filter(([, item]) => item.status === "publicado")
    .filter(([slug]) => !catalog.some((item) => item.slug === slug))
    .map(([slug, item]) => ({ slug, nome: item.title }));

  const unexpected = catalog.filter((item) => item.classificacao === "UNEXPECTED_CATALOG_EXPOSURE");

  console.log(JSON.stringify({
    legacyPublishedCount: [...legacyBySlug.values()].filter((item) => item.status === "publicado").length,
    postgresPublishedCount: catalog.length,
    catalog,
    missingExpected,
    unexpected,
    catalogParity: missingExpected.length === 0 && unexpected.length === 0 ? "PASS" : "FAIL",
  }, null, 2));
} finally {
  await legacy.end();
  await target.end({ timeout: 5 });
}
