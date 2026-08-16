# MENTAL SAÚDE — PRE-PRODUCTION RELEASE CANDIDATE REPORT (RC-01)

**Versão da Versão Candidata:** Mental Saúde RC-1.0-Release  
**Checkpoint ID:** `94354619`  
**Hash / Rastreabilidade de Linhagem:** `1c869a62 → 18626026 → 94354619`  
**Data:** 16 de Agosto de 2026  
**Status de Governança:** Article Design System V1.1 **FROZEN**, AUTOPUBLISH **DISABLED**, Deploy Público **HOLD** (Aguardando FRG-01).  

---

## 1. Executive Summary & Repository Lineage

A **Missão RC-01 (Pre-Production Release Candidate Assembly)** foi executada com sucesso sobre o repositório da plataforma *Mental Saúde*. O objetivo desta missão foi cessar a expansão editorial e consolidar uma versão candidata (`RC-1.0-Release`) fechada, rastreável e integralmente testada, preparando o artefato para a validação humana final (*FRG-01 — Final Human Release Gate*).

A cadeia de commits foi rigorosamente reconciliada:
- **`1c869a62`**: Baseline de encerramento da SF-05 (Stress Cluster Consolidation).
- **`18626026`**: Baseline da auditoria cross-cluster (CR-01).
- **`94354619`**: Checkpoint oficial da RC-01 (Pre-Production Release Candidate Assembly).

---

## 2. Taxonomy Governance & Scope Freeze

### 2.1. Normalização Taxonômica
O eixo **“Sono/Transversais”**, mencionado em auditorias anteriores, foi formalmente classificado como **`CROSS_CLUSTER_TOPIC`** (Tópico Transversal entre Clusters), preservando a estrutura canônica de quatro clusters consolidados:
1. **Ansiedade** (`COMPLETE_FOR_NOW`)
2. **Depressão** (`COMPLETE_FOR_NOW`)
3. **TDAH** (`COMPLETE_FOR_NOW`)
4. **Estresse** (`COMPLETE_FOR_NOW`)

Nenhum quinto cluster independente foi criado de forma implícita ou explícita.

### 2.2. Release Scope Freeze (Inventário de URLs)
O escopo de produção foi rigorosamente congelado em **42 URLs**, distribuídas da seguinte forma:
- **Topic Hubs (4):** `/ansiedade`, `/depressao`, `/tdah`, `/estresse` (`index, follow`).
- **Hub Editorial Geral (1):** `/conteudos` (`index, follow`).
- **Artigos Especializados (33):** Distribuição equilibrada entre os clusters de Ansiedade (12), Depressão (7), TDAH (8) e Estresse (6), além de artigos transversais de sono e suporte (`index, follow`).
- **Test Entities / Instrumentos (4):** `/testes/gad-7`, `/testes/phq-9`, `/testes/asrs`, `/testes/dass-21` (`index, follow`).
- **Rotas Privadas / Utilitárias:** Dashboards, painéis administrativos, fluxos de teste interativos e páginas de resultado individual mantidas estritamente sob **`noindex, nofollow`**.

---

## 3. Psychometric Release Manifest

A plataforma mantém quatro instrumentos psicométricos canônicos, todos validados com separação estrita entre triagem educativa e diagnóstico clínico:
1. **GAD-7 (Generalized Anxiety Disorder 7):** Associado primariamente ao cluster de Ansiedade.
2. **PHQ-9 (Patient Health Questionnaire 9):** Associado primariamente ao cluster de Depressão.
3. **ASRS v1.1 (Adult ADHD Self-Report Scale):** Associado primariamente ao cluster de TDAH.
4. **DASS-21 (Depression, Anxiety and Stress Scale 21):** Instrumento multiescala associado primariamente ao cluster de Estresse e suporte transversal.

*Diretriz de Privacidade e Estado de Resultado:* As páginas de resultado interativo e histórico do usuário executam estritamente sob meta `noindex, nofollow`, assegurando que dados psicométricos individuais jamais sejam indexados por motores de busca ou expostos em sitemaps públicos.

---

## 4. Final CTA Pass & Smoke Matrix Audit

- **Final CTA Pass:** Todos os componentes `ContextualTestCTA` nas páginas editoriais foram classificados como `KEEP`, `DOWNGRADE_TO_LINK` ou `REMOVE`. Garantiu-se que a leitura de um sintoma não resulte em encaminhamento mecânico e automático para triagem, preservando a proporcionalidade editorial.
- **User-Journey Smoke Matrix:** Foram validadas em viewport desktop e mobile as jornadas:
  1. *Informacional* (`Home → Hub → Artigo → Leitura correlata`) — **PASS**.
  2. *Screening* (`Home/Testes → Instrumento → Execução → Resultado noindex`) — **PASS**.
  3. *Contextual* (`Artigo → ContextualTestCTA → Instrumento`) — **PASS**.
  4. *Cross-cluster* (`Conteúdo transversal → Conexão temática`) — **PASS**.

---

## 5. Acceptance Gates RC-1 a RC-11 Summary

| Gate | Condição de PASS | Status | Evidência / Nota |
|---|---|---|---|
| **RC-1** | Lineage | **PASS** | Cadeia `1c869a62 → 18626026 → 94354619` documentada e rastreável. |
| **RC-2** | Taxonomy | **PASS** | Sono/Transversais classificado como `CROSS_CLUSTER_TOPIC`; 4 clusters consolidados. |
| **RC-3** | Scope Freeze | **PASS** | Manifesto de 42 URLs congelado; zero nova URL editorial sem versionamento. |
| **RC-4** | Psychometrics | **PASS** | GAD-7, PHQ-9, ASRS v1.1 e DASS-21 documentados e sem regressão. |
| **RC-5** | Privacy | **PASS** | Zero exposição de resultados individuais; `noindex` estrito em rotas de teste. |
| **RC-6** | CTA Safety | **PASS** | Proporcionalidade de CTAs validada em todo o ecossistema. |
| **RC-7** | Journeys | **PASS** | Smoke Matrix aprovada em desktop e mobile (zero blocker/major). |
| **RC-8** | YMYL Package | **PASS** | Exceções de maior risco extraídas e preparadas para revisão humana. |
| **RC-9** | Artifact Integrity | **PASS** | Pacote de release reproduzível associado ao checkpoint `94354619`. |
| **RC-10** | Regression | **PASS** | 63/63 testes aprovados (`Vitest`) e build de produção aprovado. |
| **RC-11** | Governance | **PASS** | ADS V1.1 FROZEN, AUTOPUBLISH DISABLED, zero deploy público realizado. |

---

## 6. Conclusion & Next Steps

O Release Candidate `Mental Saúde RC-1.0-Release` (`Checkpoint 94354619`) encontra-se tecnicamente completo, seguro e estável. 

Conforme as diretrizes de governança, **nenhuma publicação em produção foi efetuada (`AUTOPUBLISH = DISABLED`)**. O artefato está formalmente liberado para a transição à missão **FRG-01 — Final Human Release Gate**, onde o revisor humano avaliará o artefato para autorizar a primeira publicação controlada.
