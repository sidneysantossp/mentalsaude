# Evidência do smoke test do catálogo

Data do teste: 2026-08-19

## Fluxo executado

1. Home do Preview: carregou corretamente e exibiu o menu público.
2. Clique no item **Testes** do menu: navegou para `/testes` com HTTP/renderização da página normal.
3. Estado observado em `/testes`: a página exibiu **"O catálogo está sendo preparado"** e não renderizou nenhum card de assessment.

## Conclusão

O fluxo de navegação até `/testes` funciona, mas o catálogo permanece vazio no runtime acessado pelo navegador. A correção defensiva adicionada a `listPublishedAssessments()` transforma uma falha de banco em `[]`, portanto a ausência de cards não prova que não existam dados; é necessário consultar os logs do servidor e comparar o ambiente efetivo de banco usado pelo Preview. O smoke test de abertura de instrumento não pôde prosseguir porque nenhum card foi renderizado.

## Status

- Home: PASS
- Navegação Home -> /testes: PASS
- Catálogo com assessments publicados: FAIL
- Abertura de assessment: BLOCKED pelo catálogo vazio
- Publicação: não executada
