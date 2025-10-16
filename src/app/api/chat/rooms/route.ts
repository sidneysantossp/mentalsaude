import { NextRequest, NextResponse } from 'next/server'

const rooms = [
  {
    id: 'geral',
    name: 'Bate Papo Geral',
    description: 'Conversas gerais sobre diversos assuntos',
    users: 145,
    category: 'Geral',
    maxUsers: 500,
    isPrivate: false
  },
  {
    id: 'amigos',
    name: 'Amigos e Amizades',
    description: 'Faça novos amigos e converse com pessoas amigáveis',
    users: 89,
    category: 'Relacionamentos',
    maxUsers: 300,
    isPrivate: false
  },
  {
    id: 'jovens',
    name: 'Jovens e Adolescentes',
    description: 'Espaço para o público jovem conversar',
    users: 67,
    category: 'Jovens',
    maxUsers: 200,
    isPrivate: false
  },
  {
    id: 'games',
    name: 'Games e Tecnologia',
    description: 'Conversas sobre jogos, tecnologia e inovações',
    users: 234,
    category: 'Tecnologia',
    maxUsers: 400,
    isPrivate: false
  },
  {
    id: 'musica',
    name: 'Música e Cultura',
    description: 'Compartilhe suas músicas e gostos musicais',
    users: 156,
    category: 'Cultura',
    maxUsers: 300,
    isPrivate: false
  },
  {
    id: 'esportes',
    name: 'Esportes e Fitness',
    description: 'Converse sobre esportes, futebol e atividades físicas',
    users: 198,
    category: 'Esportes',
    maxUsers: 350,
    isPrivate: false
  },
  {
    id: 'filmes',
    name: 'Filmes e Séries',
    description: 'Discussões sobre cinema, séries e entretenimento',
    users: 176,
    category: 'Entretenimento',
    maxUsers: 300,
    isPrivate: false
  },
  {
    id: 'noticias',
    name: 'Notícias e Atualidades',
    description: 'Debata os acontecimentos do dia a dia',
    users: 92,
    category: 'Notícias',
    maxUsers: 250,
    isPrivate: false
  },
  {
    id: 'amor',
    name: 'Amor e Relacionamentos',
    description: 'Conversas sobre relacionamentos e sentimentos',
    users: 203,
    category: 'Relacionamentos',
    maxUsers: 400,
    isPrivate: false
  },
  {
    id: 'trabalho',
    name: 'Trabalho e Carreira',
    description: 'Discuta profissões, empregos e carreira',
    users: 78,
    category: 'Carreira',
    maxUsers: 200,
    isPrivate: false
  },
  {
    id: 'estudos',
    name: 'Estudos e Educação',
    description: 'Tire dúvidas e compartilhe conhecimento',
    users: 124,
    category: 'Educação',
    maxUsers: 250,
    isPrivate: false
  },
  {
    id: 'saude',
    name: 'Saúde e Bem-estar',
    description: 'Converse sobre saúde, medicina e bem-estar',
    users: 87,
    category: 'Saúde',
    maxUsers: 200,
    isPrivate: false
  }
]

export async function GET() {
  try {
    // Simular variação no número de usuários
    const roomsWithDynamicUsers = rooms.map(room => ({
      ...room,
      users: Math.max(1, room.users + Math.floor(Math.random() * 21) - 10) // Variação de -10 a +10
    }))

    return NextResponse.json({
      success: true,
      data: roomsWithDynamicUsers
    })
  } catch (error) {
    console.error('Error fetching chat rooms:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chat rooms' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, roomId, username } = body

    if (action === 'join') {
      const room = rooms.find(r => r.id === roomId)
      if (!room) {
        return NextResponse.json(
          { success: false, error: 'Room not found' },
          { status: 404 }
        )
      }

      if (room.users >= room.maxUsers) {
        return NextResponse.json(
          { success: false, error: 'Room is full' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        success: true,
        message: `Joined ${room.name} successfully`,
        room: room
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error in chat rooms API:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}