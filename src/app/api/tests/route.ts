import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const tests = await prisma.test.findMany({
      where: { isActive: true },
      include: {
        questions: true
      },
      orderBy: { createdAt: 'asc' }
    })

    // If no tests in database, return mock data
    if (!tests || tests.length === 0) {
      const mockTests = [
        {
          id: 'depression',
          title: 'Teste de Depressão',
          description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
          category: 'DEPRESSION',
          timeLimit: 10,
          instructions: 'Para cada questão, selecione a resposta que melhor descreve com que frequência você teve este problema nas últimas 2 semanas.',
          questionCount: 9,
          difficulty: 'Fácil',
          estimatedTime: '10 min'
        },
        {
          id: 'anxiety',
          title: 'Teste de Ansiedade',
          description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
          category: 'ANXIETY',
          timeLimit: 5,
          instructions: 'Para cada questão, selecione com que frequência você se sentiu assim nas últimas duas semanas.',
          questionCount: 7,
          difficulty: 'Fácil',
          estimatedTime: '5 min'
        },
        {
          id: 'compulsion',
          title: 'Teste de Compulsão Alimentar',
          description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
          category: 'OCD',
          timeLimit: 15,
          instructions: 'Para cada questão, seja honesto(a) sobre seus hábitos alimentares e sentimentos relacionados.',
          questionCount: 12,
          difficulty: 'Médio',
          estimatedTime: '15 min'
        },
        {
          id: 'adhd',
          title: 'Teste de TDAH',
          description: 'Avalie sintomas de desatenção, hiperatividade e impulsividade',
          category: 'ADHD',
          timeLimit: 12,
          instructions: 'Pense em seu comportamento nos últimos 6 meses e responda com honestidade.',
          questionCount: 18,
          difficulty: 'Médio',
          estimatedTime: '12 min'
        },
        {
          id: 'stress',
          title: 'Teste de Estresse',
          description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
          category: 'STRESS',
          timeLimit: 5,
          instructions: 'Pense como você se sentiu no último mês e responda com honestidade.',
          questionCount: 10,
          difficulty: 'Fácil',
          estimatedTime: '5 min'
        },
        {
          id: 'panic',
          title: 'Teste Transtorno de Pânico',
          description: 'Avalie sintomas de crises de pânico e ansiedade aguda',
          category: 'ANXIETY',
          timeLimit: 8,
          instructions: 'Pense em como você se sentiu nas últimas semanas e responda com honestidade.',
          questionCount: 15,
          difficulty: 'Médio',
          estimatedTime: '8 min'
        },
        {
          id: 'social-phobia',
          title: 'Teste Fobia Social',
          description: 'Identifique medos e ansiedade em situações sociais',
          category: 'ANXIETY',
          timeLimit: 10,
          instructions: 'Pense em como você se sente em situações sociais e responda com honestidade.',
          questionCount: 17,
          difficulty: 'Médio',
          estimatedTime: '10 min'
        },
        {
          id: 'mental-suffering',
          title: 'Grau de Sofrimento Mental',
          description: 'Meça o nível de sofrimento psíquico e seu impacto no bem-estar',
          category: 'DEPRESSION',
          timeLimit: 12,
          instructions: 'Responda pensando em como você se sentiu geralmente no último mês.',
          questionCount: 20,
          difficulty: 'Difícil',
          estimatedTime: '12 min'
        }
      ]

      return NextResponse.json({
        success: true,
        tests: mockTests
      })
    }

    const formattedTests = tests.map(test => ({
      id: test.id,
      title: test.title,
      slug: test.slug,
      description: test.description,
      category: test.category,
      timeLimit: test.timeLimit,
      instructions: test.instructions,
      questionCount: test.questions.length,
      estimatedTime: test.timeLimit ? `${test.timeLimit} min` : 'Sem limite'
    }))

    return NextResponse.json(formattedTests)
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}