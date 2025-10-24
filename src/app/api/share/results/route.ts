import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, testResult, testTitle, shareUrl } = await request.json()

    if (!email || !testResult) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use a service like SendGrid, Nodemailer, or Resend
    // For now, we'll simulate the email sending
    
    const emailContent = {
      to: email,
      subject: `Resultados do Teste: ${testTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Resultados do Teste Psicológico</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${testTitle}</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #374151; margin-bottom: 20px;">Seus Resultados</h2>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="color: #6b7280;">Pontuação:</span>
                <span style="font-size: 24px; font-weight: bold; color: #4f46e5;">${testResult.percentage}%</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="color: #6b7280;">Nível:</span>
                <span style="background: #ddd6fe; color: #7c3aed; padding: 5px 15px; border-radius: 20px; font-weight: 500;">
                  ${testResult.severity}
                </span>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #6b7280;">Pontos:</span>
                <span style="font-weight: 600;">${testResult.score}/${testResult.maxScore}</span>
              </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #374151; margin-bottom: 10px;">Interpretação</h3>
              <p style="color: #6b7280; line-height: 1.6;">${testResult.interpretation}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #374151; margin-bottom: 10px;">Recomendações</h3>
              <p style="color: #6b7280; line-height: 1.6; white-space: pre-line;">${testResult.recommendations}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${shareUrl}" style="background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500;">
                Ver Resultados Completos
              </a>
            </div>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280;">
            <p style="margin: 0; font-size: 14px;">
              Este relatório foi gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
            </p>
            <p style="margin: 10px 0 0 0; font-size: 12px;">
              Este resultado é uma ferramenta de autoavaliação e não substitui uma consulta profissional.
            </p>
          </div>
        </div>
      `
    }

    // Simulate email sending (in production, use a real email service)
    console.log('Email would be sent to:', email)
    console.log('Email content:', emailContent.html)

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: 'Resultados compartilhados com sucesso!'
    })

  } catch (error) {
    console.error('Error sharing results:', error)
    return NextResponse.json(
      { error: 'Erro ao compartilhar resultados' },
      { status: 500 }
    )
  }
}