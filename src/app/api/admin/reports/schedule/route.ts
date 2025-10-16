import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { reportType, frequency, recipients, emailEnabled, format } = await request.json()

    // Create scheduled report
    const scheduledReport = await db.scheduledReport.create({
      data: {
        reportType,
        frequency,
        recipients,
        emailEnabled,
        format,
        createdBy: session.user.id,
        isActive: true,
        nextRun: calculateNextRun(frequency)
      }
    })

    return NextResponse.json({ 
      message: 'Relatório agendado com sucesso',
      scheduledReport 
    })
  } catch (error) {
    console.error('Error scheduling report:', error)
    return NextResponse.json({ error: 'Erro ao agendar relatório' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const scheduledReports = await db.scheduledReport.findMany({
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ scheduledReports })
  } catch (error) {
    console.error('Error fetching scheduled reports:', error)
    return NextResponse.json({ error: 'Erro ao buscar relatórios agendados' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id, isActive, frequency, recipients } = await request.json()

    const updatedReport = await db.scheduledReport.update({
      where: { id },
      data: {
        isActive,
        frequency,
        recipients,
        nextRun: frequency ? calculateNextRun(frequency) : null
      }
    })

    return NextResponse.json({ 
      message: 'Relatório atualizado com sucesso',
      scheduledReport: updatedReport 
    })
  } catch (error) {
    console.error('Error updating scheduled report:', error)
    return NextResponse.json({ error: 'Erro ao atualizar relatório' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 })
    }

    await db.scheduledReport.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Relatório excluído com sucesso' })
  } catch (error) {
    console.error('Error deleting scheduled report:', error)
    return NextResponse.json({ error: 'Erro ao excluir relatório' }, { status: 500 })
  }
}

function calculateNextRun(frequency: string): Date {
  const now = new Date()
  
  switch (frequency) {
    case 'daily':
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(9, 0, 0, 0) // 9 AM
      return tomorrow
    
    case 'weekly':
      const nextWeek = new Date(now)
      nextWeek.setDate(nextWeek.getDate() + 7)
      nextWeek.setHours(9, 0, 0, 0) // 9 AM
      return nextWeek
    
    case 'monthly':
      const nextMonth = new Date(now)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      nextMonth.setDate(1) // First day of next month
      nextMonth.setHours(9, 0, 0, 0) // 9 AM
      return nextMonth
    
    default:
      return now
  }
}