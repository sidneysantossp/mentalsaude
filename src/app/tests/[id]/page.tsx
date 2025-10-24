'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Brain, ChevronLeft, ChevronRight, Clock, CheckCircle, Download, User, TrendingUp, Shield, Heart, Share2, Mail } from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import TestResultAuth from '@/components/auth/TestResultAuth'
import PDFGenerator from '@/components/test/PDFGenerator'
import ShareResults from '@/components/test/ShareResults'

interface Question {
  id: string
  text: string
  type: string
  order: number
  options: {
    id: string
    text: string
    value: number
    order: number
  }[]
}

interface Test {
  id: string
  title: string
  description: string
  category: string
  timeLimit: number
  questionCount: number
  estimatedTime: string
  questions: string
  difficulty: string
  icon: string
  color: string
  image: string
  instructions: string
  isActive: boolean
}

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string

  const [test, setTest] = useState<Test | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (testId) {
      // Check if testId is numeric (old URL format)
      if (/^\d+$/.test(testId)) {
        // Redirect to the correct URL format using category
        fetchTestForRedirect(testId)
      } else {
        fetchTest()
      }
    }
  }, [testId])

  const fetchTestForRedirect = async (id: string) => {
    try {
      const response = await fetch(`/api/tests/${id}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data.test) {
          const category = data.data.test.category.toLowerCase().replace('_', '-')
          router.replace(`/testes/${category}`)
          return
        }
      }
      
      // If test not found or error, redirect to tests page
      router.replace('/testes')
    } catch (err) {
      console.error('Erro ao redirecionar:', err)
      router.replace('/testes')
    }
  }

  const fetchTest = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tests/${testId}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar teste')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setTest(data.data.test)
        setQuestions(data.data.questions)
      } else {
        throw new Error(data.error || 'Erro desconhecido')
      }
    } catch (err) {
      console.error('Erro ao carregar teste:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar teste')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmitTest()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmitTest = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Por favor, responda todas as perguntas antes de finalizar.')
      return
    }

    setIsSubmitting(true)
    try {
      // Convert answers to the format expected by the API
      const formattedAnswers = Object.entries(answers).map(([questionId, score]) => ({
        questionId,
        score
      }))

      const response = await fetch(`/api/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: formattedAnswers,
          testType: test?.category || 'Teste Psicológico'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setTestResult(data.result)
        setShowResults(true)
      } else {
        throw new Error(data.error || 'Erro ao enviar respostas')
      }
    } catch (err) {
      console.error('Erro ao enviar teste:', err)
      alert('Erro ao enviar suas respostas. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100
  }

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
    const maxScore = questions.length * 3 // Maximum score per question is 3
    return Math.round((totalScore / maxScore) * 100)
  }

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    // Here you could show a success message or update UI
  }

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando teste...</p>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (error || !test) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || 'Teste não encontrado'}</p>
              <Link href="/testes">
                <Button variant="outline">Voltar para Testes</Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (showResults && testResult) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teste Concluído com Sucesso!</h1>
            <p className="text-gray-600">Aqui está sua análise detalhada de saúde mental</p>
          </div>

          {/* Main Score Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{test?.title}</h2>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className={`${testResult.color} bg-opacity-10 text-base px-4 py-2`}>
                    {testResult.severity}
                  </Badge>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{new Date(testResult.completedAt).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{testResult.percentage}%</div>
                    <p className="text-sm text-gray-600">Pontuação Total</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{testResult.score}/{testResult.maxScore}</div>
                    <p className="text-sm text-gray-600">Pontos Obtidos</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-4xl font-bold text-green-600 mb-2">{questions.length}</div>
                    <p className="text-sm text-gray-600">Perguntas</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Nível de {testResult.severity.toLowerCase()}</span>
                    <span>{testResult.percentage}%</span>
                  </div>
                  <Progress value={testResult.percentage} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Interpretation Card */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl">Interpretação dos Resultados</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {testResult.interpretation}
                </p>
                <div className={`p-4 rounded-lg ${testResult.color} bg-opacity-10`}>
                  <p className={`font-semibold ${testResult.color}`}>
                    Nível: {testResult.severity}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights Card */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-xl">Insights Personalizados</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {testResult.recommendations}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Gerado por IA com base em evidências científicas</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Criar Conta</h3>
                <p className="text-sm text-gray-600 mb-4">Salve seus resultados e acompanhe sua evolução</p>
                <Button className="w-full" onClick={() => setShowAuthModal(true)}>
                  {user ? 'Ver Minha Conta' : 'Criar Conta Gratuita'}
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Baixar PDF</h3>
                <p className="text-sm text-gray-600 mb-4">Exporte seus resultados em PDF</p>
                <PDFGenerator 
                  testResult={testResult}
                  test={test}
                  questions={questions}
                />
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Compartilhar</h3>
                <p className="text-sm text-gray-600 mb-4">Compartilhe com um profissional</p>
                <ShareResults 
                  testResult={testResult}
                  test={test}
                />
              </CardContent>
            </Card>
          </div>

          {/* Professional Help Section */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-0 shadow-md mb-8">
            <CardContent className="p-8">
              <div className="text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Precisa de Ajuda Profissional?</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Nossos resultados são uma ferramenta de autoavaliação. Se você está enfrentando dificuldades, 
                  recomendamos procurar um psicólogo ou psiquiatra para uma avaliação completa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-500 hover:bg-red-600">
                    <Mail className="h-4 w-4 mr-2" />
                    Encontrar Profissional
                  </Button>
                  <Button size="lg" variant="outline">
                    Agendar Consulta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/testes">
              <Button variant="outline" className="w-full sm:w-auto">
                Fazer Outro Teste
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full sm:w-auto">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/testes" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para Testes
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
            <p className="text-gray-600 mb-4">{test.description}</p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span>{questions.length} perguntas</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{test.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{currentQuestion + 1} de {questions.length}</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Pergunta {currentQuestion + 1}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentQ?.text}
              </p>
            </div>

            {/* Answer Options */}
            <RadioGroup
              value={answers[currentQ?.id || '']?.toString()}
              onValueChange={(value) => handleAnswerChange(currentQ?.id || '', value)}
              className="space-y-3"
            >
              {currentQ?.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={option.id} />
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            disabled={!answers[currentQ?.id || ''] || isSubmitting}
          >
            {isSubmitting ? (
              'Enviando...'
            ) : currentQuestion === questions.length - 1 ? (
              'Finalizar Teste'
            ) : (
              <>
                Próxima
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </LayoutWrapper>
  )

  // Add Auth Modal
  if (showAuthModal && testResult) {
    return (
      <TestResultAuth
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        testResult={testResult}
      />
    )
  }
}