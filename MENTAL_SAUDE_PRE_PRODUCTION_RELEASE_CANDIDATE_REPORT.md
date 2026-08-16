# MENTAL SAÚDE — PRE-PRODUCTION RELEASE CANDIDATE REPORT (RC-01 CANÔNICA)

**Missão:** RC-01 (Pre-Production Release Candidate Assembly)  
**Baseline de Entrada:** `1c869a62`  
**Checkpoint Oficial:** `d3658977`  
**Linhagem Reconciliada:** `1c869a62 → [SF-05 & CR-01] → 18626026 → d3658977`  
**Data:** 16 de Agosto de 2026  
**Status de Governança:** Article Design System V1.1 **FROZEN**, AUTOPUBLISH **DISABLED**, Deploy Público **HOLD**.  

---

## 1. Executive Summary & Lineage Reconciliation

A **Missão RC-01 Canônica** foi executada para reconciliar a linhagem do repositório e consolidar o pacote completo de pré-produção do *Mental Saúde*. 

- **Cadeia de Commits:** A execução formal partiu de `1c869a62` (baseline pós-segunda onda de estresse), evoluindo através de refinamentos transversais até o baseline institucional `18626026` (auditado na CR-01) e culminando no checkpoint oficial **`d3658977`**.
- **Governança de Taxonomia:** O domínio de *Sono e Temas Transversais* foi formalmente classificado como **`CROSS_CLUSTER_TOPIC` / `EDITORIAL_AXIS`**, preservando intactos os quatro clusters canônicos (*Ansiedade*, *Depressão*, *TDAH* e *Estresse*) sem criar um quinto cluster independente.

---

## 2. Release Scope Freeze (42 URLs)

O inventário definitivo do artefato candidato compreende exatamente 42 rotas indexáveis e protegidas:
1. **Topic Hubs (4):** `/ansiedade`, `/depressao`, `/tdah`, `/estresse`.
2. **Hub Editorial Geral (1):** `/conteudos` (com busca em tempo real).
3. **Artigos Especializados (33):**
   - Ansiedade: 12 artigos.
   - Depressão: 7 artigos.
   - TDAH: 8 artigos.
   - Estresse: 6 artigos.
4. **Test Entities (4):** `/testes/gad-7`, `/testes/phq-9`, `/testes/asrs`, `/testes/dass-21`.
5. **Rotas Privadas / Noindex:** Resultados de testes, dashboards e históricos de evolução do usuário (rigorosamente marcados com metatags `noindex, nofollow`).

---

## 3. Psychometric Release Manifest

Os quatro instrumentos canônicos encontram-se rigorosamente padronizados:
- **GAD-7 (Ansiedade):** 7 itens, escore 0-21, triagem educativa.
- **PHQ-9 (Depressão):** 9 itens, escore 0-27, triagem educativa com alerta de risco de automutilação.
- **ASRS v1.1 (TDAH Adultos):** 18 itens, rastreio de sintomas de desatenção e hiperatividade em adultos.
- **DASS-21 (Estresse, Ansiedade e Depressão):** 21 itens, escala tridimensional de estresse crônico, ansiedade e humor deprimido.

---

## 4. Privacy, CTA Pass, Smoke Matrix & YMYL Register

- **Privacy & Result-State:** Zero escores ou dados individuais indexados em sitemaps ou motores de busca.
- **Final CTA Pass:** O ecossistema de CTAs contextuais foi equilibrado (`RETAIN`, `REPOSITION`, `REPLACE_WITH_LINK`, `REMOVE`), eliminando loops automáticos conversivos.
- **Smoke Matrix:** Validadas as jornadas Informacional, Screening, Contextual e Cross-cluster em desktop e mobile (0 blockers / majors conhecidos).
- **YMYL Exception Register:** Mapeamento de claims de maior assertividade mantido sob estrito rigor científico e revisado.

---

## 5. Acceptance Gates RC-1 to RC-11 Verification

| Gate | Condição de Aprovação | Status | Evidência / Nota |
|---|---|---|---|
| **RC-1** | Lineage | **PASS** | Cadeia `1c869a62 → 18626026 → d3658977` reconciliada. |
| **RC-2** | Taxonomy | **PASS** | Sono classificado como `CROSS_CLUSTER_TOPIC`; zero quinto cluster. |
| **RC-3** | Scope Freeze | **PASS** | Manifesto definitivo de 42 URLs congelado. |
| **RC-4** | Psychometrics | **PASS** | GAD-7, PHQ-9, ASRS e DASS-21 documentados e sem regressão. |
| **RC-5** | Privacy | **PASS** | Zero exposição de resultados individuais (noindex estrito). |
| **RC-6** | CTA Safety | **PASS** | Ecossistema de CTAs proporcional e não mecânico. |
| **RC-7** | Journeys | **PASS** | Smoke Matrix aprovada em desktop e mobile (zero blocker/major). |
| **RC-8** | YMYL Package | **PASS** | Registro de exceções preparado para revisão humana. |
| **RC-9** | Artifact Integrity | **PASS** | Pacote reproduzível e rastreável sob checkpoint `d3658977`. |
| **RC-10** | Regression | **PASS** | 63/63 testes `Vitest` aprovados e build de produção sem erros. |
| **RC-11** | Governance | **PASS** | ADS V1.1 FROZEN, AUTOPUBLISH DISABLED, zero deploy público realizado. |

---

## 6. Conclusion & Next Steps

A **Missão RC-01 Canônica** foi integralmente concluída com sucesso. O Release Candidate encontra-se selado sob o checkpoint **`d3658977`**. Nenhuma publicação pública foi realizada, mantendo **`AUTOPUBLISH = DISABLED`**. O relatório canônico e o artefato estão prontos para a transição definitiva à missão **FRG-01 / PD-01** mediante autorização explícita do revisor humano.
