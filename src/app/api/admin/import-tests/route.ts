import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const testsData = [
  {
    title: 'PHQ-9 - Questionário de Saúde do Paciente',
    description: 'Avaliação de sintomas depressivos baseada no PHQ-9, instrumento validado cientificamente',
    instructions: 'Para cada questão, selecione a resposta que melhor descreve com que frequência você teve este problema nas últimas 2 semanas.',
    timeLimit: 10,
    category: 'DEPRESSION',
    questions: [
      {
        text: 'Pouco interesse ou prazer em fazer as coisas',
        type: 'LIKERT_SCALE',
        order: 1,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Sentindo-se para baixo, deprimido(a) ou sem esperança',
        type: 'LIKERT_SCALE',
        order: 2,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Dificuldade para pegar no sono ou continuar dormindo, ou dormir muito',
        type: 'LIKERT_SCALE',
        order: 3,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Sentindo-se cansado(a) ou com pouca energia',
        type: 'LIKERT_SCALE',
        order: 4,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Pouco apetite ou comendo demais',
        type: 'LIKERT_SCALE',
        order: 5,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Sentindo-se mal consigo mesmo(a) ou que é um fracasso ou que decepcionou sua família ou a si mesmo(a)',
        type: 'LIKERT_SCALE',
        order: 6,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Dificuldade para se concentrar nas coisas, como ler o jornal ou assistir televisão',
        type: 'LIKERT_SCALE',
        order: 7,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Movimentando-se ou falando tão lentamente que outras pessoas notaram, ou o oposto - estar tão agitado(a) que você tem se movido muito mais que o normal',
        type: 'LIKERT_SCALE',
        order: 8,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Pensamentos em se ferir de alguma forma ou que seria melhor estar morto(a)',
        type: 'LIKERT_SCALE',
        order: 9,
        options: [
          { text: 'Nenhuma vez', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Teste de Compulsão Alimentar',
    description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
    instructions: 'Para cada questão, seja honesto(a) sobre seus hábitos alimentares e sentimentos relacionados.',
    timeLimit: 15,
    category: 'OCD',
    questions: [
      {
        text: 'Como muito mais rápido que o normal',
        type: 'LIKERT_SCALE',
        order: 1,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Às vezes', value: 1, order: 2 },
          { text: 'Frequentemente', value: 2, order: 3 },
          { text: 'Sempre', value: 3, order: 4 }
        ]
      },
      {
        text: 'Como até me sentir desconfortavelmente cheio(a)',
        type: 'LIKERT_SCALE',
        order: 2,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Às vezes', value: 1, order: 2 },
          { text: 'Frequentemente', value: 2, order: 3 },
          { text: 'Sempre', value: 3, order: 4 }
        ]
      },
      {
        text: 'Como grandes quantidades mesmo sem sentir fome',
        type: 'LIKERT_SCALE',
        order: 3,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Às vezes', value: 1, order: 2 },
          { text: 'Frequentemente', value: 2, order: 3 },
          { text: 'Sempre', value: 3, order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Teste de Ansiedade',
    description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
    instructions: 'Para cada questão, selecione com que frequência você se sentiu assim nas últimas duas semanas.',
    timeLimit: 5,
    category: 'ANXIETY',
    questions: [
      {
        text: 'Me sinto nervoso(a), ansioso(a) ou tenso(a)',
        type: 'LIKERT_SCALE',
        order: 1,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Não consigo parar de me preocupar',
        type: 'LIKERT_SCALE',
        order: 2,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      },
      {
        text: 'Me preocupo excessivamente com diferentes coisas',
        type: 'LIKERT_SCALE',
        order: 3,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Vários dias', value: 1, order: 2 },
          { text: 'Mais da metade dos dias', value: 2, order: 3 },
          { text: 'Quase todos os dias', value: 3, order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Teste de Nível de Estresse',
    description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
    instructions: 'Pense como você se sentiu no último mês e responda com honestidade.',
    timeLimit: 5,
    category: 'STRESS',
    questions: [
      {
        text: 'Frequentemente me sinto estressado(a)',
        type: 'LIKERT_SCALE',
        order: 1,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Raramente', value: 1, order: 2 },
          { text: 'Às vezes', value: 2, order: 3 },
          { text: 'Frequentemente', value: 3, order: 4 }
        ]
      },
      {
        text: 'Sinto que não consigo controlar as coisas importantes na minha vida',
        type: 'LIKERT_SCALE',
        order: 2,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Raramente', value: 1, order: 2 },
          { text: 'Às vezes', value: 2, order: 3 },
          { text: 'Frequentemente', value: 3, order: 4 }
        ]
      },
      {
        text: 'Me sinto sobrecarregado(a) pelas responsabilidades',
        type: 'LIKERT_SCALE',
        order: 3,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Raramente', value: 1, order: 2 },
          { text: 'Às vezes', value: 2, order: 3 },
          { text: 'Frequentemente', value: 3, order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Teste de Sofrimento Psíquico',
    description: 'Avalie seu nível de sofrimento emocional e psicológico geral',
    instructions: 'Responda pensando em como você se sentiu geralmente no último mês.',
    timeLimit: 12,
    category: 'DEPRESSION',
    questions: [
      {
        text: 'Me sinto triste ou deprimido(a)',
        type: 'LIKERT_SCALE',
        order: 1,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Raramente', value: 1, order: 2 },
          { text: 'Às vezes', value: 2, order: 3 },
          { text: 'Frequentemente', value: 3, order: 4 }
        ]
      },
      {
        text: 'Perdi o interesse nas coisas que costumava gostar',
        type: 'LIKERT_SCALE',
        order: 2,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Raramente', value: 1, order: 2 },
          { text: 'Às vezes', value: 2, order: 3 },
          { text: 'Frequentemente', value: 3, order: 4 }
        ]
      },
      {
        text: 'Tenho dificuldade em dormir',
        type: 'LIKERT_SCALE',
        order: 3,
        options: [
          { text: 'Nunca', value: 0, order: 1 },
          { text: 'Raramente', value: 1, order: 2 },
          { text: 'Às vezes', value: 2, order: 3 },
          { text: 'Frequentemente', value: 3, order: 4 }
        ]
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Check if user is admin
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso restrito a administradores' }, { status: 403 })
    }

    const results = []
    
    for (const testData of testsData) {
      try {
        // Create test
        const test = await db.test.create({
          data: {
            title: testData.title,
            description: testData.description,
            instructions: testData.instructions,
            timeLimit: testData.timeLimit,
            category: testData.category as any,
            isActive: true
          }
        })

        // Create questions for this test
        for (const questionData of testData.questions) {
          // Create question with JSON options
          await db.question.create({
            data: {
              testId: test.id,
              text: questionData.text,
              type: questionData.type as any,
              order: questionData.order,
              options: JSON.stringify(questionData.options)
            }
          })
        }

        results.push({
          testId: test.id,
          title: test.title,
          category: test.category,
          questionsCount: testData.questions.length
        })
      } catch (error) {
        console.error(`Error importing test ${testData.title}:`, error)
        results.push({
          title: testData.title,
          error: 'Failed to import'
        })
      }
    }

    return NextResponse.json({ 
      message: 'Testes importados com sucesso!',
      results: results
    })
  } catch (error) {
    console.error('Error importing tests:', error)
    return NextResponse.json({ error: 'Erro ao importar testes' }, { status: 500 })
  }
}