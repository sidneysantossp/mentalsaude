export type ConditionHub = {
  slug: string
  title: string
  shortDescription: string
  heroSummary: string[]
  sections: {
    title: string
    paragraphs: string[]
  }[]
  faq: { question: string; answer: string }[]
  resources: { label: string; url: string }[]
  relatedTests: string[]
  decisionPages: { label: string; slug: string }[]
}

export const conditionHubs: Record<string, ConditionHub> = {
  depressao: {
    slug: 'depressao',
    title: 'Depressão',
    shortDescription:
      'Condição de saúde mental caracterizada por tristeza persistente, perda de interesse e impacto funcional significativo.',
    heroSummary: [
      'Afeta pensamentos, emoções e sono; pode durar semanas ou meses.',
      'Comorbidade comum com ansiedade, uso de substâncias e doenças físicas crônicas.',
      'Triagem precoce reduz risco de agravamento e suicídio.'
    ],
    sections: [
      {
        title: 'O que é depressão?',
        paragraphs: [
          'É um transtorno de humor complexo cujo diagnóstico depende de sintomas persistentes como humor triste, anedonia, alterações no apetite, sono e energia.',
          'Existem subtipos (depressão major, distimia, depressão pós-parto) e diferentes trajetórias, mas o sofrimento real é sempre validado.'
        ]
      },
      {
        title: 'Sintomas e sinais',
        paragraphs: [
          'Fadiga intensa, pensamentos lentos e dificuldades cognitivas.',
          'Culpabilidade, desesperança e diminuição do prazer em atividades antes prazerosas.',
          'Alterações gastrointestinais e dores sem causa médica clara também são comuns.'
        ]
      },
      {
        title: 'Fatores de risco',
        paragraphs: [
          'História familiar de depressão, eventos de vida estressantes e vulnerabilidades traço-temperamento.',
          'Condições médicas como doenças cardiovasculares, hipotireoidismo e uso de certas medicações contribuem.'
        ]
      },
      {
        title: 'Diferenciais importantes',
        paragraphs: [
          'Tristeza comum dura poucos dias e responde ao suporte social; a depressão limita o funcionamento diário.',
          'A depressão atípica pode apresentar aumento de apetite e sono excessivo, o que confunde com fadiga crônica.'
        ]
      },
      {
        title: 'Quando procurar ajuda?',
        paragraphs: [
          'Sintomas que persistem por mais de duas semanas, comprometimento no trabalho/relacionamentos e ideação suicida.',
          'Se o PHQ-9 indicar pontuação moderada/grave, procure avaliação psiquiátrica/psicológica.'
        ]
      },
      {
        title: 'Tratamentos baseados em evidência',
        paragraphs: [
          'Terapias cognitivas, comportamentais e interpessoais, combinadas ou não com antidepressivos.',
          'Plano personalizado inclui monitoramento de resposta, efeitos colaterais e suporte de rede.'
        ]
      },
      {
        title: 'Recursos no Brasil',
        paragraphs: [
          'SUS (CAPS, atenção básica) e redes privadas com psicólogos e psiquiatras multidisciplinares.',
          'Linhas 188, CVV 188 e redes acadêmicas oferecem suporte em crise.'
        ]
      }
    ],
    faq: [
      {
        question: 'Quais sintomas exigem atenção imediata?',
        answer: 'Ideação suicida, comportamento impulsivo, perda de contato com a realidade e sinais de automutilação precisam de ajuda urgente.'
      },
      {
        question: 'Quanto tempo leva para um tratamento iniciar efeito?',
        answer: 'Psicoterapia pode trazer alívio semanas após o início e antidepressivos costumam levar 4-6 semanas para mostrar resposta parcial.'
      }
    ],
    resources: [
      { label: 'Manual da Classificação Internacional de Doenças (CID-11)', url: 'https://icd.who.int' },
      { label: 'Diretrizes Brasileiras de Saúde Mental', url: 'https://www.diresaude.gov.br' }
    ],
    relatedTests: ['phq-9', 'gad-7'],
    decisionPages: [
      { label: 'Quando procurar ajuda', slug: 'quando-procurar-ajuda' },
      { label: 'Crise: o que fazer agora', slug: 'crise-mental' }
    ]
  },
  ansiedade: {
    slug: 'ansiedade',
    title: 'Ansiedade',
    shortDescription:
      'Reação natural ao estresse que se torna transtorno quando é frequente, intensa e compromete a vida cotidiana.',
    heroSummary: [
      'Pode se manifestar como inquietação, taquicardia, pensamentos acelerados e evitamento.',
      'As formas incluem transtorno de ansiedade generalizada, fobia social e ataques de pânico.',
      'Cuidar da ansiedade envolve entender gatilhos e usar recursos psicoeducacionais e terapêuticos.'
    ],
    sections: [
      {
        title: 'O que é ansiedade?',
        paragraphs: [
          'Ansiedade é uma resposta adaptativa, mas o transtorno ocorre quando há hiperexcitação constante, prejudicando concentração e sono.',
          'Mesmo sem uma ameaça imediata, o corpo pode acionar o sistema nervoso autônomo de forma desproporcional.'
        ]
      },
      {
        title: 'Sintomas e sinais',
        paragraphs: [
          'Sensação de perigo iminente, palpitações, mãos suadas e respiração ofegante.',
          'Preocupação excessiva, evitamento de situações sociais e dificuldade de tolerar incertezas.'
        ]
      },
      {
        title: 'Fatores de risco',
        paragraphs: [
          'História familiar de ansiedade, trauma, abuso de substâncias e questões médicas como hipertireoidismo.',
          'Estressores ocupacionais prolongados e isolamento social agravam o quadro.'
        ]
      },
      {
        title: 'Diferenciais importantes',
        paragraphs: [
          'Ataques de pânico apresentam sintomas intensos e breves, ao passo que ansiedade generalizada é persistente.',
          'Distúrbios de sono podem ser primários ou resultantes da ansiedade — a investigação clínica diferencia.'
        ]
      },
      {
        title: 'Quando procurar ajuda?',
        paragraphs: [
          'Sintomas que aparecem diariamente, atrapalham concentração e alimentação e não respondem a estratégias de autocuidado.',
          'Se o GAD-7 indicar moderado/grave, considere triagem psiquiátrica.'
        ]
      },
      {
        title: 'Tratamentos baseados em evidência',
        paragraphs: [
          'Terapias cognitivo-comportamentais com exposição gradual e treinamento em respiração.',
          'Medicamentos (ISRS, ansiolíticos) quando há prejuízo funcional importante, sempre acompanhados por profissional.'
        ]
      },
      {
        title: 'Recursos no Brasil',
        paragraphs: [
          'SUS, psicólogos e psiquiatras no setor privado, grupos de apoio e iniciativas digitais como TherapyChat e prontuários integrados.',
          'Trilhas digitais de mindfulness e atenção plena podem complementar o tratamento.'
        ]
      }
    ],
    faq: [
      {
        question: 'Como diferencio ansiedade de TDAH?',
        answer: 'Ansiedade geralmente tem foco em preocupação e sensações físicas, já o TDAH tem dificuldades com foco sustentado e impulsividade; a sobreposição é comum e requer avaliação especializada.'
      }
    ],
    resources: [
      { label: 'Sociedade Brasileira de Psiquiatria', url: 'https://sbp.org.br' },
      { label: 'Ministério da Saúde Brasil', url: 'https://www.gov.br/saude' }
    ],
    relatedTests: ['gad-7', 'phq-9'],
    decisionPages: [
      { label: 'Ansiedade ou TDAH?', slug: 'ansiedade-ou-tdah' },
      { label: 'Como se preparar para psiquiatra', slug: 'preparacao-psiquiatra' }
    ]
  }
}
