import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'fallback_secret_key_change_in_production'

// Global PrismaClient instance
let prismaInstance: PrismaClient

// Initialize PrismaClient with proper error handling
function getPrismaClient() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: ['warn', 'error'],
    })
  }
  return prismaInstance
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
    return []
  } finally {
    try {
      await prismaInstance.$disconnect()
    } catch (e) {
      // Ignore disconnect errors
    }
  }
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
    throw error
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

// Export Prisma client for admin APIs that expect it
export const prisma = getPrismaClient()

export async function closePool() {
  try {
    if (prismaInstance) {
      await prismaInstance.$disconnect()
    }
  } catch (error) {
    console.error('Error closing database connection:', error)
  }
}
