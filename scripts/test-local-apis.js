// Script para testar APIs localmente antes do deploy
const http = require('http');

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: body ? JSON.parse(body) : null
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPIs() {
  console.log('🧪 Testando APIs localmente...\n');

  try {
    // Testar listagem de testes
    console.log('1. Testando GET /api/tests');
    try {
      const testsResponse = await makeRequest('/api/tests');
      if (testsResponse.status === 200) {
        console.log('✅ /api/tests funcionando');
        console.log(`   ${testsResponse.data.length} testes encontrados`);
      } else {
        console.log('❌ /api/tests com erro:', testsResponse.status);
      }
    } catch (error) {
      console.log('❌ /api/tests falhou:', error.message);
    }

    // Testar registro de usuário
    console.log('\n2. Testando POST /api/auth/register');
    try {
      const registerData = {
        email: `test_${Date.now()}@example.com`,
        password: '123456',
        name: 'Test User'
      };
      const registerResponse = await makeRequest('/api/auth/register', 'POST', registerData);
      if (registerResponse.status === 201) {
        console.log('✅ /api/auth/register funcionando');
        console.log(`   Usuário criado: ${registerResponse.data.user.email}`);
      } else {
        console.log('❌ /api/auth/register com erro:', registerResponse.status);
      }
    } catch (error) {
      console.log('❌ /api/auth/register falhou:', error.message);
    }

    // Testar login
    console.log('\n3. Testando POST /api/auth/login');
    try {
      const loginData = {
        email: 'test@example.com',
        password: '123456'
      };
      const loginResponse = await makeRequest('/api/auth/login', 'POST', loginData);
      if (loginResponse.status === 200) {
        console.log('✅ /api/auth/login funcionando');
        console.log(`   Token gerado: ${loginResponse.data.token ? 'OK' : 'ERRO'}`);
      } else {
        console.log('❌ /api/auth/login com erro:', loginResponse.status);
        console.log('   Mensagem:', loginResponse.data?.message);
      }
    } catch (error) {
      console.log('❌ /api/auth/login falhou:', error.message);
    }

    console.log('\n🎉 Testes concluídos!');
    console.log('\n📋 Resumo:');
    console.log('- Se todos os testes passaram, seu backend está pronto');
    console.log('- Se houver erros, verifique os logs do servidor');
    console.log('- Configure as variáveis de ambiente na Vercel');

  } catch (error) {
    console.error('❌ Erro geral nos testes:', error.message);
  }
}

// Verificar se o servidor está rodando
async function checkServer() {
  try {
    await makeRequest('/');
    console.log('✅ Servidor Next.js está rodando na porta 3000\n');
    await testAPIs();
  } catch (error) {
    console.log('❌ Servidor não está rodando na porta 3000');
    console.log('Execute: npm run dev');
  }
}

checkServer();