import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔄 Criando usuário administrador...');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Administrador',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Senha: admin123');
    console.log('');
    console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro login!');
    
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin()
  .then(() => {
    console.log('✅ Processo concluído!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Falha no processo:', error);
    process.exit(1);
  });
