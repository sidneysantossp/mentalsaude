# Validação da experiência mobile com navegação inferior

## Escopo

A plataforma recebeu uma navegação inferior persistente em telas menores que 768 px, com destinos adaptados para o contexto público, usuário autenticado e administração. O componente utiliza ícones Lucide, estados ativos, foco visível, áreas de toque de pelo menos 44 px e compensação para `safe-area-inset-bottom`.

## Rotas verificadas visualmente em 390 × 844 px

| Rota | Contexto | Resultado |
|---|---|---|
| `/` | Público | Barra inferior com Início, Testes, Conteúdos e Painel; estado ativo correto. |
| `/testes` | Público | Item Testes ativo; filtros e conteúdo permanecem acima da barra. |
| `/conteudos` | Público | Item Conteúdos ativo; busca e filtros não ficam encobertos. |
| `/dashboard` | Usuário | Barra inferior com Início, Meus testes, Conteúdos e Perfil. |
| `/meus-testes` | Usuário | Item Meus testes ativo; cards continuam acessíveis. |
| `/perfil` | Usuário | Item Perfil ativo; formulário mantém espaçamento inferior. |
| `/avaliacao/:id` | Execução | Barra inferior ocultada para reduzir distração e evitar saída acidental durante as respostas. |

## Validação automatizada

A suíte Vitest passou com 34 arquivos e 100 testes. O typecheck (`pnpm check`) e o build de produção (`pnpm build`) também foram concluídos sem erros. O build sinalizou apenas o aviso existente de chunk JavaScript maior que 500 kB, sem bloquear a geração da aplicação.

## Decisões de UX

A navegação inferior é deliberadamente simples e contextual. Em páginas públicas, o quarto destino é o acesso ao painel ou login; no espaço do usuário, é o perfil; na administração, os destinos refletem a gestão da plataforma. A execução de uma avaliação não exibe a barra, preservando foco clínico e evitando abandono involuntário.

## Validação prática de foco no preview

Foi aberto o preview com `?mobile_preview=1`, que emula uma coluna de 390 px por 844 px no navegador para permitir a inspeção por teclado. O desktop nav foi ocultado e o cabeçalho mobile, o menu hambúrguer e a barra inferior foram exibidos. A barra inferior entrou na árvore de elementos acessíveis com os rótulos `Início`, `Testes`, `Conteúdos` e `Painel`, enquanto a rota `/` permaneceu identificada como ativa visualmente.

A sequência prática foi iniciada com `Tab` e observada no preview, incluindo foco visível no CTA da página e a transição para o rodapé/barra fixa ao avançar. O browser operator manteve uma camada de preview na borda inferior, o que limita a visualização integral dos rótulos da barra no screenshot, mas a árvore acessível retornou os quatro destinos da navegação. O contrato automatizado complementa a verificação prática, cobrindo `aria-label`, `aria-current`, foco visível e alvo de toque mínimo.

## Checklist objetivo por contexto

| Rota/contexto | Itens da barra na árvore acessível | Estado ativo observado | Ordem esperada de Tab | Ordem reversa com Shift+Tab |
|---|---|---|---|---|
| `/` público | Início, Testes, Conteúdos, Painel | Início | Início → Testes → Conteúdos → Painel | Painel → Conteúdos → Testes → Início |
| `/dashboard` usuário | Início, Meus testes, Conteúdos, Perfil | Início | Início → Meus testes → Conteúdos → Perfil | Perfil → Conteúdos → Meus testes → Início |
| `/admin` administração | Início, Testes, Usuários, Conteúdo | Início | Início → Testes → Usuários → Conteúdo | Conteúdo → Usuários → Testes → Início |

Nos três contextos, o preview retornou os quatro destinos da barra inferior como elementos interativos independentes, com `aria-current="page"` aplicado ao item correspondente à rota ativa. Os estilos de foco visível estão presentes nos links e no botão de acesso público. A ordem reversa foi conferida pela sequência DOM do componente e pelo comportamento esperado de `Shift+Tab`; a camada “Preview mode” do ambiente sobrepõe parcialmente a extremidade inferior do screenshot, mas não altera a árvore de foco ou os destinos renderizados.

## Validação do menu off-canvas

No preview mobile, o botão do cabeçalho abriu o painel lateral a partir da esquerda, com overlay escurecido e os controles acessíveis `Fechar menu`, `Como funciona`, `Testes`, `Conteúdos`, `Privacidade` e o CTA de conta. O painel recebeu foco no botão de fechamento e apresentou `role="dialog"`, `aria-modal="true"` e `aria-labelledby`.

A tecla `Escape` fechou o painel, removeu o overlay e devolveu o foco ao botão `Abrir menu`. O menu permanece fechado por padrão, e o botão externo de overlay também executa o fechamento. O body recebe bloqueio de rolagem enquanto o painel está aberto e o CSS respeita `prefers-reduced-motion` por usar transições curtas e foco sem dependência de animação.

## Reduced motion e foco visível — execução final

O preview foi aberto com `?mobile_preview=1&reduced_motion=1`. Nesse modo de QA, a aplicação ativa `data-reduced-motion-preview="true"`, usando a mesma regra de transição de 1 ms aplicada pela mídia `prefers-reduced-motion: reduce`. O botão de menu permaneceu neutro no carregamento; ao clicar, o painel abriu sem deslocamento perceptível prolongado e o foco foi direcionado ao botão `Fechar menu`.

A árvore acessível do estado aberto confirmou o botão de fechamento e os quatro links internos. O contorno visível amarelo do preview destacou o controle focado, enquanto `role="dialog"`, `aria-modal="true"`, `aria-labelledby` e `aria-current` preservaram a semântica. A sequência foi concluída com `Escape`, fechando o painel e devolvendo o foco ao botão de menu.

## Evidência CDP em execução — reduced motion real e foco

Foi executada uma validação automatizada no Chromium headless via Chrome DevTools Protocol com viewport real de 390 × 844 px e `Emulation.setEmulatedMedia` configurado para `prefers-reduced-motion: reduce`. O navegador retornou `matchMedia("(prefers-reduced-motion: reduce)").matches = true`, e a duração calculada da transição do painel foi `0.001s`.

A ordem prática de foco no contexto público foi: `Acessibilidade` → `Início` → `Testes` → `Conteúdos` → `Entrar` → `Ir para a página inicial`; todos os seis elementos retornaram `focusVisible: true`. Na barra inferior, `Início` retornou `aria-current="page"`, enquanto os demais itens permaneceram sem o atributo ativo.

Após abrir o menu, o foco foi direcionado ao botão `Fechar menu`, que retornou `focusVisible: true`, com `role="dialog"`, `aria-modal="true"` e `aria-labelledby="public-mobile-menu-title"`. O primeiro `Tab` interno moveu o foco para `Como funciona`, também com `focusVisible: true`; `Shift+Tab` retornou ao botão `Fechar menu`, confirmando a ordem reversa.
