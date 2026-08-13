# Checklist objetivo — barra de progresso e índice editorial

Data da validação: 13 de agosto de 2026.

| Caso verificado | Resultado | Evidência |
|---|---:|---|
| Barra de progresso existe no topo | PASS | O DOM do artigo contém um elemento com `role="progressbar"`. |
| Semântica do progresso | PASS | `aria-label="Progresso de leitura do artigo"`, `aria-valuemin="0"`, `aria-valuemax="100"` e `aria-valuenow="0"` no carregamento inicial. |
| Índice com links HTML | PASS | Foram encontrados 10 links com `href` para âncoras reais, de `#o-que-e-ansiedade` a `#referencias`. |
| Destaque de seção ativa | PASS | O primeiro item inicia com `aria-current="location"`; os demais não recebem o atributo até alcançarem o limiar de leitura. |
| Navegação por teclado | PASS por inspeção estrutural | Os itens do índice são elementos `<a>` nativos, portanto entram na ordem de tabulação; o índice mobile é aberto por `<button>` nativo. |
| Foco visível | PASS por inspeção estrutural | O projeto mantém estilos globais de `:focus-visible`; os links e o botão do índice usam elementos nativos e não removem o outline. |
| Índice mobile | PASS | Em viewport 390×844, o índice permanece recolhível, não cria overflow horizontal e o conteúdo segue em coluna única. |
| Responsividade desktop | PASS | Em viewport 1280×900, o índice aparece em coluna lateral sticky sem sobrepor o artigo. |
| Atualização de URL | PASS | A seleção de um item preserva o `href="#id"` e atualiza o hash via `history.replaceState`, mantendo deep-link crawlable. |
| Testes automatizados | PASS | Vitest: 12 arquivos e 33 testes aprovados, incluindo `readingProgress.test.ts`. |
| Build | PASS | `pnpm build` concluído sem erros de TypeScript ou bundling; permaneceu apenas o aviso existente de chunks grandes. |

Observação: a validação manual de teclado foi complementada por inspeção do DOM e dos elementos nativos. Não há `tabIndex` negativo nem remoção explícita de foco no índice ou na barra.

## Evidência adicional de teclado e foco

No preview funcional, o primeiro link do índice desktop foi focado e o navegador reportou `document.activeElement` como o link `O que é ansiedade`, com `outline-style: solid`, `outline-width: 3px` e cor teal (`rgb(10, 112, 102)`). Em seguida, o item foi ativado com a tecla **Enter**; o navegador atualizou o URL para `#o-que-e-ansiedade` e rolou o artigo até a seção correspondente. O controle mobile foi implementado como `<button type="button">` com `aria-expanded` e `aria-controls`, portanto mantém ativação nativa por teclado com Espaço/Enter quando exibido no breakpoint mobile.

### Navegação reversa

O primeiro link do índice desktop foi focado via console e o navegador recebeu **Shift+Tab**, movendo o foco para o controle focável anterior da página. A tela permaneceu no artigo e o índice manteve sua navegação por âncoras, sem erro de rota ou perda de contexto.

### Índice mobile e tecla Espaço

Para validar o breakpoint mobile sem alterar o código de produção, o contêiner do índice mobile foi exposto temporariamente no preview. O botão nativo `Neste conteúdo` recebeu foco com `focusVisible: true`; o DOM reportou `aria-expanded="false"`, `aria-controls="article-mobile-toc"`, `outline-style: solid`, `outline-width: 3px` e cor de foco `rgb(230, 169, 0)`. A tecla **Espaço** foi então pressionada e o navegador expandiu o índice, tornando visíveis os 10 links de âncora. O comportamento confirma foco visível e ativação por teclado do controle mobile.

### Viewport mobile

A captura responsiva dedicada confirmou o artigo em viewport real de `390×844`, com o índice mobile recolhível e sem overflow horizontal. A sessão interativa de inspeção permaneceu em `1280×1100`; o navegador não permitiu `window.resizeTo`, portanto a validação de teclado do botão mobile foi realizada com o controle temporariamente exposto, enquanto o comportamento visual mobile foi validado na captura responsiva dedicada.

### Prova completa em viewport mobile real via Chromium CDP

A validação automatizada foi executada em `390×844`, com `mobileMedia: true`. O foco chegou ao botão `Neste conteúdo` por **Tab** no passo 10 da sequência. O botão reportou `aria-controls="article-mobile-toc"`, `aria-expanded="false"`, `outline-style: solid`, `outline-width: 3px` e cor `rgb(230, 169, 0)`. A tecla **Espaço** alterou `aria-expanded` para `true` e revelou 10 links do índice. A tecla **Enter**, com o botão ainda focado, manteve o índice expandido. Em seguida, **Tab** levou ao primeiro link `O que é ansiedade` (`href="#o-que-e-ansiedade"`) e **Shift+Tab** retornou ao mesmo contexto navegável do índice. Essa execução cobre foco, Tab, Shift+Tab, Enter e Espaço em viewport mobile real.

### Prova de foco por Tab no índice desktop

Em viewport `1280×900`, com `desktopMedia: true`, a sequência de Tab chegou ao primeiro link do índice desktop no passo 28 (`O que é ansiedade`, `href="#o-que-e-ansiedade"`). O foco reportou outline sólido de 3px e cor teal (`rgb(219, 165, 8)`). A tecla **Enter** preservou o hash `#o-que-e-ansiedade` e a âncora ativa. A tecla **Shift+Tab** retornou ao item de índice no contexto navegável. Assim, o caminho de teclado até o índice desktop também está comprovado objetivamente.
