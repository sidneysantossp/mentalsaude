'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Shield, 
  Star,
  ChevronRight,
  Play,
  BookOpen,
  Heart,
  Activity,
  Zap,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Phone,
  Calendar,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { Test } from '@prisma/client'
import VoiceSearchContent from './VoiceSearchContent'
import PerformanceOptimizer, { OptimizedImage } from './PerformanceOptimizer'

interface TestCategoryLandingProps {
  test?: {
    id: string
    title: string
    description: string
    category: string
    timeLimit?: number
    questionCount: number
    estimatedTime: string
    questions: string
    difficulty: string
    icon: string
    color: string
    image: string
    instructions: string
    isActive: boolean
    slug: string
  }
  config: {
    title: string
    description: string
    keywords: string[]
    symptoms: string[]
    treatments: string[]
    faq: Array<{ question: string; answer: string }>
    howTo: Array<{ step: number; instruction: string }>
  }
  canonicalUrl?: string
  category?: string
  tests?: any[]
}

const iconMap: Record<string, any> = {
  'compulsao-alimentar': Heart,
  'depressao': Brain,
  'depressao-maior': AlertCircle,
  'fobia-social': Users,
  'insonia': Moon,
  'burnout': Zap,
  'estresse': Activity,
  'sindrome-impostor': Target,
  'tdah': TrendingUp,
  'toc': Shield,
  'transtorno-afetivo-bipolar': Sun,
  'transtorno-ansiedade': AlertCircle
}

const colorMap: Record<string, string> = {
  'compulsao-alimentar': 'from-pink-500 to-rose-600',
  'depressao': 'from-blue-500 to-indigo-600',
  'depressao-maior': 'from-gray-600 to-gray-800',
  'fobia-social': 'from-purple-500 to-purple-700',
  'insonia': 'from-indigo-500 to-blue-600',
  'burnout': 'from-orange-500 to-red-600',
  'estresse': 'from-yellow-500 to-orange-600',
  'sindrome-impostor': 'from-teal-500 to-cyan-600',
  'tdah': 'from-green-500 to-emerald-600',
  'toc': 'from-violet-500 to-purple-600',
  'transtorno-afetivo-bipolar': 'from-pink-500 to-purple-600',
  'transtorno-ansiedade': 'from-amber-500 to-orange-600'
}

