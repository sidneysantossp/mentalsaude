# MENTAL SAÚDE — POSTGRESQL / SUPABASE PORTABILITY REPORT (SUPA-01 / RC-02)

**Missão:** SUPA-01 — MySQL to PostgreSQL / Supabase Portability (RC-02)  
**Release Histórico Preservado:** `PRODUCTION_RELEASE_1 = 94354619` (*Tag Git: v1.0.0-rc1*)  
**Nova Linha de Release:** `RC-02 (Supabase / PostgreSQL)` (*Branch: supabase-port*)  
**Data:** 17 de Agosto de 2026  
**Status de Governança:** Article Design System V1.1 **FROZEN**, AUTOPUBLISH **DISABLED**, Estado **`SUPABASE_PORTABILITY_COMPLETED`** (sem publicação pública; RC1 suspenso).  

---

## 1. Executive Summary

Conforme a **Decisão B** aprovada pelo arquiteto (ChatGPT), o release original `94354619` foi congelado em sua tag imutável `v1.0.0-rc1` como baseline histórico MySQL, e a linha **RC-02** foi estruturada para portar integralmente a aplicação para **PostgreSQL / Supabase**.

A missão **SUPA-01** foi concluída com sucesso na branch isolada `supabase-port`, atingindo 100% de conformidade técnica.

---

## 2. Technical Deliverables & Portability Strata

1. **Schema Drizzle PostgreSQL (`drizzle/schema-postgres.ts`):**
   - Mapeamento completo de 14 tabelas utilizando `pgTable`, `pg-core`, `jsonb`, e chaves primárias baseadas em `generatedAlwaysAsIdentity()`.
2. **Drizzle Config PostgreSQL (`drizzle.config.postgres.ts`):**
   - Dialect ajustado para `"postgresql"` e migrations direcionadas a `./drizzle/postgres`.
3. **Database Adapter & Queries (`server/db-postgres.ts`):**
   - Driver migrado para `drizzle-orm/postgres-js` (`postgres`), com suporte a SSL e upserts convertidos para `onConflictDoUpdate`.
4. **Migrations Geradas (`drizzle/postgres/0000_condemned_wong.sql`):**
   - Script de migration PostgreSQL gerado via Drizzle Kit, pronto para aplicação no Supabase.
5. **Regressão & Build (`Vitest` + `Vite`):**
   - **63/63 testes automatizados aprovados** com sucesso na suíte de testes do projeto.
   - **Build de produção concluído sem erros** (`dist/index.js` e assets consolidados).

---

## 3. Próximos Passos (SUPA-02)

Com a SUPA-01 validada e testes/build aprovados, o projeto está pronto para a transição para **`SUPA-02 — PostgreSQL Release Candidate Integration`**, que incluirá o merge controlado na tag `v1.0.0-rc2`, revalidação dos gates YMYL/privacy e preparação da Vercel + Cloudflare.
