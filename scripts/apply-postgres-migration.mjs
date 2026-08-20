import fs from "node:fs/promises";
import postgres from "postgres";

const connectionUrl = process.env.POSTGRES_DATABASE_URL;
if (!connectionUrl) throw new Error("POSTGRES_DATABASE_URL is required");

const migration = await fs.readFile(new URL("../drizzle/postgres/0000_abnormal_firelord.sql", import.meta.url), "utf8");
const statements = migration
  .split(/--> statement-breakpoint/g)
  .map(statement => statement.trim())
  .filter(Boolean);

const sql = postgres(connectionUrl, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
  max: 1,
});

try {
  for (const statement of statements) {
    await sql.unsafe(statement);
  }
  const rows = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
  console.log(JSON.stringify({ appliedStatements: statements.length, publicTables: rows.map(row => row.table_name) }));
} finally {
  await sql.end({ timeout: 5 });
}
