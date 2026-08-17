# MENTAL SAÚDE — ACTIVATION HANDOFF & READY_FOR_MANUAL_PRODUCTION_ACTIVATION REPORT (PL-00)

**Missão:** PL-00 (Production Activation Handoff & Observation Readiness)  
**Payload Congelado:** `PRODUCTION_RELEASE_1 = 94354619` (*Mental Saúde RC-1.0-Release*)  
**Data:** 16 de Agosto de 2026  
**Status de Governança:** Article Design System V1.1 **FROZEN**, AUTOPUBLISH **DISABLED**, Estado **`READY_FOR_MANUAL_PRODUCTION_ACTIVATION`**.  

---

## 1. Executive Summary & Payload Immutability

Este documento sela o pacote operacional e o handoff de prontidão para a primeira publicação controlada da plataforma *Mental Saúde*. 

O artefato imutável autorizado e congelado para produção é estritamente **`94354619`**. Nenhuma alteração de código, texto editorial, scoring ou metadados está permitida antes da ativação pública. O estado atual é **`READY_FOR_MANUAL_PRODUCTION_ACTIVATION`**, e a transição para **`PRODUCTION_LIVE_STABLE`** ocorrerá exclusivamente após o operador humano acionar o botão **Publish** e o Manus validar o ambiente público real.

---

## 2. Operator Manual Activation Runbook

Para efetivar a ativação pública em conformidade com as diretrizes do projeto:
1. **Seleção do Artefato:** Na interface de gerenciamento, selecione o checkpoint canônico **`94354619`**.
2. **Confirmação de Ambiente:** Valide que o destino é o ambiente de produção pública (`manus.space` / domínio configurado).
3. **Verificação de Governança:** Confirme que **`AUTOPUBLISH = DISABLED`** permanece inalterado.
4. **Acionamento:** Clique no botão **Publish** no painel superior direito.
5. **Notificação ao Manus:** Registre o horário da ativação e o deployment ID e informe imediatamente o Manus para iniciar a suíte PD-02 (Post-Launch Verification).

---

## 3. Post-Publish Smoke Pack & Verification Protocols

Imediatamente após o acionamento do *Publish*, o Manus executará no domínio público:
- **Jornadas Críticas:** Home, 4 Condition Hubs (Ansiedade, Depressão, TDAH, Estresse), páginas de artigos, e navegação mobile/desktop.
- **Instrumentos Psicométricos:** GAD-7, PHQ-9, ASRS v1.1 e DASS-21 utilizando dados sintéticos estritos para certificar o cálculo, a renderização e o boundary educativo (triagem vs. diagnóstico).
- **Privacy & SEO Gates:** Verificação de diretivas `noindex` em rotas de resultados, ausência de escores em sitemaps e metadados, e integridade de canonicals e robots.txt.
