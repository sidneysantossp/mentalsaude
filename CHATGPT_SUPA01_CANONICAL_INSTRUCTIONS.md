# Orientação canônica do projeto Mental Saúde — SUPA-01

**Fonte:** https://chatgpt.com/g/g-p-6a7fe939667c819181e8af0c8afd781a-mental-saude/c/6a7fec27-6364-83e9-93d0-76f5951e7eb5

O arquiteto ChatGPT confirmou a decisão B: preservar `94354619` como RC histórico MySQL imutável e não publicá-lo com backend incompatível. A primeira produção pública deverá usar um novo RC PostgreSQL/Supabase.

A missão SUPA-01 deve ser concluída na branch isolada e deve trazer: schema/migrations PostgreSQL, queries convertidas, dependências removidas/adicionadas, migrations PostgreSQL, estratégia de runtime/migration connection, resultado real da conexão Supabase, dados que exigem migração, novos testes, total final de testes, build, gates SUPA-1 a SUPA-12 e blockers.

O próximo passo, somente após SUPA-01 aprovado, é `SUPA-02 — PostgreSQL Release Candidate Integration`, com merge controlado, tag `v1.0.0-rc2`, repetição dos gates YMYL/privacy e preparação para Vercel + Cloudflare usando PostgreSQL/Supabase real.

A publicação manual do `94354619` deve permanecer suspensa. Ele continua como RC1/fallback histórico; a primeira produção pública deve usar o novo RC PostgreSQL.

Nenhum deploy público está autorizado durante SUPA-01.
