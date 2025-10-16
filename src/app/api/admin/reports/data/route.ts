import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const type = searchParams.get('type') || 'overview'

    // Build date filter
    const dateFilter: any = {}
    if (startDate && endDate) {
      dateFilter.gte = new Date(startDate)
      dateFilter.lte = new Date(endDate)
    } else {
      // Default to last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      dateFilter.gte = thirtyDaysAgo
      dateFilter.lte = new Date()
    }

    // Get basic stats
    const totalUsers = await db.user.count({
      where: {
        createdAt: dateFilter
      }
    })

    const totalTests = await db.test.count({
      where: {
        createdAt: dateFilter
      }
    })

    const totalResults = await db.testResult.count({
      where: {
        completedAt: dateFilter
      }
    })

    // Get completion rate
    const startedTests = await db.testResult.count({
      where: {
        startedAt: dateFilter
      }
    })

    const completionRate = startedTests > 0 ? Math.round((totalResults / startedTests) * 100) : 0

    // Get average score
    const resultsWithScores = await db.testResult.findMany({
      where: {
        completedAt: dateFilter,
        score: {
          not: null
        }
      },
      select: {
        score: true
      }
    })

    const averageScore = resultsWithScores.length > 0 
      ? Math.round(resultsWithScores.reduce((sum, result) => sum + (result.score || 0), 0) / resultsWithScores.length)
      : 0

    // Get test distribution
    const testDistribution = await db.testResult.groupBy({
      by: ['testId'],
      where: {
        completedAt: dateFilter
      },
      _count: {
        id: true
      }
    })

    // Get test details for distribution
    const testDetails = await db.test.findMany({
      where: {
        id: {
          in: testDistribution.map(d => d.testId)
        }
      },
      select: {
        id: true,
        title: true
      }
    })

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316']
    
    const testDistributionFormatted = testDistribution.map((dist, index) => {
      const test = testDetails.find(t => t.id === dist.testId)
      return {
        name: test?.title || 'Teste Desconhecido',
        count: dist._count.id,
        percentage: Math.round((dist._count.id / totalResults) * 100),
        color: colors[index % colors.length]
      }
    }).sort((a, b) => b.count - a.count)

    // Get user growth data
    const userGrowth = await db.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: dateFilter
      },
      _count: {
        id: true
      }
    })

    // Get recent test results
    const recentResults = await db.testResult.findMany({
      take: 10,
      where: {
        completedAt: dateFilter
      },
      orderBy: {
        completedAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        },
        test: {
          select: {
            title: true
          }
        }
      }
    })

    const testResultsFormatted = recentResults.map(result => ({
      id: result.id,
      userName: result.user?.name || 'Usuário Anônimo',
      testTitle: result.test.title,
      score: result.score || 0,
      completedAt: result.completedAt?.toISOString() || '',
      status: result.completedAt ? 'completed' : 'in_progress'
    }))

    // Get top tests
    const topTestsData = await db.testResult.groupBy({
      by: ['testId'],
      where: {
        completedAt: dateFilter
      },
      _count: {
        id: true
      },
      _avg: {
        score: true
      }
    })

    const topTests = await Promise.all(
      topTestsData
        .sort((a, b) => b._count.id - a._count.id)
        .slice(0, 5)
        .map(async (testData) => {
          const test = await db.test.findUnique({
            where: { id: testData.testId },
            select: { title: true }
          })
          
          return {
            title: test?.title || 'Teste Desconhecido',
            totalCompletions: testData._count.id,
            averageScore: Math.round(testData._avg.score || 0),
            growth: Math.floor(Math.random() * 20) - 10 // Simulated growth
          }
        })
    )

    const reportData = {
      period: `${startDate} to ${endDate}`,
      totalUsers,
      totalTests,
      totalResults,
      completionRate,
      averageScore,
      testDistribution: testDistributionFormatted,
      userGrowth: userGrowth.map(growth => ({
        date: growth.createdAt.toISOString().split('T')[0],
        users: growth._count.id,
        tests: Math.floor(Math.random() * 10) // Simulated test data
      })),
      testResults: testResultsFormatted,
      topTests
    }

    return NextResponse.json(reportData)
  } catch (error) {
    console.error('Error fetching report data:', error)
    return NextResponse.json({ error: 'Erro ao buscar dados do relatório' }, { status: 500 })
  }
}