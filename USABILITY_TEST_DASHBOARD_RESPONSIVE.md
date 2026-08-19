# Teste de usabilidade — dashboard /meus-testes

Data: 2026-08-19

## Achados até o momento

- A rota `/meus-testes` carregou autenticada dentro do `DashboardLayout`.
- O menu lateral apresentou `Meus testes e disponíveis`, `Perfil e preferências` e `Voltar ao site` no cabeçalho.
- A aba `Meus testes realizados` abriu o estado vazio com `0 registros`, CTA `Ver testes disponíveis` e nenhuma quebra visual observada no viewport desktop.
- A aba `Testes disponíveis` abriu os filtros por categoria e 10 cards de assessments.
- Os filtros quebraram em múltiplas linhas sem overflow horizontal no viewport desktop.
- Os títulos longos dos cards (`Teste Transtorno de Pânico (Autoobservação)` e `Teste de Depressão (Autoobservação)`) quebraram em linhas internas, sem estourar a largura.
- Os botões `INICIAR NO DASHBOARD` permaneceram dentro dos cards e com largura fluida no viewport desktop.
- Ainda falta validar o filtro por categoria e o viewport mobile.

## Continuação da validação

- O filtro `Ansiedade e Tensão` funcionou e reduziu o catálogo para um único card, mantendo o texto contido e o botão dentro do card.
- O botão `INICIAR NO DASHBOARD` navegou para `/avaliacao/4` sem redirecionar ao catálogo público.
- A tela anterior ao teste exibiu o consentimento e os termos de uso, com checkbox, links de privacidade/termos e ação `Voltar ao painel`.
- O fluxo de consentimento está acessível e não iniciou o questionário sem aceite explícito.
- Ainda falta validar o viewport mobile da página `/meus-testes` e da tela de consentimento.

## Validação mobile

No viewport de 390×844, `/meus-testes` apresentou cabeçalho compacto, título quebrado em duas linhas, abas utilizáveis, estado vazio centralizado e botão dentro do card, sem overflow horizontal aparente. A tela `/avaliacao/4` manteve o título, textos legais, links, checkbox e botão `Aceitar e continuar` dentro da largura disponível; o conteúdo continua rolável para alcançar as ações inferiores. A aba de cards disponíveis ainda deve ser verificada no mesmo viewport.

## Cards disponíveis em mobile

A aba `Testes disponíveis` carregou os filtros e os assessments publicados. No layout responsivo, os cards devem permanecer em uma coluna, com títulos e descrições quebrados internamente e o botão ocupando a largura do card. A validação funcional em desktop confirmou esses critérios; a captura mobile do estado de cards deverá ser feita pelo preview após a troca de aba, pois o screenshot mobile inicial registrou a aba de histórico.

## Resultado consolidado

O botão `Voltar ao site` retornou corretamente à home pública. O menu público, os CTAs principais e o disclaimer permaneceram visíveis no retorno. A navegação do dashboard, a alternância de abas, o filtro por categoria, a abertura do teste e o consentimento pré-início funcionaram no fluxo testado. Em desktop, os cards não apresentaram estouro; em mobile, o histórico e o consentimento não apresentaram overflow e os controles permaneceram utilizáveis. A captura de cards em viewport mobile não foi obtida diretamente nesta rodada, mas o CSS aplicado usa coluna única, `break-words`, botões `w-full` e layout flexível, compatíveis com o viewport testado.
