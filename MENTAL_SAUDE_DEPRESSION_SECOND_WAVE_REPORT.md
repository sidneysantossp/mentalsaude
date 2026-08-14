# Mental Saúde — Depression Second Wave

## Relatório canônico de execução

**Especificação:** `pasted_content_25.txt`  
**Engine:** Content Authority Engine V1  
**Cluster:** Depressão  
**Status do Article Design System:** `ARTICLE DESIGN SYSTEM V1.1 — FROZEN`  
**Autopublicação:** `DISABLED`  
**Data da validação:** 14 de agosto de 2026

## 1. Resultado executivo

A **Depression Second Wave** foi executada com exatamente três novos conteúdos publicados, preservando o Article Design System V1.1 congelado e o PHQ-9 canônico. Os três artigos foram registrados no Content Authority Engine como oportunidades, briefs, evidências, links internos e gates de publicação. O fluxo `ContentOpportunity → ContentBrief → Evidence → Draft → Review → PublicationGate → Published Version` foi exercitado, e `canPublishContent` retornou `PASSED` para os três slugs.

> **DEPRESSION SECOND WAVE: PASS**

Os conteúdos publicados são os seguintes:

| Artigo | Rota | Intent | Ownership | Teste relacionado | Gate |
|---|---|---|---|---|---|
| Article 04 | `/conteudos/sintomas-de-depressao` | `SYMPTOM` | Sintomas de Depressão | PHQ-9 | `PASSED` |
| Article 05 | `/conteudos/qual-profissional-procurar-depressao` | `PROFESSIONAL_HELP` | Busca de Ajuda Profissional para Depressão | PHQ-9 | `PASSED` |
| Article 06 | `/conteudos/tratamento-depressao` | `TREATMENT` | Tratamento da Depressão | PHQ-9 | `PASSED` |

O Article 04 utiliza `SYMPTOM_MAP` e `ORIGINAL_TABLE`; o Article 05 utiliza `DECISION_FRAMEWORK`; e o Article 06 utiliza `EVIDENCE_SYNTHESIS` e `TREATMENT_OVERVIEW_FRAMEWORK`. Os três artigos mantêm os metadados do PHQ-9 por referência editorial (`relatedTestSlug`) e não duplicam questionário, scoring, número de perguntas, duração ou descrição do instrumento.

## 2. Reconciliação editorial

O artigo geral `/conteudos/depressao-sintomas-causas-tratamento` permaneceu como guia amplo da condição. O novo Article 04 tornou-se owner da intenção específica de manifestações emocionais, cognitivas, comportamentais e físicas. O Article 05 ficou restrito à navegação e decisão sobre busca de cuidado, sem estabelecer uma ordem universal entre psicólogo, psiquiatra e atenção primária. O Article 06 apresenta um panorama sintético de tratamento, mantendo limites explícitos para futuros conteúdos de psicoterapia e medicamentos.

A Pillar `/depressao` foi reorganizada em grupos semânticos de entendimento, sintomas, avaliação, comparações, tratamento e ajuda profissional. O conteúdo cross-cluster `/conteudos/ansiedade-ou-depressao` foi preservado como ponte entre Ansiedade e Depressão, sem substituição de ownership.

## 3. Registro no Content Authority Engine

O snapshot real do banco após a execução contém **17 oportunidades**, das quais **7 estão publicadas**: quatro anteriores à Second Wave e três novas. Foram confirmados **3 briefs**, **7 registros de evidence provenance**, **18 relações no Internal Link Graph** e **3 Publication Gates** avaliados com sucesso.

| Entidade | Quantidade real | Resultado |
|---|---:|---|
| Content Opportunities no cluster | 17 | Registradas |
| Oportunidades publicadas | 7 | 4 anteriores + 3 novas |
| Content Briefs da wave | 3 | Registrados |
| Evidence provenance da wave | 7 | Todos com URL e nível de evidência |
| Relações no Internal Link Graph | 18 | Auditadas |
| Publication Gates da wave | 3 | `PASSED` |
| Orphan contents | 0 | PASS |
| Broken internal links | 0 | PASS |

As evidências utilizaram WHO, NICE e o estudo de validação do PHQ-9 publicado no *Journal of General Internal Medicine*. Claims de tratamento foram associados a guideline NICE, guidance institucional WHO ou estudo de validação do PHQ-9, conforme a natureza do claim.

## 4. Publication Gates

