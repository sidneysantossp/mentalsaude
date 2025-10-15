'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { useAuth } from '@/components/providers/mysql-auth-provider'
import { 
  Brain, 
  Heart, 
  Flame, 
  Activity, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Plus,
  Filter,
  Download,
  Eye,
  BarChart3,
  Clock
} from 'lucide-react'

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

export default function ResultsPage() {
  const { user } = useAuth()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchTestResults()
  }, [])

  const fetchTestResults = async () => {
    try {
      const response = await fetch('/api/results')
      const data = await response.json()
      if (data.success) {
        setTestResults(data.results)
      }
    } catch (error) {
      console.error('Error fetching test results:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return Brain
      case 'ANXIETY': return Heart
      case 'ADHD': return Activity
      case 'STRESS': return Flame
      default: return Brain
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return 'Depressão'
      case 'ANXIETY': return 'Ansiedade'
      case 'ADHD': return 'TDAH'
      case 'STRESS': return 'Estresse'
      case 'OCD': return 'Compulsão'
      default: return category
    }
  }

  const filteredResults = filter === 'all' 
    ? testResults 
    : testResults.filter(result => result.test.category === filter)

  const categories = [...new Set(testResults.map(r => r.test.category))]

  const getStats = () => {
    if (testResults.length === 0) return { total: 0, average: 0, lastTest: null }
    
    const total = testResults.length
    const average = Math.round(testResults.reduce((sum, result) => sum + result.totalScore, 0) / total)
    const lastTest = testResults[0]?.completedAt || null
    
    return { total, average, lastTest }
  }

  const stats = getStats()

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando resultados...</p>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Meus Resultados
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Histórico completo das suas avaliações psicológicas
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
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total de Testes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pontuação Média</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.average}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Último Teste</p>
                    <p className="text-lg font-bold text-gray-900">
                      {stats.lastTest ? new Date(stats.lastTest).toLocaleDateString('pt-BR') : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          {testResults.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    Todos ({testResults.length})
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={filter === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(category)}
                    >
                      {getCategoryLabel(category)} ({testResults.filter(r => r.test.category === category).length})
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {testResults.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="p-12 text-center">
                <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Você ainda não realizou nenhum teste psicológico.
                </p>
                <Link href="/tests">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Fazer seu primeiro teste
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredResults.map((result) => {
                const IconComponent = getCategoryIcon(result.test.category)
                return (
                  <Card key={result.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-medium text-gray-900">
                              {result.test.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {getCategoryLabel(result.test.category)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(result.completedAt).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(result.completedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {result.interpretation}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4 ml-6">
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getScoreColor(result.totalScore, 27)}`}>
                              {result.totalScore}
                            </p>
                            <p className="text-xs text-gray-500">/27 pontos</p>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Badge className={`${getStatusColor(result.category)}`}>
                              {result.category}
                            </Badge>
                            
                            <div className="flex space-x-1">
                              <Link href={`/results/${result.id}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </Link>
                              <Button variant="outline" size="sm">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Quick Actions */}
          {testResults.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-4">
                <Link href="/tests">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Fazer Novo Teste
                  </Button>
                </Link>
                <Button variant="outline" disabled>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Análise Comparativa
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}