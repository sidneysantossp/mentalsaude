import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const userResultSelect = `
  *,
  test:tests (
    title,
    category
  )
`

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const userId = resolvedParams.id

    const { data: user, error } = await db
      .from('profiles')
      .select('id, name, email, role, created_at, updated_at')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      )
    }

    const { count: testCount = 0, error: countError } = await db
      .from('test_results')
      .select('id', { head: true, count: 'exact' })
      .eq('user_id', userId)

    if (countError) {
      throw countError
    }

    const { data: testResults, error: resultsError } = await db
      .from('test_results')
      .select(userResultSelect)
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(10)

    if (resultsError) {
      throw resultsError
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        testCount,
        testResults: (testResults || []).map(result => ({
          id: result.id,
          testTitle: result.test?.title,
          testCategory: result.test?.category,
          totalScore: result.total_score,
          category: result.category,
          completedAt: result.completed_at
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar usuario' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const userId = resolvedParams.id
    const body = await request.json()
    const { name, email, role, password } = body

    const updateData: Record<string, any> = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (role !== undefined) updateData.role = role
    if (password !== undefined) updateData.password_hash = password

    const { data: updatedUser, error } = await db
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select('id, name, email, role, updated_at')
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!updatedUser) {
      throw new Error('Usuario nao encontrado apos atualizacao')
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        updatedAt: updatedUser.updated_at
      }
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar usuario' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const userId = resolvedParams.id

    const { error } = await db
      .from('profiles')
      .delete()
      .eq('id', userId)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario excluido com sucesso'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir usuario' },
      { status: 500 }
    )
  }
}
