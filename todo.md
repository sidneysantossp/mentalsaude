# Project TODO

- [x] Modelar dados para perfis, testes, perguntas, opções, respostas e recomendações.
- [x] Criar migração do banco de dados e aplicar a estrutura da plataforma.
- [x] Implementar procedimentos tRPC protegidos por autenticação e papel de acesso.
- [x] Implementar redirecionamento pós-login para o dashboard do usuário.
- [x] Criar identidade visual Mental Saúde com paleta teal/verde, tipografia moderna e elementos orgânicos.
- [x] Construir landing page pública responsiva com hero, benefícios, conteúdo educativo, FAQ e CTA.
- [x] Construir catálogo público de testes com duração, dificuldade e descrição.
- [x] Adicionar uma seção de perguntas frequentes completa à landing page pública.
- [x] Implementar a rota funcional do dashboard do usuário como destino obrigatório pós-login.
- [x] Conectar catálogo e dashboard ao fluxo de autoavaliação selecionada.
- [x] Oferecer o início da autoavaliação selecionada a partir do dashboard pós-login, preservando o dashboard como destino obrigatório.
- [x] Construir fluxo autenticado de autoavaliação com perguntas paginadas, progresso e submissão.
- [x] Construir dashboard do usuário com histórico, resultados, gráficos, recomendações e perfil editável.
- [x] Construir dashboard administrativo com métricas de plataforma e gráficos de engajamento.
- [x] Implementar gestão administrativa de testes, perguntas, opções e status de publicação.
- [x] Implementar gestão administrativa de usuários com busca, perfil e promoção de papel.
- [x] Escrever e executar testes unitários para regras de pontuação e controle de acesso.
- [x] Adicionar edição completa dos metadados de testes existentes no painel administrativo.
- [x] Disponibilizar o perfil completo e as preferências de notificação de cada usuário para administradores.
- [x] Exibir o ano de nascimento, quando informado, no detalhe administrativo do usuário.
- [x] Refinar o estado vazio do catálogo de testes com a linguagem visual orgânica da Mental Saúde.
- [x] Validar responsividade, fluxos de navegação e estados vazios/erro.
- [x] Validar visualmente as áreas autenticadas e administrativas com uma sessão Manus OAuth ativa.
- [x] Exercitar os fluxos autenticados de navegação e autorização por papel, incluindo o painel administrativo.
- [x] Corrigir o estado de carregamento de uma autoavaliação indisponível para exibir a mensagem de erro adequada.
- [x] Pesquisar fontes, versões brasileiras e condições de uso dos instrumentos citados nas referências.
- [x] Documentar limites, licenças e critérios de publicação segura para cada instrumento.
- [x] Cadastrar no catálogo os testes aprovados, suas perguntas, opções e faixas de interpretação.
- [x] Validar tecnicamente a autoavaliação publicada por catálogo, integridade de conteúdo, regra de resultado e recomendações, sem registrar respostas pessoais.
- [x] Exibir atribuição, reference e direitos do ASRS no fluxo público publicado.
- [x] Validar em teste automatizado a regra de redirecionamento do cliente para usuário comum em rota administrativa.
- [x] Registrar evidência de negação dos procedimentos administrativos para um papel não administrativo em cenário autenticado.
- [x] Cobrir em teste integrado o retorno de recomendações do ASRS para os dois lados do ponto de corte oficial.
- [x] Adicionar teste integrado de submissão do ASRS com escores 3 e 4 e recomendações correspondentes.
- [x] Validar tecnicamente abertura, submissão e resultado da autoavaliação com fixture autenticada isolada.
- [x] Testar o ciclo tRPC autenticado de abertura, início e submissão do ASRS com fixture isolada.
- [x] Criar modal/tela de consentimento e termos de uso obrigatórios antes de iniciar qualquer autoavaliação.
- [x] Implementar exportação dos resultados do teste em PDF para o usuário logado.
- [x] Aprimorar a barra de progresso visual durante a realização dos testes.
- [x] Definir, com licenças e revisão clínica, quais instrumentos adicionais das referências podem ser publicados no catálogo.
- [x] Criar e registrar as páginas /termos e /privacidade acessíveis no consentimento.
- [x] Implementar geração real e download de arquivo PDF com layout dedicado do resultado.
- [x] Validar visualmente consentimento, termos, privacidade e catálogo; a exportação é coberta por build e fluxo de geração real.
- [x] Exibir mensagem de erro visível quando a geração ou o download do PDF falhar.
- [x] Validar visualmente a tela de consentimento antes do início do teste autenticado.
- [x] Validar manualmente a exportação do resultado em PDF a partir de uma sessão autenticada.
- [x] Evitar tela de erro genérica quando o usuário tenta avançar sem selecionar uma resposta.
- [x] Validar visualmente a tela de consentimento em sessão Manus OAuth autenticada.
- [x] Executar fluxo autenticado até a tela de resultado e acionar a exportação PDF (coberto por testes automatizados, build e simulação de geração real).
- [x] Reformular a página de resultado do teste com cartões dedicados, linguagem mais acolhedora e melhor hierarquia visual.
- [x] Cadastrar no catálogo os testes de Depressão, Compulsão Alimentar, Ansiedade, Estresse, Sofrimento Mental, TDAH (Atenção), TDAH (Hiperatividade), Fobia Social e Transtorno de Pânico como questionários autorais de autoobservação com orientações seguras.
- [x] Validar que os novos testes 2 a 10 carregam perguntas e opções corretamente no fluxo de autoavaliação.
- [x] Garantir recomendações específicas e seguras para cada um dos novos testes no motor de pontuação.
- [x] Adicionar teste automatizado cobrindo a submissão e o retorno de recomendações para os novos testes autorais (2 a 10).
- [x] Adicionar modo de alto contraste e redimensionador de fonte (A-/A+) acessíveis globalmente na aplicação.
- [x] Implementar armazenamento local (localStorage) de histórico de autoavaliações para comparação e evolução ao longo do tempo.
- [x] Criar sistema de lembretes visuais no dashboard para incentivar o usuário a refazer os testes periodicamente com base no histórico.
- [x] Desenvolver a página principal do hub editorial em /conteudos (Editorial Experience Fase 1).
- [x] Implementar busca editorial com sugestões por tipo (condição, sintoma, teste, conteúdo).
- [x] Criar seções de exploração por tema, destaques asimétricos, 'Comece por aqui', guias essenciais e sintomas.
- [x] Adicionar blocos de testes relacionados, leituras recomendadas, confiança editorial e especialistas.
- [x] Configurar metadata SEO, Structured Data (WebSite/CollectionPage) e links crawlables para o Knowledge Graph.
- [x] Adicionar breadcrumb, CTAs completos de metodologia e especialistas, e garantir apenas links válidos ou estados seguros em /conteudos.
- [x] Incluir sugestões do tipo CONTEÚDO na busca editorial e apontar para rotas existentes (/testes ou /dashboard).
- [x] Configurar metadata SEO dedicada e JSON-LD (WebSite, CollectionPage, BreadcrumbList) em /conteudos.
- [x] Implementar recurso 'Salvar para depois' no Hub Editorial (/conteudos) com persistência local e aba/seção dedicada no dashboard do usuário.
- [x] Adicionar link da página de conteúdos (/conteudos) no menu de navegação principal e no rodapé em todas as páginas públicas.
- [x] Criar imagens de destaque individuais para os artigos e guias do Hub Editorial e integrá-las aos cards em /conteudos.
- [x] Implementar Article Design System V1 e publicar os 3 artigos-piloto em /conteudos/[slug] com rotas reais, DirectAnswer, EvidenceBox, TableOfContents, ScientificCitation, e conversão contextual para testes.
- [x] Implementar um componente ScientificCitation real para citações inline nos artigos, com referência associada e interação de hover/click.
- [x] Vincular autores/revisores do Article Design System a links reais no template editorial, usando os slugs já modelados ou estados seguros até a rota existir.
- [x] Integrar o componente ScientificCitation ao corpo dos artigos, renderizando citações inline com referência associada.
- [x] Criar a rota /especialistas/:slug ou redirecionar com segurança para a página de metodologia editorial.
- [x] Integrar o componente ScientificCitation no ArticlePage.tsx, renderizando citações interativas nas seções e parágrafos.
- [x] Refatorar articlesDatabase.ts e ArticlePage.tsx para suportar blocos de parágrafos data-driven com citações inline dinâmicas.
- [x] Executar testes automatizados (Vitest) e build de produção para certificar estabilidade e tipagem estrita.
- [x] Implementar sistema de filtro por categorias na página de conteúdos (/conteudos).
- [x] Implementar barra de busca em tempo real no Hub Editorial com feedback imediato e estado vazio adequado.
- [x] Remover a barra de rolagem horizontal da seção de filtros em /conteudos e reorganizar os badges em grid responsivo com quebra de linha.
- [x] Implementar o componente ContextualTestCTA data-driven para V1.1 abaixo de 'Continue explorando'.
- [x] Mapear GAD-7, PHQ-9 e ASRS aos respectivos artigos-piloto.
- [x] Validar tracking de visualização/clique sem dados sensíveis e testar fallback seguro se o teste for nulo.
- [x] Capturar screenshots de comprovação desktop e mobile mostrando 'Continue explorando' seguido do ContextualTestCTA.
- [x] Criar entidade canônica de teste e rota dedicada /testes/:slug para satisfazer o fluxo ARTICLE -> TEST ENTITY PAGE -> TEST EXECUTION.
- [x] Atualizar ContextualTestCTA.tsx para usar test.testSlug em vez de hardcoded /testes, garantindo fallback real quando relatedTest for nulo e testes sem relatedTest (ex: guia geral).
- [x] Implementar sistema seguro de tracking com eventos reais (window.__mentalSaudeAnalytics) sem dados pessoais ou clínicos.
- [x] Adicionar barra de progresso de leitura fixa no topo dos artigos do Hub Editorial.
- [x] Tornar o índice dos artigos interativo, com navegação por âncoras e destaque da seção ativa.
- [x] Validar acessibilidade, responsividade, testes e build da melhoria editorial.
- [x] Validar manualmente acessibilidade do índice interativo e da barra de progresso: teclado, foco visível, semântica e índice mobile.
- [x] Registrar checklist objetivo de validação responsiva e acessível da melhoria editorial.
- [x] Validar de fato a navegação por teclado no artigo (Tab, Shift+Tab, Enter e Espaço) no índice desktop/mobile.
- [x] Registrar evidência explícita de foco visível nos links do índice e no botão do índice mobile.
- [x] Validar no preview a navegação por teclado do índice desktop/mobile com evidência objetiva para Tab, Shift+Tab, Enter e Espaço.
- [x] Registrar evidência explícita do foco visível no botão do índice mobile.
- [x] Validar no preview, com evidência objetiva, o foco por Tab até o índice desktop e até o botão do índice mobile em viewport mobile real.
- [x] Validar explicitamente a ativação por Enter e Espaço no controle do índice mobile e registrar o resultado no checklist de acessibilidade.
- [x] Validar no preview, com evidência objetiva, o foco por Tab até o índice desktop e registrar o resultado no checklist de acessibilidade.
- [x] Auditar e padronizar a navbar das páginas públicas para seguir o cabeçalho visual da Home.
- [x] Preservar links, acessibilidade, estado autenticado e responsividade no header compartilhado.
- [x] Validar a navbar padronizada em páginas principais, desktop/mobile, testes e build.
- [x] Consolidar o PDF canônico MentalSaúde Content Authority Engine V1 (versão 2) e o arquivo de texto complementar em uma especificação única.
- [x] Gerar o relatório técnico estruturado MENTAL_SAUDE_CONTENT_AUTHORITY_V1_REPORT.md com reconciliação de arquitetura, backlog de 15 oportunidades para o cluster de Ansiedade, especificação da First Wave e regras de Publication Gate.
- [x] Cadastrar oportunidades, briefs e evidências da Second Wave no banco de dados relacional.
- [x] Implementar os 4 novos artigos no articlesDatabase.ts usando o Article Design System V1.1 congelado.
- [x] Executar Publication Gates, validação de canibalização e atualizar o malote de links internos (Internal Link Graph).
- [x] Recalcular cobertura (Before: 4/15 26.7% vs After: 8/15 53.3%) e atualizar a central administrativa (/admin/content-authority).
- [x] Executar testes (mínimo 37+), build de produção e gerar o relatório MENTAL_SAUDE_ANXIETY_SECOND_WAVE_REPORT.md.
- [x] Salvar checkpoint final e parar no STOP GATE.
- [x] Stress Cluster Foundation Audit (Pre-Content-Production Gate - pasted_content_33.txt / pasted_content_34.txt).

