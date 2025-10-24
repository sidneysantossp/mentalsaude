'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
      })

      const data = await response.json()
      
      if (data.success) {
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
}