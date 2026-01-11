import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const testSelect = `
  *,
  questions (
    id,
    text,
    type,
    "order",
    options
  )
`

const parseOptions = (value: string | null | undefined) => {
  if (!value) return []
  try {
    return JSON.parse(value)
  } catch {
    return []
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const testId = resolvedParams.id

    const { data: test, error } = await db
      .from('tests')
      .select(testSelect)
      .eq('id', testId)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!test) {
      return NextResponse.json(
        { error: 'Teste nao encontrado' },
        { status: 404 }
      )
    }

    const { count: resultCount = 0, error: resultError } = await db
      .from('test_results')
      .select('id', { head: true, count: 'exact' })
      .eq('test_id', testId)

    if (resultError) {
      throw resultError
    }

    const questionsData = (test.questions || []) as any[]
    const formattedQuestions = questionsData
      .slice()
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map(question => ({
        id: question.id,
        text: question.text,
        type: question.type,
        order: question.order,
        options: parseOptions(question.options)
      }))

    return NextResponse.json({
      success: true,
      test: {
        id: test.id,
        title: test.title,
        description: test.description,
        shortDescription: test.short_description,
        category: test.category,
        instructions: test.instructions,
        isPremium: test.is_premium,
        cardImage: test.card_image,
        timeLimit: test.time_limit,
        isActive: test.is_active,
        createdAt: test.created_at,
        updatedAt: test.updated_at,
        questionCount: formattedQuestions.length,
        resultCount,
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
    const {
      title,
      description,
      shortDescription,
      category,
      instructions,
      timeLimit,
      isPremium,
      cardImage,
      isActive
    } = body

    const updateData: Record<string, any> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (shortDescription !== undefined) updateData.short_description = shortDescription || null
    if (category !== undefined) updateData.category = category
    if (instructions !== undefined) updateData.instructions = instructions
    if (timeLimit !== undefined) {
      updateData.time_limit = timeLimit ? parseInt(timeLimit, 10) : null
    }
    if (isPremium !== undefined) updateData.is_premium = isPremium
    if (cardImage !== undefined) updateData.card_image = cardImage || null
    if (isActive !== undefined) updateData.is_active = isActive

    const { data: updatedTest, error } = await db
      .from('tests')
      .update(updateData)
      .eq('id', testId)
      .select('id, title, description, category, instructions, time_limit, is_active, updated_at')
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!updatedTest) {
      throw new Error('Teste nao encontrado apos atualizacao')
    }

    return NextResponse.json({
      success: true,
      test: {
        id: updatedTest.id,
        title: updatedTest.title,
        description: updatedTest.description,
        category: updatedTest.category,
        instructions: updatedTest.instructions,
        timeLimit: updatedTest.time_limit,
        isActive: updatedTest.is_active,
        updatedAt: updatedTest.updated_at
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

    const { error } = await db
      .from('tests')
      .delete()
      .eq('id', testId)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Teste excluido com sucesso'
    })
  } catch (error) {
    console.error('Error deleting test:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir teste' },
      { status: 500 }
    )
  }
}
