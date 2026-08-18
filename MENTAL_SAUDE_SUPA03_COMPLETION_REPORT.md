# Mental Saúde — SUPA-03: PostgreSQL Baseline & Runtime Validation

**Autor:** Manus AI  
**Data:** 18 de agosto de 2026  
**Estado:** **CONCLUÍDO LOCALMENTE E NO SUPABASE; PREVIEW VERCEL EM HOLD POR ACESSO NÃO RECONCILIADO**  
**Governança preservada:** `AUTOPUBLISH = DISABLED`; nenhum deployment de produção foi realizado; o release RC-01 (`94354619` / `v1.0.0-rc1`) permanece imutável; o Article Design System V1.1 permanece congelado.

## Resumo executivo

A SUPA-03 concluiu a transição operacional do runtime da Mental Saúde para **PostgreSQL no Supabase**. A baseline PostgreSQL foi aplicada em um schema isolado e vazio após a remoção autorizada de objetos externos; o contrato físico contém as 14 entidades canônicas sem objetos remanescentes de outro domínio. O runtime tRPC, o callback OAuth e o helper de sessão passaram a utilizar o adaptador `server/db-postgres.ts`, configurado para o Transaction Pooler com `prepare: false`.

Também foi restaurada a carga canônica de produto e conteúdo do banco legado, de forma transacional e estritamente seletiva. Foram excluídos usuários, perfis, tentativas e respostas, evitando a cópia de dados pessoais ou de estados clínicos individuais. A suíte final encerrou com **70/70 testes aprovados**, a checagem de tipos e o build de produção aprovados, além de smoke tests de conectividade, escrita com rollback e resposta pública tRPC.

| Pilar | Resultado | Evidência principal |
|---|---:|---|
| Schema PostgreSQL | PASS | 14/14 entidades canônicas presentes; nenhum objeto externo após a limpeza autorizada. |
| Conexões | PASS | Runtime e migration responderam a `SELECT 1` pelo pooler. |
| Runtime da aplicação | PASS | tRPC, OAuth e sessão apontam para `db-postgres.ts`. |
| Carga canônica | PASS | Instrumentos e metadados editoriais migrados sem dados pessoais ou resultados. |
| Regressão e tipagem | PASS | 23 arquivos de teste, 70 testes; `tsc --noEmit` sem erros. |
| Build de produção | PASS | Vite e bundle Express concluídos. |
| Segredos no workspace | PASS | Varredura da credencial conhecida sem ocorrências; `.project-config.json` permanece ignorado pelo Git. |
| Preview Vercel | HOLD | A conexão atual não possui acesso ao projeto de staging registrado. |

## Arquitetura entregue

O adaptador ativo é `server/db-postgres.ts`, apoiado por `drizzle/schema-postgres.ts` e pela migration `drizzle/postgres/0000_abnormal_firelord.sql`. O banco usa o Transaction Pooler somente em processos de aplicação e define `prepare: false`, requisito de compatibilidade com o modo de pool de transações. A geração e aplicação de migrations permanecem separadas do startup e são destinadas exclusivamente à variável de migration, conforme o manifesto de ambiente [SUPA03_ENVIRONMENT_MANIFEST.md](./SUPA03_ENVIRONMENT_MANIFEST.md).

| Camada | Estado na SUPA-03 | Artefato |
|---|---|---|
| Contrato Drizzle | PostgreSQL ativo | `drizzle/schema-postgres.ts` |
| Baseline | Aplicada e verificada | `drizzle/postgres/0000_abnormal_firelord.sql` |
| Runtime tRPC | PostgreSQL ativo | `server/routers.ts` → `server/db-postgres.ts` |
| OAuth | PostgreSQL ativo | `server/_core/oauth.ts` |
| Sessões/usuários | PostgreSQL ativo | `server/_core/sdk.ts` |
| MySQL | Mantido apenas como referência de recuperação | `server/db.ts`, `drizzle/legacy/` |

As entidades no contrato físico são `users`, `userProfiles`, `assessments`, `assessmentQuestions`, `assessmentOptions`, `assessmentAttempts`, `assessmentAnswers`, `recommendations`, `contentOpportunities`, `contentBriefs`, `contentEvidence`, `internalLinksGraph`, `articleVersions` e `publicationGates`.

## Reconciliação de schema e carga inicial

O preflight identificou 18 tabelas de domínio externo e colisões nominais que impediam a aplicação segura da baseline. Após comparação estrutural, a remoção foi executada somente com a autorização já registrada, em operação transacional. O schema foi confirmado vazio antes da baseline e comparado novamente depois da aplicação, sem drift em relação ao contrato canônico. O histórico anterior foi preservado em [SUPA03_PRECHECK_REPORT.md](./SUPA03_PRECHECK_REPORT.md), [SUPA03_CLEANUP.sql](./SUPA03_CLEANUP.sql) e [SUPA03_SCHEMA_COMPARISON.json](./SUPA03_SCHEMA_COMPARISON.json).

