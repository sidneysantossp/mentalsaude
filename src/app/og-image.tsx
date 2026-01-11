import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2563eb',
          backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          fontSize: 48,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: '72px',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Mental Saúde
        </div>
        <div
          style={{
            fontSize: '36px',
            marginBottom: '40px',
            opacity: 0.9,
          }}
        >
          Testes Psicológicos Online
        </div>
        <div
          style={{
            fontSize: '24px',
            opacity: 0.8,
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Avaliações gratuitas e validadas para depressão, ansiedade, estresse e TDAH
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
