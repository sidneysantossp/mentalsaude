import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 })
    }
    
    console.log('Promoting user:', email)
    
    try {
      const { data: user, error } = await db
        .from('profiles')
        .select('id, email, name, role')
        .eq('email', email)
        .maybeSingle()
      
      if (error) {
        throw error
      }
      
      if (!user) {
        console.log('User not found in Supabase')
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
      }
      
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
      
      const { error: updateError } = await db
        .from('profiles')
        .update({ role: 'ADMIN' })
        .eq('email', email)
      
      if (updateError) {
        throw updateError
      }
      
      console.log('User promoted in Supabase')
      
      return NextResponse.json({
        success: true,
        message: 'Usuário promovido para ADMIN com sucesso!',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'ADMIN'
        }
      })
    } catch (dbError) {
      console.log('Supabase not available, using fallback mode:', (dbError as Error).message)
      
      if (typeof globalThis !== 'undefined' && (globalThis as any).fallbackUsers) {
        const userIndex = (globalThis as any).fallbackUsers.findIndex((u: any) => u.email === email)
        
        if (userIndex === -1) {
          const newUser = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            role: 'ADMIN',
            createdAt: new Date().toISOString()
          }
          ;(globalThis as any).fallbackUsers.push(newUser)
          
          console.log('User created and promoted in fallback mode:', newUser)
          
          return NextResponse.json({
            success: true,
            message: 'Usuário criado e promovido para ADMIN (modo fallback)!',
            user: newUser
          })
        } else {
          (globalThis as any).fallbackUsers[userIndex].role = 'ADMIN'
          const promotedUser = (globalThis as any).fallbackUsers[userIndex]
          
          console.log('User promoted in fallback mode:', promotedUser)
          
          return NextResponse.json({
            success: true,
            message: 'Usuário promovido para ADMIN (modo fallback)!',
            user: promotedUser
          })
        }
      }
      
      if (typeof globalThis !== 'undefined' && !(globalThis as any).fallbackUsers) {
        ;(globalThis as any).fallbackUsers = []
      }
      
      const newUser = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      }
      
      if (typeof globalThis !== 'undefined') {
        ;(globalThis as any).fallbackUsers.push(newUser)
      }
      
      console.log('User created in fallback mode:', newUser)
      
      return NextResponse.json({
        success: true,
        message: 'Usuário criado e promovido para ADMIN (modo fallback)!',
        user: newUser
      })
    }
    
  } catch (error) {
    console.error('Erro ao promover usuário:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: (error as Error).message 
    }, { status: 500 })
  }
}