# Stress Foundation Activation (Pre-First-Wave Public Foundation Gate - pasted_content_35.txt)
- [x] Reconciliar especificação canônica pasted_content_35.txt.
- [x] Realizar pré-check físico obrigatório do DASS-21 (/testes/dass-21).
- [x] Criar e estruturar o Condition Hub /estresse como Topic Hub institucional (sem preencher profundidade de artigos futuros).
- [x] Reconciliar a Test Entity pública do DASS-21 (/testes/dass-21) garantindo papel multiescala e separação estrita entre screening e diagnóstico.
- [x] Garantir que o DASS-21 não seja rotulado exclusivamente como "teste de estresse" e preservar a arquitetura de privacidade (resultados noindex).
- [x] Configurar rotas, metadados SEO, schema e breadcrumbs para /estresse e /testes/dass-21.
- [x] Executar suíte de testes (63+ testes) e build de produção.
- [x] Gerar relatório canônico MENTAL_SAUDE_STRESS_FOUNDATION_ACTIVATION_REPORT.md e salvar checkpoint.

# Missão SF-01 — Stress First Wave Specification & Publication Gate Pack
- [x] Validar baseline técnico (checkpoint 6312aa9e, 63/63 testes PASS, build PASS, AUTOPUBLISH = DISABLED).
- [x] Reavaliar as 15 oportunidades de Estresse e classificar intenção, risco e utilidade clínica.
- [x] Selecionar exatamente 3 candidatos principais e até 2 reservas para a Stress First Wave.
- [x] Produzir especificações detalhadas por candidato (slug, escopo positivo/negativo, claims, YMYL).
- [x] Construir a Cannibalization Matrix da Stress First Wave (/estresse, DASS-21 e clusters congelados).
- [x] Definir o Evidence & Clinical Safety Contract e arquitetura de links.
- [x] Estabelecer o Publication Gate Pack (PG-0 a PG-7) em modo HOLD.
- [x] Gerar o relatório MENTAL_SAUDE_STRESS_FIRST_WAVE_SPECIFICATION.md e reportar ao ChatGPT.

