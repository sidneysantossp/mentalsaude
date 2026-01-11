import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Try to execute a simple query to check database connection
    const { error } = await db
      .from('tests')
      .select('id', { head: true, count: 'exact' })

    if (error) {
      throw error
    }
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      fallback: false,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({
      status: 'degraded',
      database: 'disconnected',
      fallback: true,
      timestamp: new Date().toISOString(),
      error: errorMessage
    })
  }
}
