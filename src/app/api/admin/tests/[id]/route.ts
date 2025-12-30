import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const testId = resolvedParams.id

    const test = await db.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            testResults: true
          }
        }
      }
    })

    if (!test) {
      return NextResponse.json(
        { error: 'Teste não encontrado' },
        { status: 404 }
      )
    }

    const formattedQuestions = test.questions.map(question => ({
      id: question.id,
      text: question.text,
      type: question.type,
      order: question.order,
      options: question.options ? JSON.parse(question.options) : []
    }))

    return NextResponse.json({
      success: true,
      test: {
        id: test.id,
        title: test.title,
        description: test.description,
        shortDescription: test.shortDescription,
        category: test.category,
        instructions: test.instructions,
        isPremium: test.isPremium,
        cardImage: test.cardImage,
        timeLimit: test.timeLimit,
        isActive: test.isActive,
        createdAt: test.createdAt.toISOString(),
        updatedAt: test.updatedAt.toISOString(),
        questionCount: test.questions.length,
        resultCount: test._count.testResults,
        questions: formattedQuestions
      }
    })
  } catch (error) {
    console.error('Error fetching test:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar teste' },
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
    const testId = resolvedParams.id
    const body = await request.json()
    const { title, description, shortDescription, category, instructions, timeLimit, isPremium, cardImage, isActive } = body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription || null
    if (category !== undefined) updateData.category = category
    if (instructions !== undefined) updateData.instructions = instructions
    if (timeLimit !== undefined) updateData.timeLimit = timeLimit ? parseInt(timeLimit) : null
    if (isPremium !== undefined) updateData.isPremium = isPremium
    if (cardImage !== undefined) updateData.cardImage = cardImage || null
    if (isActive !== undefined) updateData.isActive = isActive

    const updatedTest = await db.test.update({
      where: { id: testId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      test: {
        id: updatedTest.id,
        title: updatedTest.title,
        description: updatedTest.description,
        category: updatedTest.category,
        instructions: updatedTest.instructions,
        timeLimit: updatedTest.timeLimit,
        isActive: updatedTest.isActive,
        updatedAt: updatedTest.updatedAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error updating test:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar teste' },
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
    const testId = resolvedParams.id

    await db.test.delete({
      where: { id: testId }
    })

    return NextResponse.json({
      success: true,
      message: 'Teste excluído com sucesso'
    })
  } catch (error) {
    console.error('Error deleting test:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir teste' },
      { status: 500 }
    )
  }
}
