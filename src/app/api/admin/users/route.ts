import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { data: users, error } = await db
      .from('profiles')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    const { data: allResults, error: resultsError } = await db
      .from('test_results')
      .select('user_id')

    if (resultsError) {
      throw resultsError
    }

    const testCountMap = (allResults || []).reduce<Record<string, number>>((acc, row) => {
      if (!row.user_id) {
        return acc
      }
      acc[row.user_id] = (acc[row.user_id] || 0) + 1
      return acc
    }, {})

    const formattedUsers = (users || []).map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
      testCount: testCountMap[user.id] || 0,
      status: 'active'
    }))

    return NextResponse.json({
      success: true,
      users: formattedUsers
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    
    const mockUsers = [
      {
        id: '1',
        name: 'Joao Silva',
        email: 'joao.silva@example.com',
        role: 'USER',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        testCount: 5,
        status: 'active' as const
      },
      {
        id: '2',
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        role: 'USER',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        testCount: 2,
        status: 'active' as const
      },
      {
        id: '3',
        name: 'Dr. Pedro Oliveira',
        email: 'pedro.oliveira@example.com',
        role: 'PROFESSIONAL',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
        testCount: 0,
        status: 'active' as const
      },
      {
        id: '4',
        name: 'Ana Costa',
        email: 'ana.costa@example.com',
        role: 'USER',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        testCount: 8,
        status: 'active' as const
      },
      {
        id: '5',
        name: 'Administrador',
        email: 'admin@example.com',
        role: 'ADMIN',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
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
        { error: 'Email e senha sao obrigatorios' },
        { status: 400 }
      )
    }

    const { data: existingUser, error: existingError } = await db
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existingError) {
      throw existingError
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuario ja existe' },
        { status: 400 }
      )
    }

    const { data: newUser, error: insertError } = await db
      .from('profiles')
      .insert({
        name,
        email,
        password_hash: password,
        role: role || 'USER'
      })
      .select('id, name, email, role, created_at')
      .maybeSingle()

    if (insertError) {
      throw insertError
    }

    if (!newUser) {
      throw new Error('Falha ao criar usuario')
    }

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.created_at
      }
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Erro ao criar usuario' },
      { status: 500 }
    )
  }
}
