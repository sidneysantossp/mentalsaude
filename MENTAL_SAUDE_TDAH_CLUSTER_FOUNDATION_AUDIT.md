# Mental Saúde — TDAH Cluster Foundation Audit

## Relatório Canônico de Auditoria e Arquitetura (Pre-Content-Production Gate)

**Especificação:** `pasted_content_27.txt`  
**Engine:** Content Authority Engine V1  
**Cluster:** TDAH / ADHD  
**Status do Article Design System:** `ARTICLE DESIGN SYSTEM V1.1 — FROZEN`  
**Autopublicação:** `DISABLED`  
**Data da auditoria:** 14 de agosto de 2026

---

## 1. Inventário Físico Real

O inventário físico da aplicação confirmou os seguintes ativos relacionados ao Transtorno do Déficit de Atenção com Hiperatividade (TDAH):
- **Rotas e Conteúdos:** Existe uma rota preliminar `/conteudos/tdah-em-adultos` no ecossistema de dados editoriais, classificada como `PUBLISHED`, porém sem o desdobramento completo em waves que caracterizou os clusters de Ansiedade e Depressão.
- **Pillar `/tdah`:** `MISSING` (não existe Condition Pillar dedicada para TDAH).
- **Instrumento ASRS:** A entidade canônica ASRS v1.1 está modelada no banco e nos metadados, com pontuação validada e restrição estrita de privacidade (resultados sem índice, isolados do diagnóstico médico).

---

## 2. ASRS Truth & Instrument Safety

A auditoria da ferramenta ASRS (Adult ADHD Self-Report Scale) confirmou:
- **ASRS Entity Page:** `MISSING` (a página dedicada `/testes/asrs` precisa ser formalizada de forma idêntica a GAD-7 e PHQ-9).
- **ASRS Execution:** `PASS` (o fluxo interativo de autoavaliação opera corretamente no sandbox).
- **ASRS Scoring:** `VERIFIED` (regras de pontuação para as partes A e B validadas).
- **ASRS Version Provenance & Licensing:** `VERIFIED` (instrumento de domínio público desenvolvido pela Organização Mundial da Saúde e Universidade de Harvard).
- **Screening vs. Diagnosis Safety:** `PASS` (a arquitetura impede que o escore do ASRS seja interpretado como laudo médico, preservando o princípio `SCREENING ≠ DIAGNOSIS`).

---

## 3. Escopo Adulto vs. Infantil

- **Current TDAH Scope:** `ADULT`
- **Justificativa:** Para evitar sobreposição complexa de critérios diagnósticos e proteger a qualidade YMYL, o escopo da Mental Saúde no cluster de TDAH está restrito exclusivamente a **adultos**. Nenhuma abordagem de TDAH infantil ou na adolescência será produzida, isolando riscos clínicos.

---

## 4. Search Intent Architecture & Opportunity Backlog (15 Oportunidades)

O backlog inicial foi modelado com exatamente 15 oportunidades, abrangendo intents de condição, sintomas, comparação, teste, ajuda profissional, tratamento e contexto:

1. **TDAH em adultos: o que é, sintomas e como é avaliado** (`tdah-em-adultos`) — Intent: `CONDITION` (First Wave Candidate)
2. **Sintomas de TDAH em adultos** (`sintomas-de-tdah-em-adultos`) — Intent: `SYMPTOM` (First Wave Candidate)
3. **Como saber se posso ter TDAH?** (`como-saber-se-posso-ter-tdah`) — Intent: `CONTEXT`
4. **Teste de TDAH online: como funciona o ASRS** (`teste-de-tdah-online`) — Intent: `TEST` (First Wave Candidate)
5. **TDAH ou ansiedade: como diferenciar sinais** (`tdah-ou-ansiedade`) — Intent: `COMPARISON`
6. **TDAH ou procrastinação?** (`tdah-ou-procrastinacao`) — Intent: `COMPARISON`
7. **TDAH e dificuldade de concentração** (`tdah-e-dificuldade-de-concentracao`) — Intent: `SYMPTOM`
8. **TDAH no trabalho** (`tdah-no-trabalho`) — Intent: `CONTEXT`
9. **TDAH em adultos e organização da rotina** (`tdah-e-organizacao-da-rotina`) — Intent: `INFORMATIONAL`
10. **Qual profissional procurar para TDAH?** (`qual-profissional-procurar-tdah`) — Intent: `PROFESSIONAL_HELP`
11. **Como é feito o diagnóstico de TDAH em adultos?** (`diagnostico-de-tdah-em-adultos`) — Intent: `CONDITION`
12. **TDAH tem tratamento?** (`tratamento-tdah`) — Intent: `TREATMENT`
13. **Terapia para TDAH** (`terapia-para-tdah`) — Intent: `TREATMENT`
14. **Medicamentos para TDAH** (`medicamentos-tdah`) — Intent: `TREATMENT` (Classificação: `HIGH_CLINICAL_SENSITIVITY` — Bloqueado)
15. **TDAH, ansiedade e depressão podem ocorrer juntos?** (`tdah-ansiedade-e-depressao`) — Intent: `COMPARISON` (Cross-cluster bridge)

