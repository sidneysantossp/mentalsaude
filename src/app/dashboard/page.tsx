'use client'

import { useAuth } from '@/components/providers/mysql-auth-provider'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { Brain, Heart, Flame, Activity, Plus, FileText, TrendingUp, Users, Calendar, BarChart3, Clock, Target } from 'lucide-react'
import { useEffect, useState } from 'react'

interface TestResult {
  id: string
  totalScore: number
  category: string
  interpretation: string
  recommendations: string
  completedAt: string
  test: {
    id: string
    title: string
    category: string
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestResults()
    
    // Add a safety timeout to ensure loading is turned off
    const safetyTimeout = setTimeout(() => {
      setLoading(false)
    }, 15000) // 15 second safety timeout
    
    return () => clearTimeout(safetyTimeout)
  }, [])

  const fetchTestResults = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const headers: HeadersInit = {}
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch('/api/results', {
        headers,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (data.success) {
        setTestResults(data.results || [])
      } else {
        console.error('API returned error:', data.error)
      }
    } catch (error) {
      console.error('Error fetching test results:', error)
      if (error.name === 'AbortError') {
        console.error('Request timed out')
      }
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats from real data
  const userStats = {
    totalTests: testResults.length,
    lastTestDate: testResults.length > 0 
      ? new Date(testResults[0].completedAt).toLocaleDateString('pt-BR')
      : 'Nenhum teste',
    averageScore: testResults.length > 0
      ? Math.round(testResults.reduce((sum, result) => sum + result.totalScore, 0) / testResults.length)
      : 0,
    completedCategories: [...new Set(testResults.map(r => r.test.category))].length
  }

  const recentTests = testResults.slice(0, 5)

  const categories = [
    { name: 'Depressão', icon: Brain, count: testResults.filter(r => r.test.category === 'DEPRESSION').length, color: 'text-blue-600' },
    { name: 'Ansiedade', icon: Heart, count: testResults.filter(r => r.test.category === 'ANXIETY').length, color: 'text-green-600' },
    { name: 'TDAH', icon: Activity, count: testResults.filter(r => r.test.category === 'ADHD').length, color: 'text-orange-600' },
    { name: 'Estresse', icon: Flame, count: testResults.filter(r => r.test.category === 'STRESS').length, color: 'text-red-600' }
  ]

  const getStatusColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'minimal': return 'bg-green-100 text-green-800'
      case 'mild': return 'bg-blue-100 text-blue-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'moderately severe': return 'bg-orange-100 text-orange-800'
      case 'severe': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage <= 25) return 'text-green-600'
    if (percentage <= 50) return 'text-blue-600'
    if (percentage <= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user ? `Bem-vindo(a), ${user.name || 'Usuário'}!` : 'Seu Dashboard'}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {user 
                    ? 'Acompanhe seu progresso e resultados'
                    : 'Faça login para salvar seu progresso'
                  }
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link href="/tests">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Teste
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total de Testes
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {userStats.totalTests}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Último Teste
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {userStats.lastTestDate}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Média Geral
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {userStats.averageScore}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Categorias
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {userStats.completedCategories}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Tests */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Testes Recentes
                    </h3>
                    {testResults.length > 0 && (
                      <Link href="/results">
                        <Button variant="outline" size="sm">
                          Ver Todos
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-500 mt-2">Carregando resultados...</p>
                    </div>
                  ) : testResults.length === 0 ? (
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum teste realizado ainda</p>
                      <Link href="/tests" className="mt-4 inline-block">
                        <Button>Fazer seu primeiro teste</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentTests.map((test) => (
                        <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">
                                {test.test.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {new Date(test.completedAt).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className={`text-sm font-medium ${getScoreColor(test.totalScore, 27)}`}>
                                  {test.totalScore}/27
                                </p>
                                <p className="text-xs text-gray-500">
                                  {Math.round((test.totalScore / 27) * 100)}%
                                </p>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(test.category)}`}>
                                {test.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {testResults.length > 0 && (
                    <div className="mt-6">
                      <Link href="/tests">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Fazer Novo Teste
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Categories and Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Categorias Avaliadas
                  </h3>
                  {categories.filter(c => c.count > 0).length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nenhuma categoria avaliada ainda
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {categories.map((category, index) => (
                        category.count > 0 && (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <category.icon className={`h-5 w-5 ${category.color} mr-3`} />
                              <span className="text-sm font-medium text-gray-900">
                                {category.name}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {category.count} teste{category.count > 1 ? 's' : ''}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Ações Rápidas
                  </h3>
                  <div className="space-y-3">
                    <Link href="/tests">
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" />
                        Fazer Novo Teste
                      </Button>
                    </Link>
                    <Link href="/results">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Histórico
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start" disabled>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Progresso
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Dica de Saúde Mental
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Regularmente fazer autoavaliações ajuda a monitorar sua saúde mental e identificar quando procurar apoio profissional.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}