'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Brain, Clock, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Info, LogIn, UserPlus } from 'lucide-react'
import { toast } from 'sonner'

interface Question {
  id: string
  text: string
  type: 'LIKERT_SCALE' | 'MULTIPLE_CHOICE' | 'YES_NO'
  options: string
  order: number
}

interface Test {
  id: string
  title: string
  slug: string
  description: string
  instructions: string
  timeLimit?: number
  category: string
  questions: Question[]
}

export default function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [slug, setSlug] = useState<string>('')
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [testStarted, setTestStarted] = useState(false)

  useEffect(() => {
    const initPage = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
      fetchTest(resolvedParams.slug)
    }
    initPage()
  }, [])

  useEffect(() => {
    if (testStarted && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(timer)
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [testStarted, timeRemaining])

  const fetchTest = async (testSlug: string) => {
    try {
      const response = await fetch(`/api/tests/${testSlug}`)
      if (!response.ok) throw new Error('Erro ao carregar teste')
      
      const data = await response.json()
      setTest(data)
    } catch (error) {
      console.error('Erro ao carregar teste:', error)
      toast.error('Erro ao carregar teste')
    } finally {
      setLoading(false)
    }
  }

  const startTest = () => {
    setTestStarted(true)
    if (test?.timeLimit) {
      setTimeRemaining(test.timeLimit * 60)
    }
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (!test) return
    
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!test) return

    let score = 0
    test.questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const options = JSON.parse(question.options)
        const answerIndex = options.indexOf(answer)
        score += answerIndex
      }
    })

    setTotalScore(score)
    setShowResults(true)

    if (session?.user) {
      try {
        await fetch('/api/test-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testId: test.id,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
              questionId,
              answer
            })),
            score
          })
        })
        toast.success('Resultado salvo com sucesso!')
      } catch (error) {
        console.error('Erro ao salvar resultado:', error)
        toast.error('Erro ao salvar resultado')
      }
    } else {
      toast.info('Faça login para salvar seus resultados')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getResultMessage = () => {
    if (!test) return ''
    
    const maxScore = test.questions.length * 4
    const percentage = (totalScore / maxScore) * 100

    if (percentage < 25) return 'Sintomas mínimos ou ausentes'
    if (percentage < 50) return 'Sintomas leves'
    if (percentage < 75) return 'Sintomas moderados'
    return 'Sintomas graves - recomendamos buscar ajuda profissional'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando teste...</p>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Teste não encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              O teste que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link href="/testes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para testes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!testStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/testes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{test.title}</CardTitle>
                <CardDescription className="text-base">{test.description}</CardDescription>
              </div>
              <Badge variant="outline" className="ml-4">
                {test.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {status !== 'authenticated' && (
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900">Importante: Salvar Resultados</AlertTitle>
                <AlertDescription className="text-blue-800">
                  Para salvar seus resultados em PDF ou na plataforma, você precisa estar logado. 
                  Caso contrário, o teste não será salvo ao final.
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="default" asChild>
                      <Link href="/auth/signin">
                        <LogIn className="mr-2 h-4 w-4" />
                        Fazer Login
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/auth/signup">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Criar Conta
                      </Link>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Instruções</h3>
                <p className="text-muted-foreground">{test.instructions}</p>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>{test.questions.length} questões</span>
                </div>
                {test.timeLimit && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{test.timeLimit} minutos</span>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={startTest} size="lg" className="w-full">
              Iniciar Teste
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <CheckCircle className="h-8 w-8 text-green-600" />
              Teste Concluído!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Seu Resultado</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {totalScore} / {test.questions.length * 4}
                </div>
                <p className="text-lg text-muted-foreground">{getResultMessage()}</p>
              </div>

              {!session && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-900">Resultado não salvo</AlertTitle>
                  <AlertDescription className="text-amber-800">
                    Você não está logado, portanto seus resultados não foram salvos. 
                    Faça login ou crie uma conta para salvar seus resultados e acompanhar seu progresso.
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Importante:</strong> Este teste é apenas uma ferramenta de triagem e não substitui 
                  uma avaliação profissional. Se você está enfrentando dificuldades, recomendamos buscar 
                  ajuda de um profissional de saúde mental.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/testes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para testes
                </Link>
              </Button>
              {session && (
                <Button asChild className="flex-1">
                  <Link href="/dashboard">
                    Ver Meus Resultados
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = test.questions[currentQuestion]
  const options = currentQ ? JSON.parse(currentQ.options) : []
  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setTestStarted(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          {timeRemaining !== null && (
            <Badge variant={timeRemaining < 60 ? 'destructive' : 'secondary'}>
              <Clock className="mr-2 h-4 w-4" />
              {formatTime(timeRemaining)}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Questão {currentQuestion + 1} de {test.questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={answers[currentQ.id] || ''}
            onValueChange={(value) => handleAnswer(currentQ.id, value)}
          >
            <div className="space-y-3">
              {options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="flex-1"
            >
              {currentQuestion === test.questions.length - 1 ? 'Finalizar' : 'Próxima'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
