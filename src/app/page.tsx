'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Calendar, ChevronRight, ChevronDown, ChevronUp, Lock, Shield, Star } from 'lucide-react'
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
  Heart: Brain,
  Flame: Brain,
  Zap: Brain,
  Shield,
  AlertTriangle: Brain,
  Eye: Brain,
  Cloud: Brain,
  Star,
  Moon: Brain,
  Users: Brain
}

const faqData = [
  {
    id: 1,
    question: "Os testes são realmente gratuitos?",
    answer: "Sim! Todos os nossos testes psicológicos são 100% gratuitos. Não há custos ocultos, assinaturas ou pagamentos necessários para acessar qualquer um dos testes disponíveis em nossa plataforma."
  },
  {
    id: 2,
    question: "Quanto tempo demora para fazer um teste?",
    answer: "O tempo médio varia de 10 a 15 minutos por teste, dependendo da complexidade e do número de questões. Cada teste informa o tempo estimado antes de você começar, para que possa se organizar melhor."
  },
  {
    id: 3,
    question: "Os resultados são imediatos?",
    answer: "Sim! Após finalizar qualquer teste, você recebe seus resultados imediatamente. Nossa plataforma gera um relatório detalhado com suas pontuações, interpretações e recomendações personalizadas."
  },
  {
    id: 4,
    question: "Os testes são cientificamente validados?",
    answer: "Absolutamente. Todos os nossos testes são baseados em instrumentos científicos validados pela comunidade acadêmica internacional, como PHQ-9 para depressão, GAD-7 para ansiedade, e outras escalas reconhecidas mundialmente."
  },
  {
    id: 5,
    question: "Meus dados estão seguros e confidenciais?",
    answer: "Sim, sua privacidade é nossa prioridade. Todos os dados são criptografados e protegidos conforme a LGPD. Seus resultados são confidenciais e não compartilhamos informações pessoais com terceiros sem seu consentimento explícito."
  }
]

export default function Home() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(false) // Changed to false initially
  const [openItems, setOpenItems] = useState<number[]>([])

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
      // Set empty array on error to stop loading
      setTests([])
    } finally {
      setLoading(false)
    }
  }

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-white">
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <Brain className="h-4 w-4 mr-2" />
                Testes Psicológicos Gratuitos e Validados
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Avalie Sua
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent block">Saúde Mental</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Testes gratuitos e confiáveis para compreender melhor seu bem-estar emocional. 
              Resultados imediatos baseados em instrumentos científicos validados.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-base px-8 py-3 h-auto font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl">
                <Link href="/testes" className="flex items-center">
                  Iniciar Avaliação
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-3 h-auto border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold transition-all duration-300 rounded-xl">
                <Link href="/testes">Conhecer os Testes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section id="tests" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Testes Psicológicos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Avaliações profissionais abrangentes para compreender melhor sua saúde mental e bem-estar emocional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="animate-pulse border border-gray-200 bg-white flex flex-col h-80 rounded-xl">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="px-6 pb-4 pt-3 space-y-3 flex flex-col flex-grow">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex-grow"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              tests.slice(0, 8).map((test) => {
                const IconComponent = iconMap[test.icon as keyof typeof iconMap] || Brain
                return (
                  <Card key={test.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-gray-400 flex flex-col h-80 rounded-xl">
                    {/* Card Image Section - Top Portion */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-200/40 via-transparent to-transparent"></div>
                      
                      {/* FREE Badge */}
                      <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                        GRATUITO
                      </div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <IconComponent className="h-5 w-5 text-black" />
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <CardContent className="px-6 pb-4 pt-3 space-y-3 flex flex-col flex-grow">
                      {/* Category Title */}
                      <h3 className="font-bold text-black text-base leading-tight">
                        {test.title}
                      </h3>

                      {/* Test Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                        <span className="flex items-center space-x-1">
                          <Brain className="h-3 w-3 text-black" />
                          <span>{test.questionCount} pergunta{test.questionCount !== 1 ? 's' : ''}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-black" />
                          <span>{test.estimatedTime}</span>
                        </span>
                      </div>
                      
                      {/* Spacer to push button to bottom */}
                      <div className="flex-grow"></div>
                      
                      {/* Start Test Button */}
                      <Link href={`/testes/${test.category.toLowerCase().replace('_', '-')}`}>
                        <Button 
                          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span>Iniciar Teste</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Lock className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Dados Seguros</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Criptografia avançada e proteção total das suas informações</p>
              </div>
            </div>
            
            <div className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Testes Validados</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Instrumentos científicos reconhecidos internacionalmente</p>
              </div>
            </div>
            
            <div className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Acompanhamento</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Monitore sua evolução com relatórios detalhados</p>
              </div>
            </div>
            
            <div className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center">
                  <Star className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Gratuito</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Acesso livre a todos os testes sem custos ocultos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos testes e serviços
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4 pt-0">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}