import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import { getCategoryLabel } from '@/lib/categories'
import { Metadata } from 'next'
import {
  Brain,
  Heart,
  Flame,
  Zap,
  Users,
  Calendar,
  ChevronRight,
  AlertTriangle,
  Eye,
  Cloud
} from 'lucide-react'

interface Test {
  id: string
  slug?: string
  title: string
  description: string
  category: string
  timeLimit?: number
  instructions?: string
  questionCount?: number
  difficulty?: string
  estimatedTime?: string
}

interface TestCategory {
  id: string
  slug: string
  title: string
  description: string
  icon: any
  color: string
  tests: string[]
  image: string
}

const testCategories: TestCategory[] = [
  {
    id: 'depression',
    slug: 'teste-de-depressao',
    title: 'Teste de Depressão',
    description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
    icon: Brain,
    color: 'bg-blue-500',
    tests: ['Teste de Depressão', 'Teste de Sofrimento Psíquico'],
    image: '/images/depression-therapy.jpg'
  },
  {
    id: 'anxiety',
    slug: 'teste-de-ansiedade',
    title: 'Teste de Ansiedade',
    description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
    icon: Heart,
    color: 'bg-cyan-500',
    tests: ['Teste de Ansiedade', 'Teste de Fobia Social'],
    image: '/images/anxiety-meditation.jpg'
  },
  {
    id: 'compulsion',
    slug: 'teste-de-compulsao-alimentar',
    title: 'Teste de Compulsão Alimentar',
    description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
    icon: Flame,
    color: 'bg-orange-500',
    tests: ['Teste de Compulsão Alimentar'],
    image: '/images/healthy-eating.jpg'
  },
  {
    id: 'adhd',
    slug: 'teste-de-tdah',
    title: 'Teste de TDAH',
    description: 'Avalie sintomas de desatenção, hiperatividade e impulsividade',
    icon: Zap,
    color: 'bg-yellow-500',
    tests: ['Teste de TDAH - Desatenção', 'Teste de TDAH - Hiperatividade'],
    image: '/images/adhd-focus.jpg'
  },
  {
    id: 'stress',
    slug: 'teste-de-estresse',
    title: 'Teste de Estresse',
    description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
    icon: Users,
    color: 'bg-red-500',
    tests: ['Teste de Nível de Estresse'],
    image: '/images/stress-management.jpg'
  },
  {
    id: 'burnout',
    slug: 'teste-de-burnout',
    title: 'Teste de Burnout',
    description: 'Identifique sinais de esgotamento profissional e impacto na sua qualidade de vida',
    icon: Flame,
    color: 'bg-red-600',
    tests: ['Teste de Burnout Profissional', 'Teste de Esgotamento'],
    image: '/images/burnout-work.jpg'
  },
  {
    id: 'panic',
    slug: 'teste-transtorno-de-panico',
    title: 'Teste Transtorno de Pânico',
    description: 'Avalie sintomas de crises de pânico e ansiedade aguda para entender melhor sua condição',
    icon: AlertTriangle,
    color: 'bg-purple-500',
    tests: ['Teste de Transtorno de Pânico', 'Avaliação de Crises de Ansiedade'],
    image: '/images/panic-disorder.jpg'
  },
  {
    id: 'social-phobia',
    slug: 'teste-fobia-social',
    title: 'Teste Fobia Social',
    description: 'Identifique medos e ansiedade em situações sociais e seu impacto na vida cotidiana',
    icon: Eye,
    color: 'bg-indigo-500',
    tests: ['Teste de Fobia Social', 'Avaliação de Ansiedade Social'],
    image: '/images/social-phobia.jpg'
  },
  {
    id: 'mental-suffering',
    slug: 'grau-de-sofrimento-mental',
    title: 'Grau de Sofrimento Mental',
    description: 'Meça o nível de sofrimento psíquico e seu impacto no bem-estar geral',
    icon: Cloud,
    color: 'bg-gray-600',
    tests: ['Teste de Sofrimento Mental', 'Avaliação de Distresse Psicológico'],
    image: '/images/mental-suffering.jpg'
  }
]

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Testes Psicológicos Online | Mental Saúde',
  description: 'Testes psicológicos gratuitos e validados para depressão, ansiedade, estresse e TDAH. Resultados imediatos com orientações baseadas em evidências científicas.',
  keywords: ['testes psicológicos', 'avaliação mental', 'saúde mental', 'depressão', 'ansiedade', 'testes online'],
}

export default async function TestesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-100">Testes Psicológicos</p>
            <h1 className="text-4xl md:text-5xl font-bold">Avaliações completas para entender sua saúde mental</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Cada teste foi desenvolvido para identificar sinais, gerar recomendações e ajudar você a tomar decisões
              conscientes sobre autocuidado. Escolha o que mais faz sentido e comece agora.
            </p>
          </div>
        </div>
      </div>

      {/* Test Categories Grid - Cloned from Home */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todos os Nossos Testes Psicológicos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Avaliações profissionais abrangentes para compreender melhor sua saúde mental e bem-estar emocional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-black flex flex-col h-80 rounded-xl">
                  {/* Card Image Section - Top Portion */}
                  <div className="relative h-48 overflow-hidden -mt-6 -mx-6">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* FREE Badge */}
                    <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg transition-all duration-300 hover:scale-105">
                      GRATUITO
                    </div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <IconComponent className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <CardContent className="px-6 pb-4 pt-3 space-y-3 flex flex-col flex-grow -mt-2">
                    {/* Category Title */}
                    <h3 className="font-bold text-black text-base leading-tight">
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Test Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                      <span className="flex items-center space-x-1">
                        <Brain className="h-3 w-3 text-black" />
                        <span>{category.tests.length} teste{category.tests.length > 1 ? 's' : ''}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-black" />
                        <span>10-15 min</span>
                      </span>
                    </div>
                    
                    {/* Spacer to push button to bottom */}
                    <div className="flex-grow"></div>
                    
                    {/* Start Test Button */}
                    <Link href={`/testes/${category.slug}`}>
                      <Button 
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 hover:scale-105"
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
        </div>
      </section>
    </div>
  )
}
