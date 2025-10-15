import { NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

export async function GET() {
  try {
    // Try to execute a simple query to check database connection
    await query('SELECT 1')
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      fallback: false,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      status: 'degraded',
      database: 'disconnected',
      fallback: true,
      timestamp: new Date().toISOString(),
      error: error.message
    })
  }
}