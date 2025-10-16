'use client'

import { SessionProvider } from 'next-auth/react'

export function ChatProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}