import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 })
    }
    
    // Senha padrão forte
    const newPassword = 'Admin@2024!'
    
    console.log('🔧 Criando nova senha para:', email)
    
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
        
        // Criar usuário no MySQL se não existir
        const bcrypt = require('bcryptjs')
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        
        await db.query(
          'INSERT INTO users (id, email, name, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            Date.now().toString(),
            email,
            email.split('@')[0],
            hashedPassword,
            'ADMIN',
            new Date(),
            new Date()
          ]
        )
        
        console.log('✅ Usuário criado no MySQL com senha padrão!')
        
        return NextResponse.json({
          success: true,
          message: 'Usuário criado com sucesso! Use a nova senha para fazer login.',
          credentials: {
            email: email,
            password: newPassword,
            role: 'ADMIN'
          },
          instructions: 'Acesse /auth/signin com estas credenciais'
        })
      }
      
      const user = users[0]
      console.log('✅ Usuário encontrado no MySQL:', user.email)
      
      // Garantir que é ADMIN
      if (user.role !== 'ADMIN') {
        await db.query(
          'UPDATE users SET role = ? WHERE email = ?',
          ['ADMIN', email]
        )
        console.log('✅ Usuário promovido para ADMIN!')
      }
      
      // Atualizar senha
      const bcrypt = require('bcryptjs')
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      
      await db.query(
        'UPDATE users SET password = ?, updatedAt = ? WHERE email = ?',
        [hashedPassword, new Date(), email]
      )
      
      console.log('✅ Senha atualizada com sucesso!')
      
      return NextResponse.json({
        success: true,
        message: 'Senha atualizada com sucesso! Use a nova senha para fazer login.',
        credentials: {
          email: email,
          password: newPassword,
          role: 'ADMIN'
        },
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'ADMIN'
        },
        instructions: 'Acesse /auth/signin com estas credenciais'
      })
      
    } catch (dbError) {
      console.log('⚠️ MySQL não disponível, usando fallback mode:', dbError.message)
      
      // Fallback: Usar memória local
      if (typeof globalThis !== 'undefined' && globalThis.fallbackUsers) {
        let user = globalThis.fallbackUsers.find((u: any) => u.email === email)
        
        if (!user) {
          // Criar usuário se não existir
          const bcrypt = require('bcryptjs')
          const hashedPassword = await bcrypt.hash(newPassword, 10)
          
          user = {
            id: Date.now().toString(),
            email: email,
            name: email.split('@')[0],
            password: hashedPassword,
            role: 'ADMIN',
            createdAt: new Date().toISOString()
          }
          
          globalThis.fallbackUsers.push(user)
          console.log('✅ Usuário criado no fallback mode!')
        } else {
          // Atualizar usuário existente
          const bcrypt = require('bcryptjs')
          const hashedPassword = await bcrypt.hash(newPassword, 10)
          
          user.password = hashedPassword
          user.role = 'ADMIN'
          
          console.log('✅ Usuário atualizado no fallback mode!')
        }
        
        return NextResponse.json({
          success: true,
          message: 'Senha criada com sucesso! (modo fallback)',
          credentials: {
            email: email,
            password: newPassword,
            role: 'ADMIN'
          },
          user: user,
          instructions: 'Acesse /auth/signin com estas credenciais'
        })
      }
      
      // Criar fallback array se não existir
      if (typeof globalThis !== 'undefined' && !globalThis.fallbackUsers) {
        globalThis.fallbackUsers = []
      }
      
      // Criar usuário no fallback
      const bcrypt = require('bcryptjs')
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      
      const newUser = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0],
        password: hashedPassword,
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      }
      
      if (typeof globalThis !== 'undefined') {
        globalThis.fallbackUsers.push(newUser)
      }
      
      console.log('✅ Usuário criado em fallback mode!')
      
      return NextResponse.json({
        success: true,
        message: 'Usuário e senha criados com sucesso! (modo desenvolvimento)',
        credentials: {
          email: email,
          password: newPassword,
          role: 'ADMIN'
        },
        user: newUser,
        instructions: 'Acesse /auth/signin com estas credenciais'
      })
    }
    
  } catch (error) {
    console.error('❌ Erro ao criar senha:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    }, { status: 500 })
  }
}