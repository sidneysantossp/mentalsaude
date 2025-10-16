/**
 * Script para atualizar slugs dos testes existentes no banco de dados
 * Execute com: npx tsx scripts/update-slugs.ts
 */

import { db } from '../src/lib/db'
import { generateSlug, getCategorySlug } from '../src/lib/utils/slug'

async function updateTestSlugs() {
  try {
    console.log('🔄 Iniciando atualização de slugs...')

    // Buscar todos os testes ativos
    const tests = await db.test.findMany({
      where: {
        isActive: true
      }
    })

    console.log(`📋 Encontrados ${tests.length} testes para processar`)

    let updatedCount = 0

    for (const test of tests) {
      // Gerar slug se não existir
      if (!test.slug) {
        const slug = generateSlug(test.title)
        
        await db.test.update({
          where: {
            id: test.id
          },
          data: {
            slug: slug,
            lastModified: new Date()
          }
        })

        console.log(`✅ Teste "${test.title}" atualizado com slug: ${slug}`)
        updatedCount++
      } else {
        console.log(`⏭️  Teste "${test.title}" já possui slug: ${test.slug}`)
      }
    }

    console.log(`🎉 Atualização concluída! ${updatedCount} testes atualizados.`)

    // Exibir URLs canônicas geradas
    console.log('\n📝 URLs canônicas geradas:')
    for (const test of tests) {
      const categorySlug = getCategorySlug(test.category)
      const slug = test.slug || generateSlug(test.title)
      const canonicalUrl = `/testes/${categorySlug}/${slug}`
      console.log(`   ${test.title} -> ${canonicalUrl}`)
    }

  } catch (error) {
    console.error('❌ Erro ao atualizar slugs:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

// Executar o script
if (require.main === module) {
  updateTestSlugs()
}

export { updateTestSlugs }