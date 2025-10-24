'use client'

import { useState } from 'react'
import { X, Users, Crown, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  roomName: string
  roomType: 'PUBLIC' | 'PREMIUM'
  onEnterAsGuest: () => void
  onLogin: () => void
  onRegister: () => void
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  roomName, 
  roomType,
  onEnterAsGuest,
  onLogin,
  onRegister
}: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'guest' | 'login' | 'register'>('guest')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Entrar na Sala
              </h2>
              <p className="text-sm text-gray-600 flex items-center">
                {roomName}
                {roomType === 'PREMIUM' && (
                  <Crown className="w-4 h-4 text-yellow-500 ml-2" />
                )}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('guest')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'guest'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Convidado
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'register'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cadastrar
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Guest Tab */}
          {activeTab === 'guest' && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Entrar como Convidado
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Acesse a sala sem criar uma conta. Você poderá participar das conversas, 
                  mas algumas funcionalidades serão limitadas.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 mb-1">✓ Disponível para convidados:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Ler mensagens da sala</li>
                    <li>• Enviar mensagens</li>
                    <li>• Participar ativamente</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-700 mb-1">⚠ Limitações:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sem histórico de conversas</li>
                    <li>• Sem personalização de perfil</li>
                    <li>• Sem acesso a salas premium</li>
                  </ul>
                </div>
              </div>

              <Button 
                onClick={() => {
                  onEnterAsGuest()
                  onClose()
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Entrar como Convidado
              </Button>
            </div>
          )}

          {/* Login Tab */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Bem-vindo de volta!
                </h3>
                <p className="text-sm text-gray-600">
                  Entre na sua conta para acessar todas as funcionalidades
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
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
                  type="button"
                  onClick={() => {
                    onLogin()
                    onClose()
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Entrar na Conta
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                </div>
              </div>

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
            </div>
          )}

          {/* Register Tab */}
          {activeTab === 'register' && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Criar nova conta
                </h3>
                <p className="text-sm text-gray-600">
                  Junte-se à comunidade e acesse todas as funcionalidades
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
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

                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                  <span className="ml-2 text-sm text-gray-600">
                    Concordo com os{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                      Termos de Uso
                    </a>{' '}
                    e{' '}
                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                      Política de Privacidade
                    </a>
                  </span>
                </div>

                <Button 
                  type="button"
                  onClick={() => {
                    onRegister()
                    onClose()
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Criar Conta
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou cadastre-se com</span>
                </div>
              </div>

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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="text-center text-sm text-gray-600">
            {activeTab === 'guest' ? (
              <p>
                Quer mais funcionalidades?{' '}
                <button 
                  onClick={() => setActiveTab('register')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Crie uma conta gratuita
                </button>
              </p>
            ) : activeTab === 'login' ? (
              <p>
                Não tem uma conta?{' '}
                <button 
                  onClick={() => setActiveTab('register')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{' '}
                <button 
                  onClick={() => setActiveTab('login')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Entrar
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}