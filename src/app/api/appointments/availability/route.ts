import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const professionalId = searchParams.get('professionalId')
    const date = searchParams.get('date')

    if (!professionalId || !date) {
      return NextResponse.json({
        error: 'ID do profissional e data são obrigatórios'
      }, { status: 400 })
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

    // Buscar agendamentos existentes no dia
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const existingAppointments = await db.appointment.findMany({
      where: {
        professionalId,
        scheduledFor: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      },
      select: {
        scheduledFor: true
      }
    })

    // Gerar horários disponíveis (ex: das 8h às 18h, de hora em hora)
    const availableSlots = []
    const startHour = 8
    const endHour = 18
    const slotDuration = 60 // minutos

    for (let hour = startHour; hour < endHour; hour++) {
      const slotTime = new Date(date)
      slotTime.setHours(hour, 0, 0, 0)

      // Verificar se o horário já está ocupado
      const isBooked = existingAppointments.some(appointment => {
        const appointmentTime = new Date(appointment.scheduledFor)
        return appointmentTime.getHours() === hour
      })

      // Verificar se o horário está no futuro
      const isFuture = slotTime > new Date()

      if (!isBooked && isFuture) {
        availableSlots.push({
          time: slotTime.toISOString(),
          available: true,
          formatted: `${hour.toString().padStart(2, '0')}:00`
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        professional: {
          id: professional.id,
          name: professional.name,
          specialty: professional.specialty
        },
        date,
        availableSlots,
        totalSlots: availableSlots.length
      }
    })

  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}