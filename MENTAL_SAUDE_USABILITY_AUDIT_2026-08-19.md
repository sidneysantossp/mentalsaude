# Auditoria de Usabilidade — Mental Saúde

**Data:** 19 de agosto de 2026  
**Ambiente:** Preview gerenciado do projeto `mental-saude-platform`  
**Escopo:** carregamento de testes e mídias, navegação pública, jornada de execução, estados de loading/erro, responsividade, acessibilidade, SEO e estabilidade técnica.

## Resultado executivo

A auditoria encontrou e corrigiu três problemas de experiência que poderiam ser percebidos como falhas no site. O primeiro era a seleção de um teste por visitante: após o login, o destino genérico `/dashboard` fazia o usuário perder o teste escolhido. O segundo era o lançador do ASRS, que dependia de redirecionamento automático e podia permanecer visualmente em um spinner. O terceiro era o CTA canônico de GAD-7 e PHQ-9, que apontava para `/testes` apesar de não existir uma rota de execução pública para esses instrumentos.

Após as correções, o catálogo público retornou **10 autoavaliações publicadas**, as rotas testadas responderam com HTTP 200, as capas editoriais entregaram arquivos WebP válidos e a experiência mobile foi capturada sem overflow horizontal nos fluxos principais. A suíte final ficou em **27 arquivos e 79 testes aprovados**, com typecheck e build de produção aprovados.

> **Resultado geral: PASS no preview.** A versão corrigida está salva no checkpoint disponibilizado ao usuário; a publicação em produção continua sendo uma ação manual.

## Matriz de smoke tests

| Superfície | Evidência | Resultado |
|---|---|---:|
| `/` | HTML SPA entregue | PASS |
| `/testes` | HTML SPA + tRPC `assessments.listPublished` | PASS |
| `/conteudos` | HTML SPA + catálogo editorial | PASS |
| `/conteudos/ansiedade-o-que-e-sintomas-causas` | HTML SPA + imagem editorial | PASS |
| `/testes/gad-7` | Entidade canônica informativa | PASS |
| `/testes/phq-9` | Entidade canônica informativa | PASS |
| `/testes/asrs` | Entidade ASRS e CTA de início | PASS |
| `/testes/asrs/iniciar` | Lançador com ação explícita de autenticação | PASS |
| `/testes/nonexistent` | Estado “Instrumento não encontrado” | PASS |
| `/avaliacao/999` | Loading/guard de rota autenticada | PASS — sem crash |
| `/robots.txt` | `text/plain`, HTTP 200 | PASS |
| `/llms.txt` | `text/plain`, HTTP 200 | PASS |
| `/sitemap.xml` | `application/xml`, HTTP 200 | PASS |
| `/feed.xml` | `application/rss+xml`, HTTP 200 | PASS |

A chamada pública do catálogo retornou 10 objetos com `status: publicado`. O primeiro registro observado foi `teste-depressao-autoobservacao`; o inventário também inclui o ASRS publicado com o slug `asrs-v1-1-adultos-6q`.

## Carregamento das mídias

Foram verificadas as capas de ansiedade, depressão, TDAH, autocuidado, estresse e sono no storage persistente do projeto. Todas responderam com a assinatura binária `RIFF ... WEBP` e tamanhos entre aproximadamente 278 kB e 448 kB. As capas regeneradas que inicialmente haviam retornado placeholders foram substituídas no catálogo e passaram a entregar imagens reais.

O componente `EditorialImage` continua tratando ausência ou falha de carregamento com um fallback semântico `role="img"` e `aria-label`. Dessa forma, uma falha futura não deixa um bloco preto nem remove o contexto da capa. As capturas finais do Hub Editorial e do artigo de ansiedade mostram capas visíveis e sem áreas quebradas.

Uma observação técnica não bloqueante é que o proxy de preview informou `text/plain` em algumas respostas de storage apesar dos bytes serem WebP válidos. O navegador usado na validação renderizou as imagens corretamente. Recomenda-se confirmar no deployment público que o header final seja `image/webp`; essa melhoria de MIME não foi necessária para corrigir a experiência observada no preview.

## Jornada dos testes

A jornada do catálogo autenticado segue para `/avaliacao/:id`, que recupera a entidade completa, suas perguntas e opções pelo tRPC e aplica consentimento antes do início. Para visitantes, `beginLogin(destination)` agora preserva `/avaliacao/:id` em `mental-saude:post-login`, evitando o retorno indevido ao dashboard sem o teste selecionado.

A entidade canônica foi reconciliada com as rotas reais. GAD-7 e PHQ-9 permanecem entidades informativas sem execução pública publicada; seus CTAs exibem explicitamente “Execução pública ainda não publicada” em vez de apontar para o catálogo genérico. O ASRS usa `/testes/asrs` como entidade e `/testes/asrs/iniciar` como lançador de execução. O lançador exibe uma ação clara, solicita autenticação quando necessário e leva o usuário para `/avaliacao/1` quando o ASRS publicado é localizado.

