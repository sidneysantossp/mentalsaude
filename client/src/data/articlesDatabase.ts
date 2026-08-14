export type ParagraphSegment = {
  text: string;
  refId?: string;
  displayText?: string;
  href?: string;
};

export type ArticleParagraph = {
  segments: ParagraphSegment[];
};

export type ArticleTable = {
  headers: string[];
  rows: string[][];
};

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: ArticleParagraph[];
  table?: ArticleTable;
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

export type OriginalValueModel = {
  type: string;
  description: string;
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
  originalValue?: OriginalValueModel[];
  relatedTest?: RelatedTestModel | null; // Nullable para testar o fallback real quando omitido
  relatedTestSlug?: string; // Referência canônica sem duplicar metadados do instrumento
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
  "sintomas-de-depressao": {
    slug: "sintomas-de-depressao",
    seoTitle: "Sintomas de depressão: sinais emocionais, cognitivos e físicos | Mental Saúde",
    seoDescription: "Conheça como sintomas de depressão podem aparecer nas emoções, pensamentos, comportamento, energia, sono e apetite — sem transformar sinais em diagnóstico automático.",
    category: "Sintomas e Manifestações",
    readingTime: "8 min de leitura",
    title: "Sintomas de depressão: sinais emocionais, cognitivos e físicos",
    subtitle: "Os sinais podem aparecer em diferentes áreas da vida. Entenda padrões de manifestação, impacto funcional e os limites do auto-rastreio.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-depressao_6cf6cd6f.png",
    primaryEntity: "Sintomas de Depressão",
    directAnswer: "Sintomas de depressão podem envolver humor, interesse, pensamentos, energia, sono, apetite, concentração e funcionamento diário. A presença de um ou mais sinais não confirma depressão: frequência, duração, contexto e impacto precisam ser avaliados por um profissional.",
    keyTakeaways: [
      "Os sinais podem ser emocionais, cognitivos, comportamentais e físicos, e não aparecem da mesma forma em todas as pessoas.",
      "Perda de interesse ou prazer, alterações persistentes de energia, sono ou apetite e dificuldade de concentração merecem atenção quando afetam a rotina.",
      "Um sintoma isolado pode ter várias explicações, incluindo estresse, luto, condições médicas, uso de substâncias ou outros quadros de saúde mental.",
      "O PHQ-9 organiza a percepção de sintomas nas últimas duas semanas, mas é um instrumento de rastreio e não fecha diagnóstico.",
      "Buscar avaliação é especialmente importante quando o sofrimento persiste, aumenta ou interfere no autocuidado, trabalho, estudos e relações."
    ],
    tableOfContents: [
      { id: "como-os-sintomas-podem-aparecer", label: "Como os sintomas podem aparecer" },
      { id: "sintomas-emocionais", label: "Sintomas emocionais" },
      { id: "sintomas-cognitivos", label: "Sintomas cognitivos" },
      { id: "perda-de-interesse", label: "Perda de interesse ou prazer" },
      { id: "alteracoes-de-energia", label: "Alterações de energia" },
      { id: "sono", label: "Sono" },
      { id: "apetite", label: "Apetite" },
      { id: "concentracao", label: "Concentração" },
      { id: "impacto-na-rotina", label: "Impacto na rotina" },
      { id: "sintomas-variam", label: "Sintomas podem variar entre pessoas?" },
      { id: "sintomas-nao-percebidos", label: "É possível ter sintomas sem perceber claramente?" },
      { id: "quando-merecem-avaliacao", label: "Quando merecem avaliação" },
      { id: "papel-phq9", label: "Papel do PHQ-9 e limites" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "como-os-sintomas-podem-aparecer",
        title: "Como os sintomas de depressão podem aparecer",
        paragraphs: [
          {
            segments: [
              { text: "Os sinais associados à depressão podem aparecer em mais de uma dimensão da experiência: emoções, pensamentos, comportamento e funcionamento do corpo. O padrão relevante não é uma contagem automática, mas a combinação de frequência, duração, intensidade, contexto e impacto na vida cotidiana. A Organização Mundial da Saúde descreve a depressão como uma condição que pode afetar humor, interesse, energia, sono, apetite e concentração ", },
              { text: "WHO, 2023", refId: "who-depression-2023", displayText: "WHO, 2023" },
              { text: "." }
            ]
          },
          {
            segments: [
              { text: "Este artigo aprofunda manifestações sintomáticas. Para uma visão ampla sobre a condição, causas, avaliação e cuidado, consulte o ", },
              { text: "guia geral sobre depressão", displayText: "guia geral sobre depressão", href: "/conteudos/depressao-sintomas-causas-tratamento" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "sintomas-emocionais",
        title: "Sintomas emocionais",
        paragraphs: [
          {
            segments: [
              { text: "Entre as manifestações emocionais podem estar tristeza persistente, sensação de vazio, desesperança, irritabilidade ou redução da capacidade de sentir prazer. A experiência pode ser descrita de maneiras diferentes conforme a pessoa, sua idade, cultura, história e contexto; por isso, uma descrição acolhedora e detalhada é mais útil do que uma conclusão baseada em uma palavra-chave." }
            ]
          },
          {
            segments: [
              { text: "A perda de interesse ou prazer, chamada anedonia, pode aparecer como menor vontade de realizar atividades antes significativas. Ela não deve ser interpretada isoladamente: é importante observar quando começou, quanto dura e se mudou a participação na rotina." }
            ]
          }
        ]
      },
      {
        id: "sintomas-cognitivos",
        title: "Sintomas cognitivos",
        paragraphs: [
          {
            segments: [
              { text: "Algumas pessoas percebem dificuldade de concentração, lentificação para tomar decisões, esquecimento de tarefas ou pensamentos autocríticos intensos. Esses sinais também podem ocorrer em privação de sono, estresse, ansiedade, condições médicas ou uso de substâncias, o que reforça a necessidade de avaliação contextual." }
            ]
          }
        ]
      },
      {
        id: "perda-de-interesse",
        title: "Perda de interesse ou prazer",
        paragraphs: [
          {
            segments: [
              { text: "A perda de interesse ou prazer, chamada anedonia, pode aparecer como menor vontade de realizar atividades antes significativas. Ela não deve ser interpretada isoladamente: é importante observar quando começou, quanto dura e se mudou a participação na rotina." }
            ]
          }
        ]
      },
      {
        id: "alteracoes-de-energia",
        title: "Alterações de energia",
        paragraphs: [
          {
            segments: [
              { text: "Fadiga ou sensação de pouca energia podem tornar tarefas simples mais difíceis, reduzir o ritmo e aumentar o esforço necessário para começar ou concluir atividades. Esse sinal também pode ter outras causas, como sono inadequado, condições clínicas ou uso de substâncias." }
            ]
          }
        ]
      },
      {
        id: "sono",
        title: "Sono",
        paragraphs: [
          {
            segments: [
              { text: "Alterações no sono podem incluir dificuldade para dormir, despertares frequentes, sono não reparador ou aumento do tempo dormido. Observar horários, qualidade e mudança em relação ao padrão habitual pode ajudar na conversa profissional." }
            ]
          }
        ]
      },
      {
        id: "apetite",
        title: "Apetite",
        paragraphs: [
          {
            segments: [
              { text: "Mudanças de apetite e peso podem ocorrer, mas sua presença e direção variam. O contexto alimentar, condições médicas e medicamentos também precisam ser considerados; por isso, uma alteração não deve ser interpretada como prova isolada de depressão." }
            ]
          }
        ]
      },
      {
        id: "concentracao",
        title: "Concentração",
        paragraphs: [
          {
            segments: [
              { text: "A concentração pode ser prejudicada pela própria alteração de humor, pelo sono inadequado, pela ansiedade, pelo estresse ou por outras condições. Exemplos concretos de tarefas afetadas são mais úteis do que tentar atribuir uma causa sem avaliação." }
            ]
          }
        ]
      },
      {
        id: "impacto-na-rotina",
        title: "Impacto na rotina",
        paragraphs: [
          {
            segments: [
              { text: "A combinação de perda de interesse, pouca energia ou alterações cognitivas pode afetar trabalho, estudos, autocuidado, responsabilidades domésticas e convivência, sem significar falta de esforço ou de caráter. O impacto funcional é uma parte importante da avaliação, mas não determina sozinho uma causa." }
            ]
          },
          {
            segments: [
              { text: "A tabela abaixo é um mapa de observação para organizar conversa e não um instrumento diagnóstico." }
            ]
          }
        ],
        table: {
          headers: ["Área", "Exemplos de sinais", "Impacto possível"],
          rows: [
            ["Emocional", "Tristeza, vazio, irritabilidade ou menor prazer", "Menor envolvimento com pessoas e atividades"],
            ["Cognitiva", "Dificuldade de concentração, indecisão ou autocrítica", "Mais esforço para estudar, trabalhar e decidir"],
            ["Física e rotina", "Fadiga, sono ou apetite alterados", "Mudança no autocuidado, ritmo e responsabilidades"]
          ]
        }
      },
      {
        id: "sintomas-variam",
        title: "Sintomas podem variar entre pessoas?",
        paragraphs: [
          {
            segments: [
              { text: "Sim. Algumas pessoas relatam principalmente tristeza; outras percebem irritabilidade, perda de interesse, cansaço, queixas físicas ou afastamento social. A idade, a cultura, condições de saúde coexistentes e o momento de vida podem influenciar a forma como o sofrimento é percebido e comunicado." }
            ]
          }
        ]
      },
      {
        id: "sintomas-nao-percebidos",
        title: "É possível ter sintomas sem perceber claramente?",
        paragraphs: [
          {
            segments: [
              { text: "Sim. Mudanças graduais podem parecer parte da rotina até que alguém note afastamento, queda de rendimento ou dificuldade de autocuidado. Relatos de pessoas próximas podem ser úteis quando oferecidos com cuidado, sem rotular ou pressionar." }
            ]
          }
        ]
      },
      {
        id: "quando-merecem-avaliacao",
        title: "Quando os sinais merecem avaliação",
        paragraphs: [
          {
            segments: [
              { text: "Considere buscar avaliação quando os sinais persistirem, se repetirem, estiverem se intensificando ou produzirem prejuízo no trabalho, nos estudos, no autocuidado, no sono ou nos relacionamentos. Um profissional pode investigar o conjunto de sintomas, o histórico, medicamentos, condições clínicas e outras explicações possíveis." }
            ]
          },
          {
            segments: [
              { text: "Se surgirem pensamentos de morte, autoagressão ou risco imediato, use o protocolo de apoio urgente já indicado pela plataforma e procure ajuda imediata. Este artigo não substitui atendimento em situação de crise." }
            ]
          }
        ]
      },
      {
        id: "papel-phq9",
        title: "Papel do PHQ-9 e limitações do auto-rastreio",
        paragraphs: [
          {
            segments: [
              { text: "O PHQ-9 é um questionário de nove itens que pergunta sobre a frequência de sintomas depressivos nas últimas duas semanas. Ele pode ajudar a organizar percepções e apoiar uma conversa profissional, mas não identifica sozinho a causa dos sintomas, não substitui entrevista clínica e não deve ser usado como diagnóstico automático. Conheça o ", },
              { text: "guia do teste de depressão online", displayText: "guia do teste de depressão online", href: "/conteudos/teste-de-depressao-online" },
              { text: " antes de iniciar qualquer autoavaliação." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Depressão pode envolver mudanças persistentes em humor, interesse, energia, sono, apetite e concentração, com apresentação variável entre pessoas.",
      whatEvidenceSuggests: "Mapear frequência, duração e impacto funcional ajuda a produzir um relato mais útil para avaliação profissional; instrumentos como o PHQ-9 podem complementar essa organização.",
      whatWeDontKnowYet: "Nenhum conjunto de sinais isolado permite determinar a causa do sofrimento sem avaliação clínica e consideração de diagnósticos diferenciais."
    },
    originalValue: [
      { type: "SYMPTOM_MAP", description: "Mapa de manifestações emocionais, cognitivas, comportamentais e físicas para organizar observações sem diagnosticar." },
      { type: "ORIGINAL_TABLE", description: "Tabela por área, exemplo de sinal e impacto possível, explicitamente não diagnóstica." }
    ],
    relatedTestSlug: "phq-9",
    faqs: [
      {
        question: "Ter alguns desses sintomas significa que tenho depressão?",
        answer: "Não. Sintomas podem ter várias causas e não devem ser convertidos em diagnóstico por contagem. A persistência, o contexto e o impacto funcional precisam ser avaliados por um profissional."
      },
      {
        question: "É possível ter depressão sem sentir tristeza o tempo todo?",
        answer: "A apresentação varia. Algumas pessoas percebem mais perda de interesse, irritabilidade, fadiga, alterações de sono ou concentração. Uma avaliação considera o conjunto e a evolução dos sinais."
      },
      {
        question: "O PHQ-9 confirma depressão?",
        answer: "Não. Ele é um instrumento de rastreio e acompanhamento de sintomas, não um diagnóstico independente."
      }
    ],
    references: [
      {
        id: "who-depression-2023",
        shortLabel: "WHO, 2023",
        fullCitation: "World Health Organization. (2023). Depressive disorder (depression): fact sheet.",
        sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/depression"
      },
      {
        id: "nimh-depression",
        shortLabel: "NIMH, 2025",
        fullCitation: "National Institute of Mental Health. Depression: overview of symptoms, causes and treatment.",
        sourceUrl: "https://www.nimh.nih.gov/health/topics/depression"
      },
      {
        id: "kroenke-2001-symptoms",
        shortLabel: "Kroenke et al., 2001",
        fullCitation: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/11556941/"
      }
    ]
  },
  "qual-profissional-procurar-depressao": {
    slug: "qual-profissional-procurar-depressao",
    seoTitle: "Qual profissional procurar para depressão: psicólogo ou psiquiatra? | Mental Saúde",
    seoDescription: "Entenda o papel de psicólogo, psiquiatra, atenção primária e outros profissionais no cuidado relacionado à depressão, sem regras universais.",
    category: "Orientação e Ajuda Profissional",
    readingTime: "8 min de leitura",
    title: "Qual profissional procurar para depressão: psicólogo ou psiquiatra?",
    subtitle: "Conheça caminhos possíveis para buscar cuidado e o que costuma acontecer em uma primeira avaliação, respeitando contexto, acesso e necessidade.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-depressao_6cf6cd6f.png",
    primaryEntity: "Busca de Ajuda Profissional para Depressão",
    directAnswer: "Psicólogos, psiquiatras, profissionais da atenção primária e outras equipes de saúde podem participar do cuidado relacionado à depressão. Não existe uma ordem universal: o caminho adequado depende dos sinais, do impacto funcional, do histórico, da necessidade de avaliação e do acesso disponível.",
    keyTakeaways: [
      "O psicólogo pode realizar avaliação psicológica e oferecer psicoterapia conforme sua formação e abordagem.",
      "O psiquiatra é médico, avalia aspectos clínicos e pode prescrever e acompanhar medicamentos quando indicados.",
      "A atenção primária pode ser uma porta de entrada para avaliação, orientação, encaminhamento e acompanhamento compartilhado.",
      "Em algumas situações, psicoterapia e acompanhamento médico fazem parte do mesmo plano de cuidado, sem que isso signifique uma regra para todas as pessoas.",
      "O PHQ-9 pode organizar informações para a consulta, mas não escolhe o profissional nem define tratamento individual."
    ],
    tableOfContents: [
      { id: "quem-pode-avaliar", label: "Quem pode avaliar sinais" },
      { id: "papel-psicologo", label: "Papel do psicólogo" },
      { id: "papel-psiquiatra", label: "Papel do psiquiatra" },
      { id: "quando-combinar", label: "Quando os cuidados podem se combinar" },
      { id: "atencao-primaria", label: "Atenção primária e outros caminhos" },
      { id: "encaminhamento", label: "Preciso de encaminhamento?" },
      { id: "primeira-avaliacao", label: "Como costuma ser a avaliação" },
      { id: "preparar-consulta", label: "Como se preparar" },
      { id: "quando-mais-rapido", label: "Quando buscar ajuda mais rapidamente" },
      { id: "papel-phq9-profissional", label: "O papel do PHQ-9" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "quem-pode-avaliar",
        title: "Quem pode avaliar sinais de depressão",
        paragraphs: [
          {
            segments: [
              { text: "A busca por ajuda pode começar por diferentes portas. Psicólogos e psiquiatras têm formações e atribuições distintas, enquanto equipes de atenção primária podem avaliar a situação geral, investigar condições clínicas, orientar e encaminhar quando necessário. O ponto de partida deve considerar a necessidade da pessoa, a urgência, o histórico e o acesso local, não uma regra fixa." }
            ]
          },
          {
            segments: [
              { text: "Para compreender os sinais que podem motivar essa busca, consulte também ", },
              { text: "sintomas de depressão", displayText: "sintomas de depressão", href: "/conteudos/sintomas-de-depressao" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "papel-psicologo",
        title: "O papel do psicólogo",
        paragraphs: [
          {
            segments: [
              { text: "O psicólogo pode conduzir avaliação psicológica e psicoterapia dentro de sua formação profissional. O trabalho pode envolver compreensão de pensamentos, emoções, comportamentos, relações e contexto, além do desenvolvimento de estratégias terapêuticas baseadas em evidências. A abordagem e o plano são definidos na relação profissional, após avaliação." }
            ]
          }
        ]
      },
      {
        id: "papel-psiquiatra",
        title: "O papel do psiquiatra",
        paragraphs: [
          {
            segments: [
              { text: "O psiquiatra é médico e pode avaliar sintomas de saúde mental junto a histórico clínico, uso de substâncias, medicamentos e possíveis condições que influenciem o quadro. Quando indicado, pode prescrever e acompanhar medicamentos, explicando benefícios, efeitos adversos, acompanhamento e necessidade de revisão. Este artigo não recomenda medicamento específico nem substitui consulta." }
            ]
          }
        ]
      },
      {
        id: "quando-combinar",
        title: "Quando os dois profissionais podem participar do cuidado",
        paragraphs: [
          {
            segments: [
              { text: "Em algumas situações, psicoterapia e acompanhamento médico podem ser combinados. A decisão depende da avaliação individual, das preferências, dos riscos, do histórico, da resposta ao cuidado e da disponibilidade de serviços. Participação conjunta não é obrigatória para todas as pessoas e não deve ser apresentada como uma prescrição universal." }
            ]
          }
        ]
      },
      {
        id: "atencao-primaria",
        title: "Atenção primária e outros caminhos possíveis",
        paragraphs: [
          {
            segments: [
              { text: "Unidades básicas, médicos de família e outras equipes de saúde podem ser uma porta de entrada, sobretudo quando há sintomas físicos, uso de medicamentos, condições clínicas ou dificuldade para acessar especialistas. Serviços comunitários e equipes multiprofissionais também podem participar conforme a rede local." }
            ]
          }
        ],
        table: {
          headers: ["Necessidade", "Profissional que pode participar", "O que esperar"],
          rows: [
            ["Organizar sinais e impacto na rotina", "Atenção primária, psicólogo ou psiquiatra", "Escuta, avaliação inicial e orientação de próximos passos"],
            ["Explorar psicoterapia", "Psicólogo", "Avaliação psicológica e construção de um plano terapêutico"],
            ["Investigar aspectos médicos ou medicamentos", "Psiquiatra ou atenção primária", "Avaliação clínica, discussão de opções e acompanhamento quando indicado"],
            ["Cuidado compartilhado", "Equipe multiprofissional", "Coordenação entre profissionais conforme a necessidade"]
          ]
        }
      },
      {
        id: "encaminhamento",
        title: "Preciso de encaminhamento?",
        paragraphs: [
          {
            segments: [
              { text: "A necessidade de encaminhamento varia conforme o sistema de saúde, o convênio, o serviço escolhido e a região. Antes de marcar, confirme diretamente com o local de atendimento quais documentos e formas de acesso são necessários. Se o primeiro caminho não funcionar, a atenção primária ou um serviço de orientação pode ajudar a encontrar outra porta de entrada." }
            ]
          }
        ]
      },
      {
        id: "primeira-avaliacao",
        title: "Como costuma acontecer uma avaliação",
        paragraphs: [
          {
            segments: [
              { text: "Uma primeira conversa costuma abordar o que mudou, quando começou, frequência dos sinais, sono, apetite, energia, concentração, uso de substâncias, histórico de saúde, tratamentos anteriores e impacto funcional. O profissional também pode perguntar sobre segurança e risco. Responder com honestidade ajuda, e não é necessário chegar com um diagnóstico pronto." }
            ]
          }
        ]
      },
      {
        id: "preparar-consulta",
        title: "O que levar e como falar sobre os sintomas",
        paragraphs: [
          {
            segments: [
              { text: "Anote exemplos concretos, datas aproximadas, mudanças de sono e apetite, medicamentos em uso, diagnósticos prévios e perguntas. Se você utilizou o PHQ-9, pode levar o resultado como informação adicional; ele não substitui avaliação e não determina sozinho a conduta." }
            ]
          }
        ]
      },
      {
        id: "quando-mais-rapido",
        title: "Quando procurar ajuda mais rapidamente",
        paragraphs: [
          {
            segments: [
              { text: "Procure atendimento com mais urgência quando houver piora rápida, incapacidade de manter necessidades básicas, sofrimento intenso, sintomas físicos preocupantes, pensamentos de morte ou autoagressão e risco imediato. Em uma emergência, acione o serviço local de emergência e não permaneça sozinho." }
            ]
          }
        ]
      },
      {
        id: "papel-phq9-profissional",
        title: "O papel de instrumentos como PHQ-9",
        paragraphs: [
          {
            segments: [
              { text: "O PHQ-9 pode organizar a frequência de sintomas recentes e oferecer um ponto de partida para a conversa, mas não escolhe entre psicólogo, psiquiatra ou atenção primária. O resultado não substitui avaliação clínica e deve ser interpretado junto com contexto, impacto funcional, histórico e segurança." }
            ]
          },
          {
            segments: [
              { text: "Conheça a página do ", },
              { text: "PHQ-9", displayText: "PHQ-9", href: "/testes/phq-9" },
              { text: " antes de iniciar o fluxo de autoavaliação." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Diferentes profissionais podem participar da avaliação e do cuidado, com atribuições próprias e possibilidade de coordenação conforme a necessidade.",
      whatEvidenceSuggests: "Planos de cuidado compartilhados e baseados em avaliação tendem a ser mais adequados do que uma regra única de encaminhamento para todas as pessoas.",
      whatWeDontKnowYet: "A melhor porta de entrada depende do contexto individual, da rede disponível, da urgência e das preferências; nenhum conteúdo online consegue decidir isso sozinho."
    },
    originalValue: [
      { type: "DECISION_FRAMEWORK", description: "Framework de decisão para organizar contexto, intensidade, impacto, histórico, necessidade e acesso sem selecionar tratamento." }
    ],
    relatedTestSlug: "phq-9",
    faqs: [
      {
        question: "Devo procurar primeiro um psicólogo ou um psiquiatra?",
        answer: "Não há uma ordem universal. Considere os sinais, o impacto, o histórico, a urgência, as condições de acesso e a porta de entrada disponível. Qualquer um dos caminhos pode orientar o próximo passo."
      },
      {
        question: "O psicólogo pode diagnosticar depressão?",
        answer: "A atuação e as atribuições dependem da formação, da legislação e do contexto de atendimento. O mais seguro é conversar diretamente sobre o tipo de avaliação oferecida e, quando necessário, coordenar o cuidado com um médico."
      },
      {
        question: "Posso levar o resultado do PHQ-9 para a consulta?",
        answer: "Sim. Ele pode ajudar a organizar percepções recentes, desde que seja apresentado como rastreio e não como diagnóstico."
      }
    ],
    references: [
      {
        id: "nice-ng222-help",
        shortLabel: "NICE, NG222",
        fullCitation: "National Institute for Health and Care Excellence. (2022). Depression in adults: treatment and management (NG222).",
        sourceUrl: "https://www.nice.org.uk/guidance/ng222"
      },
      {
        id: "who-mhgap",
        shortLabel: "WHO mhGAP",
        fullCitation: "World Health Organization. Mental Health Gap Action Programme (mhGAP): depression care guidance.",
        sourceUrl: "https://www.who.int/teams/mental-health-and-substance-use/treatment-care/mental-health-gap-action-programme"
      },
      {
        id: "kroenke-2001-help",
        shortLabel: "Kroenke et al., 2001",
        fullCitation: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/11556941/"
      }
    ]
  },
  "tratamento-depressao": {
    slug: "tratamento-depressao",
    seoTitle: "Depressão tem tratamento? Conheça as principais abordagens | Mental Saúde",
    seoDescription: "Entenda, de forma geral e segura, como psicoterapia, acompanhamento médico, medicamentos quando indicados e suporte podem participar do cuidado da depressão.",
    category: "Tratamento e Cuidado",
    readingTime: "9 min de leitura",
    title: "Depressão tem tratamento? Conheça as principais abordagens",
    subtitle: "Uma visão geral das possibilidades de cuidado, sem prescrição individual, comparação de medicamentos ou promessa de resultado garantido.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    reviewedAt: "14 de agosto de 2026",
    image: "/manus-storage/editorial-depressao_6cf6cd6f.png",
    primaryEntity: "Tratamento da Depressão",
    directAnswer: "A depressão pode ser tratada, mas o cuidado varia conforme sintomas, gravidade, histórico, condições de saúde, preferências e acesso. Psicoterapia, acompanhamento médico, medicamentos quando clinicamente indicados, hábitos e suporte podem participar do plano, sempre com avaliação profissional.",
    keyTakeaways: [
      "Tratamento não é uma receita única: ele é definido e revisado com base na avaliação e na evolução de cada pessoa.",
      "Psicoterapia pode ajudar no cuidado psicológico, enquanto profissionais médicos avaliam aspectos clínicos e medicamentos quando indicados.",
      "Hábitos, rotina, sono, atividade física possível e suporte social podem complementar o cuidado, mas não substituem atendimento quando necessário.",
      "A ausência de melhora percebida deve ser conversada com a equipe; não é motivo para ajustar, interromper ou trocar tratamento por conta própria.",
      "O PHQ-9 pode acompanhar a frequência de sintomas ao longo do tempo, mas não define sozinho a resposta nem o próximo tratamento."
    ],
    tableOfContents: [
      { id: "depressao-pode-ser-tratada", label: "Depressão pode ser tratada?" },
      { id: "como-tratamento-e-definido", label: "Como o tratamento é definido" },
      { id: "por-que-tratamento-varia", label: "Por que o tratamento varia entre pessoas" },
      { id: "psicoterapia", label: "Psicoterapia" },
      { id: "acompanhamento-profissional", label: "Acompanhamento profissional" },
      { id: "medicamentos-indicados", label: "Medicamentos quando indicados" },
      { id: "combinacao-abordagens", label: "Combinação de abordagens" },
      { id: "habitos-e-suporte", label: "Hábitos e suporte" },
      { id: "evolucao-e-phq9", label: "Acompanhamento da evolução" },
      { id: "quando-nao-melhora", label: "Quando não há melhora percebida" },
      { id: "quando-buscar-avaliacao", label: "Quando buscar avaliação profissional" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "depressao-pode-ser-tratada",
        title: "Depressão pode ser tratada?",
        paragraphs: [
          {
            segments: [
              { text: "Sim. A depressão é uma condição tratável, mas o caminho e a evolução variam entre pessoas. O objetivo do cuidado pode envolver reduzir sofrimento, recuperar funcionamento, fortalecer segurança e prevenir novas dificuldades, sempre com metas discutidas com profissionais. Tratável não significa promessa de cura imediata nem garante um tempo único de resposta." }
            ]
          },
          {
            segments: [
              { text: "Este artigo apresenta um panorama. Para entender como buscar cuidado, consulte também ", },
              { text: "qual profissional procurar para depressão", displayText: "qual profissional procurar para depressão", href: "/conteudos/qual-profissional-procurar-depressao" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "como-tratamento-e-definido",
        title: "Como o tratamento é definido",
        paragraphs: [
          {
            segments: [
              { text: "A definição considera sintomas atuais, duração, impacto funcional, histórico pessoal e familiar, condições clínicas, outros medicamentos, experiências anteriores, preferências, segurança e recursos disponíveis. A equipe pode revisar hipóteses e ajustar o plano com o tempo; o tratamento é um processo acompanhado, não um pacote fixo." }
            ]
          }
        ]
      },
      {
        id: "por-que-tratamento-varia",
        title: "Por que o tratamento varia entre pessoas",
        paragraphs: [
          {
            segments: [
              { text: "A mesma abordagem pode participar de planos diferentes porque sintomas, duração, impacto funcional, histórico, condições coexistentes, preferências, segurança e acesso não são iguais. A equipe pode revisar objetivos e opções conforme novas informações aparecem." }
            ]
          }
        ]
      },
      {
        id: "psicoterapia",
        title: "Psicoterapia",
        paragraphs: [
          {
            segments: [
              { text: "Psicoterapias baseadas em evidências podem trabalhar padrões de pensamento, emoções, comportamentos, relações, resolução de problemas e ativação gradual de atividades, de acordo com a abordagem e os objetivos acordados. A escolha da modalidade, frequência e duração precisa ser individualizada com um profissional habilitado." }
            ]
          }
        ]
      },
      {
        id: "acompanhamento-profissional",
        title: "Acompanhamento profissional",
        paragraphs: [
          {
            segments: [
              { text: "O acompanhamento médico pode investigar condições clínicas, revisar medicamentos, avaliar riscos e coordenar decisões quando necessário. Psicólogos, psiquiatras, atenção primária e outras equipes podem participar em diferentes momentos. O papel de cada profissional deve ser explicado na consulta." }
            ]
          }
        ]
      },
      {
        id: "medicamentos-indicados",
        title: "Medicamentos quando clinicamente indicados",
        paragraphs: [
          {
            segments: [
              { text: "Medicamentos podem fazer parte do cuidado quando um profissional médico avalia que são apropriados. A escolha, o acompanhamento, os efeitos adversos, as interações, a duração e qualquer mudança dependem da situação individual. Não é seguro iniciar, interromper, alterar dose ou comparar antidepressivos com base neste artigo." }
            ]
          }
        ]
      },
      {
        id: "combinacao-abordagens",
        title: "Combinação de abordagens",
        paragraphs: [
          {
            segments: [
              { text: "Em algumas situações, uma combinação de psicoterapia, acompanhamento médico e suporte psicossocial pode ser considerada. Isso não significa que todas as pessoas precisarão das mesmas intervenções. A equipe e a pessoa avaliam possibilidades, prioridades, riscos e preferências em conjunto." }
            ]
          }
        ],
        table: {
          headers: ["Abordagem", "Objetivo geral", "Como pode participar do cuidado"],
          rows: [
            ["Psicoterapia", "Trabalhar sofrimento, pensamentos, comportamentos e relações", "Processo estruturado com profissional habilitado e metas acordadas"],
            ["Acompanhamento médico", "Avaliar aspectos clínicos, segurança e comorbidades", "Monitoramento, investigação e coordenação do cuidado"],
            ["Medicamentos quando indicados", "Participar da redução de sintomas conforme avaliação médica", "Prescrição, seguimento e revisão profissional; nunca automanejo"],
            ["Suporte e hábitos", "Apoiar rotina, vínculo, sono e funcionamento possível", "Componente complementar, sem substituir tratamento necessário"]
          ]
        }
      },
      {
        id: "habitos-e-suporte",
        title: "Hábitos e suporte como componentes complementares",
        paragraphs: [
          {
            segments: [
              { text: "Rotinas de sono, alimentação possível, movimento compatível com a condição, contato social e apoio de pessoas de confiança podem contribuir para o bem-estar. Quando a depressão reduz energia e iniciativa, metas pequenas e realistas podem ser mais sustentáveis. Esses componentes não devem ser usados para culpabilizar a pessoa nem para substituir avaliação e tratamento." }
            ]
          }
        ]
      },
      {
        id: "evolucao-e-phq9",
        title: "Como a evolução pode ser acompanhada",
        paragraphs: [
          {
            segments: [
              { text: "A evolução pode ser acompanhada por relatos sobre humor, interesse, energia, sono, apetite, concentração, funcionamento, efeitos adversos e segurança. O PHQ-9 pode oferecer uma medida estruturada de sintomas recentes e ajudar a observar tendências, mas a interpretação precisa considerar o contexto e a avaliação clínica." }
            ]
          }
        ]
      },
      {
        id: "quando-nao-melhora",
        title: "O que fazer quando não há melhora percebida",
        paragraphs: [
          {
            segments: [
              { text: "Converse com a equipe se os sintomas não melhorarem, piorarem ou se os efeitos do cuidado forem difíceis de manejar. A resposta pode exigir reavaliação de diagnóstico, adesão, condições coexistentes, expectativas, suporte e plano. Não faça mudanças por conta própria." }
            ]
          }
        ]
      },
      {
        id: "quando-buscar-avaliacao",
        title: "Quando buscar avaliação profissional",
        paragraphs: [
          {
            segments: [
              { text: "Busque avaliação quando o sofrimento persistir, aumentar, comprometer o funcionamento ou dificultar autocuidado, trabalho, estudos e relações. Se houver pensamentos de morte, autoagressão ou risco imediato, procure ajuda urgente conforme o protocolo de apoio da plataforma e os serviços locais." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Diretrizes reconhecem psicoterapia, acompanhamento clínico e, quando indicados, medicamentos como componentes possíveis do cuidado da depressão.",
      whatEvidenceSuggests: "A escolha compartilhada e a revisão periódica permitem adaptar o cuidado à resposta, aos riscos, às preferências e ao contexto da pessoa.",
      whatWeDontKnowYet: "Não existe uma abordagem única, um medicamento universalmente melhor ou um tempo garantido de resposta para todas as pessoas."
    },
    originalValue: [
      { type: "EVIDENCE_SYNTHESIS", description: "Síntese de guidelines e fontes institucionais para separar consenso, evidência e limites." },
      { type: "TREATMENT_OVERVIEW_FRAMEWORK", description: "Panorama das abordagens com boundaries explícitos para futuros artigos de psicoterapia e medicamentos." }
    ],
    relatedTestSlug: "phq-9",
    faqs: [
      {
        question: "Qual é o melhor tratamento para depressão?",
        answer: "Não há uma opção universalmente melhor. O cuidado depende da avaliação, do histórico, das preferências, da segurança e do acompanhamento da resposta."
      },
      {
        question: "Preciso usar antidepressivo?",
        answer: "Somente um profissional médico pode avaliar se medicamento é indicado para uma situação individual. Não é seguro decidir isso por um artigo ou iniciar e interromper por conta própria."
      },
      {
        question: "O PHQ-9 mostra se o tratamento funcionou?",
        answer: "Ele pode ajudar a acompanhar sintomas recentes, mas não deve ser interpretado sozinho. A evolução clínica e o funcionamento precisam ser discutidos com a equipe."
      }
    ],
    references: [
      {
        id: "nice-ng222-treatment",
        shortLabel: "NICE, NG222",
        fullCitation: "National Institute for Health and Care Excellence. (2022). Depression in adults: treatment and management (NG222).",
        sourceUrl: "https://www.nice.org.uk/guidance/ng222"
      },
      {
        id: "who-depression-treatment",
        shortLabel: "WHO, 2023",
        fullCitation: "World Health Organization. (2023). Depressive disorder (depression): fact sheet and treatment overview.",
        sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/depression"
      },
      {
        id: "apa-dsm5tr",
        shortLabel: "APA, DSM-5-TR",
        fullCitation: "American Psychiatric Association. (2022). Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision.",
        sourceUrl: "https://www.psychiatry.org/psychiatrists/practice/dsm"
      },
      {
        id: "kroenke-2001-treatment",
        shortLabel: "Kroenke et al., 2001",
        fullCitation: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/11556941/"
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
  },
  "ansiedade-tontura-enjoo-palpitacao": {
    slug: "ansiedade-tontura-enjoo-palpitacao",
    seoTitle: "Ansiedade pode causar tontura, enjoo e palpitação? | Mental Saúde",
    seoDescription: "Entenda a relação entre ansiedade e manifestações somáticas como palpitações, tonturas e enjoos, e quando buscar avaliação médica.",
    category: "Sintomas e Manifestações",
    readingTime: "6 min de leitura",
    title: "Ansiedade pode causar tontura, enjoo e palpitação?",
    subtitle: "Entenda a relação entre ansiedade e manifestações somáticas e quando buscar avaliação médica.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Sintomas Somáticos",
    directAnswer: "Sim, a ansiedade severa ativa o sistema nervoso simpático, provocando taquicardia, alteração na respiração e sensações de tontura ou enjoo. No entanto, sintomas físicos intensos exigem sempre investigação médica diferencial para excluir causas orgânicas.",
    keyTakeaways: [
      "A hiperativação simpática e a respiração acelerada (hiperventilação) geram tonturas e palpitações.",
      "O eixo cérebro-intestino explica enjoos e desconfortos gástricos em momentos de pico de estresse.",
      "Todo sintoma somático novo ou recorrente deve ser avaliado por um médico para excluir condições clínicas.",
      "O GAD-7 auxilia na mensuração da carga global de ansiedade que pode estar repercutindo no corpo.",
      "Técnicas de respiração diafragmática ajudam a modular a intensidade das reações somáticas agudas."
    ],
    tableOfContents: [
      { id: "como-o-corpo-reage", label: "Como o corpo reage à ansiedade" },
      { id: "tontura-e-palpituacao", label: "Palpitações e tontura: o que acontece" },
      { id: "investigacao-medica", label: "A importância da investigação médica" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "como-o-corpo-reage",
        title: "Como o corpo reage à ansiedade",
        paragraphs: [
          {
            segments: [
              { text: "A resposta de luta ou fuga aciona uma descarga de adrenalina e cortisol, redirecionando o fluxo sanguíneo e alterando a frequência cardíaca e respiratória " },
              { text: "Katon W et al., 2020", refId: "katon-2020", displayText: "Katon W et al., 2020" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Manifestações somáticas são frequentes em transtornos ansiosos.",
      whatEvidenceSuggests: "Investigação clínica rigorosa precede qualquer atribuição exclusiva à ansiedade.",
      whatWeDontKnowYet: "Variações individuais exatas na sensibilidade interoceptiva."
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
        question: "Palpitação por ansiedade é perigosa?",
        answer: "Geralmente benigna se investigada, mas exige avaliação cardiológica."
      }
    ],
    references: [
      {
        id: "katon-2020",
        shortLabel: "Katon et al., 2020",
        fullCitation: "Katon, W., et al. (2020). Somatic symptoms and anxiety disorders. Journal of Psychosomatic Research.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      }
    ]
  },
  "ansiedade-no-trabalho": {
    slug: "ansiedade-no-trabalho",
    seoTitle: "Ansiedade no trabalho: sinais e impacto na rotina | Mental Saúde",
    seoDescription: "Identifique os sinais de que a ansiedade e o estresse profissional estão prejudicando seu desempenho e bem-estar.",
    category: "Ambiente Profissional",
    readingTime: "6 min de leitura",
    title: "Ansiedade no trabalho: sinais de que ela está afetando sua rotina",
    subtitle: "Identifique os sinais de que a ansiedade profissional está prejudicando seu desempenho e bem-estar.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Ansiedade Ocupacional",
    directAnswer: "A ansiedade no trabalho manifesta-se por procrastinação crônica, exaustão mental ao fim do expediente, irritabilidade com colegas e queda de rendimento impulsionada pelo perfeccionismo.",
    keyTakeaways: [
      "Altas exigências e baixo controle no trabalho elevam o risco de esgotamento.",
      "Estabelecer limites claros entre expediente e descanso é essencial para a saúde mental.",
      "O GAD-7 pode ajudar a mapear o nível de tensão acumulada."
    ],
    tableOfContents: [
      { id: "sinais-no-trabalho", label: "Sinais de alerta no ambiente laboral" },
      { id: "estrategias", label: "Estratégias de preservação" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "sinais-no-trabalho",
        title: "Sinais de alerta no ambiente laboral",
        paragraphs: [
          {
            segments: [
              { text: "Ambientes com sobrecarga crônica e falta de autonomia deterioram o bem-estar psicológico " },
              { text: "Hasson D et al., 2019", refId: "hasson-2019", displayText: "Hasson D et al., 2019" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O estresse ocupacional crônico impacta a produtividade e a saúde.",
      whatEvidenceSuggests: "Intervenções organizacionais e apoio psicológico individual.",
      whatWeDontKnowYet: "Eficácia de políticas remotas isoladas sem suporte clínico."
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
        question: "Como lidar com prazos sufocantes?",
        answer: "Dividir tarefas em etapas menores e comunicar limites de forma assertiva."
      }
    ],
    references: [
      {
        id: "hasson-2019",
        shortLabel: "Hasson et al., 2019",
        fullCitation: "Hasson, D., et al. (2019). Occupational stress and mental health. Occupational and Environmental Medicine.",
        sourceUrl: "https://oem.bmj.com"
      }
    ]
  },
  "terapia-para-ansiedade": {
    slug: "terapia-para-ansiedade",
    seoTitle: "Terapia para ansiedade: como funciona e abordagens | Mental Saúde",
    seoDescription: "Conheça como a psicoterapia baseada em evidências atua na reestruturação de quadros de ansiedade.",
    category: "Tratamento e Abordagens",
    readingTime: "7 min de leitura",
    title: "Terapia para ansiedade: como funciona e quais abordagens são utilizadas",
    subtitle: "Conheça como a psicoterapia baseada em evidências atua na reestruturação de quadros ansiosos.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Psicoterapia para Ansiedade",
    directAnswer: "A psicoterapia, especialmente a Terapia Cognitivo-Comportamental (TCC), capacita o paciente a identificar distorções cognitivas, enfrentar gradualmente medos e desenvolver estratégias duradouras de regulação emocional.",
    keyTakeaways: [
      "A TCC possui eficácia robusta e duradoura respaldada por meta-análises internacionais.",
      "O processo terapêutico é colaborativo e centrado em metas práticas.",
      "O GAD-7 pode ser monitorado em conjunto com o terapeuta para avaliar progressos."
    ],
    tableOfContents: [
      { id: "como-funciona", label: "Como a psicoterapia atua na ansiedade" },
      { id: "abordagens", label: "Principais abordagens validadas" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "como-funciona",
        title: "Como a psicoterapia atua na ansiedade",
        paragraphs: [
          {
            segments: [
              { text: "Ensaios clínicos randomizados demonstram que abordagens estruturadas reduzem significativamente os escores de ansiedade a médio e longo prazo " },
              { text: "Cuijpers P et al., 2021", refId: "cuijpers-2021", displayText: "Cuijpers P et al., 2021" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Psicoterapia estruturada altera padrões cognitivos disfuncionais.",
      whatEvidenceSuggests: "Sessões semanais regulares com profissionais habilitados.",
      whatWeDontKnowYet: "Comparação exata de duração ótima para manutenção de ganhos."
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
        question: "Quanto tempo leva para a terapia fazer efeito?",
        answer: "Muitos pacientes percebem melhorias funcionais entre 8 a 12 semanas de sessões regulares."
      }
    ],
    references: [
      {
        id: "cuijpers-2021",
        shortLabel: "Cuijpers et al., 2021",
        fullCitation: "Cuijpers, P., et al. (2021). Psychotherapy for anxiety disorders: a meta-analysis. Lancet Psychiatry.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      }
    ]
  },
  "ansiedade-ou-depressao": {
    slug: "ansiedade-ou-depressao",
    seoTitle: "Ansiedade ou depressão: como diferenciar sinais e buscar ajuda | Mental Saúde",
    seoDescription: "Entenda a sobreposição clínica, as diferenças essenciais e a importância da avaliação profissional entre ansiedade e depressão.",
    category: "Diagnóstico e Diferenciação",
    readingTime: "7 min de leitura",
    title: "Ansiedade ou depressão: como diferenciar sinais e quando buscar avaliação",
    subtitle: "Entenda a sobreposição clínica, as diferenças essenciais e a importância da avaliação profissional.",
    author: "Dra. Camila Ribeiro",
    authorSlug: "camila-ribeiro",
    reviewer: "Dr. Roberto Sampaio",
    reviewerSlug: "roberto-sampaio",
    reviewedAt: "13 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade_c01b1313.png",
    primaryEntity: "Diagnóstico Diferencial Ansiedade e Depressão",
    directAnswer: "Embora frequentemente coexistam devido à alta comorbidade, a ansiedade caracteriza-se predominantemente por hiperativação, medo antecipatório e tensão, enquanto a depressão destaca-se por humor deprimido persistente, anedonia e perda de energia.",
    keyTakeaways: [
      "A comorbidade entre ansiedade e depressão é frequente em contextos clínicos.",
      "A avaliação por um profissional habilitado é indispensável para um diagnóstico preciso.",
      "O uso de ferramentas como o GAD-7 e PHQ-9 auxilia na triagem inicial de ambos os quadros."
    ],
    tableOfContents: [
      { id: "sobreposicao", label: "Sobreposição e comorbidade clínica" },
      { id: "diferencas", label: "Distinções principais entre os quadros" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "sobreposicao",
        title: "Sobreposição e comorbidade clínica",
        paragraphs: [
          {
            segments: [
              { text: "Estudos longitudinais de coorte evidenciam que a presença de sintomas ansiosos crônicos eleva o risco de desenvolvimento de comorbidades depressivas ao longo da vida " },
              { text: "Moffitt TE et al., 2017", refId: "moffitt-2017", displayText: "Moffitt TE et al., 2017" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Ansiedade e depressão compartilham vulnerabilidades genéticas e ambientais.",
      whatEvidenceSuggests: "Avaliação clínica integrada para abranger ambos os espectros sintomáticos.",
      whatWeDontKnowYet: "Mecanismos moleculares específicos que determinam a transição entre os quadros."
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
        question: "É possível ter ansiedade e depressão ao mesmo tempo?",
        answer: "Sim, a comorbidade é altamente prevalente na prática clínica."
      }
    ],
    references: [
      {
        id: "moffitt-2017",
        shortLabel: "Moffitt et al., 2017",
        fullCitation: "Moffitt, T. E., et al. (2017). A longitudinal study of anxiety and depression comorbidity. American Journal of Psychiatry.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      }
    ]
  },
  "tristeza-ou-depressao": {
    slug: "tristeza-ou-depressao",
    seoTitle: "Tristeza ou Depressão: Como Entender a Diferença? | Mental Saúde",
    seoDescription: "Saiba diferenciar a tristeza como experiência emocional humana comum da depressão como condição clínica que requer avaliação profissional.",
    category: "Comparação",
    readingTime: "6 min de leitura",
    title: "Tristeza ou depressão: como entender a diferença?",
    subtitle: "Compreenda os limites entre a vivência emocional passageira e os critérios clínicos que exigem atenção especializada.",
    author: "Dra. Mariana Costa",
    authorSlug: "dra-mariana-costa",
    reviewer: "Dr. Carlos Eduardo Mendes",
    reviewerSlug: "dr-carlos-eduardo-mendes",
    reviewedAt: "Agosto de 2026",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80",
    primaryEntity: "DEPRESSION",
    directAnswer: "A tristeza é uma emoção humana natural e passageira diante de perdas ou frustrações, enquanto a depressão clínica é uma condição persistente que afeta o humor, a energia, a cognição e o funcionamento global por duas semanas ou mais.",
    keyTakeaways: [
      "A tristeza comum oscila e mantém a capacidade de vivenciar momentos de prazer.",
      "A depressão clínica envolve sintomas persistentes como anedonia e fadiga intensa.",
      "O rastreio com o PHQ-9 auxilia na organização de percepções, mas não substitui o diagnóstico médico."
    ],
    tableOfContents: [
      { id: "emocao", label: "O que é tristeza" },
      { id: "condicao", label: "O que entendemos por depressão" },
      { id: "comparativo", label: "Quadro Comparativo" },
      { id: "phq9", label: "O papel do PHQ-9" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "emocao",
        title: "O que é tristeza",
        paragraphs: [
          {
            segments: [
              { text: "A tristeza é uma resposta emocional fundamental e adaptativa a eventos adversos, perdas ou decepções do cotidiano. Embora desconfortável, ela tende a ser transitória e não impede de forma absoluta o engajamento em atividades essenciais ou a vivência de momentos de alívio e afeto " },
              { text: "WHO, 2023", refId: "who-depression", displayText: "WHO, 2023" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "condicao",
        title: "O que entendemos por depressão",
        paragraphs: [
          {
            segments: [
              { text: "Em contraste, a depressão é um transtorno do humor caracterizado por humor deprimido persistente, perda de interesse ou prazer em atividades habituais (anedonia), alterações no sono e apetite, e fadiga crônica com duração superior a duas semanas " },
              { text: "NIMH, 2024", refId: "nimh-depression", displayText: "NIMH, 2024" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "comparativo",
        title: "Quadro Comparativo entre Tristeza e Depressão",
        paragraphs: [
          {
            segments: [
              { text: "A tabela abaixo sintetiza aspectos centrais que diferenciam a vivência emocional comum do quadro clínico:" }
            ]
          }
        ]
      },
      {
        id: "phq9",
        title: "O papel do PHQ-9 no rastreio",
        paragraphs: [
          {
            segments: [
              { text: "Ferramentas como o " },
              { text: "PHQ-9", refId: "phq9-ref", displayText: "PHQ-9" },
              { text: " auxiliam na mensuração da intensidade dos sintomas nas últimas duas semanas, servindo como suporte para reflexão e diálogo com profissionais de saúde mental " },
              { text: "Kroenke K et al., 2001", refId: "kroenke-2001", displayText: "Kroenke K et al., 2001" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Tristeza é uma emoção passageira; depressão é uma condição clínica persistente.",
      whatEvidenceSuggests: "Avaliação profissional especializada para diferenciar oscilações de humor de transtornos.",
      whatWeDontKnowYet: "Marcadores biológicos definitivos para subtipos específicos de depressão."
    },
    relatedTest: {
      title: "Questionário de Saúde do Paciente (PHQ-9)",
      acronym: "PHQ-9",
      description: "Instrumento validado de 9 itens para rastreio e avaliação da severidade de sintomas depressivos.",
      questionCount: 9,
      durationMinutes: 3,
      testSlug: "phq-9"
    },
    faqs: [
      {
        question: "Toda tristeza prolongada é depressão?",
        answer: "Não necessariamente. Eventos estressantes prolongados podem gerar luto ou tristeza profunda sem configurar transtorno depressivo, embora mereçam acolhimento."
      }
    ],
    references: [
      {
        id: "who-depression",
        shortLabel: "WHO, 2023",
        fullCitation: "World Health Organization. (2023). Depressive disorder (depression): Key facts.",
        sourceUrl: "https://www.who.int"
      },
      {
        id: "nimh-depression",
        shortLabel: "NIMH, 2024",
        fullCitation: "National Institute of Mental Health. (2024). Depression basics and clinical overview.",
        sourceUrl: "https://www.nimh.nih.gov"
      },
      {
        id: "kroenke-2001",
        shortLabel: "Kroenke et al., 2001",
        fullCitation: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      }
    ]
  },
  "teste-de-depressao-online": {
    slug: "teste-de-depressao-online",
    seoTitle: "Teste de Depressão Online: Como Funciona o PHQ-9 | Mental Saúde",
    seoDescription: "Entenda como funciona o questionário PHQ-9 para rastreio de sintomas depressivos, como interpretar os resultados e quando buscar ajuda profissional.",
    category: "Rastreio e Avaliação",
    readingTime: "5 min de leitura",
    title: "Teste de depressão online: como funciona o PHQ-9 e o que o resultado significa",
    subtitle: "Conheça o instrumento validado de rastreio, sua estrutura e a importância de uma avaliação clínica profissional.",
    author: "Dra. Mariana Costa",
    authorSlug: "dra-mariana-costa",
    reviewer: "Dr. Carlos Eduardo Mendes",
    reviewerSlug: "dr-carlos-eduardo-mendes",
    reviewedAt: "Agosto de 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    primaryEntity: "DEPRESSION",
    directAnswer: "O teste de depressão online baseado no PHQ-9 é uma ferramenta de autoavaliação com 9 perguntas que auxilia a mensurar a frequência e gravidade de sintomas depressivos nas últimas duas semanas, servindo como ponto de partida para reflexão, sem substituir o diagnóstico médico.",
    keyTakeaways: [
      "O PHQ-9 baseia-se nos critérios diagnósticos do DSM para transtornos depressivos.",
      "Resultados elevados indicam necessidade de consulta com psicólogo ou psiquiatra.",
      "A plataforma protege a privacidade dos dados de autoavaliação com armazenamento local seguro."
    ],
    tableOfContents: [
      { id: "o-que-e", label: "O que é o teste online" },
      { id: "phq9-estrutura", label: "Como o PHQ-9 funciona" },
      { id: "interpretacao", label: "Interpretação e limitações" },
      { id: "referencias", label: "Referências científicas" }
    ],
    sections: [
      {
        id: "o-que-e",
        title: "O que é um teste de depressão online",
        paragraphs: [
          {
            segments: [
              { text: "Testes de rastreio online oferecem um meio acessível para que indivíduos organizem suas percepções sobre o próprio bem-estar emocional. Instrumentos validados como o PHQ-9 transformam critérios clínicos em questões diretas " },
              { text: "Spitzer RL et al., 1999", refId: "spitzer-1999", displayText: "Spitzer RL et al., 1999" },
              { text: "." }
            ]
          }
        ]
      },
      {
        id: "phq9-estrutura",
        title: "Como funciona o PHQ-9",
        paragraphs: [
          {
            segments: [
              { text: "O questionário avalia 9 critérios centrais de sintomas depressivos com pontuações de 0 (nenhuma vez) a 3 (quase todos os dias). A soma total indica a gravidade estimada dos sintomas " },
              { text: "Kroenke K et al., 2001", refId: "kroenke-2001", displayText: "Kroenke K et al., 2001" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O PHQ-9 é um instrumento de rastreio validado internacionalmente para sintomas depressivos.",
      whatEvidenceSuggests: "Escores elevados requerem validação diagnóstica por profissional qualificado.",
      whatWeDontKnowYet: "Variações de resposta em subgrupos populacionais específicos sem acompanhamento."
    },
    relatedTest: {
      title: "Questionário de Saúde do Paciente (PHQ-9)",
      acronym: "PHQ-9",
      description: "Instrumento validado de 9 itens para rastreio e avaliação da severidade de sintomas depressivos.",
      questionCount: 9,
      durationMinutes: 3,
      testSlug: "phq-9"
    },
    faqs: [
      {
        question: "Fazer o teste online substitui o diagnóstico?",
        answer: "Não. Questionários de rastreio servem para autoobservação e orientação, exigindo avaliação clínica para qualquer diagnóstico."
      }
    ],
    references: [
      {
        id: "spitzer-1999",
        shortLabel: "Spitzer et al., 1999",
        fullCitation: "Spitzer, R. L., Kroenke, K., & Williams, J. B. (1999). Validation and utility of a self-report version of PRIME-MD: the PHQ primary care study. JAMA.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      },
      {
        id: "kroenke-2001",
        shortLabel: "Kroenke et al., 2001",
        fullCitation: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine.",
        sourceUrl: "https://pubmed.ncbi.nlm.nih.gov"
      }
    ]
  }
};
