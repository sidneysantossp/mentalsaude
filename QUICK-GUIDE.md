# 🚨 GUIA RÁPIDO - RESOLVENDO O PROBLEMA DE GITHUB

## ❌ O Problema
O repositório `sidneysantossp/mental-saude` **não existe** no GitHub.

## ✅ SOLUÇÃO MAIS FÁCIL (2 minutos)

### Passo 1: Criar Repositório no GitHub
1. Acesse: **https://github.com/new**
2. Repository name: **`mental-saude`**
3. Description: **`Sistema de saúde mental`**
4. Escolha **Public** ou **Private**
5. **DESMARQUE** todas as opções (README, .gitignore, license)
6. Clique em **"Create repository"**

### Passo 2: Copiar a URL
Após criar, o GitHub mostrará uma URL como:
```
https://github.com/sidneysantossp/mental-saude.git
```

### Passo 3: Enviar o Código
No seu terminal local (na pasta do projeto):

```bash
git remote add origin https://github.com/sidneysantossp/mental-saude.git
git push -u origin main
```

**Será solicitado usuário e senha do GitHub.**

## 🔐 Credenciais do Sistema
- **Email**: `sid.websp@gmail.com`
- **Senha**: `Admin@2024!`

## 📱 Se Funcionou
Parabéns! Seu projeto está no GitHub!
Próximo passo: configurar deploy na Vercel.

## ❌ Se Não Funcionou
### Problema 1: "Repository already exists"
- Use outro nome: `mental-saude-app` ou `mental-health-platform`
- Atualize o comando: `git remote add origin https://github.com/sidneysantossp/mental-saude-app.git`

### Problema 2: "Authentication failed"
- Use Personal Access Token em vez da senha
- Crie um em: GitHub > Settings > Developer settings > Personal access tokens

### Problema 3: "Permission denied"
- Verifique se você tem permissão para o repositório
- Tente usar seu próprio usuário

## 🎯 Comandos Úteis
```bash
# Verificar remote atual
git remote -v

# Mudar URL do remote
git remote set-url origin https://github.com/OUTRO_USUARIO/mental-saude.git

# Verificar status
git status

# Verificar commits
git log --oneline -5
```

---

**É só isso! Seu projeto está 100% pronto para ser enviado.** 🚀