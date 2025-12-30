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
  }
}
