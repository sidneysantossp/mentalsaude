import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Senhas não fornecidas' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'A nova senha deve ter pelo menos 6 caracteres' }, { status: 400 })
    }

    // Buscar usuário com senha
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        password: true,
      }
    })

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Usuário não encontrado ou sem senha' }, { status: 404 })
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 400 })
    }

    // Hash da nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Atualizar senha
    await db.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword }
    })

    return NextResponse.json({ message: 'Senha alterada com sucesso' })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json({ error: 'Erro ao alterar senha' }, { status: 500 })
  }
}