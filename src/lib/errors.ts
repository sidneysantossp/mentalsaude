/**
 * Error handling utilities for consistent API responses
 */

export interface ApiError {
  error: string
  code?: string
  details?: any
}

export interface ApiSuccess<T = any> {
  success: true
  data: T
  message?: string
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number = 500,
  code?: string,
  details?: any
): { error: ApiError; status: number } {
  console.error(`API Error [${status}]:`, message, details || '')

  return {
    error: {
      error: message,
      code,
      details
    },
    status
  }
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T = any>(
  data: T,
  message?: string
): ApiSuccess<T> {
  return {
    success: true,
    data,
    message
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: any): { error: ApiError; status: number } {
  console.error('API Error:', error)

  // Database errors
  if (error?.code) {
    switch (error.code) {
      case 'PGRST116': // Row not found
        return createErrorResponse('Recurso não encontrado', 404, 'NOT_FOUND')
      case '23505': // Unique constraint violation
        return createErrorResponse('Dados já existem', 409, 'DUPLICATE')
      case '23503': // Foreign key constraint violation
        return createErrorResponse('Referência inválida', 400, 'INVALID_REFERENCE')
      default:
        return createErrorResponse('Erro no banco de dados', 500, 'DATABASE_ERROR', error.message)
    }
  }

  // JWT/Auth errors
  if (error?.name === 'JsonWebTokenError') {
    return createErrorResponse('Token inválido', 401, 'INVALID_TOKEN')
  }

  if (error?.name === 'TokenExpiredError') {
    return createErrorResponse('Token expirado', 401, 'TOKEN_EXPIRED')
  }

  // Custom errors
  if (error?.message) {
    if (error.message.includes('não existe')) {
      return createErrorResponse(error.message, 404, 'NOT_FOUND')
    }
    if (error.message.includes('inválido') || error.message.includes('incorreto')) {
      return createErrorResponse(error.message, 400, 'VALIDATION_ERROR')
    }
    if (error.message.includes('autorização') || error.message.includes('permissão')) {
      return createErrorResponse(error.message, 403, 'FORBIDDEN')
    }

    return createErrorResponse(error.message, 400, 'VALIDATION_ERROR')
  }

  // Generic error
  return createErrorResponse('Erro interno do servidor', 500, 'INTERNAL_ERROR')
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(data: any, fields: string[]): string | null {
  for (const field of fields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      return `Campo '${field}' é obrigatório`
    }
  }
  return null
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
