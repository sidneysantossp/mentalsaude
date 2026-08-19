# Auditoria de estabilidade — 19/08/2026

## Evidências confirmadas

1. A página de `/testes` responde HTTP 200, mas o catálogo chega vazio porque `trpc.assessments.listPublished` chama `db.listPublishedAssessments()` e a consulta PostgreSQL falha antes de retornar dados.
2. O log do servidor registra `PostgresError: password authentication failed for user "postgres"` com código `28P01`, no host do Supabase Pooler `aws-0-us-west-2.pooler.supabase.com:6543`.
3. A conexão ativa usa `POSTGRES_DATABASE_URL`/`DATABASE_MIGRATION_URL` com usuário `postgres.kganjrbdfpeapcjcxjfp`; a senha atualmente injetada está inválida, expirada ou foi armazenada com encoding incorreto. O código não deve mascarar o erro com dados clínicos fictícios.
4. Os artigos usam caminhos `/manus-storage/editorial-*.png`, mas não existem arquivos correspondentes em `/home/ubuntu/webdev-static-assets/`.
5. Em produção, as URLs de imagem retornam HTTP 200 com `content-type: text/html` e corpo iniciado por `<!doctype html>`, portanto o status 200 é apenas o fallback da SPA, não uma imagem válida.
6. Em produção, `/sitemap.xml` e `/robots.txt` também retornam o mesmo HTML da SPA, indicando que o rewrite global em `vercel.json` captura arquivos estáticos e endpoints SEO antes de servi-los.
7. O projeto local `.vercel/project.json` aponta para `mental-saude-platform`, mas a conta Vercel acessível pelo conector lista apenas o projeto `auditseo-site-oficial`, com domínios `auditseo.com.br`; o deployment ligado ao domínio Mental Saúde precisa ser reconciliado antes de considerar o go-live validado.
8. `ArticlePage.tsx` renderiza `<img src={article.image}>` sem fallback visual nem tratamento de erro, e `editorialMock.ts` repete caminhos `/manus-storage` inconsistentes para cards e artigos.

## Próximas correções técnicas

- Corrigir/atualizar o segredo PostgreSQL válido no ambiente local e de produção, sem expor a senha.
- Ajustar os rewrites da Vercel para não capturar assets, `sitemap.xml`, `feed.xml`, `robots.txt` e `llms.txt`.
- Publicar assets editoriais válidos e atualizar os registros para URLs persistentes.
- Adicionar fallback acessível para imagens e erro de carregamento.
- Cobrir o catálogo vazio, assets e rotas SEO com testes automatizados e validação HTTP/visual.
- Revalidar o projeto Vercel correto e os domínios antes do próximo checkpoint.

## Escopo de usabilidade

A validação incluirá catálogo com carregamento, erro e estado vazio; navegação entre Home, Testes e Conteúdos; abertura de artigo e CTA; filtros; favoritos; responsividade desktop/mobile; overflow horizontal; foco por teclado; contraste; legibilidade; links quebrados; e integridade de rotas SEO.

## Nota de segurança

Nenhum score, resposta, dado clínico ou PII será coletado nos eventos de auditoria. Nenhum teste será fabricado ou injetado como dado falso para mascarar indisponibilidade do banco.

## Referências técnicas

- `server/db-postgres.ts`
- `server/routers.ts`
- `client/src/pages/TestCatalog.tsx`
- `client/src/pages/ArticlePage.tsx`
- `client/src/data/articlesDatabase.ts`
- `client/src/data/editorialMock.ts`
- `vercel.json`
- `.manus-logs/devserver.log`

## Status

**Diagnóstico confirmado; implementação aguardando a correção segura do segredo PostgreSQL e a publicação dos assets válidos.**

