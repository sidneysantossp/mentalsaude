import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const testId = resolvedParams.id
    const body = await request.json()
    const { text, type, order, options } = body

    if (!text || !type || !order) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: texto, tipo e ordem' },
        { status: 400 }
      )
    }

    const question = await prisma.question.create({
      data: {
        testId,
        text,
        type,
        order: parseInt(order),
        options: options || null
      }
    })

    return NextResponse.json({
      success: true,
      question: {
        id: question.id,
        text: question.text,
        type: question.type,
        order: question.order,
        options: question.options ? JSON.parse(question.options) : []
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
