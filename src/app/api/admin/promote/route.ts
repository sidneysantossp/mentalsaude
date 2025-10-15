import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 })
    }
    
    console.log('🔍 Tentando promover usuário:', email)
    
    // Tentar usar MySQL primeiro
    try {
      const { db } = await import('@/lib/mysql')
      
      // Verificar se o usuário existe
      const users = await db.query(
        'SELECT id, email, name, role FROM users WHERE email = ?',
        [email]
      ) as any[]
      
      if (!users || users.length === 0) {
        console.log('❌ Usuário não encontrado no MySQL')
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
      }
      
      const user = users[0]
      console.log('✅ Usuário encontrado no MySQL:', user)
      
      // Verificar se já é admin
      if (user.role === 'ADMIN') {
        return NextResponse.json({
          success: true,
          message: 'Usuário já é ADMIN!',
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        })
      }
      
      // Promover para admin
      await db.query(
        'UPDATE users SET role = ? WHERE email = ?',
        ['ADMIN', email]
      )
      
      console.log('✅ Usuário promovido no MySQL com sucesso!')
      
      // Buscar usuário atualizado
      const updatedUsers = await db.query(
        'SELECT id, email, name, role FROM users WHERE email = ?',
        [email]
      ) as any[]
      
      const updatedUser = updatedUsers[0]
      
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
      
    } catch (dbError) {
      console.log('⚠️ MySQL não disponível, usando fallback mode:', dbError.message)
      
      // Fallback: Usar memória local para desenvolvimento
      if (typeof globalThis !== 'undefined' && globalThis.fallbackUsers) {
        const userIndex = globalThis.fallbackUsers.findIndex((u: any) => u.email === email)
        
        if (userIndex === -1) {
          // Criar usuário se não existir
          const newUser = {
            id: Date.now().toString(),
            email: email,
            name: email.split('@')[0],
            role: 'ADMIN',
            createdAt: new Date().toISOString()
          }
          globalThis.fallbackUsers.push(newUser)
          
          console.log('✅ Usuário criado e promovido no fallback mode:', newUser)
          
          return NextResponse.json({
            success: true,
            message: 'Usuário criado e promovido para ADMIN (modo fallback)!',
            user: newUser
          })
        } else {
          // Promover usuário existente
          globalThis.fallbackUsers[userIndex].role = 'ADMIN'
          const promotedUser = globalThis.fallbackUsers[userIndex]
          
          console.log('✅ Usuário promovido no fallback mode:', promotedUser)
          
          return NextResponse.json({
            success: true,
            message: 'Usuário promovido para ADMIN (modo fallback)!',
            user: promotedUser
          })
        }
      }
      
      // Criar fallback array se não existir
      if (typeof globalThis !== 'undefined' && !globalThis.fallbackUsers) {
        globalThis.fallbackUsers = []
      }
      
      // Criar usuário no fallback
      const newUser = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0],
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      }
      
      if (typeof globalThis !== 'undefined') {
        globalThis.fallbackUsers.push(newUser)
      }
      
      console.log('✅ Usuário criado em fallback mode:', newUser)
      
      return NextResponse.json({
        success: true,
        message: 'Usuário criado e promovido para ADMIN (modo desenvolvimento)!',
        user: newUser
      })
    }
    
  } catch (error) {
    console.error('❌ Erro ao promover usuário:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    }, { status: 500 })
  }
}