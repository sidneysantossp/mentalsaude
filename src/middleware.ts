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