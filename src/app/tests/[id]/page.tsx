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
    // Remove authentication requirement - allow all users to access tests
    // Load test data based on ID (in real app, would fetch from API)
    const loadTestData = () => {
      // For demo purposes, we'll use different mock data based on the test ID
      const testId = resolvedParams.id
      
      if (testId === '1') {
        // Teste de Depressão PHQ-9
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
          },
          {
            id: '6',
            text: 'Sentindo-se mal consigo mesmo(a) ou que é um fracasso ou que decepcionou sua família ou a si mesmo(a)',
            type: 'LIKERT_SCALE',
            order: 6,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '7',
            text: 'Dificuldade para se concentrar nas coisas, como ler o jornal ou assistir televisão',
            type: 'LIKERT_SCALE',
            order: 7,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '8',
            text: 'Movimentando-se ou falando tão lentamente que outras pessoas notaram, ou o oposto - estar tão agitado(a) que você tem se movido muito mais que o normal',
            type: 'LIKERT_SCALE',
            order: 8,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '9',
            text: 'Pensamentos em se ferir de alguma forma ou que seria melhor estar morto(a)',
            type: 'LIKERT_SCALE',
            order: 9,
            options: [
              { value: '0', label: 'Nenhuma vez', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          }
        ])
      } else if (testId === '2') {
        // Teste de Compulsão Alimentar
        setTest({
          id: '2',
          title: 'Teste de Compulsão Alimentar',
          description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
          instructions: 'Para cada questão, seja honesto(a) sobre seus hábitos alimentares e sentimentos relacionados.',
          timeLimit: 15,
          category: 'OCD'
        })
        setQuestions([
          {
            id: '1',
            text: 'Como muito mais rápido que o normal',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Às vezes', score: 1 },
              { value: '2', label: 'Frequentemente', score: 2 },
              { value: '3', label: 'Sempre', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Como até me sentir desconfortavelmente cheio(a)',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Às vezes', score: 1 },
              { value: '2', label: 'Frequentemente', score: 2 },
              { value: '3', label: 'Sempre', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Como grandes quantidades mesmo sem sentir fome',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Às vezes', score: 1 },
              { value: '2', label: 'Frequentemente', score: 2 },
              { value: '3', label: 'Sempre', score: 3 }
            ]
          }
        ])
      } else if (testId === '3') {
        // Teste de Ansiedade
        setTest({
          id: '3',
          title: 'Teste de Ansiedade',
          description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
          instructions: 'Para cada questão, selecione com que frequência você se sentiu assim nas últimas duas semanas.',
          timeLimit: 5,
          category: 'ANXIETY'
        })
        setQuestions([
          {
            id: '1',
            text: 'Me sinto nervoso(a), ansioso(a) ou tenso(a)',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Não consigo parar de me preocupar',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Me preocupo excessivamente com diferentes coisas',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Vários dias', score: 1 },
              { value: '2', label: 'Mais da metade dos dias', score: 2 },
              { value: '3', label: 'Quase todos os dias', score: 3 }
            ]
          }
        ])
      } else if (testId === '4') {
        // Teste de Nível de Estresse
        setTest({
          id: '4',
          title: 'Teste de Nível de Estresse',
          description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
          instructions: 'Pense como você se sentiu no último mês e responda com honestidade.',
          timeLimit: 5,
          category: 'STRESS'
        })
        setQuestions([
          {
            id: '1',
            text: 'Frequentemente me sinto estressado(a)',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Sinto que não consigo controlar as coisas importantes na minha vida',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Me sinto sobrecarregado(a) pelas responsabilidades',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          }
        ])
      } else if (testId === '5') {
        // Teste de Sofrimento Psíquico
        setTest({
          id: '5',
          title: 'Teste de Sofrimento Psíquico',
          description: 'Avalie seu nível de sofrimento emocional e psicológico geral',
          instructions: 'Responda pensando em como você se sentiu geralmente no último mês.',
          timeLimit: 12,
          category: 'DEPRESSION'
        })
        setQuestions([
          {
            id: '1',
            text: 'Me sinto triste ou deprimido(a)',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Perdi o interesse nas coisas que costumava gostar',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Me sinto ansioso(a) ou preocupado(a)',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          }
        ])
      } else if (testId === '6') {
        // Teste de TDAH - Desatenção
        setTest({
          id: '6',
          title: 'Teste de TDAH - Desatenção',
          description: 'Avalie sintomas de desatenção e dificuldade de concentração',
          instructions: 'Pense em seu comportamento nos últimos 6 meses e seja honesto(a) em suas respostas.',
          timeLimit: 10,
          category: 'ADHD'
        })
        setQuestions([
          {
            id: '1',
            text: 'Tenho dificuldade em prestar atenção em detalhes ou cometo erros por descuido',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Tenho dificuldade em manter a atenção em tarefas ou atividades',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Pareço não estar ouvindo quando falam comigo',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          }
        ])
      } else if (testId === '7') {
        // Teste de TDAH - Hiperatividade
        setTest({
          id: '7',
          title: 'Teste de TDAH - Hiperatividade',
          description: 'Identifique sintomas de hiperatividade e impulsividade',
          instructions: 'Pense em seu comportamento nos últimos 6 meses e seja honesto(a) em suas respostas.',
          timeLimit: 10,
          category: 'ADHD'
        })
        setQuestions([
          {
            id: '1',
            text: 'Sinto-me inquieto(a) ou fico mexendo as mãos/pés',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Levanto-me quando deveria estar sentado(a)',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Sinto-me como se tivesse um motor interno',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          }
        ])
      } else if (testId === '8') {
        // Teste de Fobia Social
        setTest({
          id: '8',
          title: 'Teste de Fobia Social',
          description: 'Avalie seu medo de situações sociais e como ele afeta sua vida',
          instructions: 'Pense em como você se sente em situações sociais e seja honesto(a) em suas respostas.',
          timeLimit: 8,
          category: 'ANXIETY'
        })
        setQuestions([
          {
            id: '1',
            text: 'Fico com medo ou ansioso(a) em situações sociais',
            type: 'LIKERT_SCALE',
            order: 1,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '2',
            text: 'Evito situações onde sou o centro das atenções',
            type: 'LIKERT_SCALE',
            order: 2,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          },
          {
            id: '3',
            text: 'Tenho medo de ser julgado(a) negativamente pelos outros',
            type: 'LIKERT_SCALE',
            order: 3,
            options: [
              { value: '0', label: 'Nunca', score: 0 },
              { value: '1', label: 'Raramente', score: 1 },
              { value: '2', label: 'Às vezes', score: 2 },
              { value: '3', label: 'Frequentemente', score: 3 }
            ]
          }
        ])
      } else {
        // Default test (use original mock data)
        setTest(mockTest)
        setQuestions(mockQuestions)
      }
    }

    loadTestData()
  }, [resolvedParams.id])

  useEffect(() => {
    if (isStarted && test.timeLimit && timeRemaining === null) {
      setTimeRemaining(test.timeLimit * 60) // Convert to seconds
    }
  }, [isStarted, test.timeLimit, timeRemaining])

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      handleSubmitTest()
    }
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartTest = () => {
    setIsStarted(true)
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleSubmitTest()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitTest = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error('Por favor, responda todas as perguntas')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare answers for API
      const answersArray = questions.map(question => ({
        questionId: question.id,
        value: answers[question.id] || ''
      }))

      // Call API to save results
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: test.id,
          answers: answersArray,
          userId: session?.user?.id || 'anonymous'
        })
      })

      const data = await response.json()

      if (data.success) {
        setIsCompleted(true)
        
        // Show different messages based on authentication status
        if (session) {
          toast.success('Teste concluído com sucesso! Resultado salvo no seu perfil.')
        } else {
          toast.success('Teste concluído! Faça login para salvar seus resultados permanentemente.')
        }
        
        // Also store in localStorage for demo purposes
        const testResult = {
          id: data.result.id,
          testId: test.id,
          testTitle: test.title,
          totalScore: data.result.totalScore,
          category: data.result.category,
          completedAt: data.result.completedAt,
          answers,
          maxScore: questions.reduce((sum, q) => {
            const maxOptionScore = Math.max(...q.options.map(opt => opt.score))
            return sum + maxOptionScore
          }, 0),
          interpretation: data.result.interpretation,
          recommendations: data.result.recommendations ? data.result.recommendations.split('\n') : [],
          severity: data.result.category.toLowerCase()
        }
        
        const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]')
        existingResults.push(testResult)
        localStorage.setItem('testResults', JSON.stringify(existingResults))
        
        // Redirect to results page
        setTimeout(() => {
          router.push(`/results/${data.result.id}`)
        }, 2000)
      } else {
        throw new Error(data.error || 'Failed to save test results')
      }
    } catch (error) {
      console.error('Error submitting test:', error)
      toast.error('Erro ao enviar o teste. Tente novamente.')
      
      // Fallback to localStorage if API fails
      try {
        // Calculate total score
        let totalScore = 0
        questions.forEach(question => {
          const answer = answers[question.id]
          const option = question.options.find(opt => opt.value === answer)
          if (option) {
            totalScore += option.score
          }
        })

        const testResult = {
          id: Date.now().toString(),
          testId: test.id,
          testTitle: test.title,
          totalScore,
          category: test.category,
          completedAt: new Date().toISOString(),
          answers,
          maxScore: questions.reduce((sum, q) => {
            const maxOptionScore = Math.max(...q.options.map(opt => opt.score))
            return sum + maxOptionScore
          }, 0),
          interpretation: generateInterpretation(totalScore, test.category),
          recommendations: generateRecommendations(totalScore, test.category),
          severity: determineSeverity(totalScore, test.category)
        }
        
        const existingResults = JSON.parse(localStorage.getItem('testResults') || '[]')
        existingResults.push(testResult)
        localStorage.setItem('testResults', JSON.stringify(existingResults))
        
        setIsCompleted(true)
        toast.success('Teste concluído! Resultado salvo localmente.')
        
        setTimeout(() => {
          router.push(`/results/${testResult.id}`)
        }, 2000)
      } catch (fallbackError) {
        toast.error('Erro ao salvar o resultado localmente.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Helper functions to generate complete result data
  const generateInterpretation = (score: number, category: string): string => {
    const interpretations = {
      'DEPRESSION': {
        minimal: 'PHQ-9: Pontuação 0-4 - Depressão mínima. Você apresenta poucos ou nenhum sintoma depressivo. Continue mantendo hábitos saudáveis e bem-estar mental.',
        mild: 'PHQ-9: Pontuação 5-9 - Depressão leve. Você apresenta alguns sintomas depressivos que podem afetar seu dia a dia. Considere estratégias de autocuidado e monitoramento.',
        moderate: 'PHQ-9: Pontuação 10-14 - Depressão moderada. Você apresenta sintomas depressivos significativos. Recomendamos procurar apoio profissional para avaliação e orientação.',
        severe: 'PHQ-9: Pontuação 15+ - Depressão moderadamente grave a grave. Você apresenta múltiplos sintomas depressivos que impactam significativamente sua vida. É essencial procurar ajuda profissional especializada.'
      },
      'ANXIETY': {
        minimal: 'Seus resultados indicam níveis mínimos de ansiedade. Continue com suas práticas atuais.',
        mild: 'Seus resultados indicam ansiedade leve. Técnicas de relaxamento podem ajudar.',
        moderate: 'Seus resultados indicam ansiedade moderada. Considere estratégias de manejo.',
        severe: 'Seus resultados indicam ansiedade grave. Recomendamos buscar ajuda profissional.'
      },
      'OCD': {
        minimal: 'Seus resultados indicam padrões compulsivos mínimos. Continue monitorando seus hábitos.',
        mild: 'Seus resultados indicam compulsões leves. Atenção aos gatilhos emocionais.',
        moderate: 'Seus resultados indicam compulsões moderadas. Considere estratégias de controle.',
        severe: 'Seus resultados indicam compulsões graves. Recomendamos ajuda especializada.'
      },
      'ADHD': {
        minimal: 'Seus resultados indicam sintomas mínimos de TDAH. Continue com suas rotinas.',
        mild: 'Seus resultados indicam sintomas leves de TDAH. Estratégias de organização podem ajudar.',
        moderate: 'Seus resultados indicam sintomas moderados de TDAH. Considere avaliação profissional.',
        severe: 'Seus resultados indicam sintomas graves de TDAH. Recomendamos consulta especializada.'
      },
      'STRESS': {
        minimal: 'Seus resultados indicam nível mínimo de estresse. Continue com suas práticas saudáveis.',
        mild: 'Seus resultados indicam estresse leve. Técnicas de relaxamento são recomendadas.',
        moderate: 'Seus resultados indicam estresse moderado. Considere reavaliar suas prioridades.',
        severe: 'Seus resultados indicam estresse grave. Recomendamos buscar ajuda profissional.'
      }
    }
    
    const severity = determineSeverity(score, category)
    return interpretations[category as keyof typeof interpretations]?.[severity] || 
           'Seus resultados foram processados com sucesso.'
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
      ],
      'ANXIETY': [
        'Pratique técnicas de respiração profunda',
        'Limite o consumo de cafeína',
        'Estabeleça limites saudáveis',
        'Pratique mindfulness ou meditação'
      ],
      'OCD': [
        'Identifique seus gatilhos emocionais',
        'Pratique técnicas de adiamento de compulsões',
        'Busque alternativas saudáveis para lidar com a ansiedade',
        'Estabeleça rotinas regulares'
      ],
      'ADHD': [
        'Use organizadores e lembretes',
        'Divida tarefas grandes em pequenas etapas',
        'Crie um ambiente com poucas distrações',
        'Estabeleça horários regulares para atividades'
      ],
      'STRESS': [
        'Aprenda a dizer "não" quando necessário',
        'Pratique hobbies relaxantes',
        'Estabeleça prioridades claras',
        'Reserve tempo para descanso ativo'
      ]
    }
    
    const severitySpecific = score > 10 ? [
      'Considere procurar um profissional de saúde mental',
      'Busque grupos de apoio',
      'Evite automedicação',
      'Converse com um médico sobre seus sintomas'
    ] : []
    
    return [...baseRecommendations, ...(categorySpecific[category as keyof typeof categorySpecific] || []), ...severitySpecific]
  }

  const determineSeverity = (score: number, category: string): 'minimal' | 'mild' | 'moderate' | 'severe' => {
    const thresholds = {
      'DEPRESSION': { minimal: 4, mild: 9, moderate: 14, severe: 27 }, // PHQ-9: 0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20+ severe
      'ANXIETY': { minimal: 4, mild: 9, moderate: 14, severe: 21 },
      'OCD': { minimal: 3, mild: 7, moderate: 12, severe: 20 },
      'ADHD': { minimal: 3, mild: 6, moderate: 9, severe: 12 },
      'STRESS': { minimal: 4, mild: 8, moderate: 13, severe: 20 }
    }
    
    const categoryThresholds = thresholds[category as keyof typeof thresholds] || thresholds['DEPRESSION']
    
    if (score <= categoryThresholds.minimal) return 'minimal'
    if (score <= categoryThresholds.mild) return 'mild'
    if (score <= categoryThresholds.moderate) return 'moderate'
    return 'severe'
  }

  // Remove loading state check - allow immediate access

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/tests" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-blue-900">Mental Health Tests</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Olá, {session?.user?.name || 'Usuário'}
                </span>
                <Button variant="outline" size="sm">
                  <Link href="/tests">Voltar</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

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
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
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
    )
  }

  return (
    <LayoutWrapper showHeader={false}>
      <div>
        {/* Test Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/tests" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <Brain className="h-6 w-6" />
                  <span className="font-medium">Voltar para Testes</span>
                </Link>
              </div>
              
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
            
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
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
                className="space-y-4"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base">
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
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion.id] || isSubmitting}
                  className="bg-black hover:bg-gray-800 text-white"
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
    </div>
    </LayoutWrapper>
  )
}