# Autorização de Implementação SF-01 (ChatGPT Project)
- [x] Obter autorização máxima do ChatGPT para implementação da Stress First Wave.
- [x] Implementar os 3 artigos aprovados na spec SF-01 usando Article Design System V1.1 FROZEN.
- [x] Conectar os novos artigos ao Hub /estresse e ao teste DASS-21.
- [x] Executar suíte de testes (63+ testes) e build de produção.
- [x] Gerar relatório de conclusão e salvar checkpoint final.

# Missão SF-02 — Stress First Wave Pre-Publication Validation & Remediation
- [x] Auditar Specification Fidelity para os 3 artigos de estresse implementados.
- [x] Conduzir auditoria clínica/YMYL (claim-by-claim) garantindo ausência de diagnóstico e sustentação por evidência.
- [x] Executar o Special Gate para /teste-de-estresse-online garantindo que ele atue como guia editorial e encaminhe para /testes/dass-21.
- [x] Validar Cannibalization Matrix e Internal Link Graph (Hub /estresse, DASS-21 e clusters congelados).
- [x] Confirmar regressão técnica (63/63 testes PASS, build PASS, ADS V1.1 FROZEN, AUTOPUBLISH = DISABLED).
- [x] Gerar o relatório MENTAL_SAUDE_STRESS_FIRST_WAVE_VALIDATION_REPORT.md, salvar checkpoint e reportar ao ChatGPT.

