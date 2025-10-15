import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const testId = resolvedParams.id

    // Get test with questions
    const test = await db.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      )
    }

    // Parse options for each question
    const questionsWithParsedOptions = test.questions.map(question => ({
      ...question,
      options: question.options ? JSON.parse(question.options) : []
    }))

    return NextResponse.json({
      test: {
        id: test.id,
        title: test.title,
        description: test.description,
        instructions: test.instructions,
        timeLimit: test.timeLimit,
        category: test.category
      },
      questions: questionsWithParsedOptions
    })
  } catch (error) {
    console.error('Error fetching test:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}