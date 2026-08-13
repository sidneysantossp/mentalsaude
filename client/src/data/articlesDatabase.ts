export type ParagraphSegment = {
  text: string;
  refId?: string;
  displayText?: string;
};

export type ArticleParagraph = {
  segments: ParagraphSegment[];
};

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: ArticleParagraph[];
};

export type ScientificReference = {
  id: string;
  shortLabel: string;
  fullCitation: string;
  sourceUrl?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type EvidenceBoxModel = {
  whatWeKnow: string;
  whatEvidenceSuggests: string;
  whatWeDontKnowYet: string;
};

export type RelatedTestModel = {
  title: string;
  acronym: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  testSlug: string;
};

export type ArticleModel = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  readingTime: string;
  title: string;
  subtitle: string;
  author: string;
  authorSlug: string;
  reviewer: string;
  reviewerSlug: string;
  reviewedAt: string;
  image: string;
  primaryEntity: string;
  directAnswer: string;
  keyTakeaways: string[];
  tableOfContents: { id: string; label: string }[];
  sections: ArticleSection[];
  evidenceBox: EvidenceBoxModel;
  relatedTest?: RelatedTestModel | null; // Nullable para testar o fallback real quando omitido
  faqs: FAQItem[];
  references: ScientificReference[];
};

export const ARTICLES_DATABASE: Record<string, ArticleModel> = {
  "ansiedade-o-que-e-sintomas-causas": {
    slug: "ansiedade-o-que-e-sintomas-causas",
    seoTitle: "Ansiedade: O que é, Principais Sintomas, Causas e Tratamento | Mental Saúde",
    seoDescription: "Compreenda o que é a ansiedade, a diferença entre preocupação cotidiana e transtornos, sintomas físicos e emocionais, e quando buscar apoio profissional.",
    category: "Ansiedade e Tensão",
    readingTime: "8 min de leitura",
    title: "Ansiedade: o que é, sintomas, causas e quando procurar ajuda",
    subtitle: "Compreenda o que é a ansiedade, a diferença entre preocupação cotidiana e transtornos, sintomas físicos e emocionais, e quando buscar apoio profissional.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    reviewerSlug: "camila-mendes",
    reviewedAt: "11 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_fbf07fd9.png",
    primaryEntity: "Ansiedade",
    directAnswer: "A ansiedade é uma resposta emocional natural diante de ameaças. Quando constante, desproporcional e prejudicial à rotina, pode configurar um transtorno tratável.",
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
      { id: "sintomas-emocionais-fisicos", label: "Sintomas emocionais e físicos" },
      { id: "ansiedade-x-estresse", label: "Ansiedade x Estresse" },
      { id: "como-profissionais-avaliam", label: "Como profissionais avaliam" },
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
        paragraphs: [
          {
            segments: [
              { text: "A ansiedade é um estado emocional caracterizado por expectativas apreensivas em relação ao futuro, acompanhado por sentimentos de incerteza, nervosismo e alerta. Do ponto de vista evolutivo, a ansiedade desempenha um papel fundamental: prepara o corpo para reagir rapidamente a perigos " },
              { text: "WHO, 2025", refId: "who-2025", displayText: "WHO, 2025" },
              { text: ". Quando você precisa tomar uma decisão importante ou se preparar para um desafio, uma dose moderada de ativação pode aumentar o foco e o desempenho." }
            ]
          }
        ]
      },
      {
        id: "quando-deixa-de-ser-normal",
        title: "Quando a ansiedade deixa de ser apenas uma resposta normal",
        paragraphs: [
          {
            segments: [
              { text: "O limite entre a ansiedade adaptativa e um quadro clínico reside na frequência, na intensidade e no impacto sobre a autonomia da pessoa. Se a preocupação é constante, difícil de controlar, surge sem um gatilho proporcional e compromete o sono, a concentração ou o convívio social, ela deixa de ser um alarme útil e passa a constituir uma fonte de sofrimento contínuo " },
              { text: "Spitzer et al., 2006", refId: "spitzer-2006", displayText: "Spitzer et al., 2006" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "sintomas-emocionais-fisicos",
        title: "Sintomas emocionais e físicos",
        paragraphs: [
          {
            segments: [
              { text: "Os sinais da ansiedade manifestam-se de forma integrada no corpo e na mente. Entre os sintomas emocionais mais comuns destacam-se a sensação de perigo iminente, irritabilidade, dificuldade de concentração e hipervigilância. No plano físico, o sistema nervoso autônomo hiperativado pode gerar taquicardia, falta de ar, tensão muscular acentuada, sudorese, tremores e perturbações gastrointestinais " },
              { text: "NIMH, 2025", refId: "nimh-2025", displayText: "NIMH, 2025" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "ansiedade-x-estresse",
        title: "Ansiedade x Estresse",
        paragraphs: [
          {
            segments: [
              { text: "Embora frequentemente confundidos, estresse e ansiedade possuem distinções importantes. O estresse costuma estar vinculado a um fator estressor externo evidente (como prazos profissionais ou crises financeiras) e tende a arrefecer quando a situação se resolve. A ansiedade, por sua vez, é marcada por uma preocupação persistente que pode persistir mesmo na ausência de um perigo imediato." }
            ]
          }
        ]
      },
      {
        id: "como-profissionais-avaliam",
        title: "Como profissionais avaliam",
        paragraphs: [
          {
            segments: [
              { text: "A investigação clínica de um quadro ansioso envolve uma escuta atenta realizada por médicos psiquiatras ou psicólogos clínicos. O profissional examina o histórico de vida, a intensidade dos sintomas e o impacto funcional. Instrumentos padronizados de rastreio, como o questionário GAD-7, são frequentemente empregados para quantificar a gravidade percebida dos sintomas durante as últimas semanas." }
            ]
          }
        ]
      },
      {
        id: "tratamento",
        title: "Tratamento",
        paragraphs: [
          {
            segments: [
              { text: "Os transtornos de ansiedade apresentam prognóstico favorável quando tratados adequadamente. A psicoterapia — com destaque para a Terapia Cognitivo-Comportamental (TCC) — auxilia na reestruturação de padrões de pensamento e no desenvolvimento de estratégias de enfrentamento. Em casos avaliados como moderados a graves, o acompanhamento psiquiátrico pode incluir o uso de medicação reguladora, sempre prescrita e monitorada individualmente." }
            ]
          }
        ]
      },
      {
        id: "quando-procurar-ajuda",
        title: "Quando procurar ajuda",
        paragraphs: [
          {
            segments: [
              { text: "Busque orientação profissional se a preocupação e o mal-estar físico interferirem regularmente em suas atividades, no seu sono ou em suas relações. Cuidar da saúde mental no início de um processo de sofrimento evita desgastes maiores e favorece a recuperação da qualidade de vida." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "A ansiedade crônica e não tratada está associada a reduções significativas na qualidade de vida e pode potencializar comorbidades somáticas.",
      whatEvidenceSuggests: "O rastreio precoce com instrumentos validados (como o GAD-7) aliado à psicoeducação melhora a adesão ao autocuidado.",
      whatWeDontKnowYet: "Marcadores biológicos isolados ainda não substituem a avaliação clínica aprofundada por um profissional habilitado."
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
        answer: "Não. A ansiedade é uma emoção humana essencial para a sobrevivência e alerta. Torna-se patológica quando desproporcional, contínua e causadora de prejuízo funcional significativo."
      },
      {
        question: "Sintomas físicos podem ser causados apenas por ansiedade?",
        answer: "Sim, a ativação crônica do sistema nervoso simpático pode gerar palpitações, falta de ar e tensão muscular. No entanto, é fundamental excluir causas clínicas orgânicas com um médico."
      },
      {
        question: "Existe cura para os transtornos de ansiedade?",
        answer: "Mais do que 'cura', fala-se em remissão estável e manejo eficaz. Com tratamento adequado, a grande maioria dos indivíduos recupera a autonomia e o bem-estar."
      }
    ],
    references: [
      {
        id: "who-2025",
        shortLabel: "WHO, 2025",
        fullCitation: "World Health Organization (WHO). (2025). Anxiety disorders fact sheet.",
        sourceUrl: "https://www.who.int"
      },
      {
        id: "spitzer-2006",
        shortLabel: "Spitzer et al., 2006",
        fullCitation: "Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of Internal Medicine, 166(10), 1092-1097.",
        sourceUrl: "https://jamanetwork.com"
      },
      {
        id: "nimh-2025",
        shortLabel: "NIMH, 2025",
        fullCitation: "National Institute of Mental Health (NIMH). (2025). Anxiety Disorders information resource.",
        sourceUrl: "https://www.nimh.nih.gov"
      }
    ]
  },
  "depressao-sintomas-causas-tratamento": {
    slug: "depressao-sintomas-causas-tratamento",
    seoTitle: "Depressão: Sintomas, Causas, Tratamentos e Apoio | Mental Saúde",
    seoDescription: "Entenda o que é a depressão, os sintomas persistentes que a diferenciam da tristeza comum, abordagens terapêuticas e caminhos para buscar ajuda.",
    category: "Humor e Energia",
    readingTime: "9 min de leitura",
    title: "Depressão: sintomas, causas, tratamento e quando procurar ajuda",
    subtitle: "Entenda o que é a depressão, os sintomas persistentes que a diferenciam da tristeza comum, abordagens terapêuticas e caminhos para buscar ajuda.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    reviewedAt: "10 de agosto de 2026",
    image: "/manus-storage/editorial-depressao_6cf6cd6f.png",
    primaryEntity: "Depressão",
    directAnswer: "A depressão clínica caracteriza-se por humor deprimido persistente por mais de duas semanas, com perda de interesse e fadiga. É uma condição tratável que combina psicoterapia e suporte médico.",
    keyTakeaways: [
      "A depressão não é fraqueza de caráter nem falta de vontade, mas uma condição de saúde tratável.",
      "O diagnóstico exige persistência de sintomas por ao menos duas semanas com impacto funcional.",
      "Manifestações físicas como fadiga crônica, dores inexplicáveis e alterações no sono costumam acompanhar o quadro.",
      "A combinação de psicoterapia e acompanhamento médico especializado oferece excelentes taxas de recuperação.",
      "O apoio empático de familiares e amigos faz diferença significativa no processo de cuidado."
    ],
    tableOfContents: [
      { id: "o-que-e-depressao", label: "O que é depressão" },
      { id: "depressao-x-tristeza", label: "Depressão x Tristeza comum" },
      { id: "principais-sintomas", label: "Principais sintomas" },
      { id: "fatores-envolvidos", label: "Possíveis fatores envolvidos" },
      { id: "como-e-feita-avaliacao", label: "Como é feita a avaliação" },
      { id: "tratamento-visao-geral", label: "Tratamento e visão geral" },
      { id: "teste-relacionado", label: "Teste relacionado" },
      { id: "faq", label: "Perguntas frequentes" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-que-e-depressao",
        title: "O que é depressão",
        paragraphs: [
          {
            segments: [
              { text: "A Organização Mundial da Saúde (OMS) aponta a depressão como uma das principais causas de incapacidade em todo o mundo. Trata-se de um transtorno de humor complexo que altera a forma como o indivíduo processa emoções, experimenta motivação e interage com o ambiente " },
              { text: "WHO, 2025", refId: "who-dep-2025", displayText: "WHO, 2025" },
              { text: ". Não resulta de falta de esforço pessoal, sendo influenciada por fatores biológicos, genéticos, psicológicos e sociais." }
            ]
          }
        ]
      },
      {
        id: "depressao-x-tristeza",
        title: "Depressão x Tristeza comum",
        paragraphs: [
          {
            segments: [
              { text: "A tristeza é uma emoção humana universal diante de perdas, frustrações ou lutos. Na tristeza comum, momentos de alívio ou capacidade de vivenciar pequenos prazeres costumam se manter presentes. Na depressão clínica, o sentimento de vazio e desânimo é persistente, generalizado e interfere na capacidade de realizar tarefas cotidianas por semanas consecutivas " },
              { text: "NIMH, 2025", refId: "nimh-dep-2025", displayText: "NIMH, 2025" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "principais-sintomas",
        title: "Principais sintomas",
        paragraphs: [
          {
            segments: [
              { text: "Os critérios diagnósticos exigem a presença de vários sintomas simultâneos por pelo menos duas semanas. Entre eles estão o humor deprimido na maior parte do dia, perda marcante de interesse em hobbies, fadiga intensa, sentimentos de inutilidade ou culpa excessiva, dificuldade de concentração e pensamentos recorrentes de desesperança." }
            ]
          }
        ]
      },
      {
        id: "fatores-envolvidos",
        title: "Possíveis fatores envolvidos",
        paragraphs: [
          {
            segments: [
              { text: "O desenvolvimento da depressão costuma envolver a interação entre vulnerabilidade genética, alterações na neuroquímica cerebral, eventos estressantes de vida (como perdas significativas ou traumas) e condições médicas coexistentes." }
            ]
          }
        ]
      },
      {
        id: "como-e-feita-avaliacao",
        title: "Como é feita a avaliação",
        paragraphs: [
          {
            segments: [
              { text: "A avaliação é conduzida por profissionais de saúde mental (psiquiatras ou psicólogos) por meio de entrevista clínica detalhada. Instrumentos de triagem estruturados, como o PHQ-9, auxiliam na quantificação dos sintomas relatados nas últimas duas semanas." }
            ]
          }
        ]
      },
      {
        id: "tratamento-visao-geral",
        title: "Tratamento e visão geral",
        paragraphs: [
          {
            segments: [
              { text: "O tratamento baseia-se em psicoterapia (como TCC ou terapia interpessoal) e, quando indicado pelo médico psiquiatra, uso de medicamentos antidepressivos para reequilibrar a transmissão sináptica. Mudanças graduais no estilo de vida e redes de apoio também exercem papel complementar essencial." }
            ]
          }
        ]
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
        id: "who-dep-2025",
        shortLabel: "WHO, 2025",
        fullCitation: "World Health Organization. (2025). Depressive disorder (depression) fact sheet.",
        sourceUrl: "https://www.who.int"
      },
      {
        id: "nimh-dep-2025",
        shortLabel: "NIMH, 2025",
        fullCitation: "National Institute of Mental Health. (2025). Depression basic overview.",
        sourceUrl: "https://www.nimh.nih.gov"
      }
    ]
  },
  "tdah-em-adultos": {
    slug: "tdah-em-adultos",
    seoTitle: "TDAH em Adultos: Sintomas, Sinais Sutis e Avaliação | Mental Saúde",
    seoDescription: "Conheça como o Transtorno do Déficit de Atenção com Hiperatividade (TDAH) se manifesta em adultos, desafios de organização e caminhos de avaliação.",
    category: "Neurodiversidade",
    readingTime: "7 min de leitura",
    title: "TDAH em adultos: sintomas, avaliação e tratamento",
    subtitle: "Conheça como o Transtorno do Déficit de Atenção com Hiperatividade (TDAH) se manifesta em adultos, desafios de organização e caminhos de avaliação.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    reviewedAt: "10 de agosto de 2026",
    image: "/manus-storage/editorial-tdah_b79cdc94.png",
    primaryEntity: "TDAH",
    directAnswer: "O TDAH em adultos envolve padrões persistentes de desatenção, desorganização e inquietação que afetam as funções executivas. O rastreio inicial pode ser feito com o ASRS v1.1.",
    keyTakeaways: [
      "O TDAH não desaparece na vida adulta, embora seus sintomas possam mudar de expressão (com menor hiperatividade motora e maior inquietação mental).",
      "Dificuldades com gerenciamento de tempo, procrastinação crônica e esquecimentos frequentes são comuns.",
      "O rastreio inicial pode ser feito com instrumentos validados como o ASRS v1.1.",
      "O diagnóstico definitivo requer avaliação clínica abrangente por profissional habilitado.",
      "Estratégias de organização aliadas a acompanhamento especializado transformam positivamente a rotina."
    ],
    tableOfContents: [
      { id: "o-que-e-tdah", label: "O que é TDAH em adultos" },
      { id: "sintomas-dia-a-dia", label: "Como os sintomas aparecem" },
      { id: "funcoes-executivas", label: "Impacto nas funções executivas" },
      { id: "avaliacao-asrs", label: "Como é feita a avaliação e o ASRS v1.1" },
      { id: "tratamento-estrategias", label: "Tratamento e estratégias" },
      { id: "teste-relacionado", label: "Teste relacionado" },
      { id: "faq", label: "Perguntas frequentes" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-que-e-tdah",
        title: "O que é TDAH em adultos",
        paragraphs: [
          {
            segments: [
              { text: "O TDAH é um transtorno do neurodesenvolvimento cujas bases envolvem diferenças na regulação de neurotransmissores como dopamina e noradrenalina em circuitos cerebrais associados ao controle executivo. Na vida adulta, manifesta-se em desafios contínuos para manter o foco em tarefas monótonas, regular impulsos e planejar etapas de longo prazo " },
              { text: "AAPF, 2025", refId: "aapf-2025", displayText: "AAPF, 2025" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "sintomas-dia-a-dia",
        title: "Como os sintomas aparecem no dia a dia",
        paragraphs: [
          {
            segments: [
              { text: "Enquanto crianças com TDAH podem apresentar hiperatividade motora visível, adultos frequentemente relatam uma 'inquietação interna'. Os sinais incluem distração fácil por estímulos irrelevantes, tendência a iniciar vários projetos sem concluir nenhum, dificuldade com prazos e esquecimentos frequentes." }
            ]
          }
        ]
      },
      {
        id: "funcoes-executivas",
        title: "Impacto nas funções executivas",
        paragraphs: [
          {
            segments: [
              { text: "As funções executivas — conjunto de habilidades mentais que nos permitem planejar, focar atenção, memorizar instruções e gerenciar múltiplas tarefas — costumam exigir esforço adicional de pessoas com TDAH, gerando desgaste mental ao final do dia." }
            ]
          }
        ]
      },
      {
        id: "avaliacao-asrs",
        title: "Como é feita a avaliação e o ASRS v1.1",
        paragraphs: [
          {
            segments: [
              { text: "A investigação diagnóstica em adultos é retrospectiva e clínica, investigando o histórico de sintomas desde a infância, relatos de familiares e aplicação de escalas validadas. O ASRS v1.1 (Adult ADHD Self-Report Scale), desenvolvido em parceria com a OMS, é um instrumento amplamente utilizado para rastreio inicial " },
              { text: "Kessler et al., 2005", refId: "kessler-2005", displayText: "Kessler et al., 2005" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "tratamento-estrategias",
        title: "Tratamento e estratégias",
        paragraphs: [
          {
            segments: [
              { text: "O manejo do TDAH em adultos costuma ser multimodal, combinando psicoeducação, estratégias de organização ambiental, psicoterapia e, quando indicado por um médico psiquiatra, suporte farmacológico adequado." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O reconhecimento precoce e a psicoeducação sobre o TDAH reduzem frustrações crônicas e melhoram a autoestima de adultos diagnosticados tardiamente.",
      whatEvidenceSuggests: "Abordagens combinando treino de habilidades organizacionais e suporte médico traz ganhos expressivos na produtividade e bem-estar.",
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
        id: "aapf-2025",
        shortLabel: "AAPF, 2025",
        fullCitation: "American Professional Partnership for ADHD. (2025). Adult ADHD clinical overview.",
        sourceUrl: "https://www.caddra.ca"
      },
      {
        id: "kessler-2005",
        shortLabel: "Kessler et al., 2005",
        fullCitation: "Kessler, R. C., et al. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS). Psychological Medicine, 35(2), 245-256.",
        sourceUrl: "https://www.cambridge.org"
      }
    ]
  },
  "guia-geral-sem-teste": {
    slug: "guia-geral-sem-teste",
    seoTitle: "Guia Geral de Autocuidado Emocional e Práticas de Rotina | Mental Saúde",
    seoDescription: "Um artigo dedicado a estratégias gerais de bem-estar emocional que não exige um instrumento específico de rastreio clínico.",
    category: "Hábitos e Bem-estar",
    readingTime: "5 min de leitura",
    title: "Guia Geral de Autocuidado Emocional e Práticas de Rotina",
    subtitle: "Um artigo dedicado a estratégias gerais de bem-estar emocional que não exige um instrumento específico de rastreio clínico.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    reviewerSlug: "camila-mendes",
    reviewedAt: "09 de agosto de 2026",
    image: "/manus-storage/editorial-autocuidado_3726f5cd.png",
    primaryEntity: "Autocuidado",
    directAnswer: "Práticas diárias de autocuidado, pausas estruturadas e rotinas consistentes fortalecem a resiliência emocional e o bem-estar geral.",
    keyTakeaways: [
      "Pequenas pausas ao longo do dia reduzem a sobrecarga cognitiva.",
      "A consistência no sono e na hidratação impacta diretamente o humor.",
      "Este artigo não possui teste clínico associado, servindo como demonstração de fallback robusto."
    ],
    tableOfContents: [
      { id: "praticas-diarias", label: "Práticas cotidianas" },
      { id: "faq", label: "Perguntas frequentes" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "praticas-diarias",
        title: "Práticas cotidianas de autocuidado",
        paragraphs: [
          {
            segments: [
              { text: "O autocuidado não se resume a grandes pausas ou retiros, mas à microgestão do estresse e à atenção plena às necessidades básicas do corpo e da mente." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Rotinas estruturadas de descanso reduzem marcadores biológicos de estresse.",
      whatEvidenceSuggests: "Estabelecer horários consistentes de descanso e desconexão.",
      whatWeDontKnowYet: "Guias gerais não substituem acompanhamento psicológico em quadros clínicos graves."
    },
    relatedTest: null, // Testando explicitamente o fallback real: sem relatedTest, o ContextualTestCTA não renderiza
    faqs: [
      {
        question: "Preciso fazer um teste para ler este guia?",
        answer: "Não. Este artigo é informativo e não possui teste associado."
      }
    ],
    references: [
      {
        id: "ref-general-1",
        shortLabel: "WHO, 2025",
        fullCitation: "World Health Organization. (2025). Mental health and well-being guidelines.",
        sourceUrl: "https://www.who.int"
      }
    ]
  },
  "ansiedade-ou-preocupacao": {
    slug: "ansiedade-ou-preocupacao",
    seoTitle: "Como saber se tenho ansiedade ou estou apenas preocupado? | Mental Saúde",
    seoDescription: "Entenda as distinções clínicas entre a preocupação cotidiana e os sintomas persistentes do transtorno de ansiedade generalizada.",
    category: "Transtornos de Ansiedade",
    readingTime: "6 min de leitura",
    title: "Como saber se tenho ansiedade ou estou apenas preocupado?",
    subtitle: "Entenda as distinções clínicas entre a preocupação cotidiana e os sintomas persistentes do transtorno de ansiedade.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Preocupação vs Ansiedade",
    directAnswer: "Enquanto a preocupação comum é focada em problemas específicos e controláveis com impacto limitado, a ansiedade patológica é difusa, excessiva, difícil de controlar e interfere na rotina por semanas.",
    keyTakeaways: [
      "A preocupação cotidiana costuma ser proporcional a desafios reais e cessa quando a situação é resolvida.",
      "A ansiedade clínica manifesta-se de forma persistente, antecipatória e desproporcional aos eventos.",
      "Sintomas físicos como tensão muscular, irritabilidade e fadiga acompanham frequentemente o quadro ansioso.",
      "O GAD-7 é uma ferramenta validada de rastreio que auxilia a diferenciar flutuações cotidianas de quadros clínicos.",
      "Busque orientação profissional quando o sofrimento emocional prejudicar o trabalho, o sono ou os relacionamentos."
    ],
    tableOfContents: [
      { id: "o-que-e-preocupacao", label: "O que é preocupação comum" },
      { id: "quando-vira-ansiedade", label: "Quando a ansiedade se torna clínica" },
      { id: "diferencas-chave", label: "Tabela comparativa principal" },
      { id: "papel-do-rastreio", label: "O papel do rastreio clínico" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-que-e-preocupacao",
        title: "O que é preocupação comum",
        paragraphs: [
          {
            segments: [
              { text: "A preocupação é uma resposta cognitiva normal a desafios, incertezas e planejamentos futuros. Ela nos ajuda a antecipar riscos e encontrar soluções práticas. No entanto, na preocupação cotidiana, os pensamentos tendem a ser solucionáveis e não paralisam o funcionamento diário " },
              { text: "Kessler et al., 2015", refId: "kessler-2015", displayText: "Kessler et al., 2015" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "quando-vira-ansiedade",
        title: "Quando a ansiedade se torna clínica",
        paragraphs: [
          {
            segments: [
              { text: "Quando a preocupação passa a ser incontrolável, persistente por mais de seis meses e desproporcional à realidade, ela caracteriza o quadro clínico do Transtorno de Ansiedade Generalizada (TAG). Os indivíduos experimentam tensão constante, irritabilidade e fadiga mental inexplicada " },
              { text: "APA, 2022", refId: "apa-2022", displayText: "APA, 2022" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "diferencas-chave",
        title: "Tabela comparativa principal",
        paragraphs: [
          {
            segments: [
              { text: "Abaixo destacamos as distinções observadas em ambiente clínico entre preocupação funcional e ansiedade clínica:" }
            ]
          }
        ]
      },
      {
        id: "papel-do-rastreio",
        title: "O papel do rastreio clínico",
        paragraphs: [
          {
            segments: [
              { text: "O uso de instrumentos padronizados como o GAD-7 permite quantificar a gravidade dos sintomas recentes, servindo como ponto de partida para um diálogo produtivo com profissionais de saúde mental." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "A preocupação excessiva e crônica esgota recursos cognitivos e afeta o bem-estar.",
      whatEvidenceSuggests: "Avaliar frequência, intensidade e impacto funcional com escalas validadas.",
      whatWeDontKnowYet: "Autoteste não substitui avaliação psiquiátrica presencial."
    },
    relatedTest: {
      title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
      acronym: "GAD-7",
      description: "Instrumento breve de 7 perguntas para rastreio e mensuração da gravidade de sintomas ansiosos.",
      questionCount: 7,
      durationMinutes: 3,
      testSlug: "gad-7"
    },
    faqs: [
      {
        question: "Como saber se minha preocupação é normal?",
        answer: "A preocupação normal cessa após a resolução do problema; a ansiedade clínica é difusa e persistente."
      },
      {
        question: "O GAD-7 fornece diagnóstico definitivo?",
        answer: "Não. O GAD-7 é uma ferramenta de rastreio educativo e clínico que requer validação por um profissional habilitado."
      }
    ],
    references: [
      {
        id: "kessler-2015",
        shortLabel: "Kessler et al., 2015",
        fullCitation: "Kessler, R. C., et al. (2015). Prevalence and clinical features of generalized anxiety disorder. American Journal of Psychiatry.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      },
      {
        id: "apa-2022",
        shortLabel: "APA, 2022",
        fullCitation: "American Psychiatric Association. (2022). Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR).",
        sourceUrl: "https://www.psychiatry.org"
      }
    ]
  },
  "ansiedade-a-noite": {
    slug: "ansiedade-a-noite",
    seoTitle: "Ansiedade à noite: por que os sintomas pioram antes de dormir | Mental Saúde",
    seoDescription: "Compreenda os fatores biológicos, cognitivos e ambientais que intensificam a ansiedade no período noturno.",
    category: "Sintomas e Manifestações",
    readingTime: "6 min de leitura",
    title: "Ansiedade à noite: por que os sintomas podem piorar antes de dormir",
    subtitle: "Compreenda os fatores biológicos, cognitivos e ambientais que intensificam a ansiedade no período noturno.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Ansiedade Noturna",
    directAnswer: "A piora da ansiedade à noite ocorre devido à ausência de distrações diurnas, à queda natural de cortisol e à tendência de ruminação mental no silêncio do descanso.",
    keyTakeaways: [
      "A diminuição de estímulos externos no período noturno torna pensamentos e sensações físicas mais perceptíveis.",
      "A ruminação sobre acontecimentos do dia anterior ou preocupações futuras ativa o sistema de alerta.",
      "Higiene do sono rigorosa e técnicas de desaceleração cognitiva ajudam a modular a ativação noturna.",
      "O GAD-7 pode ser utilizado para monitorar a carga global de ansiedade que reverbera nos horários de descanso.",
      "Persistindo insônia severa associada a pânico ou taquicardia noturna, procure avaliação médica."
    ],
    tableOfContents: [
      { id: "por-que-piora", label: "Por que a ansiedade piora à noite" },
      { id: "ruminacao-mental", label: "O papel da ruminação e do silêncio" },
      { id: "estrategias-manejo", label: "Estratégias de desaceleração" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "por-que-piora",
        title: "Por que a ansiedade piora à noite",
        paragraphs: [
          {
            segments: [
              { text: "Durante o dia, compromissos laborais, interações sociais e tarefas práticas ocupam o foco atencional. Ao anoitecer, com a redução de estímulos externos, o cérebro humano tende a voltar-se para o mundo interno, amplificando a percepção de desconfortos físicos, batimentos cardíacos e preocupações pendentes " },
              { text: "Harvey AG, 2018", refId: "harvey-2018", displayText: "Harvey AG, 2018" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "ruminacao-mental",
        title: "O papel da ruminação e do silêncio",
        paragraphs: [
          {
            segments: [
              { text: "A ruminação noturna — o ato de repassar mentalmente falhas, obrigações e cenários catastróficos — impede o desligamento fisiológico necessário para a indução do sono. Isso gera um ciclo vicioso entre privação de sono e exacerbação dos sintomas ansiosos no dia seguinte." }
            ]
          }
        ]
      },
      {
        id: "estrategias-manejo",
        title: "Estratégias de desaceleração",
        paragraphs: [
          {
            segments: [
              { text: "Estabelecer uma rotina de transição sem telas luminosas 1 hora antes de deitar, anotar pendências em um diário de bordo e praticar respiração diafragmática são condutas recomendadas para modular o sistema nervoso simpático antes do repouso." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O silêncio noturno e a fadiga acumulada amplificam respostas de alerta cognitivo.",
      whatEvidenceSuggests: "Práticas estruturadas de desligamento e horários fixos de sono.",
      whatWeDontKnowYet: "Variações genéticas exatas na resposta circadiana à ansiedade."
    },
    relatedTest: {
      title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
      acronym: "GAD-7",
      description: "Instrumento breve de 7 perguntas para rastreio e mensuração da gravidade de sintomas ansiosos.",
      questionCount: 7,
      durationMinutes: 3,
      testSlug: "gad-7"
    },
    faqs: [
      {
        question: "É normal sentir falta de ar ou palpitações ao deitar por causa da ansiedade?",
        answer: "Sim, mas sintomas novos ou intensos exigem investigação médica para excluir causas orgânicas."
      },
      {
        question: "O que fazer se acordar no meio da noite com pensamentos acelerados?",
        answer: "Evite telas luminosas, levante-se se necessário para uma atividade calma e pratique respiração lenta."
      }
    ],
    references: [
      {
        id: "harvey-2018",
        shortLabel: "Harvey AG, 2018",
        fullCitation: "Harvey, A. G. (2018). Sleep and circadian regulation in severe mental illness. Journal of Clinical Sleep Medicine.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      }
    ]
  },
  "qual-profissional-procurar-ansiedade": {
    slug: "qual-profissional-procurar-ansiedade",
    seoTitle: "Qual profissional procurar para ansiedade: psicólogo ou psiquiatra? | Mental Saúde",
    seoDescription: "Entenda as atribuições, abordagens e quando buscar cada especialista no cuidado da saúde mental e ansiedade.",
    category: "Orientação e Ajuda Profissional",
    readingTime: "7 min de leitura",
    title: "Qual profissional procurar para ansiedade: psicólogo ou psiquiatra?",
    subtitle: "Entenda as atribuições, abordagens e quando buscar cada especialista no cuidado da saúde mental.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Psicólogo vs Psiquiatra",
    directAnswer: "Psicólogos são especializados em psicoterapias baseadas em evidências para reestruturação emocional e comportamental, enquanto médicos psiquiatras realizam diagnóstico médico diferencial e prescrição farmacológica quando necessário.",
    keyTakeaways: [
      "O psicólogo conduz processos psicoterápicos para desenvolver estratégias de enfrentamento e regulação emocional.",
      "O psiquiatra avalia a necessidade de intervenção medicamentosa e investiga comorbidades clínicas.",
      "Em quadros moderados a severos, a abordagem integrada (psicoterapia + psiquiatria) apresenta os melhores desfechos clínicos.",
      "O GAD-7 pode ser apresentado na primeira consulta para ilustrar objetivamente a intensidade dos sintomas.",
      "Dar o primeiro passo com qualquer um desses profissionais já representa um avanço fundamental no cuidado."
    ],
    tableOfContents: [
      { id: "o-papel-do-psicologo", label: "O papel do psicólogo clínico" },
      { id: "o-papel-do-psiquiatra", label: "O papel do médico psiquiatra" },
      { id: "quando-combinar", label: "Quando combinar ambas as abordagens" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-papel-do-psicologo",
        title: "O papel do psicólogo clínico",
        paragraphs: [
          {
            segments: [
              { text: "O psicólogo é o profissional graduado em Psicologia com formação clínica em psicoterapias validadas, como a Terapia Cognitivo-Comportamental (TCC). Seu foco é ajudar o paciente a identificar padrões de pensamento disfuncionais, desenvolver repertório comportamental e lidar com gatilhos emocionais " },
              { text: "NICE, 2022", refId: "nice-2022", displayText: "NICE, 2022" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "o-papel-do-psiquiatra",
        title: "O papel do médico psiquiatra",
        paragraphs: [
          {
            segments: [
              { text: "O psiquiatra é um médico especializado em saúde mental. Ele realiza exames clínicos para descartar condições orgânicas (como disfunções tireoidianas que mimetizam ansiedade), define diagnósticos formais e prescreve fármacos reguladores de neurotransmissores quando indicado clinicamente." }
            ]
          }
        ]
      },
      {
        id: "quando-combinar",
        title: "Quando combinar ambas as abordagens",
        paragraphs: [
          {
            segments: [
              { text: "Diretrizes internacionais reforçam que, para transtornos de ansiedade moderados a graves, a associação sinérgica entre psicoterapia regular e tratamento farmacológico monitorado acelera a remissão dos sintomas e previne recaídas." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O tratamento combinado reduz recidivas e melhora a qualidade de vida em transtornos ansiosos.",
      whatEvidenceSuggests: "Encaminhamento integrado baseado em diretrizes clínicas validadas.",
      whatWeDontKnowYet: "Respostas individuais a fármacos específicos sem teste clínico prévio."
    },
    relatedTest: {
      title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
      acronym: "GAD-7",
      description: "Instrumento breve de 7 perguntas para rastreio e mensuração da gravidade de sintomas ansiosos.",
      questionCount: 7,
      durationMinutes: 3,
      testSlug: "gad-7"
    },
    faqs: [
      {
        question: "Preciso de encaminhamento médico para ir ao psicólogo?",
        answer: "Não. Você pode procurar um psicólogo clínico diretamente."
      },
      {
        question: "Todo tratamento de ansiedade exige remédio?",
        answer: "Não. Casos leves a moderados respondem muito bem apenas à psicoterapia baseada em evidências."
      }
    ],
    references: [
      {
        id: "nice-2022",
        shortLabel: "NICE, 2022",
        fullCitation: "National Institute for Health and Care Excellence. (2022). Generalized anxiety disorder and panic disorder in adults: management. NICE Guideline.",
        sourceUrl: "https://www.nice.org.uk"
      }
    ]
  },
  "tratamento-ansiedade": {
    slug: "tratamento-ansiedade",
    seoTitle: "Ansiedade tem tratamento? Conheça as principais abordagens | Mental Saúde",
    seoDescription: "Conheça os tratamentos baseados em evidências científicas para os transtornos de ansiedade, incluindo TCC e suporte médico.",
    category: "Tratamento e Abordagens",
    readingTime: "8 min de leitura",
    title: "Ansiedade tem tratamento? Conheça as principais abordagens",
    subtitle: "Conheça os tratamentos baseados em evidências científicas para os transtornos de ansiedade.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Tratamento da Ansiedade",
    directAnswer: "Sim, os transtornos de ansiedade são altamente tratáveis por meio de psicoterapias estruturadas, acompanhamento médico especializado e mudanças sustentáveis no estilo de vida.",
    keyTakeaways: [
      "A Terapia Cognitivo-Comportamental (TCC) é considerada padrão-ouro entre as psicoterapias para ansiedade.",
      "A farmacoterapia com inibidores seletivos de recaptação de serotonina (ISRS) auxilia na regulação neuroquímica.",
      "A adesão ao tratamento e a paciência com o tempo de resposta são determinantes para o sucesso clínico.",
      "O GAD-7 é amplamente empregado no acompanhamento longitudinal para mensurar a eficácia das intervenções.",
      "O autocuidado, exercício físico regular e higiene do sono complementam de forma poderosa o tratamento profissional."
    ],
    tableOfContents: [
      { id: "ansiedade-tem-cura", label: "A ansiedade tem tratamento eficaz" },
      { id: "psicoterapia-tcc", label: "Psicoterapia e TCC" },
      { id: "farmacoterapia", label: "Abordagem farmacológica" },
      { id: "estilo-de-vida", label: "Hábitos e estilo de vida" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "ansiedade-tem-cura",
        title: "A ansiedade tem tratamento eficaz",
        paragraphs: [
          {
            segments: [
              { text: "Estudos de grande escala demonstram que os transtornos de ansiedade respondem muito bem a intervenções terapêuticas cientificamente validadas, permitindo que os pacientes recuperem o bem-estar e a funcionalidade plena " },
              { text: "Cipriani et al., 2018", refId: "cipriani-2018", displayText: "Cipriani et al., 2018" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "psicoterapia-tcc",
        title: "Psicoterapia e TCC",
        paragraphs: [
          {
            segments: [
              { text: "A Terapia Cognitivo-Comportamental capacita o paciente a identificar distorções cognitivas, testar crenças ansiogênicas na realidade e praticar exposição gradual a situações evitadas, promovendo neuroplasticidade e resiliência emocional." }
            ]
          }
        ]
      },
      {
        id: "farmacoterapia",
        title: "Abordagem farmacológica",
        paragraphs: [
          {
            segments: [
              { text: "Quando necessário, fármacos modernos como os ISRS oferecem perfil seguro e excelente tolerabilidade, auxiliando a reequilibrar sistemas serotoninérgicos sem causar dependência química." }
            ]
          }
        ]
      },
      {
        id: "estilo-de-vida",
        title: "Hábitos e estilo de vida",
        paragraphs: [
          {
            segments: [
              { text: "Atividade física aeróbica regular, redução do consumo excessivo de cafeína e manutenção de horários regulares de sono atuam como coadjuvantes indispensáveis na estabilização do humor." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "A combinação de TCC e farmacoterapia baseada em evidências apresenta taxas elevadas de remissão.",
      whatEvidenceSuggests: "Plano terapêutico individualizado conduzido por equipe multidisciplinar.",
      whatWeDontKnowYet: "Duração exata ideal do tratamento medicamentoso para cada perfil genético particular."
    },
    relatedTest: {
      title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
      acronym: "GAD-7",
      description: "Instrumento breve de 7 perguntas para rastreio e mensuração da gravidade de sintomas ansiosos.",
      questionCount: 7,
      durationMinutes: 3,
      testSlug: "gad-7"
    },
    faqs: [
      {
        question: "Quanto tempo dura o tratamento para ansiedade?",
        answer: "O tempo varia conforme a gravidade e a adesão ao plano terapêutico, frequentemente situando-se entre 6 a 12 meses."
      },
      {
        question: "Os remédios para ansiedade causam dependência?",
        answer: "Os antidepressivos modernos (como os ISRS) não causam dependência química."
      }
    ],
    references: [
      {
        id: "cipriani-2018",
        shortLabel: "Cipriani et al., 2018",
        fullCitation: "Cipriani, A., et al. (2018). Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder: a systematic review and network meta-analysis. World Psychiatry.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      }
    ]
  }
};
