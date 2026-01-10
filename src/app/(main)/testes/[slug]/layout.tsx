import { Metadata } from 'next'
import { getTestBySlug } from '@/lib/db'
import { getCategoryLabel } from '@/lib/categories'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const test = await getTestBySlug(slug)

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
  
  // Criar meta description otimizada com 160 caracteres
  let description = test.short_description || test.description
  
  // Se a descrição for muito longa, truncar
  if (description.length > 160) {
    description = description.substring(0, 157) + '...'
  }
  
  // Se for muito curta, enriquecer com informações adicionais
  if (description.length < 120) {
    const category = getCategoryLabel(test.category)
    description = `${description} Teste validado de ${category.toLowerCase()} com resultados imediatos e orientações profissionais.`
  }
  const url = `${SITE_URL}/testes/${slug}`

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

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