| Fluxo | Resultado |
|---|---:|
| Visitante em `/testes` escolhe um card | PASS — destino pós-login preservado |
| Usuário autenticado escolhe um card | PASS — `/avaliacao/:id` |
| Artigo → entidade GAD-7 | PASS — `/testes/gad-7`, sem execução fictícia |
| Artigo → entidade PHQ-9 | PASS — `/testes/phq-9`, sem execução fictícia |
| Artigo → entidade ASRS | PASS — `/testes/asrs` |
| ASRS → lançador | PASS — `/testes/asrs/iniciar` |
| Lançador ASRS sem sessão | PASS — botão “Entrar e iniciar avaliação” |
| Rota canônica inexistente | PASS — estado seguro e links de retorno |

## Responsividade e usabilidade visual

A matriz visual foi capturada em **1280×900** e **390×844**. Foram revisados Home, catálogo, entidades GAD-7/PHQ-9/ASRS, Hub Editorial, artigo de ansiedade, lançador ASRS e estados de erro.

| Critério | Desktop | Mobile | Resultado |
|---|---:|---:|---:|
| Navbar e escape route | PASS | PASS | links públicos preservados |
| Catálogo com 10 cards | PASS | PASS | cards em coluna e botões fluidos |
| Filtros por categoria | PASS | PASS | quebra de linha, sem rolagem horizontal |
| Capas editoriais | PASS | PASS | WebP renderizado e fallback disponível |
| Headline do artigo | PASS | PASS | hierarquia legível |
| Índice e barra de progresso | PASS | PASS | estrutura disponível no artigo |
| CTAs contextuais | PASS | PASS | sem links para rota genérica indevida |
| ASRS entity page | PASS | PASS | disclaimer e CTA utilizáveis |
| Lançador ASRS | PASS | PASS | não permanece em spinner indefinido |
| Estado de item inexistente | PASS | PASS | mensagem e retornos claros |
| Overflow horizontal | não identificado | não identificado | PASS |
| Contraste e nomes acessíveis | PASS | PASS | controles com textos/labels visíveis |

## Logs e privacidade

Os logs recentes não mostraram falhas 4xx/5xx nas rotas públicas ou no catálogo durante a captura. O registro `Missing session cookie` foi esperado ao testar as páginas autenticadas sem sessão e foi tratado pelo guard de autenticação. Não foram inseridos dados clínicos, respostas reais ou dados pessoais no teste.

O tracking observado nas rotas públicas enviou eventos de navegação anônimos; a auditoria não identificou score, resposta ou conteúdo clínico sendo incluído na telemetria do fluxo verificado.

## Validação automatizada final

| Verificação | Resultado |
|---|---:|
| `pnpm check` | PASS |
| Vitest | **27 arquivos / 79 testes PASS** |
| `pnpm build` | PASS |
| Build Vite | PASS |
| Bundle Express/Vercel | PASS |
| Integridade de assets | PASS |
| Rotas canônicas | PASS |
| Retorno pós-login | PASS |
| Lançador ASRS | PASS |

O build mantém apenas o aviso conhecido de chunk JavaScript superior a 500 kB. Isso não bloqueou a construção nem a navegação e deve ser tratado separadamente como otimização de code splitting.

## Correções implementadas

| Arquivo | Alteração |
|---|---|
| `client/src/components/ProtectedRoute.tsx` | `beginLogin(destination)` preserva a rota escolhida |
| `client/src/pages/TestCatalog.tsx` | visitante retorna diretamente a `/avaliacao/:id` após login |
| `client/src/data/testsCanonicalDatabase.ts` | `executionRoute` opcional; GAD-7/PHQ-9 sem execução fictícia; ASRS alinhado |
| `client/src/components/ContextualTestCTA.tsx` | CTA secundário condicional, sem link quebrado |
| `client/src/pages/CanonicalTestDetailPage.tsx` | estado explícito para entidades sem execução pública |
| `client/src/pages/AsrsEntityPage.tsx` | lançador sem spinner indefinido, ação explícita e retorno pós-login |
| `server/usabilityRouting.test.ts` | nova cobertura das jornadas críticas |
| `server/articleDesignSystemV11.test.ts` | rotas semânticas atualizadas |
| `server/tdahSecondWave.test.ts` | expectativa reconciliada com `/testes/asrs` |
| `server/tdahFirstWaveIntegrityCloseout.test.ts` | asserção do novo lançador ASRS |
| `todo.md` | checklist da auditoria atualizado |

## Limitações e próximos cuidados

O runtime atual continua usando o banco gerenciado do projeto, que contém a carga válida dos 10 testes. A migração definitiva para o schema Supabase identificado pelo usuário permanece uma tarefa de infraestrutura separada; ela não deve ser feita como parte de uma correção de usabilidade sem aplicar primeiro uma baseline PostgreSQL não destrutiva e validar as tabelas no projeto correto.

O checkpoint desta auditoria deve ser publicado manualmente pela interface de gerenciamento quando o usuário decidir promover a versão. Antes do Publish, recomenda-se repetir os quatro smoke tests públicos (`/testes`, `/conteudos`, `/sitemap.xml`, `/feed.xml`) no domínio final e confirmar o header MIME das imagens no deployment público.

## Arquivos de evidência

O checklist executável está em `todo.md`. A cobertura de assets está em `server/assetIntegrity.test.ts`; as jornadas estão em `server/usabilityRouting.test.ts`; a reconciliação do Article Design System permanece em `server/articleDesignSystemV11.test.ts`; e os testes do fluxo ASRS estão em `server/tdahFirstWaveIntegrityCloseout.test.ts`.
