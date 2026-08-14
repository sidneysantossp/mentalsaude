# Relatório Canônico: TDAH Second Wave (Mental Saúde)

Este documento registra a conclusão oficial e os resultados da **TDAH Second Wave** na plataforma **Mental Saúde**, operando sob o **Content Authority Engine V1** e o **Article Design System V1.1 (FROZEN)**.

---

## 1. Visão Geral e Escopo Executado

A Segunda Onda do cluster de TDAH expande a cobertura editorial para intenções cruciais do meio do funil (MOFU), cobrindo diferenciação de procrastinação, caminhos de avaliação profissional e o panorama de tratamento multimodal.

### Artigos Publicados na Second Wave:
1. **`/conteudos/tdah-ou-procrastinacao`**
   - **Intent:** `COMPARISON`
   - **Funnel:** `TOFU`
   - **Primary Entity:** `TDAH`
   - **Original Value:** `COMPARISON_FRAMEWORK`
   - **Canonical Test Mapping:** `ASRS v1.1` (`relatedTestSlug: "asrs"`)

2. **`/conteudos/qual-profissional-procurar-tdah`**
   - **Intent:** `PROFESSIONAL_HELP`
   - **Funnel:** `MOFU`
   - **Primary Entity:** `TDAH`
   - **Original Value:** `CARE_PATHWAY_FRAMEWORK`
   - **Canonical Test Mapping:** `ASRS v1.1` (`relatedTestSlug: "asrs"`)

3. **`/conteudos/tratamento-tdah-adultos`**
   - **Intent:** `TREATMENT`
   - **Funnel:** `MOFU`
   - **Primary Entity:** `TDAH`
   - **Original Value:** `MULTIMODAL_CARE_FRAMEWORK`
   - **Canonical Test Mapping:** `ASRS v1.1` (`relatedTestSlug: "asrs"`)

---

## 2. Garantias Clínicas e de Segurança (YMYL)

- **Ausência de Atalhos Diagnósticos:** Nenhum artigo converte sintomas isolados ou escores de rastreio em diagnóstico formal. O ASRS v1.1 é mantido estritamente como instrumento educativo de triagem.
- **Boundaries de Tratamento:** O artigo de tratamento aborda a abordagem multimodal baseada em diretrizes internacionais (NICE, OMS), com restrição estrita contra menção a dosagens, substâncias específicas com viés prescritivo ou promessas de cura.
- **Separação de Papéis Profissionais:** A orientação de busca de ajuda destaca a atuação multiprofissional (psicologia e psiquiatria) sem impor uma hierarquia rígida ou ordem universal de atendimento.

---

## 3. Integridade e Resultados da Suíte de Testes

- **Testes Automatizados (Vitest):** **63/63 testes aprovados** (incluindo todas as suítes anteriores e a nova suíte dedicada `server/tdahSecondWave.test.ts`).
- **Build de Produção:** Compilado com sucesso (`vite build` e transpilação do servidor Node.js).
- **Article Design System V1.1:** Mantido **FROZEN** e 100% aderente aos contratos de componentes e mapeamento data-driven.

---

## 4. Conclusão e Próximos Passos

A **TDAH Second Wave** foi concluída com sucesso e aprovada em todas as verificações de engenharia e segurança clínica. **STOP GATE atingido; AUTOPUBLISH permanece DISABLED.**
