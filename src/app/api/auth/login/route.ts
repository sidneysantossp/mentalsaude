import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const result = await authenticateUser(email, password)

    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token
    })

  } catch (error: any) {
    console.error('Login error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Email ou senha incorretos' },
      { status: 401 }
    )
  }
}