import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Return current settings (in a real app, these would be stored in database)
    const settings = {
      siteName: 'Plataforma de Saúde Mental',
      siteDescription: 'Avaliações psicológicas online para compreender melhor seu bem-estar emocional',
      contactEmail: 'contato@saudemental.com',
      maxUsers: 1000,
      allowRegistration: true,
      emailNotifications: true,
      maintenanceMode: false,
      aiServiceEnabled: true,
      dataRetentionDays: 365
    }

    return NextResponse.json({
      success: true,
      settings
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar configurações' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, these would be saved to database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Configurações salvas com sucesso'
    })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar configurações' },
      { status: 500 }
    )
  }
}