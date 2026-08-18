import { expect, test } from "vitest";
import postgres from "postgres";

test("SUPA-03: a conexão exclusiva de migrations responde a uma consulta leve", async () => {
  const connectionUrl = process.env.DATABASE_MIGRATION_URL;
  expect(connectionUrl, "DATABASE_MIGRATION_URL deve estar configurada para aplicar a baseline").toBeTruthy();

  const client = postgres(connectionUrl!, {
    ssl: { rejectUnauthorized: false },
    prepare: false,
    max: 1,
  });

  try {
    const rows = await client<{ reachable: number }[]>`select 1 as reachable`;
    expect(rows[0]?.reachable).toBe(1);
  } finally {
    await client.end({ timeout: 5 });
  }
});
