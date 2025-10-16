#!/bin/bash

# 🚀 Script para enviar projeto Mental Saúde para o GitHub
# Execute este script no seu ambiente local após clonar o projeto

echo "🚀 Enviando projeto Mental Saúde para o GitHub..."
echo ""

# 1. Verificar se estamos no branch correto
git branch -M main

# 2. Adicionar remote origin (substitua SEU_USUARIO pelo seu usuário do GitHub)
echo "📝 Configurando repositório remoto..."
git remote add origin https://github.com/sidneysantossp/mental-saude.git

# 3. Enviar para GitHub
echo "📤 Enviando código para GitHub..."
git push -u origin main

echo ""
echo "✅ Projeto enviado com sucesso!"
echo ""
echo "🔐 Credenciais de Acesso:"
echo "   Email: sid.websp@gmail.com"
echo "   Senha: Admin@2024!"
echo ""
echo "🌐 Acesse seu projeto em: https://github.com/sidneysantossp/mental-saude"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Configure o deploy na Vercel"
echo "   2. Conecte o repositório do GitHub"
echo "   3. Configure as variáveis de ambiente"
echo "   4. Faça o deploy!"