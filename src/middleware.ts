import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
<<<<<<< HEAD

// Lista de categorias válidas para SEO
const validCategories = [
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

// Mapeamento de URLs antigas para novas (SEO)
const urlMappings: Record<string, string> = {
  // URLs antigas → novas (existentes)
  '/testes/depressao': '/testes/depressao',
  '/testes/ansiedade': '/testes/transtorno-ansiedade',
  '/testes/estresse': '/testes/estresse',
  '/testes/insomnia': '/testes/insonia',
  '/testes/burnout': '/testes/burnout',
  '/testes/tdah': '/testes/tdah',
  '/testes/toc': '/testes/toc',
  '/testes/fobia-social': '/testes/fobia-social',
  '/testes/compulsao-alimentar': '/testes/compulsao-alimentar',
  '/testes/sindrome-impostor': '/testes/sindrome-impostor',
  '/testes/transtorno-bipolar': '/testes/transtorno-afetivo-bipolar',
  '/testes/depressao-maior': '/testes/depressao-maior',
  
  // Variantes comuns → URLs canônicas
  '/testes/adhd': '/testes/tdah',
  '/testes/tda-h': '/testes/tdah',
  '/testes/ocd': '/testes/toc',
  '/testes/binge-eating': '/testes/compulsao-alimentar',
  '/testes/transtorno-alimentar': '/testes/compulsao-alimentar',
  '/testes/bipolar': '/testes/transtorno-afetivo-bipolar',
  '/testes/medo-social': '/testes/fobia-social',
  '/testes/ansiedade-social': '/testes/fobia-social',
  '/testes/disturbio-sono': '/testes/insonia',
  '/testes/disturbios-do-sono': '/testes/insonia',
  '/testes/esgotamento': '/testes/burnout',
  '/testes/esgotamento-profissional': '/testes/burnout',
  '/testes/sindrome-do-impostor': '/testes/sindrome-impostor',
  '/testes/impostor-syndrome': '/testes/sindrome-impostor'
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Normalização de trailing slashes
  let normalizedPath = pathname
  if (pathname.endsWith('/') && pathname.length > 1) {
    normalizedPath = pathname.slice(0, -1)
    const newUrl = new URL(normalizedPath, request.url)
    newUrl.search = searchParams.toString()
    return NextResponse.redirect(newUrl, 301)
  }

  // Adicionar headers de segurança
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Security Headers
=======
import { getCategorySlug, generateSlug } from '@/lib/utils/slug'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = request.nextUrl.pathname

  // Redirecionamentos 301 para URLs antigas de testes
  // Padrão antigo: /testes/[category] -> Novo: /testes/[category]/[slug]
  
  if (pathname.startsWith('/testes/') && pathname.split('/').length === 3) {
    const category = pathname.split('/')[2]
    
    // Lista de categorias que precisam de redirecionamento
    const categoryRedirects: Record<string, string> = {
      'compulsao-alimentar': 'teste-compulsao-alimentar',
      'depressao': 'teste-depressao-phq9',
      'depressao-maior': 'teste-depressao-maior-dsm5',
      'fobia-social': 'teste-fobia-social-lsas',
      'insonia': 'teste-isonia-isi',
      'burnout': 'teste-burnout-mbi',
      'estresse': 'teste-estresse-pss',
      'sindrome-impostor': 'teste-sindrome-impostor-cips',
      'tdah': 'teste-tdah-asrs',
      'toc': 'teste-toc-ybocs',
      'transtorno-bipolar': 'teste-transtorno-bipolar-mdq',
      'transtorno-ansiedade': 'teste-transtorno-ansiedade-gad7'
    }

    if (categoryRedirects[category]) {
      const newUrl = `/testes/${category}/${categoryRedirects[category]}`
      url.pathname = newUrl
      
      return NextResponse.redirect(url, {
        status: 301,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      })
    }
  }

  // Redirecionamentos para URLs específicas antigas
  const oldUrls: Record<string, string> = {
    '/tests': '/testes',
    '/tests/depression': '/testes/depressao/teste-depressao-phq9',
    '/tests/anxiety': '/testes/transtorno-ansiedade/teste-transtorno-ansiedade-gad7',
    '/tests/stress': '/testes/estresse/teste-estresse-pss',
    '/tests/burnout': '/testes/burnout/teste-burnout-mbi',
    '/tests/adhd': '/testes/tdah/teste-tdah-asrs',
    '/tests/ocd': '/testes/toc/teste-toc-ybocs',
    '/tests/insomnia': '/testes/insonia/teste-isonia-isi',
    '/tests/social-anxiety': '/testes/fobia-social/teste-fobia-social-lsas',
    '/tests/binge-eating': '/testes/compulsao-alimentar/teste-compulsao-alimentar',
    '/tests/impostor-syndrome': '/testes/sindrome-impostor/teste-sindrome-impostor-cips',
    '/tests/bipolar': '/testes/transtorno-bipolar/teste-transtorno-bipolar-mdq',
    '/tests/major-depression': '/testes/depressao-maior/teste-depressao-maior-dsm5'
  }

  if (oldUrls[pathname]) {
    url.pathname = oldUrls[pathname]
    
    return NextResponse.redirect(url, {
      status: 301,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  }

  // Adicionar headers de segurança para todas as páginas
  const response = NextResponse.next()
  
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
<<<<<<< HEAD

  // SEO Headers
  response.headers.set('X-Robots-Tag', 'index, follow')
  
  // Performance Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  
  // Cache Control para assets estáticos
  if (pathname.startsWith('/_next') || pathname.startsWith('/images')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Redirecionamentos 301 para URLs antigas
  const oldPath = normalizedPath.toLowerCase()
  if (urlMappings[oldPath] && oldPath !== urlMappings[oldPath]) {
    const newUrl = new URL(urlMappings[oldPath], request.url)
    newUrl.search = searchParams.toString()
    return NextResponse.redirect(newUrl, 301)
  }

  // Validação de categorias
  if (normalizedPath.startsWith('/testes/')) {
    const category = normalizedPath.split('/')[2]
    if (category && !validCategories.includes(category)) {
      // Redirecionar para página de testes geral se categoria inválida
      const newUrl = new URL('/testes', request.url)
      return NextResponse.redirect(newUrl, 301)
    }
  }

  // Adicionar canonical URL
  if (normalizedPath.startsWith('/testes/')) {
    const canonicalUrl = `https://mentalhealthchat.vercel.app${normalizedPath}`
    response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`)
  }

  // Detectar dispositivos móveis para otimização
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  
  if (isMobile) {
    response.headers.set('Vary', 'User-Agent')
  }

  // Compressão para respostas de API
  if (pathname.startsWith('/api/')) {
    response.headers.set('Content-Encoding', 'gzip')
  }

=======
  
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
<<<<<<< HEAD
     * - public folder
=======
     * - public (public files)
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}