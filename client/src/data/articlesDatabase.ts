export type ScientificReference = {
  id: string;
  citation: string;
  authors: string;
  title: string;
  source: string;
  year: string;
  url: string;
};

export type ArticleModel = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  primaryEntity: string;
  readingTime: string;
  publishedAt: string;
  reviewedAt: string;
  author: string;
  authorSlug: string;
  reviewer: string;
  reviewerSlug: string;
  image: string;
  directAnswer: string;
  keyTakeaways: string[];
  tableOfContents: { id: string; label: string }[];
  sections: {
    id: string;
    title: string;
    content: string; // HTML-like or structured paragraphs
    subsections?: { title: string; content: string }[];
  }[];
  evidenceBox?: {
    whatWeKnow: string;
    whatEvidenceSuggests: string;
    whatWeDontKnowYet: string;
  };
  comparisonTable?: {
    headers: string[];
    rows: { feature: string; left: string; right: string }[];
  };
  relatedTest: {
    title: string;
    acronym: string;
    description: string;
    questionCount: number;
    durationMinutes: number;
    testSlug: string;
  };
  faqs: { question: string; answer: string }[];
  references: ScientificReference[];
  relatedArticles: { title: string; slug: string; readingTime: string; category: string }[];
};

export const ARTICLES_DATABASE: Record<string, ArticleModel> = {
  "ansiedade-o-que-e-sintomas-causas": {
    slug: "ansiedade-o-que-e-sintomas-causas",
    title: "Ansiedade: o que é, sintomas, causas e quando procurar ajuda",
    seoTitle: "Ansiedade: O que é, Principais Sintomas, Causas e Tratamento | Mental Saúde",
    seoDescription: "Compreenda o que é a ansiedade, a diferença entre preocupação cotidiana e transtornos, sintomas físicos e emocionais, e quando buscar apoio profissional.",
    category: "Ansiedade e Tensão",
    primaryEntity: "Ansiedade",
    readingTime: "8 min de leitura",
    publishedAt: "10 de agosto de 2026",
    reviewedAt: "11 de agosto de 2026",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    reviewerSlug: "camila-mendes",
    image: "/manus-storage/editorial-ansiedade_fbf07fd9.png",
    directAnswer: "A ansiedade é uma resposta emocional natural do organismo diante de situações percebidas como ameaçadoras ou desafiadoras. No entanto, quando os sentimentos de apreensão, preocupação excessiva e tensão física tornam-se constantes, desproporcionais e passam a interferir na rotina, no trabalho ou nas relações, podem configurar um transtorno de ansiedade que merece atenção e cuidado especializado.",
    keyTakeaways: [
      "A ansiedade ocasional faz parte da vida e atua como um mecanismo adaptativo de alerta.",
      "O sofrimento persistente, a intensidade e o prejuízo funcional diário diferenciam a ansiedade cotidiana dos transtornos.",
      "Os sinais englobam tanto manifestações emocionais (apreensão, irritabilidade) quanto físicas (palpitações, tensão muscular).",
      "Instrumentos de rastreio (como o GAD-7) são educativos e ajudam a organizar percepções, mas não substituem diagnóstico clínico.",
      "A psicoterapia e intervenções baseadas em evidências oferecem suporte eficaz para a recuperação."
    ],
    tableOfContents: [
      { id: "o-que-e-ansiedade", label: "O que é ansiedade" },
      { id: "quando-deixa-de-ser-normal", label: "Quando deixa de ser uma resposta normal" },
      { id: "sintomas-emocionais-e-fisicos", label: "Sintomas emocionais e físicos" },
      { id: "ansiedade-vs-estresse", label: "Ansiedade x Estresse" },
      { id: "avaliacao-e-rastreio", label: "Como profissionais avaliam" },
      { id: "tratamento", label: "Tratamento" },
      { id: "quando-procurar-ajuda", label: "Quando procurar ajuda" },
      { id: "teste-relacionado", label: "Teste relacionado" },
      { id: "faq", label: "Perguntas frequentes" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-que-e-ansiedade",
        title: "O que é ansiedade",
        content: "A ansiedade é um estado emocional caracterizado por expectativas apreensivas em relação ao futuro, acompanhado por sentimentos de incerteza, nervosismo e alerta. Do ponto de vista evolutivo, a ansiedade desempenha um papel fundamental: prepara o corpo para reagir rapidamente a perigos (resposta de luta ou fuga) (WHO, 2025). Quando você precisa tomar uma decisão importante ou se preparar para um desafio, uma dose moderada de ativação pode aumentar o foco e o desempenho."
      },
      {
        id: "quando-deixa-de-ser-normal",
        title: "Quando a ansiedade deixa de ser apenas uma resposta normal",
        content: "O limite entre a ansiedade adaptativa e um quadro clínico reside na frequência, na intensidade e no impacto sobre a autonomia da pessoa. Se a preocupação é constante, difícil de controlar, surge sem um gatilho proporcional e compromete o sono, a concentração ou o convívio social, ela deixa de ser um alarme útil e passa a constituir uma fonte de sofrimento contínuo (Spitzer et al., 2006)."
      },
      {
        id: "sintomas-emocionais-e-fisicos",
        title: "Sintomas emocionais e físicos",
        content: "Os sinais da ansiedade manifestam-se de forma integrada no corpo e na mente. Entre os sintomas emocionais mais comuns destacam-se a sensação de perigo iminente, irritabilidade, dificuldade de concentração e hipervigilância. No plano físico, o sistema nervoso autônomo hiperativado pode gerar taquicardia, falta de ar, tensão muscular acentuada, sudorese, tremores e perturbações gastrointestinais (NIMH, 2025)."
      },
      {
        id: "ansiedade-vs-estresse",
        title: "Ansiedade x Estresse",
        content: "Embora frequentemente confundidos, estresse e ansiedade possuem distinções importantes. O estresse costuma estar vinculado a um fator estressor externo evidente (como prazos profissionais ou crises financeiras) e tende a arrefecer quando a situação se resolve. A ansiedade, por sua vez, é marcada por uma preocupação persistente que pode persistir mesmo na ausência de um perigo imediato."
      },
      {
        id: "avaliacao-e-rastreio",
        title: "Como profissionais avaliam",
        content: "A investigação clínica de um quadro ansioso envolve uma escuta atenta realizada por médicos psiquiatras ou psicólogos clínicos. O profissional examina o histórico de vida, a intensidade dos sintomas e o impacto funcional. Instrumentos padronizados de rastreio, como o questionário GAD-7, são frequentemente empregados para quantificar a gravidade percebida dos sintomas durante as últimas semanas."
      },
      {
        id: "tratamento",
        title: "Tratamento",
        content: "Os transtornos de ansiedade apresentam prognóstico favorável quando tratados adequadamente. A psicoterapia — com destaque para a Terapia Cognitivo-Comportamental (TCC) — auxilia na reestruturação de padrões de pensamento e no desenvolvimento de estratégias de enfrentamento. Em casos avaliados como moderados a graves, o acompanhamento psiquiátrico pode incluir o uso de medicação reguladora, sempre prescrita e monitorada individualmente."
      },
      {
        id: "quando-procurar-ajuda",
        title: "Quando procurar ajuda",
        content: "Busque orientação profissional se a preocupação e o mal-estar físico interferirem regularmente em suas atividades, no seu sono ou em suas relações. Cuidar da saúde mental no início de um processo de sofrimento evita desgastes maiores e favorece a recuperação da qualidade de vida."
      }
    ],
    evidenceBox: {
      whatWeKnow: "A ansiedade crônica e não tratada está associada a reduções significativas na qualidade de vida e pode coexistir com episódios depressivos.",
      whatEvidenceSuggests: "Intervenções psicoterapêuticas breves baseadas em evidências reduzem os escores de sintomas ansiosos em adultos em poucas semanas.",
      whatWeDontKnowYet: "Ainda são necessários mais estudos longitudinais sobre marcadores biológicos preditivos de resposta a tratamentos específicos na atenção primária."
    },
    relatedTest: {
      title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
      acronym: "GAD-7",
      description: "Instrumento breve de 7 perguntas para rastreio e mensuração da gravidade de sintomas ansiosos.",
      questionCount: 7,
      durationMinutes: 3,
      testSlug: "/testes"
    },
    faqs: [
      {
        question: "Ansiedade é sempre uma doença?",
        answer: "Não. A ansiedade é uma emoção humana essencial que nos protege de perigos. Ela só se torna um transtorno quando é excessiva, persistente e causa sofrimento ou prejuízo funcional."
      },
      {
        question: "Sintomas físicos podem ser causados apenas por ansiedade?",
        answer: "Sim, a hiperativação adrenérgica pode provocar palpitações, falta de ar e tremores. No entanto, é fundamental descartar causas clínicas orgânicas com um médico antes de atribuir os sintomas exclusivamente à ansiedade."
      },
      {
        question: "Existe cura para os transtornos de ansiedade?",
        answer: "Muitas pessoas alcançam remissão completa dos sintomas e aprendem a manejar gatilhos com psicoterapia e suporte adequado, recuperando plenamente o bem-estar."
      }
    ],
    references: [
      {
        id: "ref-1",
        citation: "World Health Organization (WHO). (2025). Anxiety disorders fact sheet.",
        authors: "World Health Organization",
        title: "Anxiety disorders overview",
        source: "WHO Newsroom",
        year: "2025",
        url: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders"
      },
      {
        id: "ref-2",
        citation: "Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of Internal Medicine, 166(10), 1092-1097.",
        authors: "Spitzer, R. L., et al.",
        title: "A brief measure for assessing generalized anxiety disorder: the GAD-7",
        source: "Archives of Internal Medicine",
        year: "2006",
        url: "https://pubmed.ncbi.nlm.nih.gov/16717171/"
      },
      {
        id: "ref-3",
        citation: "National Institute of Mental Health (NIMH). (2025). Anxiety Disorders information resource.",
        authors: "NIMH",
        title: "Anxiety Disorders",
        source: "U.S. Department of Health and Human Services",
        year: "2025",
        url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders"
      }
    ],
    relatedArticles: [
      { title: "A relação bilateral entre noites mal dormidas e episódios de ansiedade", slug: "/conteudos/sono-e-ansiedade", readingTime: "6 min de leitura", category: "Hábitos e Bem-estar" },
      { title: "Estresse crônico: quando a rotina excede a capacidade de adaptação", slug: "/conteudos/estresse-cronico-sinais", readingTime: "5 min de leitura", category: "Equilíbrio" },
      { title: "O que os testes de autoavaliação podem (e não podem) dizer sobre você", slug: "/conteudos/como-funcionam-os-testes-de-saude-mental", readingTime: "4 min de leitura", category: "Metodologia" }
    ]
  },

  "depressao-sintomas-causas-tratamento": {
    slug: "depressao-sintomas-causas-tratamento",
    title: "Depressão: sintomas, causas, tratamento e quando procurar ajuda",
    seoTitle: "Depressão: Sintomas, Causas, Tratamentos e Apoio | Mental Saúde",
    seoDescription: "Entenda o que é a depressão, os sintomas persistentes que a diferenciam da tristeza comum, abordagens terapêuticas e caminhos para buscar ajuda.",
    category: "Humor e Energia",
    primaryEntity: "Depressão",
    readingTime: "9 min de leitura",
    publishedAt: "8 de agosto de 2026",
    reviewedAt: "10 de agosto de 2026",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    image: "/manus-storage/editorial-depressao_6cf6cd6f.png",
    directAnswer: "A depressão (transtorno depressivo maior) é uma condição médica séria e comum que afeta negativamente como você se sente, pensa e age. Ela vai muito além de uma tristeza passageira: caracteriza-se por humor deprimido persistente e perda de interesse ou prazer em atividades por pelo menos duas semanas, acompanhados de alterações no sono, apetite e energia.",
    keyTakeaways: [
      "A depressão não é fraqueza de caráter nem falta de vontade, mas uma condição de saúde tratável.",
      "O diagnóstico exige persistência de sintomas por ao menos duas semanas com impacto funcional.",
      "Manifestações físicas como fadiga crônica, dores inexplicáveis e alterações no sono costumam acompanhar o quadro.",
      "A combinação de psicoterapia e acompanhamento médico especializado oferece excelentes taxas de recuperação.",
      "O apoio empático de familiares e amigos faz diferença significativa no processo de cuidado."
    ],
    tableOfContents: [
      { id: "o-que-e-depressao", label: "O que é depressão" },
      { id: "depressao-vs-tristeza", label: "Depressão x Tristeza comum" },
      { id: "principais-sintomas", label: "Principais sintomas" },
      { id: "fatores-e-causas", label: "Possíveis fatores envolvidos" },
      { id: "avaliacao-profissional", label: "Como é feita a avaliação" },
      { id: "tratamento-e-cuidado", label: "Tratamento e visão geral" },
      { id: "quando-procurar-ajuda", label: "Quando procurar ajuda" },
      { id: "teste-relacionado", label: "Teste relacionado" },
      { id: "faq", label: "Perguntas frequentes" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-que-e-depressao",
        title: "O que é depressão",
        content: "A Organização Mundial da Saúde (OMS) aponta a depressão como uma das principais causas de incapacidade em todo o mundo. Trata-se de um transtorno de humor complexo que altera a forma como o indivíduo processa emoções, experimenta motivação e interage com o ambiente. Não resulta de falta de esforço pessoal, sendo influenciada por fatores biológicos, genéticos, psicológicos e sociais (WHO, 2025)."
      },
      {
        id: "depressao-vs-tristeza",
        title: "Depressão x Tristeza comum",
        content: "A tristeza é uma emoção humana universal diante de perdas, frustrações ou lutos. Na tristeza comum, momentos de alívio ou capacidade de vivenciar pequenos prazeres costumam se manter presentes. Na depressão clínica, o sentimento de vazio e desânimo é persistente, generalizado e interfere na capacidade de realizar tarefas cotidianas por semanas consecutivas (NIMH, 2025)."
      },
      {
        id: "principais-sintomas",
        title: "Principais sintomas",
        content: "Os critérios diagnósticos exigem a presença de vários sintomas simultâneos por pelo menos duas semanas. Entre eles estão o humor deprimido na maior parte do dia, perda marcante de interesse em hobbies, fadiga intensa, sentimentos de inutilidade ou culpa excessiva, dificuldade de concentração e, em casos mais graves, pensamentos recorrentes de desesperança."
      },
      {
        id: "fatores-e-causas",
        title: "Possíveis fatores envolvidos",
        content: "O desenvolvimento da depressão costuma envolver a interação entre vulnerabilidade genética, alterações na neuroquímica cerebral, eventos estressantes de vida (como perdas significativas ou traumas) e condições médicas coexistentes."
      },
      {
        id: "avaliacao-profissional",
        title: "Como é feita a avaliação",
        content: "A avaliação é conduzida por profissionais de saúde mental (psiquiatras ou psicólogos) por meio de entrevista clínica detalhada. Instrumentos de triagem estruturados, como o PHQ-9, auxiliam na quantificação dos sintomas relatados nas últimas duas semanas."
      },
      {
        id: "tratamento-e-cuidado",
        title: "Tratamento e visão geral",
        content: "O tratamento baseia-se em psicoterapia (como TCC ou terapia interpessoal) e, quando indicado pelo médico psiquiatra, uso de medicamentos antidepressivos para reequilibrar a transmissão sináptica. Mudanças graduais no estilo de vida e redes de apoio também exercem papel complementar essencial."
      }
    ],
    evidenceBox: {
      whatWeKnow: "O tratamento combinado de psicoterapia e farmacoterapia apresenta alta eficácia na remissão de episódios depressivos moderados a graves.",
      whatEvidenceSuggests: "O engajamento precoce em redes de apoio social reduz o risco de recaídas em adultos em tratamento de manutenção.",
      whatWeDontKnowYet: "Marcadores biológicos específicos na prática ambulatorial diária ainda carecem de validação ampla para escolha imediata de fármacos."
    },
    relatedTest: {
      title: "Questionário de Saúde do Paciente (PHQ-9)",
      acronym: "PHQ-9",
      description: "Instrumento validado de 9 itens para rastreio e avaliação da severidade de sintomas depressivos.",
      questionCount: 9,
      durationMinutes: 3,
      testSlug: "/testes"
    },
    faqs: [
      {
        question: "Depressão tem cura?",
        answer: "A depressão é altamente tratável. Muitas pessoas experimentam recuperação completa e aprendem estratégias preventivas eficazes para evitar novas crises."
      },
      {
        question: "Antidepressivos causam dependência?",
        answer: "Não. Os medicamentos antidepressivos modernos regulam a neurotransmissão sem causar dependência química ou tolerância."
      }
    ],
    references: [
      {
        id: "ref-dep-1",
        citation: "World Health Organization (WHO). (2025). Depressive disorder (depression) fact sheet.",
        authors: "World Health Organization",
        title: "Depression overview",
        source: "WHO Newsroom",
        year: "2025",
        url: "https://www.who.int/news-room/fact-sheets/detail/depression"
      },
      {
        id: "ref-dep-2",
        citation: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606-613.",
        authors: "Kroenke, K., et al.",
        title: "The PHQ-9 validation",
        source: "Journal of General Internal Medicine",
        year: "2001",
        url: "https://pubmed.ncbi.nlm.nih.gov/11556941/"
      }
    ],
    relatedArticles: [
      { title: "Ansiedade: o que é, sintomas, causas e quando procurar ajuda", slug: "/conteudos/ansiedade-o-que-e-sintomas-causas", readingTime: "8 min de leitura", category: "Ansiedade e Tensão" },
      { title: "Autocompaixão não é fraqueza: o papel da gentileza consigo mesmo", slug: "/conteudos/autocompaxao-em-saude-mental", readingTime: "6 min de leitura", category: "Psicoeducação" },
      { title: "Guia completo sobre depressão", slug: "/conteudos/guia-depressao", readingTime: "10 min de leitura", category: "Guia Essencial" }
    ]
  },

  "tdah-em-adultos": {
    slug: "tdah-em-adultos",
    title: "TDAH em adultos: sintomas, avaliação e tratamento",
    seoTitle: "TDAH em Adultos: Sintomas, Sinais Sutis e Avaliação | Mental Saúde",
    seoDescription: "Conheça como o Transtorno do Déficit de Atenção com Hiperatividade (TDAH) se manifesta em adultos, desafios de organização e caminhos de avaliação.",
    category: "Neurodiversidade",
    primaryEntity: "TDAH",
    readingTime: "7 min de leitura",
    publishedAt: "8 de agosto de 2026",
    reviewedAt: "10 de agosto de 2026",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    image: "/manus-storage/editorial-tdah_b79cdc94.png",
    directAnswer: "O Transtorno do Déficit de Atenção com Hiperatividade (TDAH) em adultos é uma condição neurobiológica caracterizada por padrões persistentes de desatenção, desorganização, inquietação interna e impulsividade que afetam o funcionamento executivo. Embora frequentemente diagnosticado na infância, muitos adultos descobrem o TDAH tardiamente ao enfrentarem demandas complexas de trabalho, estudos e gestão da vida cotidiana.",
    keyTakeaways: [
      "O TDAH não desaparece na vida adulta, embora seus sintomas possam mudar de expressão (com menor hiperatividade motora e maior inquietação mental).",
      "Dificuldades com gerenciamento de tempo, procrastinação crônica e esquecimentos frequentes são comuns.",
      "O rastreio inicial pode ser feito com instrumentos validados como o ASRS v1.1.",
      "O diagnóstico definitivo requer avaliação clínica abrangente por profissional habilitado.",
      "Estratégias de organização aliadas a acompanhamento especializado transformam positivamente a rotina."
    ],
    tableOfContents: [
      { id: "o-que-e-tdah", label: "O que é TDAH em adultos" },
      { id: "como-se-manifesta", label: "Como os sintomas aparecem no dia a dia" },
      { id: "funcoes-executivas", label: "Impacto nas funções executivas" },
      { id: "avaliacao-e-asrs", label: "Como é feita a avaliação e o ASRS" },
      { id: "tratamento-e-suporte", label: "Tratamento e estratégias" },
      { id: "quando-procurar-ajuda", label: "Quando procurar ajuda" },
      { id: "teste-relacionado", label: "Teste relacionado" },
      { id: "faq", label: "Perguntas frequentes" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-que-e-tdah",
        title: "O que é TDAH em adultos",
        content: "O TDAH é um transtorno do neurodesenvolvimento cujas bases envolvem diferenças na regulação de neurotransmissores como dopamina e noradrenalina em circuitos cerebrais associados ao controle executivo. Na vida adulta, manifesta-se em desafios contínuos para manter o foco em tarefas monótonas, regular impulsos e planejar etapas de longo prazo (AAPF, 2025)."
      },
      {
        id: "como-se-manifesta",
        title: "Como os sintomas aparecem no dia a dia",
        content: "Enquanto crianças com TDAH podem apresentar hiperatividade motora visível, adultos frequentemente relatam uma 'inquietação interna'. Os sinais incluem distração fácil por estímulos irrelevantes, tendência a iniciar vários projetos sem concluir nenhum, dificuldade com prazos (cegueira temporal) e esquecimentos de compromissos ou objetos."
      },
      {
        id: "funcoes-executivas",
        title: "Impacto nas funções executivas",
        content: "As funções executivas — conjunto de habilidades mentais que nos permitem planejar, focar atenção, memorizar instruções e gerenciar múltiplas tarefas — costumam exigir esforço adicional de pessoas com TDAH, gerando desgaste mental ao final do dia."
      },
      {
        id: "avaliacao-e-asrs",
        title: "Como é feita a avaliação e o ASRS v1.1",
        content: "A investigação diagnóstica em adultos é retrospectiva e clínica, investigando o histórico de sintomas desde a infância, relatos de familiares e aplicação de escalas validadas. O ASRS v1.1 (Adult ADHD Self-Report Scale), desenvolvido em parceria com a OMS, é um instrumento amplamente utilizado para rastreio inicial."
      },
      {
        id: "tratamento-e-suporte",
        title: "Tratamento e estratégias",
        content: "O manejo do TDAH em adultos costuma ser multimodal, combinando psicoeducação, estratégias de organização ambiental, psicoterapia (focada em remediação de funções executivas) e, quando indicado por um médico psiquiatra, suporte farmacológico adequado."
      }
    ],
    evidenceBox: {
      whatWeKnow: "O reconhecimento precoce e a psicoeducação sobre o TDAH reduzem frustrações crônicas e melhoram a autoestima de adultos diagnosticados tardiamente.",
      whatEvidenceSuggests: "Abordagens combinando treino de habilidades organizacionais e suporte médico trazem ganhos expressivos na produtividade e bem-estar.",
      whatWeDontKnowYet: "A eficácia a longuíssimo prazo de intervenções digitais isoladas para manejo executivo ainda requer ensaios clínicos robustos adicionais."
    },
    relatedTest: {
      title: "Adult ADHD Self-Report Scale (ASRS v1.1)",
      acronym: "ASRS v1.1",
      description: "Screener oficial de 6 perguntas da OMS para rastreio de sintomas de TDAH em adultos.",
      questionCount: 6,
      durationMinutes: 2,
      testSlug: "/testes"
    },
    faqs: [
      {
        question: "TDAH surge apenas na infância?",
        answer: "O TDAH é um transtorno do neurodesenvolvimento que se inicia na infância, mas muitos adultos só recebem o reconhecimento adequado tardiamente, quando as exigências da vida adulta superam seus mecanismos compensatórios."
      },
      {
        question: "Todo desatento tem TDAH?",
        answer: "Não. A desatenção pode ser sintoma de ansiedade, depressão, privação crônica de sono ou estresse agudo, daí a importância de uma avaliação profissional diferenciada."
      }
    ],
    references: [
      {
        id: "ref-adhd-1",
        citation: "Kessler, R. C., Adler, L., Ames, M., Demler, O., Faraone, S., Hiripi, E., ... & Walters, E. E. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS). Psychological Medicine, 35(2), 245-256.",
        authors: "Kessler, R. C., et al.",
        title: "The World Health Organization Adult ADHD Self-Report Scale (ASRS)",
        source: "Psychological Medicine",
        year: "2005",
        url: "https://pubmed.ncbi.nlm.nih.gov/15841682/"
      },
      {
        id: "ref-adhd-2",
        citation: "American Academy of Family Physicians (AAFP). (2025). Adult ADHD Clinical Guidance.",
        authors: "AAFP",
        title: "Adult ADHD Toolkit",
        source: "Clinical Insights",
        year: "2025",
        url: "https://www.aafp.org/clinical-insights/cognitive-and-behavioral-health/adult-adhd"
      }
    ],
    relatedArticles: [
      { title: "Ansiedade: o que é, sintomas, causas e quando procurar ajuda", slug: "/conteudos/ansiedade-o-que-e-sintomas-causas", readingTime: "8 min de leitura", category: "Ansiedade e Tensão" },
      { title: "O que os testes de autoavaliação podem (e não podem) dizer sobre você", slug: "/conteudos/como-funcionam-os-testes-de-saude-mental", readingTime: "4 min de leitura", category: "Metodologia" },
      { title: "TDAH em adultos: guia de orientação", slug: "/conteudos/guia-tdah-adultos", readingTime: "9 min de leitura", category: "Guia Essencial" }
    ]
  }
};
