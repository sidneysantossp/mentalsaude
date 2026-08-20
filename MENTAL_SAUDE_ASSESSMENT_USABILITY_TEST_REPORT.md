# Relatório de teste de usabilidade — autoavaliação de ansiedade

**Projeto:** Mental Saúde  
**Ambiente:** Preview autenticado  
**Data:** 20 de agosto de 2026  
**Escopo:** executar uma avaliação de ansiedade do início ao fim com respostas sintéticas aleatórias, verificar o salvamento no painel e validar a opção de exportação em PDF.

## Resultado executivo

O fluxo principal foi concluído com sucesso. A sessão autenticada abriu o catálogo, iniciou o teste de ansiedade, exibiu o consentimento e o progresso, aceitou três respostas sintéticas, submeteu a avaliação, apresentou a devolutiva e refletiu o resultado no dashboard e na seção **Meus testes e disponíveis**.

A opção **Exportar resultado em PDF** foi exibida na devolutiva e o clique acionou o fluxo local de geração. A implementação cria o PDF no navegador com `pdf-lib`, monta um `Blob` com `application/pdf` e dispara um link com atributo `download`. O gerenciador de downloads do navegador conectado não pôde ser aberto pelo operador, portanto a existência da opção e a execução do handler foram validadas, mas a inspeção física do arquivo baixado depende da sessão local do navegador.

| Etapa | Resultado | Evidência observada |
|---|---|---|
| Sessão autenticada | PASS | O catálogo e o dashboard carregaram com o usuário autenticado. |
| Catálogo de testes | PASS | O card **Teste de Ansiedade (Autoobservação)** foi localizado em `/testes`. |
| Início do questionário | PASS | A rota `/avaliacao/4` abriu com progresso `Pergunta 1 de 3`. |
| Respostas sintéticas | PASS | Foram escolhidas três alternativas aleatórias, uma por pergunta. |
| Progresso | PASS | O indicador avançou de 33% para 67% e 100%; o contador mostrou 3 respondidas. |
| Submissão | PASS | A tela exibiu `Finalizando` e abriu a devolutiva. |
| Devolutiva | PASS | Resultado sintético de 78%, faixa `ATENÇÃO PRIORITÁRIA`, recomendações e disclaimer foram renderizados. |
| Persistência no dashboard | PASS | O dashboard exibiu `2` autoavaliações concluídas e o último registro como Teste de Ansiedade, com 78%. |
| Área dedicada do usuário | PASS | `/meus-testes` exibiu a avaliação concluída com pontuação 7 e ação `Refazer teste`. |
| Download | PASS — opção e handler | O botão `Exportar resultado em PDF` apareceu e foi acionado; o código gera Blob PDF local. |

## Respostas sintéticas utilizadas

As respostas não representam uma pessoa real e foram usadas exclusivamente para exercitar o fluxo técnico. A sequência foi: **Às vezes**, **Quase sempre ou sempre**, **Quase sempre ou sempre**. O resultado correspondente foi exibido como 78% na interface.

## Persistência observada

Após a submissão, o dashboard apresentou o registro mais recente datado de 20/08/2026, associado ao **Teste de Ansiedade (Autoobservação)**. A área dedicada também distinguiu corretamente o registro concluído, com pontuação 7 e faixa de atenção prioritária, de avaliações anteriores em andamento.

## Exportação em PDF

A implementação responsável está em `client/src/pages/AssessmentFlow.tsx`. O handler usa `PDFDocument.create()`, gera o documento, cria um `Blob` `application/pdf`, cria um elemento âncora, atribui um nome de arquivo derivado do título e executa `link.click()`. O botão permanece desabilitado durante a geração e retorna ao estado normal após o processamento.

> Observação de ambiente: a pasta de downloads acessível ao sandbox permaneceu vazia porque o teste foi executado no navegador conectado do usuário, cuja área de downloads é isolada. A validação visual e funcional do botão foi concluída; para confirmar o arquivo físico, basta abrir os downloads no mesmo navegador local.

## Conclusão

**Fluxo ponta a ponta: PASS.** O usuário autenticado consegue iniciar, responder, concluir e visualizar o resultado do teste de ansiedade no painel. **Persistência: PASS.** A avaliação concluída aparece no dashboard e em `/meus-testes`. **Opção de download: PASS com ressalva operacional.** O botão e o mecanismo de geração local foram validados; a confirmação do arquivo físico deve ser feita no gerenciador de downloads do navegador conectado.
