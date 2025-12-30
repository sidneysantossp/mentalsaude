import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAPI() {
  console.log('🧪 Testando API de testes...\n')

  // Pegar o primeiro teste
  const test = await prisma.test.findFirst({
    include: {
      questions: {
        orderBy: { order: 'asc' }
      },
      _count: {
        select: {
          testResults: true
        }
      }
    }
  })

  if (!test) {
    console.log('❌ Nenhum teste encontrado')
    return
  }

  console.log('📝 Teste:', test.title)
  console.log('🆔 ID:', test.id)
  console.log('🔗 Slug:', test.slug)
  console.log('📝 Descrição curta:', test.shortDescription)
  console.log('💎 Premium:', test.isPremium)
  console.log('🖼️  Card Image:', test.cardImage)
  console.log('')

  // Simular o que a API retorna
  const apiResponse = {
    id: test.id,
    title: test.title,
    slug: test.slug,
    description: test.description,
    shortDescription: test.shortDescription,
    category: test.category,
    instructions: test.instructions,
    timeLimit: test.timeLimit,
    isPremium: test.isPremium,
    cardImage: test.cardImage,
    isActive: test.isActive
  }

  console.log('📤 Resposta da API simulada:')
  console.log(JSON.stringify(apiResponse, null, 2))

  await prisma.$disconnect()
}

testAPI()
