import { NextRequest, NextResponse } from 'next/server'
import { getTests } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const tests = await getTests()
    return NextResponse.json(tests)
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar testes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // TODO: Implement test creation
    return NextResponse.json(
      { message: 'Test creation not implemented yet' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Error creating test:', error)
    return NextResponse.json(
      { error: 'Erro ao criar teste' },
      { status: 500 }
    )
  }
}