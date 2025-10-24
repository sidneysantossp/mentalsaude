import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get('specialty')
    const active = searchParams.get('active')

    // Construir filtros
    const where: any = {}
    
    if (specialty) {
      where.specialty = {
        contains: specialty,
        mode: 'insensitive'
      }
    }

    if (active !== null) {
      where.isActive = active === 'true'
    }

    const professionals = await db.professional.findMany({
      where,
      select: {
        id: true,
        name: true,
        specialty: true,
        bio: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: {
            appointments: {
              where: {
                status: 'COMPLETED'
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Adicionar informações adicionais
    const professionalsWithStats = professionals.map(prof => ({
      ...prof,
      completedAppointments: prof._count.appointments,
      rating: 4.5 + Math.random() * 0.5, // Simulação de rating
      experience: Math.floor(Math.random() * 20) + 1 // Simulação de anos de experiência
    }))

    return NextResponse.json({
      success: true,
      data: professionalsWithStats
    })

  } catch (error) {
    console.error('Erro ao buscar profissionais:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, specialty, credentials, bio } = body

    if (!name || !email || !specialty || !credentials) {
      return NextResponse.json({
        error: 'Nome, email, especialidade e credenciais são obrigatórios'
      }, { status: 400 })
    }

    // Verificar se email já existe
    const existingProfessional = await db.professional.findUnique({
      where: { email }
    })

    if (existingProfessional) {
      return NextResponse.json({
        error: 'Email já cadastrado'
      }, { status: 409 })
    }

    const professional = await db.professional.create({
      data: {
        name,
        email,
        specialty,
        credentials,
        bio: bio || null,
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      data: professional,
      message: 'Profissional cadastrado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao criar profissional:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}