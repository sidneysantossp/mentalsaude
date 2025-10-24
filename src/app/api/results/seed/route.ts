import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // First, create a demo user
    let demoUser = null
    try {
      demoUser = await db.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
          email: 'demo@example.com',
          name: 'Demo User',
          role: 'USER'
        }
      })
    } catch (error) {
      console.error('Error creating demo user:', error)
    }

    if (!demoUser) {
      return NextResponse.json(
        { error: 'Failed to create demo user' },
        { status: 500 }
      )
    }

    // First, ensure we have the tests
    const tests = [
      {
        id: '1',
        title: 'PHQ-9 - Questionário de Saúde do Paciente',
        category: 'DEPRESSION',
        description: 'Avaliação de sintomas depressivos',
        instructions: 'Responda com base nas últimas duas semanas',
        timeLimit: 600,
        isActive: true,
        imageUrl: '/images/depression-test.jpg'
      },
      {
        id: '2',
        title: 'Teste de Compulsão Alimentar',
        category: 'OCD',
        description: 'Avaliação de padrões alimentares compulsivos',
        instructions: 'Seja honesto em suas respostas',
        timeLimit: 900,
        isActive: true,
        imageUrl: '/images/eating-test.jpg'
      },
      {
        id: '3',
        title: 'Teste de Ansiedade',
        category: 'ANXIETY',
        description: 'Avaliação de sintomas de ansiedade',
        instructions: 'Pense em como você se sentiu recentemente',
        timeLimit: 600,
        isActive: true,
        imageUrl: '/images/anxiety-test.jpg'
      }
    ]

    // Create tests if they don't exist
    for (const testData of tests) {
      try {
        await db.test.upsert({
          where: { id: testData.id },
          update: testData,
          create: testData
        })
      } catch (error) {
        console.error('Error creating test:', error)
      }
    }

    // Create some sample test results
    const sampleResults = [
      {
        userId: demoUser.id,
        testId: '1',
        totalScore: 12,
        category: 'Moderate',
        interpretation: 'Seus sintomas depressivos são moderados e podem beneficiar de atenção profissional.',
        recommendations: 'Considere falar com um profissional de saúde mental para avaliação e suporte adicionais.',
        completedAt: new Date('2024-10-15T10:30:00Z'),
      },
      {
        userId: demoUser.id,
        testId: '2',
        totalScore: 8,
        category: 'Mild',
        interpretation: 'Seus sintomas de compulsão alimentar são leves.',
        recommendations: 'Pratique mindfulness e procure apoio se os sintomas piorarem.',
        completedAt: new Date('2024-10-14T14:20:00Z'),
      },
      {
        userId: demoUser.id,
        testId: '3',
        totalScore: 15,
        category: 'Moderate',
        interpretation: 'Seus sintomas de ansiedade são moderados.',
        recommendations: 'Técnicas de relaxamento e exercícios respiratórios podem ajudar.',
        completedAt: new Date('2024-10-13T09:15:00Z'),
      }
    ]

    const createdResults = []
    
    for (const resultData of sampleResults) {
      try {
        const result = await db.testResult.create({
          data: resultData
        })
        createdResults.push(result)
      } catch (error) {
        console.error('Error creating sample result:', error)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdResults.length} sample results for user ${demoUser.email}`,
      results: createdResults
    })
  } catch (error) {
    console.error('Error seeding results:', error)
    return NextResponse.json(
      { error: 'Failed to seed results' },
      { status: 500 }
    )
  }
}