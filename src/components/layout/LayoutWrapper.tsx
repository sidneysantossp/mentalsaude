'use client'

import { ReactNode } from 'react'
import Header from './Header'
<<<<<<< HEAD
=======
import Footer from './Footer'
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

interface LayoutWrapperProps {
  children: ReactNode
  showHeader?: boolean
<<<<<<< HEAD
=======
  showFooter?: boolean
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
  className?: string
}

export default function LayoutWrapper({ 
  children, 
<<<<<<< HEAD
  showHeader = true,
  className = ""
}: LayoutWrapperProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 ${className}`}>
      {showHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
=======
  showHeader = true, 
  showFooter = true,
  className = ""
}: LayoutWrapperProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col ${className}`}>
      {showHeader && <Header />}
      <main className="flex-grow relative">
        {children}
      </main>
      {showFooter && (
        <div className="flex-shrink-0">
          <Footer />
        </div>
      )}
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
    </div>
  )
}