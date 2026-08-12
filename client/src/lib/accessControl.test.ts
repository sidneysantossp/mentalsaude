import { describe, expect, it } from "vitest";
import { mustRedirectNonAdmin } from "./accessControl";

describe("mustRedirectNonAdmin", () => {
  it("redireciona uma conta comum quando a rota exige papel administrativo", () => {
    expect(mustRedirectNonAdmin(true, "user")).toBe(true);
  });

  it("permite rota administrativa para administradores e rotas comuns para qualquer conta", () => {
    expect(mustRedirectNonAdmin(true, "admin")).toBe(false);
    expect(mustRedirectNonAdmin(false, "user")).toBe(false);
  });
});
