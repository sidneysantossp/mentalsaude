# Validação de navegação do domínio

## Resultado

A navegação direta para `https://mentalsaude.com.br/` falhou: a raiz retornou código JavaScript bruto contendo o bundle de `server/assessmentLogic.ts`, sem elementos HTML da aplicação.

A navegação para o Preview `https://3000-icfczf6wm6fz2m2lch5jj-cfee851e.us4.manus.computer/` passou: a raiz exibiu a interface Mental Saúde, incluindo menu, hero, CTAs e conteúdo público.

## Conclusão

O código frontend e o servidor local/Preview estão servindo a aplicação. O domínio público está apontando para um artefato/deployment diferente ou para uma configuração de projeto Vercel que publica o bundle backend como arquivo estático. A correção deve ser feita na associação do domínio/deployment e nas configurações efetivas do projeto Vercel; não é um problema de navegação do usuário nem de cache do navegador.
