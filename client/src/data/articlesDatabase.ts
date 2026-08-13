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
  }
};
