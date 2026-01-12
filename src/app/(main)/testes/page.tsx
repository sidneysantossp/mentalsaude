'use client'

import { useState, useEffect } from 'react'
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
  Cloud,
  Star,
  Shield
} from 'lucide-react'
import type { TestDetail, TestSummary } from '@/types/tests'
import { DEFAULT_TEST_SUMMARIES } from '@/lib/test-fallback'
import { CATEGORY_META, DEFAULT_CATEGORY_META } from '@/lib/test-category-meta'

export const metadata: Metadata = {
  title: 'Testes Psicológicos Online | Mental Saúde',
  description: 'Testes psicológicos gratuitos e validados para depressão, ansiedade, estresse e TDAH. Resultados imediatos com orientações baseadas em evidências científicas.',
  keywords: ['testes psicológicos', 'avaliação mental', 'saúde mental', 'depressão', 'ansiedade', 'testes online'],
}

export default function TestesPage() {
  const [testsList, setTestsList] = useState<TestSummary[]>(DEFAULT_TEST_SUMMARIES)

  useEffect(() => {
    let isMounted = true

    const loadTests = async () => {
      try {
        const response = await fetch('/api/tests')
        if (!response.ok) {
          throw new Error('Falha ao carregar os testes')
        }

        const data = (await response.json()) as TestSummary[]
        if (isMounted && Array.isArray(data) && data.length) {
          setTestsList(data)
        }
      } catch (error) {
        console.error('Erro ao carregar testes:', error)
      }
    }

    loadTests()

    return () => {
      isMounted = false
    }
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden text-white">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-therapy-background.jpg"
              alt="Saúde Mental e Bem-Estar"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-4">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold mb-4 shadow-lg hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 transition-all duration-300">
                <Brain className="h-3 w-3 mr-2" />
                Testes Psicológicos Gratuitos e Validados
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
              Avaliações completas para entender sua saúde mental
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
              Cada teste foi desenvolvido para identificar sinais, gerar recomendações e ajudar você a tomar decisões conscientes sobre autocuidado. Escolha o que mais faz sentido e comece agora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white text-base px-8 py-3 h-auto font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Link href="/auth/signup" className="flex items-center">
                  Criar Conta Gratuita
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-3 h-auto border-2 border-white text-white hover:bg-white hover:text-black hover:border-white font-bold transition-all duration-300 rounded-xl"
              >
                <Link href="#tests" className="text-white hover:text-black">
                  Conhecer os Testes
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">+10.000 Usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">4.9 Avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">100% Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Categories Grid - Cloned from Home */}
      <section id="tests" className="py-16">
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
            {testsList.map((test) => {
              const meta = CATEGORY_META[test.category] ?? DEFAULT_CATEGORY_META
              const IconComponent = meta.icon
              const imageSrc = test.cardImage ?? '/images/hero-therapy-background.jpg'
              const categoryLabel = getCategoryLabel(test.category)

              return (
                <Card key={test.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-black flex flex-col h-96 rounded-xl">
                  <div className="relative h-48 overflow-hidden -mt-6 -mx-6">
                    <Image
                      src={imageSrc}
                      alt={test.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    <div className={`absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white ${meta.accent}`}>
                      <IconComponent className="h-4 w-4" />
                      <span>{categoryLabel}</span>
                    </div>
                  </div>

                  <CardContent className="px-6 pb-4 pt-3 space-y-3 flex flex-col flex-grow -mt-2">
                    <h3 className="font-bold text-black text-base leading-tight">
                      {test.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {test.shortDescription ?? test.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                      <span className="flex items-center space-x-1">
                        <Brain className="h-3 w-3 text-black" />
                        <span>{test.questionCount ?? '—'} teste{(test.questionCount ?? 1) > 1 ? 's' : ''}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-black" />
                        <span>{test.timeLimit ? `${test.timeLimit} min` : 'Sem limite'}</span>
                      </span>
                    </div>

                    <div className="flex-grow"></div>

                    <Link href={`/testes/${test.slug}`}>
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