O inventário posterior mostrou que o schema estrutural estava correto, mas sem dados de catálogo. Para assegurar continuidade funcional do produto, a importação `scripts/supa03-copy-canonical-data.mjs --apply` transportou exclusivamente registros de produto e conteúdo. Ela bloqueia qualquer reexecução em destino não vazio, executa todas as inserções em uma única transação e não revela URLs de conexão.

| Entidade canônica importada | Registros |
|---|---:|
| Instrumentos | 10 |
| Perguntas | 33 |
| Opções | 138 |
| Recomendações | 30 |
| Oportunidades editoriais | 22 |
| Briefs editoriais | 6 |
| Evidências | 10 |
| Arestas de links internos | 30 |
| Versões de artigos | 6 |
| Publication Gates | 6 |

> **Proteção de privacidade:** `users`, `userProfiles`, `assessmentAttempts` e `assessmentAnswers` foram excluídas explicitamente da importação. Assim, o Supabase de staging recebeu apenas a carga canônica de instrumentos e conteúdo, sem contas, perfis, respostas, escores ou resultados individuais do legado.

## Validação final

| Verificação | Resultado | Observação |
|---|---:|---|
| Conectividade runtime | PASS | Teste PostgreSQL `SELECT 1` aprovado. |
| Conectividade de migration | PASS | Conexão separada de migration aprovada. |
| Smoke de escrita | PASS | `INSERT` e `SELECT` dentro de `ROLLBACK`; sem persistir dado de teste. |
| Catálogo público tRPC | PASS | `GET /api/trpc/assessments.listPublished` retornou HTTP 200 e instrumentos. |
| Catálogo visual local | PASS | `/testes` renderizou cards de instrumentos a partir do Supabase. |
| TypeScript | PASS | `pnpm check` concluído sem erros. |
| Vitest | PASS | 23 arquivos, 70/70 testes. |
| Build | PASS | `pnpm build` concluiu Vite e esbuild. |
| Segurança do repositório | PASS | `git diff --check` e varredura de segredo conhecido aprovados. |

Os novos testes `server/supa03DataImport.test.ts` verificam que o script de importação não contém inserções nas quatro entidades sensíveis, que o cliente utiliza `prepare: false`, que o destino não vazio é bloqueado e que a escrita ocorre dentro de transação.

## Preview Vercel: bloqueio objetivo e próximo passo controlado

Nenhuma promoção foi executada. A consulta à conexão Vercel atualmente disponível retornou apenas um projeto diferente no time informado; o identificador registrado para `mental-saude-staging` respondeu com ausência de projeto e a listagem de deployments foi recusada por permissão. Portanto, não é possível, neste momento, confirmar a variável Preview, monitorar o deployment ou executar os smoke tests externos com rastreabilidade.

| Item de staging | Estado | Ação necessária |
|---|---:|---|
| Projeto `mental-saude-staging` | Acesso não reconciliado | Conceder acesso à conexão atual ou fornecer o identificador/time corretos. |
| `DATABASE_URL` do Preview | Pendente de confirmação externa | Configurar exclusivamente com a URL do Transaction Pooler já guardada nos segredos; não usar URL MySQL. |
| Push da branch de staging | HOLD | Executar somente após reconciliar projeto e variável Preview. |
| Smoke externo (`/`, `/testes`, `/conteudos`, tRPC) | HOLD | Executar no Preview gerado, sem produção. |
| Produção | HOLD | Não autorizada nesta missão e não alterada. |

## Conclusão

A **SUPA-03 está tecnicamente concluída** para banco, runtime, segurança da carga canônica e validação local controlada. A continuidade para INFRA-02 depende exclusivamente da reconciliação de acesso ao projeto Vercel de staging e da confirmação do segredo `DATABASE_URL` no escopo Preview. Nenhum passo desta etapa alterou o payload RC-01, publicou conteúdo, promoveu produção ou habilitou publicação automática.

## Referências internas

1. [Manifesto de ambiente SUPA-03](./SUPA03_ENVIRONMENT_MANIFEST.md)
2. [Preflight SUPA-03](./SUPA03_PRECHECK_REPORT.md)
3. [Baseline PostgreSQL](./drizzle/postgres/0000_abnormal_firelord.sql)
4. [Adaptador PostgreSQL ativo](./server/db-postgres.ts)
5. [Migração canônica seletiva](./scripts/supa03-copy-canonical-data.mjs)
6. [Testes de guardrail de importação](./server/supa03DataImport.test.ts)