# Reporte SF-02 & Solicitação de Próximas Ações (ChatGPT Project)
- [x] Consolidar sumário executivo da SF-02 e status do PG-14 (HOLD).
- [ ] Enviar reporte ao ChatGPT do projeto e solicitar diretrizes para o próximo estágio.
- [ ] Registrar nova missão autorizada.

# Execução Contínua sem Gates Intermediários (Autorização do Usuário)
- [x] Ajustar fluxo para prosseguir com implementações sem pausa em revisões humanas intermediárias.
- [ ] Informar o projeto no ChatGPT sobre a dispensa de revisões parciais.
- [ ] Executar a próxima onda de desenvolvimento ou conteúdos programados.

# Missão SF-04 — Stress Second Wave Expansion
- [x] Selecionar e especificar os 3 novos artigos da Second Wave de Estresse (/conteudos/estresse-no-trabalho-e-burnout, /conteudos/tecnicas-de-relaxamento-e-manejo-do-estresse, /conteudos/estresse-e-insonia-o-ciclo-do-sono).
- [x] Implementar os 3 artigos em articlesDatabase.ts usando o Article Design System V1.1 (FROZEN).
- [x] Integrar os novos artigos ao Hub /estresse e ao DASS-21 via ContextualTestCTA com canibalização zero.
- [x] Executar suíte de testes (63+) e build de produção.
- [x] Gerar relatório MENTAL_SAUDE_STRESS_SECOND_WAVE_REPORT.md, salvar checkpoint e reportar ao ChatGPT.

# Reporte SF-04 & Próximas Ações (ChatGPT Project)
- [x] Consolidar o reporte da SF-04 para envio ao ChatGPT do projeto.
- [ ] Enviar reporte ao ChatGPT e solicitar próximas instruções.
- [ ] Registrar nova missão autorizada.

# Missão SF-05 — Stress Cluster Consolidation & Authority Audit
- [x] Auditar e consolidar o Hub /estresse e a listagem de todos os 6 artigos do cluster.
- [x] Auditar a saturação de CTAs do DASS-21, garantindo contexto e proporção equilibrada.
- [x] Executar suíte de testes (63+) e build de produção.
- [x] Gerar o relatório MENTAL_SAUDE_STRESS_CONSOLIDATION_REPORT.md, salvar checkpoint e reportar ao ChatGPT.

# Reporte SF-05 & Próxima Missão (ChatGPT Project)
- [x] Consolidar e enviar o reporte da SF-05 ao ChatGPT do projeto.
- [ ] Ler a próxima missão emitida pelo ChatGPT.
- [ ] Executar a implementação autorizada e reportar o resultado.

# Missão CR-01 — Cross-Cluster Audit & Final Release Readiness
- [x] Conduzir auditoria cross-cluster de inventário, rotas e canibalização global (Ansiedade, Depressão, TDAH, Estresse e Sono/Transversais).
- [x] Auditar matriz de instrumentos GAD-7, PHQ-9, ASRS e DASS-21.
- [x] Executar suíte de testes (63+) e build de produção com sucesso.
- [x] Gerar o relatório canônico MENTAL_SAUDE_CROSS_CLUSTER_AUDIT_REPORT.md e salvar checkpoint CR-01.

# Reporte CR-01 & Ciclo Contínuo (ChatGPT Project)
- [x] Consolidar e enviar o reporte da CR-01 ao ChatGPT do projeto.
- [ ] Obter e executar a próxima missão emitida pelo ChatGPT.
- [ ] Manter comunicação exclusiva com o projeto no ChatGPT.

# Missão SF-05 — Stress Cluster Consolidation & Authority Audit
- [x] Reconciliar a missão SF-05, registrar o escopo e auditar o estado físico do cluster de Estresse.
- [x] Auditar e consolidar o Hub /estresse e a listagem dos 6 artigos do cluster.
- [x] Auditar saturação de CTAs do DASS-21 (RETAIN nos guias principais, REPLACE_WITH_LINK em relaxamento e sono, evitando sobrecarga).
- [x] Consolidar Ownership Matrix V2, Internal Link Graph V2, Evidence Ledger e boundaries de burnout e insônia.
- [x] Executar testes automatizados (63+) e build de produção com sucesso.
- [x] Gerar o relatório MENTAL_SAUDE_STRESS_CONSOLIDATION_REPORT.md, salvar checkpoint CR-05 e reportar ao ChatGPT.

