import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { testsInfo } from '@/lib/tests-info'

type Props = {
  params: { slug: string }
}

export const dynamic = 'force-static'

export function generateMetadata({ params }: Props) {
  const test = testsInfo[params.slug]
  if (!test) return {}
  return {
    title: `${test.title} — Pós-teste | Mental Saúde Tests`,
    description: test.nextSteps.title,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: `${test.title} — Pós-teste`,
      description: test.nextSteps.actions[0]
    }
  }
}

export default function TestPostPage({ params }: Props) {
  const test = testsInfo[params.slug]
  if (!test) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <Card className="border-slate-200/70">
        <CardContent>
          <CardTitle className="text-3xl">{test.nextSteps.title}</CardTitle>
          <div className="mt-3 space-y-3 text-sm text-slate-600">
            {test.nextSteps.actions.map(action => (
              <p key={action}>{action}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Decisões e próximos passos</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          {test.decisionPages.map(decision => (
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
