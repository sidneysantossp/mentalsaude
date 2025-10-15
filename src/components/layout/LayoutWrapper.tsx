'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutWrapperProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
  className?: string
}

export default function LayoutWrapper({ 
  children, 
  showHeader = true, 
  showFooter = true,
  className = ""
}: LayoutWrapperProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 ${className}`}>
      {showHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}