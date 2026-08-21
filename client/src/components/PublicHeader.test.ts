import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getPublicNavHref, isPublicNavActive, PUBLIC_NAV_ITEMS } from "./PublicHeader";

describe("PublicHeader navigation contract", () => {
  it("keeps the institutional menu labels in the Home order", () => {
    expect(PUBLIC_NAV_ITEMS.map(item => item.label)).toEqual([
      "Como funciona",
      "Testes",
      "Conteúdos",
      "Privacidade",
    ]);
  });

  it("keeps crawlable destinations for the route-based items", () => {
    expect(getPublicNavHref("tests", false)).toBe("/testes");
    expect(getPublicNavHref("content", false)).toBe("/conteudos");
    expect(getPublicNavHref("privacy", false)).toBe("/privacidade");
  });

  it("resolves contextual links from Home and other public routes", () => {
    expect(getPublicNavHref("how-it-works", true)).toBe("#como-funciona");
    expect(getPublicNavHref("privacy", true)).toBe("#seguranca");
    expect(getPublicNavHref("how-it-works", false)).toBe("/#como-funciona");
  });

  it("keeps the mobile menu as an accessible off-canvas dialog", () => {
    const source = readFileSync(new URL("./PublicHeader.tsx", import.meta.url), "utf8");
    expect(source).toContain('role="dialog"');
    expect(source).toContain('aria-modal="true"');
    expect(source).toContain('aria-controls="public-mobile-menu"');
    expect(source).toContain("-translate-x-full");
    expect(source).toContain("translate-x-0");
    expect(source).toContain('aria-label="Fechar menu"');
    expect(source).toContain("Escape");
  });

  it("marks the active section consistently across nested public routes", () => {
    expect(isPublicNavActive("content", "/conteudos/ansiedade-o-que-e-sintomas-causas")).toBe(true);
    expect(isPublicNavActive("tests", "/testes/gad-7")).toBe(true);
    expect(isPublicNavActive("privacy", "/privacidade")).toBe(true);
    expect(isPublicNavActive("how-it-works", "/metodologia")).toBe(false);
  });
});
