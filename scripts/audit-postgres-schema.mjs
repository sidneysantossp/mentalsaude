import postgres from "postgres";

const connectionUrl = process.env.POSTGRES_DATABASE_URL;
if (!connectionUrl) throw new Error("POSTGRES_DATABASE_URL is not configured");

const sql = postgres(connectionUrl, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
  max: 1,
});

try {
  const [runtime] = await sql`
    select current_database() as database_name,
           current_schema() as current_schema,
           current_setting('search_path') as search_path
  `;
  const assessmentTables = await sql`
    select table_schema, table_name
    from information_schema.tables
    where table_name in ('assessments', 'assessmentQuestions', 'assessmentOptions', 'users', 'userProfiles', 'assessmentAttempts', 'assessmentAnswers')
    order by table_schema, table_name
  `;
  const published = [];
  for (const table of assessmentTables.filter(row => row.table_name === "assessments")) {
    const identifier = sql(table.table_schema);
    const tableName = sql(table.table_name);
    const rows = await sql`
      select count(*)::int as count
      from ${identifier}.${tableName}
      where "status" = 'publicado'
    `;
    published.push({ schema: table.table_schema, count: rows[0]?.count ?? 0 });
  }

  console.log(JSON.stringify({ runtime, assessmentTables, published }, null, 2));
} finally {
  await sql.end({ timeout: 5 });
}