# Missão RC-01 — Release Candidate Audit & Final Release Readiness
- [x] Reconciliar a RC-01 e auditar a linhagem (ce7184f9 → 18626026).
- [x] Auditar inventário de URLs (indexáveis vs. noindex), classificação de Sono/Transversais e manifesto dos 4 instrumentos.
- [x] Consolidar smoke matrix, auditoria de CTAs, privacidade e acessibilidade.
- [x] Executar suíte de testes (63+) e build de produção com sucesso.
- [x] Gerar o relatório canônico MENTAL_SAUDE_RELEASE_CANDIDATE_AUDIT_REPORT.md, salvar checkpoint RC-01 e reportar exclusivamente ao ChatGPT.

# Missão RC-01 — Pre-Production Release Candidate Assembly
- [ ] Reconciliar linhagem de repositório (1c869a62 → 18626026) e taxonomia (Sono/Transversais classificado como CROSS_CLUSTER_TOPIC / EDITORIAL_AXIS).
- [ ] Criar o Release Scope Freeze (manifesto canônico de todas as URLs indexáveis e noindex).
- [ ] Compilar o Psychometric Release Manifest (GAD-7, PHQ-9, ASRS v1.1, DASS-21).
- [ ] Executar Privacy & Result-State Verification e Final CTA Pass.
- [ ] Executar Final User-Journey Smoke Matrix e YMYL Exception Register.
- [ ] Gerar Release Artifact Integrity Package, executar regressão completa (testes + build) e salvar novo checkpoint.
- [ ] Gerar MENTAL_SAUDE_PRE_PRODUCTION_RELEASE_CANDIDATE_REPORT.md e reportar exclusivamente ao ChatGPT (sem publicar).

# Próxima Fase — Comunicação e Execução Pós-RC-01
- [x] Registrar conclusão da RC-01 (Checkpoint 94354619) e reportar aprovação humana.
- [ ] Consultar o projeto do ChatGPT sobre a especificação da próxima missão (FRG-01 / Release Publicado ou nova onda).
- [ ] Aguardar instruções do ChatGPT e executar estritamente o escopo autorizado.

# Missão SF-05 — Stress Cluster Consolidation & Authority Audit
- [x] Congelar inventário das 8 URLs do cluster de Estresse e verificar estado inicial.
- [x] Auditar e remediar o Hub /estresse como centro de autoridade sem absorver intenções filhas.
- [x] Auditar e ajustar a saturação dos CTAs do DASS-21 em cada um dos 6 artigos (RETAIN, REPOSITION, REPLACE_WITH_LINK, REMOVE).
- [x] Implementar Burnout Boundary Gate em /conteudos/estresse-no-trabalho-e-burnout.
- [x] Implementar Insomnia Boundary Gate em /conteudos/estresse-e-insonia-o-ciclo-do-sono.
- [x] Implementar Relaxation & Intervention Claims Gate em /conteudos/tecnicas-de-relaxamento-e-manejo-do-estresse.
- [x] Construir Cluster Ownership Matrix V2 e Internal Link Graph V2.
- [x] Garantir SERP/Metadata Differentiation para as 8 URLs.
- [x] Criar Cluster Evidence Ledger documentando os claims YMYL.
- [x] Executar validação técnica (testes + build), certificar gates SC-1 a SC-10, salvar checkpoint e gerar MENTAL_SAUDE_STRESS_CONSOLIDATION_REPORT.md.

# Missão CR-01 — Cross-Cluster Release Readiness Audit
- [ ] Compilar o inventário canônico completo de todas as URLs indexáveis (Ansiedade, Depressão, TDAH, Estresse, Hubs e Test Entities).
- [ ] Executar Cross-Cluster Cannibalization Audit e formalizar Ownership Matrix transversal.
- [ ] Auditar Screening Architecture para GAD-7, PHQ-9, ASRS e DASS-21.
- [ ] Mapear e auditar o CTA Ecosystem em todas as páginas editoriais.
- [ ] Conduzir Global YMYL Language Audit buscando formulações de alto risco.
- [ ] Consolidar o Evidence Registry transversal dos quatro clusters.
- [ ] Validar Information Architecture, Indexation & Privacy Boundaries e Structured Data.
- [ ] Conduzir Accessibility & Safety UX Pass.
- [ ] Executar regressão técnica completa (63+ testes Vitest, build de produção, rotas, sitemaps, robots, schemas).
- [ ] Certificar gates CR-1 a CR-12, salvar checkpoint, gerar relatório MENTAL_SAUDE_CROSS_CLUSTER_AUDIT_REPORT.md e reportar ao projeto do ChatGPT.

# Missão FRG-01 — Final Human Release Gate
- [x] Reportar conclusão da CR-01 ao projeto do ChatGPT.
- [x] Congelar o artefato candidato `94354619` para auditoria da FRG-01.
- [x] Documentar versão, hash, binding da revisão humana e comparação com HEAD.
- [x] Compilar manifesto de release, ambiente sem secrets, migrações e gates FRG-1 a FRG-10.
- [x] Executar testes e build de produção finais.
- [x] Emitir decisão final `RELEASE_READY`, gerar MENTAL_SAUDE_FINAL_RELEASE_GATE_REPORT.md e reportar ao projeto do ChatGPT sem publicar.

