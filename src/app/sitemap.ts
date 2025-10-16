import { MetadataRoute } from 'next'

const categories = [
  'compulsao-alimentar',
  'depressao',
  'depressao-maior',
  'fobia-social',
  'insonia',
  'burnout',
  'estresse',
  'sindrome-impostor',
  'tdah',
  'toc',
  'transtorno-afetivo-bipolar',
  'transtorno-ansiedade'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mentalhealthchat.vercel.app'

  // Página principal
  const mainPage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }

  // Página de testes geral
  const testsPage = {
    url: `${baseUrl}/testes`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }

  // Landing pages de categorias
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/testes/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Outras páginas importantes
  const otherPages = [
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  return [mainPage, testsPage, ...categoryPages, ...otherPages]
}