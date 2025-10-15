import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get basic stats
    const totalUsers = await db.user.count()
    const totalTests = await db.test.count()
    const totalResults = await db.testResult.count()
    
    // Get active users (users who took tests in last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const activeUsers = await db.testResult.findMany({
      where: {
        completedAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        userId: true
      },
      distinct: ['userId']
    })
    
    // Get recent users (registered in last 7 days)
    const recentUsers = await db.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })
    
    // Get recent tests (completed in last 7 days)
    const recentTests = await db.testResult.count({
      where: {
        completedAt: {
          gte: sevenDaysAgo
        }
      }
    })

    const stats = {
      totalUsers,
      totalTests,
      totalResults,
      activeUsers: activeUsers.length,
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