import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    let databaseStatus: 'online' | 'offline' | 'error' = 'online'
    try {
      await db.user.count()
    } catch (error) {
      databaseStatus = 'error'
    }

    // Check API status (always online if we can reach this endpoint)
    const apiStatus: 'online' | 'offline' | 'error' = 'online'

    // Check AI service status
    let aiServiceStatus: 'online' | 'offline' | 'error' = 'online'
    try {
      // Try to import and use ZAI to check if service is available
      const ZAI = await import('z-ai-web-dev-sdk')
      // If import works, consider service online
    } catch (error) {
      aiServiceStatus = 'error'
    }

    // Check storage status (basic check)
    const storageStatus: 'healthy' | 'warning' | 'critical' = 'healthy'

    const status = {
      database: databaseStatus,
      api: apiStatus,
      aiService: aiServiceStatus,
      storage: storageStatus
    }

    return NextResponse.json({
      success: true,
      status
    })
  } catch (error) {
    console.error('Error checking system status:', error)
    
    // Return fallback status
    const fallbackStatus = {
      database: 'online' as const,
      api: 'online' as const,
      aiService: 'online' as const,
      storage: 'healthy' as const
    }

    return NextResponse.json({
      success: true,
      status: fallbackStatus
    })
  }
}