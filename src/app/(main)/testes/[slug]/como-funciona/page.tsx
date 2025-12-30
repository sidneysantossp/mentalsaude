import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTestBySlug } from '@/lib/db'
import { testsInfo } from '@/lib/tests-info'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const test = await getTestBySlug(slug)
  if (!test) return {}
  const metadata: string[] = [
    test.shortDescription || test.description,
    'Este instrumento é utilizado para triagem de sintomas recentes'
  ]
  return {
    title: `${test.title} — Como funciona | Mental Saúde Tests`,
    description: metadata.join(' ').slice(0, 200),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: `${test.title} — Como funciona`,
      description: metadata.join(' ')
    }
  }
}

export default async function TestInfoPage({ params }: Props) {
  const { slug } = await params
  const test = await getTestBySlug(slug)
  if (!test) {
    notFound()
  }
  const info = testsInfo[slug]
  const summaryPoints = info?.summaryPoints ?? [
    `Instrumento na categoria ${test.category}`,
    `${test.questions.length} questões com escala Likert`,
    'Finalidade de triagem em saúde mental'
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <Card className="border-slate-200/70">
        <CardContent className="space-y-4">
          <CardTitle className="text-3xl">{test.title}</CardTitle>
          <p className="text-sm text-slate-600">{test.shortDescription || test.description}</p>
          <div className="space-y-2">
            {summaryPoints.map(point => (
              <p key={point} className="text-sm text-slate-700">
                {point}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Detalhes do instrumento</h2>
        <p className="text-sm text-slate-600">
          Cada item pede que você reporte a frequência dos sintomas nas últimas duas semanas utilizando uma escala de 0 (nenhuma) a 3 (quase todos os dias).
          A soma aponta um nível preliminar de risco, mas a interpretação clínica depende de contexto.
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <Button asChild>
            <Link href={`/testes/${test.slug}/pontuacao`}>Ver pontuação</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/testes/${test.slug}/validacao`}>Entenda a validação</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Dicas de uso</h3>
        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
          <li>Finalidade de triagem — não substitui avaliação clínica.</li>
          <li>Responda com honestidade e no contexto das últimas duas semanas.</li>
          <li>Evite comparar com outras pessoas; o importante é seu histórico.</li>
        </ul>
      </section>
    </div>
  )
}
