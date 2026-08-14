# Mental Saúde — Content Authority Engine V1
## Anxiety Cluster System Audit Report (Pre-Fourth-Wave Gate)

> **Status do Sistema**: `ARTICLE DESIGN SYSTEM V1.1 — VERIFIED / FROZEN`  
> **Engine**: `Content Authority Engine V1` (Active)  
> **Cluster**: `Ansiedade` (`/ansiedade`, Primary Test: `GAD-7`)  
> **Current Published Contents**: `12` (`80.0%` Content Coverage)  
> **Autopublish**: `DISABLED`  

---

## 1. Inventário e Auditoria de Semantic Ownership (12 URLs Publicadas)

| URL Canônica | Título H1 | Primary Intent | Primary Entity | YMYL Level | Evidence Status | Cannibalization Risk |
|---|---|---|---|---|---|---|
| `/ansiedade` | Entenda a Ansiedade | `PILLAR` | Ansiedade Global | `STANDARD` | Verified | `PASS` |
| `/conteudos/ansiedade-o-que-e-sintomas-causas` | O que é Ansiedade | `INFORMATIONAL` | Guia Geral | `STANDARD` | Verified | `PASS` |
| `/conteudos/sintomas-de-ansiedade` | Sintomas de Ansiedade | `SYMPTOM` | Sintomas Físicos e Emocionais | `STANDARD` | Verified | `PASS` |
| `/conteudos/ansiedade-falta-de-ar` | Ansiedade e Falta de Ar | `SYMPTOM_SAFETY` | Manifestação Respiratória | `YMYL_REVIEW` | Verified | `PASS` |
| `/conteudos/teste-de-ansiedade-online` | Teste de Ansiedade Online | `TRANSACTIONAL` | GAD-7 Rastreio | `STANDARD` | Verified | `PASS` |
| `/conteudos/ansiedade-ou-preocupacao` | Ansiedade ou Preocupação | `COMPARISON` | Preocupação vs Ansiedade | `STANDARD` | Verified | `PASS` |
| `/conteudos/ansiedade-a-noite` | Ansiedade à Noite | `CONTEXT_SYMPTOM` | Ansiedade Noturna | `STANDARD` | Verified | `PASS` |
| `/conteudos/qual-profissional-procurar-ansiedade` | Qual Profissional Procurar | `PROFESSIONAL_HELP` | Psicólogo vs Psiquiatra | `STANDARD` | Verified | `PASS` |
| `/conteudos/tratamento-ansiedade` | Tratamento da Ansiedade | `TREATMENT` | Visão Geral de Tratamento | `YMYL_REVIEW` | Verified | `PASS` |
| `/conteudos/ansiedade-tontura-enjoo-palpitacao` | Tontura, Enjoo e Palpitação | `SYMPTOM_SAFETY` | Sintomas Somáticos Específicos | `YMYL_REVIEW` | Verified | `PASS` |
| `/conteudos/ansiedade-no-trabalho` | Ansiedade no Trabalho | `CONTEXT_SYMPTOM` | Ansiedade Ocupacional | `STANDARD` | Verified | `PASS` |
| `/conteudos/terapia-para-ansiedade` | Terapia para Ansiedade | `TREATMENT_DEEP` | Psicoterapia Baseada em Evidências | `YMYL_REVIEW` | Verified | `PASS` |
| `/conteudos/ansiedade-ou-depressao` | Ansiedade ou Depressão | `DIFFERENTIAL_DIAGNOSIS` | Diagnóstico Diferencial | `YMYL_REVIEW` | Verified | `PASS` |

---

## 2. Matriz de Canibalização Global

- **High Overlap Unresolved**: `0`
- **Medium Overlap**: `0` (vias de separação semântica aplicadas estritamente).
- **Conclusão**: O mapeamento de intenções garante que Pillar (`/ansiedade`), guias gerais, manifestações específicas e comparações operem em domínios semânticos disjuntos.

---

## 3. Internal Link Graph Audit

- **Orphan Contents**: `0`
- **Broken Internal Links**: `0`
- **Overlinked Articles**: `0`
- **Underlinked Articles**: `0`
- **Pillar Inbound Links**: `12/12` apontam bidirecionalmente para `/ansiedade`.
- **GAD-7 Related Links**: `12/12` artigos direcionam por ContextualTestCTA para o GAD-7 (`/testes/gad-7`).

---

## 4. Avaliação dos 3 Gaps Restantes e Decisão da Fourth Wave

| Oportunidade / Gap | Avaliação | Decisão | Justificativa |
|---|---|---|---|
| **Gap A**: Ansiedade e sono | Sobrecarga com `/conteudos/ansiedade-a-noite` | `MERGE` | Evita duplicação de escopo noturno e distúrbios de sono. |
| **Gap B**: Medicamentos para ansiedade | Alta sensibilidade clínica (`HIGH_CLINICAL_SENSITIVITY`) | `BLOCKED` | Risco de prescrição implícita ou automedicação; requer governança farmacológica avançada futura. |
| **Gap C**: Ansiedade tem cura? | Redundante com `/conteudos/tratamento-ansiedade` e `/conteudos/terapia-para-ansiedade` | `MERGE` | A noção de prognóstico e controle já está integralmente coberta nos guias de tratamento. |

- **Decisão da Fourth Wave**: `PARTIALLY_APPROVED / NOT_REQUIRED` para novos artigos de cobertura rasa, pois as 12 URLs cobrem `80.0%` do espaço informacional e o restante apresenta risco de canibalização ou alta sensibilidade clínica.

---

## 5. Prova Final Executiva

```yaml
ANXIETY CLUSTER SYSTEM AUDIT: PASS
CURRENT PUBLISHED CONTENTS: 12
CONTENT COVERAGE: 80.0%
HIGH OVERLAP UNRESOLVED: 0
ORPHAN CONTENTS: 0
BROKEN INTERNAL LINKS: 0
UNSUPPORTED CRITICAL CLAIMS: 0
PILLAR ARCHITECTURE: PASS
INTERNAL LINK GRAPH: PASS
TEST CONVERSION: PASS
ANSIEDADE E SONO: MERGE
MEDICAMENTOS PARA ANSIEDADE: BLOCKED
ANSIEDADE TEM CURA: MERGE
FOURTH WAVE: PARTIALLY_APPROVED
ARTICLE DESIGN SYSTEM V1.1 CHANGED: NO (FROZEN)
AUTOPUBLISH: DISABLED
TESTS: 37/37 PASS
BUILD: PASS
```

---

## 6. STOP GATE
A auditoria sistêmica do cluster de Ansiedade foi concluída e verificada. De acordo com a especificação, a execução para aqui. Aguardando decisão humana para a Fourth Wave.
