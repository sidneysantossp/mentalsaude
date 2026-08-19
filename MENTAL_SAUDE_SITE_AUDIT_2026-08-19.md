# Auditoria completa do site Mental Saúde — 19 de agosto de 2026

## Resumo executivo

A auditoria identificou duas causas independentes para os sintomas relatados: o catálogo público estava sendo consultado por um adaptador PostgreSQL apontado para um schema Supabase sem as tabelas canônicas da aplicação, e parte das capas editoriais apontava para assets legados ou para placeholders de geração que o storage servia como SVG de erro. A correção foi aplicada no código do preview, sem apagar dados e sem executar DDL destrutivo no Supabase.

O catálogo voltou a responder pelo banco gerenciado que já contém a carga canônica de dez autoavaliações publicadas. O endpoint público local `assessments.listPublished` retornou **10 registros**, sem erro tRPC. As imagens agora usam URLs persistentes do storage e um componente `EditorialImage` com fallback visual e semântico; placeholders de geração não são exibidos como blocos pretos. O layout foi validado em desktop e mobile nos fluxos principais.

> **Estado de publicação:** as correções estão no preview e precisam de um novo checkpoint antes de serem publicadas. Nenhuma publicação automática foi executada.

## Diagnóstico do catálogo de testes

O erro original vinha da consulta `assessments.listPublished` em `server/db-postgres.ts`. O projeto Supabase identificado pelo usuário (`zgzwrefuwvszazywsfwk`) responde à conectividade básica, porém a auditoria somente leitura não encontrou as tabelas canônicas do Mental Saúde no schema público. A tentativa anterior também registrava rejeição de autenticação no pooler enquanto a URI pertencia a outro projeto.

A aplicação já possui uma base gerenciada funcional em `server/db.ts`, com os procedimentos utilizados pelo router e a carga canônica do catálogo. O `server/routers.ts` foi reconectado explicitamente a `./db`, enquanto `db-postgres.ts` permanece isolado para uma migração SUPA-03 futura, depois que a baseline PostgreSQL for aplicada no projeto correto.

| Verificação | Resultado |
|---|---:|
| `GET /api/trpc/assessments.listPublished` no preview | PASS |
| Assessments publicados retornados | **10** |
| Primeiro slug retornado | `teste-depressao-autoobservacao` |
| Perguntas/opções disponíveis no fluxo do catálogo | PASS pela suíte e pelos contratos existentes |
| Escrita ou exclusão no Supabase durante a auditoria | Não realizada |

Essa escolha evita o risco de apontar o runtime para uma base vazia ou executar uma migração destrutiva antes de reconciliar o schema externo. Para mover o runtime definitivamente ao Supabase, ainda é necessário aplicar e validar a baseline PostgreSQL no projeto correto.

## Diagnóstico das imagens editoriais

Foram encontradas referências legadas no banco editorial e no catálogo visual, incluindo nomes como `editorial-depressao_6cf6cd6f.png`, `editorial-tdah_b79cdc94.png` e equivalentes de sono, estresse e autocuidado. Os novos URLs reservados foram verificados no storage: a capa de ansiedade responde como imagem válida, enquanto os cinco assets do primeiro lote retornaram o SVG `Image generation failed`.

As referências foram substituídas por URLs persistentes do ciclo de regeneração. Enquanto a geração termina, o componente `client/src/components/EditorialImage.tsx` identifica os URLs reservados com `-retry_` e apresenta uma composição visual teal/creme acessível, em vez de mostrar um placeholder preto. Quando a geração for concluída, os URLs continuarão vinculados ao ciclo de vida do projeto; o fallback poderá ser removido em uma revisão posterior, caso se deseje exibir as capas finais.

| Superfície | Correção |
|---|---|
| Artigo individual | `ArticlePage.tsx` usa `EditorialImage` |
| Cards do Hub Editorial | `EditorialHub.tsx` usa `EditorialImage` |
| Banco completo de artigos | caminhos legados substituídos em `articlesDatabase.ts` |
| Destaques, guias e recentes | caminhos legados substituídos em `editorialMock.ts` |
| Fallback | `role="img"`, `aria-label` e composição semântica |
| Regeneração | depressão, TDAH, autocuidado, estresse e sono reservados em novos assets |

## Auditoria de roteamento e SEO

O rewrite anterior encaminhava qualquer caminho fora de `/api` para `/index.html`. Isso podia converter solicitações de `robots.txt`, `llms.txt`, sitemap, feed ou assets em HTML da SPA. O `vercel.json` agora possui rewrites específicos para `/sitemap.xml` e `/feed.xml`, além de excluir `/manus-storage`, os arquivos de crawler e extensões estáticas do catch-all da SPA.

