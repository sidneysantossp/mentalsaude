import { NextRequest, NextResponse } from 'next/server'

// Armazenamento temporário de usuários online
interface OnlineUser {
  id: string
  username: string
  status: 'online' | 'away' | 'busy'
  avatar?: string
  currentRoom?: string
  lastSeen: string
  joinTime: string
}

const onlineUsers: OnlineUser[] = [
  {
    id: '1',
    username: 'AnaSilva',
    status: 'online',
    currentRoom: 'geral',
    lastSeen: new Date().toISOString(),
    joinTime: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '2',
    username: 'Carlos123',
    status: 'online',
    currentRoom: 'games',
    lastSeen: new Date().toISOString(),
    joinTime: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: '3',
    username: 'MariaJ',
    status: 'away',
    currentRoom: 'musica',
    lastSeen: new Date(Date.now() - 300000).toISOString(),
    joinTime: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: '4',
    username: 'PedroHK',
    status: 'online',
    currentRoom: 'geral',
    lastSeen: new Date().toISOString(),
    joinTime: new Date(Date.now() - 900000).toISOString()
  },
  {
    id: '5',
    username: 'JuliaM',
    status: 'busy',
    currentRoom: 'estudos',
    lastSeen: new Date(Date.now() - 120000).toISOString(),
    joinTime: new Date(Date.now() - 5400000).toISOString()
  },
  {
    id: '6',
    username: 'RafaelS',
    status: 'online',
    currentRoom: 'esportes',
    lastSeen: new Date().toISOString(),
    joinTime: new Date(Date.now() - 2700000).toISOString()
  },
  {
    id: '7',
    username: 'LuciaF',
    status: 'online',
    currentRoom: 'filmes',
    lastSeen: new Date().toISOString(),
    joinTime: new Date(Date.now() - 4500000).toISOString()
  },
  {
    id: '8',
    username: 'MarcosB',
    status: 'away',
    currentRoom: 'noticias',
    lastSeen: new Date(Date.now() - 600000).toISOString(),
    joinTime: new Date(Date.now() - 3600000).toISOString()
  }
]

// Função para limpar usuários inativos (mais de 30 minutos)
function cleanupInactiveUsers() {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
  
  for (let i = onlineUsers.length - 1; i >= 0; i--) {
    if (new Date(onlineUsers[i].lastSeen) < thirtyMinutesAgo) {
      onlineUsers.splice(i, 1)
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const room = searchParams.get('room')
    
    // Limpar usuários inativos
    cleanupInactiveUsers()
    
    let filteredUsers = onlineUsers
    
    if (room && room !== 'all') {
      filteredUsers = onlineUsers.filter(user => user.currentRoom === room)
    }

    // Simular variação de status
    filteredUsers = filteredUsers.map(user => {
      const random = Math.random()
      let status = user.status
      
      // 20% de chance de mudar de status
      if (random < 0.2) {
        const statuses: Array<'online' | 'away' | 'busy'> = ['online', 'away', 'busy']
        status = statuses[Math.floor(Math.random() * statuses.length)]
      }
      
      return {
        ...user,
        status,
        lastSeen: new Date().toISOString()
      }
    })

    return NextResponse.json({
      success: true,
      data: filteredUsers,
      total: filteredUsers.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching online users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch online users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, username, userId, room, status } = body

    if (action === 'join') {
      // Verificar se usuário já existe
      const existingUser = onlineUsers.find(user => 
        user.username.toLowerCase() === username.toLowerCase()
      )

      if (existingUser) {
        // Atualizar usuário existente
        existingUser.status = status || 'online'
        existingUser.currentRoom = room
        existingUser.lastSeen = new Date().toISOString()
        
        return NextResponse.json({
          success: true,
          data: existingUser,
          message: 'User updated successfully'
        })
      } else {
        // Adicionar novo usuário
        const newUser: OnlineUser = {
          id: userId || Date.now().toString(),
          username: username.trim(),
          status: status || 'online',
          currentRoom: room,
          lastSeen: new Date().toISOString(),
          joinTime: new Date().toISOString()
        }

        onlineUsers.push(newUser)

        return NextResponse.json({
          success: true,
          data: newUser,
          message: 'User joined successfully'
        })
      }
    }

    if (action === 'leave') {
      const userIndex = onlineUsers.findIndex(user => 
        user.username.toLowerCase() === username.toLowerCase()
      )

      if (userIndex > -1) {
        onlineUsers.splice(userIndex, 1)
        
        return NextResponse.json({
          success: true,
          message: 'User left successfully'
        })
      }

      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    if (action === 'update_status') {
      const user = onlineUsers.find(user => 
        user.username.toLowerCase() === username.toLowerCase()
      )

      if (user) {
        user.status = status || 'online'
        user.lastSeen = new Date().toISOString()
        
        return NextResponse.json({
          success: true,
          data: user,
          message: 'Status updated successfully'
        })
      }

      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error in chat users API:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, room, status } = body

    const user = onlineUsers.find(user => 
      user.username.toLowerCase() === username.toLowerCase()
    )

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Atualizar informações do usuário
    if (room !== undefined) {
      user.currentRoom = room
    }
    if (status) {
      user.status = status
    }
    user.lastSeen = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username required' },
        { status: 400 }
      )
    }

    const userIndex = onlineUsers.findIndex(user => 
      user.username.toLowerCase() === username.toLowerCase()
    )

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    onlineUsers.splice(userIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'User removed successfully'
    })
  } catch (error) {
    console.error('Error removing user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove user' },
      { status: 500 }
    )
  }
}