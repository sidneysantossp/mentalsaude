import { NextRequest, NextResponse } from 'next/server'
import { db, getUserTestResults, saveTestResult } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

// Mock test data for fallback
const mockTests = {
  '1': {
    id: '1',
    title: 'PHQ-9 - Questionario de Saude do Paciente',
    category: 'DEPRESSION',
    questions: [
      { id: '1', order: 1 },
      { id: '2', order: 2 },
      { id: '3', order: 3 },
      { id: '4', order: 4 },
      { id: '5', order: 5 },
      { id: '6', order: 6 },
      { id: '7', order: 7 },
      { id: '8', order: 8 },
      { id: '9', order: 9 }
    ]
  },
  '2': {
    id: '2',
    title: 'Teste de Compulsao Alimentar',
    category: 'OCD',
    questions: [
      { id: '1', order: 1 },
      { id: '2', order: 2 },
      { id: '3', order: 3 }
    ]
  },
  '3': {
    id: '3',
    title: 'Teste de Ansiedade',
    category: 'ANXIETY',
    questions: [
      { id: '1', order: 1 },
      { id: '2', order: 2 },
      { id: '3', order: 3 }
    ]
  },
  '4': {
    id: '4',
    title: 'Teste de Nivel de Estresse',
    category: 'STRESS',
    questions: [
      { id: '1', order: 1 },
      { id: '2', order: 2 },
      { id: '3', order: 3 }
    ]
  },
  '5': {
    id: '5',
    title: 'Teste de Sofrimento Psicologico',
    category: 'DEPRESSION',
    questions: [
      { id: '1', order: 1 },
      { id: '2', order: 2 },
      { id: '3', order: 3 }
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testId, answers, userId } = body

    if (!testId || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let test: any = null
    try {
      const { data, error } = await db
        .from('tests')
        .select(`
          *,
          questions (
            id,
            "order"
          )
        `)
        .eq('id', testId)
        .maybeSingle()

      if (error) {
        throw error
      }

      test = data
    } catch (dbError) {
      console.log('Database not available, using mock data')
    }

    if (!test) {
      test = mockTests[testId as keyof typeof mockTests]
      if (!test) {
        return NextResponse.json(
          { error: 'Test not found' },
          { status: 404 }
        )
      }
    }

    const questionList = (test.questions || []) as { id: string }[]
    let totalScore = 0
    const answerData: any[] = []

    for (const answer of answers) {
      const question = questionList.find(q => q.id === answer.questionId)
      if (question) {
        let score = 0
        const answerValue = parseInt(answer.value)
        if (!isNaN(answerValue) && answerValue >= 0 && answerValue <= 3) {
          score = answerValue
        }

        totalScore += score
        answerData.push({
          question_id: answer.questionId,
          value: answer.value,
          score
        })
      }
    }

    const maxScore = questionList.length * 3 || answers.length * 3

    let interpretation = ""
    let recommendations = ""
    let category = ""

    try {
      const zai = await ZAI.create()
      const prompt = `
        Based on a psychological test result for ${test.category.toLowerCase()} with a total score of ${totalScore} out of ${maxScore},
        provide a professional interpretation and recommendations. The test contains ${questionList.length} questions with a maximum possible score of ${maxScore}.

        Test category: ${test.category}
        Test title: ${test.title}
        Total score: ${totalScore}
        Max possible score: ${maxScore}
        Percentage: ${Math.round((totalScore / maxScore) * 100)}%

        Please provide:
        1. A severity category (Minimal, Mild, Moderate, Moderately Severe, Severe)
        2. A brief interpretation of what this score means
        3. 3-4 specific recommendations for the person

        Format your response as JSON:
        {
          "category": "severity category",
          "interpretation": "brief interpretation",
          "recommendations": "recommendation text"
        }
      `

      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a mental health professional providing interpretations for psychological test results. Always stay supportive, professional, and include appropriate disclaimers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })

      const aiResponse = completion.choices[0]?.message?.content
      if (aiResponse) {
        try {
          const parsed = JSON.parse(aiResponse)
          category = parsed.category || "Moderate"
          interpretation = parsed.interpretation || "Your score indicates moderate symptoms that may benefit from professional attention."
          recommendations = parsed.recommendations || "Consider speaking with a mental health professional for further evaluation and support."
        } catch (parseError) {
          category = "Moderate"
          interpretation = "Your score indicates moderate symptoms that may benefit from professional attention."
          recommendations = "Consider speaking with a mental health professional for further evaluation and support."
        }
      }
    } catch (aiError) {
      console.error('AI interpretation failed:', aiError)
      const percentage = maxScore ? Math.round((totalScore / maxScore) * 100) : 0
      if (percentage <= 25) {
        category = "Minimal"
        interpretation = "Your score indicates minimal symptoms. Continue monitoring your mental health."
        recommendations = "Maintain healthy habits and seek support if symptoms worsen."
      } else if (percentage <= 50) {
        category = "Mild"
        interpretation = "Your score indicates mild symptoms that may benefit from self-care strategies."
        recommendations = "Practice stress management techniques and consider speaking with a trusted person or professional."
      } else if (percentage <= 75) {
        category = "Moderate"
        interpretation = "Your score indicates moderate symptoms that may benefit from professional attention."
        recommendations = "Consider speaking with a mental health professional for further evaluation and support."
      } else {
        category = "Severe"
        interpretation = "Your score indicates significant symptoms that require professional attention."
        recommendations = "Please seek help from a mental health professional as soon as possible."
      }
    }

    let testResult: any = null
    try {
      const savedResult = await saveTestResult({
        user_id: userId || 'anonymous',
        test_id: testId,
        total_score: totalScore,
        category,
        interpretation,
        recommendations
      }, answerData)

      testResult = {
        id: savedResult.id,
        totalScore: savedResult.total_score,
        category,
        interpretation,
        recommendations,
        completedAt: new Date().toISOString(),
        test: {
          title: test.title,
          category: test.category
        }
      }
    } catch (dbError) {
      console.log('Database save failed, generating mock result')
      testResult = {
        id: Date.now().toString(),
        totalScore,
        category,
        interpretation,
        recommendations,
        completedAt: new Date().toISOString(),
        test: {
          title: test.title,
          category: test.category
        }
      }
    }

    return NextResponse.json({
      success: true,
      result: {
        id: testResult.id,
        totalScore: testResult.totalScore,
        category: testResult.category,
        interpretation: testResult.interpretation,
        recommendations: testResult.recommendations,
        completedAt: testResult.completedAt,
        test: {
          title: test.title,
          category: test.category
        }
      }
    })
  } catch (error) {
    console.error('Error saving test result:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const testId = searchParams.get('testId')

    let targetUserId = userId
    if (!targetUserId) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        try {
          const { verifyToken } = await import('@/lib/db')
          const userData = verifyToken(token)
          targetUserId = userData.id
        } catch (error) {
          // Invalid token, continue without user
        }
      }
    }

    const results = await getUserTestResults(targetUserId || 'anonymous')

    return NextResponse.json({
      success: true,
      results: results
    })
  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
