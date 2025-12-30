import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyTests() {
  console.log('🔍 Verificando testes criados...\n')

  const tests = await prisma.test.findMany({
    include: {
      questions: true,
      _count: {
        select: {
          testResults: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  console.log(`📊 Total de testes no banco: ${tests.length}\n`)

  tests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.title}`)
    console.log(`   Categoria: ${test.category}`)
    console.log(`   Questões: ${test.questions.length}`)
    console.log(`   Tempo limite: ${test.timeLimit || 'Sem limite'} min`)
    console.log(`   Status: ${test.isActive ? '✅ Ativo' : '❌ Inativo'}`)
    console.log(`   Realizações: ${test._count.testResults}`)
    console.log('')
  })

  await prisma.$disconnect()
}

verifyTests()
