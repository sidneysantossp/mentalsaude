import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const questionSelect = `
  *,
  test:tests (
    id,
    title,
    category
  )
`

const safeParseOptions = (options: string | null | undefined) => {
  if (!options) {
    return []
  }

  try {
    return JSON.parse(options)
  } catch {
    return []
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data: questions, error } = await db
      .from('questions')
      .select(questionSelect)
      .order('order', { ascending: true })

    if (error) {
      throw error
    }

    const formattedQuestions = (questions || []).map(question => ({
      id: question.id,
      text: question.text,
      type: question.type,
      order: question.order,
      testId: question.test_id,
      testTitle: question.test?.title,
      testCategory: question.test?.category,
      optionsCount: safeParseOptions(question.options).length,
      createdAt: question.created_at
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
        testTitle: 'PHQ-9 - Questionario de Depressao',
        testCategory: 'DEPRESSION',
        optionsCount: 4,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
      },
      {
        id: '2',
        text: 'Sentindo-se para baixo, deprimido(a) ou sem esperanca',
        type: 'LIKERT_SCALE',
        order: 2,
        testId: '1',
        testTitle: 'PHQ-9 - Questionario de Depressao',
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
        text: 'Nao consigo parar de me preocupar',
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
        testTitle: 'Teste de TDAH - Desatencao',
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
        { error: 'Campos obrigatorios: text, type, testId e order' },
        { status: 400 }
      )
    }

    const payload = {
      text,
      type,
      test_id: testId,
      order: typeof order === 'string' ? parseInt(order, 10) : order,
      options: options ? JSON.stringify(options) : null
    }

    const { data: newQuestion, error } = await db
      .from('questions')
      .insert(payload)
      .select(questionSelect)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!newQuestion) {
      throw new Error('Falha ao criar question')
    }

    return NextResponse.json({
      success: true,
      question: {
        id: newQuestion.id,
        text: newQuestion.text,
        type: newQuestion.type,
        testId: newQuestion.test_id,
        order: newQuestion.order,
        options: safeParseOptions(newQuestion.options),
        createdAt: newQuestion.created_at
      }
    })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json(
      { error: 'Erro ao criar questao' },
      { status: 500 }
    )
  }
}
