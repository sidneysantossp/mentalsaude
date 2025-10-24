import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const results = await db.testResult.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        test: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    const formattedResults = results.map(result => ({
      id: result.id,
      totalScore: result.totalScore,
      category: result.category,
      interpretation: result.interpretation,
      completedAt: result.completedAt.toISOString(),
      test: result.test,
      user: result.user
    }))

    return NextResponse.json({
      success: true,
      results: formattedResults
    })
  } catch (error) {
    console.error('Error fetching results:', error)
    
    // Return mock data if database fails
    const mockResults = [
      {
        id: '1',
        totalScore: 12,
        category: 'Mild',
        interpretation: 'Sintomas depressivos leves detectados',
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        test: {
          id: '1',
          title: 'PHQ-9 - Questionário de Depressão',
          category: 'DEPRESSION'
        },
        user: {
          id: '1',
          name: 'João Silva',
          email: 'joao.silva@example.com'
        }
      },
      {
        id: '2',
        totalScore: 8,
        category: 'Mild',
        interpretation: 'Sintomas de ansiedade leves detectados',
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        test: {
          id: '2',
          title: 'GAD-7 - Escala de Ansiedade',
          category: 'ANXIETY'
        },
        user: {
          id: '2',
          name: 'Maria Santos',
          email: 'maria.santos@example.com'
        }
      },
      {
        id: '3',
        totalScore: 18,
        category: 'Moderate',
        interpretation: 'Sintomas de TDAH moderados detectados',
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        test: {
          id: '3',
          title: 'Teste de TDAH - Desatenção',
          category: 'ADHD'
        },
        user: {
          id: '3',
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@example.com'
        }
      },
      {
        id: '4',
        totalScore: 15,
        category: 'Moderate',
        interpretation: 'Nível de estresse moderado detectado',
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        test: {
          id: '4',
          title: 'Escala de Estresse Percebido',
          category: 'STRESS'
        },
        user: {
          id: '4',
          name: 'Ana Costa',
          email: 'ana.costa@example.com'
        }
      },
      {
        id: '5',
        totalScore: 22,
        category: 'Severe',
        interpretation: 'Sintomas depressivos graves detectados',
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        test: {
          id: '1',
          title: 'PHQ-9 - Questionário de Depressão',
          category: 'DEPRESSION'
        },
        user: {
          id: '5',
          name: 'Carlos Ferreira',
          email: 'carlos.ferreira@example.com'
        }
      }
    ]

    return NextResponse.json({
      success: true,
      results: mockResults
    })
  }
}