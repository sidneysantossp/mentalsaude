import { randomUUID } from "node:crypto";
import { expect, test } from "vitest";
import postgres from "postgres";

test("SUPA-03: runtime PostgreSQL lê e grava dentro de transação revertida", async () => {
  const connectionUrl = process.env.POSTGRES_DATABASE_URL;
  expect(connectionUrl, "POSTGRES_DATABASE_URL deve estar configurada para o smoke test").toBeTruthy();

  const client = postgres(connectionUrl!, {
    ssl: { rejectUnauthorized: false },
    prepare: false,
    max: 1,
  });
  const openId = `supa03-smoke-${randomUUID()}`;

  await client.unsafe("BEGIN");
  try {
    const users = await client<{ id: number; openId: string }[]>`
      insert into "users" ("openId") values (${openId}) returning "id", "openId"
    `;
    expect(users[0]?.openId).toBe(openId);

    await client`
      insert into "userProfiles" ("userId", "displayName")
      values (${users[0]!.id}, ${"SUPA-03 smoke"})
    `;
    const profiles = await client<{ displayName: string | null }[]>`
      select "displayName" from "userProfiles" where "userId" = ${users[0]!.id}
    `;
    expect(profiles[0]?.displayName).toBe("SUPA-03 smoke");
  } finally {
    await client.unsafe("ROLLBACK");
    await client.end({ timeout: 5 });
  }
});
