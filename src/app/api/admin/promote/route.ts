import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/mysql'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 })
    }
    
    // Verificar se o usuário existe
    const user = await db.getUserByEmail(email)
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }
    
    // Promover para admin
    await db.query(
      'UPDATE users SET role = ? WHERE email = ?',
      ['ADMIN', email]
    )
    
    // Buscar usuário atualizado
    const updatedUser = await db.getUserByEmail(email)
    
    return NextResponse.json({
      success: true,
      message: 'Usuário promovido para ADMIN com sucesso!',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role
      }
    })
    
  } catch (error) {
    console.error('Erro ao promover usuário:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    }, { status: 500 })
  }
}