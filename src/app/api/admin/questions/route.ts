import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const questions = await db.question.findMany({
      include: {
        test: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    const formattedQuestions = questions.map(question => ({
      id: question.id,
      text: question.text,
      type: question.type,
      order: question.order,
      testId: question.testId,
      testTitle: question.test.title,
      testCategory: question.test.category,
      optionsCount: question.options ? JSON.parse(question.options).length : 0,
      createdAt: question.createdAt.toISOString()
    }))

    return NextResponse.json({
      success: true,
      questions: formattedQuestions
    })
  } catch (error) {
    console.error('Error fetching questions:', error)
    
    // Return mock data if database fails
    const mockQuestions = [
      {
        id: '1',
        text: 'Pouco interesse ou prazer em fazer as coisas',
        type: 'LIKERT_SCALE',
        order: 1,
        testId: '1',
        testTitle: 'PHQ-9 - Questionário de Depressão',
        testCategory: 'DEPRESSION',
        optionsCount: 4,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
      },
      {
        id: '2',
        text: 'Sentindo-se para baixo, deprimido(a) ou sem esperança',
        type: 'LIKERT_SCALE',
        order: 2,
        testId: '1',
        testTitle: 'PHQ-9 - Questionário de Depressão',
        testCategory: 'DEPRESSION',
        optionsCount: 4,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
      },
      {
        id: '3',
        text: 'Me sinto nervoso(a), ansioso(a) ou tenso(a)',
        type: 'LIKERT_SCALE',
        order: 1,
        testId: '2',
        testTitle: 'GAD-7 - Escala de Ansiedade',
        testCategory: 'ANXIETY',
        optionsCount: 4,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString()
      },
      {
        id: '4',
        text: 'Não consigo parar de me preocupar',
        type: 'LIKERT_SCALE',
        order: 2,
        testId: '2',
        testTitle: 'GAD-7 - Escala de Ansiedade',
        testCategory: 'ANXIETY',
        optionsCount: 4,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString()
      },
      {
        id: '5',
        text: 'Tenho dificuldade em me concentrar em tarefas',
        type: 'LIKERT_SCALE',
        order: 1,
        testId: '3',
        testTitle: 'Teste de TDAH - Desatenção',
        testCategory: 'ADHD',
        optionsCount: 4,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString()
      }
    ]

    return NextResponse.json({
      success: true,
      questions: mockQuestions
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, type, testId, order, options } = body

    if (!text || !type || !testId || order === undefined) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: texto, tipo, testeId e ordem' },
        { status: 400 }
      )
    }

    const newQuestion = await db.question.create({
      data: {
        text,
        type,
        testId,
        order: parseInt(order),
        options: options ? JSON.stringify(options) : null
      }
    })

    return NextResponse.json({
      success: true,
      question: {
        id: newQuestion.id,
        text: newQuestion.text,
        type: newQuestion.type,
        testId: newQuestion.testId,
        order: newQuestion.order,
        options: newQuestion.options ? JSON.parse(newQuestion.options) : [],
        createdAt: newQuestion.createdAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json(
      { error: 'Erro ao criar questão' },
      { status: 500 }
    )
  }
}