A execução real de `canPublishContent` avaliou os 16 critérios configurados: entidade primária, alinhamento de intent, autoria, referências, qualidade da fonte, revisão clínica e científica, safety, original value, links internos, teste relacionado, metadados, canonical, schema e ausência de links quebrados ou órfãos.

| Artigo | Status | Critérios aprovados | Resultado de safety | Original value | PHQ-9 |
|---|---|---:|---|---|---|
| Article 04 — Sintomas | `PASSED` | 16/16 | `PASS` | `SYMPTOM_MAP + ORIGINAL_TABLE` | Mapeado |
| Article 05 — Profissional | `PASSED` | 16/16 | `PASS` | `DECISION_FRAMEWORK` | Mapeado |
| Article 06 — Tratamento | `PASSED` | 16/16 | `PASS` | `EVIDENCE_SYNTHESIS + TREATMENT_OVERVIEW_FRAMEWORK` | Mapeado |

Nenhum gate foi forçado. O gate passou porque os dados editoriais, as referências, a revisão, o mapeamento canônico, os links e os limites clínicos estavam presentes e foram avaliados.

## 5. Auditoria global de canibalização

A matriz comparou **15 pares**: cinco fontes do cluster publicadas contra os três candidatos da Second Wave. Foram considerados intent, semantic ownership, entidade primária e similaridade textual normalizada. A maior similaridade observada foi **0,16**, abaixo do limiar operacional de alto overlap. A matriz completa está em `cannibalization-matrix.json`.

| Indicador | Resultado |
|---|---:|
| Pares auditados | 15 |
| Maior similaridade | 0,16 |
| High overlap unresolved | 0 |
| Ação bloqueadora pendente | 0 |
| Global Cannibalization Matrix | `PASS` |

A divisão de ownership foi mantida: o guia geral permanece amplo; sintomas, busca de ajuda e tratamento ocupam intenções distintas. Não foram criados nesta missão artigos sobre antidepressivos, terapia em profundidade, sono, falta de energia, falta de motivação, cura, suporte a terceiros ou outras oportunidades do backlog.

## 6. Auditoria explícita de links e claims críticos

A auditoria adicional `MENTAL_SAUDE_DEPRESSION_SECOND_WAVE_AUDIT.json` validou cada target do Internal Link Graph contra as rotas editoriais e as entidades canônicas de teste. O resultado foi **18 links auditados, 0 broken internal links**. A mesma auditoria mapeou sete claims clínicos críticos para registros de `contentEvidence`, verificando claim, source, URL e evidence level.

| Controle explícito | Resultado |
|---|---:|
| Links auditados | 18 |
| Broken internal links | 0 |
| Claims críticos auditados | 7 |
| Unsupported critical claims | 0 |
| Critical treatment claims without source | 0 |
| Diagnostic shortcut claims | 0 |

O Article 04 não transforma contagem de sintomas em diagnóstico. O Article 05 não recomenda uma porta de entrada universal nem seleciona tratamento individual. O Article 06 não inclui prescrição, dosagem, comparação de medicamentos específicos, melhor antidepressivo, recomendação individual, promessa de cura, tempo garantido de resposta ou protocolo personalizado.

## 7. Internal Link Graph

O grafo conecta a Pillar aos conteúdos de suporte, o guia geral aos aprofundamentos, o artigo de sintomas ao guia geral, ao teste e à busca de cuidado, o artigo de ajuda profissional ao tratamento e ao guia geral, e o artigo de tratamento ao guia geral e à busca de cuidado. Os CTAs contextuais continuam seguindo o fluxo semântico `ARTICLE → PHQ-9 ENTITY PAGE → PHQ-9 EXECUTION → PRIVATE RESULT`.

A cobertura de links de saída dos conteúdos publicados foi calculada em **100%**, com **0 orphan contents** e **0 broken internal links**. O Article 05 também inclui link crawlable para `/testes/phq-9`, sem iniciar diretamente o questionário.

## 8. Cobertura real Before/After

Os números abaixo foram calculados diretamente do snapshot do banco no momento da auditoria. O estado anterior disponível no banco tinha 14 oportunidades e 4 publicadas; após a Second Wave, passou a ter 17 oportunidades e 7 publicadas. Essa reconciliação é explicitada para não substituir o estado real por uma métrica histórica presumida.

| Métrica | Before Second Wave | After Second Wave |
|---|---:|---:|
| Oportunidades consideradas | 14 | 17 |
| Conteúdo publicado | 4 | 7 |
| Content Coverage | 28,6% | 41,2% |
| Intent Coverage | 50,0% | 85,7% |
| Entity Coverage | 28,6% | 41,2% |
| Internal Link Coverage | — | 100% |
| Test Conversion Coverage | — | 100% |

