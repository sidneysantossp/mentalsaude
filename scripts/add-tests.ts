import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testsData = [
  {
    title: "Teste de Depressão",
    description: "Avalie sintomas depressivos e seu estado emocional atual",
    category: "DEPRESSION" as const,
    instructions: "Responda às perguntas com base em como você se sentiu nas últimas duas semanas. Seja honesto consigo mesmo para obter resultados mais precisos.",
    timeLimit: 15,
    imageUrl: "/images/depression-test.jpg"
  },
  {
    title: "Teste Compulsão Alimentar",
    description: "Identifique padrões de alimentação compulsiva e sua relação com as emoções",
    category: "OCD" as const,
    instructions: "Responda pensando em seus hábitos alimentares dos últimos 3 meses. Não há respostas certas ou erradas.",
    timeLimit: 20,
    imageUrl: "/images/eating-disorder-test.jpg"
  },
  {
    title: "Teste de Ansiedade",
    description: "Avalie seus níveis de ansiedade e sintomas relacionados",
    category: "ANXIETY" as const,
    instructions: "Pense em como você se sentiu nas últimas duas semanas ao responder estas perguntas.",
    timeLimit: 12,
    imageUrl: "/images/anxiety-test.jpg"
  },
  {
    title: "Teste Nível de Estresse",
    description: "Meça seu nível atual de estresse e seus principais gatilhos",
    category: "STRESS" as const,
    instructions: "Considere suas experiências do último mês ao responder cada questão.",
    timeLimit: 10,
    imageUrl: "/images/stress-test.jpg"
  },
  {
    title: "Teste Sofrimento Mental",
    description: "Avalie seu nível de sofrimento psicológico geral",
    category: "DEPRESSION" as const,
    instructions: "Seja sincero sobre seus sentimentos e experiências recentes.",
    timeLimit: 15,
    imageUrl: "/images/mental-suffering-test.jpg"
  },
  {
    title: "Teste ADHD - Déficit de Atenção",
    description: "Identifique sintomas de desatenção e dificuldade de concentração",
    category: "ADHD" as const,
    instructions: "Pense em seu comportamento habitual nos últimos 6 meses.",
    timeLimit: 18,
    imageUrl: "/images/adhd-attention-test.jpg"
  },
  {
    title: "Teste ADHD - Hiperatividade",
    description: "Avalie sintomas de hiperatividade e impulsividade",
    category: "ADHD" as const,
    instructions: "Considere seu comportamento em diferentes situações do dia a dia.",
    timeLimit: 15,
    imageUrl: "/images/adhd-hyperactivity-test.jpg"
  },
  {
    title: "Teste Fobia Social",
    description: "Avalie seu nível de ansiedade em situações sociais",
    category: "ANXIETY" as const,
    instructions: "Pense em como você se sente em situações sociais ou de desempenho.",
    timeLimit: 12,
    imageUrl: "/images/social-phobia-test.jpg"
  }
]

