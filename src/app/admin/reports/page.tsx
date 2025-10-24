'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Download, 
  Calendar,
  Filter,
  RefreshCw,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Heart,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Mail,
  Settings,
  Trash2,
  Edit,
  Bell
} from 'lucide-react'
import { SimpleBarChart, SimplePieChart, SimpleLineChart, ChartPlaceholder, MetricCard } from '@/components/ui/chart'

interface ReportData {
  period: string
  totalUsers: number
  totalTests: number
  totalResults: number
  completionRate: number
  averageScore: number
  testDistribution: TestDistribution[]
  userGrowth: UserGrowth[]
  testResults: TestResult[]
  topTests: TopTest[]
}

interface TestDistribution {
  testName: string
  count: number
  percentage: number
  color: string
}

interface UserGrowth {
  date: string
  users: number
  tests: number
}

interface TestResult {
  id: string
  userName: string
  testTitle: string
  score: number
  completedAt: string
  status: 'completed' | 'in_progress' | 'abandoned'
}

interface TopTest {
  title: string
  totalCompletions: number
  averageScore: number
  growth: number
}

export default function ReportsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [dateRange, setDateRange] = useState('30d')
  const [reportType, setReportType] = useState('overview')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [scheduledReports, setScheduledReports] = useState<any[]>([])
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({
    reportType: 'overview',
    frequency: 'weekly',
    recipients: '',
    emailEnabled: true,
    format: 'csv'
  })

  useEffect(() => {
    setInitialized(true)
    // Set default dates
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 30)
    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (!initialized) return

    if (status === 'loading') return

    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchReportData()
    }
  }, [status, session, router, initialized, dateRange, startDate, endDate])

  const fetchReportData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        startDate,
        endDate,
        type: reportType
      })
      
      const response = await fetch(`/api/admin/reports/data?${params}`)
      if (response.ok) {
        const data = await response.json()
        setReportData(data)
      }
    } catch (error) {
      console.error('Error fetching report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    try {
      const params = new URLSearchParams({
        startDate,
        endDate,
        type: reportType,
        format
      })
      
      const response = await fetch(`/api/admin/reports/export?${params}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `relatorio-${reportType}-${new Date().toISOString().split('T')[0]}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting report:', error)
    }
  }

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    const end = new Date()
    const start = new Date()
    
    switch (value) {
      case '7d':
        start.setDate(start.getDate() - 7)
        break
      case '30d':
        start.setDate(start.getDate() - 30)
        break
      case '90d':
        start.setDate(start.getDate() - 90)
        break
      case '1y':
        start.setFullYear(start.getFullYear() - 1)
        break
      default:
        return
    }
    
    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  const fetchScheduledReports = async () => {
    try {
      const response = await fetch('/api/admin/reports/schedule')
      if (response.ok) {
        const data = await response.json()
        setScheduledReports(data.scheduledReports)
      }
    } catch (error) {
      console.error('Error fetching scheduled reports:', error)
    }
  }

  const handleScheduleReport = async () => {
    try {
      const response = await fetch('/api/admin/reports/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...scheduleForm,
          recipients: scheduleForm.recipients.split(',').map(r => r.trim()).filter(r => r)
        })
      })

      if (response.ok) {
        alert('Relatório agendado com sucesso!')
        setShowScheduleForm(false)
        setScheduleForm({
          reportType: 'overview',
          frequency: 'weekly',
          recipients: '',
          emailEnabled: true,
          format: 'csv'
        })
        fetchScheduledReports()
      } else {
        const error = await response.json()
        alert(`Erro ao agendar relatório: ${error.error}`)
      }
    } catch (error) {
      console.error('Error scheduling report:', error)
      alert('Erro ao agendar relatório')
    }
  }

  const handleDeleteScheduledReport = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este relatório agendado?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/reports/schedule?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Relatório excluído com sucesso!')
        fetchScheduledReports()
      } else {
        const error = await response.json()
        alert(`Erro ao excluir relatório: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting scheduled report:', error)
      alert('Erro ao excluir relatório')
    }
  }

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchScheduledReports()
    }
  }, [status, session])

  if (!initialized || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta área.</p>
          <Link href="/auth/signin">
            <Button>Fazer Login</Button>
          </Link>
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
              <h1 className="text-xl font-bold text-gray-900">Relatórios e Análises</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bem-vindo, {session.user?.name}
              </span>
              <Badge variant="secondary">Administrador</Badge>
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
            <Link href="/admin/reports" className="py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
              Relatórios
            </Link>
            <Link href="/admin/settings" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Configurações
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <span>Filtros do Relatório</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="dateRange">Período</Label>
                <Select value={dateRange} onValueChange={handleDateRangeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    <SelectItem value="90d">Últimos 90 dias</SelectItem>
                    <SelectItem value="1y">Último ano</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="startDate">Data Inicial</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="endDate">Data Final</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="reportType">Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Visão Geral</SelectItem>
                    <SelectItem value="users">Análise de Usuários</SelectItem>
                    <SelectItem value="tests">Análise de Testes</SelectItem>
                    <SelectItem value="results">Análise de Resultados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <Button 
                onClick={fetchReportData}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Atualizar</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Exportar:</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport('csv')}
                >
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport('excel')}
                >
                  Excel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport('pdf')}
                >
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados do relatório...</p>
          </div>
        ) : reportData ? (
          <Tabs value={reportType} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="tests">Testes</TabsTrigger>
              <TabsTrigger value="results">Resultados</TabsTrigger>
              <TabsTrigger value="scheduled">Agendados</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total de Usuários"
                  value={reportData.totalUsers}
                  change={{ value: 12, type: 'increase', period: 'este mês' }}
                  icon={<Users className="h-6 w-6" />}
                  color="#3B82F6"
                  description="Crescimento orgânico"
                />

                <MetricCard
                  title="Testes Realizados"
                  value={reportData.totalTests}
                  change={{ value: 8, type: 'increase', period: 'este mês' }}
                  icon={<FileText className="h-6 w-6" />}
                  color="#10B981"
                  description="Engajamento elevado"
                />

                <MetricCard
                  title="Taxa de Conclusão"
                  value={`${reportData.completionRate}%`}
                  change={{ value: 2, type: 'decrease', period: 'este mês' }}
                  icon={<CheckCircle className="h-6 w-6" />}
                  color="#8B5CF6"
                  description="Precisa de atenção"
                />

                <MetricCard
                  title="Pontuação Média"
                  value={reportData.averageScore}
                  change={{ value: 5, type: 'increase', period: 'este mês' }}
                  icon={<TrendingUp className="h-6 w-6" />}
                  color="#F59E0B"
                  description="Desempenho melhorando"
                />
              </div>

              {/* Test Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SimplePieChart
                  data={reportData.testDistribution.map(test => ({
                    value: test.count,
                    color: test.color,
                    tooltip: `${test.count} usuários realizaram este teste (${test.percentage}% do total)`
                  }))}
                  title="Distribuição de Testes"
                  description="Popularidade por categoria"
                  showLegend={true}
                  animated={true}
                />

                <SimpleBarChart
                  data={reportData.topTests.map((test, index) => ({
                    label: test.title,
                    value: test.totalCompletions,
                    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index],
                    tooltip: `Média de ${test.averageScore} pontos com ${test.growth > 0 ? '+' : ''}${test.growth}% de crescimento`
                  }))}
                  title="Testes Mais Populares"
                  description="Número de conclusões"
                  height={250}
                  showValues={true}
                  animated={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Análise de Usuários</span>
                  </CardTitle>
                  <CardDescription>
                    Crescimento e engajamento dos usuários no período selecionado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* User Growth Chart */}
                    <SimpleLineChart
                      data={reportData.userGrowth.map(growth => ({
                        label: new Date(growth.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
                        value: growth.users
                      }))}
                      title="Crescimento de Usuários"
                      description="Evolução de novos usuários no período"
                      height={200}
                    />
                    
                    {/* User Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Novos Usuários</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900 mt-1">+{Math.floor(reportData.totalUsers * 0.2)}</p>
                        <p className="text-xs text-blue-700">20% de crescimento</p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-green-900">Usuários Ativos</span>
                        </div>
                        <p className="text-2xl font-bold text-green-900 mt-1">{Math.floor(reportData.totalUsers * 0.7)}</p>
                        <p className="text-xs text-green-700">70% de ativação</p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <span className="text-sm font-medium text-purple-900">Tempo Médio</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-900 mt-1">15m</p>
                        <p className="text-xs text-purple-700">por sessão</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tests" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Análise de Testes</span>
                  </CardTitle>
                  <CardDescription>
                    Desempenho e popularidade dos testes psicológicos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Test Performance Chart */}
                    <SimpleBarChart
                      data={reportData.testDistribution.map(test => ({
                        value: test.count,
                        color: test.color
                      }))}
                      title="Desempenho dos Testes"
                      description="Número de conclusões por teste"
                      height={200}
                    />
                    
                    {/* Test Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-5 w-5 text-red-600" />
                          <span className="text-sm font-medium text-red-900">Depressão</span>
                        </div>
                        <p className="text-2xl font-bold text-red-900 mt-1">234</p>
                        <p className="text-xs text-red-700">testes realizados</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Brain className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Ansiedade</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900 mt-1">189</p>
                        <p className="text-xs text-blue-700">testes realizados</p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-green-900">TDAH</span>
                        </div>
                        <p className="text-2xl font-bold text-green-900 mt-1">156</p>
                        <p className="text-xs text-green-700">testes realizados</p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-5 w-5 text-purple-600" />
                          <span className="text-sm font-medium text-purple-900">Estresse</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-900 mt-1">145</p>
                        <p className="text-xs text-purple-700">testes realizados</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>Análise de Resultados</span>
                  </CardTitle>
                  <CardDescription>
                    Resultados detalhados e padrões de resposta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Results Chart */}
                    <SimplePieChart
                      data={reportData.testDistribution.map(test => ({
                        value: test.count,
                        color: test.color
                      }))}
                      title="Distribuição de Resultados"
                      description="Proporção de conclusões por tipo de teste"
                      size={150}
                    />
                    
                    {/* Recent Results */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Resultados Recentes</h3>
                      <div className="space-y-3">
                        {reportData.testResults.slice(0, 5).map((result) => (
                          <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {result.status === 'completed' && (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                )}
                                {result.status === 'in_progress' && (
                                  <Clock className="h-5 w-5 text-yellow-600" />
                                )}
                                {result.status === 'abandoned' && (
                                  <AlertTriangle className="h-5 w-5 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{result.userName}</p>
                                <p className="text-xs text-gray-500">{result.testTitle}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{result.score}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5 text-blue-600" />
                        <span>Relatórios Agendados</span>
                      </CardTitle>
                      <CardDescription>
                        Configure relatórios automáticos para serem gerados e enviados por email
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={() => setShowScheduleForm(true)}
                      className="flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Novo Agendamento</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showScheduleForm && (
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                      <h3 className="text-lg font-medium mb-4">Configurar Novo Relatório</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="scheduleReportType">Tipo de Relatório</Label>
                          <Select 
                            value={scheduleForm.reportType} 
                            onValueChange={(value) => setScheduleForm({...scheduleForm, reportType: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="overview">Visão Geral</SelectItem>
                              <SelectItem value="users">Análise de Usuários</SelectItem>
                              <SelectItem value="tests">Análise de Testes</SelectItem>
                              <SelectItem value="results">Análise de Resultados</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="frequency">Frequência</Label>
                          <Select 
                            value={scheduleForm.frequency} 
                            onValueChange={(value) => setScheduleForm({...scheduleForm, frequency: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Diariamente</SelectItem>
                              <SelectItem value="weekly">Semanalmente</SelectItem>
                              <SelectItem value="monthly">Mensalmente</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="format">Formato</Label>
                          <Select 
                            value={scheduleForm.format} 
                            onValueChange={(value) => setScheduleForm({...scheduleForm, format: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="pdf">PDF</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="recipients">Emails (separados por vírgula)</Label>
                          <Input
                            id="recipients"
                            type="email"
                            placeholder="admin@exemplo.com, gestor@exemplo.com"
                            value={scheduleForm.recipients}
                            onChange={(e) => setScheduleForm({...scheduleForm, recipients: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        <input
                          type="checkbox"
                          id="emailEnabled"
                          checked={scheduleForm.emailEnabled}
                          onChange={(e) => setScheduleForm({...scheduleForm, emailEnabled: e.target.checked})}
                          className="rounded"
                        />
                        <Label htmlFor="emailEnabled">Enviar por email</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        <Button onClick={handleScheduleReport}>
                          <Mail className="h-4 w-4 mr-2" />
                          Agendar Relatório
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowScheduleForm(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {scheduledReports.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum relatório agendado</h3>
                        <p className="text-gray-500 mb-4">Configure relatórios automáticos para receber atualizações periódicas</p>
                        <Button onClick={() => setShowScheduleForm(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Criar Primeiro Agendamento
                        </Button>
                      </div>
                    ) : (
                      scheduledReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${report.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                              {report.isActive ? (
                                <Bell className="h-5 w-5 text-green-600" />
                              ) : (
                                <Bell className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{report.reportType === 'overview' ? 'Visão Geral' : 
                                report.reportType === 'users' ? 'Análise de Usuários' :
                                report.reportType === 'tests' ? 'Análise de Testes' : 'Análise de Resultados'}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{report.frequency === 'daily' ? 'Diário' : 
                                    report.frequency === 'weekly' ? 'Semanal' : 'Mensal'}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <FileText className="h-3 w-3" />
                                  <span>{report.format.toUpperCase()}</span>
                                </span>
                                {report.nextRun && (
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>Próximo: {new Date(report.nextRun).toLocaleDateString('pt-BR')}</span>
                                  </span>
                                )}
                              </div>
                              {report.recipients && report.recipients.length > 0 && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Destinatários: {report.recipients.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteScheduledReport(report.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum dado disponível</h3>
            <p className="text-gray-500">Selecione um período diferente para visualizar os dados do relatório.</p>
          </div>
        )}
      </div>
    </div>
  )
}