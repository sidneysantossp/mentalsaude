import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { isAssessmentFlow, isRouteActive } from "./MobileBottomNav";

describe("MobileBottomNav navigation contract", () => {
  it("marks exact root routes without activating nested sections", () => {
    expect(isRouteActive("/", "/")).toBe(true);
    expect(isRouteActive("/conteudos", "/")).toBe(false);
    expect(isRouteActive("/dashboard", "/dashboard")).toBe(true);
    expect(isRouteActive("/meus-testes", "/dashboard")).toBe(false);
  });

  it("keeps nested test and content routes active", () => {
    expect(isRouteActive("/testes/gad-7", "/testes")).toBe(true);
    expect(isRouteActive("/conteudos/ansiedade-o-que-e", "/conteudos")).toBe(true);
    expect(isRouteActive("/perfil/preferencias", "/perfil")).toBe(true);
  });

  it("exposes an accessible navigation contract for keyboard and assistive technology", () => {
    const source = readFileSync(new URL("./MobileBottomNav.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
    expect(source).toContain('aria-label="Navegação mobile"');
    expect(source).toContain('aria-current={active ? "page" : undefined}');
    expect(source).toContain("focus-visible:ring-2");
    expect(source).toContain("min-h-[4.35rem]");
    expect(styles).toContain("min-height: 44px");
  });

  it("preserves the app-like visual treatment on the mobile bottom bar", () => {
    const source = readFileSync(new URL("./MobileBottomNav.tsx", import.meta.url), "utf8");
    expect(source).toContain("rounded-[1.75rem]");
    expect(source).toContain("backdrop-blur-2xl");
    expect(source).toContain("bg-[#fcfcf8]/78");
    expect(source).toContain("env(safe-area-inset-bottom)");
  });

  it("hides the persistent navigation while a user is answering an assessment", () => {
    expect(isAssessmentFlow("/avaliacao/12")).toBe(true);
    expect(isAssessmentFlow("/avaliacao/12/resultado/9")).toBe(true);
    expect(isAssessmentFlow("/testes/gad-7")).toBe(false);
    expect(isAssessmentFlow("/dashboard")).toBe(false);
  });
});