O ganho mais expressivo ocorreu na **Intent Coverage**, pela publicação dos owners `SYMPTOM`, `PROFESSIONAL_HELP` e `TREATMENT`. Todas as três novas páginas possuem o PHQ-9 associado editorialmente, resultando em conversão contextual de teste de 100% entre os artigos publicados neste snapshot.

## 9. Backlog remanescente

Permanecem planejadas, sem produção nesta missão, as oportunidades `depressao-e-sono`, `falta-de-energia-depressao`, `falta-de-motivacao-depressao`, `terapia-para-depressao`, `medicamentos-antidepressivos`, `depressao-tem-cura`, `como-ajudar-alguem-com-depressao`, `depressao-trabalho-estudos`, `depressao-e-ansiedade-juntas` e `depressao-fases-da-vida`. O conteúdo de antidepressivos permanece apenas como oportunidade futura de alta sensibilidade clínica; nenhum artigo específico foi produzido.

## 10. High Clinical Sensitivity Readiness

> **HIGH CLINICAL SENSITIVITY READINESS: READY**

O engine permanece pronto para classificar futuramente a oportunidade de medicamentos como `HIGH_CLINICAL_SENSITIVITY`, porque ela continua planejada, não publicada, e o Article 06 mantém boundaries explícitos para não antecipar prescrição, dose ou comparação de medicamentos. Não há blocker para a classificação futura; a produção do conteúdo de antidepressivos permanece bloqueada nesta missão pelo STOP GATE.

## 11. Testes, build e visual QA

A suíte Vitest final preservou todos os testes existentes e adicionou cobertura específica para rotas da Second Wave, ownership, frameworks de original value, PHQ-9, safety, tratamento, links e canibalização.

| Verificação | Resultado |
|---|---:|
| Test files | 14/14 PASS |
| Tests | 45/45 PASS |
| Production build | `PASS` |
| TypeScript | 0 erros |
| Article 04 desktop/mobile | Validado no preview |
| Article 05 desktop | Validado no preview |
| Article 06 desktop/mobile | Validado no preview |
| Pillar `/depressao` | Validada no preview |
| Article Design System V1.1 changed | `NO` |

As capturas visuais confirmaram a preservação do Hero, Direct Answer, índice, Evidence Box, referências, Continue Explorando, ContextualTestCTA, barra de progresso e layout mobile. Não foi criado um novo sistema visual para esta wave.

## 12. Prova final

```text
DEPRESSION FIRST WAVE: PREVIOUSLY VERIFIED
DEPRESSION SECOND WAVE: PASS
NEW ARTICLES: 3
ARTICLE 04: PUBLISHED
ARTICLE 05: PUBLISHED
ARTICLE 06: PUBLISHED
ARTICLE 04 SAFETY: PASS
ARTICLE 05 PROFESSIONAL HELP SAFETY: PASS
ARTICLE 06 YMYL: PASS
CRITICAL TREATMENT CLAIM WITHOUT SOURCE: 0
DIAGNOSTIC SHORTCUT CLAIMS: 0
GLOBAL CANNIBALIZATION MATRIX: PASS
HIGH OVERLAP UNRESOLVED: 0
INTERNAL LINK GRAPH: PASS
ORPHAN CONTENTS: 0
BROKEN INTERNAL LINKS: 0
CONTENT COVERAGE BEFORE: 28.6%
CONTENT COVERAGE AFTER: 41.2%
INTENT COVERAGE BEFORE: 50.0%
INTENT COVERAGE AFTER: 85.7%
ENTITY COVERAGE BEFORE: 28.6%
ENTITY COVERAGE AFTER: 41.2%
INTERNAL LINK COVERAGE: 100%
TEST CONVERSION COVERAGE: 100%
PHQ-9 MAPPING: PASS
HIGH CLINICAL SENSITIVITY READINESS: READY
ARTICLE DESIGN SYSTEM V1.1 CHANGED: NO
AUTOPUBLISH: DISABLED
TESTS: 45/45 PASS
BUILD: PASS
```

## 13. STOP GATE

A Depression Second Wave foi concluída. Nenhuma Third Wave foi iniciada. Não foram produzidos artigos sobre antidepressivos, não foi aberto o cluster de TDAH e não foi reaberto o cluster de Ansiedade. A próxima decisão deve ser tomada somente após análise humana de coverage, canibalização, ownership semântico, YMYL, qualidade editorial e gaps restantes.

**STOP GATE: ATINGIDO.**
