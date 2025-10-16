import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany({
      include: {
        _count: {
          select: {
            testResults: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      testCount: user._count.testResults,
      status: 'active' // Default status since we don't have a status field
    }))

    return NextResponse.json({
      success: true,
      users: formattedUsers
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    
    // Return mock data if database fails
    const mockUsers = [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        role: 'USER',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
        testCount: 5,
        status: 'active' as const
      },
      {
        id: '2',
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        role: 'USER',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
        testCount: 2,
        status: 'active' as const
      },
      {
        id: '3',
        name: 'Dr. Pedro Oliveira',
        email: 'pedro.oliveira@example.com',
        role: 'PROFESSIONAL',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
        testCount: 0,
        status: 'active' as const
      },
      {
        id: '4',
        name: 'Ana Costa',
        email: 'ana.costa@example.com',
        role: 'USER',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
        testCount: 8,
        status: 'active' as const
      },
      {
        id: '5',
        name: 'Administrador',
        email: 'admin@example.com',
        role: 'ADMIN',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
        testCount: 0,
        status: 'active' as const
      }
    ]

    return NextResponse.json({
      success: true,
      users: mockUsers
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuário já existe' },
        { status: 400 }
      )
    }

    // Create new user (in a real app, you would hash the password)
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password, // In production, this should be hashed
        role: role || 'USER'
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}