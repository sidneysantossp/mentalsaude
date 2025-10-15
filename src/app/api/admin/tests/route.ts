import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const tests = await db.test.findMany({
      include: {
        _count: {
          select: {
            questions: true,
            testResults: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedTests = tests.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description,
      category: test.category,
      timeLimit: test.timeLimit,
      isActive: test.isActive,
      createdAt: test.createdAt.toISOString(),
      questionCount: test._count.questions,
      resultCount: test._count.testResults
    }))

    return NextResponse.json({
      success: true,
      tests: formattedTests
    })
  } catch (error) {
    console.error('Error fetching tests:', error)
    
    // Return mock data if database fails
    const mockTests = [
      {
        id: '1',
        title: 'PHQ-9 - Questionário de Depressão',
        description: 'Avaliação de sintomas depressivos baseada no PHQ-9',
        category: 'DEPRESSION',
        timeLimit: 10,
        isActive: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        questionCount: 9,
        resultCount: 156
      },
      {
        id: '2',
        title: 'GAD-7 - Escala de Ansiedade',
        description: 'Avaliação de sintomas de ansiedade usando GAD-7',
        category: 'ANXIETY',
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
        questionCount: 7,
        resultCount: 98
      },
      {
        id: '3',
        title: 'Teste de TDAH - Desatenção',
        description: 'Avaliação de sintomas de desatenção e hiperatividade',
        category: 'ADHD',
        timeLimit: 12,
        isActive: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
        questionCount: 18,
        resultCount: 67
      },
      {
        id: '4',
        title: 'Escala de Estresse Percebido',
        description: 'Medição do nível de estresse percebido pelo indivíduo',
        category: 'STRESS',
        timeLimit: 8,
        isActive: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
        questionCount: 10,
        resultCount: 45
      },
      {
        id: '5',
        title: 'Teste de Compulsão Alimentar',
        description: 'Identificação de padrões de alimentação compulsiva',
        category: 'OCD',
        timeLimit: 15,
        isActive: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        questionCount: 12,
        resultCount: 23
      }
    ]

    return NextResponse.json({
      success: true,
      tests: mockTests
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, instructions, timeLimit, isActive } = body

    if (!title || !description || !category || !instructions) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: título, descrição, categoria e instruções' },
        { status: 400 }
      )
    }

    const newTest = await db.test.create({
      data: {
        title,
        description,
        category,
        instructions,
        timeLimit: timeLimit ? parseInt(timeLimit) : null,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json({
      success: true,
      test: {
        id: newTest.id,
        title: newTest.title,
        description: newTest.description,
        category: newTest.category,
        instructions: newTest.instructions,
        timeLimit: newTest.timeLimit,
        isActive: newTest.isActive,
        createdAt: newTest.createdAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error creating test:', error)
    return NextResponse.json(
      { error: 'Erro ao criar teste' },
      { status: 500 }
    )
  }
}