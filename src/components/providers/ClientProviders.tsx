'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from './mysql-auth-provider'

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </SessionProvider>
  )
}
