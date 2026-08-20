import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { ARTICLES_DATABASE } from "../../client/src/data/articlesDatabase";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" }[character] ?? character));

/**
 * Constrói o app Express sem iniciar uma porta. O mesmo app pode ser usado
 * pelo servidor local e como Vercel Function em `/api/*`.
 */
export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // Rota Sitemap XML para SEO e Google Notícias
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://www.mentalsaude.com.br";
    const staticPages = ["", "/conteudos", "/testes", "/metodologia", "/termos", "/privacidade"];
    
    const staticUrls = staticPages.map(path => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>`).join("");

    const articleSlugs = Object.keys(ARTICLES_DATABASE);

    const articleUrls = articleSlugs.map(slug => `
    <url>
      <loc>${baseUrl}/conteudos/${slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>`).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${articleUrls}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // Rota Feed RSS/Atom para Google Notícias e Leitores de RSS
  app.get("/feed.xml", (req, res) => {
    const baseUrl = "https://www.mentalsaude.com.br";
    const feedItems = Object.values(ARTICLES_DATABASE).map(article => {
      const articleUrl = `${baseUrl}/conteudos/${article.slug}`;
      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl}</link>
      <description>${escapeXml(article.seoDescription)}</description>
      <pubDate>Tue, 18 Aug 2026 08:00:00 GMT</pubDate>
      <guid>${articleUrl}</guid>
    </item>`;
    }).join("");

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mental Saúde - Artigos e Guias de Saúde Mental</title>
    <link>${baseUrl}/conteudos</link>
    <description>Conteúdos baseados em evidências científicas sobre saúde mental, autocuidado e caminhos de apoio.</description>
    <language>pt-BR</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />${feedItems}
  </channel>
</rss>`;

    res.header("Content-Type", "application/rss+xml");
    res.send(rss);
  });

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  return app;
}