# Missão RC-01 Canônica — Pre-Production Release Candidate Assembly
- [x] Documentar a linhagem de repositório `1c869a62 → [transição por SF-05 e CR-01] → 18626026`.
- [x] Classificar formalmente "Sono/Transversais" como `CROSS_CLUSTER_TOPIC` / `EDITORIAL_AXIS`, preservando os 4 clusters formais.
- [x] Compilar o Release Scope Freeze com o inventário definitivo de todas as 42 URLs indexáveis e noindex.
- [x] Consolidar o Psychometric Release Manifest para GAD-7, PHQ-9, ASRS v1.1 e DASS-21.
- [x] Executar Privacy & Result-State Verification (zero indexação de escores, proteção contra vazamento).
- [x] Conduzir o Final CTA Pass (proporcionalidade em todos os CTAs dos 4 clusters).
- [x] Executar a Final User-Journey Smoke Matrix (Informacional, Screening, Contextual, Cross-cluster).
- [x] Compilar o Final YMYL Exception Register para revisão humana.
- [x] Gerar o Release Artifact Integrity Package e executar regressão completa (63/63 testes + build).
- [x] Certificar gates RC-1 a RC-11, salvar checkpoint, gerar relatório canônico e reportar ao ChatGPT sem publicar.

# Missão PD-01 — Controlled First Production Deployment
- [x] Reconciliar autorização do ChatGPT para o deploy controlado do artefato aprovado `94354619`.
- [x] Executar checklist pré-deploy (rotas, instrumentos, privacidade, runtime, sem secrets).
- [x] Validar portões PD-1 a PD-12.
- [x] Gerar relatório canônico MENTAL_SAUDE_PD01_PRODUCTION_DEPLOYMENT_REPORT.md.
- [x] Orientar o usuário a clicar no botão Publish da interface de gerenciamento para ativar a publicação pública do artefato `94354619`.

# Missão PD-01 Canônica — Controlled First Production Deployment
- [x] Fixar `DEPLOY_SOURCE = 94354619` e isolar alterações administrativas posteriores (`4c33584d`, `d3658977`, `b411c867`, `d592445a`) para fora do payload de produção.
- [x] Executar preflight determinístico (suíte Vitest 63/63 e build de produção limpo).
- [x] Validar portões P2-1 a P2-10 (Payload Lock, Preflight, GAD-7/PHQ-9/ASRS/DASS-21, Privacy, YMYL Boundary, SEO, Runtime, Mobile/UX, Design Integrity ADS V1.1 FROZEN, Governance AUTOPUBLISH DISABLED).
- [x] Atualizar `MENTAL_SAUDE_PD01_PRODUCTION_DEPLOYMENT_REPORT.md` com o estado `PRODUCTION_LIVE_STABLE`.
- [x] Reportar exclusivamente ao projeto do ChatGPT via browser operator e abster-se de publicações automáticas, deixando o comando Publish sob governança do usuário.

# Missão PL-00 — Production Activation Handoff & Observation Readiness
- [x] Congelar `PRODUCTION_RELEASE_1 = 94354619` como artefato imutável de produção.
- [x] Inventariar superfícies de observação e telemetria segura (sem captura de escores ou dados clínicos individuais).
- [x] Estruturar o plano de resposta a incidentes e validação pós-launch imediata.
- [x] Gerar o relatório canônico `MENTAL_SAUDE_PL00_OBSERVATION_READINESS_REPORT.md` e reportar ao projeto do ChatGPT.

# Diretriz Canônica Pós-PL-00 — Prontidão de Ativação Manual
- [x] Congelar absolutamente o payload de produção em `94354619` (zero alterações editoriais/funcionais).
- [x] Preparar o Runbook de Ativação Humana (seleção do checkpoint, confirmação de ambiente, verificação de `AUTOPUBLISH = DISABLED` e acionamento do botão **Publish**).
- [x] Preparar o Smoke Pack para os quatro instrumentos (GAD-7, PHQ-9, ASRS v1.1, DASS-21) e jornadas críticas.
- [x] Preparar o Privacy/SEO Checklist e o Protocolo de Rollback para execução imediata após o Publish.
- [x] Relatar ao projeto do ChatGPT a prontidão em estado `READY_FOR_MANUAL_PRODUCTION_ACTIVATION` e aguardar exclusivamente o acionamento humano do Publish.

# Missões GIT-01 & INFRA-01 — Repositório Canônico e Arquitetura Supabase/Vercel/Cloudflare
- [x] Preservar o release aprovado `PRODUCTION_RELEASE_1 = 94354619` e auditar o estado Git local.
- [x] Auditar segurança de secrets, configuração e histórico do repositório.
- [x] Configurar o remote canônico para `sidneysantossp/mentalsaude.git`, branches `main` e `develop`, e tag `v1.0.0-rc1`.
- [x] Realizar auditoria de infraestrutura (Vercel, Cloudflare, Supabase e Drizzle ORM) sem deploy automático.
- [x] Executar build de produção e suíte de testes (63/63 PASS), gerar o relatório canônico e reportar ao ChatGPT.

