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
        category: test.category,
        instructions: test.instructions,
        timeLimit: test.timeLimit,
        isActive: test.isActive,
        imageUrl: test.imageUrl,
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
    const { title, description, category, timeLimit, isActive, imageUrl } = body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) {
      updateData.description = description
      updateData.instructions = description // Atualiza instructions também
    }
    if (category !== undefined) updateData.category = category
    if (timeLimit !== undefined) updateData.timeLimit = timeLimit ? parseInt(timeLimit) : null
    if (isActive !== undefined) updateData.isActive = isActive
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl

    const updatedTest = await db.test.update({
      where: { id: testId },
      data: updateData,
      include: {
        _count: {
          select: {
            questions: true,
            testResults: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      test: {
        id: updatedTest.id,
        title: updatedTest.title,
        description: updatedTest.description,
        category: updatedTest.category,
        timeLimit: updatedTest.timeLimit,
        isActive: updatedTest.isActive,
        imageUrl: updatedTest.imageUrl,
        createdAt: updatedTest.createdAt.toISOString(),
        updatedAt: updatedTest.updatedAt.toISOString(),
        questionCount: updatedTest._count.questions,
        resultCount: updatedTest._count.testResults
      }
    })
  } catch (error) {
    console.error('Error updating test:', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar teste' },
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
      { message: 'Erro ao excluir teste' },
      { status: 500 }
    )
  }
}