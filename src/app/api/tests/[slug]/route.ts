import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const test = await prisma.test.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!test) {
      return NextResponse.json(
        { error: 'Teste não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(test)
  } catch (error) {
    console.error('Erro ao buscar teste:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar teste' },
      { status: 500 }
    )
  }
}
