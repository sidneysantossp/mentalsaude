import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testId, answers } = body

    if (!testId || !answers) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dados incompletos' 
        },
        { status: 400 }
      )
    }

    // Verificar se o teste existe
    const test = await db.test.findUnique({
      where: {
        id: testId,
        isActive: true
      }
    })

    if (!test) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Teste não encontrado' 
        },
        { status: 404 }
      )
    }

    // Calcular pontuação total
    const totalScore = Object.values(answers).reduce((sum: number, value: number) => sum + value, 0)
    
    // Buscar todas as questões para calcular a pontuação máxima
    const questions = await db.question.findMany({
      where: {
        testId: testId
      }
    })

    const maxScore = questions.length * 3 // Assumindo que o máximo por opção é 3
    const percentageScore = Math.round((totalScore / maxScore) * 100)

    // Salvar resultado do teste
    const testResult = await db.testResult.create({
      data: {
        testId: testId,
        userId: 'anonymous', // Temporariamente, até implementar autenticação
        totalScore: totalScore,
        category: totalScore > 20 ? 'alto' : totalScore > 10 ? 'moderado' : 'baixo',
        interpretation: `Sua pontuação foi ${totalScore} de ${maxScore}`,
        recommendations: 'Considere procurar um profissional se necessário',
        completedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        resultId: testResult.id,
        totalScore: totalScore,
        category: testResult.category,
        interpretation: testResult.interpretation,
        completedAt: testResult.completedAt
      }
    })

  } catch (error) {
    console.error('Erro ao salvar resultado do teste:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao salvar resultado do teste' 
      },
      { status: 500 }
    )
  }
}