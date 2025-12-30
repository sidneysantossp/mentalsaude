import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import { getCategoryLabel } from '@/lib/categories'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Testes Psicológicos Online | Mental Saúde',
  description: 'Testes psicológicos gratuitos e validados para depressão, ansiedade, estresse e TDAH. Resultados imediatos com orientações baseadas em evidências científicas.',
  keywords: ['testes psicológicos', 'avaliação mental', 'saúde mental', 'depressão', 'ansiedade', 'testes online'],
}

async function getTests() {
  // Return mock data directly to avoid build issues
  return [
    {
      id: 'depression',
      slug: 'teste-de-depressao',
      title: 'Teste de Depressão',
      description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
      category: 'DEPRESSION',
      timeLimit: 10,
      instructions: 'Para cada questão, selecione a resposta que melhor descreve com que frequência você teve este problema nas últimas 2 semanas.',
      questionCount: 9,
      difficulty: 'Fácil',
      estimatedTime: '10 min'
    },
    {
      id: 'anxiety',
      slug: 'teste-de-ansiedade',
      title: 'Teste de Ansiedade',
      description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
      category: 'ANXIETY',
      timeLimit: 5,
      instructions: 'Para cada questão, selecione com que frequência você se sentiu assim nas últimas duas semanas.',
      questionCount: 7,
      difficulty: 'Fácil',
      estimatedTime: '5 min'
    },
    {
      id: 'compulsion',
      slug: 'teste-de-compulsao-alimentar',
      title: 'Teste de Compulsão Alimentar',
      description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
      category: 'OCD',
      timeLimit: 15,
      instructions: 'Para cada questão, seja honesto(a) sobre seus hábitos alimentares e sentimentos relacionados.',
      questionCount: 12,
      difficulty: 'Médio',
      estimatedTime: '15 min'
    },
    {
      id: 'adhd',
      slug: 'teste-de-tdah',
      title: 'Teste de TDAH',
      description: 'Avalie sintomas de desatenção, hiperatividade e impulsividade',
      category: 'ADHD',
      timeLimit: 12,
      instructions: 'Pense em seu comportamento nos últimos 6 meses e responda com honestidade.',
      questionCount: 18,
      difficulty: 'Médio',
      estimatedTime: '12 min'
    },
    {
      id: 'stress',
      slug: 'teste-de-estresse',
      title: 'Teste de Estresse',
      description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
      category: 'STRESS',
      timeLimit: 5,
      instructions: 'Pense como você se sentiu no último mês e responda com honestidade.',
      questionCount: 10,
      difficulty: 'Fácil',
      estimatedTime: '5 min'
    },
    {
      id: 'panic',
      slug: 'teste-transtorno-de-panico',
      title: 'Teste Transtorno de Pânico',
      description: 'Avalie sintomas de crises de pânico e ansiedade aguda',
      category: 'ANXIETY',
      timeLimit: 8,
      instructions: 'Pense em como você se sentiu nas últimas semanas e responda com honestidade.',
      questionCount: 15,
      difficulty: 'Médio',
      estimatedTime: '8 min'
    },
    {
      id: 'social-phobia',
      slug: 'teste-fobia-social',
      title: 'Teste Fobia Social',
      description: 'Identifique medos e ansiedade em situações sociais',
      category: 'ANXIETY',
      timeLimit: 10,
      instructions: 'Pense em como você se sente em situações sociais e responda com honestidade.',
      questionCount: 17,
      difficulty: 'Médio',
      estimatedTime: '10 min'
    },
    {
      id: 'mental-suffering',
      slug: 'grau-de-sofrimento-mental',
      title: 'Grau de Sofrimento Mental',
      description: 'Meça o nível de sofrimento psíquico e seu impacto no bem-estar',
      category: 'DEPRESSION',
      timeLimit: 12,
      instructions: 'Responda pensando em como você se sentiu geralmente no último mês.',
      questionCount: 20,
      difficulty: 'Difícil',
      estimatedTime: '12 min'
    }
  ]
}

function formatTime(test: any) {
  if (test.timeLimit) {
    return `${test.timeLimit} min`
  }
  return 'Sem limite'
}

export default async function TestesPage() {
  const tests = await getTests()

  if (!tests?.length) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Testes psicológicos</h1>
          <p className="text-slate-600">
            Estamos preparando novas avaliações. Volte em alguns instantes ou entre em contato se precisar de ajuda.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Testes</p>
          <h1 className="text-4xl font-bold text-slate-900">Avaliações completas para entender sua saúde mental</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Cada teste foi desenvolvido para identificar sinais, gerar recomendações e ajudar você a tomar decisões
            conscientes sobre autocuidado. Escolha o que mais faz sentido e comece agora.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tests.map(test => {
            const slug = test.slug || test.id
            return (
              <Card
                key={test.id}
                className="flex flex-col justify-between overflow-hidden shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">{test.title}</CardTitle>
                      <CardDescription className="text-slate-600">{test.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{getCategoryLabel(test.category)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Questões</p>
                      <p className="text-lg font-semibold text-slate-900">{test.questionCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tempo</p>
                      <p className="text-lg font-semibold text-slate-900">{formatTime(test)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dificuldade</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {test.questionCount > 14 ? 'Intermediário' : 'Iniciante'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Instruções</p>
                      <p className="text-sm text-slate-700 line-clamp-3">{test.instructions}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Link href={`/testes/${slug}`} className="flex-1">
                      <Button className="w-full bg-black text-white hover:bg-slate-900">Iniciar Teste</Button>
                    </Link>
                    <Link href={`/testes/${slug}#instructions`} className="text-sm text-slate-500 hover:text-slate-900">
                      Ver mais informações →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
