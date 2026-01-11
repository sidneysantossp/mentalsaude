# Configuração de Variáveis de Ambiente - Vercel

## ⚠️ IMPORTANTE: Configurar no Painel do Vercel

O sitemap está gerando URLs localhost porque as variáveis de ambiente precisam ser configuradas diretamente no Vercel.

### 🚀 Passos para Configurar:

1. **Acessar Painel do Vercel**
   - URL: https://vercel.com/dashboard
   - Projeto: mentalsaude

2. **Configurar Variáveis de Ambiente**
   - Vá para: Settings → Environment Variables
   - Adicione as seguintes variáveis:

```
NEXT_PUBLIC_SITE_URL=https://mentalsaude.vercel.app
NEXTAUTH_URL=https://mentalsaude.vercel.app
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
```

3. **Variáveis do Supabase (já configuradas)**
```
NEXT_PUBLIC_SUPABASE_URL=https://boocllnhuqukpwvzsulg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_7g3Xq93BnPNseQ6xPZho1w_Rvtj0cwr
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvb2NsbG5odXF1a3B3dnpzdWxnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDMwMDY3MywiZXhwIjoyMDc5ODc2NjczfQ.csPzgH6KidRzNkbg3SRVBcNi2UCbpZsF4bBiLB12vaY
```

4. **Database URL**
```
DATABASE_URL=postgresql://postgres:KmSs147258%21%40%23%24%25@db.boocllnhuqukpwvzsulg.supabase.co:5432/postgres
```

### 🔄 Redeploy Após Configuração

Depois de configurar as variáveis:
1. Vá para a aba "Deployments"
2. Clique nos três pontos (...) do último deploy
3. Selecione "Redeploy"

### ✅ Verificação

Após o redeploy, verifique:
- `https://mentalsaude.vercel.app/sitemap.xml` (deve mostrar URLs corretas)
- `https://mentalsaude.vercel.app/robots.txt` (deve apontar para sitemap correto)

### 📋 Resumo das Variáveis Críticas

| Variável | Valor Produção | Importância |
|----------|----------------|------------|
| `NEXT_PUBLIC_SITE_URL` | `https://mentalsaude.vercel.app` | 🔥 Crítico (Sitemap) |
| `NEXTAUTH_URL` | `https://mentalsaude.vercel.app` | 🔥 Crítico (Auth) |
| `NEXTAUTH_SECRET` | Chave secreta | 🔥 Crítico (Auth) |

A variável `NEXT_PUBLIC_SITE_URL` é a mais importante para corrigir o sitemap!
