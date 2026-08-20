import { EDITORIAL_SLUGS } from "../shared/editorialSlugs.js";

const BASE_URL = "https://www.mentalsaude.com.br";

const STATIC_PAGES = ["", "/conteudos", "/testes", "/metodologia", "/termos", "/privacidade"];

function sitemap() {
  const staticUrls = STATIC_PAGES.map(path => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>`).join("");
  const articleUrls = EDITORIAL_SLUGS.map(slug => `
    <url>
      <loc>${BASE_URL}/conteudos/${slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${articleUrls}
</urlset>`;
}

function feed() {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mental Saúde - Artigos e Guias de Saúde Mental</title>
    <link>${BASE_URL}/conteudos</link>
    <description>Conteúdos baseados em evidências científicas sobre ansiedade, depressão, TDAH e bem-estar.</description>
    <language>pt-BR</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>Ansiedade: o que é, sintomas, causas e quando procurar ajuda</title>
      <link>${BASE_URL}/conteudos/ansiedade-o-que-e-sintomas-causas</link>
      <description>Compreenda a diferença entre preocupação cotidiana e estados de ansiedade prolongados.</description>
      <pubDate>Mon, 10 Aug 2026 08:00:00 GMT</pubDate>
      <guid>${BASE_URL}/conteudos/ansiedade-o-que-e-sintomas-causas</guid>
    </item>
    <item>
      <title>TDAH em adultos: sintomas, avaliação e tratamento</title>
      <link>${BASE_URL}/conteudos/tdah-em-adultos</link>
      <description>Sinais sutis que frequentemente passam despercebidos na infância e como a autoobservação pode ajudar.</description>
      <pubDate>Sat, 08 Aug 2026 08:00:00 GMT</pubDate>
      <guid>${BASE_URL}/conteudos/tdah-em-adultos</guid>
    </item>
  </channel>
</rss>`;
}

export default function handler(req, res) {
  const type = req.query?.type;
  const body = type === "feed" ? feed() : sitemap();
  res.statusCode = 200;
  res.setHeader("Content-Type", type === "feed" ? "application/rss+xml; charset=utf-8" : "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.end(body);
}
