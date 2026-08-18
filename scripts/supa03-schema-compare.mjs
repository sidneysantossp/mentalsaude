import { writeFile } from "node:fs/promises";
import postgres from "postgres";

const connectionUrl = process.env.DATABASE_MIGRATION_URL;
if (!connectionUrl) {
  throw new Error("DATABASE_MIGRATION_URL is required for SUPA-03 schema comparison.");
}

const expected = {
  articleVersions: ["id", "articleSlug", "versionId", "publishedAt", "modifiedAt", "reviewedAt", "referencesVersion", "reviewerId", "createdAt"],
  assessmentAnswers: ["id", "attemptId", "questionId", "optionId", "score", "answeredAt"],
  assessmentAttempts: ["id", "userId", "assessmentId", "status", "score", "resultBand", "resultSummary", "startedAt", "completedAt", "createdAt", "updatedAt"],
  assessmentOptions: ["id", "questionId", "position", "label", "score"],
  assessmentQuestions: ["id", "assessmentId", "position", "statement", "supportText", "isReverseScored", "createdAt", "updatedAt"],
  assessments: ["id", "slug", "title", "category", "shortDescription", "description", "durationMinutes", "difficulty", "status", "scoringGuide", "createdByUserId", "createdAt", "updatedAt"],
  contentBriefs: ["id", "opportunityId", "workingTitle", "h1", "intent", "readerProblem", "readerOutcome", "directAnswerGoal", "primaryEntity", "secondaryEntities", "requiredSections", "questionsToAnswer", "referencesRequired", "relatedTestSlug", "internalLinksIn", "internalLinksOut", "originalValueRequirement", "ymylClassification", "reviewRequirements", "seoNotes", "aiCitabilityNotes", "createdAt", "updatedAt"],
  contentEvidence: ["id", "opportunityId", "articleSlug", "claim", "source", "authors", "organization", "year", "url", "evidenceLevel", "sourceType", "createdAt"],
  contentOpportunities: ["id", "cluster", "title", "slug", "primaryQuery", "secondaryQueries", "searchIntent", "funnelStage", "contentType", "primaryEntity", "secondaryEntities", "relatedTestSlug", "opportunityLevel", "topicalImportance", "conversionProximity", "entityGap", "internalLinkValue", "evidenceAvailability", "differentiationPotential", "status", "createdAt", "updatedAt"],
  internalLinksGraph: ["id", "sourceSlug", "targetSlug", "anchorText", "linkType", "createdAt"],
  publicationGates: ["id", "articleSlug", "status", "checksJson", "reviewedByUserId", "reviewedAt", "createdAt", "updatedAt"],
  recommendations: ["id", "assessmentId", "title", "body", "actionLabel", "actionUrl", "minScore", "maxScore", "isActive", "createdAt", "updatedAt"],
  userProfiles: ["id", "userId", "displayName", "birthYear", "pronouns", "notificationEmail", "notificationCheckIn", "createdAt", "updatedAt"],
  users: ["id", "openId", "name", "email", "loginMethod", "role", "createdAt", "updatedAt", "lastSignedIn", "termsAcceptedAt"],
};

const sql = postgres(connectionUrl, { ssl: { rejectUnauthorized: false }, prepare: false, max: 1 });

try {
  const tableRows = await sql`
    select table_name
    from information_schema.tables
    where table_schema = 'public' and table_type = 'BASE TABLE'
    order by table_name
  `;
  const actualTables = tableRows.map(row => row.table_name);
  const expectedTables = Object.keys(expected).sort();
  const actualSet = new Set(actualTables);
  const expectedSet = new Set(expectedTables);
  const intersection = actualTables.filter(table => expectedSet.has(table));

  const columnRows = await sql`
    select table_name, column_name, data_type, is_nullable, column_default, ordinal_position
    from information_schema.columns
    where table_schema = 'public'
    order by table_name, ordinal_position
  `;
  const actualColumns = Object.groupBy(columnRows, row => row.table_name);
  const shared = Object.fromEntries(intersection.map(table => {
    const columns = (actualColumns[table] ?? []).map(row => row.column_name);
    return [table, {
      expectedColumns: expected[table],
      actualColumns: columns,
      identicalColumns: JSON.stringify(columns) === JSON.stringify(expected[table]),
      actualDefinition: actualColumns[table] ?? [],
    }];
  }));

  const report = {
    generatedAt: new Date().toISOString(),
    mode: "read-only",
    expectedTables,
    actualTables,
    expectedOnly: expectedTables.filter(table => !actualSet.has(table)),
    actualOnly: actualTables.filter(table => !expectedSet.has(table)),
    shared,
  };
  await writeFile("SUPA03_SCHEMA_COMPARISON.json", `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`SUPA-03 comparação: ${report.actualOnly.length} tabela(s) externa(s), ${intersection.length} colisão(ões), ${report.expectedOnly.length} tabela(s) canônica(s) ausente(s).`);
  for (const [table, details] of Object.entries(shared)) {
    console.log(`SUPA-03 colisão ${table}: ${details.identicalColumns ? "idêntica" : "NÃO idêntica"}.`);
  }
} finally {
  await sql.end({ timeout: 5 });
}
