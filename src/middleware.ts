import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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
      'compulsao-alimentar': 'teste-de-compulsao-alimentar',
      'depressao': 'teste-de-depressao',
      'depressao-maior': 'teste-de-depressao-maior',
      'fobia-social': 'teste-de-fobia-social',
      'insonia': 'teste-de-insonia',
      'burnout': 'teste-de-burnout',
      'estresse': 'teste-de-estresse',
      'sindrome-impostor': 'teste-de-sindrome-do-impostor',
      'tdah': 'teste-de-tdah',
      'toc': 'teste-de-toc',
      'transtorno-bipolar': 'teste-de-transtorno-bipolar',
      'transtorno-ansiedade': 'teste-de-transtorno-de-ansiedade'
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
    '/tests/depression': '/testes/depressao/teste-de-depressao',
    '/tests/anxiety': '/testes/transtorno-ansiedade/teste-de-transtorno-de-ansiedade',
    '/tests/stress': '/testes/estresse/teste-de-estresse',
    '/tests/burnout': '/testes/burnout/teste-de-burnout',
    '/tests/adhd': '/testes/tdah/teste-de-tdah',
    '/tests/ocd': '/testes/toc/teste-de-toc',
    '/tests/insomnia': '/testes/insonia/teste-de-insonia',
    '/tests/social-anxiety': '/testes/fobia-social/teste-de-fobia-social',
    '/tests/binge-eating': '/testes/compulsao-alimentar/teste-de-compulsao-alimentar',
    '/tests/impostor-syndrome': '/testes/sindrome-impostor/teste-de-sindrome-do-impostor',
    '/tests/bipolar': '/testes/transtorno-bipolar/teste-de-transtorno-bipolar',
    '/tests/major-depression': '/testes/depressao-maior/teste-de-depressao-maior'
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
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
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
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}