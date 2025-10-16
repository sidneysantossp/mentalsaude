'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Heart, Flame, Zap, Shield, Calendar, Lock, ChevronRight, AlertTriangle, Eye, Cloud, Loader2, Star } from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

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

const iconMap = {
  Brain,
  Heart,
  Flame,
  Zap,
  Shield,
  AlertTriangle,
  Eye,
  Cloud,
  Star
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tests')
      
      if (!response.ok) {
        throw new Error('Erro ao buscar testes')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setTests(data.data)
      } else {
        throw new Error(data.error || 'Erro desconhecido')
      }
    } catch (err) {
      console.error('Erro ao carregar testes:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar testes')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Carregando testes...</p>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (error) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <AlertTriangle className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={fetchTests} variant="outline">
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Testes Psicológicos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Avaliações profissionais abrangentes para compreender melhor sua saúde mental e bem-estar emocional. 
            Todos os testes são gratuitos e baseados em instrumentos cientificamente validados.
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              {tests.length} teste{tests.length !== 1 ? 's' : ''} disponível{tests.length !== 1 ? 'is' : ''}
            </Badge>
          </div>
        </div>

        {/* Test Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tests.map((test) => {
            const IconComponent = iconMap[test.icon as keyof typeof iconMap] || Brain
            return (
              <Card key={test.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-yellow-500 hover:-translate-y-1 flex flex-col h-full">
                {/* Card Image Section - Top Portion */}
                <div className="relative h-48 overflow-hidden m-0 p-0">
                  <img 
                    src={test.image} 
                    alt={test.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* FREE Badge */}
                  <div className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-md border-0 shadow-lg">
                    GRATUITO
                  </div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                
                {/* Card Content */}
                <CardContent className="px-6 pb-6 pt-4 space-y-4 flex flex-col flex-grow">
                  {/* Category Title */}
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {test.title}
                  </h3>
                  
                  {/* Category Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {test.description}
                  </p>

                  {/* Test Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Brain className="h-3 w-3" />
                        <span>{test.questionCount} pergunta{test.questionCount !== 1 ? 's' : ''}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{test.estimatedTime}</span>
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {test.difficulty}
                    </Badge>
                  </div>
                  
                  {/* Test Details */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{test.questions} perguntas</span>
                    <span>•</span>
                    <span>{test.estimatedTime}</span>
                  </div>
                  
                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>
                  
                  {/* Start Test Button */}
                  <Link href={`/testes/${test.category.toLowerCase().replace('_', '-')}`}>
                    <Button 
                      variant="outline" 
                      className="w-full border-black bg-black text-white hover:bg-gray-800 hover:text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Iniciar Teste</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Information Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Como Nossos Testes Funcionam
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Escolha o Teste</h3>
                <p className="text-sm text-gray-600">
                  Selecione o teste que melhor corresponde às suas preocupações atuais
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Responda às Perguntas</h3>
                <p className="text-sm text-gray-600">
                  Seja honesto(a) em suas respostas para obter resultados precisos
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Receba Resultados</h3>
                <p className="text-sm text-gray-600">
                  Obtenha uma análise detalhada com recomendações personalizadas
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Dados Seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Testes Validados</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>Resultados Imediatos</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Acompanhamento Gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}