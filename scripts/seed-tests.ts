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

async function seedTests() {
  console.log('🌱 Iniciando seed dos testes...')

  const tests = [
    {
      title: 'Teste de Depressão',
      description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
      category: 'DEPRESSION' as TestCategory,
      instructions: 'Responda às perguntas com base em como você tem se sentido nas últimas duas semanas. Seja honesto em suas respostas para obter um resultado mais preciso.',
      timeLimit: 10,
      isActive: true,
      questions: [
        { text: 'Com que frequência você se sente triste ou deprimido?', order: 1 },
        { text: 'Você perdeu o interesse ou prazer em atividades que costumava gostar?', order: 2 },
        { text: 'Como está seu apetite ultimamente?', order: 3 },
        { text: 'Como tem sido seu sono?', order: 4 },
        { text: 'Você se sente cansado ou com pouca energia?', order: 5 },
        { text: 'Como você se sente em relação a si mesmo?', order: 6 },
        { text: 'Você tem dificuldade para se concentrar?', order: 7 },
        { text: 'Você tem pensamentos sobre morte ou suicídio?', order: 8 },
        { text: 'Você se sente sem esperança em relação ao futuro?', order: 9 }
      ]
    },
    {
      title: 'Teste de Ansiedade',
      description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
      category: 'ANXIETY' as TestCategory,
      instructions: 'Responda com base em como você tem se sentido nas últimas semanas.',
      timeLimit: 5,
      isActive: true,
      questions: [
        { text: 'Você se sente nervoso, ansioso ou no limite?', order: 1 },
        { text: 'Você não consegue parar ou controlar as preocupações?', order: 2 },
        { text: 'Você se preocupa demais com várias coisas diferentes?', order: 3 },
        { text: 'Você tem dificuldade para relaxar?', order: 4 },
        { text: 'Você fica tão inquieto que é difícil ficar parado?', order: 5 },
        { text: 'Você fica facilmente irritado ou chateado?', order: 6 },
        { text: 'Você sente medo de que algo ruim possa acontecer?', order: 7 }
      ]
    },
    {
      title: 'Teste de Compulsão Alimentar',
      description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
      category: 'OCD' as TestCategory,
      instructions: 'Responda honestamente sobre seus hábitos alimentares e relação com a comida.',
      timeLimit: 15,
      isActive: true,
      questions: [
        { text: 'Você come grandes quantidades de comida mesmo sem estar com fome?', order: 1 },
        { text: 'Você come mais rápido do que o normal durante episódios de compulsão?', order: 2 },
        { text: 'Você come até se sentir desconfortavelmente cheio?', order: 3 },
        { text: 'Você se sente envergonhado pela quantidade que come?', order: 4 },
        { text: 'Você se sente culpado ou deprimido depois de comer demais?', order: 5 },
        { text: 'Você come sozinho por vergonha da quantidade?', order: 6 },
        { text: 'Você usa comida para lidar com emoções?', order: 7 },
        { text: 'Você sente perda de controle durante episódios de compulsão?', order: 8 },
        { text: 'Você tenta compensar a compulsão com dietas ou jejum?', order: 9 },
        { text: 'Isso interfere em sua vida diária?', order: 10 }
      ]
    },
    {
      title: 'Teste de TDAH - Desatenção',
      description: 'Avalie sintomas de desatenção e dificuldade de concentração',
      category: 'ADHD' as TestCategory,
      instructions: 'Responda pensando em como você se comporta normalmente.',
      timeLimit: 12,
      isActive: true,
      questions: [
        { text: 'Você tem dificuldade em prestar atenção a detalhes?', order: 1 },
        { text: 'Você tem dificuldade em manter a atenção em tarefas?', order: 2 },
        { text: 'Você parece não escutar quando falam diretamente com você?', order: 3 },
        { text: 'Você não segue instruções até o fim?', order: 4 },
        { text: 'Você tem dificuldade em organizar tarefas e atividades?', order: 5 },
        { text: 'Você evita tarefas que exigem esforço mental prolongado?', order: 6 },
        { text: 'Você perde coisas necessárias para tarefas?', order: 7 },
        { text: 'Você se distrai facilmente com estímulos externos?', order: 8 },
        { text: 'Você é esquecido em atividades diárias?', order: 9 }
      ]
    },
    {
      title: 'Teste de TDAH - Hiperatividade',
      description: 'Avalie sintomas de hiperatividade e impulsividade',
      category: 'ADHD' as TestCategory,
      instructions: 'Responda pensando em seu comportamento habitual.',
      timeLimit: 12,
      isActive: true,
      questions: [
        { text: 'Você mexe as mãos ou pés ou se remexe na cadeira?', order: 1 },
        { text: 'Você sai do lugar em situações onde deveria ficar sentado?', order: 2 },
        { text: 'Você corre ou sobe em coisas em situações inapropriadas?', order: 3 },
        { text: 'Você tem dificuldade em fazer atividades tranquilas?', order: 4 },
        { text: 'Você está sempre "a mil por hora"?', order: 5 },
        { text: 'Você fala demais?', order: 6 },
        { text: 'Você responde antes da pergunta ser completada?', order: 7 },
        { text: 'Você tem dificuldade em esperar sua vez?', order: 8 },
        { text: 'Você interrompe ou se intromete em conversas?', order: 9 }
      ]
    },
    {
      title: 'Teste de Estresse',
      description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
      category: 'STRESS' as TestCategory,
      instructions: 'Responda pensando no último mês.',
      timeLimit: 5,
      isActive: true,
      questions: [
        { text: 'Você tem se sentido sobrecarregado?', order: 1 },
        { text: 'Você tem dificuldade para relaxar?', order: 2 },
        { text: 'Você se sente irritado facilmente?', order: 3 },
        { text: 'Você tem dificuldade para dormir?', order: 4 },
        { text: 'Você sente tensão muscular?', order: 5 },
        { text: 'Você tem dores de cabeça frequentes?', order: 6 },
        { text: 'Você sente que não consegue lidar com tudo?', order: 7 },
        { text: 'Você tem problemas de concentração?', order: 8 },
        { text: 'Você se sente esgotado?', order: 9 },
        { text: 'Você tem mudanças de humor frequentes?', order: 10 }
      ]
    },
    {
      title: 'Teste de Burnout',
      description: 'Identifique sinais de esgotamento profissional',
      category: 'BURNOUT' as TestCategory,
      instructions: 'Responda pensando em sua experiência profissional.',
      timeLimit: 10,
      isActive: true,
      questions: [
        { text: 'Você se sente emocionalmente esgotado pelo trabalho?', order: 1 },
        { text: 'Você se sente exausto ao final do dia de trabalho?', order: 2 },
        { text: 'Você se sente cansado ao acordar e ter que enfrentar outro dia?', order: 3 },
        { text: 'Trabalhar o dia todo é realmente estressante para você?', order: 4 },
        { text: 'Você se sente frustrado com seu trabalho?', order: 5 },
        { text: 'Você sente que está trabalhando demais?', order: 6 },
        { text: 'Você se sente desanimado com seu trabalho?', order: 7 },
        { text: 'Você duvida da importância do seu trabalho?', order: 8 },
        { text: 'Você perdeu o entusiasmo pelo trabalho?', order: 9 },
        { text: 'Você se sente menos eficiente no trabalho?', order: 10 }
      ]
    },
    {
      title: 'Teste de Transtorno de Pânico',
      description: 'Avalie sintomas de crises de pânico e ansiedade aguda',
      category: 'ANXIETY' as TestCategory,
      instructions: 'Responda pensando em episódios de ansiedade intensa que você teve.',
      timeLimit: 8,
      isActive: true,
      questions: [
        { text: 'Você tem ataques súbitos de medo intenso?', order: 1 },
        { text: 'Você sente palpitações ou coração acelerado?', order: 2 },
        { text: 'Você sua excessivamente durante os ataques?', order: 3 },
        { text: 'Você treme ou tem tremores?', order: 4 },
        { text: 'Você sente falta de ar ou sufocamento?', order: 5 },
        { text: 'Você sente dor ou desconforto no peito?', order: 6 },
        { text: 'Você sente náusea ou desconforto abdominal?', order: 7 },
        { text: 'Você sente tontura ou desmaio?', order: 8 },
        { text: 'Você sente calafrios ou ondas de calor?', order: 9 },
        { text: 'Você tem medo de morrer durante os ataques?', order: 10 },
        { text: 'Você evita lugares onde já teve ataques de pânico?', order: 11 },
        { text: 'Você se preocupa constantemente em ter outro ataque?', order: 12 },
        { text: 'Os ataques interferem em sua vida diária?', order: 13 },
        { text: 'Você sente formigamento ou dormência?', order: 14 },
        { text: 'Você tem sensação de irrealidade ou despersonalização?', order: 15 }
      ]
    },
    {
      title: 'Teste de Fobia Social',
      description: 'Identifique medos e ansiedade em situações sociais',
      category: 'ANXIETY' as TestCategory,
      instructions: 'Responda pensando em como você se sente em situações sociais.',
      timeLimit: 10,
      isActive: true,
      questions: [
        { text: 'Você tem medo de ser julgado negativamente em situações sociais?', order: 1 },
        { text: 'Você evita situações onde precisa interagir com pessoas?', order: 2 },
        { text: 'Você fica ansioso dias antes de um evento social?', order: 3 },
        { text: 'Você tem medo de falar em público?', order: 4 },
        { text: 'Você evita comer ou beber na frente de outras pessoas?', order: 5 },
        { text: 'Você tem medo de ser o centro das atenções?', order: 6 },
        { text: 'Você teme fazer algo embaraçoso?', order: 7 },
        { text: 'Você sente sintomas físicos em situações sociais?', order: 8 },
        { text: 'Você analisa excessivamente seu desempenho social depois?', order: 9 },
        { text: 'Isso interfere em sua vida pessoal ou profissional?', order: 10 }
      ]
    },
    {
      title: 'Teste de Sofrimento Mental',
      description: 'Meça o nível de sofrimento psíquico e seu impacto no bem-estar geral',
      category: 'STRESS' as TestCategory,
      instructions: 'Responda pensando no último mês.',
      timeLimit: 12,
      isActive: true,
      questions: [
        { text: 'Você se sente triste ou deprimido?', order: 1 },
        { text: 'Você se sente ansioso ou preocupado?', order: 2 },
        { text: 'Você tem dificuldade para dormir?', order: 3 },
        { text: 'Você perdeu interesse em atividades?', order: 4 },
        { text: 'Você se sente sozinho ou isolado?', order: 5 },
        { text: 'Você tem dificuldade de concentração?', order: 6 },
        { text: 'Você se sente sem esperança?', order: 7 },
        { text: 'Você tem pensamentos negativos recorrentes?', order: 8 },
        { text: 'Você sente que não consegue lidar com os problemas?', order: 9 },
        { text: 'Você se sente sobrecarregado emocionalmente?', order: 10 }
      ]
    }
  ]

  for (const testData of tests) {
    const { questions, ...testInfo } = testData
    
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
              'Nunca',
              'Raramente',
              'Às vezes',
              'Frequentemente',
              'Sempre'
            ])
          }))
        }
      }
    })
    
    console.log(`✅ Teste criado: ${test.title} (${test.slug})`)
  }

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log(`📊 Total de testes criados: ${tests.length}`)
}

seedTests()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro ao executar seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
