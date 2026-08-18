import { describe, expect, it } from "vitest";
import { createOAuthLoginUrl, getOAuthLoginConfigurationError } from "./const";

describe("OAuth Preview configuration", () => {
  it("falha de forma controlada quando a URL do portal está ausente ou inválida", () => {
    expect(getOAuthLoginConfigurationError({ oauthPortalUrl: undefined, appId: "app-id" })).toContain("não está disponível");
    expect(getOAuthLoginConfigurationError({ oauthPortalUrl: "not-a-url", appId: "app-id" })).toContain("não está disponível");
    expect(
      createOAuthLoginUrl({
        oauthPortalUrl: undefined,
        appId: "app-id",
        redirectUri: "https://preview.example/api/oauth/callback",
        state: "nonce",
      }),
    ).toBeNull();
  });

  it("constrói a URL de login sem alterar a origem de callback", () => {
    const loginUrl = createOAuthLoginUrl({
      oauthPortalUrl: "https://auth.example/",
      appId: "app-id",
      redirectUri: "https://preview.example/api/oauth/callback",
      state: "signed-state",
    });

    expect(loginUrl).toBe("https://auth.example/app-auth?appId=app-id&redirectUri=https%3A%2F%2Fpreview.example%2Fapi%2Foauth%2Fcallback&state=signed-state&type=signIn");
  });
});
