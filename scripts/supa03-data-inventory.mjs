import postgres from "postgres";

const connectionString = process.env.POSTGRES_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("POSTGRES_DATABASE_URL ou DATABASE_URL é obrigatória para o inventário SUPA-03.");
}

const tables = [
  "articleVersions",
  "assessmentAnswers",
  "assessmentAttempts",
  "assessmentOptions",
  "assessmentQuestions",
  "assessments",
  "contentBriefs",
  "contentEvidence",
  "contentOpportunities",
  "internalLinksGraph",
  "publicationGates",
  "recommendations",
  "userProfiles",
  "users",
];

const sql = postgres(connectionString, { prepare: false, max: 1 });

try {
  const rowCounts = {};
  for (const table of tables) {
    const [{ count }] = await sql.unsafe(`select count(*)::int as count from "${table}"`);
    rowCounts[table] = count;
  }

  console.log(JSON.stringify({ tableCount: tables.length, rowCounts }, null, 2));
} finally {
  await sql.end({ timeout: 5 });
}
