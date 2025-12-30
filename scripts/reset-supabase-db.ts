import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    console.log('🔄 Conectando ao banco de dados Supabase...');

    // Buscar todas as tabelas do schema public
    console.log('🔍 Buscando tabelas existentes...');
    const tables: any[] = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;

    console.log(`📋 Encontradas ${tables.length} tabelas no schema public`);

    // Remover todas as tabelas
    console.log('🗑️  Removendo todas as tabelas do schema public...');
    for (const table of tables) {
      console.log(`   - Removendo tabela: ${table.tablename}`);
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."${table.tablename}" CASCADE`);
    }

    console.log('✅ Todas as tabelas removidas!');
    
    console.log('📊 Banco de dados limpo e pronto para sincronização!');
    console.log('Execute: npm run db:push');
    
  } catch (error) {
    console.error('❌ Erro ao resetar banco de dados:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase()
  .then(() => {
    console.log('✅ Processo concluído com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Falha no processo:', error);
    process.exit(1);
  });
