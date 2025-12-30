export type DecisionContent = {
  slug: string
  title: string
  description: string
  summary: string[]
  sections: {
    title: string
    paragraphs: string[]
  }[]
  faqs: { question: string; answer: string }[]
}

export const decisionContents: Record<string, DecisionContent> = {
  'quando-procurar-ajuda': {
    slug: 'quando-procurar-ajuda',
    title: 'Quando procurar ajuda após o teste',
    description:
      'Sinais de alerta que transformam um resultado alto em prioridade de acompanhamento clínico imediato.',
    summary: ['Sinais de risco, situações de crise e orientações para comunicar ao profissional.'],
    sections: [
      {
        title: 'Sinais críticos',
        paragraphs: [
          'Ideação suicida, planos concretos ou comportamento autolesivo exigem contato com rede de crise (CVV 188, SAMU 192).',
          'Sintomas persistentes por mais de duas semanas que atrapalham trabalho, estudo ou sono, mesmo com estratégias de autocuidado.'
        ]
      },
      {
        title: 'Como comunicar',
        paragraphs: [
          'Leve anotações de perguntas respondidas com frequência, intensidade e fatores precipitantes.',
          'Explique o que mudou nos últimos 14 dias para dar contexto temporal.'
        ]
      },
      {
        title: 'Caso o teste esteja moderado',
        paragraphs: [
          'Mesmo sem crise, marque um acompanhamento para avaliar história de vida, suporte social e possíveis comorbidades.',
          'Registre padrões: quando o humor piora, o que alivia e se há uso de álcool/substâncias.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Preciso mostrar o resultado do teste ao profissional?',
        answer: 'Sim, compartilhe suas notas e sensações, isso acelera o diagnóstico e mostra seu engajamento.'
      }
    ]
  },
  'crise-mental': {
    slug: 'crise-mental',
    title: 'Crise mental: o que fazer agora',
    description:
      'Checklist de segurança com recursos imediatos, para quando o resultado expõe risco alto ou desorganização funcional.',
    summary: [
      'Priorize segurança física e emocional.',
      'Acolha, não minimize, e busque ajuda profissional/agências de crise.'
    ],
    sections: [
      {
        title: 'Passos imediatos',
        paragraphs: [
          'Respire fundo, identifique aliados (familiares, amigos, colegas de trabalho) e peça para acompanhá-lo por algumas horas.',
          'Não fique sozinho. Ligue para alguém de confiança ou para um serviço de emergência.'
        ]
      },
      {
        title: 'Recursos no Brasil',
        paragraphs: [
          'CVV 188 (24h) e centros de atendimento psicológico/psiquiátrico próximos.',
          'SAMU 192, hospitais públicos ou privados com pronto atendimento psiquiátrico.'
        ]
      },
      {
        title: 'Continuando após a crise',
        paragraphs: [
          'Registre o que desencadeou a crise para discutir com o profissional.',
          'Considere um plano de segurança escrito com contatos e etapas claras.'
        ]
      }
    ],
    faqs: [
      {
        question: 'O que caracteriza “crise”?',
        answer: 'Perda do controle emocional, pensamentos suicidas ou atitudes impulsivas que ameaçam sua segurança.'
      }
    ]
  },
  'ansiedade-ou-tdah': {
    slug: 'ansiedade-ou-tdah',
    title: 'Ansiedade ou TDAH? Sinais que confundem',
    description:
      'Guia comparativo para ajudar a distinguir sintomas similares e preparar o terreno para avaliação clínica.',
    summary: ['Tabuleiros de sintomas, pokes e sinais de contexto.'],
    sections: [
      {
        title: 'Olhando os sintomas',
        paragraphs: [
          'TDAH geralmente começa na infância, envolve desatenção persistente, impulsividade e dificuldade de organização.',
          'Ansiedade foca em preocupações “e se” e é acompanhada por tensão corporal e inquietação.'
        ]
      },
      {
        title: 'Quando ambos aparecem',
        paragraphs: [
          'A sobreposição é frequente; algumas pessoas com TDAH desenvolvem ansiedade secundária por fracassos repetidos.',
          'Registre se os pensamentos catastróficos surgem após hiperatividade ou se ansiedade antecede tudo.'
        ]
      },
      {
        title: 'O que compartilhar com o profissional',
        paragraphs: [
          'Mapeie início dos sintomas, escolaridade, histórico familiar e uso de substâncias.',
          'Traga resultados de GAD-7 e PHQ-9 para fornecer ponto de partida.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Qual teste indica TDAH?',
        answer: 'TDAH depende de avaliação clínica e observação funcional; a triagem pode envolver escalas de comportamentos e questionários específicos.'
      }
    ]
  },
  'preparacao-psiquiatra': {
    slug: 'preparacao-psiquiatra',
    title: 'Como se preparar para consultar um psiquiatra',
    description:
      'Checklist para otimizar a consulta, com histórico, medicação anterior, vida social e objetivos terapêuticos.',
    summary: ['Diga tudo que importa, sem medo de ser julgado.'],
    sections: [
      {
        title: 'Leve evidências',
        paragraphs: [
          'Anote sintomas principais, duração, frequência e impacto no dia a dia.',
          'Traga resultados de testes, exames laboratoriais recentes e lista de medicamentos.'
        ]
      },
      {
        title: 'Seja transparente sobre hábitos',
        paragraphs: [
          'Fale sobre uso de álcool, tabaco, drogas recreativas e suplementação.',
          'Compartilhe padrões de sono, alimentação e atividades físicas.'
        ]
      },
      {
        title: 'Defina objetivos',
        paragraphs: [
          'Expresse o que espera da consulta (controle de sintomas, reduzir remédios, ajustar terapia).',
          'Anote perguntas, como efeitos colaterais e opções de tratamento.'
        ]
      }
    ],
    faqs: [
      {
        question: 'O psiquiatra vai prescrever medicação na primeira consulta?',
        answer: 'Depende da avaliação; às vezes ele pede exames ou observa a evolução antes de medicar.'
      }
    ]
  }
}
