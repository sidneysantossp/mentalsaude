import { OAUTH_STATE_COOKIE, encodeOAuthState } from "@shared/const";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export type OAuthLoginConfig = {
  oauthPortalUrl: string | undefined;
  appId: string | undefined;
};

export function getOAuthLoginConfigurationError({ oauthPortalUrl, appId }: OAuthLoginConfig): string | null {
  if (!oauthPortalUrl || !appId) {
    return "O acesso autenticado não está disponível neste ambiente de revisão.";
  }

  try {
    new URL(oauthPortalUrl);
  } catch {
    return "O acesso autenticado não está disponível neste ambiente de revisão.";
  }

  return null;
}

export function createOAuthLoginUrl({
  oauthPortalUrl,
  appId,
  redirectUri,
  state,
}: OAuthLoginConfig & { redirectUri: string; state: string }): string | null {
  if (getOAuthLoginConfigurationError({ oauthPortalUrl, appId })) return null;

  const url = new URL("/app-auth", oauthPortalUrl);
  url.searchParams.set("appId", appId!);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");
  return url.toString();
}

// Start the Manus OAuth login. Call this from an event handler or effect at the
// moment you want to navigate, e.g. `onClick={() => startLogin()}`.
//
// It has SIDE EFFECTS — it mints a one-time nonce, writes the __Host- state
// cookie, and navigates immediately — so the cookie nonce always matches the
// `state` it sends. Do NOT call it during render (no `href={startLogin()}` /
// `loginUrl={...}`): each call overwrites the cookie, so a stray render-phase
// call would desync it from an in-flight login and the callback would reject it
// with "invalid oauth state". It returns void by design, so there is no URL to
// stash across renders.
export const startLogin = (): boolean => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;

  const configurationError = getOAuthLoginConfigurationError({ oauthPortalUrl, appId });
  if (configurationError) {
    console.warn("[OAuth] Login is unavailable because Preview OAuth configuration is incomplete.");
    return false;
  }

  const nonce = crypto.randomUUID();
  document.cookie = `${OAUTH_STATE_COOKIE}=${nonce}; Path=/; Max-Age=600; SameSite=None; Secure`;
  const state = encodeOAuthState({ redirectUri, nonce });
  const url = createOAuthLoginUrl({ oauthPortalUrl, appId, redirectUri, state });
  if (!url) return false;

  window.location.href = url;
  return true;
};
