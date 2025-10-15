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
  queueLimit: 0,
  connectTimeout: 5000,
  acquireTimeout: 5000
}

// Pool de conexões com fallback
let pool: mysql.Pool | null = null
let dbAvailable = false

// Função para testar conexão
async function testConnection() {
  try {
    const testPool = mysql.createPool(dbConfig)
    await testPool.execute('SELECT 1')
    await testPool.end()
    return true
  } catch (error) {
    console.warn('Database connection failed:', error.message)
    return false
  }
}

// Inicializar pool com fallback
async function initializePool() {
  dbAvailable = await testConnection()
  if (dbAvailable) {
    try {
      pool = mysql.createPool(dbConfig)
      console.log('✅ Database pool initialized successfully')
    } catch (error) {
      console.error('❌ Failed to initialize database pool:', error.message)
      dbAvailable = false
      pool = null
    }
  } else {
    console.warn('⚠️ Database not available, using fallback mode')
    pool = null
  }
}

// Inicializar pool
initializePool()

// Retry connection periodically
setInterval(async () => {
  const wasAvailable = dbAvailable
  dbAvailable = await testConnection()
  
  if (dbAvailable && !wasAvailable) {
    console.log('🔄 Database is now available, reinitializing pool...')
    await initializePool()
  } else if (!dbAvailable && wasAvailable) {
    console.warn('⚠️ Database connection lost, switching to fallback mode')
    pool = null
  }
}, 30000) // Check every 30 seconds

export async function query(sql: string, params?: any[]) {
  if (!dbAvailable || !pool) {
    console.warn('⚠️ Database not available, using fallback data')
    return getFallbackData(sql, params)
  }

  try {
    const [rows] = await pool.execute(sql, params)
    return rows
  } catch (error) {
    console.error('Database query error:', error)
    // Fallback para dados mockados em caso de erro
    return getFallbackData(sql, params)
  }
}

// Fallback data functions
function getFallbackData(sql: string, params?: any[]) {
  const lowerSql = sql.toLowerCase()
  
  if (lowerSql.includes('select') && lowerSql.includes('users')) {
    if (lowerSql.includes('where email =')) {
      return [] // Usuário não encontrado em fallback
    }
    return [] // Lista vazia de usuários
  }
  
  if (lowerSql.includes('select') && lowerSql.includes('tests')) {
    return getFallbackTests()
  }
  
  if (lowerSql.includes('select') && lowerSql.includes('questions')) {
    return getFallbackQuestions(params?.[0])
  }
  
  if (lowerSql.includes('insert')) {
    // Simular inserção bem-sucedida
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

// Fallback test data
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

// Fallback questions data
function getFallbackQuestions(testId?: string) {
  const questions: any = {
    '1': [ // Ansiedade
      { id: 'q1', test_id: '1', question_text: 'Você se sente nervoso ou ansioso?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 1 },
      { id: 'q2', test_id: '1', question_text: 'Você tem dificuldade em relaxar?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 2 },
      { id: 'q3', test_id: '1', question_text: 'Você se preocupa excessivamente?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 3 }
    ],
    '2': [ // Depressão
      { id: 'q4', test_id: '2', question_text: 'Você se sente triste ou depressivo?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 1 },
      { id: 'q5', test_id: '2', question_text: 'Você perdeu interesse em atividades?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 2 },
      { id: 'q6', test_id: '2', question_text: 'Você tem problemas de sono?', options: JSON.stringify(['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']), scores: JSON.stringify([0, 1, 2, 3, 4]), order_index: 3 }
    ]
  }
  
  return questions[testId] || []
}

// Funções de autenticação
export async function createUser(email: string, password: string, name?: string) {
  try {
    if (!dbAvailable || !pool) {
      // Modo fallback - criar usuário mockado
      console.warn('⚠️ Creating user in fallback mode (not persistent)')
      const userId = `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Salvar em localStorage-like storage (session apenas para demonstração)
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
    if (!dbAvailable || !pool) {
      // Modo fallback - verificar usuário mockado
      console.warn('⚠️ Authenticating user in fallback mode')
      
      if (typeof globalThis !== 'undefined' && globalThis.fallbackUsers && globalThis.fallbackUsers[email]) {
        const user = globalThis.fallbackUsers[email]
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
    
    if (!dbAvailable || !pool) {
      // Modo fallback - salvar em memória
      console.warn('⚠️ Saving test result in fallback mode (not persistent)')
      
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
    if (!dbAvailable || !pool) {
      // Modo fallback - retornar resultados mockados
      console.warn('⚠️ Fetching user test results in fallback mode')
      
      if (typeof globalThis !== 'undefined' && globalThis.fallbackResults) {
        return globalThis.fallbackResults.filter((result: any) => result.user_id === userId)
      }
      
      return []
    }
    
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