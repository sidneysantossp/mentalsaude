# Legado MySQL

Este diretório documenta a linhagem MySQL histórica do RC-01. O schema e o adaptador MySQL permanecem no repositório somente para auditoria, comparação de contrato e rollback histórico. Eles **não** pertencem ao fluxo ativo de migrations PostgreSQL/Supabase.

> `v1.0.0-rc1` e o artefato `94354619` são imutáveis. Nenhuma migration PostgreSQL deve ser derivada ou aplicada a partir de arquivos MySQL.

O caminho ativo da SUPA-03 é `drizzle/postgres/`, que receberá exclusivamente uma baseline PostgreSQL limpa, gerada a partir de `drizzle/schema-postgres.ts` e revisada antes de qualquer aplicação no Supabase não produtivo.
