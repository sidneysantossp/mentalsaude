import { MetadataRoute } from 'next'
<<<<<<< HEAD

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
=======
import { db } from '@/lib/db'
import { getCategorySlug, generateSlug } from '@/lib/utils/slug'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mentalsaude.com.br'
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

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

<<<<<<< HEAD
  // Landing pages de categorias
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/testes/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
=======
  // Buscar testes ativos do banco para gerar URLs canônicas
  let testPages: Array<{
    url: string
    lastModified: Date
    changeFrequency: 'weekly' | 'monthly'
    priority: number
  }> = []

  try {
    const tests = await db.test.findMany({
      where: {
        isActive: true
      },
      select: {
        title: true,
        category: true,
        slug: true,
        lastModified: true
      }
    })

    testPages = tests.map(test => {
      // Gerar slug se não existir
      const slug = test.slug || generateSlug(test.title)
      const categorySlug = getCategorySlug(test.category)
      
      return {
        url: `${baseUrl}/testes/${categorySlug}/${slug}`,
        lastModified: test.lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })
  } catch (error) {
    console.error('Erro ao buscar testes para sitemap:', error)
    // Fallback para categorias estáticas se o banco falhar
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
      'transtorno-bipolar',
      'transtorno-ansiedade'
    ]

    testPages = categories.map(category => ({
      url: `${baseUrl}/testes/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  }
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

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
<<<<<<< HEAD
    }
  ]

  return [mainPage, testsPage, ...categoryPages, ...otherPages]
=======
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/planos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }
  ]

  return [mainPage, testsPage, ...testPages, ...otherPages]
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
}