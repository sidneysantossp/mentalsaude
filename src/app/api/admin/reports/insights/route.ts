import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'

    // Fetch relevant data based on type
    let data = {}
    let context = ''

    switch (type) {
      case 'users':
        const users = await db.user.findMany({
          select: {
            createdAt: true,
            role: true,
            _count: {
              select: {
                testResults: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 100
        })
        
        data = { users }
        context = `Análise de dados de usuários: ${JSON.stringify(users, null, 2)}`
        break

      case 'tests':
        const tests = await db.test.findMany({
          include: {
            _count: {
              select: {
                testResults: true,
                questions: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 50
        })
        
        data = { tests }
        context = `Análise de dados de testes: ${JSON.stringify(tests, null, 2)}`
        break

      case 'results':
        const results = await db.testResult.findMany({
          include: {
            user: {
              select: { name: true, role: true }
            },
            test: {
              select: { title: true, category: true }
            }
          },
          orderBy: { completedAt: 'desc' },
          take: 100
        })
        
        data = { results }
        context = `Análise de dados de resultados: ${JSON.stringify(results, null, 2)}`
        break

      default:
        // Overview - combine all data
        const overviewUsers = await db.user.count()
        const overviewTests = await db.test.count()
        const overviewResults = await db.testResult.count()
        const recentActivity = await db.testResult.findMany({
          orderBy: { completedAt: 'desc' },
          take: 20,
          include: {
            user: { select: { name: true } },
            test: { select: { title: true, category: true } }
          }
        })
        
        data = {
          totalUsers: overviewUsers,
          totalTests: overviewTests,
          totalResults: overviewResults,
          recentActivity
        }
        context = `Análise geral do sistema: ${JSON.stringify(data, null, 2)}`
    }

    // Generate AI insights
    const zai = await ZAI.create()
    
    const prompt = `
Como um analista de dados especialista em saúde mental e psicologia, analise os seguintes dados e forneça insights acionáveis em português:

${context}

Por favor, forneça:
1. Principais tendências identificadas
2. Padrões de comportamento dos usuários
3. Áreas que precisam de atenção
4. Recomendações específicas para melhorias
5. Previsões para os próximos 30 dias

Responda em formato JSON com a seguinte estrutura:
{
  "trends": ["tendência 1", "tendência 2"],
  "patterns": ["padrão 1", "padrão 2"],
  "concerns": ["preocupação 1", "preocupação 2"],
  "recommendations": ["recomendação 1", "recomendação 2"],
  "predictions": ["previsão 1", "previsão 2"],
  "summary": "resumo geral dos insights"
}

Seja específico e forneça insights práticos que possam ajudar a melhorar a plataforma.
    `

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um analista de dados especialista em saúde mental e psicologia, focado em fornecer insights acionáveis para melhorar plataformas de avaliação psicológica.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const aiResponse = completion.choices[0]?.message?.content
    
    let insights
    try {
      insights = JSON.parse(aiResponse || '{}')
    } catch (error) {
      // Fallback if JSON parsing fails
      insights = {
        trends: ['Dados insuficientes para análise'],
        patterns: ['Aguardando mais dados'],
        concerns: ['Coletando mais informações'],
        recommendations: ['Monitorar sistema continuamente'],
        predictions: ['Análise em desenvolvimento'],
        summary: 'Sistema em fase de coleta de dados para análises mais precisas.'
      }
    }

    return NextResponse.json({
      insights,
      data,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error generating insights:', error)
    return NextResponse.json({ 
      error: 'Erro ao gerar insights',
      insights: {
        trends: ['Erro na análise de dados'],
        patterns: ['Verificar conexão com banco de dados'],
        concerns: ['Sistema temporariamente indisponível'],
        recommendations: ['Tente novamente mais tarde'],
        predictions: ['Análise será retomada em breve'],
        summary: 'Ocorreu um erro ao gerar insights. Por favor, tente novamente.'
      }
    }, { status: 500 })
  }
}