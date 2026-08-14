# Mental Saúde — Content Authority Engine V1
## Depression Cluster Foundation Audit Report (Pre-Content-Production Gate)

> **Status do Sistema**: `ARTICLE DESIGN SYSTEM V1.1 — VERIFIED / FROZEN`  
> **Engine**: `Content Authority Engine V1` (Active)  
> **Cluster**: `Depressão` (Foundation Audit)  
> **Primary Test**: `PHQ-9` (Active & Verified)  
> **Autopublish**: `DISABLED`  

---

## 1. Inventário Real de Rotas e Estado Operacional

| Rota / Entidade | Status Real | HTTP | Indexabilidade | Canonical | Schema | Observações |
|---|---|---|---|---|---|---|
| `/depressao` | `MISSING` | 404/Redirect | N/A | N/A | N/A | Pilar principal ainda não construído. |
| `/conteudos/depressao-sintomas-causas-tratamento` | `PUBLISHED` | 200 | Indexável | Correto | Article / MedicalWebPage | Guia geral existente de depressão. |
| `PHQ-9` (`/testes/phq-9`) | `PUBLISHED` | 200 | Indexável (Entity) / Noindex (Results) | Correto | MedicalTest | Teste canônico validado e funcional. |
| `/conteudos/ansiedade-ou-depressao` | `PUBLISHED` | 200 | Indexável | Correto | Article | Ponte semântica entre Ansiedade e Depressão. |

---

## 2. Auditoria do Artigo Existente (`depressao-sintomas-causas-tratamento`)
- **Semantic Ownership**: `DEPRESSION GENERAL EDITORIAL GUIDE`
- **Qualidade Editorial & Profundidade**: Atende ao Article Design System V1.1 (DirectAnswer, EvidenceBox, TableOfContents sticky, ScientificCitation inline).
- **Evidence Provenance**: Suportado por referências da OMS e NIMH.
- **YMYL & Safety**: Requer revisão contínua de linguagem diagnóstica, mas cumpre os padrões de segurança vigentes.

---

## 3. Pillar Truth e PHQ-9 Truth
- **Depression Pillar (`/depressao`)**: `MISSING`. Nenhuma página pilar de nível de cluster foi publicada para Depressão.
- **PHQ-9 (`/testes/phq-9`)**: `VERIFIED`. A entidade canônica está plenamente operacional, com fluxo de execução isolado, escoragem validada, restrição de indexação em páginas privadas de resultado e compatibilidade com o Content Authority Engine.

---

## 4. Cross-Cluster Relationship (`ansiedade-ou-depressao`)
- **Semantic Ownership**: `ANXIETY VS DEPRESSION COMPARISON`
- **Análise**: Funciona como uma excelente ponte semântica bidirecional. Não deve assumir o papel de Pilar de Depressão, mas servirá como link de entrada natural para futuros artigos do cluster de Depressão.

---

## 5. Modelo de Entidades e Intents
- **Primary Entity**: `DEPRESSION`
- **Secondary Entities**: `DEPRESSIVE_SYMPTOMS`, `LOW_MOOD`, `ANHEDONIA`, `SLEEP`, `APPETITE`, `FATIGUE`, `CONCENTRATION`, `PSYCHOTHERAPY`, `PSYCHIATRY`, `ANTIDEPRESSANT_MEDICATION`, `PHQ-9`.
- **Search Intent Coverage**: Mapeadas intenções `INFORMATIONAL`, `SYMPTOM`, `CONDITION`, `COMPARISON`, `TEST`, `TREATMENT`, `PROFESSIONAL_HELP`, `CONTEXT`, `EVIDENCE`.

---

## 6. Backlog Editorial Inicial (15 Oportunidades Propostas)

| # | Título Provisional | Slug Proposto | Primary Intent | Funnel | YMYL Level | Ação de Auditoria |
|---|---|---|---|---|---|---|
| 01 | Depressão: sintomas, causas e tratamento | `depressao-sintomas-causas-tratamento` | `INFORMATIONAL` | TOFU | `YMYL_REVIEW` | `KEEP` (Já publicado) |
| 02 | Sintomas de depressão: sinais emocionais e físicos | `sintomas-de-depressao` | `SYMPTOM` | TOFU | `YMYL_REVIEW` | `KEEP` |
| 03 | Como saber se posso estar com depressão? | `como-saber-se-estou-com-depressao` | `CONDITION` | TOFU | `EDUCATIONAL` | `KEEP` |
| 04 | Tristeza ou depressão: qual é a diferença? | `tristeza-ou-depressao` | `COMPARISON` | TOFU | `EDUCATIONAL` | `KEEP` |
| 05 | Depressão pode causar cansaço e fadiga extrema? | `depressao-cansaco-falta-de-energia` | `SYMPTOM` | TOFU | `YMYL_REVIEW` | `KEEP` |
| 06 | Depressão e sono: insônia e hipersonia | `depressao-e-sono` | `CONTEXT` | MOFU | `YMYL_REVIEW` | `KEEP` |
| 07 | Falta de motivação e anedonia na depressão | `anedoniana-depressao-falta-de-motivacao` | `SYMPTOM` | MOFU | `YMYL_REVIEW` | `KEEP` |
| 08 | Teste de depressão online: como funciona o PHQ-9 | `teste-de-depressao-online-phq-9` | `TEST` | BOTTOM | `EDUCATIONAL` | `KEEP` |
| 09 | Qual profissional procurar para depressão? | `qual-profissional-procurar-depressao` | `PROFESSIONAL_HELP` | MOFU | `EDUCATIONAL` | `KEEP` |
| 10 | Depressão tem tratamento? Conheça as abordagens | `tratamento-para-depressao` | `TREATMENT` | MOFU | `YMYL_REVIEW` | `KEEP` |
| 11 | Terapia para depressão: eficácia e métodos | `terapia-para-depressao` | `TREATMENT` | MOFU | `YMYL_REVIEW` | `KEEP` |
| 12 | Medicamentos antidepressivos no tratamento | `medicamentos-para-depressao` | `TREATMENT` | MOFU | `HIGH_CLINICAL_SENSITIVITY` | `KEEP` (Com restrição de segurança) |
| 13 | Ansiedade e depressão: comorbidade clínica | `ansiedade-ou-depressao` | `COMPARISON` | MOFU | `YMYL_REVIEW` | `KEEP` (Já publicado no cluster Ansiedade) |
| 14 | Depressão tem cura? O que significa remissão | `depressao-tem-cura` | `INFORMATIONAL` | MOFU | `YMYL_REVIEW` | `KEEP` |
| 15 | Como ajudar alguém com sinais de depressão | `como-ajudar-alguém-com-depressao` | `PROFESSIONAL_HELP` | TOFU | `EDUCATIONAL` | `KEEP` |

---

## 7. Prontidão de Segurança e Conclusão

- **Depression Safety Architecture**: `READY` (Os gates de YMYL, verificação de fontes primárias e bloqueio de linguagem diagnóstica absoluta estão operacionais).
- **Crisis-Sensitive Content**: Identificado como requisito mandatório para artigos de sintomas severos e ideação (proteção editorial e aviso de apoio humanizado CVV 188).
- **Status do Gate**: **Pre-Content-Production Gate Aprovado**. A fundação está modelada, sem produção acrítica de artigos.

---

## 8. STOP GATE
A auditoria de fundação do cluster de Depressão foi concluída. De acordo com a especificação, a execução para aqui. Aguardando autorização humana para iniciar a First Wave de Depressão.
