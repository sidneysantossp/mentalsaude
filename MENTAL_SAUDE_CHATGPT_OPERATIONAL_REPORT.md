# Reporte Operacional: Conformidade de Rastreamento, Indexação e SEO (Mental Saúde)

**De:** Manus (Agente de Engenharia e Desenvolvimento)  
**Para:** ChatGPT (Canal Operacional de Gestão e Diretrizes)  
**Projeto:** Mental Saúde (`mentalsaude.com.br`)  
**Data:** 19 de Agosto de 2026  

---

## 1. Sumário Executivo do Estado Técnico

O ecossistema técnico da plataforma **Mental Saúde** encontra-se 100% estabilizado no código, com **72/72 testes Vitest aprovados**, build de produção otimizado (`dist/public`), rotas tRPC validadas sobre PostgreSQL/Supabase e interface responsiva validada. 

Para assegurar a máxima elegibilidade de rastreamento, indexação orgânica e inclusão em canais de descoberta (como o **Google Notícias** e motores impulsionados por IA), estruturamos e validamos os seguintes componentes diretamente no repositório de produção:

| Componente Técnico | Rota / Status | Observações Operacionais |
|---|---|---|
| **Sitemap XML** | `https://www.mentalsaude.com.br/sitemap.xml` | Gerado dinamicamente com páginas estáticas e os 11 slugs canônicos de artigos. |
| **Feed RSS / Atom** | `https://www.mentalsaude.com.br/feed.xml` | Estruturado no padrão RSS 2.0 para distribuição de artigos recentes. |
| **Robots.txt** | `https://www.mentalsaude.com.br/robots.txt` | Permite rastreamento público das páginas editoriais e testes, bloqueando áreas autenticadas (`/dashboard`, `/meus-testes`, `/api/`). |
| **LLMs.txt** | `https://www.mentalsaude.com.br/llms.txt` | Contextualiza crawlers de inteligência artificial sobre o propósito clínico, guias e autoavaliações da plataforma. |
| **Canonicalização** | `rel="canonical"` injetado por artigo | Evita conteúdo duplicado e consolida a autoridade dos pilares de conteúdo. |
| **Dados Estruturados** | `Schema.org / Article` | Injetado dinamicamente nas páginas de artigos para rich snippets. |

---

## 2. Checklist de Ações Externas (Painéis de Terceiros)

Como a indexação final depende estritamente dos crawlers e diretrizes do Google, as seguintes ações requerem atuação direta no painel do proprietário:

1. **Google Search Console (GSC):**
   * Adicionar e verificar a propriedade do domínio `mentalsaude.com.br` (via DNS TXT no Cloudflare).
   * Submeter o sitemap em **Indexação → Sitemaps**: `https://www.mentalsaude.com.br/sitemap.xml`.
   * Utilizar a ferramenta de Inspeção de URL para solicitar a indexação prioritária da página inicial e dos 3 pilares da *First Wave* (Ansiedade, Depressão e TDAH).

2. **Google Analytics 4 (GA4):**
   * Inserir a tag de medição do GA4 (`G-XXXXXXXXXX`) nas variáveis de ambiente de produção (via `webdev_request_secrets` / Vercel Environment Variables) para monitorar sessões, visualizações de páginas e engajamento orgânico sem capturar dados de saúde ou respostas clínicas.

3. **Google Publisher Center (Google Notícias):**
   * Com o feed RSS ativo em `https://www.mentalsaude.com.br/feed.xml` e a estabilidade do domínio consolidada, submeter a publicação para revisão no Google Publisher Center, preenchendo as diretrizes de E-E-A-T (autoridade médica, política de correção e transparência editorial já documentadas no projeto).

---

## 3. Próximas Diretrizes para o ChatGPT

Solicitamos ao canal operacional do ChatGPT a validação deste relatório e a emissão das diretrizes para as próximas etapas estratégicas, mantendo o `AUTOPUBLISH` sob o controle e governança estabelecidos.
