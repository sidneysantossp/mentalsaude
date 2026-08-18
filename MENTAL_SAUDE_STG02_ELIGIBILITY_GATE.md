# Mental Saúde — STG-02: Gate de Elegibilidade dos Instrumentos

**Data:** 18 de agosto de 2026  
**Estado:** **DASS-21 PUBLIC EXECUTION BLOCKED**

## Diretriz canônica recebida

O canal operacional confirmou a decisão após revisar a fonte primária. A DASS-21 permanece exclusivamente como entidade editorial e informativa na superfície pública; não terá CTA de questionário, execução pública, score automatizado ou interpretação automática. Não há no projeto aprovação clínica/jurídica para um ambiente restrito que pudesse alterar essa decisão.

| Controle de produto | Estado |
|---|---:|
| `DASS21_PUBLIC_EXECUTION` | BLOCKED |
| `DASS21_AUTOMATED_PUBLIC_RESULT` | BLOCKED |
| `DASS21_EDITORIAL_ENTITY` | ALLOWED |
| Escopo ativo STG-02 | ASRS/OAuth; GAD-7 e PHQ-9 seguem em gate de proveniência. |

## Decisão de segurança

A missão STG-02 requer corrigir rotas e reconciliações, mas não autoriza alterar a natureza clínica dos instrumentos ou ignorar suas condições de uso. A revisão das fontes primárias confirma que a DASS-21 não deve ser administrada a membros do público em website ou aplicativo aberto, nem receber devolutiva automatizada de pontuação. Portanto, a rota pública `/testes/dass-21/iniciar` **não será implementada** como execução de questionário ou resultado automático.

> A FAQ oficial da DASS afirma que, em um site ou app aberto ao público, sua administração não é permitida; restringe o uso eletrônico a grupos definidos, com resultados devolvidos ao clínico/pesquisador, e alerta contra interpretação automatizada. [1]

| Instrumento | Fonte disponível | Elegibilidade de execução pública | Decisão STG-02 |
|---|---|---:|---|
| GAD-7 | Fontes de uso público identificadas; texto/versão brasileira ainda devem ser reconciliados com uma origem canônica versionada. | Condicional | Não habilitar até recuperar conteúdo e scoring aprovados. |
| PHQ-9 | Fontes de uso público identificadas; texto/versão brasileira ainda devem ser reconciliados com uma origem canônica versionada. | Condicional | Não habilitar até recuperar conteúdo e scoring aprovados. |
| ASRS v1.1 — 6Q | Fonte Harvard permite o screener de 6 questões, sem alteração, com direitos e algoritmo preservados. | Sim, sob condições | Corrigir somente o OAuth/runner sem mudar itens ou scoring. |
| DASS-21 | Fonte oficial permite cópia, mas **proíbe execução pública em site/app aberto** e devolutiva automatizada ao respondente. | **Não** | Manter como entidade editorial/referência; nenhuma execução ou resultado público. |

## Consequência de implementação

O requisito inicial de quatro fluxos públicos da STG-02 entra em conflito com a regra de uso da DASS-21. A única correção segura é: (a) recuperar e validar as fontes canônicas de GAD-7 e PHQ-9 antes de reativá-los; (b) corrigir o fluxo ASRS sem modificar o instrumento; e (c) manter DASS-21 sem execução pública. Uma exceção exigiria uma decisão clínica e jurídica explícita, além de um ambiente restrito a grupo definido com encaminhamento a profissional.

## Hardening OAuth Preview

A tentativa de login com configuração Preview ausente deixava a interface lançar `TypeError: Invalid URL`. O cliente agora valida a presença e a sintaxe de `VITE_APP_ID` e `VITE_OAUTH_PORTAL_URL` antes de criar o nonce ou navegar. Em configuração ausente ou inválida, a rota protegida apresenta uma mensagem controlada, sem expor URL, segredo ou stack; os gatilhos globais de tRPC também deixam de propagar uma exceção não tratada.

| Validação local | Resultado |
|---|---:|
| Teste unitário de URL OAuth ausente/inválida | PASS |
| Teste unitário de callback origin preservada | PASS |
| TypeScript | PASS |
| Vitest | PASS — 24 arquivos e 72 testes. |
| Build de produção | PASS |

O teste de login real permanece pendente da presença das quatro variáveis necessárias no ambiente Preview da Vercel, sem alterar produção.

## Referências

[1] [UNSW — DASS FAQ](https://www2.psy.unsw.edu.au/groups/dass/DASSFAQ.htm)  
[2] [Harvard Medical School — Adult ADHD Self-Report Scales (ASRS)](https://www.hcp.med.harvard.edu/ncs/asrs.php)  
[3] [PHQ Screeners](https://www.phqscreeners.com/)
