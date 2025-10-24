import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { testTitle, score, category, maxScore, answers } = await request.json()

    // Validação dos dados de entrada
    if (!testTitle || score === undefined || !category || !maxScore) {
      return NextResponse.json(
        { error: 'Dados insuficientes para gerar resumo' },
        { status: 400 }
      )
    }

    // Validação de faixa de pontuação
    if (score < 0 || score > maxScore) {
      return NextResponse.json(
        { error: 'Pontuação inválida' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    // Calcular porcentagem
    const scorePercentage = Math.min((score / maxScore) * 100, 100)

    // Analisar padrões nas respostas (limitar para não exceder o contexto)
    const answerPatterns = answers && Array.isArray(answers) 
      ? answers.slice(0, 10).map((answer: any) => ({
          question: answer.question?.text || 'Pergunta não disponível',
          value: answer.value || 'Resposta não disponível',
          score: answer.score || 0
        }))
      : []

    // Criar prompt para a IA
    const prompt = `Como um especialista em saúde mental, analise os seguintes resultados do teste "${testTitle}" e gere um resumo personalizado e empático:

DADOS DO TESTE:
- Título: ${testTitle}
- Pontuação: ${score}/${maxScore} (${scorePercentage.toFixed(1)}%)
- Categoria/Nível: ${category}
- Número de perguntas: ${answers?.length || 0}

ANÁLISE DAS RESPOSTAS:
${answerPatterns.length > 0 ? answerPatterns.map((pattern: any, index: number) => 
  `${index + 1}. Pergunta: "${pattern.question}" - Resposta: "${pattern.value}" (Pontuação: ${pattern.score})`
).join('\n') : 'Respostas não disponíveis'}

INSTRUÇÕES:
1. Gere um resumo personalizado baseado na pontuação e categoria
2. Seja empático e construtivo, nunca alarmista
3. Forneça insights específicos baseados nos padrões das respostas
4. Inclua recomendações práticas e acionáveis
5. Mantenha um tom profissional e acolhedor
6. Estruture o resumo em 3-4 parágrafos curtos
7. Se a pontuação for alta ou severa, sugira gentilmente a busca por ajuda profissional

IMPORTANTE:
- Não faça diagnósticos médicos
- Use linguagem acessível e encorajadora
- Foque em autoconhecimento e bem-estar
- Inclua sempre uma nota sobre a importância de buscar ajuda profissional quando necessário

Gere o resumo em português brasileiro com no máximo 600 palavras.`

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em saúde mental com experiência em avaliações psicológicas. Sua função é fornecer insights construtivos e empáticos baseados em resultados de testes, sempre mantendo um tom profissional e acolhedor.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const aiSummary = completion.choices[0]?.message?.content

    if (!aiSummary) {
      throw new Error('Falha ao gerar resumo da IA')
    }

    return NextResponse.json({
      success: true,
      data: {
        summary: aiSummary.trim(),
        generatedAt: new Date().toISOString(),
        metadata: {
          testTitle,
          score,
          category,
          scorePercentage: scorePercentage.toFixed(1)
        }
      }
    })

  } catch (error: any) {
    console.error('Erro ao gerar resumo com IA:', error)
    
    // Retornar erro específico baseado no tipo de problema
    if (error.message?.includes('API key') || error.message?.includes('authentication')) {
      return NextResponse.json(
        { error: 'Erro de configuração da API de IA' },
        { status: 500 }
      )
    }
    
    if (error.message?.includes('timeout')) {
      return NextResponse.json(
        { error: 'Tempo esgotado ao gerar resumo' },
        { status: 408 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Erro ao gerar resumo personalizado',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}