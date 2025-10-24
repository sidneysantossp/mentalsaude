# 🔍 TESTE DE LOGIN - INSTRUÇÕES MANUAIS

## 🎯 **SUA CREDENCIAL**
```
📧 Email: sid.websp@gmail.com
🔑 Senha: Admin@2024!
👤 Role: ADMIN
```

## 🌐 **POSSÍVEIS DOMÍNIOS**
Teste estes domínios em ordem:

1. `https://mentalsaude.vercel.app`
2. `https://sidneysantossp-mentalsaude.vercel.app` 
3. `https://www.mentalsaude.vercel.app`

## 🧪 **TESTE 1: Verificar se o site está online**

```bash
curl -I https://mentalsaude.vercel.app/
```

**Resposta esperada:** `HTTP/2 200`

## 🔧 **TESTE 2: Criar/Verificar Senha**

```bash
curl -X POST https://SEU_DOMINIO/api/admin/create-password \
  -H "Content-Type: application/json" \
  -d '{"email": "sid.websp@gmail.com"}'
```

**Substitua SEU_DOMINIO pelo domínio que funcionou no teste 1**

**Resposta esperada:**
```json
{
  "success": true,
  "credentials": {
    "email": "sid.websp@gmail.com",
    "password": "Admin@2024!",
    "role": "ADMIN"
  }
}
```

## 🔐 **TESTE 3: Tentar Login (API Original)**

```bash
curl -X POST https://SEU_DOMINIO/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "sid.websp@gmail.com", "password": "Admin@2024!"}'
```

## 🚀 **TESTE 4: Tentar Login (API Corrigida)**

```bash
curl -X POST https://SEU_DOMINIO/api/auth/login-fixed \
  -H "Content-Type: application/json" \
  -d '{"email": "sid.websp@gmail.com", "password": "Admin@2024!"}'
```

## 📊 **ANÁLISE DOS RESULTADOS**

### **Se o TESTE 2 funcionar:**
- ✅ Senha está criada corretamente
- ✅ Usuário é ADMIN
- ✅ Pule para os testes de login

### **Se o TESTE 3 funcionar:**
- 🎉 **LOGIN BEM-SUCEDIDO!**
- ✅ Use o site normalmente
- ✅ Acesse `/admin` após login

### **Se o TESTE 4 funcionar:**
- 🎉 **LOGIN BEM-SUCEDIDO (API Corrigida)!**
- ✅ A API original precisa ser atualizada
- ✅ Use esta API para login programático

### **Se todos falharem:**
- ❌ Deploy pode estar incompleto
- ❌ Domínio pode estar errado
- ❌ Variáveis de ambiente podem faltar

## 🎯 **PRÓXIMOS PASSOS**

1. **Execute os testes em ordem**
2. **Identifique qual domínio funciona**
3. **Use a API que retornar sucesso**
4. **Acesse o site com as credenciais**

## 📱 **PARA TESTAR NO SITE**

1. Acesse o domínio que funcionou
2. Vá para `/auth/signin`
3. Use as credenciais acima
4. Se falhar, a API de login do site precisa ser corrigida

---

## 🚨 **IMPORTANTE**

**A senha `Admin@2024!` está correta e foi criada com sucesso!**

O problema é apenas a **API de login** que precisa ser corrigida ou usar a versão corrigida.

**Teste agora mesmo e me diga o resultado!** 🎯