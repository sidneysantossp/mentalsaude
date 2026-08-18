# INFRA-02 — Estado Inicial do Staging Vercel

O projeto **mental-saude-staging** foi criado no escopo da equipe Vercel `admsuisso-1633's projects` e vinculado ao repositório GitHub `sidneysantossp/mentalsaude` sem deployment automático. Na verificação inicial, o projeto não possuía deployment de produção nem preview, e a página de variáveis de ambiente não continha valores configurados.

O próximo passo autorizado é registrar os valores de runtime exclusivamente no ambiente **Preview**, sem expor secrets em arquivos, relatórios ou no histórico Git. A produção pública permanece em HOLD.

## Atualização de Configuração

A variável sensível `DATABASE_URL` foi salva com sucesso exclusivamente no ambiente **Preview**. O projeto está vinculado ao repositório `sidneysantossp/mentalsaude`, confirmado na configuração Git da Vercel. O projeto ainda não possui Preview Deployment; a ação de checklist não criou uma implantação, pois a Vercel requer um novo commit na conexão Git ou uma criação explícita de deployment.

## Evidência de Deployment

A branch `infra/vercel-staging-preview` foi enviada ao repositório canônico e disparou um deployment com commit `e14fa9b`, concluído como **Ready** em 25 segundos. Contudo, o painel Vercel o classificou como ambiente **Production**, apesar da branch não ser `main` e de a solicitação ser exclusivamente para staging. Não houve qualquer promoção manual nem domínio customizado associado. A URL técnica do deployment deve ser tratada apenas como evidência de staging até que a configuração de Production Branch da Vercel seja corrigida e revisada.

O endpoint MCP da Vercel retornou `403 Forbidden` ao tentar listar deployments para o projeto, portanto o monitoramento foi realizado pelo painel Vercel já autenticado e autorizado.

O deployment recebeu os aliases `mental-saude-staging.vercel.app`, `mental-saude-staging-git-infra-69965d-admsuisso-1633s-projects.vercel.app` e `mental-saude-staging-48q1udm67-admsuisso-1633s-projects.vercel.app`. A inspeção funcional deve usar apenas o alias específico da branch, enquanto a classificação **Production** não for corrigida.

## Bloqueio Funcional

O alias técnico específico da branch respondeu com o conteúdo JavaScript empacotado de `server/_core/index.ts`, em vez de renderizar a interface React. Portanto, embora o build esteja marcado como **Ready**, o deployment não é funcional para validação de produto. A investigação deve se concentrar na configuração de build/runtime Vercel; nenhuma aprovação de staging ou produção pode ser inferida deste resultado.

Os logs de build do deployment estão disponíveis no painel e reportam 155 linhas, com dois avisos sinalizados pela Vercel. A etapa seguinte é extrair a configuração de build aplicável e reconciliá-la com o runtime Express/Vite do repositório.

A configuração Git confirma `sidneysantossp/mentalsaude` como repositório conectado. A tela não expõe a seleção de Production Branch; a correção dessa classificação precisa ser localizada nas configurações gerais de Build and Deployment, antes de qualquer novo push.

A configuração de Build and Deployment detectou o preset **Vite**, porém utiliza o diretório de saída padrão `dist`. O build do projeto produz o frontend em `dist/public` e também gera `dist/index.js` para o servidor Express; por isso a Vercel publicou o bundle do servidor como conteúdo estático na raiz. A correção mínima exige configurar o Output Directory como `dist/public` e incluir uma adaptação explícita de Vercel para API/SPA no repositório.

O Output Directory do projeto foi atualizado para `dist/public`. O painel mostrou que o deployment classificado como Production possui um **Production Override** próprio para Output Directory, que diverge da nova configuração global. Esse override precisa ser removido ou alinhado antes do próximo deployment; a alteração não disparou um novo deploy.

As configurações atuais de Environment não possuem nenhum ambiente customizado. A Vercel concentra o vínculo de branch de Production nesta área; a próxima ação de infraestrutura é registrar `main` como o único branch de Production, para que `infra/vercel-staging-preview` seja tratado como Preview.

A revisão da área de Environments confirmou que **Production** está vinculado exclusivamente a `main`, enquanto **Preview** recebe todos os branches Git não atribuídos. Portanto, a branch `infra/vercel-staging-preview` será tratada como Preview nos próximos pushes. O deployment já existente conserva o rótulo histórico incorreto, mas nenhuma nova promoção ocorrerá a partir da branch de staging.

