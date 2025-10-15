'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Heart, Flame, Zap, Shield, Calendar, Lock, ChevronRight, AlertTriangle, Eye, Cloud } from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

const testCategories = [
  {
    id: 'depression',
    title: 'Teste de Depressão',
    description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
    icon: Brain,
    color: 'bg-blue-500',
    tests: ['Teste de Depressão', 'Teste de Sofrimento Psíquico'],
    image: '/images/depression-therapy.jpg',
    time: '10 min',
    questions: '9 q',
    difficulty: 'Fácil'
  },
  {
    id: 'anxiety',
    title: 'Teste de Ansiedade',
    description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
    icon: Heart,
    color: 'bg-cyan-500',
    tests: ['Teste de Ansiedade', 'Teste de Fobia Social'],
    image: '/images/anxiety-meditation.jpg',
    time: '5 min',
    questions: '7 q',
    difficulty: 'Fácil'
  },
  {
    id: 'compulsion',
    title: 'Teste de Compulsão Alimentar',
    description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
    icon: Flame,
    color: 'bg-orange-500',
    tests: ['Teste de Compulsão Alimentar'],
    image: '/images/healthy-eating.jpg',
    time: '15 min',
    questions: '12 q',
    difficulty: 'Médio'
  },
  {
    id: 'adhd',
    title: 'Teste de TDAH',
    description: 'Avalie sintomas de desatenção, hiperatividade e impulsividade',
    icon: Zap,
    color: 'bg-yellow-500',
    tests: ['Teste de TDAH - Desatenção', 'Teste de TDAH - Hiperatividade'],
    image: '/images/adhd-focus.jpg',
    time: '12 min',
    questions: '18 q',
    difficulty: 'Médio'
  },
  {
    id: 'stress',
    title: 'Teste de Estresse',
    description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
    icon: Shield,
    color: 'bg-red-500',
    tests: ['Teste de Nível de Estresse'],
    image: '/images/stress-management.jpg',
    time: '5 min',
    questions: '10 q',
    difficulty: 'Fácil'
  },
  {
    id: 'panic',
    title: 'Teste Transtorno de Pânico',
    description: 'Avalie sintomas de crises de pânico e ansiedade aguda para entender melhor sua condição',
    icon: AlertTriangle,
    color: 'bg-purple-500',
    tests: ['Teste de Transtorno de Pânico', 'Avaliação de Crises de Ansiedade'],
    image: '/images/panic-disorder.jpg',
    time: '8 min',
    questions: '15 q',
    difficulty: 'Médio'
  },
  {
    id: 'social-phobia',
    title: 'Teste Fobia Social',
    description: 'Identifique medos e ansiedade em situações sociais e seu impacto na vida cotidiana',
    icon: Eye,
    color: 'bg-indigo-500',
    tests: ['Teste de Fobia Social', 'Avaliação de Ansiedade Social'],
    image: '/images/social-phobia.jpg',
    time: '10 min',
    questions: '17 q',
    difficulty: 'Médio'
  },
  {
    id: 'mental-suffering',
    title: 'Grau de Sofrimento Mental',
    description: 'Meça o nível de sofrimento psíquico e seu impacto no bem-estar geral',
    icon: Cloud,
    color: 'bg-gray-600',
    tests: ['Teste de Sofrimento Mental', 'Avaliação de Distresse Psicológico'],
    image: '/images/mental-suffering.jpg',
    time: '12 min',
    questions: '20 q',
    difficulty: 'Difícil'
  }
]

export default function TestsPage() {
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
        </div>

        {/* Test Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-yellow-500 hover:-translate-y-1 flex flex-col h-full">
                {/* Card Image Section - Top Portion */}
                <div className="relative h-48 overflow-hidden m-0 p-0">
                  <img 
                    src={category.image} 
                    alt={category.title}
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
                    {category.title}
                  </h3>
                  
                  {/* Category Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Test Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Brain className="h-3 w-3" />
                        <span>{category.tests.length} teste{category.tests.length > 1 ? 's' : ''}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{category.time}</span>
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.difficulty}
                    </Badge>
                  </div>
                  
                  {/* Test Details */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{category.questions} perguntas</span>
                    <span>•</span>
                    <span>{category.time}</span>
                  </div>
                  
                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>
                  
                  {/* Start Test Button */}
                  <Link href={`/tests/${category.id === 'depression' ? '1' : category.id === 'compulsion' ? '2' : category.id === 'anxiety' ? '3' : category.id === 'stress' ? '4' : category.id === 'mental-suffering' ? '5' : category.id}`}>
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