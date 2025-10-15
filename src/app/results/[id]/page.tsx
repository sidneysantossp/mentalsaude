'use client'

import { useState, useEffect, use } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Heart, 
  Flame, 
  TrendingUp, 
  Calendar, 
  Download, 
  Share2, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  Activity,
  Target,
  Lightbulb
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

interface TestResult {
  id: string
  testId: string
  testTitle: string
  totalScore: number
  category: string
  completedAt: string
  answers: Record<string, string>
  maxScore: number
  interpretation: string
  recommendations: string[]
  severity: 'minimal' | 'mild' | 'moderate' | 'severe'
}

const mockResult: TestResult = {
  id: '1',
  testId: '1',
  testTitle: 'PHQ-9 - Questionário de Saúde do Paciente',
  totalScore: 12,
  category: 'DEPRESSION',
  completedAt: new Date().toISOString(),
  answers: {
    '1': '1',
    '2': '2',
    '3': '1',
    '4': '2',
    '5': '1'
  },
  maxScore: 27,
  interpretation: 'Seus resultados indicam sintomas depressivos de intensidade leve. É importante monitorar esses sintomas e considerar estratégias de autocuidado.',
  recommendations: [
    'Pratique atividades físicas regularmente',
    'Mantenha uma rotina de sono regular',
    'Converse com amigos ou familiares sobre seus sentimentos',
    'Considere procurar um profissional se os sintomas persistirem'
  ],
  severity: 'mild'
}

const historicalData = [
  { date: '2024-01-15', score: 8, test: 'PHQ-9' },
  { date: '2024-02-20', score: 10, test: 'PHQ-9' },
  { date: '2024-03-18', score: 12, test: 'PHQ-9' },
]

const categoryData = [
  { name: 'Depressão', value: 12, color: '#3B82F6' },
  { name: 'Ansiedade', value: 8, color: '#10B981' },
  { name: 'Estresse', value: 15, color: '#F59E0B' },
]

