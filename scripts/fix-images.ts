import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixImages() {
  console.log('🔧 Corrigindo URLs das imagens...\n')

  const updates = [
    { slug: 'teste-de-burnout', cardImage: '/images/burnout-work.jpg' },
    { slug: 'teste-transtorno-de-panico', cardImage: '/images/panic-disorder.jpg' },
    { slug: 'teste-fobia-social', cardImage: '/images/social-phobia.jpg' }
  ]

  for (const update of updates) {
    const test = await prisma.test.update({
      where: { slug: update.slug },
      data: { cardImage: update.cardImage }
    })
    console.log(`✅ ${test.title}: ${update.cardImage}`)
  }

  console.log('\n🎉 Imagens corrigidas com sucesso!')
  await prisma.$disconnect()
}

fixImages()
