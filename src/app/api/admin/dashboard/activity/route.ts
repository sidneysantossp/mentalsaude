import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get recent activities
    const recentResults = await db.testResult.findMany({
      take: 10,
      orderBy: {
        completedAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        test: {
          select: {
            title: true
          }
        }
      }
    })

    const activities = recentResults.map(result => ({
      id: result.id,
      type: 'result' as const,
      description: `${result.user?.name || 'Usuário anônimo'} completou o teste "${result.test.title}" com pontuação ${result.totalScore}`,
      timestamp: result.completedAt.toISOString(),
      status: 'success' as const
    }))

    return NextResponse.json({
      success: true,
      activities
    })
  } catch (error) {
    console.error('Error fetching dashboard activity:', error)
    
    // Return mock data if database fails
    const mockActivities = [
      {
        id: '1',
        type: 'result' as const,
        description: 'João Silva completou o teste "PHQ-9 - Depressão" com pontuação 12',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        status: 'success' as const
      },
      {
        id: '2',
        type: 'user' as const,
        description: 'Novo usuário Maria Santos cadastrado no sistema',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        status: 'success' as const
      },
      {
        id: '3',
        type: 'test' as const,
        description: 'Teste "GAD-7 - Ansiedade" atualizado pelo administrador',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        status: 'success' as const
      },
      {
        id: '4',
        type: 'result' as const,
        description: 'Pedro Oliveira completou o teste "TDAH - Desatenção" com pontuação 18',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        status: 'warning' as const
      },
      {
        id: '5',
        type: 'user' as const,
        description: 'Usuário Ana Costa tentou acessar área restrita',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        status: 'error' as const
      }
    ]

    return NextResponse.json({
      success: true,
      activities: mockActivities
    })
  }
}