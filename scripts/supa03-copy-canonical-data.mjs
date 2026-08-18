import mysql from "mysql2/promise";
import postgres from "postgres";

const apply = process.argv.includes("--apply");
const sourceUrl = process.env.DATABASE_URL;
const targetUrl = process.env.POSTGRES_DATABASE_URL;

if (!sourceUrl || !targetUrl) {
  throw new Error("DATABASE_URL e POSTGRES_DATABASE_URL são obrigatórias para a importação SUPA-03.");
}

const importedTables = [
  "assessments",
  "assessmentQuestions",
  "assessmentOptions",
  "recommendations",
  "contentOpportunities",
  "contentBriefs",
  "contentEvidence",
  "internalLinksGraph",
  "articleVersions",
  "publicationGates",
];

const excludedTables = ["users", "userProfiles", "assessmentAttempts", "assessmentAnswers"];

const asNumber = value => (value === null || value === undefined ? null : Number(value));
const asBoolean = value => value === true || value === 1 || value === "1";
const asJson = value => {
  if (value === null || value === undefined) return null;
  return typeof value === "string" ? JSON.parse(value) : value;
};

async function getCounts(client, dialect) {
  const counts = {};
  for (const table of importedTables) {
    if (dialect === "mysql") {
      const [rows] = await client.query(`select count(*) as count from \`${table}\``);
      counts[table] = Number(rows[0].count);
    } else {
      const [{ count }] = await client.unsafe(`select count(*)::int as count from "${table}"`);
      counts[table] = count;
    }
  }
  return counts;
}

function nonEmptyCount(counts) {
  return Object.values(counts).some(count => count > 0);
}

const source = await mysql.createConnection(sourceUrl);
const target = postgres(targetUrl, { prepare: false, max: 1 });

