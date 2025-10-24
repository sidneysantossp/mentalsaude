import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Dynamic import for ZAI SDK to avoid build issues
const getZAI = async () => {
  try {
    const ZAI = await import('z-ai-web-dev-sdk')
    return ZAI.default || ZAI.ZAI
  } catch (error) {
    console.error('Error importing ZAI:', error)
    return null
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: testId } = await params
    const body = await request.json()
    const { answers, testType } = body

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Respostas são obrigatórias' },
        { status: 400 }
      )
    }

    // Get test information
    const test = await db.test.findUnique({
      where: { id: testId }
    })

    if (!test) {
      return NextResponse.json(
        { error: 'Teste não encontrado' },
        { status: 404 }
      )
    }

    // Calculate score based on answers
    const score = answers.reduce((total: number, answer: any) => {
      return total + (answer.score || 0)
    }, 0)

    const maxScore = answers.length * 4 // Assuming max score per question is 4
    const percentage = Math.round((score / maxScore) * 100)

    // Determine severity based on percentage
    let severity = 'Baixo'
    let color = 'text-green-600'
    let recommendation = 'Seus resultados indicam níveis baixos. Continue cuidando da sua saúde mental!'

    if (percentage >= 70) {
      severity = 'Alto'
      color = 'text-red-600'
      recommendation = 'Recomendamos procurar um profissional de saúde mental para uma avaliação mais detalhada.'
    } else if (percentage >= 40) {
      severity = 'Moderado'
      color = 'text-yellow-600'
      recommendation = 'Considere conversar com um profissional ou praticar técnicas de autocuidado.'
    }

    // Generate AI-powered insights
    let aiInsights = ''
    try {
      const ZAI = await getZAI()
      if (ZAI) {
        const zai = await ZAI.create()
        
        const insightPrompt = `Com base nos resultados de um teste de ${testType} com ${percentage}% de gravidade (${severity}), forneça 3 insights práticos e acolhedores para a pessoa. Responda em português de forma simples e direta.`

        const completion = await zai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'Você é um assistente de saúde mental prestativo e profissional. Forneça insights úteis e empáticos.'
            },
            {
              role: 'user',
              content: insightPrompt
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })

        aiInsights = completion.choices[0]?.message?.content || ''
      } else {
        throw new Error('ZAI SDK not available')
      }
    } catch (error) {
      console.error('Error generating AI insights:', error)
      aiInsights = 'Continue cuidando da sua saúde mental e não hesite em procurar ajuda quando necessário.'
    }

    // For now, we'll handle anonymous users by not requiring userId
    // In a real application, you would get this from authentication
    const anonymousUserId = 'anonymous-user'
    
    // Check if anonymous user exists, if not create it
    let user = await db.user.findUnique({
      where: { id: anonymousUserId }
    })
    
    if (!user) {
      user = await db.user.create({
        data: {
          id: anonymousUserId,
          email: 'anonymous@example.com',
          name: 'Anonymous User'
        }
      })
    }

    // Save test result
    const testResult = await db.testResult.create({
      data: {
        testId,
        userId: user.id,
        totalScore: score,
        category: severity,
        interpretation: recommendation,
        recommendations: aiInsights,
        completedAt: new Date()
      }
    })

    // Return results
    return NextResponse.json({
      success: true,
      result: {
        score,
        maxScore,
        percentage,
        severity,
        color,
        category: severity,
        interpretation: recommendation,
        recommendations: aiInsights,
        testType,
        completedAt: testResult.completedAt
      }
    })

  } catch (error) {
    console.error('Error submitting test:', error)
    return NextResponse.json(
      { error: 'Erro ao processar suas respostas' },
      { status: 500 }
    )
  }
}