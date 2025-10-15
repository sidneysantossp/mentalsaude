import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/mysql'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    const user = await createUser(email, password, name)

    return NextResponse.json({
      success: true,
      user,
      message: 'Conta criada com sucesso!'
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Erro ao criar conta' },
      { status: 500 }
    )
  }
}