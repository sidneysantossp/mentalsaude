import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: testId } = await params

    // Buscar o teste específico
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

    // Buscar as questões do teste
    const questions = await db.question.findMany({
      where: {
        testId: testId
      },
      orderBy: {
        order: 'asc'
      }
    })

    // Formatar as questões para o frontend
    const formattedQuestions = questions.map(question => {
      // Parse das opções JSON se existirem
      let options = []
      if (question.options) {
        try {
          options = JSON.parse(question.options)
        } catch (e) {
          console.error('Erro ao parsear opções:', e)
          options = []
        }
      }
      
      return {
        id: question.id,
        text: question.text,
        type: question.type,
        order: question.order,
        options: options
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        test: {
          id: test.id,
          title: test.title,
          description: test.description,
          category: test.category,
          timeLimit: test.timeLimit,
          questionCount: questions.length,
          estimatedTime: `${Math.max(5, Math.ceil(questions.length * 1.2))} min`,
          questions: `${questions.length} q`,
          difficulty: questions.length > 15 ? 'Difícil' : questions.length > 8 ? 'Médio' : 'Fácil',
          icon: 'Brain',
          color: 'bg-blue-500',
          image: '/images/depression-therapy.jpg',
          instructions: test.instructions,
          isActive: test.isActive
        },
        questions: formattedQuestions
      }
    })

  } catch (error) {
    console.error('Erro ao buscar teste:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar teste psicológico' 
      },
      { status: 500 }
    )
  }
}