import type { Metadata } from 'next'
import { getTestBySlug } from '@/lib/db'
import { getCategoryLabel } from '@/lib/categories'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const test = await getTestBySlug(params.slug)

  if (!test) {
    return {
      title: `Teste não encontrado | Mental Saúde`,
      description: 'Teste psicológico indisponível no momento.',
      robots: {
        index: false,
        follow: false
      }
    }
  }

  const title = `${test.title} | Mental Saúde`
  const description = test.shortDescription || test.description
  const url = `${SITE_URL}/testes/${params.slug}`

  return {
    title,
    description,
    keywords: ['saúde mental', 'testes psicológicos', test.category, test.title],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Mental Saúde',
      type: 'website',
      locale: 'pt_BR',
      images: [
        {
          url: `${SITE_URL}/images/test-promo.jpg`,
          width: 1200,
          height: 630,
          alt: test.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/images/test-promo.jpg`]
    },
    alternates: {
      canonical: url
    },
    robots: {
      index: true,
      follow: true
    }
  }
}
