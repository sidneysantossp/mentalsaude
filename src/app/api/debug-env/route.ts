import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '***configured***' : 'missing',
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json({
    message: 'Environment Variables Debug',
    environment: process.env.NODE_ENV,
    variables: envVars,
    timestamp: new Date().toISOString(),
  })
}