export default function TestCategoryLanding({ 
  test, 
  config, 
  canonicalUrl,
  category,
  tests 
}: TestCategoryLandingProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [testStarted, setTestStarted] = useState(false)
  const [stats, setStats] = useState({
    totalTests: 0,
    averageTime: '10-15 min',
    accuracy: '95%'
  })

  // Usar category do test ou da prop
  const currentCategory = test?.category || category || 'depressao'
  const IconComponent = iconMap[currentCategory] || Brain
  const gradientClass = colorMap[currentCategory] || 'from-blue-500 to-purple-600'

  useEffect(() => {
    // Simular estatísticas
    setStats({
      totalTests: tests.reduce((acc, test) => acc + test._count.testResults, 0) + 1234,
      averageTime: tests.length > 0 
        ? `${Math.round(tests.reduce((acc, test) => acc + (test.timeLimit || 10), 0) / tests.length)} min`
        : '10-15 min',
      accuracy: '95%'
    })
  }, [tests])

  const handleStartTest = () => {
    if (test) {
      // Redirecionar para a página do teste específico
      window.location.href = `/testes/${test.category.toLowerCase().replace('_', '-')}/${test.slug}`
    } else if (tests && tests.length > 0) {
      // Redirecionar para o primeiro teste disponível
      window.location.href = `/testes/${tests[0].id}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Badge className={`bg-gradient-to-r ${gradientClass} text-white px-3 py-1`}>
                  <IconComponent className="w-4 h-4 mr-2" />
                  Teste Validado
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  100% Gratuito
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {config.title.split(' | ')[0]}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {config.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  onClick={handleStartTest}
                  className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white text-lg px-8 py-4 h-auto font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl`}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Fazer Teste Agora
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold transition-all duration-300 rounded-xl">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Saiba Mais
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalTests.toLocaleString('pt-BR')}+</div>
                  <div className="text-sm text-gray-600">Testes Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.averageTime}</div>
                  <div className="text-sm text-gray-600">Duração Média</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.accuracy}</div>
                  <div className="text-sm text-gray-600">Precisão</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`bg-gradient-to-br ${gradientClass} rounded-3xl p-8 shadow-2xl`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                  <IconComponent className="w-16 h-16 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Avaliação Completa</h3>
                  <p className="text-white/90 mb-4">
                    Teste baseado em instrumentos científicos validados pela comunidade médica internacional.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Resultados imediatos</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>100% confidencial</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Orientações personalizadas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Visão Geral', icon: Brain },
              { id: 'symptoms', label: 'Sintomas', icon: AlertCircle },
              { id: 'howto', label: 'Como Funciona', icon: Play },
              { id: 'faq', label: 'Dúvidas', icon: MessageCircle }
            ].map((tab) => {
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-transparent text-gray-900 bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent`
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <TabIcon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-4 py-16">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre esta Avaliação</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Nossa avaliação de {currentCategory.replace('-', ' ')} foi desenvolvida por profissionais de saúde mental 
                    utilizando instrumentos científicos validados internacionalmente. Este teste ajuda a identificar 
                    padrões e sintomas que podem indicar a necessidade de acompanhamento profissional.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">O que será avaliado:</h3>
                  <ul className="space-y-3">
                    {config.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Abordagens de Tratamento</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {config.treatments.map((treatment, index) => (
                    <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-blue-500 mr-3" />
                          <span className="text-gray-700">{treatment}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Quick Start Card */}
              <Card className="border-2 border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Iniciar Rápido</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {stats.averageTime} de duração
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {stats.totalTests.toLocaleString('pt-BR')} pessoas já testaram
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      100% gratuito e confidencial
                    </div>
                  </div>
                  <Button 
                    onClick={handleStartTest}
                    className={`w-full mt-6 bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white font-bold`}
                  >
                    Começar Teste
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Help Card */}
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Precisa de Ajuda?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Se estiver em crise, entre em contato imediatamente com profissionais.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      CVV: 188
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat Online
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Principais Sintomas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.symptoms.map((symptom, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${gradientClass} flex items-center justify-center mr-4`}>
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Sintoma {index + 1}</h3>
                        <p className="text-gray-600 text-sm">{symptom}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* How To Tab */}
        {activeTab === 'howto' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Como Funciona o Teste</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {config.howTo.map((step) => (
                  <div key={step.step} className="flex items-start">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0`}>
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Passo {step.step}
                      </h3>
                      <p className="text-gray-600">{step.instruction}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Dicas para o Teste</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Seja Honesto</h4>
                      <p className="text-sm text-gray-600">Responda com sinceridade para obter resultados precisos.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Ambiente Calmo</h4>
                      <p className="text-sm text-gray-600">Escolha um lugar tranquilo onde não será interrompido.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Sem Pressa</h4>
                      <p className="text-sm text-gray-600">Leve o tempo necessário para refletir sobre cada pergunta.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {config.faq.map((item, index) => (
                <Card key={index} className="border border-gray-200">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{item.question}</span>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4 pt-0">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
        {/* Voice Search & SGE Content */}
        <div className="mt-12">
          <VoiceSearchContent category={category} />
        </div>

        {/* Performance Metrics */}
        <div className="mt-12">
          <PerformanceOptimizer />
        </div>
      </section>

      {/* CTA Section */}
      <section className={`bg-gradient-to-r ${gradientClass} py-16`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para entender melhor sua saúde mental?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Faça nossa avaliação gratuita e receba orientações personalizadas para cuidar do seu bem-estar.
          </p>
          <Button 
            size="lg"
            onClick={handleStartTest}
            className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 h-auto font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
          >
            <Play className="w-5 h-5 mr-2" />
            Iniciar Avaliação Gratuita
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Related Tests */}
      {tests.length > 1 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Outros Testes Relacionados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.slice(1, 4).map((test) => (
                <Card key={test.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{test.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{test.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {test.questions.length} perguntas
                      </span>
                      <Link href={`/testes/${test.id}`}>
                        <Button variant="outline" size="sm">
                          Fazer Teste
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}