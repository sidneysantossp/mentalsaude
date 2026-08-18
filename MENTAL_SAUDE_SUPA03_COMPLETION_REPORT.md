# Mental Saúde — SUPA-03: Baseline PostgreSQL, Runtime e Preview Validado

**Autor:** Manus AI
**Data:** 18 de agosto de 2026
**Estado:** **CONCLUÍDO — STAGING VERCEL VALIDADO**

## Resultado

A SUPA-03 concluiu a migração controlada do runtime da Mental Saúde para PostgreSQL/Supabase. A baseline canônica foi aplicada sem drift, a carga editorial e de instrumentos foi migrada de forma transacional sem dados pessoais, e tRPC, OAuth e sessão utilizam o adaptador PostgreSQL ativo. O Preview Vercel posterior confirmou que o catálogo público é lido pelo Transaction Pooler em um runtime serverless real.

| Pilar | Resultado |
|---|---:|
| Baseline PostgreSQL | PASS — 14 entidades canônicas reconciliadas. |
| Objetos externos | PASS — removidos somente após comparação e autorização. |
| Carga canônica | PASS — instrumentos e conteúdo migrados; dados individuais excluídos. |
| Runtime da aplicação | PASS — tRPC, OAuth e sessão usam `server/db-postgres.ts`. |
| Preview Vercel | PASS — frontend, API e catálogo PostgreSQL validados. |
| Produção | HOLD — nenhuma promoção foi realizada. |

## Proteção de dados e integridade

A migração canônica trouxe somente entidades de produto e conteúdo. Usuários, perfis, tentativas e respostas foram excluídos explicitamente. A conexão de banco permanece exclusivamente em cofre; não há URL de banco ou credencial em arquivos versionados, relatórios ou histórico de Git.

| Carga importada | Registros |
|---|---:|
| Instrumentos | 10 |
| Perguntas | 33 |
| Opções | 138 |
| Recomendações | 30 |
| Oportunidades editoriais | 22 |
| Briefs editoriais | 6 |
| Evidências | 10 |
| Links internos | 30 |
| Versões de artigo | 6 |
| Publication Gates | 6 |

## Evidências de validação

| Verificação | Resultado |
|---|---:|
| Conectividade runtime e migration | PASS |
| Smoke de escrita transacional com rollback | PASS |
| Catálogo tRPC local | PASS |
| Catálogo tRPC no Preview | PASS |
| Homepage, `/testes` e `/conteudos` no Preview | PASS |
| TypeScript | PASS |
| Vitest | PASS — 70/70 testes em 23 arquivos. |
| Build de produção | PASS |
| Varredura de segredo conhecido | PASS |

## Governança preservada

`AUTOPUBLISH` continua desabilitado. O payload RC-01 (`94354619` / `v1.0.0-rc1`) não foi modificado. O Article Design System V1.1 permanece congelado. A publicação pública não foi iniciada, e a URL de Preview permanece limitada à revisão humana.

## Referências internas

1. [Relatório de validação INFRA-02](./MENTAL_SAUDE_INFRA02_STAGING_VALIDATION_REPORT.md)
2. [Manifesto de ambiente SUPA-03](./SUPA03_ENVIRONMENT_MANIFEST.md)
3. [Baseline PostgreSQL](./drizzle/postgres/0000_abnormal_firelord.sql)
4. [Adaptador PostgreSQL ativo](./server/db-postgres.ts)
5. [Importação canônica seletiva](./scripts/supa03-copy-canonical-data.mjs)
