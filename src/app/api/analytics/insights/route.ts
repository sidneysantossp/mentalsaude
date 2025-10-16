import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ZAI from 'z-ai-web-dev-sdk'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar usuário logado
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Buscar dados do usuário para análise
    const testResults = await db.testResult.findMany({
      where: { userId: user.id },
      include: {
        test: {
          select: {
            title: true,
            category: true
          }
        }
      },
      orderBy: { completedAt: 'desc' },
      take: 50
    })

    // Buscar agendamentos
    const appointments = await db.appointment.findMany({
      where: { userId: user.id },
      orderBy: { scheduledFor: 'desc' },
      take: 20
    })

    // Gerar insights com IA
    const zai = await ZAI.create()
    
    const insightsPrompt = `Analise os dados de saúde mental de um usuário e gere insights personalizados:

Dados do usuário:
- Testes realizados: ${testResults.length}
- Categorias: ${testResults.map(r => r.test.category).join(', ')}
- Consultas agendadas: ${appointments.length}
- Período de análise: Últimos 3 meses

Gere um JSON com:
{
  "emotionalTrend": "melhorando|estável|piorando",
  "mainConcerns": ["preocupação1", "preocupação2"],
  "recommendations": ["recomendação1", "recomendação2"],
  "positiveHighlights": ["destaque1", "destaque2"],
  "nextSteps": ["passo1", "passo2"],
  "riskLevel": "baixo|médio|alto",
  "motivationalMessage": "mensagem motivacional personalizada"
}

Seja empático, construtivo e profissional. Use português brasileiro.`

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um psicólogo analista especializado em dados de saúde mental.'
        },
        {
          role: 'user',
          content: insightsPrompt
        }
      ],
      temperature: 0.7
    })

    let aiInsights
    try {
      aiInsights = JSON.parse(completion.choices[0]?.message?.content || '{}')
    } catch (parseError) {
      console.error('Erro ao parsear insights da IA:', parseError)
      aiInsights = {
        emotionalTrend: 'estável',
        mainConcerns: [],
        recommendations: [],
        positiveHighlights: [],
        nextSteps: [],
        riskLevel: 'baixo',
        motivationalMessage: 'Continue cuidando da sua saúde mental.'
      }
    }

    // Calcular estatísticas adicionais
    const stats = {
      totalTests: testResults.length,
      averageScore: testResults.reduce((sum, r) => sum + r.totalScore, 0) / testResults.length || 0,
      mostRecentTest: testResults[0]?.completedAt || null,
      testCategories: [...new Set(testResults.map(r => r.test.category))],
      upcomingAppointments: appointments.filter(a => 
        new Date(a.scheduledFor) > new Date() && 
        a.status === 'SCHEDULED'
      ).length,
      completedAppointments: appointments.filter(a => 
        a.status === 'COMPLETED'
      ).length
    }

    return NextResponse.json({
      success: true,
      data: {
        aiInsights,
        stats,
        lastUpdated: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Erro ao gerar insights:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}