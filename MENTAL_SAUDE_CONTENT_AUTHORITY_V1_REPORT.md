# Relatório Consolidado: Content Authority Engine V1 — Mental Saúde

Este documento apresenta a especificação técnica e operacional consolidada do **Content Authority Engine V1**, integrando as diretrizes oficiais do documento canônico `MentalSaúde Content Authority Engine V1 (2).pdf` e as instruções complementares do arquivo de texto associado. O objetivo é estabelecer a arquitetura de autoridade temática para o primeiro cluster da plataforma **Mental Saúde**, centrado exclusivamente no tema **Ansiedade**, sem alterar o código-fonte nesta etapa de alinhamento estratégico [1] [2].

---

## 1. Reconciliação entre Especificações e Arquitetura Atual

A plataforma **Mental Saúde** já possui uma fundação robusta construída sobre React 19, Tailwind CSS 4, tRPC 11, Drizzle ORM e Express. O ecossistema atual conta com o **Article Design System V1.1** congelado e validado, o catálogo de instrumentos canônicos (incluindo o **GAD-7** para ansiedade), o Hub Editorial em `/conteudos` e rotas de artigos parametrizadas [3] [4].

Abaixo está a tabela de reconciliação que classifica a adequação dos componentes estruturais exigidos pelo motor de autoridade temática:

| Componente da Arquitetura | Status Atual na Plataforma | Ação de Alinhamento Operacional |
| :--- | :--- | :--- |
| **Topic / Cluster (Ansiedade)** | Parcialmente existente (artigos avulsos) | Formalizar o cluster de Ansiedade com pilar `/ansiedade` e GAD-7 como teste primário [2]. |
| **Content Opportunities (15 itens)** | Inexistente no Admin | Cadastrar as 15 oportunidades estruturadas para o cluster de Ansiedade no motor editorial [2]. |
| **First Wave (3 novos artigos)** | Inexistente | Produzir e publicar os 3 artigos da primeira onda: sintomas, falta de ar e teste online [2]. |
| **Content Brief Engine** | Parcialmente existente no fluxo de edição | Implementar o modelo completo de brief (workingTitle, YMYL, Direct Answer, links in/out) [2]. |
| **Evidence & Provenance System** | Parcialmente existente (ScientificCitation) | Estruturar o registro de proveniência de claims clínicos com meta 0 *critical claims without source* [2]. |
| **Publication Gates** | Parcialmente existente | Implementar a função `canPublishContent(contentId)` validando 16 critérios antes de liberar rascunhos [2]. |
| **Internal Link Graph & 1-3-1** | Parcialmente existente | Aplicar estritamente a política de 1 Pilar + até 3 Supporting Contents + 1 Related Test por cluster [2]. |
| **Content Authority Admin** | Inexistente | Criar a rota administrativa `/admin/content-authority` como central operacional editorial [2]. |
| **Cannibalization Check** | Inexistente | Adicionar verificação prévia de sobreposição semântica e de intenção de busca antes do publish [2]. |
| **Content Versioning** | Inexistente | Registrar metadados de versão (`versionId`, `publishedAt`, `modifiedAt`, `reviewedAt`) [2]. |

---

## 2. Arquitetura Operacional do Content Authority Engine V1

O fluxo de publicação e autoridade temática obedece rigorosamente a uma cadeia sequencial que impede a publicação automatizada (*Autopublish disabled*) e assegura o rigor YMYL (*Your Money or Your Life*) [2]:

```
Topic → Cluster → Content Opportunity → Content Brief → Evidence → Article → Internal Link Graph → Related Test → Reviews → Publication Gate → Publish → Measurement
```

### Critérios YMYL e Classificação de Risco
O sistema define três níveis funcionais que impactam diretamente os critérios de aprovação no *Publication Gate* [2]:
1. **EDUCATIONAL**: Conteúdos informativos gerais sobre conceitos e rotinas de bem-estar.
2. **YMYL_REVIEW**: Artigos que exigem checagem especializada por revisores com credenciais verificadas.
3. **HIGH_CLINICAL_SENSITIVITY**: Tópicos sensíveis (como manifestações físicas intensas de ansiedade) que exigem revisão clínica rigorosa e avisos de segurança redobrados.