const severityLevels = {
  minimal: { 
    label: 'Mínimo', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle,
    range: '0-4'
  },
  mild: { 
    label: 'Leve', 
    color: 'bg-blue-100 text-blue-800', 
    icon: Info,
    range: '5-9'
  },
  moderate: { 
    label: 'Moderado', 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: AlertTriangle,
    range: '10-14'
  },
  severe: { 
    label: 'Grave', 
    color: 'bg-red-100 text-red-800', 
    icon: AlertTriangle,
    range: '15-27'
  }
}

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const resolvedParams = use(params)

  useEffect(() => {
    // Remove authentication requirement - allow all users to access results
    // Load result from localStorage (in real app, would fetch from API)
    const loadResult = () => {
      const results = JSON.parse(localStorage.getItem('testResults') || '[]')
      const foundResult = results.find((r: TestResult) => r.id === resolvedParams.id)
      
      if (foundResult) {
        // Ensure all required properties exist
        const completeResult: TestResult = {
          id: foundResult.id || resolvedParams.id,
          testId: foundResult.testId || '1',
          testTitle: foundResult.testTitle || 'Teste Psicológico',
          totalScore: foundResult.totalScore || 0,
          category: foundResult.category || 'DEPRESSION',
          completedAt: foundResult.completedAt || new Date().toISOString(),
          answers: foundResult.answers || {},
          maxScore: foundResult.maxScore || 27,
          interpretation: foundResult.interpretation || 'Seus resultados foram processados com sucesso.',
          recommendations: foundResult.recommendations || [
            'Continue monitorando sua saúde mental',
            'Procure atividades que promovam bem-estar',
            'Considere conversar com um profissional se necessário'
          ],
          severity: foundResult.severity || 'minimal'
        }
        setResult(completeResult)
      } else {
        // Use mock data if not found
        setResult(mockResult)
      }
      setLoading(false)
    }

    loadResult()
  }, [resolvedParams.id])

  const getSeverityInfo = (severity: string) => {
    return severityLevels[severity as keyof typeof severityLevels] || severityLevels.minimal
  }

  const getScorePercentage = (score: number, maxScore: number) => {
    return (score / maxScore) * 100
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return Brain
      case 'ANXIETY': return Heart
      case 'BURNOUT': return Flame
      default: return Brain
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return 'Depressão'
      case 'ANXIETY': return 'Ansiedade'
      case 'BURNOUT': return 'Burnout'
      default: return category
    }
  }

  const handleDownloadReport = () => {
    // In a real app, would generate PDF
    const reportData = {
      testTitle: result?.testTitle,
      score: result?.totalScore,
      severity: getSeverityInfo(result?.severity || 'minimal').label,
      date: result?.completedAt,
      interpretation: result?.interpretation,
      recommendations: result?.recommendations
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio-${result?.testTitle}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Resultado não encontrado</h2>
          <p className="text-gray-600 mb-4">O resultado solicitado não está disponível.</p>
          <Button onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const severityInfo = getSeverityInfo(result.severity)
  const IconComponent = getCategoryIcon(result.category)
  const SeverityIcon = severityInfo.icon

  return (
    <div>
      {/* Result Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center space-x-2">
                <IconComponent className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-gray-900">Resultados</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {session && (
                <Button variant="outline" size="sm" onClick={handleDownloadReport} className="bg-black hover:bg-gray-800 text-white border-black">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Relatório
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              {!session && (
                <Link href="/auth/signin">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Entrar para Salvar
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Result Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {result.testTitle}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(result.completedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>{getCategoryLabel(result.category)}</span>
              </div>
            </div>
          </div>

          {/* Score Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 shadow-lg border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Pontuação Geral</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600 mb-2">
                      {result.totalScore}
                    </div>
                    <div className="text-gray-600 mb-4">
                      de {result.maxScore} pontos possíveis
                    </div>
                    <Progress 
                      value={getScorePercentage(result.totalScore, result.maxScore)} 
                      className="h-3 mb-2"
                    />
                    <div className="text-sm text-gray-600">
                      {getScorePercentage(result.totalScore, result.maxScore).toFixed(1)}% do total
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Badge className={`${severityInfo.color} text-lg px-4 py-2`}>
                      <SeverityIcon className="h-4 w-4 mr-2" />
                      {severityInfo.label}
                      <span className="ml-2 text-sm opacity-75">({severityInfo.range})</span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Tendência</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { month: 'short' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Tabs defaultValue="interpretation" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="interpretation">Interpretação</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="interpretation" className="space-y-6">
              <Card className="shadow-lg border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>Interpretação dos Resultados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {result.interpretation}
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">Entendendo sua pontuação:</h4>
                      <div className="space-y-3">
                        {Object.entries(severityLevels).map(([key, info]) => {
                          const Icon = info.icon
                          return (
                            <div key={key} className="flex items-center space-x-3">
                              <Icon className="h-4 w-4 text-blue-600" />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{info.label}:</span>
                                  <span className="text-sm text-gray-600">Pontuação {info.range}</span>
                                </div>
                              </div>
                              {key === result.severity && (
                                <Badge className={info.color}>Sua pontuação</Badge>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card className="shadow-lg border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <span>Recomendações Personalizadas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.recommendations?.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <p className="text-green-800">{recommendation}</p>
                      </div>
                    )) || []}
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Importante:</h4>
                    <p className="text-yellow-700 text-sm">
                      Este teste é um instrumento de triagem e não substitui uma avaliação profissional. 
                      Se seus sintomas persistirem ou piorarem, recomendamos procurar um psicólogo ou psiquiatra.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card className="shadow-lg border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Análise Detalhada</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Distribuição por Categoria</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Estatísticas do Teste</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total de perguntas:</span>
                          <span className="font-medium">{Object.keys(result.answers || {}).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pontuação média:</span>
                          <span className="font-medium">
                            {Object.keys(result.answers || {}).length > 0 
                              ? (result.totalScore / Object.keys(result.answers || {}).length).toFixed(1)
                              : '0.0'
                            } por questão
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tempo de conclusão:</span>
                          <span className="font-medium">~5 minutos</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Data do teste:</span>
                          <span className="font-medium">
                            {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="shadow-lg border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Histórico de Evolução</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Evolução ao Longo do Tempo</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                          />
                          <YAxis />
                          <Tooltip 
                            labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3B82F6" 
                            strokeWidth={2}
                            dot={{ fill: '#3B82F6', r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" className="mr-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Novo Teste
                      </Button>
                      <Button>
                        <Activity className="h-4 w-4 mr-2" />
                        Fazer Outro Teste
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                  <Activity className="h-5 w-5 mr-2" />
                  Fazer Novo Teste
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="h-5 w-5 mr-2" />
                  Agendar Consulta
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5 mr-2" />
                  Compartilhar Resultados
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                <Link href="/dashboard" className="text-blue-600 hover:underline">
                  Ver todos os meus resultados
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}