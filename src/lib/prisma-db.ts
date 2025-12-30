import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'fallback_secret_key_change_in_production'

const prisma = new PrismaClient()

export async function createUser(email: string, password: string, name?: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new Error('Usuário já existe')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: 'USER'
      }
    })

    return { id: user.id, email: user.email, name: user.name }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      throw new Error('Email ou senha incorretos')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new Error('Email ou senha incorretos')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
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
    throw error
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

export async function getTests() {
  try {
    const tests = await prisma.test.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        questions: true
      }
    })
    return tests
  } catch (error) {
    console.error('Error fetching tests:', error)
    throw error
  }
}

export async function getTestById(id: string) {
  try {
    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    })
    return test
  } catch (error) {
    console.error('Error fetching test:', error)
    throw error
  }
}

export async function getTestBySlug(slug: string) {
  try {
    const test = await prisma.test.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    })
    return test
  } catch (error) {
    console.error('Error fetching test by slug:', error)
    throw error
  }
}

export async function getQuestionsByTestId(testId: string) {
  try {
    const questions = await prisma.question.findMany({
      where: { testId },
      orderBy: { order: 'asc' }
    })
    return questions
  } catch (error) {
    console.error('Error fetching questions:', error)
    throw error
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
    const result = await prisma.testResult.create({
      data: {
        userId: data.userId,
        testId: data.testId,
        totalScore: data.totalScore,
        category: data.category,
        interpretation: data.interpretation,
        recommendations: data.recommendations,
        answers: {
          create: data.answers.map(answer => ({
            questionId: answer.questionId,
            value: answer.value,
            score: answer.score
          }))
        }
      }
    })

    return result.id
  } catch (error) {
    console.error('Error saving test result:', error)
    throw error
  }
}

export async function getUserTestResults(userId: string) {
  try {
    const results = await prisma.testResult.findMany({
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

    return results.map(result => ({
      id: result.id,
      totalScore: result.totalScore,
      category: result.category,
      interpretation: result.interpretation,
      recommendations: result.recommendations,
      completedAt: result.completedAt,
      test: {
        id: result.test.id,
        title: result.test.title,
        category: result.test.category
      }
    }))
  } catch (error) {
    console.error('Error fetching user test results:', error)
    return []
  }
}

export async function closePool() {
  await prisma.$disconnect()
}

export { prisma }