O commit de infraestrutura `7b02768` foi enviado exclusivamente à branch `infra/vercel-staging-preview`. A Vercel criou corretamente um novo deployment no ambiente **Preview**, em estado **Building**, confirmando que a segregação de ambientes foi restaurada. O deployment anterior `e14fa9b` permanece apenas como registro histórico classificado indevidamente como Production.

O Preview `7b02768` continuava em construção após mais de um minuto. A classificação permaneceu **Preview** durante o monitoramento. A próxima verificação é feita nos logs de build, sem redirecionamento ou promoção de ambiente.

O deployment `7b02768` concluiu como **Ready** em 27 segundos no ambiente **Preview**. O painel exibiu uma miniatura da home renderizada, indicando que `dist/public` passou a ser servido no lugar do bundle de servidor. O alias técnico de branch é `mental-saude-staging-git-infra-69965d-admsuisso-1633s-projects.vercel.app`; o smoke test continuará por esse alias, sem utilizar domínio de Production.

## Smoke Test Parcial

A home do Preview renderizou corretamente, incluindo navegação pública, CTA, disclaimer de autoavaliação e controles de acessibilidade. A rota profunda `/testes` também foi atendida pelo fallback SPA, sem erro de roteamento. Entretanto, o catálogo exibiu o estado vazio de preparação em vez dos instrumentos publicados, o que é compatível com o bloqueio conhecido: o runtime ainda aponta para o adaptador MySQL e não pode operar com a `DATABASE_URL` PostgreSQL do ambiente Preview. A investigação funcional seguirá pelo endpoint de API, mas o staging Supabase não pode ser aprovado enquanto a camada PostgreSQL não for restaurada e conectada.

O teste direto de `/api/trpc/assessments.listPublished` retornou `404 NOT_FOUND`. Os logs de build mostram que a Vercel identificou o arquivo `api/[...path].ts`, mas o pipeline TypeScript do runtime aplicou tipos `Request`/`Response` incompatíveis a módulos Express reutilizados, gerando erros em `oauth.ts` e `cookies.ts`. A publicação estática permanece Ready, porém a função não foi emitida; a próxima correção deve adotar o entrypoint Express nativo da Vercel, em vez de um wrapper de API que aciona essa validação incompatível.

O wrapper `api/[...path].ts` foi substituído por `server.ts`, com export padrão de uma aplicação Express nativa, conforme a convenção atual da Vercel. A validação local passou com 65/65 testes, build de produção e `tsc --noEmit`. O commit `b7c07b3` foi enviado à branch de Preview e seu deployment aparece corretamente em fila, sem alteração em `main`.

Após o monitoramento adicional, o deployment `b7c07b3` continuava em estado **Queued**. Nenhuma alteração de ambiente, promoção ou novo push foi realizado enquanto a Vercel não iniciar o build.

A tentativa subsequente `915384e` substituiu o entrypoint TypeScript por `api/[...path].js`, para impedir a checagem de tipos incompatível aplicada pelo builder de funções. Ela foi validada localmente com 65/65 testes, build e checagem TypeScript aprovados, porém permanece em estado **Queued** no painel Vercel mesmo após mais de três minutos. O Preview funcional de interface continua disponível no deployment estático anterior `7b02768`; a validação da API e do Supabase permanece bloqueada até o processamento da fila ou uma intervenção na plataforma Vercel.

Uma verificação final confirmou que `915384e` permanece em **Queued** após quatro minutos, enquanto os deployments `7b02768` e `b7c07b3` constam como Ready no ambiente Preview. Não foram realizadas novas tentativas de redeploy para evitar criar mais filas paralelas.

## Reconciliação de Linhagem RC-02

A auditoria de referências confirmou que o repositório local possui apenas a tag `v1.0.0-rc1` e que não há commit, branch, tag, pull request ou objeto inalcançável com referência a `SUPA`, `PostgreSQL`, `RC-02` ou `v1.0.0-rc2`. A inspeção direta da API do GitHub confirmou que o repositório público tem apenas a branch `infra/vercel-staging-preview` como default e nenhuma tag publicada. Assim, a portabilidade reportada historicamente não está presente na linhagem Git atualmente acessível. Em conformidade com a diretriz do canal operacional, a próxima ação é recuperar e inspecionar o checkpoint RC-02 arquivado, sem reconstruir a camada PostgreSQL sobre a branch de staging atual.
