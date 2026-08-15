# MENTAL SAÚDE — STRESS FIRST WAVE SPECIFICATION & PUBLICATION GATE PACK (MISSÃO SF-01)

**Autor:** Manus AI  
**Data:** Agosto de 2026  
**Status Operacional:** **GREEN** para especificação / **HOLD** para implementação e publicação  
**Baseline de Referência:** Checkpoint `6312aa9e` (63/63 testes PASS, build PASS, AUTOPUBLISH = DISABLED, Article Design System V1.1 FROZEN)  

---

## 1. INTRODUÇÃO E DIRETRIZES DE GOVERNANÇA

Este documento estabelece a especificação canônica e o pacote de Publication Gates para a **Stress First Wave** da plataforma *Mental Saúde*. Em estrita conformidade com as diretrizes do Content Authority Engine e com o escopo aprovado pelo projeto no ChatGPT, esta missão foca exclusivamente na **arquitetura editorial, clínica e de canibalização**, mantendo a implementação técnica em estado `HOLD` até a liberação explícita dos Publication Gates.

### Regras Inegociáveis de Baseline:
1. **Article Design System V1.1:** Mantém-se estritamente **FROZEN**. Nenhum componente visual novo ou alteração estrutural pode ser introduzido por esta wave.
2. **AUTOPUBLISH:** Permanece **DISABLED** em toda a plataforma.
3. **Clusters Congelados:** Ansiedade (`/ansiedade`), Depressão (`/depressao`) e TDAH (`/tdah`) permanecem `COMPLETE_FOR_NOW` e não receberão alterações.
4. **Instrumentos Clínicos:** GAD-7, PHQ-9 e ASRS encontram-se estáveis; o DASS-21 (`/testes/dass-21`) atua como instrumento multiescala oficial do cluster de estresse, mantendo a separação estrita entre rastreamento (*screening*) e diagnóstico clínico formal, com resultados individuais mantidos em `noindex`.

---

## 2. REAVALIAÇÃO DO BACKLOG DE 15 OPORTUNIDADES DE ESTRESSE

Durante a *Stress Cluster Foundation Audit*, foram mapeadas 15 oportunidades brutas no domínio de estresse. Aplicando rigor de intenção de busca, utilidade clínica, separação de ownership e prevenção de canibalização, realizamos a seguinte classificação:

| ID | Oportunidade Bruta | Classificação | Destino / Justificativa |
|---|---|---|---|
| 01 | O que é estresse crônico? | **SELECTED (Candidate 1)** | Base conceitual fundamental do Topic Hub `/estresse`. |
| 02 | Sintomas físicos e emocionais do estresse | **SELECTED (Candidate 2)** | Alta intenção transacional/informativa de autoobservação. |
| 03 | Teste de estresse online (DASS-21) | **SELECTED (Candidate 3)** | Intenção de screening; bridge direta para a Test Entity `/testes/dass-21`. |
| 04 | Estresse vs. Ansiedade: diferenças | **RESERVED (Candidate R1)** | Essencial para prevenção de canibalização com o cluster de Ansiedade. |
| 05 | Burnout e esgotamento profissional | **DEFERRED** | Escopo complexo que requer cluster próprio futuro; parcialmente coberto pelo Guia Geral. |
| 06 | Técnicas de respiração para estresse agudo | **MERGE** | Fundido no escopo do Candidate 2 (Sintomas e Manejo Prático). |
| 07 | Estresse no trabalho (coping profissional) | **DEFERRED** | Diferente de estresse crônico geral; reservado para Second Wave. |
| 08 | Como o estresse afeta o sono | **RESERVED (Candidate R2)** | Forte intersecção com saúde integrativa, candidato forte para Second Wave. |
| 09 | Cortisol e os efeitos hormonais do estresse | **MERGE** | Incorporado nos fundamentos fisiológicos do Guia Geral (Candidate 1). |
| 10 | Estresse em adultos: mitos e verdades | **MERGE** | Absorvido pelos guias de escopo adulto da First Wave. |
| 11 | Quando procurar ajuda médica para estresse | **MERGE** | Integrado às seções de orientação profissional de todos os artigos da First Wave. |
| 12 | O papel da psicoterapia no manejo do estresse | **DEFERRED** | Requer alinhamento com artigos de tratamento transversal. |
| 13 | Alimentação e estresse: o que diz a ciência | **REJECT** | Fora do escopo principal de YMYL em saúde mental primária. |
| 14 | Exercícios físicos e regulação do estresse | **MERGE** | Incorporado como pilar de estilo de vida no Guia Geral. |
| 15 | Resiliência emocional: como desenvolver | **DEFERRED** | Tópico comportamental avançado para ondas futuras. |

