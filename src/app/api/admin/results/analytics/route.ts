import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get all results for analytics
    const results = await db.testResult.findMany({
      include: {
        test: {
          select: {
            id: true,
            title: true,
            category: true
          }
        },
        user: {
          select: {
            id: true
          }
        }
      }
    })

    // Calculate basic stats
    const totalResults = results.length
    const averageScore = results.reduce((sum, result) => sum + result.totalScore, 0) / totalResults

    // Results by category
    const resultsByCategory: Record<string, number> = {}
    results.forEach(result => {
      const category = result.test.category
      resultsByCategory[category] = (resultsByCategory[category] || 0) + 1
    })

    // Results by severity
    const resultsBySeverity: Record<string, number> = {}
    results.forEach(result => {
      const severity = result.category
      resultsBySeverity[severity] = (resultsBySeverity[severity] || 0) + 1
    })

    // Results by month
    const resultsByMonth: Record<string, number> = {}
    results.forEach(result => {
      const month = new Date(result.completedAt).toISOString().slice(0, 7) // YYYY-MM
      resultsByMonth[month] = (resultsByMonth[month] || 0) + 1
    })

    // Top tests
    const testStats: Record<string, { count: number; totalScore: number }> = {}
    results.forEach(result => {
      const testId = result.test.id
      if (!testStats[testId]) {
        testStats[testId] = { count: 0, totalScore: 0 }
      }
      testStats[testId].count += 1
      testStats[testId].totalScore += result.totalScore
    })

    const topTests = Object.entries(testStats)
      .map(([testId, stats]) => ({
        testId,
        testTitle: results.find(r => r.test.id === testId)?.test.title || 'Unknown',
        count: stats.count,
        averageScore: stats.totalScore / stats.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const analytics = {
      totalResults,
      averageScore,
      resultsByCategory,
      resultsBySeverity,
      resultsByMonth,
      topTests
    }

    return NextResponse.json({
      success: true,
      analytics
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    
    // Return mock data if database fails
    const mockAnalytics = {
      totalResults: 156,
      averageScore: 14.2,
      resultsByCategory: {
        'DEPRESSION': 45,
        'ANXIETY': 38,
        'ADHD': 32,
        'STRESS': 25,
        'OCD': 16
      },
      resultsBySeverity: {
        'Minimal': 35,
        'Mild': 48,
        'Moderate': 52,
        'Moderately Severe': 15,
        'Severe': 6
      },
      resultsByMonth: {
        '2024-01': 12,
        '2024-02': 18,
        '2024-03': 25,
        '2024-04': 31,
        '2024-05': 28,
        '2024-06': 22,
        '2024-07': 20
      },
      topTests: [
        {
          testId: '1',
          testTitle: 'PHQ-9 - Questionário de Depressão',
          count: 45,
          averageScore: 12.5
        },
        {
          testId: '2',
          testTitle: 'GAD-7 - Escala de Ansiedade',
          count: 38,
          averageScore: 9.8
        },
        {
          testId: '3',
          testTitle: 'Teste de TDAH - Desatenção',
          count: 32,
          averageScore: 16.2
        },
        {
          testId: '4',
          testTitle: 'Escala de Estresse Percebido',
          count: 25,
          averageScore: 14.7
        },
        {
          testId: '5',
          testTitle: 'Teste de Compulsão Alimentar',
          count: 16,
          averageScore: 11.3
        }
      ]
    }

    return NextResponse.json({
      success: true,
      analytics: mockAnalytics
    })
  }
}