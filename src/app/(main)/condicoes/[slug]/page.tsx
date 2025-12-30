import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { conditionHubs } from '@/lib/condition-hubs'
import { testsInfo } from '@/lib/tests-info'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const condition = conditionHubs[slug]
  if (!condition) return {}
  return {
    title: `${condition.title} | Mental Saúde Tests`,
    description: condition.shortDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: `${condition.title} | Mental Saúde Tests`,
      description: condition.shortDescription,
      url: `/condicoes/${condition.slug}`
    }
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  const condition = conditionHubs[slug]
  if (!condition) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl space-y-10">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <CardContent>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Hub de condição</p>
          <CardTitle className="text-3xl text-white">{condition.title}</CardTitle>
          <p className="mt-2 text-lg text-slate-100">{condition.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {condition.heroSummary.map(point => (
              <Badge key={point} variant="outline" className="border-white text-white">
                {point}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            {condition.relatedTests.map(testSlug => {
              const testData = testsInfo[testSlug]
              if (!testData) return null
              return (
                <Button asChild key={testSlug} className="bg-white text-slate-900 hover:bg-slate-100">
                  <Link href={`/testes/${testSlug}`}>Fazer {testData.title}</Link>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-8">
        {condition.sections.map(section => (
          <article key={section.title} className="space-y-3 rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            {section.paragraphs.map(paragraph => (
              <p key={paragraph} className="text-sm leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">Decisões imediatas</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {condition.decisionPages.map(decision => (
            <Card key={decision.slug} className="border-slate-200/70">
              <CardContent>
                <CardTitle className="text-lg">{decision.label}</CardTitle>
                <p className="text-sm text-slate-600">Orientações práticas para cada estágio.</p>
                <Button asChild size="sm" className="mt-4">
                  <Link href={`/decisao/${decision.slug}`}>Ver página</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">Perguntas frequentes</h3>
        <div className="space-y-3">
          {condition.faq.map(item => (
            <Card key={item.question} className="border-slate-200/70">
              <CardContent>
                <p className="text-sm font-semibold text-slate-900">{item.question}</p>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">Recursos confiáveis</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          {condition.resources.map(resource => (
            <li key={resource.url}>
              <Link href={resource.url} className="text-blue-600 underline">
                {resource.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