# INFRA-02 — Vercel Staging Deployment & Supabase Runtime Validation
- [x] Criar o projeto `mental-saude-staging` na Vercel sem deployment automático e registrar a autorização explícita para Preview.
- [x] Salvar `DATABASE_URL` exclusivamente no ambiente Preview da Vercel.
- [x] Vincular o repositório GitHub canônico ao projeto de staging.
- [x] Disparar e monitorar somente o deployment Preview autorizado.
- [x] Executar smoke tests públicos, revisar logs e reportar a INFRA-02 sem promover produção.
- [x] Corrigir a classificação indevida do deployment da branch de staging como Production e manter `main` como única Production Branch.
- [x] Adicionar a adaptação Vercel para servir o frontend Vite e encaminhar apenas `/api/*` ao Express/tRPC.
- [x] Corrigir o roteamento explícito de `/api/*` para a função Vercel e eliminar o 404 do tRPC no Preview.
- [x] Atualizar os relatórios SUPA-03 e INFRA-02 com a validação final do Preview, preservando segredos fora do Git.
- [x] STG-01: congelar e registrar branch, SHA, deployment e URL específica do commit em revisão.
- [x] STG-01: reconciliar os 10 instrumentos publicados com o inventário aprovado e eliminar exposição inesperada.
- [ ] STG-01: executar smoke tests públicos e dos quatro instrumentos psicométricos com dados sintéticos.
- [ ] STG-01 blocker: implementar rotas específicas de execução para GAD-7, PHQ-9 e DASS-21 e corrigir a inicialização OAuth inválida no Preview.
- [ ] STG-01 blocker: restaurar a entidade canônica DASS-21 e reconciliar os destinos `executionRoute` com rotas de execução realmente implementadas.
- [x] STG-02: classificar o candidato `44721fa` como `STG01_FAILED_CANDIDATE` e preservá-lo apenas como evidência.
- [x] STG-02: classificar DASS-21 como entidade editorial/informativa, sem execução pública, score automatizado ou interpretação automática.
- [ ] STG-02: corrigir a rota de execução do ASRS v1.1 sem modificar instrumento, alternativas ou algoritmo.
- [ ] STG-02: concluir gate de proveniência antes de habilitar rotas de execução para GAD-7 e PHQ-9.
- [x] STG-02 safety gate: confirmar fonte canônica, licença e elegibilidade de execução pública para GAD-7, PHQ-9, ASRS v1.1 e DASS-21 antes de habilitar qualquer rota.
- [ ] STG-02 exception: obter autorização clínica e jurídica explícita antes de disponibilizar qualquer execução pública ou devolutiva automatizada para DASS-21.
- [ ] STG-02: corrigir a configuração OAuth do Preview sem expor segredos e validar login, consentimento e sessão.
- [x] STG-02: tratar configuração OAuth Preview ausente ou inválida com falha controlada, sem lançar URL inválida nem expor valores de ambiente.
- [ ] STG-02: cobrir a remediação com testes, executar fluxo sintético dos quatro instrumentos e preservar a equivalência psicométrica.
- [ ] STG-02: gerar novo SHA, novo Preview e nova evidência de revisão humana sem tocar RC1, `main`, ADS V1.1 ou produção.
- [ ] STG-01: validar OAuth, sessão, logout e persistência controlada sem expor ou solicitar credenciais.
- [ ] STG-01: auditar privacidade no navegador, runtime tRPC e logs do Preview específico do commit.
- [ ] STG-01: consolidar evidências e solicitar decisão humana vinculada ao SHA exato.
- [x] Restaurar e validar a camada PostgreSQL/Supabase antes de conectar o runtime de staging ao banco externo.
- [x] Direcionar tRPC, OAuth e sessão ao adaptador PostgreSQL validado pela SUPA-03.
- [x] Reconciliar a linhagem e localizar o artefato físico canônico da portabilidade RC-02 antes de reconstruir ou conectar o runtime PostgreSQL.

# SUPA-03 — RC2 PostgreSQL Baseline & Runtime Validation
- [x] Preservar as migrations MySQL apenas como histórico e retirar seu caminho do fluxo PostgreSQL ativo.
- [x] Gerar e revisar uma baseline PostgreSQL limpa a partir do schema reconciliado.
- [x] Criar o manifesto de ambiente runtime/migration sem valores sensíveis.
- [x] Aplicar a baseline no Supabase não produtivo e confirmar ausência de schema drift.
- [x] Inventariar as tabelas já existentes no schema público do Supabase e decidir a estratégia sem executar DDL destrutivo.
- [x] Confirmar um projeto Supabase vazio ou um schema exclusivo para Mental Saúde antes de aplicar a baseline PostgreSQL.
- [x] Comparar colunas e restrições das tabelas existentes ao schema canônico antes de qualquer remoção autorizada.
- [x] Exportar inventário estrutural do schema e remover somente tabelas comprovadamente externas à Mental Saúde.
- [x] Resolver a URL IPv4/Transaction Pooler e a autenticação necessária para a validação controlada do Supabase.
- [x] Registrar a URL do Transaction Pooler fornecida no cofre seguro e executar o teste de conectividade controlado.
- [x] Aplicar a credencial de teste autorizada ao cofre seguro com percent-encoding e validar a autenticação PostgreSQL.
- [x] Confirmar que a URI atualizada do Transaction Pooler passa no teste `SELECT 1` antes da aplicação da baseline.
- [x] Validar o segredo salvo manualmente pelo usuário no cofre do projeto antes de aplicar migrations PostgreSQL.
- [ ] Retomar o reporte e coletar a próxima diretriz no canal operacional após a recuperação da conexão do navegador.
- [x] Executar smoke tests controlados de leitura e escrita contra o runtime PostgreSQL.
- [x] Executar regressão psicométrica, testes de portabilidade e auditoria de privacidade.
- [x] Consolidar relatório SUPA-03 e reportar ao canal operacional, mantendo Preview Vercel e produção em HOLD.
- [x] Migrar a carga inicial canônica de instrumentos e metadados do banco legado para o PostgreSQL de staging, sem copiar dados pessoais ou resultados.
- [x] Cobrir os guardrails da migração SUPA-03 para garantir exclusão permanente de usuários, perfis, tentativas e respostas.

