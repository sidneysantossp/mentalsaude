import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const testCategory = searchParams.get('testCategory')

    // Get historical test results
    const whereClause: any = {
      userId: user.id
    }

    if (testCategory) {
      whereClause.test = {
        category: testCategory
      }
    }

    const historicalResults = await db.testResult.findMany({
      where: whereClause,
      include: {
        test: {
          select: {
            category: true,
            title: true
          }
        }
      },
      orderBy: {
        completedAt: 'asc'
      },
      take: 20 // Limit to last 20 results
    })

    // Format data for charts
    const formattedData = historicalResults.map(result => ({
      date: result.completedAt.toISOString(),
      score: result.totalScore,
      category: result.category,
      testTitle: result.test.title,
      testCategory: result.test.category
    }))

    return NextResponse.json({
      success: true,
      data: formattedData
    })

  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar dados históricos' 
      },
      { status: 500 }
    )
  }
}