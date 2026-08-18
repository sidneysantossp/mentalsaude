# SUPA-03 — Manifesto de Ambiente

Este manifesto registra somente os **nomes** das variáveis necessárias. Nenhum valor, URL de banco, token ou credencial deve ser adicionado a este arquivo, ao Git ou a relatórios operacionais.

| Variável | Escopo | Finalidade |
|---|---|---|
| `DATABASE_URL` | Runtime Vercel | URL do Supabase Transaction Pooler para o processo de aplicação. O cliente `postgres.js` usa `prepare: false`. |
| `POSTGRES_DATABASE_URL` | Desenvolvimento controlado | Override local exclusivo da SUPA-03, pois o `DATABASE_URL` gerenciado do ambiente legado não é alterável nesta etapa. |
| `DATABASE_MIGRATION_URL` | Release controlado | Conexão PostgreSQL adequada apenas para geração/aplicação controlada de migrations. Nunca é lida no startup do runtime. |
| `NODE_ENV` | Runtime | Diferencia execução de desenvolvimento e produção. |
| `VITE_APP_ID` | OAuth | Identificador público da aplicação Manus OAuth. |
| `JWT_SECRET` | Runtime | Assinatura de sessão. |
| `OAUTH_SERVER_URL` | OAuth | Endpoint do servidor OAuth Manus. |
| `OWNER_OPEN_ID` | Runtime | Identificador do proprietário usado para o papel administrativo inicial. |
| `BUILT_IN_FORGE_API_URL` | Runtime | Endpoint integrado Manus, quando necessário. |
| `BUILT_IN_FORGE_API_KEY` | Runtime | Credencial integrada Manus, quando necessária. |

| Superfície Supabase | Estado na SUPA-03 |
|---|---|
| `SUPABASE_URL` | **NOT_REQUIRED** — acesso é server-side por Drizzle/postgres.js. |
| `SUPABASE_ANON_KEY` | **NOT_REQUIRED** — não há SDK Supabase no cliente. |
| `SUPABASE_SERVICE_ROLE_KEY` | **NOT_REQUIRED** — não há SDK Supabase no servidor. |

> O modo arquitetural permanece **SUPABASE_MODE = DATABASE_ONLY**. Migrations pertencem ao processo controlado de release e nunca à inicialização, ao cold start ou a uma função serverless.
