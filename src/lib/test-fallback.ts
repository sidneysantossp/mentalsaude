import type { TestSummary } from '@/types/tests'

export const DEFAULT_TEST_SUMMARIES: TestSummary[] = [
  {
    id: 'depression',
    slug: 'teste-de-depressao',
    title: 'Teste de Depressão',
    description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
    shortDescription: 'Questionário PHQ-9 para monitorar sintomas da última quinzena.',
    category: 'DEPRESSION',
    instructions:
      'Nos últimos 14 dias, com que frequência você foi incomodado(a) pelos itens da lista? Responda com honestidade.',
    timeLimit: 10,
    cardImage: '/images/depression-therapy.jpg',
    questionCount: 9
  },
  {
    id: 'anxiety',
    slug: 'teste-de-ansiedade',
    title: 'Teste de Ansiedade',
    description: 'Meça seus níveis de ansiedade e como ela impacta sua rotina',
    shortDescription: 'Questionário GAD-7 para rastrear sintomas de ansiedade em adultos.',
    category: 'ANXIETY',
    instructions:
      'Nos últimos 14 dias, com que frequência você teve os sinais descritos a seguir? Seja sincero(a).',
    timeLimit: 5,
    cardImage: '/images/anxiety-meditation.jpg',
    questionCount: 7
  },
  {
    id: 'compulsion',
    slug: 'teste-de-compulsao-alimentar',
    title: 'Teste de Compulsão Alimentar',
    description: 'Identifique padrões compulsivos e a relação com emoções',
    shortDescription: 'Escala que observa episódios de compulsão alimentar e impacto no cotidiano.',
    category: 'OCD',
    instructions:
      'Nos últimos três meses, com que frequência você vivenciou os comportamentos descritos? Registre com cuidado.',
    timeLimit: 15,
    cardImage: '/images/healthy-eating.jpg',
    questionCount: 10
  },
  {
    id: 'adhd',
    slug: 'teste-de-tdah',
    title: 'Teste de TDAH',
    description: 'Avalie sintomas de desatenção, hiperatividade e impulsividade',
    shortDescription: 'Checklist baseado no ASRS para triagem em adultos.',
    category: 'ADHD',
    instructions:
      'Reflita sobre seu comportamento habitual nos últimos seis meses e responda com honestidade.',
    timeLimit: 12,
    cardImage: '/images/adhd-focus.jpg',
    questionCount: 18
  },
  {
    id: 'stress',
    slug: 'teste-de-estresse',
    title: 'Teste de Estresse',
    description: 'Avalie seu nível de estresse atual e seus gatilhos',
    shortDescription: 'Escala de Estresse Percebido — monitore sua resposta ao entorno.',
    category: 'STRESS',
    instructions: 'Pense no último mês e responda como você tem lidado com pressão e demandas.',
    timeLimit: 5,
    cardImage: '/images/stress-management.jpg',
    questionCount: 10
  },
  {
    id: 'burnout',
    slug: 'teste-de-burnout',
    title: 'Teste de Burnout',
    description: 'Identifique sinais de esgotamento profissional e perda de energia',
    shortDescription: 'Avaliação rápida dos domínios emocional, físico e cognitivo.',
    category: 'BURNOUT',
    instructions: 'Avalie como o trabalho tem influenciado sua energia, motivação e desempenho.',
    timeLimit: 10,
    cardImage: '/images/burnout-work.jpg',
    questionCount: 12
  },
  {
    id: 'panic',
    slug: 'teste-transtorno-de-panico',
    title: 'Teste Transtorno de Pânico',
    description: 'Avalie crises de pânico e tensão extrema',
    shortDescription: 'Instrumento para identificar ataques de pânico e sintomas associados.',
    category: 'ANXIETY',
    instructions: 'Relembre episódios intensos e responda sobre frequência e impacto.',
    timeLimit: 8,
    cardImage: '/images/panic-disorder.jpg',
    questionCount: 15
  },
  {
    id: 'social-phobia',
    slug: 'teste-fobia-social',
    title: 'Teste Fobia Social',
    description: 'Identifique medos e ansiedade em situações sociais',
    shortDescription: 'Escala social que avalia medo de julgamento e evitamentos.',
    category: 'ANXIETY',
    instructions: 'Pense em como você se sente em interação com outras pessoas e responda.',
    timeLimit: 10,
    cardImage: '/images/social-phobia.jpg',
    questionCount: 17
  },
  {
    id: 'mental-suffering',
    slug: 'grau-de-sofrimento-mental',
    title: 'Grau de Sofrimento Mental',
    description: 'Meça o impacto do sofrimento psíquico no seu bem-estar',
    shortDescription: 'Instrumento amplo para mapear dores emocionais e registrar padrões.',
    category: 'DEPRESSION',
    instructions: 'Considere como tem se sentido nos últimos meses e registre cada afirmação.',
    timeLimit: 12,
    cardImage: '/images/mental-suffering.jpg',
    questionCount: 20
  }
]
