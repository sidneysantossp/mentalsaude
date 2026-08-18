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
