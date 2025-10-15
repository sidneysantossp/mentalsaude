import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production'

// Configuração do MySQL
const dbConfig = {
  host: '203.161.38.188',
  port: 3306,
  user: 'anticosccb_mentalsaude',
  password: 'KmSs147258!',
  database: 'anticosccb_mentalsaude',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

// Pool de conexões
const pool = mysql.createPool(dbConfig)

export async function query(sql: string, params?: any[]) {
  try {
    const [rows] = await pool.execute(sql, params)
    return rows
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Funções de autenticação
export async function createUser(email: string, password: string, name?: string) {
  try {
    // Verificar se usuário já existe
    const existingUser = await query('SELECT id FROM users WHERE email = ?', [email])
    if (Array.isArray(existingUser) && existingUser.length > 0) {
      throw new Error('Usuário já existe')
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Inserir usuário
    await query(
      'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
      [userId, email, hashedPassword, name || null]
    )

    return { id: userId, email, name }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const users = await query('SELECT * FROM users WHERE email = ?', [email]) as any[]
    
    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('Email ou senha incorretos')
    }

    const user = users[0]
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      throw new Error('Email ou senha incorretos')
    }

    // Gerar token JWT
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

// Funções de teste
export async function getTests() {
  try {
    const tests = await query('SELECT * FROM tests ORDER BY created_at ASC') as any[]
    return tests
  } catch (error) {
    console.error('Error fetching tests:', error)
    throw error
  }
}

export async function getTestById(id: string) {
  try {
    const tests = await query('SELECT * FROM tests WHERE id = ?', [id]) as any[]
    return tests[0] || null
  } catch (error) {
    console.error('Error fetching test:', error)
    throw error
  }
}

export async function getQuestionsByTestId(testId: string) {
  try {
    const questions = await query(
      'SELECT * FROM questions WHERE test_id = ? ORDER BY order_index ASC',
      [testId]
    ) as any[]
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
    const resultId = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Inserir resultado
    await query(
      'INSERT INTO test_results (id, user_id, test_id, total_score, category, interpretation, recommendations) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [resultId, data.userId, data.testId, data.totalScore, data.category, data.interpretation, data.recommendations || null]
    )

    // Inserir respostas
    for (const answer of data.answers) {
      const answerId = `answer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      await query(
        'INSERT INTO answers (id, question_id, test_result_id, value, score) VALUES (?, ?, ?, ?, ?)',
        [answerId, answer.questionId, resultId, answer.value, answer.score]
      )
    }

    return resultId
  } catch (error) {
    console.error('Error saving test result:', error)
    throw error
  }
}

export async function getUserTestResults(userId: string) {
  try {
    const results = await query(`
      SELECT tr.*, t.title, t.category as test_category 
      FROM test_results tr 
      JOIN tests t ON tr.test_id = t.id 
      WHERE tr.user_id = ? 
      ORDER BY tr.completed_at DESC
    `, [userId]) as any[]
    
    return results
  } catch (error) {
    console.error('Error fetching user test results:', error)
    throw error
  }
}

export async function closePool() {
  await pool.end()
}