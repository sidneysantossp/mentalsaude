import { PrismaClient, TestCategory } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function seedCompleteTests() {
  console.log('🌱 Iniciando seed completo dos testes psicológicos...')

  // Limpar testes existentes
  await prisma.question.deleteMany({})
  await prisma.test.deleteMany({})
  console.log('✅ Testes anteriores removidos')

  const tests = [
    {
      title: 'Teste de Depressão',
      description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
      shortDescription: 'Questionário PHQ-9 para avaliar sintomas depressivos nos últimos 14 dias',
      category: 'DEPRESSION' as TestCategory,
      instructions: 'Nos últimos 14 dias, com que frequência você foi incomodado(a) pelos problemas abaixo? Responda com honestidade para obter um resultado mais preciso.',
      timeLimit: 10,
      isActive: true,
      cardImage: '/images/depression-therapy.jpg',
      questions: [
        { text: 'Pouco interesse ou prazer em fazer as coisas', order: 1 },
        { text: 'Sentir-se para baixo, deprimido(a) ou sem esperança', order: 2 },
        { text: 'Dificuldade para pegar no sono, continuar dormindo ou dormir demais', order: 3 },
        { text: 'Sentir-se cansado(a) ou com pouca energia', order: 4 },
        { text: 'Pouco apetite ou comendo demais', order: 5 },
        { text: 'Sentir-se mal consigo mesmo(a), ou que você é um fracasso, ou que você decepcionou a si mesmo(a) ou à sua família', order: 6 },
        { text: 'Dificuldade para se concentrar nas coisas (como ler jornal ou ver televisão)', order: 7 },
        { text: 'Lentidão para se movimentar ou falar (a ponto de outras pessoas perceberem), ou o oposto: ficar tão agitado(a) ou inquieto(a) que você fica andando de um lado para o outro muito mais do que de costume', order: 8 },
        { text: 'Pensar em se ferir de alguma maneira ou que seria melhor estar morto(a)', order: 9 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 4, level: 'Mínimo', description: 'Pontuação compatível com nível mínimo de sintomas depressivos. Recomenda-se manutenção de hábitos saudáveis e reavaliação se houver piora.' },
        { minScore: 5, maxScore: 9, level: 'Leve', description: 'Sintomas leves de depressão. Sugere-se monitoramento e práticas de autocuidado. Se persistir ou piorar, busque avaliação profissional.' },
        { minScore: 10, maxScore: 14, level: 'Moderado', description: 'Sintomas moderados que podem estar causando sofrimento. Recomenda-se avaliação com psicólogo(a) ou psiquiatra.' },
        { minScore: 15, maxScore: 19, level: 'Moderadamente Grave', description: 'Sintomas moderadamente graves. Recomenda-se avaliação profissional urgente para diagnóstico e tratamento adequado.' },
        { minScore: 20, maxScore: 27, level: 'Grave', description: 'Sintomas graves de depressão. Busque ajuda profissional imediatamente. Em caso de pensamentos suicidas, ligue 188 (CVV) ou 192 (SAMU).' }
      ]
    },
    {
      title: 'Teste de Ansiedade',
      description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
      shortDescription: 'Questionário GAD-7 para avaliar sintomas de ansiedade nos últimos 14 dias',
      category: 'ANXIETY' as TestCategory,
      instructions: 'Nos últimos 14 dias, com que frequência você foi incomodado(a) pelos seguintes problemas? Seja honesto(a) em suas respostas.',
      timeLimit: 5,
      isActive: true,
      cardImage: '/images/anxiety-meditation.jpg',
      questions: [
        { text: 'Sentir-se nervoso(a), ansioso(a) ou "no limite"', order: 1 },
        { text: 'Não conseguir parar ou controlar as preocupações', order: 2 },
        { text: 'Preocupar-se demais com várias coisas', order: 3 },
        { text: 'Ter dificuldade para relaxar', order: 4 },
        { text: 'Ficar tão inquieto(a) que é difícil ficar parado(a)', order: 5 },
        { text: 'Irritar-se ou ficar impaciente com facilidade', order: 6 },
        { text: 'Sentir medo como se algo ruim fosse acontecer', order: 7 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 4, level: 'Mínimo', description: 'Pontuação compatível com nível mínimo de sintomas ansiosos nas últimas 2 semanas. Recomenda-se manutenção de hábitos protetores (sono, atividade física, redução de estimulantes) e reavaliação se houver piora ou impacto funcional.' },
        { minScore: 5, maxScore: 9, level: 'Leve', description: 'Pontuação compatível com sintomas leves. Sugere-se monitoramento por 2–4 semanas e intervenção de autocuidado. Se o impacto funcional for significativo ou houver persistência, recomenda-se avaliação profissional.' },
        { minScore: 10, maxScore: 14, level: 'Moderado', description: 'Pontuação em faixa moderada, frequentemente associada a sofrimento clinicamente relevante. Recomenda-se avaliação com psicólogo(a) ou psiquiatra para investigação, diagnóstico diferencial e plano de cuidado.' },
        { minScore: 15, maxScore: 21, level: 'Grave', description: 'Pontuação em faixa alta/grave, sugerindo sintomas intensos e maior risco de prejuízo funcional. Recomenda-se avaliação profissional o quanto antes. Se houver crises, incapacidade de funcionar, ou risco à segurança, buscar atendimento imediato.' }
      ]
    },
    {
      title: 'Teste de Compulsão Alimentar',
      description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
      shortDescription: 'Avalie comportamentos alimentares compulsivos e sua frequência',
      category: 'OCD' as TestCategory,
      instructions: 'Nos últimos 3 meses, com que frequência você teve os seguintes comportamentos? Responda honestamente sobre seus hábitos alimentares.',
      timeLimit: 15,
      isActive: true,
      cardImage: '/images/healthy-eating.jpg',
      questions: [
        { text: 'Comer grandes quantidades de comida mesmo sem estar com fome', order: 1 },
        { text: 'Comer mais rápido do que o normal durante episódios de compulsão', order: 2 },
        { text: 'Comer até se sentir desconfortavelmente cheio(a)', order: 3 },
        { text: 'Sentir vergonha pela quantidade que come', order: 4 },
        { text: 'Sentir-se culpado(a) ou deprimido(a) depois de comer demais', order: 5 },
        { text: 'Comer sozinho(a) por vergonha da quantidade', order: 6 },
        { text: 'Usar comida para lidar com emoções difíceis', order: 7 },
        { text: 'Sentir perda de controle durante episódios de compulsão', order: 8 },
        { text: 'Tentar compensar a compulsão com dietas restritivas ou jejum', order: 9 },
        { text: 'Esses comportamentos interferem em sua vida diária', order: 10 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 7, level: 'Baixo', description: 'Poucos ou nenhum sintoma de compulsão alimentar. Continue mantendo uma relação saudável com a comida.' },
        { minScore: 8, maxScore: 15, level: 'Leve', description: 'Alguns sinais de comportamento alimentar compulsivo. Considere trabalhar estratégias de alimentação consciente e manejo emocional.' },
        { minScore: 16, maxScore: 23, level: 'Moderado', description: 'Sintomas moderados de compulsão alimentar. Recomenda-se avaliação com nutricionista e psicólogo especializado em transtornos alimentares.' },
        { minScore: 24, maxScore: 30, level: 'Grave', description: 'Sintomas graves de compulsão alimentar. Busque ajuda profissional especializada urgentemente para avaliação e tratamento adequado.' }
      ]
    },
    {
      title: 'Teste de TDAH',
      description: 'Avalie sintomas de desatenção, hiperatividade e impulsividade',
      shortDescription: 'Questionário baseado no ASRS para triagem de TDAH em adultos',
      category: 'ADHD' as TestCategory,
      instructions: 'Nos últimos 6 meses, com que frequência você teve os seguintes problemas? Responda pensando em seu comportamento habitual.',
      timeLimit: 12,
      isActive: true,
      cardImage: '/images/adhd-focus.jpg',
      questions: [
        { text: 'Dificuldade em prestar atenção a detalhes ou comete erros por descuido', order: 1 },
        { text: 'Dificuldade em manter a atenção em tarefas ou atividades', order: 2 },
        { text: 'Parece não escutar quando falam diretamente com você', order: 3 },
        { text: 'Não segue instruções até o fim ou não termina tarefas', order: 4 },
        { text: 'Dificuldade em organizar tarefas e atividades', order: 5 },
        { text: 'Evita ou reluta em se envolver em tarefas que exigem esforço mental prolongado', order: 6 },
        { text: 'Perde coisas necessárias para tarefas ou atividades', order: 7 },
        { text: 'Distrai-se facilmente com estímulos externos', order: 8 },
        { text: 'É esquecido(a) em atividades do dia a dia', order: 9 },
        { text: 'Mexe as mãos ou pés ou se remexe na cadeira', order: 10 },
        { text: 'Levanta da cadeira em situações onde deveria ficar sentado(a)', order: 11 },
        { text: 'Sente-se inquieto(a) ou "a mil por hora"', order: 12 },
        { text: 'Dificuldade em fazer atividades tranquilas', order: 13 },
        { text: 'Fala demais', order: 14 },
        { text: 'Responde antes da pergunta ser completada', order: 15 },
        { text: 'Dificuldade em esperar sua vez', order: 16 },
        { text: 'Interrompe ou se intromete em conversas ou atividades', order: 17 },
        { text: 'Age sem pensar nas consequências', order: 18 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 13, level: 'Improvável', description: 'Poucos sintomas de TDAH. Se houver prejuízo funcional significativo, considere avaliação profissional para outros diagnósticos.' },
        { minScore: 14, maxScore: 27, level: 'Possível', description: 'Alguns sintomas presentes. Se causam prejuízo significativo no trabalho, estudos ou relacionamentos, recomenda-se avaliação com psiquiatra ou neurologista.' },
        { minScore: 28, maxScore: 40, level: 'Provável', description: 'Sintomas sugestivos de TDAH. Recomenda-se avaliação profissional completa para diagnóstico e discussão de opções de tratamento.' },
        { minScore: 41, maxScore: 54, level: 'Altamente Provável', description: 'Sintomas fortemente sugestivos de TDAH com provável impacto significativo. Busque avaliação especializada urgente para diagnóstico e tratamento adequado.' }
      ]
    },
    {
      title: 'Teste de Estresse',
      description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
      shortDescription: 'Escala de Estresse Percebido para avaliar como você lida com situações estressantes',
      category: 'STRESS' as TestCategory,
      instructions: 'No último mês, com que frequência você se sentiu ou pensou da seguinte forma? Seja honesto(a) sobre suas experiências recentes.',
      timeLimit: 5,
      isActive: true,
      cardImage: '/images/stress-management.jpg',
      questions: [
        { text: 'Ficou aborrecido(a) por causa de algo que aconteceu inesperadamente', order: 1 },
        { text: 'Sentiu-se incapaz de controlar as coisas importantes em sua vida', order: 2 },
        { text: 'Sentiu-se nervoso(a) e estressado(a)', order: 3 },
        { text: 'Sentiu confiança na sua habilidade de lidar com problemas pessoais', order: 4 },
        { text: 'Sentiu que as coisas estavam acontecendo do seu jeito', order: 5 },
        { text: 'Achou que não conseguiria lidar com todas as coisas que tinha que fazer', order: 6 },
        { text: 'Conseguiu controlar irritações em sua vida', order: 7 },
        { text: 'Sentiu que estava por cima das coisas', order: 8 },
        { text: 'Ficou irritado(a) por causa de coisas fora do seu controle', order: 9 },
        { text: 'Sentiu que as dificuldades se acumularam tanto que não conseguia superá-las', order: 10 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 7, level: 'Baixo', description: 'Nível baixo de estresse percebido. Você parece estar lidando bem com as demandas do dia a dia. Continue mantendo suas estratégias de enfrentamento.' },
        { minScore: 8, maxScore: 14, level: 'Moderado', description: 'Nível moderado de estresse. Considere implementar técnicas de relaxamento, atividade física regular e buscar apoio social quando necessário.' },
        { minScore: 15, maxScore: 21, level: 'Alto', description: 'Nível alto de estresse percebido. Recomenda-se buscar estratégias de manejo do estresse e considerar apoio profissional se o estresse estiver afetando sua saúde ou funcionamento.' },
        { minScore: 22, maxScore: 30, level: 'Muito Alto', description: 'Nível muito alto de estresse. Busque ajuda profissional para desenvolver estratégias de enfrentamento e avaliar possível impacto na saúde física e mental.' }
      ]
    },
    {
      title: 'Teste de Burnout',
      description: 'Identifique sinais de esgotamento profissional',
      shortDescription: 'Avalie sintomas de exaustão emocional, despersonalização e baixa realização profissional',
      category: 'BURNOUT' as TestCategory,
      instructions: 'Pensando em sua experiência profissional nos últimos meses, com que frequência você se sente da seguinte forma? Responda com honestidade.',
      timeLimit: 10,
      isActive: true,
      cardImage: '/images/burnout-professional.jpg',
      questions: [
        { text: 'Sente-se emocionalmente esgotado(a) pelo trabalho', order: 1 },
        { text: 'Sente-se exausto(a) ao final do dia de trabalho', order: 2 },
        { text: 'Sente-se cansado(a) ao acordar e ter que enfrentar outro dia de trabalho', order: 3 },
        { text: 'Trabalhar o dia todo é realmente estressante para você', order: 4 },
        { text: 'Sente-se frustrado(a) com seu trabalho', order: 5 },
        { text: 'Sente que está trabalhando demais', order: 6 },
        { text: 'Trabalhar diretamente com pessoas o/a deixa muito tenso(a)', order: 7 },
        { text: 'Sente-se desanimado(a) com seu trabalho', order: 8 },
        { text: 'Duvida da importância ou valor do seu trabalho', order: 9 },
        { text: 'Perdeu o entusiasmo pelo trabalho', order: 10 },
        { text: 'Sente-se menos eficiente no trabalho', order: 11 },
        { text: 'Tem dificuldade em se concentrar nas tarefas', order: 12 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 8, level: 'Baixo', description: 'Baixo risco de burnout. Você parece estar mantendo um equilíbrio saudável entre trabalho e vida pessoal.' },
        { minScore: 9, maxScore: 17, level: 'Moderado', description: 'Sinais moderados de burnout. Considere revisar sua carga de trabalho, estabelecer limites e priorizar autocuidado.' },
        { minScore: 18, maxScore: 26, level: 'Alto', description: 'Alto risco de burnout. Recomenda-se buscar apoio profissional, reavaliar condições de trabalho e implementar mudanças urgentes.' },
        { minScore: 27, maxScore: 36, level: 'Muito Alto', description: 'Risco muito alto de burnout. Situação crítica que requer intervenção imediata. Busque ajuda profissional e considere afastamento se necessário.' }
      ]
    },
    {
      title: 'Teste Transtorno de Pânico',
      description: 'Avalie sintomas de crises de pânico e ansiedade aguda',
      shortDescription: 'Questionário para identificar sintomas de ataques de pânico e seu impacto',
      category: 'ANXIETY' as TestCategory,
      instructions: 'Nos últimos 3 meses, com que frequência você experimentou os seguintes sintomas durante momentos de ansiedade intensa? Responda com honestidade.',
      timeLimit: 8,
      isActive: true,
      cardImage: '/images/panic-disorder.jpg',
      questions: [
        { text: 'Ataques súbitos de medo intenso ou desconforto', order: 1 },
        { text: 'Palpitações ou coração acelerado', order: 2 },
        { text: 'Sudorese excessiva', order: 3 },
        { text: 'Tremores ou abalos', order: 4 },
        { text: 'Sensação de falta de ar ou sufocamento', order: 5 },
        { text: 'Dor ou desconforto no peito', order: 6 },
        { text: 'Náusea ou desconforto abdominal', order: 7 },
        { text: 'Tontura, instabilidade ou sensação de desmaio', order: 8 },
        { text: 'Calafrios ou ondas de calor', order: 9 },
        { text: 'Medo de morrer durante os ataques', order: 10 },
        { text: 'Medo de perder o controle ou "enlouquecer"', order: 11 },
        { text: 'Evita lugares onde já teve ataques de pânico', order: 12 },
        { text: 'Preocupa-se constantemente em ter outro ataque', order: 13 },
        { text: 'Os ataques interferem em sua vida diária', order: 14 },
        { text: 'Sensação de irrealidade ou despersonalização', order: 15 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 11, level: 'Improvável', description: 'Poucos sintomas de transtorno de pânico. Se houver ansiedade significativa, pode ser outro tipo de transtorno ansioso.' },
        { minScore: 12, maxScore: 22, level: 'Possível', description: 'Alguns sintomas de pânico presentes. Se causam sofrimento ou limitação, recomenda-se avaliação profissional.' },
        { minScore: 23, maxScore: 33, level: 'Provável', description: 'Sintomas sugestivos de transtorno de pânico. Recomenda-se avaliação com psiquiatra ou psicólogo para diagnóstico e tratamento.' },
        { minScore: 34, maxScore: 45, level: 'Altamente Provável', description: 'Sintomas fortemente sugestivos de transtorno de pânico. Busque ajuda profissional urgente. O tratamento é eficaz e pode melhorar significativamente sua qualidade de vida.' }
      ]
    },
    {
      title: 'Teste Fobia Social',
      description: 'Identifique medos e ansiedade em situações sociais',
      shortDescription: 'Avalie sintomas de ansiedade social e seu impacto na vida cotidiana',
      category: 'ANXIETY' as TestCategory,
      instructions: 'Pensando nas últimas semanas, com que frequência você sente medo ou ansiedade nas seguintes situações sociais? Seja honesto(a) sobre suas experiências.',
      timeLimit: 10,
      isActive: true,
      cardImage: '/images/social-phobia.jpg',
      questions: [
        { text: 'Medo de ser julgado(a) negativamente em situações sociais', order: 1 },
        { text: 'Evita situações onde precisa interagir com pessoas', order: 2 },
        { text: 'Fica ansioso(a) dias antes de um evento social', order: 3 },
        { text: 'Medo de falar em público ou fazer apresentações', order: 4 },
        { text: 'Evita comer ou beber na frente de outras pessoas', order: 5 },
        { text: 'Medo de ser o centro das atenções', order: 6 },
        { text: 'Teme fazer algo embaraçoso em público', order: 7 },
        { text: 'Sente sintomas físicos (tremor, sudorese, rubor) em situações sociais', order: 8 },
        { text: 'Analisa excessivamente seu desempenho social depois', order: 9 },
        { text: 'Dificuldade em fazer ou manter amizades', order: 10 },
        { text: 'Evita falar ao telefone ou fazer ligações', order: 11 },
        { text: 'Dificuldade em expressar opiniões ou discordar', order: 12 },
        { text: 'Medo de iniciar conversas', order: 13 },
        { text: 'Isso interfere em sua vida pessoal ou profissional', order: 14 }
      ],
      interpretations: [
        { minScore: 0, maxScore: 10, level: 'Baixo', description: 'Baixo nível de ansiedade social. Você parece confortável na maioria das situações sociais.' },
        { minScore: 11, maxScore: 20, level: 'Leve', description: 'Ansiedade social leve. Algumas situações causam desconforto, mas geralmente você consegue enfrentá-las.' },
        { minScore: 21, maxScore: 30, level: 'Moderado', description: 'Ansiedade social moderada. Recomenda-se terapia cognitivo-comportamental, que é muito eficaz para fobia social.' },
        { minScore: 31, maxScore: 42, level: 'Grave', description: 'Ansiedade social grave com impacto significativo. Busque ajuda profissional especializada. O tratamento pode melhorar muito sua qualidade de vida e relacionamentos.' }
      ]
    }
  ]

  for (const testData of tests) {
    const { questions, interpretations, ...testInfo } = testData
    
    console.log(`📝 Criando teste: ${testInfo.title}`)
    
    const test = await prisma.test.create({
      data: {
        ...testInfo,
        slug: generateSlug(testInfo.title),
        questions: {
          create: questions.map(q => ({
            text: q.text,
            type: 'LIKERT_SCALE',
            order: q.order,
            options: JSON.stringify([
              { value: 0, label: 'Nenhum dia' },
              { value: 1, label: 'Alguns dias' },
              { value: 2, label: 'Mais da metade dos dias' },
              { value: 3, label: 'Quase todos os dias' }
            ])
          }))
        }
      }
    })
    
    console.log(`✅ Teste criado: ${test.title} (${test.slug})`)
    console.log(`   📊 ${questions.length} perguntas adicionadas`)
  }

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log(`📊 Total de testes criados: ${tests.length}`)
  console.log('\n⚠️  Importante: As interpretações dos resultados devem ser implementadas no frontend')
}

seedCompleteTests()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro ao executar seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
