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

const toResponseQuestion = (question: any) => ({
  id: question.id,
  text: question.text,
  type: question.type,
  order: question.order,
  testId: question.test_id,
  test: question.test,
  options: safeParseOptions(question.options),
  createdAt: question.created_at,
  updatedAt: question.created_at
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const questionId = resolvedParams.id

    const { data: question, error } = await db
      .from('questions')
      .select(questionSelect)
      .eq('id', questionId)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!question) {
      return NextResponse.json(
        { error: 'Questao nao encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      question: toResponseQuestion(question)
    })
  } catch (error) {
    console.error('Error fetching question:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar questao' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const questionId = resolvedParams.id
    const body = await request.json()
    const { text, type, testId, order, options } = body

    const updateData: Record<string, any> = {}
    if (text !== undefined) updateData.text = text
    if (type !== undefined) updateData.type = type
    if (testId !== undefined) updateData.test_id = testId
    if (order !== undefined) {
      updateData.order = typeof order === 'string' ? parseInt(order, 10) : order
    }
    if (options !== undefined) {
      updateData.options = JSON.stringify(options)
    }

    const { data: updatedQuestion, error } = await db
      .from('questions')
      .update(updateData)
      .eq('id', questionId)
      .select(questionSelect)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!updatedQuestion) {
      throw new Error('Question not found after update')
    }

    return NextResponse.json({
      success: true,
      question: toResponseQuestion(updatedQuestion)
    })
  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar questao' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const questionId = resolvedParams.id

    const { error } = await db
      .from('questions')
      .delete()
      .eq('id', questionId)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Questao excluida com sucesso'
    })
  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir questao' },
      { status: 500 }
    )
  }
}
