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
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/tests`, {
      cache: 'no-store'
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error('Error fetching tests:', error)
    return []
  }
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
                      <p className="text-lg font-semibold text-slate-900">{test.questions.length}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tempo</p>
                      <p className="text-lg font-semibold text-slate-900">{formatTime(test)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dificuldade</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {test.questions.length > 14 ? 'Intermediário' : 'Iniciante'}
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
