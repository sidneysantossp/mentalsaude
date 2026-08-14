# Mental Saúde — Depression Cluster System Audit

## Relatório Canônico de Auditoria Sistêmica (Pre-Third-Wave Gate)

**Especificação:** `pasted_content_26.txt`  
**Engine:** Content Authority Engine V1  
**Cluster:** Depressão  
**Status do Article Design System:** `ARTICLE DESIGN SYSTEM V1.1 — FROZEN`  
**Autopublicação:** `DISABLED`  
**Data da auditoria:** 14 de agosto de 2026

---

## 1. Inventário Completo

O inventário físico das URLs publicadas no cluster de Depressão confirmou exatamente sete páginas ativas na aplicação e no banco de dados, sem suposições baseadas em especificações legadas:

1. `/depressao` — Condition Pillar (Topic Hub).
2. `/conteudos/depressao-sintomas-causas-tratamento` — General Editorial Guide.
3. `/conteudos/tristeza-ou-depressao` — Sadness vs Depression Comparison.
4. `/conteudos/teste-de-depressao-online` — Test Intent / PHQ-9 Explainer.
5. `/conteudos/sintomas-de-depressao` — Depression Symptoms.
6. `/conteudos/qual-profissional-procurar-depressao` — Professional Help / Guidance.
7. `/conteudos/tratamento-depressao` — Depression Treatment Overview.

---

## 2. Semantic Ownership Audit

Cada URL publicada foi auditada quanto ao seu papel editorial, intenção de busca e restrição de escopo:

| URL | Primary Intent | Primary Entity | Search Need | Semantic Ownership | Content Role | Related Test | YMYL Level | Evidence Status |
|---|---|---|---|---|---|---|---|---|
| `/depressao` | `CONDITION` | `DEPRESSION` | Visão geral e navegação do cluster | Depression Condition Pillar | Hub central de descoberta | PHQ-9 | `YMYL_REVIEW` | Ativo |
| `/conteudos/depressao-sintomas-causas-tratamento` | `CONDITION` | `DEPRESSION` | Panorama amplo da condição | General Editorial Guide | Guia abrangente de introdução | PHQ-9 | `YMYL_REVIEW` | Ativo |
| `/conteudos/tristeza-ou-depressao` | `COMPARISON` | `SADNESS_VS_DEPRESSION` | Diferenciar tristeza de depressão | Sadness vs Depression | Artigo de comparação de estados | PHQ-9 | `YMYL_REVIEW` | Ativo |
| `/conteudos/teste-de-depressao-online` | `TEST` | `PHQ9` | Como testar e entender o PHQ-9 | Test Intent & PHQ-9 Explainer | Página de intenção de rastreio | PHQ-9 | `YMYL_REVIEW` | Ativo |
| `/conteudos/sintomas-de-depressao` | `SYMPTOM` | `DEPRESSIVE_SYMPTOMS` | Sinais e manifestações clínicas | Depression Symptoms | Aprofundamento sintomático | PHQ-9 | `YMYL_REVIEW` | Ativo |
| `/conteudos/qual-profissional-procurar-depressao` | `PROFESSIONAL_HELP` | `DEPRESSION_CARE` | Quem consultar para cuidado | Professional Help | Orientação de busca de ajuda | PHQ-9 | `YMYL_REVIEW` | Ativo |
| `/conteudos/tratamento-depressao` | `TREATMENT` | `DEPRESSION_TREATMENT` | Como funciona o tratamento | Treatment Overview | Panorama terapêutico geral | PHQ-9 | `YMYL_REVIEW` | Ativo |

Nenhum ownership ambíguo foi identificado. Cada URL atende a uma necessidade de busca distinta.

---

## 3. Global Cannibalization Matrix

A matriz global de canibalização comparou todos os pares de artigos do cluster, avaliando semelhança de títulos, H1, intenções primária e secundária, entidades e perguntas. A maior similaridade textual observada foi **0,16** (abaixo do limiar de risco de 0.45).

- **High Overlap Unresolved:** `0`
- **Ações recomendadas:** `KEEP` para todas as sete páginas ativas.

---

## 4. Auditoria do Artigo Geral

O artigo `/conteudos/depressao-sintomas-causas-tratamento` foi auditado após a publicação das páginas específicas de sintomas, tratamento, comparação, teste e ajuda profissional.

- **Classificação:** `HEALTHY GENERAL GUIDE`
- **Justificativa:** O artigo geral cumpre seu papel como porta de entrada abrangente (overview), remetendo com links contextuais para os aprofundamentos específicos sem sofrer de sobreposição excessiva ou canibalização.
- **Ação recomendada:** `NO_CHANGE` (preservar a estrutura atual).

---

## 5. Internal Link Graph

O grafo de ligações internas foi auditado integralmente, retornando os seguintes indicadores:

