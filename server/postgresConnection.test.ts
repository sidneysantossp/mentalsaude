import { expect, test } from "vitest";
import postgres from "postgres";

test("SUPA-03: a conexão PostgreSQL controlada responde a uma consulta sem prepared statements", async () => {
  const connectionUrl = process.env.POSTGRES_DATABASE_URL;
  expect(connectionUrl, "POSTGRES_DATABASE_URL deve estar configurada para a validação SUPA-03").toBeTruthy();

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
