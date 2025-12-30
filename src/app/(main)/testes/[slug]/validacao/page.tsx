import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  return {
    title: `${test.title} — Validação | Mental Saúde Tests`,
    description: testsInfo[slug]?.validation.details.join(' ') ?? 'Detalhes de validação do instrumento',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'),
    openGraph: {
      title: `${test.title} — Validação`,
      description: testsInfo[slug]?.validation.details[0] ?? 'Base científica e evidências do instrumento'
    }
  }
}

export default async function TestValidationPage({ params }: Props) {
  const { slug } = await params
  const test = await getTestBySlug(slug)
  if (!test) {
    notFound()
  }
  const info = testsInfo[slug]
  const validationDetails =
    info?.validation.details ??
    [
      'Instrumento amplamente utilizado em estudos clínicos internacionais.',
      'Sensibilidade e especificidade altas quando usado corretamente.',
      'Recomendado como primeiro passo de triagem em protocolos de saúde mental.'
    ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <Card className="border-slate-200/70">
        <CardHeader>
          <CardTitle className="text-3xl">{test.title}</CardTitle>
          <p className="text-slate-600">{test.description}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700">{info?.validation.title ?? 'Fontes e evidências'}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {validationDetails.map(detail => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <p className="text-sm text-slate-600">
          Essas referências garantem a confiança do instrumento e orientam aplicações clínicas, acadêmicas e políticas.
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