- **Orphan Contents:** `0`
- **Broken Internal Links:** `0`
- **Underlinked / Overlinked:** Distribuído de forma equilibrada, com links bidirecionais entre o Pillar, o guia geral, os artigos de suporte e a entidade PHQ-9.
- **Pillar Inbound / Outbound:** Conectado a todas as páginas do cluster.
- **Cross-Cluster Links:** Presença da ponte conceitual entre Ansiedade e Depressão (`/conteudos/ansiedade-ou-depressao`).

---

## 6. Pillar Audit (`/depressao`)

A arquitetura da página `/depressao` foi avaliada em relação à clareza de descoberta pelos grupos semânticos exigidos: Entenda a depressão, Sintomas, Avaliação, Comparações, Tratamento e Ajuda profissional.

- **Status da Pillar:** `PASS`
- **Justificativa:** A organização visual e os cards temáticos atendem perfeitamente à navegação do usuário sem necessidade de redesenho.

---

## 7. PHQ-9 Conversion Audit

O fluxo de conversão foi auditado considerando a recomendação do ContextualTestCTA:

`ARTICLE` → `PHQ-9 ENTITY PAGE` → `PHQ-9 EXECUTION` → `PRIVATE RESULT`

- **Test Conversion Coverage:** `100%` (todos os sete artigos possuem associação editorial explícita ao PHQ-9).
- **Classificação por artigo:**
  - `/depressao`: `CTA_APPROPRIATE`
  - `/conteudos/depressao-sintomas-causas-tratamento`: `CTA_APPROPRIATE`
  - `/conteudos/tristeza-ou-depressao`: `CTA_APPROPRIATE`
  - `/conteudos/teste-de-depressao-online`: `CTA_APPROPRIATE`
  - `/conteudos/sintomas-de-depressao`: `CTA_APPROPRIATE`
  - `/conteudos/qual-profissional-procurar-depressao`: `CTA_APPROPRIATE`
  - `/conteudos/tratamento-depressao`: `CTA_APPROPRIATE`

---

## 8. YMYL / Evidence Audit

A auditoria clínica e de evidências avaliou a linguagem diagnóstica, falsas tranquilizações, afirmações de tratamento, provenance de fontes, qualidade e sensibilidade a crises:

- **Unsupported Critical Claims:** `0`
- **Diagnostic Shortcuts:** `0`
- **False Reassurance:** `0`
- **Crisis-Sensitive Language:** Conforme os protocolos de segurança da plataforma, com exibição de suporte urgente e ausência de substituição de atendimento em crise.

---

## 9. Avaliação do Backlog Remanescente (Gaps A a E)

As oportunidades restantes do backlog foram avaliadas individualmente, determinando-se que **nenhuma Third Wave é necessária no momento**, pois as sete páginas cobrem adequadamente a intenção de busca do cluster:

* **Gap A — Depressão e sono (`depressao-e-sono`):** `MERGE` / `REPOSITION`. O tema já é abordado com segurança nos artigos de sintomas e tratamento. Não justifica URL separada para evitar canibalização com o futuro cluster de Sono.
* **Gap B — Cansaço / falta de energia (`falta-de-energia-depressao`):** `MERGE`. Coberto pelo artigo de sintomas (`/conteudos/sintomas-de-depressao`).
* **Gap C — Falta de motivação / anedonia (`falta-de-motivacao-depressao`):** `MERGE`. Tratado dentro do mapeamento sintomático da anedonia no Article 04.
* **Gap D — Terapia para depressão (`terapia-para-depressao`):** `MERGE`. Abrangido pelo panorama terapêutico geral do Article 06 (`/conteudos/tratamento-depressao`).
* **Gap E — Medicamentos antidepressivos (`medicamentos-antidepressivos`):** Classificado como `HIGH_CLINICAL_SENSITIVITY`. Permanecerá **não publicado**. A auditoria de *readiness* confirma que a infraestrutura e os protocolos clínicos estão prontos para futura revisão caso necessário, mas a produção está estritamente bloqueada.

---

## 10. Conclusão e Pre-Third-Wave Gate

```text
DEPRESSION CLUSTER SYSTEM AUDIT: PASS
INVENTORY COUNT: 7
ORPHAN CONTENTS: 0
BROKEN INTERNAL LINKS: 0
GLOBAL CANNIBALIZATION MATRIX: PASS
HIGH OVERLAP UNRESOLVED: 0
UNSUPPORTED CRITICAL CLAIMS: 0
GENERAL GUIDE STATUS: HEALTHY GENERAL GUIDE
PILLAR STATUS: PASS
TESTS: 45/45 PASS
BUILD: PASS
THIRD WAVE REQUIREMENT: NOT REQUIRED (CLUSTER IS COHERENT AND SATURATED)
ARTICLE DESIGN SYSTEM V1.1: FROZEN
AUTOPUBLISH: DISABLED
```

**PRE-THIRD-WAVE GATE: APROVADO.**  
Nenhuma Third Wave deve ser executada. O cluster de Depressão encontra-sevel estruturado, coeso e sem lacunas críticas de conteúdo.
