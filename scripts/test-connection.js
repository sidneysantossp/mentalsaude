// Script para testar conexão com MySQL e dados iniciais
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('🔍 Testando conexão com MySQL...');
  
  try {
    const connection = await mysql.createConnection({
      host: '203.161.38.188',
      port: 3306,
      user: 'anticosccb_mentalsaude',
      password: 'KmSs147258!',
      database: 'anticosccb_mentalsaude'
    });

    console.log('✅ Conexão bem-sucedida!');

    // Verificar se as tabelas existem
    console.log('\n📋 Verificando tabelas...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`Tabelas encontradas: ${tables.length}`);
    tables.forEach(table => console.log(`  - ${Object.values(table)[0]}`));

    // Verificar se há testes cadastrados
    console.log('\n🧪 Verificando testes cadastrados...');
    const [tests] = await connection.execute('SELECT COUNT(*) as count FROM tests');
    console.log(`Testes encontrados: ${tests[0].count}`);

    if (tests[0].count > 0) {
      const [testList] = await connection.execute('SELECT id, title, category FROM tests LIMIT 5');
      console.log('Primeiros 5 testes:');
      testList.forEach(test => {
        console.log(`  - ${test.title} (${test.category})`);
      });
    }

    // Verificar se há usuários cadastrados
    console.log('\n👥 Verificando usuários cadastrados...');
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log(`Usuários encontrados: ${users[0].count}`);

    await connection.end();
    console.log('\n🎉 Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    process.exit(1);
  }
}

testConnection();