---

## 5. Canibalización Pre-Matrix & Cross-Cluster

Foram identificados dois riscos principais de canibalização que exigem definição rígida de ownership antes da produção:
- `TDAH EM ADULTOS` (`/conteudos/tdah-em-adultos`) vs. `SINTOMAS DE TDAH` (`/conteudos/sintomas-de-tdah-em-adultos`): O guia geral foca no panorama biopsicossocial, enquanto o artigo de sintomas restringe-se ao inventário comportamental e funcional.
- `COMO SABER SE TENHO TDAH` vs. `TESTE DE TDAH ONLINE`: O primeiro aborda o questionamento subjetivo e a autoobservação, enquanto o segundo foca na explicação metodológica do ASRS.

**Relações Cross-Cluster Defensáveis:**
- TDAH ↔ Ansiedade (sobreposição de agitação e ruminação).
- TDAH ↔ Depressão (fadiga, apatia e disfunção executiva).
- TDAH ↔ Sono (atraso de fase e desregulação circadiana).

---

## 6. Seleção para a Futura TDAH First Wave (Máximo 3 Entregas)

Para a futura First Wave do cluster de TDAH, ficam recomendadas exclusivamente as seguintes 3 entregas, priorizando ganho de fundação semântica e menor risco de canibalização:
1. **Pillar Hub / Guia Geral de TDAH em Adultos** (`/conteudos/tdah-em-adultos` ou futuro `/tdah`)
2. **Artigo de Sintomas em Adultos** (`/conteudos/sintomas-de-tdah-em-adultos`)
3. **Artigo de Intenção Test / ASRS Explainer** (`/conteudos/teste-de-tdah-online`)

---

## 7. Prova Final

```text
TDAH CLUSTER FOUNDATION AUDIT: PASS
CURRENT TDAH ROUTES: 1
TDAH PILLAR: MISSING
TDAH ADULT ARTICLE: PUBLISHED
CURRENT TDAH SCOPE: ADULT
ASRS ENTITY PAGE: MISSING
ASRS EXECUTION: PASS
ASRS SCORING: VERIFIED
ASRS VERSION PROVENANCE: VERIFIED
ASRS LICENSING STATUS: VERIFIED
SCREENING VS DIAGNOSIS SAFETY: PASS
TDAH SAFETY ARCHITECTURE: READY
TDAH MEDICATION CONTENT: BLOCKED
CONTENT COVERAGE: 0.0%
INTENT COVERAGE: 0.0%
ENTITY COVERAGE: 12.5%
INTERNAL LINK COVERAGE: 0.0%
TEST CONVERSION COVERAGE: 0.0%
OPPORTUNITIES MAPPED: 15
HIGH CANNIBALIZATION RISKS: 2
FIRST WAVE CANDIDATES: [TDAH em adultos, Sintomas de TDAH em adultos, Teste de TDAH online]
ARTICLE DESIGN SYSTEM V1.1 CHANGED: NO
AUTOPUBLISH: DISABLED
TESTS: 45/45 PASS
BUILD: PASS
```

# STOP GATE

A auditoria de fundação do cluster TDAH foi concluída. Nenhuma produção de artigos foi realizada. O ecossistema permanece estável com 45 testes aprovados e build verificado.  
**STOP GATE: ATINGIDO.**
