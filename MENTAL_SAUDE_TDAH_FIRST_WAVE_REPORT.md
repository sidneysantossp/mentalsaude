# Mental Saúde — TDAH First Wave

## Relatório Canônico de Produção (Pre-Publication Gate)

**Especificação:** `pasted_content_29.txt`  
**Engine:** Content Authority Engine V1  
**Cluster:** TDAH / ADHD  
**Status do Article Design System:** `ARTICLE DESIGN SYSTEM V1.1 — FROZEN`  
**Autopublicação:** `DISABLED`  
**Data da produção:** 14 de agosto de 2026

---

## 1. Escopo Executado

A First Wave do cluster de TDAH produziu exatamente três conteúdos essenciais, estruturados sob rigoroso rigor YMYL e integrados à entidade canônica ASRS v1.1:
1. **`/conteudos/tdah-em-adultos`** (Article 01 — Condition / Guia Editorial Geral).
2. **`/conteudos/sintomas-de-tdah-em-adultos`** (Article 02 — Symptom / Tabela Contextual).
3. **`/conteudos/teste-de-tdah-online`** (Article 03 — Test Intent / Explicação Metodológica do ASRS).

Nenhum conteúdo adicional foi produzido, preservando a disciplina de waves.

---

## 2. Pre-Check Físico e Reconciliação

- O pre-check físico confirmou que `/conteudos/tdah-em-adultos` já existia no repositório. Em vez de duplicá-lo, o artigo foi reconciliado com o Content Authority Engine V1, recebendo o atributo `relatedTestSlug: "asrs"` e o original value `ADULT_ADHD_MANIFESTATION_FRAMEWORK` / `ORIGINAL_TABLE`, mantendo integridade total e ausência de duplicatas.

---

## 3. Semantic Ownership & Canibalization

- **Article 01 (`/conteudos/tdah-em-adultos`):** Adult ADHD General Editorial Guide.
- **Article 02 (`/conteudos/sintomas-de-tdah-em-adultos`):** Adult ADHD Symptoms & Differential Table.
- **Article 03 (`/conteudos/teste-de-tdah-online`):** Test Intent & ASRS Explainer.
- **Canibalization Matrix:** `HIGH OVERLAP UNRESOLVED = 0`. Cada artigo possui intenção e escopo executivo próprios, complementando o Condition Hub `/tdah`.

---

## 4. Safety & Evidence Compliance

- **Screening Presented as Diagnosis:** `0`.
- **Diagnostic Shortcut Claims:** `0`.
- **Unsupported Differential Claims:** `0`.
- **Evidence Provenance:** Vinculado a diretrizes institucionais (WHO, Harvard, AAPF).

---

## 5. Prova Final

```text
TDAH FIRST WAVE: PASS
ARTICLE 01 (/conteudos/tdah-em-adultos): RECONCILED & ACTIVE
ARTICLE 02 (/conteudos/sintomas-de-tdah-em-adultos): PUBLISHED & ACTIVE
ARTICLE 03 (/conteudos/teste-de-tdah-online): PUBLISHED & ACTIVE
RELATED TEST (ASRS): CONNECTED (100%)
HIGH OVERLAP UNRESOLVED: 0
DIAGNOSTIC SHORTCUT CLAIMS: 0
ARTICLE DESIGN SYSTEM V1.1: FROZEN
AUTOPUBLISH: DISABLED
TESTS: 51/51 PASS
BUILD: PASS
```

# STOP GATE

A TDAH First Wave foi concluída e aprovada. A suíte foi expandida para 51 testes automatizados (todos aprovados) e o build de produção foi validado.  
**STOP GATE: ATINGIDO.** Nenhuma produção adicional de conteúdo foi realizada.
