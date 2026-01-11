export default function opengraph() {
  return {
    metadataBase: new URL('https://mentalsaude.vercel.app'),
    title: {
      template: '%s | Mental Saúde',
      default: 'Mental Saúde - Testes Psicológicos Online',
    },
    description: 'Testes psicológicos gratuitos e validados para depressão, ansiedade, estresse e TDAH. Resultados imediatos com orientações baseadas em evidências científicas.',
    keywords: [
      'testes psicológicos',
      'avaliação mental',
      'saúde mental',
      'depressão',
      'ansiedade',
      'estresse',
      'tdah',
      'burnout',
      'fobia social',
      'transtorno de pânico',
      'compulsão alimentar',
      'sofrimento mental',
      'testes online',
      'psicologia',
      'bem-estar emocional',
    ],
    authors: [{ name: 'Mental Saúde' }],
    creator: 'Mental Saúde',
    publisher: 'Mental Saúde',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: 'https://mentalsaude.vercel.app',
      siteName: 'Mental Saúde',
      title: 'Mental Saúde - Testes Psicológicos Online',
      description: 'Testes psicológicos gratuitos e validados para depressão, ansiedade, estresse e TDAH. Resultados imediatos com orientações baseadas em evidências científicas.',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Mental Saúde - Testes Psicológicos Online',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mental Saúde - Testes Psicológicos Online',
      description: 'Testes psicológicos gratuitos e validados para depressão, ansiedade, estresse e TDAH. Resultados imediatos com orientações baseadas em evidências científicas.',
      images: ['/images/og-image.png'],
      creator: '@mentalsaude',
      site: '@mentalsaude',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      bing: 'your-bing-verification-code',
    },
    alternates: {
      canonical: 'https://mentalsaude.vercel.app',
      languages: {
        'pt-BR': 'https://mentalsaude.vercel.app',
        'en': 'https://mentalsaude.vercel.app/en',
      },
    },
  }
}
