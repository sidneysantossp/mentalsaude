import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mental Saúde - Testes Psicológicos Online',
    short_name: 'Mental Saúde',
    description: 'Testes psicológicos gratuitos e validados para depressão, ansiedade, estresse e TDAH. Resultados imediatos com orientações baseadas em evidências científicas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'pt-BR',
    categories: ['health', 'medical', 'lifestyle'],
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/home-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Página inicial com testes psicológicos',
      },
      {
        src: '/screenshots/home-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Versão mobile da página inicial',
      },
    ],
    shortcuts: [
      {
        name: 'Teste de Depressão',
        short_name: 'Depressão',
        description: 'Avalie seus sintomas depressivos',
        url: '/testes/teste-de-depressao',
        icons: [
          {
            src: '/icons/depression-icon.png',
            sizes: '96x96',
          },
        ],
      },
      {
        name: 'Teste de Ansiedade',
        short_name: 'Ansiedade',
        description: 'Meça seus níveis de ansiedade',
        url: '/testes/teste-de-ansiedade',
        icons: [
          {
            src: '/icons/anxiety-icon.png',
            sizes: '96x96',
          },
        ],
      },
      {
        name: 'Todos os Testes',
        short_name: 'Testes',
        description: 'Veja todos os testes disponíveis',
        url: '/testes',
        icons: [
          {
            src: '/icons/tests-icon.png',
            sizes: '96x96',
          },
        ],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  }
}
