# Relatório Canônico: Stress Cluster Foundation Audit (Pre-Content-Production Gate)

Este documento registra os resultados oficiais da **Stress Cluster Foundation Audit** na plataforma **Mental Saúde**, operando sob o **Content Authority Engine V1** e o **Article Design System V1.1 (FROZEN)**.

---

## 1. Inventário Físico Real e Verdade do Pillar

- **Inventário de Rotas e Conteúdos:** A varredura física do repositório confirmou que os clusters anteriores (Ansiedade, Depressão e TDAH) encontram-se completos e congelados. No que tange ao estresse, não existem artigos publicados específicos para o cluster.
- **Stress Pillar Status (`/estresse`):** **`STRESS PILLAR: MISSING`**. A rota de Condition Pillar para estresse ainda não foi criada, estabelecendo o cenário ideal para uma modelagem arquitetural limpa e sem legado desatualizado.
- **Instrumento DASS-21:** O instrumento **Depression, Anxiety and Stress Scale (DASS-21)** encontra-se plenamente implementado na base canônica de testes e no catálogo público, servindo como o instrumento multiescala oficial de rastreio para as dimensões de estresse, ansiedade e depressão.

---

## 2. Entity Model e Boundaries Semânticos

- **Primary Entity:** `STRESS` (Resposta psicofisiológica adaptativa a demandas, pressões e estressores contextuais).
- **Secondary Entities:** `STRESS_RESPONSE`, `EMOTIONAL_STRESS`, `COGNITIVE_STRESS`, `PHYSICAL_STRESS_SYMPTOMS`, `WORK_STRESS`, `SLEEP`, `FATIGUE`, `IRRITABILITY`, `ANXIETY`, `DEPRESSION`, `BURNOUT`, `DASS-21`.
- **Stress vs. Anxiety Boundary:** Estresse é concebido como a resposta a demandas e pressões contextuais, enquanto ansiedade é classificada como uma condição/sintomatologia com preocupação persistente, medo e antecipação, mantendo separação semântica sem saltos diagnósticos.
- **Stress vs. Burnout Boundary:** Burnout não é tratado como sinônimo de estresse genérico; restringe-se ao esgotamento profissional crônico, exigindo tratamento editorial diferenciado.

---

## 3. Backlog Inicial de 15 Oportunidades do Cluster Estresse

A modelagem de oportunidades para o futuro cluster de Estresse contempla os seguintes itens prioritários:

| # | Título Provisório | Slug Proposto | Intent Principal | Funnel | YMYL |
|---|---|---|---|---|---|
| 01 | Estresse: o que é, sintomas e quando procurar ajuda | `/estresse` (Pillar) | `CONDITION` | TOFU | `YMYL_REVIEW` |
| 02 | Sintomas de estresse: sinais físicos, emocionais e cognitivos | `/conteudos/sintomas-de-estresse` | `SYMPTOM` | TOFU | `YMYL_REVIEW` |
| 03 | Como saber se estou muito estressado? | `/conteudos/como-saber-se-estou-muito-estressado` | `INFORMATIONAL` | TOFU | `YMYL_REVIEW` |
| 04 | Teste de estresse online: como funciona o DASS-21 | `/conteudos/teste-de-estresse-online` | `TEST` | BOFU | `YMYL_REVIEW` |
| 05 | Estresse ou ansiedade: como diferenciar | `/conteudos/estresse-ou-ansiedade` | `COMPARISON` | MOFU | `YMYL_REVIEW` |
| 06 | Estresse pode causar falta de ar? | `/conteudos/estresse-causa-falta-de-ar` | `SYMPTOM` | MOFU | `YMYL_REVIEW` |
| 07 | Estresse pode causar dor de cabeça? | `/conteudos/estresse-causa-dor-de-cabeca` | `SYMPTOM` | MOFU | `YMYL_REVIEW` |
| 08 | Estresse pode causar palpitação? | `/conteudos/estresse-causa-palpitacao` | `SYMPTOM` | MOFU | `YMYL_REVIEW` |
| 09 | Estresse e sono: qual é a relação? | `/conteudos/estresse-e-sono` | `CONTEXT` | MOFU | `YMYL_REVIEW` |
| 10 | Estresse no trabalho: sinais e impacto na rotina | `/conteudos/estresse-no-trabalho` | `WORK` | MOFU | `YMYL_REVIEW` |
| 11 | Estresse ou burnout: qual é a diferença? | `/conteudos/estresse-ou-burnout` | `COMPARISON` | MOFU | `YMYL_REVIEW` |
| 12 | Como aliviar o estresse? | `/conteudos/como-aliviar-o-estresse` | `TREATMENT / MANAGEMENT` | MOFU | `YMYL_REVIEW` |
| 13 | Quando procurar um psicólogo por estresse? | `/conteudos/quando-procurar-psicologo-estresse` | `PROFESSIONAL_HELP` | MOFU | `YMYL_REVIEW` |
| 14 | Estresse crônico: o que significa? | `/conteudos/estresse-cronico` | `CONDITION` | MOFU | `YMYL_REVIEW` |
| 15 | Estresse, ansiedade e depressão podem acontecer juntos? | `/conteudos/estresse-ansiedade-e-depressao` | `COMPARISON` | MOFU | `YMYL_REVIEW` |

---

## 4. Diretrizes de Canibalização Pré-Matriz e Sintomas Físicos

- **Canibalização Preventiva:** Os pares de alto risco (Guia Geral vs. Sintomas, Como saber se estou estressado vs. Teste DASS-21, Estresse vs. Ansiedade) terão seções cruzadas e intents isoladas para garantir **High Overlap Unresolved = 0** no momento da publicação.
- **Sintomas Físicos:** As intenções de sintomas específicos (falta de ar, dor de cabeça, palpitação) serão avaliadas para consolidação ou articulação cruzada com o artigo central de sintomas para evitar proliferação desnecessária de URLs.
- **Safety Architecture:** O DASS-21 e os conteúdos de estresse manterão a regra estrita de que **Screening / Self-Report ≠ Clinical Diagnosis**, sem atalhos diagnósticos e com proveniência de evidências vinculada a diretrizes científicas.

---

## 5. Conclusão e Status do Gate

- **Testes Automatizados:** 63/63 testes aprovados.
- **Build de Produção:** Aprovado.
- **Pre-Content-Production Gate:** **ATINGIDO**.
- **AUTOPUBLISH:** **DISABLED**.
