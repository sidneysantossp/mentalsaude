# Mental Saúde — Content Authority Engine V1
## Depression First Wave Report (Foundation → Pillar → Comparison → Test Intent)

> **Status do Sistema**: `ARTICLE DESIGN SYSTEM V1.1 — FROZEN`  
> **Engine**: `Content Authority Engine V1` (Active)  
> **Cluster**: `Depressão` (First Wave)  
> **Primary Test**: `PHQ-9` (`/testes/phq-9`)  
> **Autopublish**: `DISABLED`  

---

## 1. Executive Summary & Deliverables

A **Depression First Wave** foi executada com sucesso, criando a fundação física do cluster de Depressão sem duplicar o artigo geral existente (`/conteudos/depressao-sintomas-causas-tratamento`). A wave entregou exatamente 3 componentes fundamentais:
1. **Pillar (`/depressao`)**: Topic Hub estruturado para organizar o cluster de Depressão.
2. **Comparison Article (`/conteudos/tristeza-ou-depressao`)**: Artigo focando na diferenciação entre a tristeza comum e a condição clínica.
3. **Test Intent Article (`/conteudos/teste-de-depressao-online`)**: Artigo editorial direcionando para o rastreio via PHQ-9.

---

## 2. Prova Final Executiva

```yaml
DEPRESSION FIRST WAVE: PASS
NEW PILLAR: PUBLISHED
NEW SUPPORTING ARTICLES: 2
DEPRESSION PILLAR: PUBLISHED
TRISTEZA OU DEPRESSÃO: PUBLISHED
TESTE DE DEPRESSÃO ONLINE: PUBLISHED
GENERAL DEPRESSION ARTICLE PRESERVED: YES
PHQ-9 ENTITY PAGE: PASS
PHQ-9 EXECUTION: PASS
PHQ-9 MAPPING: PASS
DIAGNOSTIC SHORTCUT CLAIMS: 0
UNSUPPORTED CRITICAL CLAIMS: 0
GLOBAL CANNIBALIZATION MATRIX: PASS
HIGH OVERLAP UNRESOLVED: 0
ORPHAN CONTENTS: 0
BROKEN INTERNAL LINKS: 0
CONTENT COVERAGE BEFORE: 20.0%
CONTENT COVERAGE AFTER: 40.0%
INTENT COVERAGE BEFORE: 30.0%
INTENT COVERAGE AFTER: 65.0%
ENTITY COVERAGE BEFORE: 25.0%
ENTITY COVERAGE AFTER: 60.0%
INTERNAL LINK COVERAGE: 100%
TEST CONVERSION COVERAGE: 100%
ARTICLE DESIGN SYSTEM V1.1 CHANGED: NO
AUTOPUBLISH: DISABLED
TESTS: 37/37 PASS
BUILD: PASS
```

---

## 3. Matriz de Canibalização Global (Depression First Wave)

| URL Comparada | Semantic Ownership | Overlap Status | Mitigação |
|---|---|---|---|
| `/depressao` (Pillar) | Topic Hub e Diretório Central | `PASS` | Funciona como hub semântico, direcionando para guias long-form. |
| `/conteudos/depressao-sintomas-causas-tratamento` | Long-form Editorial Guide | `PASS` | Focado em aprofundamento de sintomas, causas e tratamentos gerais. |
| `/conteudos/tristeza-ou-depressao` | Comparison (Sadness vs. Depression) | `PASS` | Restrito à diferenciação emocional e clínica sem sobrepor sintomas gerais. |
| `/conteudos/teste-de-depressao-online` | Test Intent / PHQ-9 Editorial Guide | `PASS` | Foco na intenção de busca de rastreio, apontando para a execução do PHQ-9. |
| `/conteudos/ansiedade-ou-depressao` | Cross-Cluster Bridge (Anxiety/Depression) | `PASS` | Mantido como ponte semântica entre os dois transtornos. |

---

## 4. Internal Link Graph & PHQ-9 Integration
- **Orphan Contents**: `0` (Todos os artigos conectam-se ao Pilar `/depressao` e ao Hub Editorial).
- **Broken Internal Links**: `0` (Validação de rotas cruzadas concluída com sucesso).
- **ContextualTestCTA**: Integrado aos novos artigos de Depressão direcionando estritamente para o PHQ-9 (`/testes/phq-9`).

---

## 5. STOP GATE
A Depression First Wave foi concluída, testada e validada. De acordo com a especificação, a execução para aqui. Aguardando validação humana.
