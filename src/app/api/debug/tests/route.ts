import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateSlug, getCategorySlug } from '@/lib/utils/slug'

export async function GET() {
  try {
    // Buscar todos os testes
    const tests = await db.test.findMany({
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    // Formatar para debug
    const debugInfo = tests.map(test => {
      const slug = test.slug || generateSlug(test.title)
      const categorySlug = getCategorySlug(test.category)
      const canonicalUrl = `/testes/${categorySlug}/${slug}`
      
      return {
        id: test.id,
        title: test.title,
        category: test.category,
        currentSlug: test.slug,
        generatedSlug: slug,
        categorySlug: categorySlug,
        canonicalUrl: canonicalUrl,
        isActive: test.isActive,
        questionCount: test.questions.length
      }
    })

    return NextResponse.json({
      success: true,
      count: tests.length,
      tests: debugInfo
    })

  } catch (error) {
    console.error('Erro no debug:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}