'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Brain, Clock, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Info, LogIn, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { getCategoryLabel } from '@/lib/categories'
import { testsInfo } from '@/lib/tests-info'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'

interface Question {
  id: string
  text: string
  type: 'LIKERT_SCALE' | 'MULTIPLE_CHOICE' | 'YES_NO'
  options: string
  order: number
}

type OptionObject = { value: string | number; label: string }
type OptionItem = string | OptionObject

const getOptionValue = (option: OptionItem) =>
  typeof option === 'string'
    ? option
    : String(option.value)

const getOptionLabel = (option: OptionItem) =>
  typeof option === 'string' ? option : option.label

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

const CATEGORY_TO_CONDITION_SLUG: Record<string, string> = {
  DEPRESSION: 'depressao',
  ANXIETY: 'ansiedade'
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
  const conditionSlug =
    test && CATEGORY_TO_CONDITION_SLUG[test.category as keyof typeof CATEGORY_TO_CONDITION_SLUG]
  const decisionPagesData = slug ? testsInfo[slug]?.decisionPages ?? [] : []
  const activeSlug = slug || test?.slug || ''
  const baseSlug = slug || test?.slug

  const jsonLd =
    test && slug
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: test.title,
          description: test.shortDescription || test.description,
          url: `${SITE_URL}/testes/${slug}`,
          mainEntity: {
            '@type': 'Questionnaire',
            name: test.title,
            about: getCategoryLabel(test.category),
            numberOfQuestions: test.questions.length,
            typicalTime: test.timeLimit ? `PT${test.timeLimit}M` : 'PT0M',
            audience: {
              '@type': 'Audience',
              audienceType: 'Adultos'
            }
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Testes',
                item: `${SITE_URL}/testes`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: test.title,
                item: `${SITE_URL}/testes/${slug}`
              }
            ]
          }
        }
      : null

  const renderStructuredData = () => {
    if (!jsonLd) return null
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    )
  }

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

  useEffect(() => {
    if (typeof document === 'undefined') return
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
  }, [currentQuestion])

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
        const options = (JSON.parse(question.options) as OptionItem[]).map(getOptionValue)
        const answerIndex = options.indexOf(answer)
        score += Math.max(answerIndex, 0)
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
      <>
        {renderStructuredData()}
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
                <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
                <CardDescription className="text-base">{test.description}</CardDescription>
              </div>
              <Badge variant="outline" className="ml-4">
                {getCategoryLabel(test.category)}
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

            {baseSlug && (
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                <Link href={`/testes/${baseSlug}/como-funciona`} className="underline">
                  Entenda como o teste funciona
                </Link>
                <Link href={`/testes/${baseSlug}/pontuacao`} className="underline">
                  Veja a pontuação antes de começar
                </Link>
              </div>
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
    </>
  )
}

  const handleDownloadPdf = () => {
    if (typeof window !== 'undefined' && window.print) {
      window.print()
    }
  }

  if (showResults) {
    const resultMessage = getResultMessage()
    const nowLabel = new Date().toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    })

    return (
      <>
        {renderStructuredData()}
        <div className="container mx-auto px-4 py-10">
        <div className="mx-auto w-full max-w-4xl rounded-[32px] border border-gray-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Mental Saúde Platform
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Relatório em PDF
              </h2>
              <p className="text-sm text-muted-foreground">Resultados clínicos validados</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p className="font-medium text-slate-900">{test.title}</p>
              <p>{nowLabel}</p>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Pontuação</p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {totalScore} / {test.questions.length * 4}
                </p>
                <p className="text-sm text-muted-foreground">Avaliação</p>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Categoria</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{getCategoryLabel(test.category)}</p>
                <p className="text-sm text-muted-foreground">Teste realizado</p>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Tempo</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {test.timeLimit ? `${test.timeLimit} min` : 'Sem limite'}
                </p>
                <p className="text-sm text-muted-foreground">Duração sugerida</p>
              </div>
            </div>

            <div className="rounded-3xl border border-green-200 bg-gradient-to-r from-emerald-50 to-white p-6 shadow-inner">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-semibold">Resultado</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-slate-900">{resultMessage}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Resultado baseado nos seus relatos das últimas duas semanas.
              </p>
            </div>

            {/*
              warning for session
            */}
            {!session && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-900">Resultado não salvo</AlertTitle>
                <AlertDescription className="text-amber-800">
                  Você não está logado, portanto seus resultados não foram salvos. Faça login ou crie uma conta
                  para acompanhar seu progresso.
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-500" />
                <p className="text-sm font-semibold text-slate-800">Recomendações</p>
              </div>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Este teste é apenas uma triagem inicial. Busque suporte profissional se você estiver enfrentando
                sintomas persistentes ou intensos. Pratique autocuidado diário, mantenha conexões significativas e
                considere compartilhar este relatório com um profissional confiável.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Ação recomendada</p>
                <p className="text-lg font-semibold">Registre-se para salvar ou baixe o PDF</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <Button
                  asChild
                  className="w-full md:w-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white border-0"
                >
                  <Link href="/auth/signup">
                    Registrar para salvar este teste
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadPdf}
                  disabled={status !== 'authenticated'}
                  className="w-full md:w-auto border-white bg-white text-black hover:text-black"
                  title={status !== 'authenticated' ? 'Faça login para habilitar o download' : undefined}
                >
                  Baixar PDF
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/80 p-6 text-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Explorar o teste</p>
              <p className="text-lg font-semibold text-slate-900">Entenda melhor a pontuação, a validade e o que fazer em seguida</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link href={`/testes/${activeSlug}/pontuacao`}>Pontuação detalhada</Link>
                </Button>
                <Button variant="outline" asChild size="sm">
                  <Link href={`/testes/${activeSlug}/validacao`}>Validação científica</Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link href={`/testes/${activeSlug}/pos-teste`}>Próximos passos</Link>
                </Button>
                <Button variant="ghost" asChild size="sm" className="px-0 text-left text-blue-600 hover:text-blue-700">
                  <Link href={`/testes/${activeSlug}/como-funciona`}>Como funciona o instrumento</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                {decisionPagesData.map(page => (
                  <Link key={page.slug} href={`/decisao/${page.slug}`} className="underline">
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 px-8 py-5 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white">
            Mental Saúde • {nowLabel}
          </div>
        </div>
      </div>
    </>
  )
}

const currentQ = test.questions[currentQuestion]
  const options = currentQ ? (JSON.parse(currentQ.options) as OptionItem[]) : []
  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  return (
    <>
      {renderStructuredData()}
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
              className="space-y-3"
            >
              {options.map((option, index) => {
                const optionValue = getOptionValue(option)
                const optionLabel = getOptionLabel(option)
                return (
                  <RadioGroupItem
                    key={optionValue}
                    value={optionValue}
                    id={`option-${index}`}
                    aria-label={optionLabel}
                  >
                    <span className="text-base">{optionLabel}</span>
                  </RadioGroupItem>
                )
              })}
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
    </>
  )
}
