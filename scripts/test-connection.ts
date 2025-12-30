import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com o banco de dados...');

    const userCount = await prisma.user.count();
    console.log(`✅ Conexão estabelecida com sucesso!`);
    console.log(`👥 Total de usuários: ${userCount}`);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    console.log('\n📋 Usuários cadastrados:');
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
    });

    const testCount = await prisma.test.count();
    console.log(`\n🧪 Total de testes: ${testCount}`);

    console.log('\n✅ Banco de dados Supabase configurado e funcionando perfeitamente!');
    
  } catch (error) {
    console.error('❌ Erro ao testar conexão:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .then(() => {
    console.log('\n✅ Teste concluído!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Falha no teste:', error);
    process.exit(1);
  });
