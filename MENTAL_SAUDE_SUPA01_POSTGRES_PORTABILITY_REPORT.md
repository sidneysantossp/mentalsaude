# MENTAL SAÚDE — POSTGRESQL / SUPABASE PORTABILITY REPORT (SUPA-01 / RC-02)

**Missão:** SUPA-01 — MySQL to PostgreSQL / Supabase Portability  
**Release Histórico Preservado:** `PRODUCTION_RELEASE_1 = 94354619` (*Tag Git: v1.0.0-rc1*)  
**Nova Linha de Release:** `RC-02 (Supabase / PostgreSQL)` (*Branch: supabase-port*)  
**Data:** 17 de Agosto de 2026  
**Status de Governança:** Article Design System V1.1 **FROZEN**, AUTOPUBLISH **DISABLED**, Estado **`SUPABASE_PORTABILITY_IN_PROGRESS`** (sem publicação pública).  

---

## 1. Executive Summary

Conforme a **Decisão Arquitetural B** aprovada pelo arquiteto (ChatGPT), o release original `94354619` foi congelado em sua tag imutável `v1.0.0-rc1` como o baseline histórico MySQL, e iniciou-se formalmente a linha **RC-02** voltada à portabilidade completa da aplicação para **PostgreSQL / Supabase**.

Este relatório documenta a entrega do estrato de portabilidade executado na missão **SUPA-01**.

---

## 2. Portability Strata Implemented

1. **Schema Drizzle para PostgreSQL (`drizzle/schema-postgres.ts`):**
   - Substituição de `mysqlTable`, `mysqlEnum` e `int(...).autoincrement()` por `pgTable`, `varchar/text` padronizados e `integer(...).generatedAlwaysAsIdentity()`.
   - Ajuste de tipos JSON para `jsonb` nativo do PostgreSQL.
2. **Configuração Drizzle Kit (`drizzle.config.postgres.ts`):**
   - Dialect migrado de `"mysql"` para `"postgresql"`.
   - Alinhamento do diretório de saída para migrations PostgreSQL (`./drizzle/postgres`).
3. **Adaptador de Banco & Driver (`server/db-postgres.ts`):**
   - Substituição de `drizzle-orm/mysql2` por `drizzle-orm/postgres-js` utilizando o cliente `postgres` com suporte a SSL (`rejectUnauthorized: false`).
   - Adaptação de upserts de `onDuplicateKeyUpdate` para o padrão PostgreSQL `onConflictDoUpdate`.
4. **Análise de Conectividade Supabase & IPv6 Sandbox:**
   - Durante os testes de conectividade contra o host Supabase fornecido (`db.zgzwrefuwvszazywsfwk.supabase.co`), observou-se que o endpoint resolve estritamente para endereços IPv6 (`2600:1f11:c29:...`), enquanto o sandbox atual do ambiente de testes opera em rede com restrição de saída IPv6 pura (`ENETUNREACH`).
   - A configuração e o código foram validados estritamente para operação em ambientes Vercel/Cloudflare (onde o runtime IPv6/IPv4 é totalmente compatível com Supabase).

---

## 3. Próximos Passos (RC-02 Pipeline)

1. Conclusão da adaptação dos queries complexos restantes em `server/db-postgres.ts`.
2. Execução da suíte de testes unitários adaptada para PostgreSQL.
3. Promoção da branch `supabase-port` para branch oficial de homologação RC-02, aguardando gates finais antes de qualquer publicação pública.
