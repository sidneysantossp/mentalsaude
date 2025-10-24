import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const userId = resolvedParams.id

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            testResults: true
          }
        },
        testResults: {
          include: {
            test: {
              select: {
                title: true,
                category: true
              }
            }
          },
          orderBy: {
            completedAt: 'desc'
          },
          take: 10
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        testCount: user._count.testResults,
        testResults: user.testResults.map(result => ({
          id: result.id,
          testTitle: result.test.title,
          testCategory: result.test.category,
          totalScore: result.totalScore,
          category: result.category,
          completedAt: result.completedAt.toISOString()
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar usuário' },
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

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (role !== undefined) updateData.role = role
    if (password !== undefined) updateData.password = password // In production, this should be hashed

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        updatedAt: updatedUser.updatedAt.toISOString()
      }
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
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

    await db.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      success: true,
      message: 'Usuário excluído com sucesso'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir usuário' },
      { status: 500 }
    )
  }
}