---

## 3. SELEÇÃO DOS CANDIDATOS DA STRESS FIRST WAVE

Com base na reavaliação, selecionamos **exatamente 3 candidatos principais** e **2 candidatos-reserva** para compor a First Wave de Estresse.

### Candidatos Principais (First Wave):
1. **Candidato 1:** `estresse-cronico-guia-completo` (Working Title: *Estresse Crônico: O Que É, Causas, Fisiologia e Caminhos para o Equilíbrio*)
2. **Candidato 2:** `sintomas-de-estresse-fisico-e-mental` (Working Title: *Sintomas de Estresse: Sinais Físicos, Emocionais e Estratégias de Manejo*)
3. **Candidato 3:** `teste-de-estresse-online` (Working Title: *Teste de Estresse Online: Avalie Seus Sintomas com o DASS-21*)

### Candidatos-Reserva (Second Wave / Backlog Ativo):
* **Reserva R1:** `estresse-ou-ansiedade-diferencas`
* **Reserva R2:** `estresse-e-insonia-o-impacto-no-sono`

---

## 4. ESPECIFICAÇÃO TÉCNICA E EDITORIAL POR CANDIDATO

### Candidato 1: `estresse-cronico-guia-completo`
* **Slug:** `/conteudos/estresse-cronico-guia-completo`
* **Working Title:** Estresse Crônico: O Que É, Causas, Fisiologia e Caminhos para o Equilíbrio
* **Intenção Principal:** Informacional / Educacional aprofundada (Top-of-Funnel e Mid-Funnel).
* **Pergunta que a Página Resolve:** "O que diferencia o estresse cotidiano do estresse crônico e como ele afeta o organismo a longo prazo?"
* **Público Provável:** Adultos experimentando sobrecarga prolongada buscando compreensão clínica fundamentada.
* **Escopo Positivo:** Fisiologia do eixo HPA, impacto do cortisol prolongado, diferenciação entre estresse agudo e crônico, e estratégias gerais de mitigação baseadas em evidências.
* **O Que a Página NÃO Deve Cobrir:** Diagnóstico clínico de transtornos de ansiedade, tratamento farmacológico aprofundado ou gestão específica de burnout ocupacional.
* **Relação com /estresse:** É o artigo-âncora de aprofundamento do Condition Hub `/estresse`.
* **Relação com DASS-21:** Link contextual para `/testes/dass-21` na seção de autoavaliação de sintomas.
* **Relação com Ansiedade / Depressão / TDAH:** Mantém fronteiras semânticas claras; diferencia estresse crônico de transtornos ansiosos generalizados.
* **Risco YMYL:** Médio-Alto. Exige rigor científico e ausência de atalhos diagnósticos.
* **Claims Principais:** O estresse crônico ativa de forma contínua a resposta de luta ou fuga, sobrecarregando sistemas fisiológicos; intervenções estruturadas reduzem a carga alostática.
* **Evidência Necessária:** Literatura em endocrinologia do estresse e psicologia da saúde (e.g., McEwen, carga alostática).
* **Internal Links:** 
  * Entrada: `/estresse`
  * Saída: `/conteudos/sintomas-de-estresse-fisico-e-mental`, `/testes/dass-21`
