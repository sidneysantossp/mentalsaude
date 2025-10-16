import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Get test result with related data
    const testResult = await db.testResult.findUnique({
      where: { 
        id: params.id,
        userId: user.id // Ensure user can only access their own results
      },
      include: {
        test: true,
        user: {
          select: {
            name: true,
            email: true
          }
        },
        answers: {
          include: {
            question: true
          }
        }
      }
    })

    if (!testResult) {
      return NextResponse.json(
        { success: false, error: 'Resultado não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: testResult
    })

  } catch (error) {
    console.error('Erro ao buscar resultado do teste:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar resultado do teste' 
      },
      { status: 500 }
    )
  }
}