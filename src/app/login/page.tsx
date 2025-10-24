'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Users } from 'lucide-react'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulação de login
    setTimeout(() => {
      setIsLoading(false)
      // Redirecionar para a página de chat após login
      router.push('/chat')
    }, 2000)
  }

  return (
    <LayoutWrapper>
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/chat"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para as Salas
          </Link>
        </div>
      </section>

      {/* Login Form */}
      <section className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Bem-vindo de volta!
                  </h1>
                  <p className="text-gray-600">
                    Entre na sua conta para acessar as salas de bate-papo
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                    </label>
                    <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Esqueceu a senha?
                    </a>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Entrando...
                      </div>
                    ) : (
                      'Entrar na Conta'
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full py-2">
                    <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full py-2">
                    <div className="w-5 h-5 bg-gray-800 rounded mr-2"></div>
                    GitHub
                  </Button>
                </div>

                {/* Register Link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                      Cadastre-se gratuitamente
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </LayoutWrapper>
  )
}