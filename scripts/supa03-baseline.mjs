import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import postgres from "postgres";

const connectionUrl = process.env.DATABASE_MIGRATION_URL;
if (!connectionUrl) {
  throw new Error("DATABASE_MIGRATION_URL is required for SUPA-03 baseline operations.");
}

const apply = process.argv.includes("--apply");
const expectedTables = [
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

const sql = postgres(connectionUrl, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
  max: 1,
});

try {
  const existing = await sql`
    select table_name
    from information_schema.tables
    where table_schema = 'public' and table_type = 'BASE TABLE'
    order by table_name
  `;
  const existingNames = existing.map(row => row.table_name);
  console.log(`SUPA-03 preflight: ${existingNames.length} tabela(s) pública(s) existente(s).`);

  if (!apply) {
    if (existingNames.length > 0) {
      console.log(`SUPA-03 tabelas existentes: ${existingNames.join(", ")}`);
    }
    console.log("SUPA-03 preflight concluído. Nenhuma migration foi aplicada.");
    process.exitCode = 0;
  } else {
    if (existingNames.length > 0) {
      throw new Error("SUPA-03 baseline refused: the public schema is not empty.");
    }

    const migrationPath = resolve("drizzle/postgres/0000_abnormal_firelord.sql");
    const migrationSql = await readFile(migrationPath, "utf8");
    await sql.unsafe(migrationSql);

    const created = await sql`
      select table_name
      from information_schema.tables
      where table_schema = 'public' and table_type = 'BASE TABLE'
      order by table_name
    `;
    const createdNames = new Set(created.map(row => row.table_name));
    const missing = expectedTables.filter(table => !createdNames.has(table));
    if (missing.length > 0) {
      throw new Error(`SUPA-03 baseline incomplete: missing ${missing.join(", ")}`);
    }
    console.log(`SUPA-03 baseline applied and verified: ${createdNames.size} tabela(s) pública(s).`);
  }
} finally {
  await sql.end({ timeout: 5 });
}
