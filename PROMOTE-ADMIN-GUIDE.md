# 🛡️ Promover Usuário para Admin - Guia Completo

## 🎯 **Objetivo**
Promover o usuário `sid.websp@gmail.com` para administrador do sistema.

## 📋 **Duas Formas de Fazer**

### 🚀 **Opção 1: Interface Web (Recomendado)**

1. **Acesse a página de promoção**:
   ```
   https://seu-dominio.vercel.app/admin/promote
   ```

2. **Confirme o email** (já vem preenchido):
   ```
   sid.websp@gmail.com
   ```

3. **Clique no botão**:
   ```
   Promover para Admin
   ```

4. **Aguarde a confirmação**:
   ```
   ✅ Usuário promovido para ADMIN com sucesso!
   ```

### 🔧 **Opção 2: API Direta**

Se preferir usar a API diretamente:

```bash
curl -X POST https://seu-dominio.vercel.app/api/admin/promote \
  -H "Content-Type: application/json" \
  -d '{"email": "sid.websp@gmail.com"}'
```

## 📊 **O que Acontece**

1. **Verificação**: Sistema busca o usuário no banco
2. **Atualização**: Muda a role de 'USER' para 'ADMIN'
3. **Confirmação**: Retorna o status atualizado
4. **Permissões**: Usuário ganha acesso ao painel admin

## 🔄 **Passos Finais**

**IMPORTANTE**: Após a promoção, o usuário precisa:

1. **Fazer Logout** da conta atual
2. **Fazer Login** novamente para carregar as novas permissões
3. **Acessar o Painel Admin** em `/admin`

## ✅ **Verificação**

Para confirmar que funcionou:

- O usuário verá novas opções no menu
- Poderá acessar `/admin` sem erros
- Terá acesso a relatórios e configurações

## 🚨 **Segurança**

- Apenas admins podem promover outros usuários
- A API valida o email antes de promover
- Todas as ações são logadas para auditoria

---

## 🎉 **PRONTO!**

O usuário `sid.websp@gmail.com` será promovido a admin e terá acesso completo ao painel administrativo!

**Execute agora**: Acesse `https://seu-dominio.vercel.app/admin/promote`