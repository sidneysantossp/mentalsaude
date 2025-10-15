'use client'

import { useState, useEffect, use } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Brain, Clock, ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

interface Question {
  id: string
  text: string
  type: 'LIKERT_SCALE' | 'MULTIPLE_CHOICE' | 'YES_NO'
  options: { value: string; label: string; score: number }[]
  order: number
}

interface Test {
  id: string
  title: string
  description: string
  instructions: string
  timeLimit?: number
  category: string
}

const mockTest: Test = {
  id: '1',
  title: 'PHQ-9 - Questionário de Saúde do Paciente',
  description: 'Avaliação de sintomas depressivos nas últimas duas semanas',
  instructions: 'Para cada questão, selecione a resposta que melhor descreve com que frequência você teve este problema nas últimas 2 semanas.',
  timeLimit: 10,
  category: 'DEPRESSION'
}

const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'Pouco interesse ou prazer em fazer as coisas',
    type: 'LIKERT_SCALE',
    order: 1,
    options: [
      { value: '0', label: 'Nenhuma vez', score: 0 },
      { value: '1', label: 'Vários dias', score: 1 },
      { value: '2', label: 'Mais da metade dos dias', score: 2 },
      { value: '3', label: 'Quase todos os dias', score: 3 }
    ]
  },
  {
    id: '2',
    text: 'Sentindo-se para baixo, deprimido(a) ou sem esperança',
    type: 'LIKERT_SCALE',
    order: 2,
    options: [
      { value: '0', label: 'Nenhuma vez', score: 0 },
      { value: '1', label: 'Vários dias', score: 1 },
      { value: '2', label: 'Mais da metade dos dias', score: 2 },
      { value: '3', label: 'Quase todos os dias', score: 3 }
    ]
  },
  {
    id: '3',
    text: 'Dificuldade para pegar no sono ou continuar dormindo, ou dormir muito',
    type: 'LIKERT_SCALE',
    order: 3,
    options: [
      { value: '0', label: 'Nenhuma vez', score: 0 },
      { value: '1', label: 'Vários dias', score: 1 },
      { value: '2', label: 'Mais da metade dos dias', score: 2 },
      { value: '3', label: 'Quase todos os dias', score: 3 }
    ]
  },
  {
    id: '4',
    text: 'Sentindo-se cansado(a) ou com pouca energia',
    type: 'LIKERT_SCALE',
    order: 4,
    options: [
      { value: '0', label: 'Nenhuma vez', score: 0 },
      { value: '1', label: 'Vários dias', score: 1 },
      { value: '2', label: 'Mais da metade dos dias', score: 2 },
      { value: '3', label: 'Quase todos os dias', score: 3 }
    ]
  },
  {
    id: '5',
    text: 'Pouco apetite ou comendo muito',
    type: 'LIKERT_SCALE',
    order: 5,
    options: [
      { value: '0', label: 'Nenhuma vez', score: 0 },
      { value: '1', label: 'Vários dias', score: 1 },
      { value: '2', label: 'Mais da metade dos dias', score: 2 },
      { value: '3', label: 'Quase todos os dias', score: 3 }
    ]
  }
]

