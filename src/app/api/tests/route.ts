import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
<<<<<<< HEAD
=======
import { generateSlug, getCategorySlug, generateCanonicalUrl } from '@/lib/utils/slug'
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

export async function GET(request: NextRequest) {
  try {
    // Buscar todos os testes ativos com suas questões
    const tests = await db.test.findMany({
      where: {
        isActive: true
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Formatar os dados para o frontend
    const formattedTests = tests.map(test => {
      // Contar número de questões
      const questionCount = test.questions.length
      
      // Calcular tempo estimado (1 minuto por questão em média)
      const estimatedTime = Math.max(5, Math.ceil(questionCount * 1.2))
      
      // Determinar dificuldade baseada no número de questões
      let difficulty = 'Fácil'
      if (questionCount > 15) {
        difficulty = 'Difícil'
      } else if (questionCount > 8) {
        difficulty = 'Médio'
      }

<<<<<<< HEAD
=======
      // Gerar slug se não existir
      const slug = test.slug || generateSlug(test.title)
      
      // Gerar URL canônica
      const categorySlug = getCategorySlug(test.category)
      const canonicalUrl = `/testes/${categorySlug}/${slug}`

>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
      // Mapear categoria para informações visuais
      const categoryMap = {
        'DEPRESSION': {
          icon: 'Brain',
          color: 'bg-blue-500',
          image: '/images/depression-therapy.jpg'
        },
        'ANXIETY': {
          icon: 'Heart',
          color: 'bg-cyan-500',
          image: '/images/anxiety-meditation.jpg'
        },
        'OCD': {
          icon: 'Flame',
          color: 'bg-orange-500',
          image: '/images/healthy-eating.jpg'
        },
        'STRESS': {
          icon: 'Shield',
          color: 'bg-red-500',
          image: '/images/stress-management.jpg'
        },
        'ADHD': {
          icon: 'Zap',
          color: 'bg-yellow-500',
          image: '/images/adhd-focus.jpg'
        },
        'BURNOUT': {
          icon: 'AlertTriangle',
          color: 'bg-purple-500',
          image: '/images/burnout-exhaustion.jpg'
        },
        'SLEEP': {
          icon: 'Moon',
          color: 'bg-indigo-500',
          image: '/images/sleep-disorders.jpg'
        },
        'SELF_ESTEEM': {
          icon: 'Star',
          color: 'bg-pink-500',
          image: '/images/self-esteem-confidence.jpg'
        }
      }

      const categoryInfo = categoryMap[test.category as keyof typeof categoryMap] || {
        icon: 'Brain',
        color: 'bg-gray-500',
        image: '/images/default-test.jpg'
      }

      return {
        id: test.id,
        title: test.title,
        description: test.description,
        category: test.category,
<<<<<<< HEAD
=======
        categorySlug: categorySlug,
        slug: slug,
        canonicalUrl: canonicalUrl,
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
        timeLimit: test.timeLimit,
        questionCount,
        estimatedTime: `${estimatedTime} min`,
        questions: `${questionCount} q`,
        difficulty,
        icon: categoryInfo.icon,
        color: categoryInfo.color,
        image: test.imageUrl || categoryInfo.image,
        instructions: test.instructions,
        isActive: test.isActive
      }
    })

    return NextResponse.json({
      success: true,
      data: formattedTests
    })

  } catch (error) {
    console.error('Erro ao buscar testes:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar testes psicológicos' 
      },
      { status: 500 }
    )
  }
}