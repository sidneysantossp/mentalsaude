import { expect, test } from "vitest";
import postgres from "postgres";

test("SUPA-03: runtime PostgreSQL responde e permite auditar o schema sem escrita", async () => {
  const connectionUrl = process.env.POSTGRES_DATABASE_URL;
  expect(connectionUrl, "POSTGRES_DATABASE_URL deve estar configurada para o smoke test").toBeTruthy();

  const client = postgres(connectionUrl!, {
    ssl: { rejectUnauthorized: false },
    prepare: false,
    max: 1,
  });

  try {
    const health = await client<{ reachable: number }[]>`select 1::int as reachable`;
    expect(health[0]?.reachable).toBe(1);

    const tables = await client<{ table_name: string }[]>`
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name in ('users', 'assessments', 'assessmentQuestions', 'assessmentOptions')
      order by table_name
    `;

    expect(Array.isArray(tables)).toBe(true);
  } finally {
    await client.end({ timeout: 5 });
  }
});
