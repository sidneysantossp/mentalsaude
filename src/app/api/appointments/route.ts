import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const professionalId = searchParams.get('professionalId')
    const date = searchParams.get('date')
    const status = searchParams.get('status')

    // Buscar usuário logado
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Construir filtros
    const where: any = {}
    
    if (user.role === 'USER') {
      where.userId = user.id
    } else if (user.role === 'PROFESSIONAL') {
      where.professionalId = user.id
    }

    if (professionalId) {
      where.professionalId = professionalId
    }

    if (date) {
      where.scheduledFor = {
        gte: new Date(date),
        lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      }
    }

    if (status) {
      where.status = status
    }

    const appointments = await db.appointment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        professional: {
          select: {
            id: true,
            name: true,
            specialty: true,
            email: true
          }
        }
      },
      orderBy: {
        scheduledFor: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: appointments
    })

  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { professionalId, scheduledFor, notes } = body

    if (!professionalId || !scheduledFor) {
      return NextResponse.json({
        error: 'ID do profissional e data/hora são obrigatórios'
      }, { status: 400 })
    }

    // Buscar usuário logado
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Verificar se o profissional existe e está ativo
    const professional = await db.professional.findUnique({
      where: { 
        id: professionalId,
        isActive: true 
      }
    })

    if (!professional) {
      return NextResponse.json({
        error: 'Profissional não encontrado ou inativo'
      }, { status: 404 })
    }

    // Verificar se já existe agendamento no mesmo horário
    const existingAppointment = await db.appointment.findFirst({
      where: {
        professionalId,
        scheduledFor: new Date(scheduledFor),
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      }
    })

    if (existingAppointment) {
      return NextResponse.json({
        error: 'Horário já está agendado'
      }, { status: 409 })
    }

    // Verificar se o usuário já tem agendamento no mesmo horário
    const userExistingAppointment = await db.appointment.findFirst({
      where: {
        userId: user.id,
        scheduledFor: new Date(scheduledFor),
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      }
    })

    if (userExistingAppointment) {
      return NextResponse.json({
        error: 'Você já possui um agendamento neste horário'
      }, { status: 409 })
    }

    // Criar agendamento
    const appointment = await db.appointment.create({
      data: {
        userId: user.id,
        professionalId,
        scheduledFor: new Date(scheduledFor),
        notes: notes || null,
        status: 'SCHEDULED'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        professional: {
          select: {
            id: true,
            name: true,
            specialty: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: appointment,
      message: 'Agendamento realizado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}