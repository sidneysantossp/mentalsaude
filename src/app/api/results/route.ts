import { NextRequest, NextResponse } from 'next/server'
import { getUserTestResults } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

// Mock test data for fallback
const mockTests = {
  '1': {
    id: '1',
    title: 'PHQ-9 - Questionário de Saúde do Paciente',
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
    title: 'Teste de Compulsão Alimentar',
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
    title: 'Teste de Nível de Estresse',
    category: 'STRESS',
    questions: [
      { id: '1', order: 1 },
      { id: '2', order: 2 },
      { id: '3', order: 3 }
    ]
  },
  '5': {
    id: '5',
    title: 'Teste de Sofrimento Psíquico',
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

    // Get test information - try database first, fallback to mock data
    let test = null
    try {
      const { getTestById } = await import('@/lib/mysql')
      test = await getTestById(testId)
    } catch (dbError) {
      console.log('Database not available, using mock data')
    }

    // Use mock data if database fails or test not found
    if (!test) {
      test = mockTests[testId as keyof typeof mockTests]
      if (!test) {
        return NextResponse.json(
          { error: 'Test not found' },
          { status: 404 }
        )
      }
    }

    // Calculate total score
    let totalScore = 0
    const answerData = []

    for (const answer of answers) {
      const question = test.questions.find(q => q.id === answer.questionId)
      if (question) {
        // Calculate score based on PHQ-9 pattern (0-3 scale)
        let score = 0
        const answerValue = parseInt(answer.value)
        if (!isNaN(answerValue) && answerValue >= 0 && answerValue <= 3) {
          score = answerValue
        }
        
        totalScore += score
        
        answerData.push({
          questionId: answer.questionId,
          value: answer.value,
          score: score
        })
      }
    }

    // Use AI to generate interpretation and recommendations
    let interpretation = ""
    let recommendations = ""
    let category = ""

    try {
      const zai = await ZAI.create()
      
      const prompt = `
        Based on a psychological test result for ${test.category.toLowerCase()} with a total score of ${totalScore} out of ${test.questions.length * 3}, 
        provide a professional interpretation and recommendations. The test contains ${test.questions.length} questions with a maximum possible score of ${test.questions.length * 3}.
        
        Test category: ${test.category}
        Test title: ${test.title}
        Total score: ${totalScore}
        Max possible score: ${test.questions.length * 3}
        Percentage: ${Math.round((totalScore / (test.questions.length * 3)) * 100)}%
        
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
            content: 'You are a mental health professional providing interpretations for psychological test results. Always be supportive, professional, and include appropriate disclaimers.'
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
          // Fallback if JSON parsing fails
          category = "Moderate"
          interpretation = "Your score indicates moderate symptoms that may benefit from professional attention."
          recommendations = "Consider speaking with a mental health professional for further evaluation and support."
        }
      }
    } catch (aiError) {
      console.error('AI interpretation failed:', aiError)
      // Fallback interpretation
      const percentage = Math.round((totalScore / (test.questions.length * 3)) * 100)
      if (percentage <= 25) {
        category = "Minimal"
        interpretation = "Your score indicates minimal symptoms. Continue monitoring your mental health."
        recommendations = "Maintain healthy habits and seek support if symptoms worsen."
      } else if (percentage <= 50) {
        category = "Mild"
        interpretation = "Your score indicates mild symptoms that may benefit from self-care strategies."
        recommendations = "Practice stress management techniques and consider speaking with a trusted friend or professional."
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

    // Create test result in database - try database first, fallback to localStorage simulation
    let testResult = null
    try {
      const { saveTestResult } = await import('@/lib/mysql')
      const resultId = await saveTestResult({
        userId: userId || 'anonymous',
        testId: testId,
        totalScore: totalScore,
        category: category,
        interpretation: interpretation,
        recommendations: recommendations,
        answers: answerData
      })
      
      testResult = {
        id: resultId,
        totalScore: totalScore,
        category: category,
        interpretation: interpretation,
        recommendations: recommendations,
        completedAt: new Date().toISOString(),
        test: {
          title: test.title,
          category: test.category
        }
      }
    } catch (dbError) {
      console.log('Database save failed, generating mock result')
      // Generate mock result for fallback
      testResult = {
        id: Date.now().toString(),
        totalScore: totalScore,
        category: category,
        interpretation: interpretation,
        recommendations: recommendations,
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

    // Get user from token if no userId provided
    let targetUserId = userId
    if (!targetUserId) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        try {
          const { verifyToken } = await import('@/lib/mysql')
          const userData = verifyToken(token)
          targetUserId = userData.id
        } catch (error) {
          // Invalid token, continue without user
        }
      }
    }

    // Fetch results using MySQL
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