/**
 * Authentication utilities
 */

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'fallback_secret_key_change_in_production'

/**
 * Generate JWT token
 */
export function generateToken(payload: object, expiresIn: string = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Token inválido')
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}
