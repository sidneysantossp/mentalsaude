import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production'

// Global PrismaClient instance
let prisma: PrismaClient

// Initialize PrismaClient with proper error handling
function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['warn', 'error'],
    })
  }
  return prisma
}

// Database connection test
async function testConnection() {
  try {
    const client = getPrismaClient()
    await client.$connect()
    await client.$queryRaw`SELECT 1`
    await client.$disconnect()
    return true
  } catch (error) {
    console.warn('Database connection failed:', error.message)
    return false
  }
}

// Database query wrapper with fallback
export async function query(sql: string, params?: any[]) {
  try {
    const client = getPrismaClient()
    await client.$connect()
    
    // For raw SQL queries
    if (sql.toLowerCase().includes('select')) {
      const result = await client.$queryRaw`${sql}`
      return result
    }
    
    return []
  } catch (error) {
    console.error('Database query error:', error)
    return getFallbackData(sql, params)
  } finally {
    try {
      await prisma.$disconnect()
    } catch (e) {
      // Ignore disconnect errors
    }
  }
}

// Fallback data functions (same as original)
function getFallbackData(sql: string, params?: any[]) {
  const lowerSql = sql.toLowerCase()
  
  if (lowerSql.includes('select') && lowerSql.includes('users')) {
    if (lowerSql.includes('where email =')) {
      return []
    }
    return []
  }
  
  if (lowerSql.includes('select') && lowerSql.includes('tests')) {
    return getFallbackTests()
  }
  
  if (lowerSql.includes('select') && lowerSql.includes('questions')) {
    return getFallbackQuestions(params?.[0])
  }
  
  if (lowerSql.includes('insert')) {
    if (lowerSql.includes('users')) {
      return { insertId: 1, affectedRows: 1 }
    }
    if (lowerSql.includes('test_results')) {
      return { insertId: 1, affectedRows: 1 }
    }
    if (lowerSql.includes('answers')) {
      return { insertId: 1, affectedRows: 1 }
    }
  }
  
  return []
}

// Fallback test data (same as original)
function getFallbackTests() {
  return [
    {
      id: '1',
      title: 'Teste de Ansiedade',
      description: 'Avalie seus níveis de ansiedade',
      category: 'ansiedade',
      duration_minutes: 10,
      questions_count: 9,
      difficulty: 'fácil',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Teste de Depressão',
      description: 'Avalie seus sintomas depressivos',
      category: 'depressao',
      duration_minutes: 15,
      questions_count: 12,
      difficulty: 'médio',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Teste de Estresse',
      description: 'Meça seu nível de estresse',
      category: 'estresse',
      duration_minutes: 10,
      questions_count: 10,
      difficulty: 'fácil',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Teste de Burnout',
      description: 'Avalie esgotamento profissional',
      category: 'burnout',
      duration_minutes: 15,
      questions_count: 15,
      difficulty: 'médio',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Teste de Fobia Social',
      description: 'Avalie ansiedade em situações sociais',
      category: 'fobia_social',
      duration_minutes: 12,
      questions_count: 11,
      difficulty: 'médio',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Teste de Pânico',
      description: 'Avalie sintomas de transtorno de pânico',
      category: 'panico',
      duration_minutes: 10,
      questions_count: 8,
      difficulty: 'fácil',
      created_at: new Date().toISOString()
    },
    {
      id: '7',
      title: 'Teste de TOC',
      description: 'Avalie sintomas obsessivo-compulsivos',
      category: 'toc',
      duration_minutes: 20,
      questions_count: 18,
      difficulty: 'difícil',
      created_at: new Date().toISOString()
    },
    {
      id: '8',
      title: 'Teste de Autoestima',
      description: 'Avalie sua autoestima e confiança',
      category: 'autoestima',
      duration_minutes: 8,
      questions_count: 7,
      difficulty: 'fácil',
      created_at: new Date().toISOString()
    }
  ]
}

