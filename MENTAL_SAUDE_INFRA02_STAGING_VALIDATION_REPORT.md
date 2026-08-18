# Mental Saúde — INFRA-02: Validação do Staging Vercel

**Autor:** Manus AI
**Data:** 18 de agosto de 2026
**Decisão:** **STAGING_READY_FOR_HUMAN_REVIEW**

## Síntese executiva

O ambiente Vercel de staging da Mental Saúde foi validado com o runtime PostgreSQL/Supabase ativo. A branch `infra/vercel-staging-preview` permanece segregada no ambiente **Preview**, enquanto `main` é a única branch de Production. Nenhuma promoção, alteração de domínio de produção ou publicação pública foi executada.

O Preview mais recente foi gerado a partir do commit `73578f6` e validado pela URL técnica abaixo. A aplicação renderizou as rotas públicas, e o endpoint tRPC retornou o catálogo canônico de instrumentos diretamente do PostgreSQL via Transaction Pooler.

| Item | Resultado | Evidência |
|---|---:|---|
| Ambiente Vercel | PASS | Deployment mais recente marcado como **Preview**. |
| Código de staging | PASS | Branch `infra/vercel-staging-preview`, commit `73578f6`. |
| Frontend Vite | PASS | Homepage, `/testes` e `/conteudos` renderizaram no Preview. |
| Função API | PASS | Função catch-all `/api/[...path]` emitida como Node.js. |
| Roteamento tRPC | PASS | `/api/trpc/assessments.listPublished` respondeu com resultado válido. |
| PostgreSQL/Supabase | PASS | Catálogo de 10 instrumentos publicados retornado pelo Preview. |
| Produção | NÃO ALTERADA | Nenhum deployment foi promovido ou publicado. |

## Correções de infraestrutura consolidadas

O Preview inicial servia a interface estática, mas o namespace `/api/*` não chegava à função serverless. A configuração `vercel.json` passou a encaminhar explicitamente `/api/:path*` para `/api/[...path]`, preservando o fallback SPA somente para rotas não-API. A primeira emissão da função revelou que o runtime Node.js não localizava o módulo TypeScript interno; o build agora empacota `server/_core/app.ts` em `api/app.js`, e o handler JavaScript importa esse bundle local.

| Camada | Implementação validada |
|---|---|
| SPA | `dist/public` servido pelo Vite com fallback para `/index.html`. |
| API | `api/[...path].js` exporta o aplicativo Express para a Vercel Function. |
| Bundle interno | `pnpm build` gera `api/app.js`; o artefato é ignorado pelo Git. |
| tRPC | Prefixo `/api/trpc` montado pelo mesmo aplicativo Express. |
| Banco | `DATABASE_URL` existe somente no escopo **Preview** e aponta para o Transaction Pooler PostgreSQL guardado no cofre. |

## Smoke tests externos

| Superfície | URL testada | Resultado |
|---|---|---:|
| Homepage | `/` | PASS |
| Catálogo público | `/testes` | PASS — os 10 instrumentos publicados renderizaram. |
| Hub editorial | `/conteudos` | PASS — interface, busca e filtros renderizaram. |
| API pública | `/api/trpc/assessments.listPublished` | PASS — resposta tRPC válida com o catálogo publicado. |

> **Privacidade e governança.** A atualização de `DATABASE_URL` ocorreu somente em **Preview**. O valor não foi armazenado em código, arquivos de relatório ou Git. `AUTOPUBLISH` continua desabilitado, o RC-01 permanece imutável e nenhuma operação de produção foi realizada.

## Validação técnica local

| Verificação | Resultado |
|---|---:|
| `pnpm check` | PASS |
| Vitest | PASS — 23 arquivos e 70 testes aprovados. |
| `pnpm build` | PASS — Vite, servidor Express e bundle da função concluídos. |
| Integridade do diff | PASS |
| Varredura de segredo conhecido | PASS |

## URL de revisão humana

O Preview validado está disponível em:

`https://mental-saude-staging-rdx8hb0ir-admsuisso-1633s-projects.vercel.app`

Este endereço é estritamente de staging. A decisão desta fase é **revisão humana no Preview**; ela não autoriza promoção, publicação ou alteração da linha de produção.

## Próximo gate

O próximo trabalho permitido é a revisão humana do Preview e, se necessário, testes adicionais de OAuth e de fluxos autenticados no próprio ambiente Preview. Qualquer promoção para produção continua dependente de autorização humana explícita e de um gate separado.

