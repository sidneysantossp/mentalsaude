# Relatório Canônico: TDAH Cluster System Audit (Pre-Third-Wave Gate)

Este documento registra os resultados oficiais da **TDAH Cluster System Audit** na plataforma **Mental Saúde**, realizada sob o **Content Authority Engine V1** e o **Article Design System V1.1 (FROZEN)**.

---

## 1. Inventário Completo das URLs do Cluster TDAH

O inventário físico das oito URLs ativas no cluster de TDAH confirmou status HTTP 200, indexabilidade adequada, canonical tags corretas e alinhamento estrito ao escopo adulto:

| URL / Rota | Tipo | Papel Editorial | Status / Gate |
|---|---|---|---|
| `/tdah` | Condition Pillar | Entity Hub central de TDAH em adultos | `PASS` |
| `/testes/asrs` | Test Entity Page | Gateway público para o rastreio ASRS v1.1 | `PASS` |
| `/conteudos/tdah-em-adultos` | Article 01 | Guia Geral de TDAH em Adultos | `PASS` |
| `/conteudos/sintomas-de-tdah-em-adultos` | Article 02 | Sintomas e Manifestações Executivas | `PASS` |
| `/conteudos/teste-de-tdah-online` | Article 03 | Intenção de Teste e Conversão BOFU | `PASS` |
| `/conteudos/tdah-ou-procrastinacao` | Article 04 | Comparação: Procrastinação vs. TDAH | `PASS` |
| `/conteudos/qual-profissional-procurar-tdah` | Article 05 | Ajuda Profissional e Caminhos de Cuidado | `PASS` |
| `/conteudos/tratamento-tdah-adultos` | Article 06 | Tratamento Multimodal Baseado em Evidências | `PASS` |

---

## 2. Semantic Ownership e Matriz Global de Canibalização

- **Semantic Ownership:** Cada URL possui intenção primária, secundária e escopo estritamente delimitados, eliminando sobreposições de tópicos.
- **Canibalização Global:** A matriz de canibalização cruzada entre os itens do cluster registrou **High Overlap Unresolved = 0**, comprovando fronteiras semânticas perfeitamente estabelecidas.

---

## 3. Internal Link Graph e Pillar Architecture

- **Internal Link Graph:** Auditoria estrutural confirmou **Orphan Contents = 0** e **Broken Internal Links = 0**. O fluxo bidirecional entre o Condition Hub `/tdah`, a entidade ASRS e os artigos da First e Second Waves está totalmente integrado.
- **Pillar Architecture:** O Condition Hub `/tdah` foi classificado como **PASS**, organizando com clareza as seções de Entenda, Sintomas, Avaliação, Testes, Vida adulta, Tratamento e Ajuda profissional.

---

## 4. ASRS Conversion e YMYL / Safety Audit

- **ASRS Conversion Coverage:** 100% dos artigos elegíveis contam com o componente `ContextualTestCTA` direcionando de forma semântica e crawlable para `/testes/asrs`.
- **YMYL & Safety:** Registrou-se **Unsupported Critical Claims = 0**. A separação entre rastreio (screening) e diagnóstico clínico foi rigorosamente preservada, sem atalhos diagnósticos.
- **Escopo Adulto:** **Scope Violations = 0**. Todo o cluster mantém foco exclusivo no público adulto, sem desvios para pediatria ou contexto escolar infantil.

---

## 5. Avaliação dos Gaps Remanescentes (A a H)

- **Gaps A a E e G (Concentração, Trabalho, Organização, Diagnóstico, Terapia, Ansiedade):** Classificados para **MERGE** ou absorção natural nos artigos e guias gerais existentes, não justificando a criação de novas URLs.
- **Gap F (Medicamentos para TDAH):** Classificado como **BLOCKED / HIGH_CLINICAL_SENSITIVITY**, permanecendo inativo devido à necessidade de infraestrutura de revisão clínica avançada e restrições rígidas contra conteúdo prescritivo.
- **Gap H (TDAH, Ansiedade e Depressão):** Classificado para **DROP** por representar mistura desnecessária entre clusters maduros independentes.

---

## 6. Conclusão e Decisão do Gate

Diante da maturidade, coesão, ausência de canibalização e cobertura completa do funil no cluster de TDAH, **uma Third Wave NÃO É NECESSÁRIA**. 

- **Testes Automatizados:** 63/63 testes aprovados.
- **Build de Produção:** Aprovado.
- **Pre-Third-Wave Gate:** **ATINGIDO**.
- **AUTOPUBLISH:** **DISABLED**.
