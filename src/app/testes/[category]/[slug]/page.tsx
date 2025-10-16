import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import TestCategoryLanding from '@/components/test-pages/TestCategoryLanding'
import { db } from '@/lib/db'
import { getCategorySlug, generateSlug, isValidCategory, parseCanonicalUrl } from '@/lib/utils/slug'

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

// Mapeamento de categorias para informações SEO
const categoryConfig: Record<string, {
  title: string
  description: string
  keywords: string[]
  symptoms: string[]
  treatments: string[]
  faq: Array<{ question: string; answer: string }>
  howTo: Array<{ step: number; instruction: string }>
}> = {
  'compulsao-alimentar': {
    title: 'Teste de Compulsão Alimentar Gratuito | Avaliação Online',
    description: 'Faça nosso teste gratuito de compulsão alimentar para identificar padrões de comportamento alimentar e receber orientações personalizadas. Resultados imediatos e confidenciais.',
    keywords: ['compulsão alimentar', 'transtorno alimentar', 'binge eating', 'avaliação psicológica', 'saúde mental'],
    symptoms: ['Episódios de comer excessivamente', 'Perda de controle durante alimentação', 'Culina após comer', 'Comer escondido', 'Peso corporal variável'],
    treatments: ['Terapia Cognitivo-Comportamental', 'Acompanhamento nutricional', 'Grupos de apoio', 'Mindfulness alimentar', 'Exercícios físicos regulares'],
    faq: [
      {
        question: 'O que é compulsão alimentar?',
        answer: 'Compulsão alimentar é um transtorno caracterizado por episódios recorrentes de ingestão excessiva de alimentos acompanhados por sensação de perda de controle.'
      },
      {
        question: 'Como sei se tenho compulsão alimentar?',
        answer: 'Sinais incluem comer grandes quantidades rapidamente, comer até sentir desconforto, comer sem fome, e sentir-se culpado após os episódios.'
      },
      {
        question: 'O teste é confiável?',
        answer: 'Sim, nosso teste é baseado em escalas científicas validadas como a Binge Eating Scale (BES), amplamente utilizada na prática clínica.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Responda a todas as perguntas com honestidade' },
      { step: 2, instruction: 'Pense nos últimos 3 meses de comportamento alimentar' },
      { step: 3, instruction: 'Leve cerca de 10-15 minutos para completar' },
      { step: 4, instruction: 'Receba resultados imediatos com orientações' }
    ]
  },
  'depressao': {
    title: 'Teste de Depressão PHQ-9 Gratuito | Avaliação Online',
    description: 'Teste de depressão gratuito baseado no PHQ-9, instrumento científico validado. Avalie sintomas depressivos e receba orientações personalizadas. Resultados imediatos.',
    keywords: ['teste depressão', 'PHQ-9', 'avaliação depressão', 'saúde mental', 'humor depressivo', 'sintomas depressão'],
    symptoms: ['Humor deprimido', 'Perda de interesse', 'Fadiga', 'Alterações de sono', 'Dificuldade de concentração'],
    treatments: ['Psicoterapia', 'Antidepressivos', 'Exercícios físicos', 'Terapia de luz', 'Meditação'],
    faq: [
      {
        question: 'O que é o PHQ-9?',
        answer: 'O PHQ-9 é um questionário de 9 itens amplamente utilizado para rastreamento, monitoramento e medição da gravidade da depressão.'
      },
      {
        question: 'Quanto tempo demora o teste?',
        answer: 'O teste leva aproximadamente 5-10 minutos para ser completado, com resultados imediatos ao final.'
      },
      {
        question: 'Meus dados são confidenciais?',
        answer: 'Sim, todas as suas respostas são 100% confidenciais e criptografadas, seguindo as normas de proteção de dados.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Encontre um ambiente tranquilo' },
      { step: 2, instruction: 'Responda baseado nas últimas 2 semanas' },
      { step: 3, instruction: 'Seja honesto em suas respostas' },
      { step: 4, instruction: 'Receba análise detalhada dos resultados' }
    ]
  },
  'depressao-maior': {
    title: 'Teste de Depressão Maior | Avaliação Clínica Completa',
    description: 'Avaliação completa para Transtorno Depressivo Maior baseado nos critérios do DSM-5. Identifique sintomas e receba orientações profissionais. Teste gratuito e confidencial.',
    keywords: ['depressão maior', 'transtorno depressivo maior', 'DSM-5', 'depressão clínica', 'avaliação psiquiátrica'],
    symptoms: ['Episódios depressivos', 'Anedonia', 'Alterações de peso', 'Insônia ou hipersonia', 'Pensamentos de morte'],
    treatments: ['Psicoterapia interpessoal', 'Medicamentos antidepressivos', 'Terapia cognitivo-comportamental', 'Estimulação magnética', 'Terapia eletroconvulsiva'],
    faq: [
      {
        question: 'Qual a diferença entre depressão e depressão maior?',
        answer: 'Depressão Maior é mais grave e persistente, com múltiplos sintomas que afetam significativamente a vida diária por pelo menos 2 semanas.'
      },
      {
        question: 'Este teste substitui diagnóstico médico?',
        answer: 'Não, este teste é uma ferramenta de rastreamento. Sempre consulte um profissional de saúde para diagnóstico adequado.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Avalie seus sintomas atuais' },
      { step: 2, instruction: 'Considere o impacto na vida diária' },
      { step: 3, instruction: 'Complete todas as seções do teste' },
      { step: 4, instruction: 'Busque ajuda profissional se necessário' }
    ]
  },
  'fobia-social': {
    title: 'Teste de Fobia Social | Avaliação de Ansiedade Social',
    description: 'Teste gratuito para avaliar fobia social e ansiedade em situações sociais. Baseado em escalas validadas como LSAS. Resultados imediatos e orientações.',
    keywords: ['fobia social', 'ansiedade social', 'timidez patológica', 'medo de falar em público', 'avaliação ansiedade'],
    symptoms: ['Medo intenso de situações sociais', 'Evitação de eventos sociais', 'Sintomas físicos de ansiedade', 'Medo de julgamento', 'Dificuldade em falar com estranhos'],
    treatments: ['Terapia de exposição', 'TCC', 'Treinamento de habilidades sociais', 'Relaxamento', 'Medicamentos ansiolíticos'],
    faq: [
      {
        question: 'O que é fobia social?',
        answer: 'Fobia social é um medo intenso e persistente de situações sociais devido ao medo de ser julgado, humilhado ou rejeitado.'
      },
      {
        question: 'Como o teste funciona?',
        answer: 'O teste avalia diferentes situações sociais e seu nível de ansiedade e evitação, fornecendo uma pontuação que indica a gravidade.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Pense em diferentes situações sociais' },
      { step: 2, instruction: 'Avalie seu nível de ansiedade' },
      { step: 3, instruction: 'Seja consistente nas respostas' },
      { step: 4, instruction: 'Entenda seus resultados' }
    ]
  },
  'insonia': {
    title: 'Teste de Insônia | Avaliação de Distúrbios do Sono',
    description: 'Avaliação completa de insônia e distúrbios do sono. Teste gratuito baseado no Índice de Gravidade de Insônia. Identifique problemas e receba soluções.',
    keywords: ['teste insônia', 'distúrbios do sono', 'dificuldade para dormir', 'avaliação do sono', 'insônia crônica'],
    symptoms: ['Dificuldade para iniciar o sono', 'Despertares noturnos', 'Sono não restaurador', 'Fadiga diurna', 'Preocupação com sono'],
    treatments: ['Higiene do sono', 'Terapia cognitivo-comportamental', 'Relaxamento', 'Exercícios regulares', 'Medicamentos'],
    faq: [
      {
        question: 'O que é considerado insônia?',
        answer: 'Insônia é a dificuldade persistente em iniciar ou manter o sono, resultando em prejuízo funcional durante o dia.'
      },
      {
        question: 'O teste avalia que aspectos?',
        answer: 'O teste avalia dificuldade para dormir, despertares, satisfação com o sono e impacto no funcionamento diário.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Pense em suas últimas semanas de sono' },
      { step: 2, instruction: 'Avalie a qualidade do seu sono' },
      { step: 3, instruction: 'Considere o impacto no dia seguinte' },
      { step: 4, instruction: 'Siga as recomendações' }
    ]
  },
  'burnout': {
    title: 'Teste de Síndrome de Burnout | Avaliação de Esgotamento Profissional',
    description: 'Teste gratuito para avaliar Síndrome de Burnout e esgotamento profissional. Baseado no Maslach Burnout Inventory. Identifique sinais e receba orientações.',
    keywords: ['burnout', 'síndrome de burnout', 'esgotamento profissional', 'estresse trabalho', 'exaustão emocional'],
    symptoms: ['Exaustão emocional', 'Despersonalização', 'Redução de realização pessoal', 'Ceticismo', 'Falta de energia'],
    treatments: ['Mudanças no ambiente de trabalho', 'Psicoterapia', 'Exercícios de relaxamento', 'Estabelecimento de limites', 'Atividades prazerosas'],
    faq: [
      {
        question: 'O que é Burnout?',
        answer: 'Burnout é um estado de esgotamento físico, mental e emocional causado por estresse crônico no trabalho.'
      },
      {
        question: 'Como prevenir o Burnout?',
        answer: 'Estabeleça limites, pratique autocuidado, mantenha equilíbrio vida-trabalho e busque apoio quando necessário.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Avalie seu estado atual no trabalho' },
      { step: 2, instruction: 'Considere os últimos meses' },
      { step: 3, instruction: 'Seja honesto sobre seus sentimentos' },
      { step: 4, instruction: 'Planeje ações preventivas' }
    ]
  },
  'estresse': {
    title: 'Teste de Estresse | Avaliação de Níveis de Estresse',
    description: 'Avaliação gratuita de níveis de estresse e tensão. Teste baseado em escalas científicas para identificar estresse agudo e crônico. Resultados imediatos.',
    keywords: ['teste estresse', 'nível de estresse', 'estresse crônico', 'tensão emocional', 'avaliação estresse'],
    symptoms: ['Tensão muscular', 'Irritabilidade', 'Ansiedade', 'Problemas de sono', 'Dificuldade de concentração'],
    treatments: ['Meditação', 'Exercícios respiratórios', 'Atividade física', 'Gerenciamento de tempo', 'Terapia'],
    faq: [
      {
        question: 'Qual a diferença entre estresse agudo e crônico?',
        answer: 'Estresse agudo é breve e pode ser benéfico, enquanto estresse crônico é prolongado e prejudicial à saúde.'
      },
      {
        question: 'Como reduzir o estresse?',
        answer: 'Pratique relaxamento, exercite-se regularmente, durma bem e mantenha uma alimentação equilibrada.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Avalie seus sintomas físicos' },
      { step: 2, instruction: 'Considere situações estressantes' },
      { step: 3, instruction: 'Pense em suas reações' },
      { step: 4, instruction: 'Implemente estratégias de coping' }
    ]
  },
  'sindrome-impostor': {
    title: 'Teste de Síndrome do Impostor | Avaliação de Autoconfiança',
    description: 'Teste gratuito para avaliar Síndrome do Impostor e sentimentos de fraude. Identifique padrões de pensamento e receba estratégias para aumentar a autoconfiança.',
    keywords: ['síndrome do impostor', 'impostor syndrome', 'fraude profissional', 'autoconfiança', 'medo de fracassar'],
    symptoms: ['Medo de ser descoberto como fraude', 'Minimização de sucessos', 'Perfeccionismo', 'Comparação constante', 'Autossabotagem'],
    treatments: ['Terapia cognitivo-comportamental', 'Coaching', 'Grupos de apoio', 'Desenvolvimento de autoconsciência', 'Celebrar conquistas'],
    faq: [
      {
        question: 'O que é Síndrome do Impostor?',
        answer: 'É um padrão psicológico onde pessoas duvidam de suas habilidades e têm medo persistente de serem expostas como fraudes.'
      },
      {
        question: 'É comum ter Síndrome do Impostor?',
        answer: 'Sim, afeta até 70% das pessoas em algum momento, especialmente profissionais bem-sucedidos.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Reflita sobre suas conquistas' },
      { step: 2, instruction: 'Avalie seus pensamentos sobre sucesso' },
      { step: 3, instruction: 'Identifique padrões de autocrítica' },
      { step: 4, instruction: 'Desenvolva autoconfiança' }
    ]
  },
  'tdah': {
    title: 'Teste de TDAH | Avaliação de Déficit de Atenção e Hiperatividade',
    description: 'Teste gratuito para rastreamento de TDAH em adultos. Baseado em escalas validadas como ASRS. Avalie sintomas de desatenção e hiperatividade.',
    keywords: ['teste TDAH', 'déficit atenção', 'hiperatividade', 'TDAH adulto', 'avaliação TDAH', 'desatenção'],
    symptoms: ['Dificuldade de concentração', 'Hiperatividade', 'Impulsividade', 'Desorganização', 'Procrastinação'],
    treatments: ['Estimulantes', 'Terapia comportamental', 'Coaching executivo', 'Exercícios', 'Meditação mindfulness'],
    faq: [
      {
        question: 'O que é TDAH em adultos?',
        answer: 'TDAH é um transtorno neurodesenvolvimental caracterizado por padrões persistentes de desatenção e/ou hiperatividade-impulsividade.'
      },
      {
        question: 'Como funciona o teste?',
        answer: 'O teste avalia frequência de sintomas de desatenção e hiperatividade nos últimos 6 meses.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Pense em diferentes situações do dia a dia' },
      { step: 2, instruction: 'Avalie os últimos 6 meses' },
      { step: 3, instruction: 'Seja honesto sobre dificuldades' },
      { step: 4, instruction: 'Considere busca de avaliação especializada' }
    ]
  },
  'toc': {
    title: 'Teste de TOC | Avaliação de Transtorno Obsessivo-Compulsivo',
    description: 'Teste gratuito para avaliar Transtorno Obsessivo-Compulsivo. Baseado na escala Y-BOCS. Identifique obsessões e compulsões. Resultados confidenciais.',
    keywords: ['teste TOC', 'transtorno obsessivo compulsivo', 'obsessões', 'compulsões', 'avaliação TOC'],
    symptoms: ['Pensamentos intrusivos', 'Rituais repetitivos', 'Verificação excessiva', 'Contaminação', 'Simetria'],
    treatments: ['Terapia de exposição com prevenção de resposta', 'Medicamentos ISRS', 'Terapia cognitiva', 'Mindfulness', 'Grupos de apoio'],
    faq: [
      {
        question: 'O que é TOC?',
        answer: 'TOC é caracterizado por obsessões (pensamentos indesejados) e compulsões (comportamentos repetitivos para aliviar a ansiedade).'
      },
      {
        question: 'O teste é confiável?',
        answer: 'Sim, baseado na Y-BOCS, escala padrão-ouro para avaliação de gravidade do TOC.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Identifique pensamentos repetitivos' },
      { step: 2, instruction: 'Observe comportamentos compulsivos' },
      { step: 3, instruction: 'Avalie o impacto na vida diária' },
      { step: 4, instruction: 'Busque tratamento adequado' }
    ]
  },
  'transtorno-bipolar': {
    title: 'Teste de Transtorno Bipolar | Avaliação de Humor',
    description: 'Teste de rastreamento para Transtorno Afetivo Bipolar. Avalie padrões de humor e identifique sinais de mania e depressão. Ferramenta gratuita e confidencial.',
    keywords: ['transtorno bipolar', 'humor bipolar', 'mania', 'depressão bipolar', 'avaliação bipolar', 'MDQ'],
    symptoms: ['Episódios de mania', 'Episódios depressivos', 'Mudanças rápidas de humor', 'Impulsividade', 'Alterações de energia'],
    treatments: ['Estabilizadores de humor', 'Psicoterapia', 'Medicamentos', 'Terapia familiar', 'Rotina estruturada'],
    faq: [
      {
        question: 'O que é Transtorno Bipolar?',
        answer: 'É uma condição caracterizada por mudanças extremas de humor, alternando entre episódios de mania/hipomania e depressão.'
      },
      {
        question: 'Este teste diagnostica bipolaridade?',
        answer: 'Não, é apenas uma ferramenta de rastreamento. O diagnóstico requer avaliação profissional completa.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Avalie padrões de humor ao longo do tempo' },
      { step: 2, instruction: 'Identifique períodos de energia elevada' },
      { step: 3, instruction: 'Considere impacto na vida funcional' },
      { step: 4, instruction: 'Busque avaliação especializada' }
    ]
  },
  'transtorno-ansiedade': {
    title: 'Teste de Transtorno de Ansiedade | Avaliação Completa',
    description: 'Teste gratuito para avaliar transtornos de ansiedade. Baseado em escalas validadas como GAD-7. Identifique sintomas e receba orientações. Resultados imediatos.',
    keywords: ['transtorno ansiedade', 'GAD-7', 'ansiedade generalizada', 'avaliação ansiedade', 'sintomas ansiedade'],
    symptoms: ['Preocupação excessiva', 'Inquietação', 'Fadiga', 'Dificuldade de concentração', 'Tensão muscular'],
    treatments: ['Terapia cognitivo-comportamental', 'Medicamentos ansiolíticos', 'Relaxamento', 'Exercícios', 'Meditação'],
    faq: [
      {
        question: 'O que é Transtorno de Ansiedade Generalizada?',
        answer: 'É caracterizado por preocupação excessiva e persistente sobre várias situações, dificultando o controle.'
      },
      {
        question: 'Como o GAD-7 funciona?',
        answer: 'Avalia a frequência de sintomas de ansiedade nas últimas 2 semanas, fornecendo uma pontuação de gravidade.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Pense em suas preocupações diárias' },
      { step: 2, instruction: 'Avalie as últimas 2 semanas' },
      { step: 3, instruction: 'Seja honesto sobre seus sintomas' },
      { step: 4, instruction: 'Considere buscar ajuda profissional' }
    ]
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params
  
  // Validar categoria
  if (!isValidCategory(category)) {
    return {
      title: 'Página Não Encontrada | Mental Saúde',
      description: 'A página que você procura não foi encontrada.'
    }
  }

  // Buscar teste no banco pelo slug
  const test = await db.test.findFirst({
    where: {
      slug: slug,
      isActive: true
    },
    include: {
      questions: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  })

  if (!test) {
    return {
      title: 'Teste Não Encontrado | Mental Saúde',
      description: 'O teste que você procura não foi encontrado ou não está mais disponível.'
    }
  }

  const config = categoryConfig[category]
  
  return {
    title: test.metaTitle || config.title,
    description: test.metaDescription || config.description,
    keywords: test.keywords || config.keywords.join(', '),
    openGraph: {
      title: test.metaTitle || config.title,
      description: test.metaDescription || config.description,
      type: 'website',
      url: `https://mentalsaude.com.br/testes/${category}/${slug}`,
      images: [
        {
          url: test.imageUrl || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: test.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: test.metaTitle || config.title,
      description: test.metaDescription || config.description,
      images: [test.imageUrl || '/images/og-default.jpg']
    },
    alternates: {
      canonical: `https://mentalsaude.com.br/testes/${category}/${slug}`
    }
  }
}

export default async function TestPage({ params }: PageProps) {
  const { category, slug } = await params
  
  // Validar categoria
  if (!isValidCategory(category)) {
    notFound()
  }

  // Buscar teste no banco
  const test = await db.test.findFirst({
    where: {
      slug: slug,
      isActive: true
    },
    include: {
      questions: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  })

  if (!test) {
    notFound()
  }

  // Verificar se a categoria da URL corresponde à categoria do teste
  const expectedCategory = getCategorySlug(test.category)
  if (expectedCategory !== category) {
    // Redirecionar para a URL correta
    redirect(`/testes/${expectedCategory}/${slug}`)
  }

  const config = categoryConfig[category]
  
  // Preparar dados do teste para o componente
  const testData = {
    id: test.id,
    title: test.title,
    description: test.description,
    category: test.category,
    timeLimit: test.timeLimit,
    questionCount: test.questions.length,
    estimatedTime: `${Math.max(5, Math.ceil(test.questions.length * 1.2))} min`,
    questions: `${test.questions.length} q`,
    difficulty: test.questions.length > 15 ? 'Difícil' : test.questions.length > 8 ? 'Médio' : 'Fácil',
    icon: 'Brain',
    color: 'bg-blue-500',
    image: test.imageUrl || '/images/default-test.jpg',
    instructions: test.instructions,
    isActive: test.isActive,
    slug: test.slug
  }

  return (
    <TestCategoryLanding 
      test={testData}
      config={config}
      canonicalUrl={`/testes/${category}/${slug}`}
      tests={[test]} // Passar o teste atual como array
    />
  )
}