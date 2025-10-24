'use client'

import { useSession } from 'next-auth/react'

export function useSafeSession() {
  const session = useSession()
  
  // Return a safe default if session is undefined
  if (!session) {
    return {
      data: null,
      status: 'loading' as const,
      update: async () => null,
    }
  }
  
  return session
}