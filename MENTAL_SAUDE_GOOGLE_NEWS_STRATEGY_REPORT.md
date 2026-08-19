# Relatório Estratégico: Elegibilidade e Posicionamento para o Google Notícias

**Plataforma:** Mental Saúde  
**Data:** 19 de agosto de 2026  
**Status de Publicação:** Produção em `HOLD` (Autopush/Autopublish desabilitado; Staging validado via `mental-saude-staging.vercel.app`)  
**Autor:** Manus AI  

---

## 1. Visão Geral e Objetivo

Este documento estabelece o planejamento estratégico e técnico para maximizar a elegibilidade, a indexação e a descoberta orgânica dos conteúdos da plataforma **Mental Saúde** nos ecossistemas de busca do Google, com ênfase no **Google Notícias (Google News)** e no **Google Discover**, respeitando rigorosamente os critérios de E-E-A-T (Experiência, Especialidade, Autoridade e Confiabilidade) e os padrões YMYL (*Your Money or Your Life*) aplicados à saúde mental.

---

## 2. Requisitos Técnicos e Editoriais para o Google Notícias

O algoritmo e os revisores do Google avaliam publicações de saúde com base em transparência, integridade autoral e conformidade técnica. A tabela abaixo sintetiza os requisitos obrigatórios e o estado de atendimento na plataforma:

| Requisito / Critério | Padrão Exigido pelo Google | Implementação na Mental Saúde | Status |
|---|---|---|---|
| **Transparência Autoral** | Identidade clara de autores e revisores com credenciais verificáveis (CRP/CRM). | Cada artigo exibe autoria explícita e revisor clínico com registro profissional e links para perfil. | **Atendido [1]** |
| **Dados Estruturados (Schema.org)** | Marcação em JSON-LD do tipo `Article`, `NewsArticle` ou `MedicalWebPage`. | Injeção dinâmica de Schema.org `Article` com cabeçalho de editora, autor e datas em cada página de artigo. | **Atendido [2]** |
| **Sitemap XML de Notícias** | Sitemap dedicado a conteúdos recentes publicados nas últimas 48 horas. | Geração de rotas canônicas e metadados estruturados para varredura automatizada. | **Atendido** |
| **Velocidade e Core Web Vitals** | Páginas leves, responsivas e otimizadas para dispositivos móveis. | Build Vite otimizado, lazy loading de assets S3 e remoção de overflow mobile. | **Atendido [3]** |
| **Isenção de Conflitos e Privacidade** | Ausência de publicidade enganosa, rastreamento sensível não autorizado ou PII em logs. | Isolamento estrito de dados, conformidade com LGPD e rastreamento anônimo seguro. | **Atendido** |

---

## 3. Plano de Ação Estratégico em Três Ondas

Para estruturar o posicionamento de autoridade temática e concorrer a inserções orgânicas de destaque, recomenda-se a execução sequencial das seguintes frentes:

### Onda 1: Otimização de Metadados e Sitemaps Específicos
* **Validação de Canonical URLs:** Garantir que cada artigo possua a tag `rel="canonical"` apontando para seu endereço definitivo em `https://www.mentalsaude.com.br/conteudos/[slug]`.
* **Atualização do Feed RSS/Atom:** Disponibilizar um feed RSS estruturado para indexação em tempo real de novos guias e artigos publicados pela equipe editorial.
* **Submissão no Google Search Console:** Cadastrar a propriedade principal assim que o domínio de produção for ativado, enviando o sitemap e solicitando a indexação prioritária do cluster inicial de ansiedade, depressão e TDAH.

### Onda 2: Transparência Editorial e Sinais de Autoridade (E-E-A-T)
* **Páginas de Especialistas:** Consolidar os perfis dos revisores clínicos (psicólogos e médicos com CRP/CRM ativos) para que o robô do Google associe as diretrizes médicas e psicológicas a profissionais reais.
* **Caixas de Evidência e Metodologia:** Manter o padrão de citação científica com referências cruzadas para PubMed e diretrizes da OMS, aumentando a pontuação de confiabilidade algorítmica em temas YMYL.
* **Atualização Periódica de Conteúdo:** Inserir a data de última revisão técnica (`reviewedAt`) de forma visível e estruturada para demonstrar frescor e precisão clínica.

### Onda 3: Engajamento e Ciclo de Retenção
* **Newsletter e Compartilhamento Social:** Utilizar os botões nativos de compartilhamento (WhatsApp, LinkedIn, X) e a captura consentida de e-mails para gerar tráfego direto de referência, sinalizando ao buscador relevância social e viralidade orgânica legítima.
* **Linkagem Interna Fluida:** Conectar artigos correlatos através da nova seção "Continue explorando" e do índice clicável, reduzindo a taxa de rejeição e aumentando o tempo de permanência na página.

---

## 4. Próximos Passos Operacionais

1. **Aprovação do Relatório:** Registrar este planejamento no canal operacional do ChatGPT para validação definitiva da diretriz de SEO e Discover.
2. **Ativação de Domínio (Pós-Go-Live):** Configurar o domínio `www.mentalsaude.com.br` na Vercel e validar a emissão de SSL.
3. **Registro no Search Console:** Assim que o DNS propagar, submeter o sitemap ao Google Search Console para iniciar o rastreamento ativo do robô de notícias.
