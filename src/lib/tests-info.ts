export type TestConditionLink = {
  label: string
  slug: string
}

export type TestScoringRange = {
  label: string
  min: number
  max: number
  guidance: string
}

export type TestInstrumentData = {
  slug: string
  title: string
  description: string
  tagline: string
  summaryPoints: string[]
  scoring: {
    title: string
    detail: string
    ranges: TestScoringRange[]
  }
  validation: {
    title: string
    details: string[]
  }
  nextSteps: {
    title: string
    actions: string[]
  }
  faqs: { question: string; answer: string }[]
  relatedConditions: TestConditionLink[]
  decisionPages: { label: string; slug: string }[]
}

const genericRanges = (
  step: number,
  startLabel: string,
  endLabel: string,
  descriptions: string[]
): TestScoringRange[] => {
  return descriptions.map((guidance, index) => ({
    label: `${index + 1}`,
    min: index * step,
    max: (index + 1) * step - 1,
    guidance
  }))
}

export const testsInfo: Record<string, TestInstrumentData> = {
  'phq-9': {
    slug: 'phq-9',
    title: 'PHQ-9 (Patient Health Questionnaire)',
    description:
      'Escala de avaliação de sintomas depressivos baseada nos nove critérios do DSM-5. Foi validada em diferentes populações e é amplamente usada para triagem.',
    tagline: 'Triagem confiável para sintomas de depressão em adultos.',
    summaryPoints: [
      'Baseado nos critérios diagnósticos do DSM e validado em várias amostras brasileiras.',
      'Pontuação de 0 a 27 dividida em faixas de gravidade.',
      'Inclui questões de segurança e orienta próximos passos de cuidado.'
    ],
    scoring: {
      title: 'Interpretação da pontuação',
      detail: 'Cada pergunta vale de 0 a 3. A soma indica a gravidade dos sintomas, mas não substitui avaliação clínica.',
      ranges: [
        {
          label: '0–4',
          min: 0,
          max: 4,
          guidance: 'Sintomas mínimos ou ausentes. Reavaliação periódica.'
        },
        {
          label: '5–9',
          min: 5,
          max: 9,
          guidance: 'Sintomas leves. Monitoramento e autocuidado.'
        },
        {
          label: '10–14',
          min: 10,
          max: 14,
          guidance: 'Sintomas moderados. Considere falar com profissional.'
        },
        {
          label: '15–19',
          min: 15,
          max: 19,
          guidance: 'Sintomas moderadamente graves. Busque avaliação clínica.'
        },
        {
          label: '20–27',
          min: 20,
          max: 27,
          guidance: 'Sintomas graves. Procure ajuda imediata.'
        }
      ]
    },
    validation: {
      title: 'Validação e referências',
      details: [
        'Desenvolvido por Spitzer et al. e adaptado para português brasileiro por Santos et al.',
        'Alto índice de sensibilidade/especificidade para identificação de depressão maior em estudos ambulatoriais.',
        'Recomendado por diretrizes como o Brasil Diretrizes e a OMS para triagem inicial.'
      ]
    },
    nextSteps: {
      title: 'Após o teste',
      actions: [
        'Converse com seu médico/psicólogo sobre os itens mais frequentes.',
        'Se a pontuação for moderada ou grave, agende uma avaliação completa.',
        'Use recursos imediatos em caso de risco (linha CVV, chat 188).'
      ]
    },
    faqs: [
      {
        question: 'O PHQ-9 pode diagnosticar depressão?',
        answer:
          'Não. Ele indica níveis de sintomas e sugere monitoramento, mas o diagnóstico depende de entrevista clínica.'
      },
      {
        question: 'Posso refazer o PHQ-9 com frequência?',
        answer:
          'Sim, especialmente se estiver em tratamento. Compare os resultados para avaliar resposta terapêutica.'
      }
    ],
    relatedConditions: [
      { label: 'Depressão', slug: 'depressao' },
      { label: 'Ansiedade', slug: 'ansiedade' }
    ],
    decisionPages: [
      { label: 'Quando procurar ajuda', slug: 'quando-procurar-ajuda' },
      { label: 'Crise: o que fazer agora', slug: 'crise-mental' }
    ]
  },
  'gad-7': {
    slug: 'gad-7',
    title: 'GAD-7 (Generalized Anxiety Disorder)',
    description:
      'Instrumento de sete questões que rastreia sintomas de ansiedade generalizada em adultos. É rápido, validado e útil para monitoramento.',
    tagline: 'Triagem segura para ansiedade generalizada.',
    summaryPoints: [
      'Foco em sintomas nas últimas duas semanas.',
      'Pontuação de 0 a 21 com faixas claras de gravidade.',
      'Indicado para acompanhamento e rastreio em unidades de saúde.'
    ],
    scoring: {
      title: 'Faixas de gravidade',
      detail: 'Pontuações maiores indicam maior frequência de sintomas. Combine com histórico clínico.',
      ranges: [
        {
          label: '0–4',
          min: 0,
          max: 4,
          guidance: 'Ansiedade mínima. Continue cuidando do bem-estar.'
        },
        {
          label: '5–9',
          min: 5,
          max: 9,
          guidance: 'Ansiedade leve. Autocuidado e monitoramento.'
        },
        {
          label: '10–14',
          min: 10,
          max: 14,
          guidance: 'Ansiedade moderada. Considere psicoterapeuta.'
        },
        {
          label: '15–21',
          min: 15,
          max: 21,
          guidance: 'Ansiedade grave. Procure apoio especializado.'
        }
      ]
    },
    validation: {
      title: 'Fontes e evidências',
      details: [
        'Criado por Spitzer et al. em 2006 e traduzido para o português por Lima et al.',
        'Alto valor preditivo para transtorno de ansiedade generalizada e comorbidades.',
        'Utilizado em cuidados primários e estudos de saúde mental ocupacional.'
      ]
    },
    nextSteps: {
      title: 'O que considerar depois',
      actions: [
        'Registre situações específicas que pioram ou aliviam os sintomas.',
        'Cheque com profissional se houver insônia persistente, ataques de pânico ou evitamentos.',
        'Explore estratégias breves de respiração e técnicas de grounding enquanto agenda ajuda.'
      ]
    },
    faqs: [
      {
        question: 'GAD-7 avalia outros transtornos além de ansiedade generalizada?',
        answer:
          'Ajuda a identificar sintomas de ansiedade em geral, mas o diagnóstico específico precisa de avaliação clínica.'
      }
    ],
    relatedConditions: [{ label: 'Ansiedade generalizada', slug: 'ansiedade' }],
    decisionPages: [
      { label: 'Ansiedade ou TDAH?', slug: 'ansiedade-ou-tdah' },
      { label: 'Como se preparar para psiquiatra', slug: 'preparacao-psiquiatra' }
    ]
  },
  'teste-fobia-social': {
    slug: 'teste-fobia-social',
    title: 'Escala de Fobia Social (SPIN)',
    description:
      'Instrumento de 17 itens que avalia medo e evitamento de situações sociais. Útil para identificar transtorno de ansiedade social e monitorar tratamento.',
    tagline: 'Avaliação completa para ansiedade em situações sociais.',
    summaryPoints: [
      'Avalia medo, evitamento e sintomas físicos em contextos sociais.',
      'Pontuação de 0 a 68 com faixas claras de gravidade.',
      'Validado para população brasileira e usado em settings clínicos.'
    ],
    scoring: {
      title: 'Interpretação dos resultados',
      detail: 'Cada item é pontuado de 0 a 4. A soma total indica o nível de ansiedade social e sugere intervenções adequadas.',
      ranges: [
        {
          label: '0–20',
          min: 0,
          max: 20,
          guidance: 'Ansiedade social mínima. Sem preocupações significativas.'
        },
        {
          label: '21–30',
          min: 21,
          max: 30,
          guidance: 'Ansiedade social leve. Pode beneficiar-se de técnicas de enfrentamento.'
        },
        {
          label: '31–40',
          min: 31,
          max: 40,
          guidance: 'Ansiedade social moderada. Considere psicoterapia especializada.'
        },
        {
          label: '41–50',
          min: 41,
          max: 50,
          guidance: 'Ansiedade social grave. Tratamento intensivo recomendado.'
        },
        {
          label: '51–68',
          min: 51,
          max: 68,
          guidance: 'Ansiedade social muito grave. Procure ajuda especializada urgente.'
        }
      ]
    },
    validation: {
      title: 'Validação científica',
      details: [
        'Desenvolvido por Connor et al. e validado no Brasil por Bandeira et al.',
        'Alta consistência interna e validade convergente com outros instrumentos.',
        'Sensibilidade para detectar mudanças durante tratamento psicoterápico.'
      ]
    },
    nextSteps: {
      title: 'Após a avaliação',
      actions: [
        'Se pontuação moderada ou alta, procure psicólogo especializado em TCC.',
        'Pratique exposição gradual a situações sociais com apoio profissional.',
        'Considere grupos de terapia ou habilidades sociais estruturadas.'
      ]
    },
    faqs: [
      {
        question: 'Fobia social é apenas timidez?',
        answer:
          'Não. Fobia social envolve medo intenso e evitamento que prejudica funcionamento, enquanto timidez é um traço de personalidade.'
      },
      {
        question: 'O teste pode distinguir fobia social de agorafobia?',
        answer:
          'Ajuda a identificar ansiedade social específica, mas diagnóstico diferencial requer avaliação clínica completa.'
      }
    ],
    relatedConditions: [
      { label: 'Fobia Social', slug: 'fobia-social' },
      { label: 'Ansiedade', slug: 'ansiedade' }
    ],
    decisionPages: [
      { label: 'Ansiedade ou TDAH?', slug: 'ansiedade-ou-tdah' },
      { label: 'Como superar medo social', slug: 'medo-social' }
    ]
  }
}
