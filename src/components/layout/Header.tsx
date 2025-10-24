'use client'

import { useState } from 'react'
<<<<<<< HEAD
import { useSession } from 'next-auth/react'
=======
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
<<<<<<< HEAD
  const sessionData = useSession()
  
  // Safe session access
  const session = sessionData?.data || null
  const status = sessionData?.status || 'loading'

  // Handle loading state
  if (status === 'loading') {
    return (
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-yellow-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Mental Saúde</span>
              </Link>
            </div>
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }
=======

  // Temporarily disabled session check for development
  const session = null
  const status = 'unauthenticated'
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Mental Saúde</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
<<<<<<< HEAD
            <div className="relative group">
              <Link href="/testes" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                Testes
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <Link href="/testes/depressao" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Depressão (PHQ-9)
                  </Link>
                  <Link href="/testes/transtorno-ansiedade" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Ansiedade (GAD-7)
                  </Link>
                  <Link href="/testes/tdah" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    TDAH (ASRS)
                  </Link>
                  <Link href="/testes/toc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    TOC (Y-BOCS)
                  </Link>
                  <hr className="my-2" />
                  <Link href="/testes" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 rounded font-semibold">
                    Ver todas as 12 categorias →
                  </Link>
                </div>
              </div>
            </div>
=======
            <Link href="/testes" className="text-gray-600 hover:text-blue-600 transition-colors">
              Testes
            </Link>
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
            <Link href="/chat" className="text-gray-600 hover:text-blue-600 transition-colors">
              Chat
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sobre
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="#resources" className="text-gray-600 hover:text-blue-600 transition-colors">
              Recursos
            </Link>
            <Link href="/recursos" className="text-gray-600 hover:text-blue-600 transition-colors">
              Materiais
            </Link>
            {session ? (
              <>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="outline" className="ml-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button variant="outline" className="ml-4 border-black text-black hover:bg-black hover:text-white hover:border-black">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="outline" className="ml-4 border-black text-black hover:bg-black hover:text-white hover:border-black">
                  <Link href="/auth/signin">Entrar</Link>
                </Button>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Link href="/auth/signup">Criar Conta</Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/tests" className="block py-2 text-gray-600 hover:text-blue-600">
              Testes
            </Link>
            <Link href="/chat" className="block py-2 text-gray-600 hover:text-blue-600">
              Chat
            </Link>
            <Link href="#about" className="block py-2 text-gray-600 hover:text-blue-600">
              Sobre
            </Link>
            <Link href="/blog" className="block py-2 text-gray-600 hover:text-blue-600">
              Blog
            </Link>
            <Link href="#resources" className="block py-2 text-gray-600 hover:text-blue-600">
              Recursos
            </Link>
            <Link href="/recursos" className="block py-2 text-gray-600 hover:text-blue-600">
              Materiais
            </Link>
            {session ? (
              <>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin" className="block py-2">
                    <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard" className="block py-2">
                  <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white hover:border-black">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1 border-black text-black hover:bg-black hover:text-white hover:border-black">
                  <Link href="/auth/signin">Entrar</Link>
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Link href="/auth/signup">Criar Conta</Link>
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}