* **CTA Apropriado:** `ContextualTestCTA` direcionando para o DASS-21.
* **Metadata & Schema:** `Article` schema, breadcrumb, `noindex: false`.

---

### Candidato 2: `sintomas-de-estresse-fisico-e-mental`
* **Slug:** `/conteudos/sintomas-de-estresse-fisico-e-mental`
* **Working Title:** Sintomas de Estresse: Sinais Físicos, Emocionais e Estratégias de Manejo
* **Intenção Principal:** Informativa / Autoobservação baseada em sintomas.
* **Pergunta que a Página Resolve:** "Quais são os sinais físicos e mentais de que meu nível de estresse ultrapassou a capacidade saudável de adaptação?"
* **Público Provável:** Usuários buscando identificar manifestações somáticas e comportamentais do estresse.
* **Escopo Positivo:** Listagem detalhada de sintomas somáticos (tensão muscular, fadiga, distúrbios gastrointestinais) e psicológicos (irritabilidade, ruminação, queda de foco), seguidos de técnicas de regulação imediata.
* **O Que a Página NÃO Deve Cobrir:** Substituição de exames médicos para descartar patologias orgânicas; testes diagnósticos fechados.
* **Relação com /estresse:** Artigo satélite de suporte prático ao Topic Hub.
* **Relação com DASS-21:** Forte ponte natural para o teste, pois o DASS-21 avalia diretamente subescalas de estresse somático/emocional.
* **Relação com Ansiedade / Depressão / TDAH:** Distingue sintomas de tensão estressogênica de episódios depressivos ou déficits de atenção.
* **Risco YMYL:** Alto. Evita confundir sintomas de estresse com emergências médicas (ex: dor torácica).
* **Claims Principais:** O estresse manifesta-se através de somatizações corporais mensuráveis que exigem manejo ativo.
* **Evidência Necessária:** Manuais de medicina comportamental e psicologia clínica.
* **Internal Links:**
  * Entrada: `/estresse`, `/conteudos/estresse-cronico-guia-completo`
  * Saída: `/testes/dass-21`
* **CTA Apropriado:** `ContextualTestCTA` para o DASS-21.
* **Metadata & Schema:** `Article` schema, breadcrumb, `noindex: false`.

---

### Candidato 3: `teste-de-estresse-online`
* **Slug:** `/conteudos/teste-de-estresse-online`
* **Working Title:** Teste de Estresse Online: Avalie Seus Sintomas com o DASS-21
* **Intenção Principal:** Intenção de Teste / Transacional de Rastreamento.
* **Pergunta que a Página Resolve:** "Como posso avaliar meus níveis atuais de estresse, ansiedade e depressão de forma estruturada?"
* **Público Provável:** Usuários com intenção direta de realizar uma autoavaliação quantitativa.
* **Escopo Positivo:** Explicação da estrutura do DASS-21, o que a subescala de estresse mede, orientações de interpretação segura e acesso direto ao instrumento.
* **O Que a Página NÃO Deve Cobrir:** Emissão de laudo médico ou diagnóstico definitivo de transtorno por estresse.
* **Relação com /estresse:** Canal de conversão clínica e educacional para o DASS-21 a partir do pillar.
* **Relação com DASS-21:** É a porta editorial oficial para a Test Entity `/testes/dass-21`.
* **Relação com Ansiedade / Depressão / TDAH:** Reconhece a natureza tridimensional do DASS-21 (Depressão, Ansiedade e Estresse).
* **Risco YMYL:** Crítico. Requer disclaimer rigoroso de que o screening não substitui avaliação profissional.
* **Claims Principais:** O DASS-21 é um instrumento psicométrico validado para rastreamento de sintomas emocionais negativos.
* **Evidência Necessária:** Propriedades psicométricas do DASS-21 (Lovibond & Lovibond).
* **Internal Links:**
  * Entrada: `/estresse`, `/conteudos/sintomas-de-estresse-fisico-e-mental`
  * Saída: `/testes/dass-21` (Link semântico crawlable para a entidade de teste)
