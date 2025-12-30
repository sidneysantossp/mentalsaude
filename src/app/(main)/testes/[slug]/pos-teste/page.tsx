import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTestBySlug } from '@/lib/prisma-db'
import { testsInfo } from '@/lib/tests-info'

type Props = {
  params: { slug: string }
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props) {
  const test = await getTestBySlug(params.slug)
  if (!test) return {}
  return {
    title: `${test.title} — Pós-teste | Mental Saúde Tests`,
    description: testsInfo[params.slug]?.nextSteps.title ?? 'Orientações para o próximo passo após o teste',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: `${test.title} — Pós-teste`,
      description: testsInfo[params.slug]?.nextSteps.actions[0] ?? 'Recomendações práticas pós-medição'
    }
  }
}

export default async function TestPostPage({ params }: Props) {
  const test = await getTestBySlug(params.slug)
  if (!test) {
    notFound()
  }
  const info = testsInfo[params.slug]
  const actions =
    info?.nextSteps.actions ??
    [
      'Compartilhe os resultados com um profissional de saúde mental.',
      'Pratique autocuidado diário e registre mudanças de humor.',
      'Acione redes de apoio e mantenha contatos de emergência visíveis.'
    ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <Card className="border-slate-200/70">
        <CardContent>
          <CardTitle className="text-3xl">{info?.nextSteps.title ?? 'Próximos passos recomendados'}</CardTitle>
          <div className="mt-3 space-y-3 text-sm text-slate-600">
            {actions.map(action => (
              <p key={action}>{action}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Decisões e próximos passos</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          {(info?.decisionPages ?? []).map(decision => (
            <li key={decision.slug}>
              <Link href={`/decisao/${decision.slug}`} className="text-blue-600 underline">
                {decision.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/testes/${test.slug}/pontuacao`}>Rever pontuação</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
