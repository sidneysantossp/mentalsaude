# Plano de Ação Prático para Escala — Mental Saúde (`www.mentalsaude.com.br`)

> **Objetivo do Documento:** Estabelecer um roteiro tático, faseado e auditável para consolidar a **Mental Saúde** como a plataforma de referência em autoavaliações e saúde mental baseada em evidências no Brasil, com foco em alcançar o patamar de **1 milhão de visitas orgânicas mensais**.

---

## 1. Fundamentos e Premissas de Crescimento (E-E-A-T e GEO)

A conquista de tráfego orgânico em massa no setor de saúde (segmento YMYL — *Your Money Your Life*) exige conformidade estrita com os critérios de Experiência, Expertise, Autoridade e Confiabilidade (E-E-A-T) do Google, além de otimização para motores de busca generativos (GEO / AIO) [1]. Atualmente, a plataforma conta com uma base sólida de **64 artigos de autoridade temática** e **11 instrumentos clínicos validados** (incluindo GAD-7, PHQ-9, ASRS v1.1 e PCL-5).

O modelo de crescimento para 1 milhão de visitas mensais baseia-se em quatro vetores sinérgicos:
1. **Captura de Intenção de Busca de Topo e Meio de Funnel:** Posicionamento em termos de sintomas, critérios diagnósticos e ferramentas de triagem rápida.
2. **Experiência de Uso (UX) Sem Atrito:** Conclusão fluida de testes com feedback visual imediato, relatórios em PDF e persistência segura no painel do usuário.
3. **Autoridade Temática em Clusters:** Organização do conteúdo em pilares interconectados que cobrem transtornos de humor, ansiedade, neurodesenvolvimento, trauma e comportamentos aditivos.
4. **Infraestrutura Técnica de Alta Resiliência:** indexação automatizada via sitemaps dinâmicos, feeds RSS otimizados, marcação Schema.org e monitoramento por GA4 e GSC.

---

## 2. Roadmap Faseado para Escala (1M Visitas/Mês)

O plano de execução divide-se em quatro marcos estratégicos de 30 dias cada, estruturados para garantir estabilidade técnica antes da aceleração de tráfego.

### Fase 1: Validação de Produção, Indexação e Rastreamento (Dias 1 a 30)
* **Objetivo:** Garantir que o Googlebot e os rastreadores de IA indexem integralmente as 64 páginas de artigos e os 11 testes.
* **Ações Práticas:**
  - Acionar o botão **Publish** no painel de gerenciamento para ativar o deploy oficial em `www.mentalsaude.com.br`.
  - Submeter o `sitemap.xml` atualizado e o `feed.xml` diretamente no Google Search Console.
  - Validar o recebimento de eventos no GA4 (`G-ESJR38DZBW`), especialmente o evento personalizado de conclusão de teste (`anxiety_test_completed`).
  - Auditar os dados estruturados (`MedicalWebPage`, `FAQPage`, `ClaimReview`) em todas as novas páginas.

### Fase 2: Expansão de Conteúdo Long-Tail e Clusters de Autoridade (Dias 31 a 60)
* **Objetivo:** Capturar variações de busca de média e longa cauda associadas aos novos clusters (TOC, TEPT, TAB, TDPM, dependências e psicossomática).
* **Ações Práticas:**
  - Publicar guias práticos de apoio para familiares e cuidadores vinculados aos artigos principais.
  - Expandir o uso de caixas de citação científica (`ScientificCitation`) e painéis de evidências em todas as páginas de artigos.
  - Implementar links internos cruzados entre os instrumentos clínicos e os artigos correspondentes (ex: PCL-5 vinculado ao artigo de TEPT).

### Fase 3: PR Digital, Autoridade Externa e Link Building Ético (Dias 61 a 90)
* **Objetivo:** Construir autoridade de domínio através de menções em portais de saúde, universidades e imprensa especializada.
* **Ações Práticas:**
  - Estabelecer parcerias com profissionais de saúde mental (psicólogos e psiquiatras) para validação e revisão peer-review do conteúdo editorial.
  - Publicar comunicados de imprensa e relatórios de tendências em saúde mental com base nos dados agregados e anônimos das autoavaliações da plataforma.
  - Participar de diretórios acadêmicos e científicos de saúde pública.

### Fase 4: Otimização de Conversão (CRO) e Retenção de Usuários (Dias 91 a 120)
* **Objetivo:** Transformar visitantes únicos em usuários recorrentes que acompanham sua evolução emocional no painel.
* **Ações Práticas:**
  - Aprimorar o fluxo de sugestão de novos testes com base no histórico do usuário.
  - Introduzir lembretes de acompanhamento e reavaliação periódica (ex: reavaliação de ansiedade após 30 dias).
  - Otimizar o desempenho de renderização e tempo de carregamento em dispositivos móveis.

---

## 3. Matriz de Métricas e Indicadores de Sucesso (KPIs)

Para acompanhar o progresso rumo à meta, a operação deve monitorar semanalmente os seguintes indicadores:

| Métrica / KPI | Ferramenta de Monitoramento | Marco Alvo (Fase 1) | Marco Alvo (Fase 4) |
| :--- | :--- | :--- | :--- |
| **Impressões Orgânicas Mensais** | Google Search Console | 50.000 | 2.500.000 |
| **Cliques Orgânicos (Tráfego)** | Google Search Console | 5.000 | 1.000.000 |
| **Conclusões de Testes** | Google Analytics 4 (GA4) | 1.500 | 250.000 / mês |
| **Taxa de Erro de Servidor (5xx)** | Logs de Deploy / Vercel | 0,00% | 0,00% |
| **Erros de Core Web Vitals** | PageSpeed Insights / GSC | Zero "Poor" | 100% "Good" |

---

## 4. Salvaguardas Éticas, Clínicas e de Privacidade

Como a plataforma lida com dados sensíveis de saúde mental (YMYL), todas as fases do plano seguem rigorosamente as normas de proteção de dados e ética profissional:
* **Privacidade Absoluta:** Nenhuma resposta de questionário, escore individual ou dado clínico é enviado para ferramentas de rastreamento ou compartilhado com terceiros.
* **Isenção de Diagnóstico:** Todos os relatórios e páginas de teste exibem avisos claros de que as autoavaliações possuem caráter educativo e de triagem, não substituindo a avaliação médica profissional.
* **Transparência Metodológica:** Os testes utilizam instrumentos validados internacionalmente, citando expressamente as referências científicas e os pontos de corte oficiais.

---

## Referências

[1] Google Search Central. *Creating helpful, reliable, people-first content*. Disponível em: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>. Acesso em: 2026.