// Fallback questions data (same as original)
function getFallbackQuestions(testId?: string) {
  const questions: any = {
    '1': [
      { id: 'q1', test_id: '1', question_text: 'Você se sente nervoso ou ansioso?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 1 },
      { id: 'q2', test_id: '1', question_text: 'Você tem dificuldade em relaxar?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 2 },
      { id: 'q3', test_id: '1', question_text: 'Você se preocupa excessivamente?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 3 }
    ],
    '2': [
      { id: 'q4', test_id: '2', question_text: 'Você se sente triste ou depressivo?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 1 },
      { id: 'q5', test_id: '2', question_text: 'Você perdeu interesse em atividades?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 2 },
      { id: 'q6', test_id: '2', question_text: 'Você tem problemas de sono?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 3 }
    ]
  }
  
  return questions[testId] || []
}

// Authentication functions using Prisma
export async function createUser(email: string, password: string, name?: string) {
  try {
    const client = getPrismaClient()
    
    // Check if user already exists
    const existingUser = await client.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      throw new Error('Usuário já existe')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user
    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null
      }
    })

    return { id: user.id, email: user.email, name: user.name }
  } catch (error) {
    console.error('Error creating user:', error)
    // Fallback to mock user creation
    const userId = `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    if (typeof globalThis !== 'undefined' && globalThis.fallbackUsers) {
      globalThis.fallbackUsers[email] = {
        id: userId,
        email,
        name,
        password: await bcrypt.hash(password, 10),
        createdAt: new Date().toISOString()
      }
    } else if (typeof globalThis !== 'undefined') {
      globalThis.fallbackUsers = {}
      globalThis.fallbackUsers[email] = {
        id: userId,
        email,
        name,
        password: await bcrypt.hash(password, 10),
        createdAt: new Date().toISOString()
      }
    }
    
    return { id: userId, email, name }
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const client = getPrismaClient()
    
    // Find user
    const user = await client.user.findUnique({
      where: { email }
    })
    
    if (!user || !user.password) {
      throw new Error('Email ou senha incorretos')
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      throw new Error('Email ou senha incorretos')
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    }
  } catch (error) {
    console.error('Error authenticating user:', error)
    
    // Fallback authentication
    if (typeof globalThis !== 'undefined' && globalThis.fallbackUsers && globalThis.fallbackUsers[email]) {
      const user = globalThis.fallbackUsers[email]
      const isValidPassword = await bcrypt.compare(password, user.password)
      
      if (!isValidPassword) {
        throw new Error('Email ou senha incorretos')
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          role: 'user'
        },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      )

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'user'
        },
        token
      }
    } else {
      throw new Error('Email ou senha incorretos')
    }
  }
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    throw new Error('Token inválido')
  }
}

// Test functions using Prisma
export async function getTests() {
  try {
    const client = getPrismaClient()
    const tests = await client.test.findMany({
      orderBy: { createdAt: 'asc' }
    })
    return tests
  } catch (error) {
    console.error('Error fetching tests:', error)
    return getFallbackTests()
  }
}

export async function getTestById(id: string) {
  try {
    const client = getPrismaClient()
    const test = await client.test.findUnique({
      where: { id }
    })
    return test
  } catch (error) {
    console.error('Error fetching test:', error)
    return null
  }
}

export async function getQuestionsByTestId(testId: string) {
  try {
    const client = getPrismaClient()
    const questions = await client.question.findMany({
      where: { testId },
      orderBy: { order: 'asc' }
    })
    return questions
  } catch (error) {
    console.error('Error fetching questions:', error)
    return getFallbackQuestions(testId)
  }
}

export async function saveTestResult(data: {
  userId: string
  testId: string
  totalScore: number
  category: string
  interpretation: string
  recommendations?: string
  answers: Array<{ questionId: string; value: string; score: number }>
}) {
  try {
    const client = getPrismaClient()
    const resultId = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create test result
    const result = await client.testResult.create({
      data: {
        id: resultId,
        userId: data.userId,
        testId: data.testId,
        totalScore: data.totalScore,
        category: data.category,
        interpretation: data.interpretation,
        recommendations: data.recommendations
      }
    })

    // Create answers
    for (const answer of data.answers) {
      const answerId = `answer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      await client.answer.create({
        data: {
          id: answerId,
          questionId: answer.questionId,
          testResultId: resultId,
          value: answer.value,
          score: answer.score
        }
      })
    }

    return resultId
  } catch (error) {
    console.error('Error saving test result:', error)
    
    // Fallback save
    const resultId = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    if (typeof globalThis !== 'undefined') {
      if (!globalThis.fallbackResults) {
        globalThis.fallbackResults = []
      }
      
      const result = {
        id: resultId,
        user_id: data.userId,
        test_id: data.testId,
        total_score: data.totalScore,
        category: data.category,
        interpretation: data.interpretation,
        recommendations: data.recommendations,
        answers: data.answers.map(answer => ({
          id: `answer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          question_id: answer.questionId,
          test_result_id: resultId,
          value: answer.value,
          score: answer.score
        })),
        completed_at: new Date().toISOString()
      }
      
      globalThis.fallbackResults.push(result)
    }
    
    return resultId
  }
}

export async function getUserTestResults(userId: string) {
  try {
    const client = getPrismaClient()
    const results = await client.testResult.findMany({
      where: { userId },
      include: {
        test: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      },
      orderBy: { completedAt: 'desc' }
    })
    
    // Transform to match expected format
    return results.map(result => ({
      id: result.id,
      totalScore: result.totalScore,
      category: result.category,
      interpretation: result.interpretation,
      recommendations: result.recommendations,
      completedAt: result.completedAt,
      test: result.test
    }))
  } catch (error) {
    console.error('Error fetching user test results:', error)
    
    // Fallback results
    if (typeof globalThis !== 'undefined' && globalThis.fallbackResults) {
      const userResults = globalThis.fallbackResults.filter((result: any) => result.user_id === userId)
      return userResults.map((result: any) => ({
        id: result.id,
        totalScore: result.total_score,
        category: result.category,
        interpretation: result.interpretation,
        recommendations: result.recommendations,
        completedAt: result.completed_at,
        test: {
          id: result.test_id,
          title: `Teste ${result.test_id}`,
          category: result.test_category || 'GENERAL'
        }
      }))
    }
    
    return []
  }
}

export async function closePool() {
  try {
    if (prisma) {
      await prisma.$disconnect()
    }
  } catch (error) {
    console.error('Error closing database connection:', error)
  }
}
