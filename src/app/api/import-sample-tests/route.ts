import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Testes temporários para importação
const sampleTests = [
  {
    title: "PHQ-9 - Teste de Depressão",
    description: "Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional",
    category: "DEPRESSION",
    instructions: "Responda cada questão com base em como você se sentiu nas últimas duas semanas.",
    timeLimit: 15,
    questions: [
      {
        text: "Pouco interesse ou prazer em fazer coisas",
        type: "LIKERT_SCALE",
        order: 1,
        options: JSON.stringify([
          { id: "1", text: "Nenhuma vez", value: 0, order: 1 },
          { id: "2", text: "Vários dias", value: 1, order: 2 },
          { id: "3", text: "Mais da metade dos dias", value: 2, order: 3 },
          { id: "4", text: "Quase todos os dias", value: 3, order: 4 }
        ])
      },
      {
        text: "Humor deprimido, triste ou desesperançado",
        type: "LIKERT_SCALE",
        order: 2,
        options: JSON.stringify([
          { id: "5", text: "Nenhuma vez", value: 0, order: 1 },
          { id: "6", text: "Vários dias", value: 1, order: 2 },
          { id: "7", text: "Mais da metade dos dias", value: 2, order: 3 },
          { id: "8", text: "Quase todos os dias", value: 3, order: 4 }
        ])
      },
      {
        text: "Dificuldade para adormecer ou permanecer dormindo, ou dormir muito",
        type: "LIKERT_SCALE",
        order: 3,
        options: JSON.stringify([
          { id: "9", text: "Nenhuma vez", value: 0, order: 1 },
          { id: "10", text: "Vários dias", value: 1, order: 2 },
          { id: "11", text: "Mais da metade dos dias", value: 2, order: 3 },
          { id: "12", text: "Quase todos os dias", value: 3, order: 4 }
        ])
      }
    ]
  },
  {
    title: "Teste de Ansiedade",
    description: "Meça seus níveis de ansiedade e como ela afeta seu dia a dia",
    category: "ANXIETY",
    instructions: "Responda cada questão com base em como você se sentiu na última semana.",
    timeLimit: 10,
    questions: [
      {
        text: "Sentir-se nervoso, ansioso ou tenso",
        type: "LIKERT_SCALE",
        order: 1,
        options: JSON.stringify([
          { id: "13", text: "Nenhuma vez", value: 0, order: 1 },
          { id: "14", text: "Vários dias", value: 1, order: 2 },
          { id: "15", text: "Mais da metade dos dias", value: 2, order: 3 },
          { id: "16", text: "Quase todos os dias", value: 3, order: 4 }
        ])
      },
      {
        text: "Não conseguir parar de se preocupar",
        type: "LIKERT_SCALE",
        order: 2,
        options: JSON.stringify([
          { id: "17", text: "Nenhuma vez", value: 0, order: 1 },
          { id: "18", text: "Vários dias", value: 1, order: 2 },
          { id: "19", text: "Mais da metade dos dias", value: 2, order: 3 },
          { id: "20", text: "Quase todos os dias", value: 3, order: 4 }
        ])
      },
      {
        text: "Preocupar-se excessivamente sobre diferentes coisas",
        type: "LIKERT_SCALE",
        order: 3,
        options: JSON.stringify([
          { id: "21", text: "Nenhuma vez", value: 0, order: 1 },
          { id: "22", text: "Vários dias", value: 1, order: 2 },
          { id: "23", text: "Mais da metade dos dias", value: 2, order: 3 },
          { id: "24", text: "Quase todos os dias", value: 3, order: 4 }
        ])
      }
    ]
  }
]

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Iniciando importação de testes de amostra...')
    
    let importedTests = 0
    let importedQuestions = 0
    
    for (const testData of sampleTests) {
      try {
        // Criar o teste
        const test = await db.test.create({
          data: {
            title: testData.title,
            description: testData.description,
            category: testData.category,
            instructions: testData.instructions,
            timeLimit: testData.timeLimit,
            isActive: true
          }
        })
        
        console.log(`✅ Teste criado: ${test.title}`)
        importedTests++
        
        // Criar as questões
        for (const questionData of testData.questions) {
          const question = await db.question.create({
            data: {
              testId: test.id,
              text: questionData.text,
              type: questionData.type,
              order: questionData.order,
              options: questionData.options
            }
          })
          
          console.log(`  ✅ Questão criada: ${question.text}`)
          importedQuestions++
        }
        
      } catch (error) {
        console.error(`❌ Erro ao importar teste ${testData.title}:`, error)
      }
    }
    
    console.log(`🎉 Importação concluída! ${importedTests} testes e ${importedQuestions} questões importadas.`)
    
    return NextResponse.json({
      success: true,
      message: `Importação concluída com sucesso!`,
      data: {
        importedTests,
        importedQuestions
      }
    })
    
  } catch (error) {
    console.error('❌ Erro na importação:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao importar testes de amostra' 
      },
      { status: 500 }
    )
  }
}