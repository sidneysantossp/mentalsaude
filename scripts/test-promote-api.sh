#!/bin/bash

echo "🧪 Testando API de promoção de usuário..."
echo ""

# Testar localmente primeiro
echo "📡 Testando API local..."
curl -X POST http://localhost:3000/api/admin/promote \
  -H "Content-Type: application/json" \
  -d '{"email": "sid.websp@gmail.com"}' \
  -w "\n\nStatus: %{http_code}\n"

echo ""
echo "🌐 Testando API de produção..."
echo "Acesse: https://seu-dominio.vercel.app/admin/promote"
echo ""
echo "📋 Se não funcionar, verifique:"
echo "1. Logs no Vercel Dashboard"
echo "2. Variáveis de ambiente configuradas"
echo "3. Banco de dados acessível"