try {
  const [
    sourceAssessments,
    sourceQuestions,
    sourceOptions,
    sourceRecommendations,
    sourceOpportunities,
    sourceBriefs,
    sourceEvidence,
    sourceLinks,
    sourceArticleVersions,
    sourcePublicationGates,
  ] = await Promise.all([
    source.query("select * from `assessments` order by `id` asc"),
    source.query("select * from `assessmentQuestions` order by `id` asc"),
    source.query("select * from `assessmentOptions` order by `id` asc"),
    source.query("select * from `recommendations` order by `id` asc"),
    source.query("select * from `contentOpportunities` order by `id` asc"),
    source.query("select * from `contentBriefs` order by `id` asc"),
    source.query("select * from `contentEvidence` order by `id` asc"),
    source.query("select * from `internalLinksGraph` order by `id` asc"),
    source.query("select * from `articleVersions` order by `id` asc"),
    source.query("select * from `publicationGates` order by `id` asc"),
  ]);

  const sourceRows = {
    assessments: sourceAssessments[0],
    assessmentQuestions: sourceQuestions[0],
    assessmentOptions: sourceOptions[0],
    recommendations: sourceRecommendations[0],
    contentOpportunities: sourceOpportunities[0],
    contentBriefs: sourceBriefs[0],
    contentEvidence: sourceEvidence[0],
    internalLinksGraph: sourceLinks[0],
    articleVersions: sourceArticleVersions[0],
    publicationGates: sourcePublicationGates[0],
  };

  const sourceCounts = Object.fromEntries(importedTables.map(table => [table, sourceRows[table].length]));
  const targetCounts = await getCounts(target, "postgres");

  if (nonEmptyCount(targetCounts)) {
    throw new Error("O destino SUPA-03 não está vazio para as entidades canônicas; a importação foi bloqueada.");
  }

  const summary = {
    mode: apply ? "apply" : "dry-run",
    importedTables,
    excludedTables,
    sourceCounts,
    targetCountsBefore: targetCounts,
  };

  if (!apply) {
    console.log(JSON.stringify(summary, null, 2));
    process.exitCode = 0;
  } else {
    await target.begin(async sql => {
      const assessmentIds = new Map();
      const questionIds = new Map();
      const opportunityIds = new Map();

      for (const row of sourceRows.assessments) {
        const [inserted] = await sql`
          insert into "assessments" (
            "slug", "title", "category", "shortDescription", "description", "durationMinutes",
            "difficulty", "status", "scoringGuide", "createdByUserId", "createdAt", "updatedAt"
          ) values (
            ${row.slug}, ${row.title}, ${row.category}, ${row.shortDescription}, ${row.description},
            ${asNumber(row.durationMinutes)}, ${row.difficulty}, ${row.status}, ${asJson(row.scoringGuide)},
            ${null}, ${row.createdAt}, ${row.updatedAt}
          ) returning "id"
        `;
        assessmentIds.set(Number(row.id), inserted.id);
      }

      for (const row of sourceRows.assessmentQuestions) {
        const assessmentId = assessmentIds.get(Number(row.assessmentId));
        if (!assessmentId) throw new Error(`Questão ${row.id} não possui instrumento canônico de destino.`);
        const [inserted] = await sql`
          insert into "assessmentQuestions" (
            "assessmentId", "position", "statement", "supportText", "isReverseScored", "createdAt", "updatedAt"
          ) values (
            ${assessmentId}, ${asNumber(row.position)}, ${row.statement}, ${row.supportText},
            ${asBoolean(row.isReverseScored)}, ${row.createdAt}, ${row.updatedAt}
          ) returning "id"
        `;
        questionIds.set(Number(row.id), inserted.id);
      }

      for (const row of sourceRows.assessmentOptions) {
        const questionId = questionIds.get(Number(row.questionId));
        if (!questionId) throw new Error(`Opção ${row.id} não possui questão canônica de destino.`);
        await sql`
          insert into "assessmentOptions" ("questionId", "position", "label", "score")
          values (${questionId}, ${asNumber(row.position)}, ${row.label}, ${asNumber(row.score)})
        `;
      }

      for (const row of sourceRows.recommendations) {
        const assessmentId = row.assessmentId === null ? null : assessmentIds.get(Number(row.assessmentId));
        if (row.assessmentId !== null && !assessmentId) throw new Error(`Recomendação ${row.id} não possui instrumento canônico de destino.`);
        await sql`
          insert into "recommendations" (
            "assessmentId", "title", "body", "actionLabel", "actionUrl", "minScore", "maxScore", "isActive", "createdAt", "updatedAt"
          ) values (
            ${assessmentId}, ${row.title}, ${row.body}, ${row.actionLabel}, ${row.actionUrl},
            ${asNumber(row.minScore)}, ${asNumber(row.maxScore)}, ${asBoolean(row.isActive)}, ${row.createdAt}, ${row.updatedAt}
          )
        `;
      }

      for (const row of sourceRows.contentOpportunities) {
        const [inserted] = await sql`
          insert into "contentOpportunities" (
            "cluster", "title", "slug", "primaryQuery", "secondaryQueries", "searchIntent", "funnelStage", "contentType",
            "primaryEntity", "secondaryEntities", "relatedTestSlug", "opportunityLevel", "topicalImportance", "conversionProximity",
            "entityGap", "internalLinkValue", "evidenceAvailability", "differentiationPotential", "status", "createdAt", "updatedAt"
          ) values (
            ${row.cluster}, ${row.title}, ${row.slug}, ${row.primaryQuery}, ${row.secondaryQueries}, ${row.searchIntent},
            ${row.funnelStage}, ${row.contentType}, ${row.primaryEntity}, ${row.secondaryEntities}, ${row.relatedTestSlug},
            ${row.opportunityLevel}, ${row.topicalImportance}, ${row.conversionProximity}, ${row.entityGap}, ${row.internalLinkValue},
            ${row.evidenceAvailability}, ${row.differentiationPotential}, ${row.status}, ${row.createdAt}, ${row.updatedAt}
          ) returning "id"
        `;
        opportunityIds.set(Number(row.id), inserted.id);
      }

      for (const row of sourceRows.contentBriefs) {
        const opportunityId = opportunityIds.get(Number(row.opportunityId));
        if (!opportunityId) throw new Error(`Brief ${row.id} não possui oportunidade canônica de destino.`);
        await sql`
          insert into "contentBriefs" (
            "opportunityId", "workingTitle", "h1", "intent", "readerProblem", "readerOutcome", "directAnswerGoal", "primaryEntity",
            "secondaryEntities", "requiredSections", "questionsToAnswer", "referencesRequired", "relatedTestSlug", "internalLinksIn",
            "internalLinksOut", "originalValueRequirement", "ymylClassification", "reviewRequirements", "seoNotes", "aiCitabilityNotes",
            "createdAt", "updatedAt"
          ) values (
            ${opportunityId}, ${row.workingTitle}, ${row.h1}, ${row.intent}, ${row.readerProblem}, ${row.readerOutcome},
            ${row.directAnswerGoal}, ${row.primaryEntity}, ${row.secondaryEntities}, ${row.requiredSections}, ${row.questionsToAnswer},
            ${row.referencesRequired}, ${row.relatedTestSlug}, ${row.internalLinksIn}, ${row.internalLinksOut}, ${row.originalValueRequirement},
            ${row.ymylClassification}, ${row.reviewRequirements}, ${row.seoNotes}, ${row.aiCitabilityNotes}, ${row.createdAt}, ${row.updatedAt}
          )
        `;
      }

      for (const row of sourceRows.contentEvidence) {
        const opportunityId = row.opportunityId === null ? null : opportunityIds.get(Number(row.opportunityId));
        if (row.opportunityId !== null && !opportunityId) throw new Error(`Evidência ${row.id} não possui oportunidade canônica de destino.`);
        await sql`
          insert into "contentEvidence" (
            "opportunityId", "articleSlug", "claim", "source", "authors", "organization", "year", "url", "evidenceLevel", "sourceType", "createdAt"
          ) values (
            ${opportunityId}, ${row.articleSlug}, ${row.claim}, ${row.source}, ${row.authors}, ${row.organization},
            ${asNumber(row.year)}, ${row.url}, ${row.evidenceLevel}, ${row.sourceType}, ${row.createdAt}
          )
        `;
      }

      for (const row of sourceRows.internalLinksGraph) {
        await sql`
          insert into "internalLinksGraph" ("sourceSlug", "targetSlug", "anchorText", "linkType", "createdAt")
          values (${row.sourceSlug}, ${row.targetSlug}, ${row.anchorText}, ${row.linkType}, ${row.createdAt})
        `;
      }

      for (const row of sourceRows.articleVersions) {
        await sql`
          insert into "articleVersions" (
            "articleSlug", "versionId", "publishedAt", "modifiedAt", "reviewedAt", "referencesVersion", "reviewerId", "createdAt"
          ) values (
            ${row.articleSlug}, ${row.versionId}, ${row.publishedAt}, ${row.modifiedAt}, ${null}, ${row.referencesVersion}, ${null}, ${row.createdAt}
          )
        `;
      }

      for (const row of sourceRows.publicationGates) {
        await sql`
          insert into "publicationGates" (
            "articleSlug", "status", "checksJson", "reviewedByUserId", "reviewedAt", "createdAt", "updatedAt"
          ) values (
            ${row.articleSlug}, ${row.status}, ${row.checksJson}, ${null}, ${null}, ${row.createdAt}, ${row.updatedAt}
          )
        `;
      }
    });

    const targetCountsAfter = await getCounts(target, "postgres");
    console.log(JSON.stringify({ ...summary, targetCountsAfter }, null, 2));
  }
} finally {
  await Promise.all([source.end(), target.end({ timeout: 5 })]);
}
