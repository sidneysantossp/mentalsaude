import postgres from "postgres";

const connectionUrl = process.env.DATABASE_MIGRATION_URL;
if (!connectionUrl) {
  throw new Error("DATABASE_MIGRATION_URL is required for SUPA-03 cleanup.");
}

const targetTables = [
  "activities", "agentRuns", "agents", "auditEvents", "decisions", "evidences", "executions", "findings",
  "integrations", "measurements", "organizationMembers", "organizations", "outcomes", "projectMemory", "projects",
  "recommendations", "tasks", "users",
].sort();

const sql = postgres(connectionUrl, { ssl: { rejectUnauthorized: false }, prepare: false, max: 1 });

try {
  const rows = await sql`
    select table_name
    from information_schema.tables
    where table_schema = 'public' and table_type = 'BASE TABLE'
    order by table_name
  `;
  const actual = rows.map(row => row.table_name).sort();
  if (JSON.stringify(actual) !== JSON.stringify(targetTables)) {
    throw new Error(`SUPA-03 cleanup refused: current table inventory differs from the audited snapshot (${actual.join(", ")}).`);
  }

  if (!process.argv.includes("--apply")) {
    console.log("SUPA-03 cleanup preflight passed. Re-run with --apply to execute the authorized transaction.");
    process.exitCode = 0;
  } else {
    await sql.begin(async transaction => {
      await transaction.unsafe(`DROP TABLE IF EXISTS ${targetTables.map(table => `"${table}"`).join(", ")} CASCADE`);
    });
    const remaining = await sql`
      select table_name
      from information_schema.tables
      where table_schema = 'public' and table_type = 'BASE TABLE'
      order by table_name
    `;
    if (remaining.length > 0) {
      throw new Error(`SUPA-03 cleanup incomplete: ${remaining.map(row => row.table_name).join(", ")}`);
    }
    console.log("SUPA-03 cleanup applied and verified: schema public has no base tables.");
  }
} finally {
  await sql.end({ timeout: 5 });
}
