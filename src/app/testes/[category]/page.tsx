import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TestCategoryLanding from '@/components/test-pages/TestCategoryLanding'
import { db } from '@/lib/db'

interface PageProps {
  params: Promise<{
    category: string
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
        question: 'O que é compulsão alimentar e como difere de outros transtornos alimentares?',
        answer: 'A compulsão alimentar, ou Transtorno da Compulsão Alimentar Periódica (TCAP), é caracterizada por episódios recorrentes de ingestão excessiva de alimentos acompanhados por sensação de perda de controle. Diferente da bulimia, não envolve comportamentos compensatórios inadequados como vômitos ou uso excessivo de laxantes. Também se distingue da simples hiperfagia pela presença de sofrimento psicológico significativo e impacto negativo na vida social e profissional. Os episódios ocorrem em média pelo menos uma vez por semana durante três meses, com quantidades de alimentos maiores que a maioria das pessoas comeria em circunstâncias similares.'
      },
      {
        question: 'Como a Binge Eating Scale (BES) avalia a compulsão alimentar?',
        answer: 'A Binge Eating Scale é um questionário autoaplicável de 16 itens desenvolvido especificamente para avaliar a gravidade dos sintomas de compulsão alimentar. Desenvolvida por Gormally et al. (1982), é amplamente utilizada em pesquisa e prática clínica devido à sua excelente validade e confiabilidade. A escala avalia aspectos comportamentais (comer rapidamente, comer até sentir desconforto), emocionais (culpa, vergonha) e cognitivos (preocupação com comida e peso). Cada resposta é pontuada, resultando em uma classificação que varia de ausência de compulsão a compulsão severa, fornecendo uma avaliação quantitativa que orienta intervenções terapêuticas.'
      },
      {
        question: 'Quais são os sinais e sintomas de alerta da compulsão alimentar?',
        answer: 'Os sinais característicos incluem: comer muito mais rápido que o normal, comer até sentir desconforto físico, comer grandes quantidades mesmo sem fome, comer sozinho por vergonha da quantidade, sentir-se deprimido ou culpado após os episódios. Outros indicadores importantes: alimentos desaparecem rapidamente da casa, embalagens vazias escondidas, acúmulo de peso rápido, isolamento social durante refeições, dietas restritivas seguidas por episódios de compulsão, dificuldade em parar de comer uma vez iniciado, e pensamentos obsessivos sobre comida e peso entre os episódios.'
      },
      {
        question: 'Quais as principais causas e fatores de risco para compulsão alimentar?',
        answer: 'A compulsão alimentar resulta de múltiplos fatores interconectados. Fatores biológicos incluem predisposição genética, alterações neuroquímicas envolvendo dopamina e serotonina, e desregulação do sistema de recompensa cerebral. Fatores psicológicos englobam baixa autoestima, perfeccionismo, dificuldade em regular emoções, histórico de trauma ou abuso. Fatores sociais incluem pressão cultural para magreza, dietas restritivas crônicas, bullying relacionado ao peso, e estresse crônico. A restrição alimentar crônica é um forte gatilho, criando um ciclo de restrição-compulsão-culpa que perpetua o transtorno.'
      },
      {
        question: 'Como tratar a compulsão alimentar de forma eficaz?',
        answer: 'O tratamento mais eficaz combina abordagens multidisciplinares. Terapia Cognitivo-Comportamental (TCC) é considerada padrão-ouro, ajudando a modificar padrões de pensamento disfuncionais e comportamentos alimentares. Terapia Interpessoal foca em melhorar relacionamentos e comunicação. Abordagens baseadas em mindfulness e alimentação intuitiva ajudam a reconectar sinais de fome e saciedade. Em alguns casos, medicamentos como ISRS ou topiramato podem ser indicados. Grupos de apoio e acompanhamento nutricional com especialista em transtornos alimentares complementam o tratamento. O foco é na recuperação do relacionamento saudável com comida, não apenas na perda de peso.'
      },
      {
        question: 'Compulsão alimentar pode levar a outros problemas de saúde?',
        answer: 'Sim, a compulsão alimentar não tratada está associada a diversas complicações de saúde física e mental. Complicações físicas incluem obesidade, diabetes tipo 2, hipertensão, doenças cardiovasculares, apneia do sono, problemas gastrointestinais e dores articulares. Complicações psicológicas englobam depressão, ansiedade, abuso de substâncias, ideação suicida e isolamento social. O transtorno também impacta negativamente a qualidade de vida, relacionamentos interpessoais e desempenho profissional. O tratamento precoce é crucial para prevenir essas complicações e melhorar prognóstico a longo prazo.'
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
        question: 'O que é depressão e como diferenciar de tristeza normal?',
        answer: 'A depressão é um transtorno de humor persistente que vai muito além da tristeza normal. Enquanto a tristeza é uma emoção humana natural que geralmente diminui com o tempo, a depressão é uma condição médica séria que afeta como você se sente, pensa e lida com atividades diárias. Os sintomas depressivos incluem humor deprimido persistente, perda de interesse ou prazer em atividades, alterações de sono e apetite, fadiga, dificuldade de concentração e pensamentos de morte. A depressão interfere significativamente na vida diária e pode durar semanas, meses ou até anos sem tratamento adequado.'
      },
      {
        question: 'Como o PHQ-9 funciona e por que é considerado confiável?',
        answer: 'O PHQ-9 (Patient Health Questionnaire-9) é um instrumento de rastreamento desenvolvido por pesquisadores da Columbia University. É considerado o padrão-ouro para avaliação de depressão em cuidados primários devido à sua excelente validade psicométrica. O questionário avalia os nove critérios diagnósticos de depressão maior segundo o DSM-5, com frequência dos sintomas nas últimas duas semanas. Sua confiabilidade é comprovada por extensos estudos científicos que demonstram sensibilidade de 88% e especificidade de 88% para detectar depressão maior. O PHQ-9 é rápido (5 minutos), fácil de administrar e fornece uma pontuação que indica a gravidade dos sintomas.'
      },
      {
        question: 'Quais são os principais fatores de risco para depressão?',
        answer: 'A depressão resulta de uma complexa interação de fatores biológicos, genéticos, ambientais e psicológicos. Principais fatores de risco incluem: histórico familiar de depressão, desequilíbrios químicos cerebrais (neurotransmissores como serotonina, dopamina e norepinefrina), eventos estressantes da vida (perda, divórcio, problemas financeiros), traumas na infância, doenças crônicas, uso de certos medicamentos, abuso de substâncias, isolamento social e certos traços de personalidade como perfeccionismo ou baixa autoestima. Mulheres têm maior probabilidade de desenvolver depressão, possivelmente devido a fatores hormonais e sociais.'
      },
      {
        question: 'Como interpretar os resultados do teste de depressão?',
        answer: 'Os resultados do PHQ-9 são classificados em níveis de gravidade: 0-4 (mínima), 5-9 (leve), 10-14 (moderada), 15-19 (moderadamente grave), 20-27 (grave). Cada pontuação corresponde a diferentes recomendações de intervenção. Pontuações mínimas geralmente não requerem tratamento, enquanto depressão leve pode beneficiar-se de acompanhamento e intervenções psicossociais. Depressão moderada frequentemente requer tratamento ativo com psicoterapia e/ou medicação. Depressão grave necessita intervenção imediata com tratamento especializado. É importante lembrar que este é um instrumento de rastreamento, não diagnóstico definitivo.'
      },
      {
        question: 'Quais tratamentos são mais eficazes para depressão?',
        answer: 'O tratamento da depressão mais eficaz geralmente combina abordagens múltiplas. Psicoterapia, especialmente Terapia Cognitivo-Comportamental (TCC), é altamente eficaz, ajudando a identificar e modificar padrões de pensamento negativo. Antidepressivos, como ISRS (Inibidores Seletivos de Recaptação de Serotonina), podem ser necessários para casos moderados a graves. Exercícios físicos regulares demonstram efeitos antidepressivos comparáveis à medicação em casos leves a moderados. Outras abordagens eficazes incluem terapia interpessoal, mindfulness, terapia de luz para depressão sazonal, estimulação magnética transcraniana para casos resistentes, e mudanças no estilo de vida como sono adequado, alimentação balanceada e apoio social.'
      },
      {
        question: 'Depressão pode ser prevenida e quais estratégias ajudam?',
        answer: 'Embora nem sempre seja possível prevenir a depressão, várias estratégias podem reduzir o risco e ajudar a manter a saúde mental. Manter rotinas regulares de sono, exercitar-se regularmente (pelo menos 30 minutos diários), praticar técnicas de relaxamento e mindfulness, cultivar relacionamentos sociais saudáveis, evitar álcool e drogas, gerenciar o estresse através de técnicas como respiração profunda e meditação, estabelecer metas realistas, buscar ajuda profissional precocemente quando necessário, e manter um diário para processar emoções. O tratamento precoce de sintomas leves pode prevenir a progressão para depressão maior.'
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
  'transtorno-afetivo-bipolar': {
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
    title: 'Teste de Transtorno de Ansiedade | Avaliação GAD-7',
    description: 'Teste gratuito para Transtorno de Ansiedade Generalizada baseado no GAD-7. Avalie sintomas de ansiedade e receba orientações. Resultados imediatos.',
    keywords: ['transtorno ansiedade', 'GAD-7', 'ansiedade generalizada', 'teste ansiedade', 'preocupação excessiva'],
    symptoms: ['Preocupação excessiva', 'Inquietação', 'Fadiga', 'Dificuldade de concentração', 'Tensão muscular'],
    treatments: ['Terapia cognitivo-comportamental', 'Medicamentos ansiolíticos', 'Relaxamento', 'Exercícios', 'Mindfulness'],
    faq: [
      {
        question: 'O que é Transtorno de Ansiedade Generalizada e como se diferencia de ansiedade normal?',
        answer: 'Transtorno de Ansiedade Generalizada (TAG) é caracterizado por preocupação excessiva, persistente e difícil de controlar sobre diversos aspectos da vida, como trabalho, saúde, família ou finanças. Diferente da ansiedade normal que é proporcional a situações estressantes específicas, na TAG a preocupação é desproporcional, frequente (mais dias que não por pelo menos 6 meses) e interfere significativamente nas atividades diárias. Sintomas físicos incluem tensão muscular, fadiga, irritabilidade, dificuldade de concentração e distúrbios do sono. A ansiedade normal é transitória e adaptativa, enquanto a TAG é crônica e debilitante.'
      },
      {
        question: 'Como o GAD-7 funciona e por que é considerado padrão-ouro?',
        answer: 'O GAD-7 (Generalized Anxiety Disorder-7) é um instrumento de rastreamento desenvolvido por Drs. Robert Spitzer, Kurt Kroenke e Janet Williams. É considerado padrão-ouro devido à sua excelente validade psicométrica e eficiência clínica. O questionário avalia os sete critérios principais de ansiedade generalizada segundo o DSM-5, medindo a frequência dos sintomas nas últimas duas semanas. Sua sensibilidade de 92% e especificidade de 76% para detectar TAG o tornam ideal para cuidados primários. É rápido (2-3 minutos), fácil de administrar e fornece pontuação que indica gravidade: leve (5-9), moderada (10-14) e grave (15-21).'
      },
      {
        question: 'Quais são os principais gatilhos e fatores de risco para ansiedade generalizada?',
        answer: 'A TAG resulta de interação complexa entre vulnerabilidade biológica e fatores ambientais. Fatores genéticos representam 30-40% do risco, com histórico familiar aumentando significativamente a probabilidade. Desequilíbrios neuroquímicos envolvendo GABA, serotonina e norepinefrina desempenham papel crucial. Fatores ambientais incluem estresse crônico, traumas na infância, abuso de substâncias, eventos negativos da vida e personalidade com traços de neuroticismo. Condições médicas como hipertireoidismo, doenças cardiovasculares e distúrbios respiratórios podem mimetizar ou exacerbar sintomas ansiosos. Mulheres têm aproximadamente o dobro de probabilidade de desenvolver TAG.'
      },
      {
        question: 'Como interpretar os resultados do teste GAD-7?',
        answer: 'A pontuação do GAD-7 varia de 0 a 21, com classificações específicas: 0-4 (ansiedade mínima - geralmente não requer tratamento), 5-9 (ansiedade leve - pode beneficiar-se de monitoramento e intervenções psicossociais), 10-14 (ansiedade moderada - frequentemente indica necessidade de tratamento ativo), 15-21 (ansiedade grave - requer intervenção imediata e tratamento especializado). Cada pontuação corresponde a diferentes níveis de impacto funcional e sofrimento. É importante considerar que pontuações elevadas podem refletir ansiedade situacional ou outros transtornos ansiosos específicos, não apenas TAG. O resultado deve ser discutido com profissional para diagnóstico diferencial adequado.'
      },
      {
        question: 'Quais tratamentos são mais eficazes para Transtorno de Ansiedade Generalizada?',
        answer: 'O tratamento da TAG mais eficaz combina abordagens farmacológicas e psicoterápicas. Terapia Cognitivo-Comportamental (TCC) é considerada padrão-ouro, ajudando a identificar e reestruturar padrões de pensamento ansioso, desenvolver habilidades de enfrentamento e exposição gradual a situações temidas. Medicamentos como ISRS (escitalopram, sertralina) e SNRIs (venlafaxina, duloxetina) são primeira linha farmacológica. Benzodiazepínicos podem ser usados a curto prazo para crises agudas. Abordagens complementares eficazes incluem mindfulness-based stress reduction (MBSR), terapia de aceitação e compromisso (ACT), técnicas de relaxamento progressivo, exercícios físicos regulares e treinamento de respiração diafragmática.'
      },
      {
        question: 'É possível prevenir ou reduzir os sintomas de ansiedade generalizada?',
        answer: 'Embora nem sempre seja possível prevenir completamente a TAG, várias estratégias podem reduzir risco e intensidade dos sintomas. Manter rotina regular de exercícios (pelo menos 150 minutos semanais) demonstra redução significativa na ansiedade. Praticar técnicas de mindfulness e meditação regularmente fortalece capacidade de regulação emocional. Estabelecer limites saudáveis no trabalho e relacionamentos, evitar cafeína e álcool em excesso, manter sono adequado (7-9 horas), e desenvolver rede de apoio social sólida. Aprender técnicas de gerenciamento de estresse como respiração profunda, relaxamento muscular progressivo e time management. Buscar ajuda profissional precocemente quando os sintomas começam a interferir na vida diária.'
      }
    ],
    howTo: [
      { step: 1, instruction: 'Pense em suas preocupações diárias' },
      { step: 2, instruction: 'Avalie as últimas 2 semanas' },
      { step: 3, instruction: 'Seja honesto sobre seus sintomas' },
      { step: 4, instruction: 'Siga as recomendações' }
    ]
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const config = categoryConfig[category]
  
  if (!config) {
    return {
      title: 'Categoria Não Encontrada',
      description: 'Esta categoria de teste não está disponível.'
    }
  }

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      locale: 'pt_BR',
      images: [
        {
          url: `/images/test-${category}.jpg`,
          width: 1200,
          height: 630,
          alt: config.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [`/images/test-${category}.jpg`]
    },
    alternates: {
      canonical: `https://mentalhealthchat.vercel.app/testes/${category}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'test-type': 'psychological-assessment',
      'test-category': category,
      'test-language': 'pt-BR'
    }
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const config = categoryConfig[category]
  
  if (!config) {
    notFound()
  }

  // Buscar testes específicos da categoria
  const tests = await db.test.findMany({
    where: {
      category: category.toUpperCase().replace('-', '_') as any,
      isActive: true
    },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      },
      _count: {
        select: {
          testResults: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": config.title,
            "description": config.description,
            "url": `https://mentalhealthchat.vercel.app/testes/${category}`,
            "mainEntity": {
              "@type": "MedicalTest",
              "name": config.title,
              "description": config.description,
              "medicalSpecialty": "Psychology",
              "usedToDiagnose:": category.replace('-', ' ').toUpperCase(),
              "typicalTest": "Psychological Assessment",
              "preparation": "Responda honestamente às perguntas",
              "followup": "Consulte um profissional se necessário"
            },
            "faqPage": {
              "@type": "FAQPage",
              "mainEntity": config.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            },
            "howTo": {
              "@type": "HowTo",
              "name": `Como fazer o teste de ${category.replace('-', ' ')}`,
              "step": config.howTo.map(step => ({
                "@type": "HowToStep",
                "position": step.step,
                "name": step.instruction
              }))
            }
          })
        }}
      />
      
      <TestCategoryLanding 
        category={category}
        config={config}
        tests={tests}
      />
    </>
  )
}