import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { decisionContents } from '@/lib/decision-content'

type Props = {
  params: { slug: string }
}

export const dynamic = 'force-static'

export function generateMetadata({ params }: Props) {
  const entry = decisionContents[params.slug]
  if (!entry) return {}
  return {
    title: `${entry.title} | Mental Saúde Tests`,
    description: entry.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: entry.title,
      description: entry.description
    }
  }
}

export default function DecisionPage({ params }: Props) {
  const entry = decisionContents[params.slug]
  if (!entry) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <Card className="px-6 py-10">
        <CardTitle className="text-3xl text-slate-900">{entry.title}</CardTitle>
        <p className="mt-3 text-slate-600">{entry.description}</p>
        <p className="mt-5 text-sm text-slate-500">{entry.summary.join(' • ')}</p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Button asChild>
            <Link href="/testes">Ver todos os testes</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/condicoes">Veja condições relacionadas</Link>
          </Button>
        </div>
      </Card>

      <section className="space-y-6">
        {entry.sections.map(section => (
          <Card key={section.title} className="border-slate-200/70">
            <CardContent>
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {section.paragraphs.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">Perguntas frequentes</h3>
        <div className="space-y-3">
          {entry.faqs.map(faq => (
            <Card key={faq.question} className="border-slate-200/70">
              <CardContent>
                <p className="text-sm font-semibold text-slate-900">{faq.question}</p>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
