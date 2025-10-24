import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    console.log('🔍 Tentando login:', { email, passwordLength: password?.length })

    // Tentar Prisma primeiro
    try {
      const { db } = await import('@/lib/db')
      
      const user = await db.user.findUnique({
        where: { email }
      })

      if (user) {
        console.log('✅ Usuário encontrado no Prisma:', { email: user.email, role: user.role, hasPassword: !!user.password })

        if (user.password) {
          const isValidPassword = await bcrypt.compare(password, user.password)

          if (isValidPassword) {
            // Gerar token JWT simples
            const token = Buffer.from(JSON.stringify({
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
            })).toString('base64')

            console.log('🎉 Login Prisma bem-sucedido!')

            return NextResponse.json({
              success: true,
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
              },
              token: token
            })
          } else {
            console.log('❌ Senha incorreta no Prisma')
          }
        } else {
          console.log('❌ Usuário não tem senha no Prisma')
        }
      } else {
        console.log('❌ Usuário não encontrado no Prisma')
      }
    } catch (prismaError) {
      console.log('⚠️ Prisma não disponível, tentando fallback:', prismaError.message)
    }

    // Tentar Fallback Mode
    console.log('🔄 Tentando fallback mode...')
    
    if (typeof globalThis !== 'undefined' && globalThis.fallbackUsers) {
      // Procurar usuário no array (não como objeto)
      const user = globalThis.fallbackUsers.find((u: any) => u.email === email)
      
      if (user) {
        console.log('✅ Usuário encontrado no fallback:', { email: user.email, role: user.role, hasPassword: !!user.password })

        if (user.password) {
          const isValidPassword = await bcrypt.compare(password, user.password)

          if (isValidPassword) {
            // Gerar token JWT simples
            const token = Buffer.from(JSON.stringify({
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
            })).toString('base64')

            console.log('🎉 Login Fallback bem-sucedido!')

            return NextResponse.json({
              success: true,
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
              },
              token: token
            })
          } else {
            console.log('❌ Senha incorreta no fallback')
          }
        } else {
          console.log('❌ Usuário não tem senha no fallback')
        }
      } else {
        console.log('❌ Usuário não encontrado no fallback')
        console.log('📋 Usuários disponíveis:', globalThis.fallbackUsers.map((u: any) => ({ email: u.email, role: u.role })))
      }
    } else {
      console.log('❌ Fallback users não inicializado')
    }

    // Se chegou aqui, falhou em todos os métodos
    console.log('❌ Falha em todos os métodos de autenticação')
    
    return NextResponse.json(
      { error: 'Email ou senha incorretos' },
      { status: 401 }
    )

  } catch (error: any) {
    console.error('❌ Erro no login:', error)
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}