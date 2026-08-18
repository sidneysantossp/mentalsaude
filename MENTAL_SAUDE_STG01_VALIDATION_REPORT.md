# Mental Saúde — STG-01: Revisão Humana de Staging e Fluxos Autenticados

**Autor:** Manus AI  
**Data de abertura:** 18 de agosto de 2026  
**Status:** **STG01_FAILED_CANDIDATE — PRESERVADO COMO EVIDÊNCIA**

## Mandato operacional

A STG-01 foi autorizada pelo canal operacional após a aceitação técnica da SUPA-03 e INFRA-02 em staging. O escopo é vincular uma revisão humana a um Preview de **commit específico**, comprovar a paridade do catálogo, exercitar os fluxos públicos e autenticados de maneira controlada e auditar privacidade e logs. A produção continua congelada: `main` não será alterada e `AUTOPUBLISH` permanece desabilitado.

## Candidato congelado

O candidato de revisão está vinculado ao deployment **Ready** de Preview gerado pelo commit `44721fa`. A URL específica é imutável para este deployment e não deve ser substituída por aliases móveis de branch durante a revisão. Qualquer commit novo na branch invalida a aprovação a ser emitida nesta STG-01.

| Campo | Valor |
|---|---|
| Staging branch | `infra/vercel-staging-preview` |
| Staging SHA | `44721fa` |
| Vercel Deployment ID | `FXeGMTVkrqgazuBkZd6U15AQXjvP` |
| Commit-specific Preview URL | `https://mental-saude-staging-9d1b2mpab-admsuisso-1633s-projects.vercel.app` |
| Status | **Ready / Preview** |

> A URL `mental-saude-staging-git-infra-69965d-admsuisso-1633s-projects.vercel.app` é um alias de branch e não será usada como identificador de aprovação.

| Gate | Estado inicial |
|---|---:|
| STG-0 — candidato fixado em SHA/URL | PASS |
| STG-1 — paridade do catálogo | PASS |
| Fluxos públicos e instrumentos | PENDENTE |
| OAuth e sessão | PENDENTE |
| Privacidade, tRPC e logs | PENDENTE |
| Decisão humana vinculada ao SHA | PENDENTE |

## Paridade do catálogo publicado

A auditoria somente de leitura comparou o catálogo PostgreSQL publicado com o catálogo publicado no banco legado que sustenta o RC1. Os dois lados apresentam **10 instrumentos**, sem itens ausentes e sem `UNEXPECTED_CATALOG_EXPOSURE`. O conjunto além de ASRS é, portanto, inventário histórico aprovado e não conteúdo criado pela importação PostgreSQL.

| Slug | Nome | Tipo | No RC1 | Esperado |
|---|---|---|---:|---:|
| `asrs-v1-1-adultos-6q` | Rastreio de atenção e hiperatividade em adultos | Instrumento psicométrico | Sim | Sim |
| `teste-depressao-autoobservacao` | Teste de Depressão (Autoobservação) | Autoobservação/editorial | Sim | Sim |
| `compulsao-alimentar-autoobservacao` | Compulsão Alimentar (Autoobservação) | Autoobservação/editorial | Sim | Sim |
| `teste-ansiedade-autoobservacao` | Teste de Ansiedade (Autoobservação) | Autoobservação/editorial | Sim | Sim |
| `teste-grau-estresse` | Teste Grau de Estresse | Autoobservação/editorial | Sim | Sim |
| `grau-sofrimento-mental` | Grau de Sofrimento Mental | Autoobservação/editorial | Sim | Sim |
| `teste-tdah-deficit-atencao` | Teste TDAH — Déficit de Atenção | Autoobservação/editorial | Sim | Sim |
| `teste-tdah-hiperatividade` | Teste TDAH — Hiperatividade | Autoobservação/editorial | Sim | Sim |
| `teste-fobia-social` | Teste Fobia Social | Autoobservação/editorial | Sim | Sim |
| `teste-transtorno-panico` | Teste Transtorno de Pânico (Autoobservação) | Autoobservação/editorial | Sim | Sim |

> **Gate STG-1.** `CATALOG_PARITY = PASS`. A comparação retornou `legacyPublishedCount = 10`, `postgresPublishedCount = 10`, `missingExpected = []` e `unexpected = []`.

## Smoke de instrumento — observação inicial

A página de entidade `GAD-7` do Preview específico renderizou corretamente a estrutura do instrumento, as sete perguntas declaradas e o aviso explícito de que o instrumento não substitui diagnóstico clínico. Entretanto, o CTA principal **"Iniciar Autoavaliação (GAD-7)"** redirecionou para o catálogo genérico `/testes`, em vez de preservar uma rota canônica específica de execução. Esta evidência impede a aprovação do fluxo completo do GAD-7 até a investigação das rotas de execução dos quatro instrumentos.

| Instrumento | Página de entidade | Screening ≠ diagnóstico | CTA para execução específica |
|---|---:|---:|---:|
| GAD-7 | PASS | PASS | **FAIL — CTA direcionou a `/testes`; `/testes/gad-7/iniciar` retorna 404** |
| PHQ-9 | PASS | PASS | **FAIL — `/testes/phq-9/iniciar` retorna 404** |
| ASRS v1.1 | PASS | PASS | **FAIL — `/testes/asrs/iniciar` abre `/avaliacao/1`, mas falha com `TypeError: Invalid URL` durante OAuth** |
| DASS-21 | PENDENTE | PENDENTE | **FAIL — `/testes/dass-21/iniciar` retorna 404** |

O roteador atual registra apenas a rota de execução específica do ASRS e uma rota numérica protegida (`/avaliacao/:id`). GAD-7, PHQ-9 e DASS-21 não possuem rotas de início próprias. A tentativa ASRS revelou um segundo bloqueador independente: a inicialização de login constrói uma URL OAuth inválida no build Preview, impedindo consentimento, apresentação de perguntas, seleção, submissão, scoring e devolutiva.

A inspeção do modelo editorial canônico confirma a causa do desvio: `GAD-7` e `PHQ-9` possuem `executionRoute: "/testes"`, o que explica o redirecionamento ao catálogo genérico. O mesmo modelo contém somente GAD-7, PHQ-9 e ASRS; a entidade DASS-21 não está definida nele. Assim, a STG-01 classifica o fluxo específico de três instrumentos como **não implementado** no candidato congelado, e não como falha transitória de navegador.

| Gate de execução STG-01 | Estado |
|---|---:|
| QUESTION_RENDERING | BLOCKED |
| ANSWER_SELECTION | BLOCKED |
| SUBMISSION | BLOCKED |
| SCORING | BLOCKED |
| RESULT_RENDERING | BLOCKED |
| SCREENING_NOT_DIAGNOSIS | PASS nas entidades canônicas; fluxo não alcançável |

## Comunicação de bloqueio

Os bloqueadores foram reportados ao canal operacional do projeto. A resposta autorizou a missão corretiva **STG-02**, mantendo o candidato `44721fa` reprovado para tag/release e preservado exclusivamente como evidência. A correção deverá gerar novo SHA, novo Preview e nova revisão, sem alterar RC1, `main`, ADS V1.1 ou produção.
