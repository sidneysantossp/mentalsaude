import { NextRequest, NextResponse } from 'next/server'
import { getTestBySlug } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Mock data para testes específicos (fallback principal)
    const mockTests: Record<string, any> = {
      'teste-de-depressao': {
        id: 'depression',
        slug: 'teste-de-depressao',
        title: 'Teste de Depressão',
        description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
        category: 'DEPRESSION',
        timeLimit: 10,
        instructions: 'Para cada questão, selecione a resposta que melhor descreve com que frequência você teve este problema nas últimas 2 semanas.',
        questionCount: 9,
        difficulty: 'Fácil',
        estimatedTime: '10 min',
        questions: [
          { id: '1', text: 'Pouco interesse ou prazer em fazer as coisas', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 1 },
          { id: '2', text: 'Humor deprimido, tristeza ou desesperança', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 2 },
          { id: '3', text: 'Dificuldade para adormecer ou permanecer dormindo', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 3 },
          { id: '4', text: 'Cansaço ou falta de energia', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 4 },
          { id: '5', text: 'Falta de apetite ou comer excessivamente', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 5 },
          { id: '6', text: 'Sentimento de negatividade sobre si mesmo', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 6 },
          { id: '7', text: 'Dificuldade de concentração', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 7 },
          { id: '8', text: 'Movimentos lentos ou agitação', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 8 },
          { id: '9', text: 'Pensamentos de autopunição', type: 'LIKERT_SCALE', options: 'Nenhuma vez|Vários dias|Mais de metade dos dias|Quase todos os dias', order: 9 }
        ]
      },
      'teste-fobia-social': {
        id: 'social-phobia',
        slug: 'teste-fobia-social',
        title: 'Teste Fobia Social',
        description: 'Identifique medos e ansiedade em situações sociais',
        category: 'ANXIETY',
        timeLimit: 10,
        instructions: 'Pense em como você se sente em situações sociais e responda com honestidade.',
        questionCount: 17,
        difficulty: 'Médio',
        estimatedTime: '10 min',
        questions: [
          { id: '1', text: 'Evitar situações sociais por medo', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 1 },
          { id: '2', text: 'Medo de ser julgado negativamente', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 2 },
          { id: '3', text: 'Ansiedade antes de eventos sociais', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 3 },
          { id: '4', text: 'Dificuldade em falar com estranhos', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 4 },
          { id: '5', text: 'Evitar contato visual', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 5 },
          { id: '6', text: 'Medo de dizer algo inadequado', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 6 },
          { id: '7', text: 'Sintomas físicos em situações sociais', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 7 },
          { id: '8', text: 'Evitar ser o centro das atenções', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 8 },
          { id: '9', text: 'Dificuldade em fazer apresentações', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 9 },
          { id: '10', text: 'Medo de encontros sociais', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 10 },
          { id: '11', text: 'Evitar restaurantes lotados', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 11 },
          { id: '12', text: 'Dificuldade em usar telefones públicos', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 12 },
          { id: '13', text: 'Evitar festas e eventos', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 13 },
          { id: '14', text: 'Medo de trabalhar sendo observado', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 14 },
          { id: '15', text: 'Dificuldade em ir ao banheiro público', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 15 },
          { id: '16', text: 'Evitar conversas com autoridades', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 16 },
          { id: '17', text: 'Medo de escrever sendo observado', type: 'LIKERT_SCALE', options: 'Nunca|Raramente|Às vezes|Frequentemente|Sempre', order: 17 }
        ]
      },
      'teste-de-ansiedade': {
        id: 'anxiety',
        slug: 'teste-de-ansiedade',
        title: 'Teste de Ansiedade',
        description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
        category: 'ANXIETY',
        timeLimit: 15,
        instructions: 'Responda com honestidade sobre como você se sentiu nas últimas semanas.',
        questionCount: 14,
        difficulty: 'Médio',
        estimatedTime: '15 min',
        questions: [
          { id: '1', text: 'Sentir-se nervoso ou ansioso', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 1 },
          { id: '2', text: 'Preocupação excessiva com o futuro', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 2 },
          { id: '3', text: 'Dificuldade em relaxar', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 3 },
          { id: '4', text: 'Sensação de pânico iminente', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 4 },
          { id: '5', text: 'Evitar situações que causam ansiedade', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 5 },
          { id: '6', text: 'Tensão muscular frequente', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 6 },
          { id: '7', text: 'Pensamentos catastróficos', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 7 },
          { id: '8', text: 'Dificuldade em concentrar-se', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 8 },
          { id: '9', text: 'Sintomas físicos (taquicardia, sudorese)', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 9 },
          { id: '10', text: 'Medo de perder o controle', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 10 },
          { id: '11', text: 'Inquietação constante', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 11 },
          { id: '12', text: 'Problemas de sono por ansiedade', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 12 },
          { id: '13', text: 'Evitar tomar decisões importantes', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 13 },
          { id: '14', text: 'Impacto na vida diária', type: 'LIKERT_SCALE', options: 'Nunca|Poucas vezes|Frequentemente|Quase sempre', order: 14 }
        ]
      }
    }

    // Verificar se o slug existe nos mocks
    const mockTest = mockTests[slug]
    if (mockTest) {
      return NextResponse.json(mockTest)
    }

    // Tentar buscar do Supabase apenas se não encontrar nos mocks
    try {
      const test = await getTestBySlug(slug)
      if (test) {
        return NextResponse.json(test)
      }
    } catch (dbError) {
      console.log('Supabase não disponível, usando apenas mocks')
    }

    // Se não encontrar em nenhum lugar
    return NextResponse.json(
      { error: 'Teste não encontrado' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Erro ao buscar teste:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar teste' },
      { status: 500 }
    )
  }
}
