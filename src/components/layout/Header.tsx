'use client'

import { useState } from 'react'
import { useSupabase } from '@/components/providers/supabase-provider'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signOut } = useSupabase()

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
            <Link href="/tests" className="text-gray-600 hover:text-blue-600 transition-colors">
              Testes
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
            {user ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/dashboard">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white hover:border-black">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
                  onClick={signOut}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" className="ml-4 border-black text-black hover:bg-black hover:text-white hover:border-black">
                  <Link href="/auth/signin">Entrar</Link>
                </Button>
                <Button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white">
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
            <Link href="#about" className="block py-2 text-gray-600 hover:text-blue-600">
              Sobre
            </Link>
            <Link href="/blog" className="block py-2 text-gray-600 hover:text-blue-600">
              Blog
            </Link>
            <Link href="#resources" className="block py-2 text-gray-600 hover:text-blue-600">
              Recursos
            </Link>
              {user ? (
              <div className="space-y-2">
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white hover:border-black">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
                  onClick={signOut}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1 border-black text-black hover:bg-black hover:text-white hover:border-black">
                  <Link href="/auth/signin">Entrar</Link>
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white">
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