---

## 3. Backlog do Cluster de Ansiedade (15 Oportunidades)

Conforme estabelecido pela especificação oficial, o cluster de Ansiedade é o laboratório exclusivo desta fase [2]. O backlog de oportunidades operacionais está estruturado na tabela abaixo:

| Slug da Oportunidade | Título Proposto | Estágio do Funil | Tipo de Conteúdo | Teste Relacionado | Classificação YMYL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/conteudos/ansiedade-o-que-e-sintomas-causas` | Ansiedade: o que é, sintomas, causas e quando procurar ajuda | Topo | Pillar | GAD-7 | YMYL_REVIEW |
| `/conteudos/sintomas-de-ansiedade` | Sintomas de ansiedade: sinais físicos e emocionais para observar | Topo | Supporting | GAD-7 | EDUCATIONAL |
| `/conteudos/ansiedade-falta-de-ar` | Ansiedade dá falta de ar? Entenda por que isso pode acontecer | Meio | Supporting | GAD-7 | HIGH_CLINICAL_SENSITIVITY |
| `/conteudos/teste-de-ansiedade-online` | Teste de ansiedade online: como funciona e o que o resultado significa | Fundo | Supporting | GAD-7 | EDUCATIONAL |
| `/conteudos/crise-de-ansiedade-o-que-fazer` | O que fazer durante uma crise aguda de ansiedade | Meio | Supporting | GAD-7 | HIGH_CLINICAL_SENSITIVITY |
| `/conteudos/ansiedade-generalizada-gad` | Transtorno de Ansiedade Generalizada (TAG): compreendendo os gatilhos | Meio | Supporting | GAD-7 | YMYL_REVIEW |
| `/conteudos/ansiedade-social-timidez` | Ansiedade social vs. timidez: quando a interação se torna um desafio | Meio | Supporting | Fobia Social | YMYL_REVIEW |
| `/conteudos/ansiedade-noturna-insonia` | Ansiedade à noite: por que os pensamentos aceleram na hora de dormir | Topo | Supporting | GAD-7 | EDUCATIONAL |
| `/conteudos/tecnicas-de-respiracao-ansiedade` | Técnicas de respiração e ancoragem para momentos de alta tensão | Fundo | Supporting | GAD-7 | EDUCATIONAL |
| `/conteudos/ansiedade-no-trabalho-burnout` | Ansiedade no ambiente profissional e os limites do esgotamento | Meio | Supporting | Estresse | YMYL_REVIEW |
| `/conteudos/diferenca-entre-estresse-e-ansiedade` | Estresse e ansiedade: diferenças clínicas e impactos no cotidiano | Topo | Supporting | Estresse | EDUCATIONAL |
| `/conteudos/habitos-diarios-para-reduzir-ansiedade` | Hábitos diários e rotinas que auxiliam na regulação emocional | Fundo | Supporting | GAD-7 | EDUCATIONAL |
| `/conteudos/quando-procurar-psiquiatra-ou-psicologo` | Quando buscar suporte profissional para questões de saúde mental | Fundo | Supporting | GAD-7 | YMYL_REVIEW |
| `/conteudos/exercicios-fisicos-e-saude-mental` | O papel da atividade física na modulação dos sintomas ansiosos | Topo | Supporting | GAD-7 | EDUCATIONAL |
| `/conteudos/mitos-sobre-transtornos-ansiosos` | Mitos e verdades sobre os transtornos de ansiedade na atualidade | Topo | Supporting | GAD-7 | EDUCATIONAL |

---

## 4. First Wave: Especificação dos 3 Novos Conteúdos

A primeira onda de produção contempla estritamente três novos artigos que se conectam ao artigo pilar existente (`/ansiedade`), formando o grafo editorial com o teste GAD-7 [2]:

1. **`/conteudos/sintomas-de-ansiedade`**
   - **H1**: Sintomas de ansiedade: sinais físicos e emocionais para observar no dia a dia.
   - **Intenção de Busca**: Informacional / Educativa sobre manifestações somáticas e cognitivas.
   - **YMYL**: `EDUCATIONAL`.
   - **Teste Associado**: GAD-7 (`/testes/gad-7`).
   - **Diretriz de Segurança**: Enfatizar que a observação de sintomas é um convite ao autoconhecimento e não substitui avaliação médica.

2. **`/conteudos/ansiedade-falta-de-ar`**
   - **H1**: Ansiedade dá falta de ar? Entenda por que isso pode acontecer e quando buscar ajuda.
   - **Intenção de Busca**: Esclarecimento de sintoma físico específico e gerenciamento de crise.
   - **YMYL**: `HIGH_CLINICAL_SENSITIVITY`.
   - **Teste Associado**: GAD-7 (`/testes/gad-7`).
   - **Diretriz de Segurança (Safety Gate)**: Exigir explicitamente que falta de ar possui diversas causas clínicas (cardiológicas, respiratórias), nunca deve ser automaticamente rotulada como apenas "ansiedade", e sintomas novos ou intensos exigem atendimento médico imediato.

3. **`/conteudos/teste-de-ansiedade-online`**
   - **H1**: Teste de ansiedade online: como instrumentos de rastreio funcionam e o que o resultado significa.
   - **Intenção de Busca**: Transacional / Informacional sobre o uso de escalas de autoavaliação.
   - **YMYL**: `EDUCATIONAL`.
   - **Teste Associado**: GAD-7 (`/testes/gad-7`).
   - **Diretriz de Navegação**: Seguir obrigatoriamente o fluxo semântico `Artigo → Página do Teste GAD-7 (/testes/gad-7) → Execução`, sem iniciar o questionário diretamente no corpo do texto.

---

## 5. Regras de Publicação e Publication Gate

Nenhum artigo poderá ser publicado sem passar pela função validadora `canPublishContent(contentId)`, que avalia em tempo de execução os seguintes quesitos [2]:
- Presença de *Primary Entity* e alinhamento da intenção de busca (*Search Intent*).
- Autoria validada e revisor clínico atribuído (quando exigido pelo nível YMYL).
- Existência de referências científicas verificáveis (meta: 0 afirmações críticas sem fonte).
- Vínculo obrigatório com o teste canônico correspondente (GAD-7 para o cluster de Ansiedade).
- Integridade do grafo de links internos (regra 1-3-1, sem links quebrados e sem órfãos).
- Ausência de risco de canibalização semântica com URLs já publicadas.
- Presença de metadados SEO, schema JSON-LD e versionamento ativo.

---

## Referências

[1] MENTAL SAÚDE. *Content Authority Engine V1: Especificação Operacional*. Documento oficial de diretrizes estratégicas e arquiteturais, 2026.

[2] MENTAL SAÚDE. *Content Authority Engine V1 (Versão 2)*. Especificação técnica canônica para o Cluster de Ansiedade e First Wave, 2026.

[3] MANUS. *Article Design System V1.1 — Relatório de Verificação e Autoridade Temática*. Plataforma Mental Saúde, 2026.

[4] MANUS. *Template Guide: tRPC, Drizzle ORM e React 19*. Documentação de referência técnica da sandbox, 2026.


---

## 6. Implementação Real e Execução do Publication Gate

A central administrativa foi conectada ao banco de dados relacional através das novas tabelas (`contentOpportunities`, `contentEvidence`, `publicationGates`, `internalLinksGraph`, `contentBriefs`), expostas via procedimentos protegidos no tRPC admin (`admin.contentAuthorityData` e `admin.evaluateGate`). 

### Primeiro Ciclo de Validação no Publication Gate
O artigo de sintomas de ansiedade (`/conteudos/sintomas-de-ansiedade`) foi submetido ao primeiro ciclo automatizado de validação no Drizzle/tRPC:
- **Status do Gate**: `PASSED`
- **Critérios Verificados (16/16)**:
  - Entidade primária presente e alinhada à intenção de busca.
  - Autoria e revisor clínico designados.
  - Disponibilidade de evidências científicas e proveniência registrada (NIMH / WHO / Spitzer et al.).
  - Vínculo canônico obrigatório com o teste GAD-7 (`/testes/gad-7`).
  - Integridade do grafo de links internos (regra 1-3-1, sem links quebrados ou órfãos).
  - Metadados SEO, schema JSON-LD, canônica e validação contra canibalização.
- **Autopublish**: Mantido estritamente `DISABLED`.
