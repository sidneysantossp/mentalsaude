# Validação da leitura editorial

A validação visual do artigo `ansiedade-o-que-e-sintomas-causas` foi executada em desktop (1280×900) e mobile (390×844).

No desktop, o índice `Neste conteúdo` aparece em uma coluna lateral sticky e mantém as âncoras dos blocos do artigo. No mobile, o índice permanece recolhível, sem overflow horizontal, e o conteúdo continua legível em uma única coluna. A barra de progresso é renderizada como uma faixa fixa no topo, com semântica `role="progressbar"`, valores de 0 a 100 e atualização baseada no scroll real do documento.

A suíte Vitest passou com 33 testes em 12 arquivos. O build de produção também passou, com apenas o aviso existente de chunks grandes do bundle.
