import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function debugSave() {
  console.log('🔍 Testando salvamento de imagem...\n')

  // Pegar o primeiro teste
  const test = await prisma.test.findFirst()

  if (!test) {
    console.log('❌ Nenhum teste encontrado')
    return
  }

  console.log('📝 Teste original:', test.title)
  console.log('🖼️  Imagem atual:', test.cardImage)
  console.log('')

  // Tentar atualizar a imagem
  const newImageUrl = '/images/depression-therapy.jpg'
  console.log('💾 Tentando salvar nova imagem:', newImageUrl)

  const updated = await prisma.test.update({
    where: { id: test.id },
    data: { cardImage: newImageUrl }
  })

  console.log('✅ Teste atualizado!')
  console.log('🖼️  Nova imagem:', updated.cardImage)
  console.log('')

  // Verificar se salvou
  const check = await prisma.test.findUnique({
    where: { id: test.id }
  })

  console.log('🔍 Verificação após salvar:')
  console.log('🖼️  Imagem no banco:', check?.cardImage)

  if (check?.cardImage === newImageUrl) {
    console.log('✅ Imagem salva com sucesso!')
  } else {
    console.log('❌ Imagem NÃO foi salva corretamente')
  }

  await prisma.$disconnect()
}

debugSave()
