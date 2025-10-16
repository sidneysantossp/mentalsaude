import { NextRequest, NextResponse } from 'next/server'

// Armazenamento temporário de mensagens (em produção, usaríamos um banco de dados)
const messages: Array<{
  id: string
  username: string
  content: string
  timestamp: string
  room: string
  isSystem?: boolean
  userId?: string
}> = []

// Mensagens iniciais para cada sala
const initialMessages = [
  {
    id: '1',
    username: 'Sistema',
    content: 'Bem-vindo ao Bate Papo! As regras são: seja respeitoso, não compartilhe informações pessoais e divirta-se!',
    timestamp: new Date().toISOString(),
    room: 'geral',
    isSystem: true
  },
  {
    id: '2',
    username: 'MariaSilva',
    content: 'Olá pessoal! Como estão todos hoje? 😊',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    room: 'geral'
  },
  {
    id: '3',
    username: 'JoaoPedro',
    content: 'Tudo ótimo por aqui! Alguém viu o jogo ontem?',
    timestamp: new Date(Date.now() - 240000).toISOString(),
    room: 'geral'
  },
  {
    id: '4',
    username: 'AnaCosta',
    content: 'Eu vi! Foi um jogo incrível! 🎉',
    timestamp: new Date(Date.now() - 180000).toISOString(),
    room: 'geral'
  }
]

// Inicializar mensagens se estiver vazio
if (messages.length === 0) {
  messages.push(...initialMessages)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const room = searchParams.get('room')
    const limit = parseInt(searchParams.get('limit') || '50')

    let filteredMessages = messages
    
    if (room && room !== 'all') {
      filteredMessages = messages.filter(msg => msg.room === room)
    }

    // Ordenar por timestamp (mais recentes primeiro)
    filteredMessages.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    // Limitar número de mensagens
    const limitedMessages = filteredMessages.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedMessages.reverse(), // Reverter para mostrar em ordem cronológica
      total: filteredMessages.length
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, content, room, userId } = body

    // Validação básica
    if (!username || !content || !room) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validar conteúdo da mensagem
    if (content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message cannot be empty' },
        { status: 400 }
      )
    }

    if (content.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Message too long (max 500 characters)' },
        { status: 400 }
      )
    }

    // Criar nova mensagem
    const newMessage = {
      id: Date.now().toString(),
      username: username.trim(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
      room: room,
      userId: userId || null
    }

    // Adicionar ao armazenamento
    messages.push(newMessage)

    // Manter apenas as últimas 1000 mensagens por sala para evitar sobrecarga
    const messagesByRoom = messages.filter(msg => msg.room === room)
    if (messagesByRoom.length > 1000) {
      const toRemove = messagesByRoom.slice(0, messagesByRoom.length - 1000)
      toRemove.forEach(msg => {
        const index = messages.findIndex(m => m.id === msg.id)
        if (index > -1) {
          messages.splice(index, 1)
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: 'Message sent successfully'
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('id')
    const room = searchParams.get('room')

    if (!messageId) {
      return NextResponse.json(
        { success: false, error: 'Message ID required' },
        { status: 400 }
      )
    }

    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    
    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    // Remover mensagem
    messages.splice(messageIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}