export default function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [test, setTest] = useState<Test>(mockTest)
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const resolvedParams = use(params)

  useEffect(() => {
    // Load test data based on ID
    const loadTestData = () => {
      const testId = resolvedParams.id
      
      if (testId === '1') {
        setTest({
          id: '1',
          title: 'PHQ-9 - Questionário de Saúde do Paciente',
          description: 'Avaliação de sintomas depressivos baseada no PHQ-9, instrumento validado cientificamente',
          instructions: 'Para cada questão, selecione a resposta que melhor descreve com que frequência você teve este problema nas últimas 2 semanas.',
          timeLimit: 10,
          category: 'DEPRESSION'
        })
        setQuestions([
          {
            id: '1',
            text: 'Pouco interesse ou prazer em fazer as coisas',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Sentindo-se para baixo, deprimido(a) ou sem esperança',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Dificuldade para pegar no sono ou continuar dormindo, ou dormir muito',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '4',
            text: 'Sentindo-se cansado(a) ou com pouca energia',
            type: 'LIKERT_SCALE',
            order: 4,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '5',
            text: 'Pouco apetite ou comendo demais',
            type: 'LIKERT_SCALE',
            order: 5,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          }
        ])
      }
    }

    loadTestData()
  }, [resolvedParams.id])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    if (isStarted && timeRemaining !== null && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      handleSubmitTest()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isStarted, timeRemaining])

  const handleStartTest = () => {
    setIsStarted(true)
    if (test.timeLimit) {
      setTimeRemaining(test.timeLimit * 60)
    }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleSubmitTest()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmitTest = async () => {
    setIsSubmitting(true)
    
    // Calculate score
    let totalScore = 0
    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const selectedOption = question.options.find(opt => opt.value === answer)
        if (selectedOption) {
          totalScore += selectedOption.score
        }
      }
    })

    // Generate interpretation
    const interpretation = generateInterpretation(totalScore, test.category)
    const recommendations = generateRecommendations(totalScore, test.category)

    // Save result
    const result = {
      id: Date.now().toString(),
      testId: test.id,
      testTitle: test.title,
      totalScore,
      category: test.category,
      completedAt: new Date().toISOString(),
      answers,
      maxScore: questions.reduce((sum, q) => {
        const maxScore = Math.max(...q.options.map(opt => opt.score))
        return sum + maxScore
      }, 0),
      interpretation,
      recommendations,
      severity: getSeverity(totalScore)
    }

    // Save to localStorage
    const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]')
    existingResults.push(result)
    localStorage.setItem('testResults', JSON.stringify(existingResults))

    // Redirect to results
    setTimeout(() => {
      router.push(`/results/${result.id}`)
    }, 2000)

    setIsCompleted(true)
  }

  const generateInterpretation = (score: number, category: string): string => {
    const interpretations: Record<string, Record<string, string>> = {
      'DEPRESSION': {
        'minimal': 'Seus resultados indicam sintomas depressivos mínimos. Você parece estar lidando bem com seus sentimentos.',
        'mild': 'Seus resultados indicam sintomas depressivos leves. Considere estratégias de autocuidado.',
        'moderate': 'Seus resultados indicam sintomas depressivos moderados. Pode ser útil procurar apoio.',
        'severe': 'Seus resultados indicam sintomas depressivos graves. Recomendamos procurar ajuda profissional.'
      }
    }

    const severity = getSeverity(score)
    return interpretations[category]?.[severity] || 'Seus resultados foram processados com sucesso.'
  }

  const generateRecommendations = (score: number, category: string): string[] => {
    const baseRecommendations = [
      'Pratique atividades físicas regularmente',
      'Mantenha uma rotina de sono regular',
      'Converse com amigos ou familiares sobre seus sentimentos'
    ]
    
    const categorySpecific = {
      'DEPRESSION': [
        'Exponha-se à luz solar diariamente (vitamina D)',
        'Estabeleça metas pequenas e realistas para cada dia',
        'Pratique exercícios físicos regularmente (caminhadas, corridas leves)',
        'Mantenha um diário de sentimentos e pensamentos',
        'Evite isolamento social, mesmo quando não tiver vontade',
        'Estabeleça uma rotina regular de sono (7-9 horas)',
        'Considere técnicas de mindfulness e meditação',
        'Limite o consumo de álcool e outras substâncias'
      ]
    }
    
    const severitySpecific = score > 10 ? [
      'Considere procurar um profissional de saúde mental',
      'Busque grupos de apoio',
      'Evite automedicação'
    ] : []

    return [...baseRecommendations, ...(categorySpecific[category as keyof typeof categorySpecific] || []), ...severitySpecific]
  }

  const getSeverity = (score: number): 'minimal' | 'mild' | 'moderate' | 'severe' => {
    if (score <= 4) return 'minimal'
    if (score <= 9) return 'mild'
    if (score <= 14) return 'moderate'
    return 'severe'
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const currentQuestion = questions[currentQuestionIndex]

  if (!isStarted) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-900 mb-4">
                  {test.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 mb-6">
                  {test.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">Instruções</h3>
                  <p className="text-blue-800">{test.instructions}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                    <div className="text-sm text-gray-600">Perguntas</div>
                  </div>
                  
                  {test.timeLimit && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{test.timeLimit}</div>
                      <div className="text-sm text-gray-600">Minutos</div>
                    </div>
                  )}
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">~5</div>
                    <div className="text-sm text-gray-600">Minutos estimados</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Importante</h4>
                      <p className="text-yellow-700 text-sm mt-1">
                        Responda com honestidade. Não há respostas certas ou erradas. 
                        Este é um instrumento de triagem e não substitui uma avaliação profissional.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={handleStartTest}
                >
                  Iniciar Teste
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (isCompleted) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Teste Concluído!</h2>
            <p className="text-gray-600 mb-6">Seus resultados estão sendo processados...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-6"></div>
            
            {!session && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-800 text-sm mb-3">
                  Deseja salvar seus resultados e acompanhar sua evolução?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Link href="/auth/signin">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" variant="outline">
                      Criar Conta
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Test Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {timeRemaining !== null && (
                  <Badge variant={timeRemaining < 60 ? "destructive" : "secondary"} className="flex items-center space-x-2 px-3 py-1">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{formatTime(timeRemaining)}</span>
                  </Badge>
                )}
                
                <div className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} de {questions.length}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <Card className="shadow-lg border-blue-100">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-sm">
                  Pergunta {currentQuestionIndex + 1}
                </Badge>
                {test.timeLimit && (
                  <Badge variant={timeRemaining && timeRemaining < 60 ? "destructive" : "secondary"} className="text-sm font-medium">
                    <Clock className="h-3 w-3 mr-1" />
                    {timeRemaining ? formatTime(timeRemaining) : '--:--'}
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-xl text-gray-900 leading-relaxed">
                {currentQuestion.text}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-gray-700">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Anterior</span>
                </Button>

                <Button
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion.id] || isSubmitting}
                  className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white"
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : currentQuestionIndex === questions.length - 1 ? (
                    <>
                      Finalizar
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Próxima
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}