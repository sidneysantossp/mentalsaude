import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migrationScript = readFileSync(resolve(process.cwd(), "scripts/supa03-copy-canonical-data.mjs"), "utf8");

describe("SUPA-03 — guardrails da importação canônica", () => {
  it("importa somente entidades editoriais e de instrumentos, excluindo dados pessoais e clínicos individuais", () => {
    expect(migrationScript).toContain('const excludedTables = ["users", "userProfiles", "assessmentAttempts", "assessmentAnswers"]');
    expect(migrationScript).not.toContain('insert into "users"');
    expect(migrationScript).not.toContain('insert into "userProfiles"');
    expect(migrationScript).not.toContain('insert into "assessmentAttempts"');
    expect(migrationScript).not.toContain('insert into "assessmentAnswers"');
  });

  it("mantém a importação transacional, bloqueada em destino não vazio e compatível com o Transaction Pooler", () => {
    expect(migrationScript).toContain("prepare: false");
    expect(migrationScript).toContain('O destino SUPA-03 não está vazio para as entidades canônicas; a importação foi bloqueada.');
    expect(migrationScript).toContain("await target.begin(async sql => {");
  });
});