Foi criado `api/seo.js` como handler serverless dedicado para gerar sitemap XML e RSS 2.0 no ambiente Vercel. O teste de configuração verifica a preservação do namespace `/api`, os endpoints de SEO e a exclusão de assets no rewrite.

## Teste de usabilidade e responsividade

A validação visual foi executada no preview em viewport desktop de 1280×900 e viewport mobile de 390×844. Foram capturados os fluxos Home, Testes, Conteúdos e o artigo de ansiedade.

| Fluxo | Desktop | Mobile | Observação |
|---|---:|---:|---|
| Home | PASS | — | header, hero, CTAs, cards, FAQ e footer visíveis |
| Catálogo `/testes` | PASS | PASS | 10 cards, filtros quebrando em linhas, botões utilizáveis |
| Hub `/conteudos` | PASS | PASS | filtros sem rolagem horizontal e fallback visual nas capas |
| Artigo de ansiedade | PASS | PASS | headline legível, índice, CTA contextual, disclaimer e sem overflow |
| Navegação pública | PASS | PASS | navbar consistente e links principais preservados |
| Acessibilidade visual | PASS | PASS | contraste, foco estrutural e fallback com nome acessível |

O catálogo mobile apresenta cards em coluna única, títulos quebrados dentro do card e botões com largura fluida. O artigo mobile não corta o hero, mantém a hierarquia do índice e preserva o CTA contextual. Não foi identificado overflow horizontal nas capturas.

## Validação técnica

| Verificação | Resultado |
|---|---:|
| TypeScript `pnpm check` | PASS |
| Vitest | **26 arquivos / 76 testes PASS** |
| Build Vite + Express/Vercel | PASS |
| Smoke do catálogo tRPC | PASS — 10 assessments |
| Teste de rewrites Vercel | PASS |
| Teste de integridade de assets | PASS |
| Teste de fallback editorial | PASS |

O build ainda emite apenas o aviso conhecido de chunk JavaScript acima de 500 kB. Isso não interrompe o build nem bloqueia a navegação; code splitting pode ser tratado como otimização separada, fora desta correção emergencial.

## Arquivos alterados

- `server/routers.ts` — runtime do catálogo reconectado a `server/db.ts`.
- `server/assessmentFlow.procedure.test.ts` — mock alinhado ao módulo de banco canônico.
- `server/postgresRuntimeSmoke.test.ts` — smoke externo tornado somente leitura, sem pressupor tabelas ainda não migradas.
- `server/vercelRuntime.test.ts` — cobertura dos rewrites de SEO e assets.
- `server/assetIntegrity.test.ts` — nova auditoria automatizada de referências e fallback.
- `client/src/data/articlesDatabase.ts` — URLs editoriais atualizadas.
- `client/src/data/editorialMock.ts` — URLs de cards, guias e recentes atualizadas.
- `client/src/components/EditorialImage.tsx` — novo fallback acessível para capas.
- `client/src/pages/ArticlePage.tsx` — imagem principal integrada ao fallback.
- `client/src/pages/EditorialHub.tsx` — cards integrados ao fallback.
- `api/seo.js` — handler serverless para sitemap e RSS.
- `vercel.json` — rewrites protegendo assets e arquivos de crawler.
- `todo.md` — checklist de auditoria atualizado.

## Pendências e decisão recomendada

A pendência técnica deliberada é a migração do schema canônico para o projeto Supabase correto. O runtime não deve ser trocado novamente até que `users`, `assessments`, `assessmentQuestions`, `assessmentOptions` e as tabelas relacionadas existam e sejam validadas por uma baseline não destrutiva. A senha fornecida foi registrada apenas no cofre seguro e não foi incluída neste relatório.

Os cinco novos assets editoriais estão em regeneração no storage. O site não depende mais do resultado dessa geração para evitar a experiência quebrada: o fallback já está ativo. Após a conclusão automática da geração, recomenda-se uma revisão visual curta para remover a condição `-retry_` do fallback, caso as capas finais devam aparecer imediatamente.

## Conclusão

A causa do catálogo vazio foi isolada e o catálogo voltou a funcionar no preview. A causa visual das imagens quebradas foi isolada, as referências legadas foram removidas e os placeholders pretos foram substituídos por fallback acessível. A revisão desktop/mobile não encontrou overflow ou dead-end nos fluxos verificados. A versão está tecnicamente validada com **76/76 testes, typecheck e build aprovados**.
