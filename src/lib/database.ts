/**
 * Prisma Database Client
 * 
 * Este arquivo serve como compatibilidade para imports antigos que usam '@/lib/database'
 * O projeto foi migrado para Supabase, mas alguns arquivos ainda fazem referência ao Prisma
 */

import { PrismaClient } from '@prisma/client'
import { authenticateUser, createUser } from './db'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Re-export functions from db.ts for compatibility
export { authenticateUser, createUser } from './db'

// Mock query function for compatibility
export const query = {
  async tests() {
    return prisma.test.findMany()
  }
}
