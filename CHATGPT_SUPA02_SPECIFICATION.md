# Especificação Canônica — SUPA-02 (PostgreSQL Release Candidate Integration & Hosting Preflight)

**Fonte:** https://chatgpt.com/g/g-p-6a7fe939667c819181e8af0c8afd781a-mental-saude/c/6a7fec27-6364-83e9-93d0-76f5951e7eb5  
**Status:** GO  
**Deploy Público:** PROIBIDO  
**RC1 (`94354619` / `v1.0.0-rc1`):** IMUTÁVEL  
**Novo Candidato:** `v1.0.0-rc2`  

## Diretrizes da SUPA-02

1. **Isolamento de Branch:** A portabilidade Drizzle/PostgreSQL não deve ser fundida diretamente na branch principal de produção do RC1 (`main`). Criaremos ou consolidaremos a branch de integração RC-02.
2. **Tag Imutável `v1.0.0-rc2`:** O novo candidato a release formal para PostgreSQL/Supabase receberá a tag `v1.0.0-rc2`.
3. **Revalidação de Gates YMYL / Privacy:** Garantir que o Article Design System V1.1 permaneça **FROZEN**, `AUTOPUBLISH = DISABLED`, e que os escores clínicos e dados pessoais continuem protegidos sob `noindex`.
4. **Preflight Vercel / Cloudflare:** Auditar e documentar a configuração de build, outputs e variáveis de ambiente na Vercel para PostgreSQL, sem acionar publicações acidentais.
