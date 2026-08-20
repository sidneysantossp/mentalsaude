import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("SEO e analytics globais", () => {
  it("mantém a verificação do Google Search Console", () => {
    expect(indexHtml).toContain('<meta name="google-site-verification" content="217li2pM1Jlv1PEueo131CZS-FqfVKaRKTCUoqxMZRU" />');
  });

  it("carrega uma única inicialização do GA4 com o measurement ID informado", () => {
    expect((indexHtml.match(/googletagmanager\.com\/gtag\/js/g) ?? [])).toHaveLength(1);
    expect((indexHtml.match(/gtag\('config', 'G-ESJR38DZBW'\)/g) ?? [])).toHaveLength(1);
    expect(indexHtml).toContain("gtag('js', new Date());");
  });

  it("preserva o analytics Umami já configurado", () => {
    expect(indexHtml).toContain("%VITE_ANALYTICS_ENDPOINT%/umami");
    expect(indexHtml).toContain("%VITE_ANALYTICS_WEBSITE_ID%");
  });
});
