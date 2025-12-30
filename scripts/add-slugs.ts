import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function addSlugs() {
  console.log('🔧 Adicionando slugs aos testes existentes...')

  const tests = await prisma.test.findMany()

  for (const test of tests) {
    const slug = generateSlug(test.title)
    
    await prisma.test.update({
      where: { id: test.id },
      data: { slug }
    })
    
    console.log(`✅ Slug adicionado: ${test.title} -> ${slug}`)
  }

  console.log('\n🎉 Slugs adicionados com sucesso!')
  console.log(`📊 Total de testes atualizados: ${tests.length}`)
}

addSlugs()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro ao adicionar slugs:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
