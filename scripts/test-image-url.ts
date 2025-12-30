import { PrismaClient } from '@prisma/client'
import fetch from 'node-fetch'

const prisma = new PrismaClient()

async function testImageURL() {
  console.log('🧪 Testando acesso às imagens...\n')

  const test = await prisma.test.findFirst()
  
  if (!test) {
    console.log('❌ Nenhum teste encontrado')
    return
  }

  console.log('📝 Teste:', test.title)
  console.log('🖼️  URL da imagem:', test.cardImage)
  console.log('')

  // Testar se a imagem está acessível via HTTP
  const imageUrl = `http://localhost:3000${test.cardImage}`
  console.log('🌐 Testando URL completa:', imageUrl)

  try {
    const response = await fetch(imageUrl)
    console.log('📊 Status:', response.status, response.statusText)
    console.log('📦 Content-Type:', response.headers.get('content-type'))
    console.log('📏 Content-Length:', response.headers.get('content-length'))
    
    if (response.ok) {
      console.log('✅ Imagem acessível via HTTP!')
    } else {
      console.log('❌ Erro ao acessar imagem')
    }
  } catch (error) {
    console.error('❌ Erro na requisição:', error)
  }

  await prisma.$disconnect()
}

testImageURL()
