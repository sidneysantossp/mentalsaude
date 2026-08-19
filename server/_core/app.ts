import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";

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

    const articleSlugs = [
      "ansiedade-o-que-e-sintomas-causas",
      "depressao-sintomas-causas-tratamento",
      "tdah-em-adultos",
      "sintomas-de-depressao",
      "qual-profissional-procurar-depressao",
      "tratamento-depressao",
      "sintomas-de-tdah-em-adultos",
      "teste-de-tdah-online",
      "teste-de-depressao-online",
      "tdah-ou-procrastinacao",
      "estresse-no-trabalho-e-burnout"
    ];

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
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mental Saúde - Artigos e Guias de Saúde Mental</title>
    <link>${baseUrl}/conteudos</link>
    <description>Conteúdos baseados em evidências científicas sobre ansiedade, depressão, TDAH e bem-estar.</description>
    <language>pt-BR</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>Ansiedade: o que é, sintomas, causas e quando procurar ajuda</title>
      <link>${baseUrl}/conteudos/ansiedade-o-que-e-sintomas-causas</link>
      <description>Compreenda a diferença entre preocupação cotidiana e estados de ansiedade prolongados.</description>
      <pubDate>Mon, 10 Aug 2026 08:00:00 GMT</pubDate>
      <guid>${baseUrl}/conteudos/ansiedade-o-que-e-sintomas-causas</guid>
    </item>
    <item>
      <title>TDAH em adultos: sintomas, avaliação e tratamento</title>
      <link>${baseUrl}/conteudos/tdah-em-adultos</link>
      <description>Sinais sutis que frequentemente passam despercebidos na infância e como a autoobservação pode ajudar.</description>
      <pubDate>Sat, 08 Aug 2026 08:00:00 GMT</pubDate>
      <guid>${baseUrl}/conteudos/tdah-em-adultos</guid>
    </item>
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
