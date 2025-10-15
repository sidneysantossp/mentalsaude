# 🚀 Checklist de Configuração - Deploy na Vercel

## ✅ Já Configurado
- [x] Tabelas MySQL criadas
- [x] Variável JWT_SECRET configurada na Vercel
- [x] Código migrado para MySQL + JWT

## 🔧 Verificações Necessárias

### 1. Variáveis de Ambiente na Vercel
Verifique se todas as variáveis estão configuradas no painel da Vercel:

```
DATABASE_URL=mysql://anticosccb_mentalsaude:KmSs147258!@203.161.38.188:3306/anticosccb_mentalsaude
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

### 2. Configuração do Banco de Dados MySQL
Verifique se:

- [ ] **IP da Vercel está liberado no firewall** do MySQL
- [ ] **Usuário tem permissões** corretas no banco
- [ ] **Banco de dados está ativo** e acessível remotamente
- [ ] **Porta 3306 está aberta** para conexões externas

### 3. Liberação de IP na Vercel
Adicione os IPs da Vercel na whitelist do seu MySQL:
- Verifique a documentação do seu provedor MySQL
- Geralmente é necessário adicionar IPs estáticos da Vercel

### 4. Teste de Conexão
Execute este teste após o deploy:
```bash
# Testar API de autenticação
curl -X POST https://seu-dom.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Testar listagem de testes
curl https://seu-dom.vercel.app/api/tests
```

## 🚨 Possíveis Problemas e Soluções

### Problema: Conexão Timeout
**Causa:** Firewall bloqueando acesso externo
**Solução:** Liberar IP da Vercel no banco de dados

### Problema: Access Denied
**Causa:** Usuário sem permissão de acesso remoto
**Solução:** 
```sql
-- No MySQL, execute:
GRANT ALL PRIVILEGES ON anticosccb_mentalsaude.* TO 'anticosccb_mentalsaude'@'%';
FLUSH PRIVILEGES;
```

### Problema: JWT Secret não encontrado
**Causa:** Variável não configurada na Vercel
**Solução:** Adicionar JWT_SECRET nas Environment Variables

## 📋 Arquivos Críticos para Verificar

### 1. Prisma Schema
Verifique se `prisma/schema.prisma` está configurado para MySQL:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### 2. Variáveis de Ambiente
Verifique `.env.local` vs Vercel:
- As variáveis devem ser idênticas
- JWT_SECRET deve ser a mesma

### 3. API Routes
Verifique se as rotas usam o MySQL:
- `/api/auth/login`
- `/api/auth/register`
- `/api/tests`
- `/api/test-results`

## 🔍 Debug no Deploy

### 1. Logs da Vercel
```bash
vercel logs
```

### 2. Variáveis de Ambiente
```bash
vercel env ls
```

### 3. Teste de Build
```bash
vercel build
```

## ✅ Checklist Final de Deploy

Antes de ir para produção:

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Banco de dados acessível remotamente  
- [ ] Testes de API funcionando localmente
- [ ] Build sem erros
- [ ] Logs sem erros críticos
- [ ] Teste completo do fluxo de usuário

## 🆘 Suporte

Se tiver problemas:

1. **Verifique os logs** da Vercel primeiro
2. **Teste a conexão** com o banco diretamente
3. **Verifique variáveis** de ambiente
4. **Confirme permissões** do usuário MySQL

---

## 📝 Importante

O erro de conexão que vimos (`ETIMEDOUT`) geralmente indica:
1. Firewall bloqueando acesso
2. IP não liberado no banco
3. Banco não configurado para acesso remoto

Verifique esses pontos antes de fazer o deploy!