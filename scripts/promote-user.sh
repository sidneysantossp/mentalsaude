#!/bin/bash

echo "🚀 Testando promoção do usuário sid.websp@gmail.com para admin..."
echo ""

# Fazer requisição para a API
curl -X POST http://localhost:3000/api/admin/promote \
  -H "Content-Type: application/json" \
  -d '{"email": "sid.websp@gmail.com"}' \
  -w "\n\nStatus: %{http_code}\nTempo: %{time_total}s\n"

echo ""
echo "✅ Teste concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Acesse: https://seu-dominio.vercel.app/admin/promote"
echo "2. Confirme o email: sid.websp@gmail.com"
echo "3. Clique em 'Promover para Admin'"
echo "4. Peça para o usuário fazer logout e login novamente"