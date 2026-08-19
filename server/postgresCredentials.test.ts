import { describe, expect, it } from "vitest";
import postgres from "postgres";

describe("PostgreSQL runtime credentials", () => {
  it("connects and executes a read-only health query without writing data", async () => {
    const connectionUrl = process.env.POSTGRES_DATABASE_URL;
    expect(connectionUrl, "POSTGRES_DATABASE_URL must be configured").toBeTruthy();

    const sql = postgres(connectionUrl!, {
      ssl: { rejectUnauthorized: false },
      prepare: false,
      max: 1,
    });

    try {
      const rows = await sql<{ ok: number }[]>`select 1::int as ok`;

      expect(rows).toHaveLength(1);
      expect(rows[0]?.ok).toBe(1);
    } finally {
      await sql.end({ timeout: 5 });
    }
  }, 15_000);
});
