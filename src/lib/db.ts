/**
 * Database Module - Unified Supabase Client
 *
 * Este é o único arquivo de database do projeto.
 * Todas as operações de banco de dados devem usar este módulo.
 */

import { supabase } from './supabase'
import { Database } from '@/types/supabase'
import bcrypt from 'bcryptjs'
import { cache, withCache, CACHE_KEYS, invalidateCache } from './cache'
import { generateToken, verifyToken } from './utils/auth'

// Export Supabase client as the primary database interface
export const db = supabase

// Types
export type Test = Database['public']['Tables']['tests']['Row']
export type Question = Database['public']['Tables']['questions']['Row']
export type Answer = Database['public']['Tables']['answers']['Row']
export type TestResult = Database['public']['Tables']['test_results']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type Professional = Database['public']['Tables']['professionals']['Row']

export type TestInsert = Database['public']['Tables']['tests']['Insert']
export type TestUpdate = Database['public']['Tables']['tests']['Update']
export type QuestionInsert = Database['public']['Tables']['questions']['Insert']
export type QuestionUpdate = Database['public']['Tables']['questions']['Update']
export type AnswerInsert = Database['public']['Tables']['answers']['Insert']
export type TestResultInsert = Database['public']['Tables']['test_results']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert']
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update']

// ============ TESTS ============

/**
 * Busca todos os testes ativos (com cache)
 */
export async function getTests(): Promise<Test[]> {
  return withCache(CACHE_KEYS.TESTS, async () => {
    const { data, error } = await supabase
      .from('tests')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching tests:', error)
      throw error
    }

    return data || []
  })
}

/**
 * Busca um teste por ID
 */
export async function getTestById(id: string): Promise<Test | null> {
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching test:', error)
    return null
  }

  return data
}

/**
 * Busca um teste por slug
 */
export async function getTestBySlug(slug: string): Promise<Test | null> {
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching test by slug:', error)
    return null
  }

  return data
}

/**
 * Cria um novo teste
 */
export async function createTest(test: TestInsert): Promise<Test> {
  const { data, error } = await supabase
    .from('tests')
    .insert(test)
    .select()
    .single()

  if (error) {
    console.error('Error creating test:', error)
    throw error
  }

  return data
}

/**
 * Atualiza um teste
 */
export async function updateTest(id: string, test: TestUpdate): Promise<Test> {
  const { data, error } = await supabase
    .from('tests')
    .update(test)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating test:', error)
    throw error
  }

  return data
}

/**
 * Deleta um teste
 */
export async function deleteTest(id: string): Promise<void> {
  const { error } = await supabase
    .from('tests')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting test:', error)
    throw error
  }
}

// ============ QUESTIONS ============

/**
 * Busca questões de um teste
 */
export async function getQuestionsByTestId(testId: string): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('test_id', testId)
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching questions:', error)
    throw error
  }

  return data || []
}

/**
 * Cria uma questão
 */
export async function createQuestion(question: QuestionInsert): Promise<Question> {
  const { data, error } = await supabase
    .from('questions')
    .insert(question)
    .select()
    .single()

  if (error) {
    console.error('Error creating question:', error)
    throw error
  }

  return data
}

/**
 * Atualiza uma questão
 */
export async function updateQuestion(id: string, question: QuestionUpdate): Promise<Question> {
  const { data, error } = await supabase
    .from('questions')
    .update(question)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating question:', error)
    throw error
  }

  return data
}

/**
 * Deleta uma questão
 */
export async function deleteQuestion(id: string): Promise<void> {
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting question:', error)
    throw error
  }
}

/**
 * Deleta todas as questões de um teste
 */
export async function deleteQuestionsByTestId(testId: string): Promise<void> {
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('test_id', testId)

  if (error) {
    console.error('Error deleting questions by test id:', error)
    throw error
  }
}

// ============ TEST RESULTS ============

/**
 * Salva resultado de um teste
 */
