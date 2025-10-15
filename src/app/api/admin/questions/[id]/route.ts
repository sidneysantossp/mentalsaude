import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const questionId = resolvedParams.id

    const question = await db.question.findUnique({
      where: { id: questionId },
      include: {
        test: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      }
    })

    if (!question) {
      return NextResponse.json(
        { error: 'Questão não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      question: {
        id: question.id,
        text: question.text,
        type: question.type,
        order: question.order,
        testId: question.testId,
        test: question.test,
        options: question.options ? JSON.parse(question.options) : [],
        createdAt: question.createdAt.toISOString(),
        updatedAt: question.updatedAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error fetching question:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar questão' },
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

    const updateData: any = {}
    if (text !== undefined) updateData.text = text
    if (type !== undefined) updateData.type = type
    if (testId !== undefined) updateData.testId = testId
    if (order !== undefined) updateData.order = parseInt(order)
    if (options !== undefined) updateData.options = JSON.stringify(options)

    const updatedQuestion = await db.question.update({
      where: { id: questionId },
      data: updateData,
      include: {
        test: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      question: {
        id: updatedQuestion.id,
        text: updatedQuestion.text,
        type: updatedQuestion.type,
        order: updatedQuestion.order,
        testId: updatedQuestion.testId,
        test: updatedQuestion.test,
        options: updatedQuestion.options ? JSON.parse(updatedQuestion.options) : [],
        updatedAt: updatedQuestion.updatedAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar questão' },
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

    await db.question.delete({
      where: { id: questionId }
    })

    return NextResponse.json({
      success: true,
      message: 'Questão excluída com sucesso'
    })
  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir questão' },
      { status: 500 }
    )
  }
}