-- SUPA-03 cleanup autorizado após comparação estrutural somente leitura.
-- Remove 16 tabelas externas e 2 colisões nominais não idênticas.
-- Não contém dados da Mental Saúde: 12 tabelas canônicas ainda estavam ausentes.
BEGIN;

DROP TABLE IF EXISTS
  "activities",
  "agentRuns",
  "agents",
  "auditEvents",
  "decisions",
  "evidences",
  "executions",
  "findings",
  "integrations",
  "measurements",
  "organizationMembers",
  "organizations",
  "outcomes",
  "projectMemory",
  "projects",
  "tasks",
  "recommendations",
  "users"
CASCADE;

COMMIT;
