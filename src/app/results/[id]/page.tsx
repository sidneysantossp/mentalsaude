'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Calendar, 
  Download, 
  Share2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  ArrowLeft,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import SimpleBarChart from '@/components/charts/SimpleBarChart'
import SimplePieChart from '@/components/charts/SimplePieChart'
import SimpleLineChart from '@/components/charts/SimpleLineChart'
import Footer from '@/components/Footer'

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
    description: string
  }
  user: {
    name: string
    email: string
  }
  answers: Array<{
    question: {
      text: string
      type: string
    }
    value: string
    score: number
  }>
}

interface HistoricalData {
  date: string
  score: number
  category: string
}

export default function TestResultPage() {
  const { data: session } = useSession()
  const params = useParams()
  const router = useRouter()
  const [result, setResult] = useState<TestResult | null>(null)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [loadingSummary, setLoadingSummary] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchResult()
      fetchHistoricalData()
    }
  }, [params.id])

  useEffect(() => {
    if (result) {
      generateAISummary()
    }
  }, [result])

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/test-results/${params.id}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar resultado')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setResult(data.data)
      } else {
        throw new Error(data.error || 'Erro desconhecido')
      }
    } catch (err) {
      console.error('Erro ao carregar resultado:', err)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(`/api/test-results/historical?testCategory=${result?.test.category}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setHistoricalData(data.data)
        }
      }
    } catch (err) {
      console.error('Erro ao carregar dados históricos:', err)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch(`/api/test-results/${params.id}/download`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `resultado-${result?.test.title}-${new Date().toISOString().split('T')[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (err) {
      console.error('Erro ao baixar resultado:', err)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Resultado do Teste: ${result?.test.title}`,
          text: `Meu resultado no teste ${result?.test.title}: ${result?.category}`,
          url: window.location.href
        })
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
      }
    } else {
      // Fallback: copiar para área de transferência
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const generateAISummary = async () => {
    if (!result) return
    
    setLoadingSummary(true)
    try {
      const response = await fetch('/api/generate-ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testTitle: result.test.title,
          score: result.totalScore,
          category: result.category,
          maxScore: result.answers.length * 3,
          answers: result.answers
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAiSummary(data.data.summary)
        }
      }
    } catch (err) {
      console.error('Erro ao gerar resumo com IA:', err)
    } finally {
      setLoadingSummary(false)
    }
  }

  const getSeverityColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'leve':
      case 'mínimo':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'moderado':
      case 'médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'grave':
      case 'severo':
      case 'alto':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getSeverityIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'leve':
      case 'mínimo':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'moderado':
      case 'médio':
        return <Info className="h-5 w-5 text-yellow-600" />
      case 'grave':
      case 'severo':
      case 'alto':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Brain className="h-5 w-5 text-blue-600" />
    }
  }

  const getScorePercentage = (score: number, maxScore: number) => {
    return Math.min((score / maxScore) * 100, 100)
  }

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando resultado...</p>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (!result) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Resultado não encontrado</p>
            <Button onClick={() => router.push('/dashboard')}>
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  const maxScore = result.answers.length * 3 // Maximum possible score
  const scorePercentage = getScorePercentage(result.totalScore, maxScore)

  // Prepare data for charts
  const scoreDistribution = [
    { name: 'Sua Pontuação', value: result.totalScore, fill: '#3b82f6' },
    { name: 'Potencial Restante', value: maxScore - result.totalScore, fill: '#e5e7eb' }
  ]

  const categoryDistribution = historicalData.reduce((acc: any[], item) => {
    const existing = acc.find(a => a.name === item.category)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ name: item.category, value: 1, fill: '#3b82f6' })
    }
    return acc
  }, [])

  const evolutionData = historicalData.map((item, index) => ({
    date: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    score: item.score,
    category: item.category
  }))

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voltar</span>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Resultado do Teste
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {result.test.title}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Compartilhar</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{downloading ? 'Baixando...' : 'Baixar PDF'}</span>
                </Button>
              </div>
            </div>

            {/* Test Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Realizado em {new Date(result.completedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="h-4 w-4" />
                <span>{result.answers.length} perguntas</span>
              </div>
            </div>
          </div>

          {/* Main Result Card */}
          <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  Sua Avaliação
                </span>
                <Badge className={`text-lg px-4 py-2 ${getSeverityColor(result.category)}`}>
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(result.category)}
                    <span className="font-semibold">{result.category}</span>
                  </div>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Pontuação Total</span>
                  <span className="text-sm font-bold text-gray-900">
                    {result.totalScore} / {maxScore}
                  </span>
                </div>
                <Progress value={scorePercentage} className="h-3" />
                <p className="text-xs text-gray-600 mt-1">
                  {scorePercentage.toFixed(1)}% do pontencial máximo
                </p>
              </div>

              {/* AI Summary Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                    Resumo Personalizado por IA
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAISummary}
                    disabled={loadingSummary}
                    className="flex items-center space-x-1"
                  >
                    <RefreshCw className={`h-3 w-3 ${loadingSummary ? 'animate-spin' : ''}`} />
                    <span>Atualizar</span>
                  </Button>
                </div>
                
                {loadingSummary ? (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                      <div>
                        <p className="text-gray-600 font-medium">Gerando resumo personalizado com IA...</p>
                        <p className="text-xs text-gray-500 mt-1">Analisando seus resultados para criar insights personalizados</p>
                      </div>
                    </div>
                  </div>
                ) : aiSummary ? (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-purple-700 font-medium flex items-center">
                          <Sparkles className="h-4 w-4 mr-1" />
                          Análise baseada em inteligência artificial
                        </p>
                        <Badge variant="outline" className="text-xs bg-white">
                          Personalizado
                        </Badge>
                      </div>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {aiSummary}
                      </div>
                      <div className="pt-3 border-t border-purple-200">
                        <p className="text-xs text-gray-500 italic flex items-start">
                          <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Este resumo foi gerado por IA com base nos seus resultados do teste e não substitui uma avaliação profissional. Para questões de saúde mental, recomendamos sempre consultar um especialista.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="text-center text-gray-500">
                      <Sparkles className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium mb-1">Resumo indisponível</p>
                      <p className="text-sm text-gray-400 mb-3">Não foi possível gerar o resumo personalizado no momento</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateAISummary}
                        className="text-sm"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Tentar novamente
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Recommendations */}
              {result.recommendations && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Recomendações Adicionais
                  </h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-gray-700 leading-relaxed">
                      {result.recommendations}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                  Distribuição da Pontuação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimplePieChart data={scoreDistribution} />
              </CardContent>
            </Card>

            {/* Historical Evolution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Evolução Histórica
                </CardTitle>
              </CardHeader>
              <CardContent>
                {evolutionData.length > 0 ? (
                  <SimpleLineChart data={evolutionData} />
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <p>Sem dados históricos disponíveis</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Category Distribution */}
            {categoryDistribution.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                    Distribuição por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart data={categoryDistribution} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              onClick={() => router.push('/tests')}
            >
              Fazer Novo Teste
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/dashboard')}
            >
              Ver Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/professionals')}
            >
              Falar com Profissional
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </LayoutWrapper>
  )
}