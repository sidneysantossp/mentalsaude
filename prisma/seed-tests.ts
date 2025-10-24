import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testesData = [
  {
    title: 'Teste de Compulsão Alimentar - BES',
    description: 'Avaliação de Transtorno da Compulsão Alimentar Periodica usando a Binge Eating Scale (BES)',
    category: 'COMPULSAO_ALIMENTAR' as const,
    instructions: 'Responda a cada pergunta pensando em seus hábitos alimentares nos últimos 3 meses. Seja honesto(a) em suas respostas para obter uma avaliação precisa.',
    timeLimit: 15,
    imageUrl: '/images/compulsao-alimentar.jpg',
    slug: 'teste-compulsao-alimentar',
    metaTitle: 'Teste de Compulsão Alimentar Gratuito | BES Online',
    metaDescription: 'Faça o teste de compulsão alimentar baseado na escala BES. Avaliação gratuita, confidencial e com resultados imediatos.',
    keywords: 'compulsão alimentar, binge eating, transtorno alimentar, BES, avaliação psicológica',
    questions: [
      {
        text: 'Com que frequência você sente que comeu mais do que as outras pessoas considerariam normal?',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Raramente' },
          { value: 2, text: 'Às vezes' },
          { value: 3, text: 'Frequentemente' },
          { value: 4, text: 'Sempre' }
        ])
      },
      {
        text: 'Com que frequência você sente que não consegue parar de comer?',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Raramente' },
          { value: 2, text: 'Às vezes' },
          { value: 3, text: 'Frequentemente' },
          { value: 4, text: 'Sempre' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Depressão - PHQ-9',
    description: 'Avaliação de sintomas depressivos usando o Patient Health Questionnaire-9 (PHQ-9)',
    category: 'DEPRESSAO' as const,
    instructions: 'Para cada pergunta, indique com que frequência você foi incomodado(a) por este problema nas últimas 2 semanas.',
    timeLimit: 10,
    imageUrl: '/images/depressao.jpg',
    slug: 'teste-depressao-phq9',
    metaTitle: 'Teste de Depressão PHQ-9 Gratuito | Avaliação Online',
    metaDescription: 'Teste de depressão validado baseado no PHQ-9. Avaliação gratuita, rápida e confidencial com resultados imediatos.',
    keywords: 'depressão, PHQ-9, teste depressão, saúde mental, humor depressivo, ansiedade',
    questions: [
      {
        text: 'Pouco interesse ou prazer em fazer as coisas',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nenhuma vez' },
          { value: 1, text: 'Vários dias' },
          { value: 2, text: 'Mais da metade dos dias' },
          { value: 3, text: 'Quase todos os dias' }
        ])
      },
      {
        text: 'Humor deprimido, triste ou desesperançado',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nenhuma vez' },
          { value: 1, text: 'Vários dias' },
          { value: 2, text: 'Mais da metade dos dias' },
          { value: 3, text: 'Quase todos os dias' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Fobia Social - LSAS',
    description: 'Avaliação de Transtorno de Ansiedade Social usando a Liebowitz Social Anxiety Scale (LSAS)',
    category: 'FOBIA_SOCIAL' as const,
    instructions: 'Para cada situação, indique o quanto você teme ou evita o contexto social descrito.',
    timeLimit: 20,
    imageUrl: '/images/fobia-social.jpg',
    slug: 'teste-fobia-social-lsas',
    metaTitle: 'Teste de Fobia Social LSAS Gratuito | Ansiedade Social',
    metaDescription: 'Avaliação gratuita de fobia social baseada na escala LSAS. Identifique sintomas de ansiedade social.',
    keywords: 'fobia social, ansiedade social, LSAS, medo social, timidez patológica, avaliação psicológica',
    questions: [
      {
        text: 'Telefonar para pessoas que não conhece bem',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nenhum medo' },
          { value: 1, text: 'Medo leve' },
          { value: 2, text: 'Medo moderado' },
          { value: 3, text: 'Medo grave' }
        ])
      },
      {
        text: 'Participar em pequenos grupos',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nunca evito' },
          { value: 1, text: 'Raramente evito' },
          { value: 2, text: 'Às vezes evito' },
          { value: 3, text: 'Frequentemente evito' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Insônia - ISI',
    description: 'Avaliação de insônia usando o Insomnia Severity Index (ISI)',
    category: 'INSONIA' as const,
    instructions: 'Para cada pergunta, indique como seus problemas de sono têm afetado você nas últimas 2 semanas.',
    timeLimit: 10,
    imageUrl: '/images/insonia.jpg',
    slug: 'teste-isonia-isi',
    metaTitle: 'Teste de Insônia ISI Gratuito | Avaliação do Sono',
    metaDescription: 'Avaliação gratuita de insônia baseada no Índice de Gravidade de Insônia. Identifique problemas de sono.',
    keywords: 'insônia, distúrbios do sono, ISI, dificuldade dormir, avaliação do sono, saúde mental',
    questions: [
      {
        text: 'Dificuldade em adormecer',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nenhuma dificuldade' },
          { value: 1, text: 'Leve' },
          { value: 2, text: 'Moderada' },
          { value: 3, text: 'Grave' },
          { value: 4, text: 'Muito grave' }
        ])
      },
      {
        text: 'Dificuldade em permanecer adormecido',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nenhuma dificuldade' },
          { value: 1, text: 'Leve' },
          { value: 2, text: 'Moderada' },
          { value: 3, text: 'Grave' },
          { value: 4, text: 'Muito grave' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Burnout - MBI',
    description: 'Avaliação de Síndrome de Burnout usando o Maslach Burnout Inventory (MBI)',
    category: 'BURNOUT' as const,
    instructions: 'Indique com que frequência você se sente assim em relação ao seu trabalho.',
    timeLimit: 15,
    imageUrl: '/images/burnout.jpg',
    slug: 'teste-burnout-mbi',
    metaTitle: 'Teste de Burnout MBI Gratuito | Esgotamento Profissional',
    metaDescription: 'Avaliação gratuita de Síndrome de Burnout baseada no Maslach Burnout Inventory. Identifique esgotamento profissional.',
    keywords: 'burnout, esgotamento profissional, MBI, estresse trabalho, exaustão emocional, saúde ocupacional',
    questions: [
      {
        text: 'Sinto-me esgotado(a) emocionalmente pelo meu trabalho',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Algumas vezes por ano' },
          { value: 2, text: 'Algumas vezes por mês' },
          { value: 3, text: 'Algumas vezes por semana' },
          { value: 4, text: 'Todos os dias' }
        ])
      },
      {
        text: 'Sinto-me cansado(a) ao acordar de manhã e ter que enfrentar outro dia de trabalho',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Algumas vezes por ano' },
          { value: 2, text: 'Algumas vezes por mês' },
          { value: 3, text: 'Algumas vezes por semana' },
          { value: 4, text: 'Todos os dias' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Estresse - PSS',
    description: 'Avaliação de níveis de estresse usando a Perceived Stress Scale (PSS)',
    category: 'ESTRESSE' as const,
    instructions: 'Para cada afirmação, indique com que frequência você se sentiu assim no último mês.',
    timeLimit: 10,
    imageUrl: '/images/estresse.jpg',
    slug: 'teste-estresse-pss',
    metaTitle: 'Teste de Estresse PSS Gratuito | Níveis de Estresse',
    metaDescription: 'Avaliação gratuita de estresse baseada na Perceived Stress Scale. Meça seus níveis de estresse.',
    keywords: 'estresse, PSS, nível de estresse, tensão emocional, avaliação psicológica, saúde mental',
    questions: [
      {
        text: 'No último mês, com que frequência você se sentiu incapaz de controlar as coisas importantes em sua vida?',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Quase nunca' },
          { value: 2, text: 'Às vezes' },
          { value: 3, text: 'Frequentemente' },
          { value: 4, text: 'Muito frequentemente' }
        ])
      },
      {
        text: 'No último mês, com que frequência você se sentiu nervoso(a) e estressado(a)?',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Quase nunca' },
          { value: 2, text: 'Às vezes' },
          { value: 3, text: 'Frequentemente' },
          { value: 4, text: 'Muito frequentemente' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Síndrome do Impostor - CIPS',
    description: 'Avaliação de Síndrome do Impostor usando a Clance Impostor Phenomenon Scale (CIPS)',
    category: 'SINDROME_IMPOSTOR' as const,
    instructions: 'Para cada afirmação, indique o quanto você concorda com a declaração.',
    timeLimit: 15,
    imageUrl: '/images/sindrome-impostor.jpg',
    slug: 'teste-sindrome-impostor-cips',
    metaTitle: 'Teste de Síndrome do Impostor CIPS Gratuito | Autoconfiança',
    metaDescription: 'Avaliação gratuita de Síndrome do Impostor baseada na escala CIPS. Identifique sentimentos de fraude.',
    keywords: 'síndrome do impostor, impostor syndrome, CIPS, autoconfiança, medo de fracassar, avaliação psicológica',
    questions: [
      {
        text: 'Fico com medo de que as pessoas possam descobrir que não sou tão capaz quanto pareço',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 1, text: 'Discordo totalmente' },
          { value: 2, text: 'Discordo moderadamente' },
          { value: 3, text: 'Discordo um pouco' },
          { value: 4, text: 'Concordo um pouco' },
          { value: 5, text: 'Concordo moderadamente' }
        ])
      },
      {
        text: 'Tenho dificuldade em aceitar elogios sobre meu desempenho',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 1, text: 'Discordo totalmente' },
          { value: 2, text: 'Discordo moderadamente' },
          { value: 3, text: 'Discordo um pouco' },
          { value: 4, text: 'Concordo um pouco' },
          { value: 5, text: 'Concordo moderadamente' }
        ])
      }
    ]
  },
  {
    title: 'Teste de TDAH - ASRS',
    description: 'Avaliação de TDAH em adultos usando o Adult ADHD Self-Report Scale (ASRS)',
    category: 'TDAH' as const,
    instructions: 'Para cada pergunta, indique com que frequência você teve os sintomas descritos nos últimos 6 meses.',
    timeLimit: 15,
    imageUrl: '/images/tdah.jpg',
    slug: 'teste-tdah-asrs',
    metaTitle: 'Teste de TDAH ASRS Gratuito | Déficit de Atenção',
    metaDescription: 'Avaliação gratuita de TDAH em adultos baseada na ASRS. Identifique sintomas de desatenção e hiperatividade.',
    keywords: 'TDAH, ADHD, ASRS, déficit de atenção, hiperatividade, desatenção, avaliação psicológica',
    questions: [
      {
        text: 'Com que frequência você tem dificuldade em terminar os detalhes finais de um projeto?',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Raramente' },
          { value: 2, text: 'Às vezes' },
          { value: 3, text: 'Frequentemente' },
          { value: 4, text: 'Muito frequentemente' }
        ])
      },
      {
        text: 'Com que frequência você tem dificuldade em organizar tarefas e atividades?',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nunca' },
          { value: 1, text: 'Raramente' },
          { value: 2, text: 'Às vezes' },
          { value: 3, text: 'Frequentemente' },
          { value: 4, text: 'Muito frequentemente' }
        ])
      }
    ]
  },
  {
    title: 'Teste de TOC - Y-BOCS',
    description: 'Avaliação de Transtorno Obsessivo-Compulsivo usando a Yale-Brown Obsessive Compulsive Scale (Y-BOCS)',
    category: 'TOC' as const,
    instructions: 'Para cada pergunta, indique a intensidade dos seus sintomas obsessivos ou compulsivos.',
    timeLimit: 20,
    imageUrl: '/images/toc.jpg',
    slug: 'teste-toc-ybocs',
    metaTitle: 'Teste de TOC Y-BOCS Gratuito | Transtorno Obsessivo',
    metaDescription: 'Avaliação gratuita de TOC baseada na escala Y-BOCS. Identifique obsessões e compulsões.',
    keywords: 'TOC, transtorno obsessivo compulsivo, Y-BOCS, obsessões, compulsões, avaliação psicológica',
    questions: [
      {
        text: 'Quanto tempo seus pensamentos obsessivos ocupam seu dia?',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nenhum' },
          { value: 1, text: 'Leve (menos de 1 hora)' },
          { value: 2, text: 'Moderado (1-3 horas)' },
          { value: 3, text: 'Grave (3-8 horas)' },
          { value: 4, text: 'Extremo (mais de 8 horas)' }
        ])
      },
      {
        text: 'Quanto desconforto seus pensamentos obsessivos causam?',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nenhum' },
          { value: 1, text: 'Leve' },
          { value: 2, text: 'Moderado' },
          { value: 3, text: 'Grave' },
          { value: 4, text: 'Extremo' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Transtorno Bipolar - MDQ',
    description: 'Avaliação de Transtorno Afetivo Bipolar usando o Mood Disorder Questionnaire (MDQ)',
    category: 'TRANSTORNO_AFETIVO_BIPOLAR' as const,
    instructions: 'Responda às perguntas sobre seus padrões de humor e comportamento ao longo da vida.',
    timeLimit: 15,
    imageUrl: '/images/transtorno-bipolar.jpg',
    slug: 'teste-transtorno-bipolar-mdq',
    metaTitle: 'Teste de Transtorno Bipolar MDQ Gratuito | Avaliação de Humor',
    metaDescription: 'Avaliação gratuita de Transtorno Bipolar baseada no MDQ. Identifique padrões de humor maníaco e depressivo.',
    keywords: 'transtorno bipolar, humor bipolar, MDQ, mania, depressão bipolar, avaliação psicológica',
    questions: [
      {
        text: 'Já houve momentos em que você se sentiu tão bem ou eufórico que outras pessoas pensaram que você não estava no seu estado normal?',
        type: 'YES_NO' as const,
        order: 1,
        options: JSON.stringify([
          { value: 1, text: 'Sim' },
          { value: 0, text: 'Não' }
        ])
      },
      {
        text: 'Já houve momentos em você se sentiu irritável(a) a ponto de gritar com pessoas ou iniciar brigas?',
        type: 'YES_NO' as const,
        order: 2,
        options: JSON.stringify([
          { value: 1, text: 'Sim' },
          { value: 0, text: 'Não' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Transtorno de Ansiedade - GAD-7',
    description: 'Avaliação de Transtorno de Ansiedade Generalizada usando o Generalized Anxiety Disorder-7 (GAD-7)',
    category: 'TRANSTORNO_ANSIEDADE' as const,
    instructions: 'Para cada pergunta, indique com que frequência você foi incomodado(a) por este problema nas últimas 2 semanas.',
    timeLimit: 10,
    imageUrl: '/images/transtorno-ansiedade.jpg',
    slug: 'teste-transtorno-ansiedade-gad7',
    metaTitle: 'Teste de Ansiedade GAD-7 Gratuito | Transtorno de Ansiedade',
    metaDescription: 'Avaliação gratuita de Transtorno de Ansiedade Generalizada baseada no GAD-7. Meça seus níveis de ansiedade.',
    keywords: 'transtorno de ansiedade, GAD-7, ansiedade generalizada, preocupação excessiva, avaliação psicológica',
    questions: [
      {
        text: 'Sentir-se nervoso(a), ansioso(a) ou extremamente tenso(a)',
        type: 'LIKERT_SCALE' as const,
        order: 1,
        options: JSON.stringify([
          { value: 0, text: 'Nenhuma vez' },
          { value: 1, text: 'Vários dias' },
          { value: 2, text: 'Mais da metade dos dias' },
          { value: 3, text: 'Quase todos os dias' }
        ])
      },
      {
        text: 'Não conseguir parar ou controlar a preocupação',
        type: 'LIKERT_SCALE' as const,
        order: 2,
        options: JSON.stringify([
          { value: 0, text: 'Nenhuma vez' },
          { value: 1, text: 'Vários dias' },
          { value: 2, text: 'Mais da metade dos dias' },
          { value: 3, text: 'Quase todos os dias' }
        ])
      }
    ]
  },
  {
    title: 'Teste de Depressão Maior - DSM-5',
    description: 'Avaliação de Transtorno Depressivo Maior baseado nos critérios do DSM-5',
    category: 'DEPRESSAO_MAIOR' as const,
    instructions: 'Para cada sintoma, indique se você o experimentou nas últimas 2 semanas e por quanto tempo.',
    timeLimit: 20,
    imageUrl: '/images/depressao-maior.jpg',
    slug: 'teste-depressao-maior-dsm5',
    metaTitle: 'Teste de Depressão Maior DSM-5 Gratuito | Avaliação Clínica',
    metaDescription: 'Avaliação gratuita de Transtorno Depressivo Maior baseada nos critérios DSM-5. Diagnóstico diferencial completo.',
    keywords: 'depressão maior, transtorno depressivo maior, DSM-5, depressão clínica, avaliação psiquiátrica',
    questions: [
      {
        text: 'Humor deprimido na maior parte do dia, quase todos os dias',
        type: 'YES_NO' as const,
        order: 1,
        options: JSON.stringify([
          { value: 1, text: 'Sim' },
          { value: 0, text: 'Não' }
        ])
      },
      {
        text: 'Perda de interesse ou prazer em quase todas as atividades',
        type: 'YES_NO' as const,
        order: 2,
        options: JSON.stringify([
          { value: 1, text: 'Sim' },
          { value: 0, text: 'Não' }
        ])
      }
    ]
  }
]

async function main() {
  console.log('🌱 Iniciando seed dos testes...')

  try {
    // Limpar testes existentes
    await prisma.test.deleteMany()
    console.log('📁 Testes existentes removidos')

    // Criar novos testes
    for (const testData of testesData) {
      const test = await prisma.test.create({
        data: {
          title: testData.title,
          description: testData.description,
          category: testData.category,
          instructions: testData.instructions,
          timeLimit: testData.timeLimit,
          imageUrl: testData.imageUrl,
          slug: testData.slug,
          metaTitle: testData.metaTitle,
          metaDescription: testData.metaDescription,
          keywords: testData.keywords,
          content: `Conteúdo completo para ${testData.title}. Esta avaliação foi desenvolvida por profissionais de saúde mental utilizando instrumentos científicos validados.`,
          faq: JSON.stringify([
            {
              question: `O que é ${testData.title.split(' - ')[0]}?`,
              answer: `É uma avaliação psicológica baseada em instrumentos científicos validados para identificar sintomas e padrões relacionados a esta condição.`
            },
            {
              question: 'O teste é confiável?',
              answer: 'Sim, todos os nossos testes são baseados em escalas científicas amplamente utilizadas na prática clínica e validadas pela comunidade acadêmica.'
            },
            {
              question: 'Meus dados são confidenciais?',
              answer: 'Sim, todas as suas respostas são 100% confidenciais e criptografadas, seguindo as normas de proteção de dados.'
            }
          ]),
          howTo: JSON.stringify([
            { step: 1, instruction: 'Leia atentamente cada pergunta' },
            { step: 2, instruction: 'Responda com honestidade' },
            { step: 3, instruction: 'Considere o período de tempo especificado' },
            { step: 4, instruction: 'Receba resultados imediatos' }
          ]),
          questions: {
            create: testData.questions.map(q => ({
              text: q.text,
              type: q.type,
              order: q.order,
              options: q.options
            }))
          }
        },
        include: {
          questions: true
        }
      })

      console.log(`✅ Teste criado: ${test.title} (${test.questions.length} perguntas)`)
    }

    console.log('🎉 Seed concluído com sucesso!')
    console.log(`📊 Total de testes criados: ${testesData.length}`)

  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()