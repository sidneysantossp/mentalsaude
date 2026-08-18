# SUPA-03 — Preflight de Baseline PostgreSQL

**Status:** BLOCKED — nenhuma migration foi aplicada.

O preflight controlado de 2026-08-18 confirmou que a conexão PostgreSQL de runtime e a conexão exclusiva de migration respondem a `SELECT 1` com `prepare: false`. Porém, a baseline limpa possui um gate de segurança: ela só pode ser aplicada em um schema `public` vazio. O schema conectado contém 18 tabelas, incluindo um conjunto de domínio aparentemente externo à Mental Saúde — por exemplo, `agents`, `agentRuns`, `projects`, `projectMemory`, `findings`, `executions` e `organizations`.

As tabelas `users` e `recommendations` também já existem, criando colisões nominais com a baseline canônica da Mental Saúde. Portanto, não é seguro executar a migration, criar tabelas com os mesmos nomes, renomear objetos existentes ou emitir qualquer DDL destrutivo.

| Item | Resultado |
|---|---|
| Conexão runtime Transaction Pooler | PASS |
| Conexão dedicada de migration | PASS |
| Schema `public` vazio | FAIL — 18 tabelas existentes |
| Baseline PostgreSQL aplicada | NÃO |
| Dados/DDL destrutivos executados | NÃO |
| Vercel Preview | HOLD |
| Produção / AUTOPUBLISH | HOLD / DISABLED |

> Próxima decisão requerida: confirmar se este projeto Supabase é deliberadamente compartilhado e definir um schema exclusivo para Mental Saúde, ou fornecer um projeto Supabase vazio destinado à plataforma. Até essa decisão, a SUPA-03 permanece em bloqueio seguro.
