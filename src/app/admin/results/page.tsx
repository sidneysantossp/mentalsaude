'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Search, 
  Filter,
  ArrowLeft,
  Calendar,
  Users,
  FileText,
  Brain,
  Heart,
  Flame,
  Activity,
  Eye,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface TestResult {
  id: string
  totalScore: number
  category: string
  interpretation: string
  completedAt: string
  test: {
    id: string
    title: string
    category: string
  }
  user: {
    id: string
    name: string | null
    email: string
  }
}

interface AnalyticsData {
  totalResults: number
  averageScore: number
  resultsByCategory: Record<string, number>
  resultsBySeverity: Record<string, number>
  resultsByMonth: Record<string, number>
  topTests: Array<{
    testId: string
    testTitle: string
    count: number
    averageScore: number
  }>
}

export default function AdminResults() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [results, setResults] = useState<TestResult[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  useEffect(() => {
    // Check if user is admin
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    fetchData()
  }, [status, session, router])

  const fetchData = async () => {
    try {
      // Fetch results
      const resultsResponse = await fetch('/api/admin/results')
      if (resultsResponse.ok) {
        const resultsData = await resultsResponse.json()
        setResults(resultsData.results)
      }

      // Fetch analytics
      const analyticsResponse = await fetch('/api/admin/results/analytics')
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        setAnalytics(analyticsData.analytics)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredResults = results.filter(result => {
    const matchesSearch = result.test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || result.test.category === filterCategory
    const matchesSeverity = filterSeverity === 'all' || result.category.toLowerCase() === filterSeverity.toLowerCase()
    
    return matchesSearch && matchesCategory && matchesSeverity
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return Brain
      case 'ANXIETY': return Heart
      case 'ADHD': return Activity
      case 'STRESS': return Flame
      default: return FileText
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return 'Depressão'
      case 'ANXIETY': return 'Ansiedade'
      case 'ADHD': return 'TDAH'
      case 'STRESS': return 'Estresse'
      case 'OCD': return 'Compulsão'
      case 'BURNOUT': return 'Burnout'
      default: return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return 'bg-blue-100 text-blue-800'
      case 'ANXIETY': return 'bg-green-100 text-green-800'
      case 'ADHD': return 'bg-orange-100 text-orange-800'
      case 'STRESS': return 'bg-red-100 text-red-800'
      case 'OCD': return 'bg-purple-100 text-purple-800'
      case 'BURNOUT': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'minimal': return 'bg-green-100 text-green-800'
      case 'mild': return 'bg-blue-100 text-blue-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'moderately severe': return 'bg-orange-100 text-orange-800'
      case 'severe': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number, maxScore: number = 27) => {
    const percentage = (score / maxScore) * 100
    if (percentage <= 25) return 'text-green-600'
    if (percentage <= 50) return 'text-blue-600'
    if (percentage <= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Analytics e Relatórios</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/admin" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Dashboard
            </Link>
            <Link href="/admin/users" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Usuários
            </Link>
            <Link href="/admin/tests" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Testes
            </Link>
            <Link href="/admin/questions" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Questões
            </Link>
            <Link href="/admin/results" className="py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
              Resultados
            </Link>
            <Link href="/admin/settings" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Configurações
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Resultados</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalResults}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pontuação Média</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.averageScore.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Usuários Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {[...new Set(results.map(r => r.user.id))].length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Casos Críticos</p>
                    <p className="text-2xl font-bold text-red-600">
                      {results.filter(r => r.category.toLowerCase().includes('severe')).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Category Distribution */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Resultados por Categoria</CardTitle>
                <CardDescription>Distribuição dos resultados por tipo de teste</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.resultsByCategory).map(([category, count]) => {
                    const IconComponent = getCategoryIcon(category)
                    const percentage = (count / analytics.totalResults) * 100
                    return (
                      <div key={category} className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{getCategoryLabel(category)}</span>
                            <span className="text-sm text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Resultados por Severidade</CardTitle>
                <CardDescription>Distribuição dos resultados por nível de severidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.resultsBySeverity).map(([severity, count]) => (
                    <div key={severity} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {severity.toLowerCase().includes('severe') && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        {severity.toLowerCase().includes('moderate') && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                        {severity.toLowerCase().includes('mild') && <CheckCircle className="h-4 w-4 text-blue-600" />}
                        {severity.toLowerCase().includes('minimal') && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium capitalize">{severity}</span>
                          <span className="text-sm text-gray-500">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              severity.toLowerCase().includes('severe') ? 'bg-red-600' :
                              severity.toLowerCase().includes('moderate') ? 'bg-yellow-600' :
                              severity.toLowerCase().includes('mild') ? 'bg-blue-600' :
                              'bg-green-600'
                            }`}
                            style={{ width: `${(count / analytics.totalResults) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Top Tests */}
        {analytics && analytics.topTests.length > 0 && (
          <Card className="shadow-sm mb-8">
            <CardHeader>
              <CardTitle>Testes Mais Populares</CardTitle>
              <CardDescription>Testes com maior número de realizações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topTests.map((test, index) => (
                  <div key={test.testId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{test.testTitle}</h4>
                        <p className="text-sm text-gray-500">{test.count} realizações</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Média: {test.averageScore.toFixed(1)}</p>
                      <p className="text-xs text-gray-500">pontos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por teste, usuário ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todas categorias</option>
                  <option value="DEPRESSION">Depressão</option>
                  <option value="ANXIETY">Ansiedade</option>
                  <option value="ADHD">TDAH</option>
                  <option value="STRESS">Estresse</option>
                </select>
                
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todas severidades</option>
                  <option value="minimal">Mínimo</option>
                  <option value="mild">Leve</option>
                  <option value="moderate">Moderado</option>
                  <option value="severe">Grave</option>
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todo período</option>
                  <option value="7days">Últimos 7 dias</option>
                  <option value="30days">Últimos 30 dias</option>
                  <option value="90days">Últimos 90 dias</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Resultados Detalhados</CardTitle>
            <CardDescription>
              {filteredResults.length} resultado(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredResults.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-600">
                  {searchTerm || filterCategory !== 'all' || filterSeverity !== 'all' 
                    ? 'Tente ajustar os filtros de busca' 
                    : 'Nenhum resultado disponível no momento'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Data</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Usuário</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Teste</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Pontuação</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Severidade</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((result) => (
                      <tr key={result.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-900">
                            {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(result.completedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {result.user.name || 'Usuário anônimo'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {result.user.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Badge className={getCategoryColor(result.test.category)}>
                              {getCategoryLabel(result.test.category)}
                            </Badge>
                            <span className="text-sm text-gray-900">{result.test.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-semibold ${getScoreColor(result.totalScore)}`}>
                            {result.totalScore}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getSeverityColor(result.category)}>
                            {result.category}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Link href={`/results/${result.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}