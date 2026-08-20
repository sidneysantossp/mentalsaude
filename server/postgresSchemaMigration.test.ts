import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migrationPath = resolve(process.cwd(), "drizzle/postgres/0000_abnormal_firelord.sql");
const migration = readFileSync(migrationPath, "utf8");

describe("PostgreSQL runtime schema", () => {
  it("contains the users relation required by the OAuth callback", () => {
    expect(migration).toContain('CREATE TABLE "users"');
    expect(migration).toContain('CONSTRAINT "users_openId_unique" UNIQUE("openId")');
  });

  it("contains the assessment relations required by the dashboard", () => {
    expect(migration).toContain('CREATE TABLE "assessments"');
    expect(migration).toContain('CREATE TABLE "assessmentAttempts"');
    expect(migration).toContain('CREATE TABLE "assessmentAnswers"');
  });
});