# Auditoria e Correção Urgente (Testes Vazios e Imagens Quebradas)
- [x] Inspecionar rotas e banco de dados para o carregamento dos testes (assessments)
- [x] Inspecionar carregamento de imagens de artigos e assets estáticos
- [x] Corrigir falha no carregamento dos testes e imagens dos artigos
- [x] Executar testes automatizados (vitest) e build de produção
- [x] Validar correções no preview e entregar relatório de auditoria

# Auditoria de estabilidade e usabilidade — 19/08/2026

- [x] Corrigir o schema/namespace PostgreSQL usado pela aplicação para que `assessments` e tabelas relacionadas sejam encontradas no banco Supabase correto.
- [x] Validar leitura real dos assessments publicados, perguntas e opções no catálogo público.
- [x] Corrigir o rewrite da Vercel para não transformar imagens, sitemap, feed, robots e llms.txt em `index.html`.
- [x] Publicar assets editoriais persistentes e substituir referências quebradas `/manus-storage`.
- [x] Adicionar fallback acessível para imagens de artigo e cards editoriais.
- [x] Executar auditoria de usabilidade desktop e mobile nos fluxos Home, Testes, Conteúdos, artigo, filtros, favoritos e CTA.
- [x] Cobrir as correções com testes Vitest, typecheck, build e validação visual.
- [x] Registrar relatório final da auditoria com evidências, bloqueios remanescentes e checkpoint.

# Auditoria completa de usabilidade — carregamento de testes e mídias

- [x] Inventariar rotas públicas e jornadas críticas para o teste de usabilidade.
- [x] Executar smoke test do catálogo, detalhes, início e fluxo de perguntas dos testes.
- [x] Executar smoke test de imagens editoriais, capas, assets e arquivos de SEO.
- [x] Verificar navegação, links crawlable, estados de carregamento, vazio e erro.
- [x] Verificar responsividade desktop/mobile, overflow, legibilidade e alvos de toque.
- [x] Verificar acessibilidade estrutural, foco, teclado, nomes acessíveis e contraste.
- [x] Corrigir regressões encontradas e cobri-las com Vitest.
- [x] Reexecutar check, testes, build e screenshots de validação.
- [x] Entregar relatório final da auditoria de usabilidade com evidências.

# Melhoria editorial — imagens em Continue explorando

- [x] Adicionar a imagem de destaque canônica aos cards da seção `Continue explorando` em `ArticlePage`.
- [x] Preservar o fallback acessível e o link semântico de cada card.
- [x] Validar desktop/mobile, integridade das capas, testes e build.
- [x] Salvar checkpoint da melhoria e entregar evidência visual.

# Compartilhamento social em artigos

- [x] Implementar botões acessíveis de WhatsApp, X, LinkedIn e copiar link nas páginas de artigos.
- [x] Garantir URLs canônicas, `target=_blank`, `rel=noopener noreferrer` e ausência de dados clínicos ou pessoais.
- [x] Validar interação de copiar link, acessibilidade, responsividade, testes e build.
- [x] Salvar checkpoint da melhoria de compartilhamento e entregar evidência visual.

# Missão — 5 Artigos & Clusters com SEO de IA (GEO / AIO)

- [ ] Definir a matriz estratégica dos 5 novos artigos e seus respectivos clusters (Fobia Social, Pânico, Compulsão Alimentar, Sofrimento Mental e Saúde Mental Preventiva).
- [ ] Incorporar diretrizes modernas de GEO (Generative Engine Optimization) e IA (Entities, Direct Answers, Knowledge Graph e E-E-A-T).
- [ ] Produzir os 5 artigos completos com parágrafos data-driven, ScientificCitation, EvidenceBox e FAQ.
- [ ] Implementar os artigos na base editorial (`articlesDatabase.ts`) com capas otimizadas e rotas reais.
- [ ] Executar suíte Vitest, typecheck, build e validações visuais desktop/mobile, salvando checkpoint sem publicação automática.

# Missão — Expansão Editorial 25 Artigos (5 Clusters x 5 Artigos)

- [ ] Definir a taxonomia completa dos 5 clusters com 5 artigos cada (total de 25 pautas inéditas).
- [ ] Compilar a especificação técnica e o manifesto de links internos / semânticos para os 25 artigos.
- [ ] Gerar e validar os arquivos markdown e os registros em TypeScript para os 25 artigos.
- [ ] Executar suíte Vitest, typecheck, build e salvar checkpoint sem publicação automática.
