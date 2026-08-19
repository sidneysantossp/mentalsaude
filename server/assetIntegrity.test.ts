import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

describe("integridade dos assets editoriais", () => {
  it("não mantém referências aos nomes antigos que retornavam imagens quebradas", () => {
    const source = `${read("client/src/data/articlesDatabase.ts")}\n${read("client/src/data/editorialMock.ts")}`;
    expect(source).not.toMatch(/editorial-(?:ansiedade|depressao|tdah|autocuidado|estresse|sono)_[a-z0-9]+\.png/);
    expect(source).toContain("editorial-depressao-2026-retry_518ee307.png");
    expect(source).toContain("editorial-tdah-2026-retry_f2b4efc6.png");
  });

  it("mantém fallback semântico e tratamento de erro no componente visual", () => {
    const component = read("client/src/components/EditorialImage.tsx");
    expect(component).toContain("role=\"img\"");
    expect(component).toContain("aria-label={alt}");
    expect(component).toContain("onError={() => setFailed(true)}");
  });

  it("preserva assets e endpoints SEO fora do rewrite da SPA", () => {
    const config = read("vercel.json");
    expect(config).toContain("manus-storage");
    expect(config).toContain("robots\\\\.txt");
    expect(config).toContain("/api/seo?type=sitemap");
    expect(config).toContain("/api/seo?type=feed");
  });
});
