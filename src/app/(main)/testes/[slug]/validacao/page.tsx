import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    title: `${test.title} — Validação | Mental Saúde Tests`,
    description: test.validation.details.join(' '),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: `${test.title} — Validação`,
      description: test.validation.details[0]
    }
  }
}

export default function TestValidationPage({ params }: Props) {
  const test = testsInfo[params.slug]
  if (!test) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <Card className="border-slate-200/70">
        <CardHeader>
          <CardTitle className="text-3xl">{test.title}</CardTitle>
          <p className="text-slate-600">{test.description}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700">{test.validation.title}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {test.validation.details.map(detail => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <p className="text-sm text-slate-600">
          Essas referências garantem a confiança do instrumento e orientam aplicações clínicas, acadêmicas e de políticas públicas.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/testes/${test.slug}`}>Aplicar o teste</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/testes/${test.slug}/pontuacao`}>Entender pontuação</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