const questionsData = [
  // Depression Test Questions
  {
    testTitle: "Teste de Depressão",
    questions: [
      { text: "Nos últimos 2 semanas, com que frequência você se sentiu para baixo, deprimido ou sem esperança?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Nos últimos 2 semanas, com que frequência você teve pouco interesse ou prazer em fazer coisas?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Nos últimos 2 semanas, com que frequência você teve dificuldade para dormir ou dormiu demais?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Nos últimos 2 semanas, com que frequência você se sentiu cansado ou sem energia?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Nos últimos 2 semanas, com que frequência você teve falta de apetite ou comeu demais?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Nos últimos 2 semanas, com que frequência você se sentiu mal consigo mesmo ou achou que é um fracasso?", type: "LIKERT_SCALE" as const, order: 6 },
      { text: "Nos últimos 2 semanas, com que frequência você teve dificuldade de se concentrar nas coisas?", type: "LIKERT_SCALE" as const, order: 7 },
      { text: "Nos últimos 2 semanas, com que frequência você se moveu ou falou tão devagar que outras pessoas notaram?", type: "LIKERT_SCALE" as const, order: 8 },
      { text: "Nos últimos 2 semanas, com que frequência você pensou em se machucar ou que seria melhor estar morto?", type: "LIKERT_SCALE" as const, order: 9 }
    ]
  },
  // Eating Disorder Test Questions
  {
    testTitle: "Teste Compulsão Alimentar",
    questions: [
      { text: "Com que frequência você come muito mais rápido que o normal?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Com que frequência você come até se sentir desconfortavelmente cheio?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Com que frequência você come grandes quantidades de comida mesmo sem sentir fome?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Com que frequência você come sozinho por sentir vergonha da quantidade que come?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Com que frequência você se sente nojo, deprimido ou culpado depois de comer demais?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Nos últimos 3 meses, quantos dias você teve episódios de compulsão alimentar?", type: "LIKERT_SCALE" as const, order: 6 }
    ]
  },
  // Anxiety Test Questions
  {
    testTitle: "Teste de Ansiedade",
    questions: [
      { text: "Nos últimos 2 semanas, com que frequência você se sentiu nervoso, ansioso ou tenso?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Nos últimos 2 semanas, com que frequência você não conseguiu parar de se preocupar?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Nos últimos 2 semanas, com que frequência você se preocupou excessivamente sobre diferentes coisas?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Nos últimos 2 semanas, com que frequência você teve dificuldade de relaxar?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Nos últimos 2 semanas, com que frequência você se sentiu tão inquieto que era difícil ficar parado?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Nos últimos 2 semanas, com que frequência você ficou irritado ou facilmente irritável?", type: "LIKERT_SCALE" as const, order: 6 },
      { text: "Nos últimos 2 semanas, com que frequência você sentiu medo de que algo terrível pudesse acontecer?", type: "LIKERT_SCALE" as const, order: 7 }
    ]
  },
  // Stress Test Questions
  {
    testTitle: "Teste Nível de Estresse",
    questions: [
      { text: "Com que frequência você se sente sobrecarregado pelas responsabilidades?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Com que frequência você tem dificuldade em lidar com as demandas do dia a dia?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Com que frequência você sente que não consegue controlar as coisas importantes na sua vida?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Com que frequência você se sente confiante em sua capacidade lidar com problemas pessoais?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Com que frequência você sente que as coisas estão indo do seu jeito?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Com que frequência você consegue lidar com as irritações da vida?", type: "LIKERT_SCALE" as const, order: 6 },
      { text: "Com que frequência você sente que tem controle sobre sua vida?", type: "LIKERT_SCALE" as const, order: 7 },
      { text: "Com que frequência você se sente raivoso por coisas que estão fora do seu controle?", type: "LIKERT_SCALE" as const, order: 8 },
      { text: "Com que frequência você sente que as dificuldades estão se acumulando?", type: "LIKERT_SCALE" as const, order: 9 },
      { text: "Com que frequência você se sente capaz de lidar com tudo que precisa fazer?", type: "LIKERT_SCALE" as const, order: 10 }
    ]
  },
  // Mental Suffering Test Questions
  {
    testTitle: "Teste Sofrimento Mental",
    questions: [
      { text: "Com que frequência você se sente emocionalmente sobrecarregado?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Com que frequência você tem pensamentos negativos sobre si mesmo?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Com que frequência você se sente isolado ou sozinho?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Com que frequência você tem dificuldade em encontrar prazer nas atividades diárias?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Com que frequência você se sente incapaz de lidar com seus problemas?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Com que frequência você tem problemas de sono relacionados ao estresse?", type: "LIKERT_SCALE" as const, order: 6 },
      { text: "Com que frequência você sente dores físicas relacionadas ao estresse emocional?", type: "LIKERT_SCALE" as const, order: 7 },
      { text: "Com que frequência você evita situações sociais por se sentir mal?", type: "LIKERT_SCALE" as const, order: 8 }
    ]
  },
  // ADHD Attention Test Questions
  {
    testTitle: "Teste ADHD - Déficit de Atenção",
    questions: [
      { text: "Com que frequência você tem dificuldade em prestar atenção em detalhes ou comete erros por descuido?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Com que frequência você tem dificuldade em manter a atenção em tarefas ou atividades?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Com que frequência parece que você não está ouvindo quando alguém fala diretamente com você?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Com que frequência você não segue instruções ou não termina tarefas?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Com que frequência você tem dificuldade em organizar tarefas e atividades?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Com que frequência você evita ou não gosta de tarefas que exigem esforço mental prolongado?", type: "LIKERT_SCALE" as const, order: 6 },
      { text: "Com que frequência você perde coisas necessárias para tarefas ou atividades?", type: "LIKERT_SCALE" as const, order: 7 },
      { text: "Com que frequência você se distrai facilmente com estímulos externos?", type: "LIKERT_SCALE" as const, order: 8 },
      { text: "Com que frequência você é esquecido nas atividades diárias?", type: "LIKERT_SCALE" as const, order: 9 }
    ]
  },
  // ADHD Hyperactivity Test Questions
  {
    testTitle: "Teste ADHD - Hiperatividade",
    questions: [
      { text: "Com que frequência você mexe as mãos ou os pés ou se remexe na cadeira?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Com que frequência você se levanta da cadeira quando deveria permanecer sentado?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Com que frequência você se sente inquieto ou corre por aí?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Com que frequência você tem dificuldade em participar de atividades de lazer tranquilamente?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Com que frequência você parece estar 'com o motor ligado' ou agindo como se impulsionado por um motor?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Com que frequência você fala excessivamente?", type: "LIKERT_SCALE" as const, order: 6 },
      { text: "Com que frequência você responde às perguntas antes de serem terminadas?", type: "LIKERT_SCALE" as const, order: 7 },
      { text: "Com que frequência você tem dificuldade em esperar sua vez?", type: "LIKERT_SCALE" as const, order: 8 },
      { text: "Com que frequência você interrompe os outros ou se intromete nas conversas?", type: "LIKERT_SCALE" as const, order: 9 }
    ]
  },
  // Social Phobia Test Questions
  {
    testTitle: "Teste Fobia Social",
    questions: [
      { text: "Com que frequência você tem medo ou ansiedade em situações sociais?", type: "LIKERT_SCALE" as const, order: 1 },
      { text: "Com que frequência você teme ser avaliado negativamente por outras pessoas?", type: "LIKERT_SCALE" as const, order: 2 },
      { text: "Com que frequência você evita situações sociais por medo ou ansiedade?", type: "LIKERT_SCALE" as const, order: 3 },
      { text: "Com que frequência você sente que as pessoas estão julgando você?", type: "LIKERT_SCALE" as const, order: 4 },
      { text: "Com que frequência você fica ansioso antes de eventos sociais?", type: "LIKERT_SCALE" as const, order: 5 },
      { text: "Com que frequência você tem dificuldade em falar com pessoas desconhecidas?", type: "LIKERT_SCALE" as const, order: 6 },
      { text: "Com que frequência você evita fazer apresentações ou falar em público?", type: "LIKERT_SCALE" as const, order: 7 },
      { text: "Com que frequência você se sente desconfortável sendo o centro das atenções?", type: "LIKERT_SCALE" as const, order: 8 },
      { text: "Com que frequência você tem sintomas físicos (tremores, suor, coração acelerado) em situações sociais?", type: "LIKERT_SCALE" as const, order: 9 },
      { text: "Com que frequência você se sente envergonhado ou humilhado em situações sociais?", type: "LIKERT_SCALE" as const, order: 10 }
    ]
  }
]