* **CTA Apropriado:** Link semântico para a Test Entity Page (`/testes/dass-21`).
* **Metadata & Schema:** `Article` schema, breadcrumb, `noindex: false`.

---

## 5. CANNIBALIZATION MATRIX DA STRESS FIRST WAVE

| Candidato / URL | Sobreposição com `/estresse` (Pillar) | Sobreposição com `/testes/dass-21` | Sobreposição com Clusters Congelados | Decisão de Ownership |
|---|---|---|---|---|
| `/conteudos/estresse-cronico-guia-completo` | Complementar (Aprofundamento) | Baixa (Link de apoio) | Zero (Distinto de Ansiedade/Depressão) | **Dono exclusivo** da intenção conceitual de estresse crônico. |
| `/conteudos/sintomas-de-estresse-fisico-e-mental` | Complementar (Prático/Sintomas) | Média (Bridge natural) | Baixa (Diferenciado de sintomas ansiosos puros) | **Dono exclusivo** da cartografia de sintomas somáticos e mentais. |
| `/conteudos/teste-de-estresse-online` | Complementar (Intenção de Teste) | Alta (Artigo ponte) | Zero | **Dono exclusivo** da intenção de busca transacional/teste online de estresse. |

---

## 6. EVIDENCE & CLINICAL SAFETY CONTRACT

1. **Separação Screening vs. Diagnóstico:** Nenhuma página da Stress First Wave utilizará terminologia diagnóstica definitiva ("você tem estresse crônico severo" como laudo). O tom será sempre descritivo e orientado ao rastreamento.
2. **Uso do DASS-21:** O instrumento será tratado estritamente como ferramenta multiescala de avaliação de sintomas, sem reduzi-lo a um "teste exclusivo de estresse".
3. **Padrão de Evidência YMYL:** Afirmações sobre fisiologia do estresse e cortisol exigirão consenso científico estabelecido, com citações inline ativas via o componente ScientificCitation.
4. **Isenção de Riscos Agudos:** Artigos com foco em sintomas incluirão avisos visíveis de busca por suporte profissional em caso de sofrimento agudo ou incapacitante.

---

## 7. PUBLICATION GATE PACK (SF-01)

| Gate | Critério de Avaliação | Status Atual | Condição para GO |
|---|---|---|---|
| **PG-0** | Baseline Integrity Checkpoint (`6312aa9e`, 63 testes PASS, build OK, AUTOPUBLISH = DISABLED) | **PASSED** | Manter suíte verde e sem alterações indevidas. |
| **PG-1** | Intent Separation (Intenções únicas e sem conflitos de ownership) | **PASSED** | Especificação validada na seção 4. |
| **PG-2** | Cannibalization Matrix (Sem sobreposição indevida com pillar ou clusters) | **PASSED** | Matriz validada na seção 5. |
| **PG-3** | Clinical / YMYL Safety (Contrato de evidência e exclusão de diagnóstico) | **PASSED** | Contrato estabelecido na seção 6. |
| **PG-4** | Information Architecture (Slugs, links, CTAs e schema definidos) | **PASSED** | Arquitetura mapeada. |
| **PG-5** | Design System Integrity (Article Design System V1.1 mantido FROZEN) | **PASSED** | Nenhuma alteração visual proposta. |
| **PG-6** | Technical Regression (Testes e build íntegros) | **PASSED** | Validado no checkpoint atual. |
| **PG-7** | Publication Authorization | **HOLD** | **Aguardando aprovação humana final e liberação do ChatGPT.** |

---
*Relatório gerado automaticamente pelo Manus AI em conformidade com as diretrizes canônicas do projeto Mental Saúde.*
