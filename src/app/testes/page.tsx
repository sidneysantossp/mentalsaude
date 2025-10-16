'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Heart, 
  Flame, 
  Zap, 
  Shield, 
  Calendar, 
  Lock, 
  ChevronRight, 
  AlertTriangle, 
  Eye, 
  Cloud, 
  Loader2, 
  Star,
  Users,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Award
} from 'lucide-react'
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

// Configuração das categorias para landing pages
const categoryConfig = {
  'compulsao-alimentar': {
    title: 'Compulsão Alimentar',
    description: 'Avaliação de transtorno alimentar com a Binge Eating Scale',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    stats: { users: '2.3k', time: '15 min', accuracy: '95%' }
  },
  'depressao': {
    title: 'Depressão',
    description: 'Teste PHQ-9 para avaliação de sintomas depressivos',
    icon: Brain,
    color: 'from-blue-500 to-indigo-600',
    stats: { users: '5.1k', time: '10 min', accuracy: '97%' }
  },
  'depressao-maior': {
    title: 'Depressão Maior',
    description: 'Avaliação completa baseada nos critérios DSM-5',
    icon: AlertTriangle,
    color: 'from-gray-600 to-gray-800',
    stats: { users: '1.8k', time: '20 min', accuracy: '96%' }
  },
  'fobia-social': {
    title: 'Fobia Social',
    description: 'Avaliação de ansiedade social com a escala LSAS',
    icon: Users,
    color: 'from-purple-500 to-purple-700',
    stats: { users: '3.2k', time: '15 min', accuracy: '94%' }
  },
  'insonia': {
    title: 'Insônia',
    description: 'Avaliação de distúrbios do sono com o ISI',
    icon: Moon,
    color: 'from-indigo-500 to-blue-600',
    stats: { users: '2.7k', time: '10 min', accuracy: '95%' }
  },
  'burnout': {
    title: 'Burnout',
    description: 'Avaliação de esgotamento profissional com MBI',
    icon: Zap,
    color: 'from-orange-500 to-red-600',
    stats: { users: '4.5k', time: '15 min', accuracy: '96%' }
  },
  'estresse': {
    title: 'Estresse',
    description: 'Medição de níveis de estresse com a PSS',
    icon: Flame,
    color: 'from-yellow-500 to-orange-600',
    stats: { users: '6.2k', time: '10 min', accuracy: '95%' }
  },
  'sindrome-impostor': {
    title: 'Síndrome do Impostor',
    description: 'Avaliação de sentimentos de fraude profissional',
    icon: Target,
    color: 'from-teal-500 to-cyan-600',
    stats: { users: '1.9k', time: '15 min', accuracy: '93%' }
  },
  'tdah': {
    title: 'TDAH',
    description: 'Teste ASRS para TDAH em adultos',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    stats: { users: '3.8k', time: '15 min', accuracy: '96%' }
  },
  'toc': {
    title: 'TOC',
    description: 'Avaliação de transtorno obsessivo-compulsivo',
    icon: Shield,
    color: 'from-violet-500 to-purple-600',
    stats: { users: '2.1k', time: '20 min', accuracy: '97%' }
  },
  'transtorno-afetivo-bipolar': {
    title: 'Transtorno Bipolar',
    description: 'Avaliação de humor com o MDQ',
    icon: Sun,
    color: 'from-pink-500 to-purple-600',
    stats: { users: '1.5k', time: '15 min', accuracy: '94%' }
  },
  'transtorno-ansiedade': {
    title: 'Transtorno de Ansiedade',
    description: 'Teste GAD-7 para ansiedade generalizada',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    stats: { users: '4.8k', time: '10 min', accuracy: '96%' }
  }
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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

  // Agrupar testes por categoria
  const testsByCategory = tests.reduce((acc, test) => {
    const categoryKey = test.category.toLowerCase().replace('_', '-')
    if (!acc[categoryKey]) {
      acc[categoryKey] = []
    }
    acc[categoryKey].push(test)
    return acc
  }, {} as Record<string, Test[]>)

  const categories = Object.keys(categoryConfig)

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6">
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 text-sm">
                  <Brain className="w-4 h-4 mr-2" />
                  12 Categorias Disponíveis
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Testes Psicológicos
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent block">
                  Validados e Gratuitos
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Avaliações profissionais baseadas em instrumentos científicos reconhecidos internacionalmente. 
                Resultados imediatos e 100% confidenciais.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">40k+</div>
                  <div className="text-sm text-gray-600">Testes Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">Categorias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Precisão</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Gratuito</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Escolha sua Avaliação
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Selecione a categoria que melhor corresponde às suas preocupações atuais
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {categories.map((categoryKey) => {
                const config = categoryConfig[categoryKey as keyof typeof categoryConfig]
                const categoryTests = testsByCategory[categoryKey] || []
                const IconComponent = config.icon

                return (
                  <Link key={categoryKey} href={categoryTests.length > 0 ? `/testes/${categoryKey}/${categoryTests[0].slug}` : `/testes/${categoryKey}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-gray-400 cursor-pointer hover:-translate-y-1">
                      {/* Header */}
                      <div className={`relative h-32 bg-gradient-to-br ${config.color} p-6`}>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-white text-xs font-semibold">
                            {categoryTests.length} teste{categoryTests.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <IconComponent className="w-12 h-12 text-white mb-2" />
                        <h3 className="text-xl font-bold text-white">{config.title}</h3>
                      </div>
                      
                      {/* Content */}
                      <CardContent className="p-6">
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {config.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{config.stats.users}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{config.stats.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            <span>{config.stats.accuracy}</span>
                          </div>
                        </div>
                        
                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            GRATUITO
                          </Badge>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como Funciona
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Processo simples em 3 passos para obter sua avaliação completa
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Escolha a Categoria</h3>
                <p className="text-sm text-gray-600">
                  Selecione a avaliação que melhor corresponde às suas preocupações
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Faça o Teste</h3>
                <p className="text-sm text-gray-600">
                  Responda honestamente em 10-20 minutos
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Receba Resultados</h3>
                <p className="text-sm text-gray-600">
                  Análise detalhada com orientações personalizadas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">Dados 100% Seguros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">Testes Validados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold">Resultados Imediatos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">Totalmente Gratuito</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  )
}