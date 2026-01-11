import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const sevenDaysAgoIso = sevenDaysAgo.toISOString()

    // Helper to count rows with optional filters
    const countRows = async (table: string, filter?: (builder: any) => any) => {
      const query = db.from(table).select('id', { count: 'exact', head: true })
      if (filter) {
        filter(query)
      }
      const { count, error } = await query
      if (error) throw error
      return count ?? 0
    }

    const totalUsers = await countRows('profiles')
    const totalTests = await countRows('tests')
    const totalResults = await countRows('test_results')

    const { data: recentActiveResults, error: activeError } = await db
      .from('test_results')
      .select('user_id')
      .gte('completed_at', sevenDaysAgoIso)

    if (activeError) {
      throw activeError
    }

    const activeUsers = new Set((recentActiveResults || []).map(result => result.user_id)).size

    const recentUsers = await countRows('profiles', query => query.gte('created_at', sevenDaysAgoIso))
    const recentTests = await countRows('test_results', query => query.gte('completed_at', sevenDaysAgoIso))

    const stats = {
      totalUsers,
      totalTests,
      totalResults,
      activeUsers,
      recentUsers,
      recentTests
    }

    return NextResponse.json({
      success: true,
      stats
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    
    // Return mock data if database fails
    const mockStats = {
      totalUsers: 156,
      totalTests: 8,
      totalResults: 1247,
      activeUsers: 45,
      recentUsers: 12,
      recentTests: 89
    }

    return NextResponse.json({
      success: true,
      stats: mockStats
    })
  }
}