async function addTests() {
  try {
    console.log('🧠 Adicionando testes psicológicos ao banco de dados...')

    for (const testData of testsData) {
      // Check if test already exists
      const existingTest = await prisma.test.findFirst({
        where: { title: testData.title }
      })

      if (existingTest) {
        console.log(`⚠️  Teste "${testData.title}" já existe. Pulando...`)
        continue
      }

      // Create test
      const test = await prisma.test.create({
        data: testData
      })

      console.log(`✅ Teste "${testData.title}" criado com ID: ${test.id}`)

      // Find questions for this test
      const testQuestions = questionsData.find(q => q.testTitle === testData.title)
      
      if (testQuestions) {
        for (const questionData of testQuestions.questions) {
          await prisma.question.create({
            data: {
              testId: test.id,
              ...questionData,
              options: JSON.stringify([
                { value: "Nenhuma vez", score: 0 },
                { value: "Vários dias", score: 1 },
                { value: "Mais da metade dos dias", score: 2 },
                { value: "Quase todos os dias", score: 3 }
              ])
            }
          })
        }
        console.log(`✅ ${testQuestions.questions.length} questões adicionadas para "${testData.title}"`)
      }
    }

    console.log('🎉 Todos os testes foram adicionados com sucesso!')
    
  } catch (error) {
    console.error('❌ Erro ao adicionar testes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addTests()