export async function saveTestResult(
  result: TestResultInsert,
  answers: AnswerInsert[]
): Promise<TestResult> {
  // Insert test result
  const { data: resultData, error: resultError } = await supabase
    .from('test_results')
    .insert(result)
    .select()
    .single()

  if (resultError) {
    console.error('Error saving test result:', resultError)
    throw resultError
  }

  // Insert answers with test_result_id
  const answersWithResultId = answers.map(answer => ({
    ...answer,
    test_result_id: resultData.id
  }))

  const { error: answersError } = await supabase
    .from('answers')
    .insert(answersWithResultId)

  if (answersError) {
    console.error('Error saving answers:', answersError)
    throw answersError
  }

  return resultData
}

/**
 * Busca resultados de teste de um usuário
 */
export async function getUserTestResults(userId: string): Promise<(TestResult & { test: Test })[]> {
  const { data, error } = await supabase
    .from('test_results')
    .select(`
      *,
      test:test_id (
        id,
        title,
        category,
        description
      )
    `)
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })

  if (error) {
    console.error('Error fetching user test results:', error)
    throw error
  }

  return data as (TestResult & { test: Test })[] || []
}

/**
 * Busca um resultado de teste específico
 */
export async function getTestResultById(id: string): Promise<(TestResult & { test: Test; answers: Answer[] }) | null> {
  const { data, error } = await supabase
    .from('test_results')
    .select(`
      *,
      test:test_id (
        id,
        title,
        category,
        description
      ),
      answers (
        id,
        question_id,
        value,
        score,
        question:question_id (
          id,
          text,
          type,
          options
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching test result:', error)
    return null
  }

  return data as (TestResult & { test: Test; answers: Answer[] })
}

// ============ PROFILES ============

/**
 * Busca perfil por ID
 */
export async function getProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

/**
 * Atualiza perfil
 */
export async function updateProfile(id: string, profile: ProfileUpdate): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    throw error
  }

  return data
}

/**
 * Busca todos os perfis (admin only)
 */
export async function getAllProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching profiles:', error)
    throw error
  }

  return data || []
}

// ============ APPOINTMENTS ============

/**
 * Cria um agendamento
 */
export async function createAppointment(appointment: AppointmentInsert): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single()

  if (error) {
    console.error('Error creating appointment:', error)
    throw error
  }

  return data
}

/**
 * Atualiza um agendamento
 */
export async function updateAppointment(id: string, appointment: AppointmentUpdate): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .update(appointment)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating appointment:', error)
    throw error
  }

  return data
}

/**
 * Busca agendamentos de um usuário
 */
export async function getUserAppointments(userId: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('scheduled_for', { ascending: true })

  if (error) {
    console.error('Error fetching user appointments:', error)
    throw error
  }

  return data || []
}

// ============ PROFESSIONALS ============

/**
 * Busca todos os profissionais ativos
 */
export async function getActiveProfessionals(): Promise<Professional[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching professionals:', error)
    throw error
  }

  return data || []
}

// ============ UTILITY FUNCTIONS ============

/**
 * Verifica conexão com o banco de dados
 */
export async function checkConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('tests').select('id').limit(1)
    return !error
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}

/**
 * Formatação de erros consistente
 */
export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

// ============ AUTHENTICATION ============

/**
 * Cria um novo usuário
 */
export async function createUser(email: string, password: string, name?: string) {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      throw new Error('Usuário já existe')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create auth user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || null,
          role: 'USER'
        }
      }
    })

    if (authError) {
      throw authError
    }

    // Create profile record
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email,
          name: name || null,
          role: 'USER',
          password_hash: hashedPassword // Store hashed password for local auth
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
        throw profileError
      }
    }

    return {
      id: authData.user?.id,
      email,
      name
    }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

/**
 * Autentica um usuário
 */
export async function authenticateUser(email: string, password: string) {
  try {
    // Find user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (profileError || !profile) {
      throw new Error('Email ou senha incorretos')
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, profile.password_hash)

    if (!isValidPassword) {
      throw new Error('Email ou senha incorretos')
    }

    // Generate JWT token
    const token = generateToken({
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role
    })

    return {
      user: {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role
      },
      token
    }
  } catch (error) {
    console.error('Error authenticating user:', error)
    throw error
  }
}

/**
 * Verifica token JWT (usando utils/auth)
 */
export { verifyToken } from './utils/auth'

/**
 * Busca usuário por ID
 */
export async function getUserById(id: string) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    return profile
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
