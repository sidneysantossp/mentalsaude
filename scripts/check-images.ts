import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkImages() {
  console.log('🔍 Verificando imagens dos testes...\n')

  const tests = await prisma.test.findMany({
    select: {
      id: true,
      title: true,
      cardImage: true
    }
  })

  tests.forEach(test => {
    console.log(`📝 ${test.title}`)
    console.log(`   Imagem: ${test.cardImage || '❌ SEM IMAGEM'}`)
    console.log('')
  })

  console.log(`\n📊 Total: ${tests.length} testes`)
  
  await prisma.$disconnect()
}

checkImages()
