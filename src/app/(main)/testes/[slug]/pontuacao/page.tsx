import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { testsInfo } from '@/lib/tests-info'

type Props = {
  params: { slug: string }
}

export const dynamic = 'force-static'

export function generateMetadata({ params }: Props) {
  const test = testsInfo[params.slug]
  if (!test) return {}
  return {
    title: `${test.title} — Pontuação | Mental Saúde Tests`,
    description: test.scoring.detail,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: `${test.title} — Pontuação`,
      description: test.scoring.detail
    }
  }
}

export default function TestScoringPage({ params }: Props) {
  const test = testsInfo[params.slug]
  if (!test) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <Card className="border-slate-200/70">
        <CardHeader>
          <CardTitle className="text-3xl">{test.title}</CardTitle>
          <p className="text-slate-600">{test.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {test.summaryPoints.map(point => (
              <p key={point} className="text-sm text-slate-700">
                {point}
              </p>
            ))}
          </div>
          <p className="text-sm font-semibold text-slate-900">{test.scoring.title}</p>
          <p className="text-sm text-slate-600">{test.scoring.detail}</p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Faixas de pontuação</h2>
        <div className="grid gap-4">
          {test.scoring.ranges.map(range => (
            <Card key={range.label} className="border-slate-200/70 bg-slate-50">
              <CardContent>
                <p className="text-sm font-semibold text-slate-900">{range.label}</p>
                <p className="text-sm text-slate-600">Pontuação {range.min} a {range.max}</p>
                <p className="mt-2 text-sm text-slate-700">{range.guidance}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Links relacionados</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/testes/${test.slug}`}>Voltar ao teste</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/testes/${test.slug}/pos-teste`}>Próximos passos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/decisao/quando-procurar-ajuda`}>Quando procurar ajuda</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
