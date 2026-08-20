import type { ArticleModel } from "./articlesDatabase";
import { ADDITIONAL_ARTICLES_DATABASE } from "./expandedArticleAdditional";

export const EXPANDED_ARTICLES_DATABASE: Record<string, ArticleModel> = {
  "fobia-social-timidez-excesso": {
    slug: "fobia-social-timidez-excesso",
    seoTitle: "Fobia Social vs. Timidez: Quando a Interação Se Torna um Desafio | Mental Saúde",
    seoDescription: "Compreenda as diferenças clínicas entre a timidez comum e o transtorno de ansiedade social, os impactos na rotina e as abordagens de apoio.",
    category: "Relações e Sociedade",
    readingTime: "8 min de leitura",
    title: "Fobia social vs. timidez excessiva: como diferenciar e buscar apoio",
    subtitle: "Compreenda as diferenças clínicas entre a timidez comum e o transtorno de ansiedade social, os impactos na rotina e as abordagens de apoio.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    reviewerSlug: "camila-mendes",
    reviewedAt: "18 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade-2026_657da1b2.png",
    primaryEntity: "Fobia Social",
    directAnswer: "A timidez é um traço de personalidade comum, enquanto a fobia social (transtorno de ansiedade social) envolve medo persistente e paralisante de escrutínio alheio, interferindo na vida profissional e social.",
    keyTakeaways: [
      "A timidez pode gerar desconforto, mas não paralisa o funcionamento diário.",
      "A ansiedade social envolve medo intenso de julgamento em interações comuns.",
      "A Terapia Cognitivo-Comportamental é altamente eficaz no manejo do quadro.",
      "O rastreio precoce ajuda a diferenciar características cotidianas de transtornos."
    ],
    tableOfContents: [
      { id: "o-que-e", label: "O que é fobia social" },
      { id: "timidez-vs-transtorno", label: "Timidez vs. Transtorno" },
      { id: "tratamento", label: "Tratamento e suporte" }
    ],
    sections: [
      {
        id: "o-que-e",
        title: "Compreendendo a fobia social",
        paragraphs: [
          {
            segments: [
              { text: "A fobia social vai muito além da timidez ocasional, representando um medo persistente de situações sociais onde a pessoa pode ser avaliada negativamente " },
              { text: "APA, 2024", refId: "apa-2024", displayText: "APA, 2024" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O transtorno de ansiedade social afeta significativamente a trajetória acadêmica e profissional.",
      whatEvidenceSuggests: "Intervenções precoces evitam o isolamento secundário.",
      whatWeDontKnowYet: "Marcadores neurobiológicos preditivos específicos de resposta terapêutica."
    },
    relatedTestSlug: "gad-7",
    relatedTest: {
      title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
      acronym: "GAD-7",
      description: "Instrumento breve de rastreio de sintomas ansiosos.",
      questionCount: 7,
      durationMinutes: 3,
      testSlug: "/testes"
    },
    faqs: [
      {
        question: "Timidez tem cura?",
        answer: "A timidez é um traço de personalidade que pode ser gerenciado. A fobia social, por sua vez, é um transtorno tratável."
      }
    ],
    references: [
      {
        id: "apa-2024",
        shortLabel: "APA, 2024",
        fullCitation: "American Psychiatric Association. (2024). Diagnostic and Statistical Manual of Mental Disorders.",
        sourceUrl: "https://www.psychiatry.org"
      }
    ]
  },
  "transtorno-de-panico-crises-manejo": {
    slug: "transtorno-de-panico-crises-manejo",
    seoTitle: "Transtorno de Pânico: Crises, Sintomas e Manejo | Mental Saúde",
    seoDescription: "Entenda o transtorno de pânico, os ataques súbitos de medo intenso, sintomas físicos e estratégias terapêuticas baseadas em evidências.",
    category: "Ansiedade e Crises",
    readingTime: "9 min de leitura",
    title: "Transtorno de pânico: entendendo as crises e estratégias de manejo",
    subtitle: "Entenda o transtorno de pânico, os ataques súbitos de medo intenso, sintomas físicos e estratégias terapêuticas baseadas em evidências.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    reviewedAt: "18 de agosto de 2026",
    image: "/manus-storage/editorial-ansiedade-2026_657da1b2.png",
    primaryEntity: "Transtorno de Pânico",
    directAnswer: "O transtorno de pânico caracteriza-se por ataques recorrentes de medo intenso acompanhados de sintomas somáticos agudos, sendo tratável com psicoterapia e suporte médico.",
    keyTakeaways: [
      "Ataques de pânico surgem de forma abrupta e atingem pico em minutos.",
      "Sintomas físicos como taquicardia e falta de ar são comuns, exigindo avaliação médica.",
      "A antecipação de novas crises pode gerar comportamentos de esquiva.",
      "Abordagens combinadas oferecem excelente prognóstico."
    ],
    tableOfContents: [
      { id: "o-que-e-panico", label: "O que é o pânico" },
      { id: "sintomas-fisicos", label: "Sintomas físicos e emocionais" }
    ],
    sections: [
      {
        id: "o-que-e-panico",
        title: "A natureza dos ataques de pânico",
        paragraphs: [
          {
            segments: [
              { text: "As crises de pânico consistem em surtos agudos de desconforto acompanhados por sensações de perigo iminente " },
              { text: "NIMH, 2025", refId: "nimh-pan-2025", displayText: "NIMH, 2025" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Crises de pânico não tratadas aumentam o risco de isolamento.",
      whatEvidenceSuggests: "Terapia cognitivo-comportamental reduz a frequência das crises.",
      whatWeDontKnowYet: "Variáveis genéticas exatas de vulnerabilidade ao pânico."
    },
    relatedTestSlug: "gad-7",
    relatedTest: {
      title: "Escala de Transtorno de Ansiedade Generalizada (GAD-7)",
      acronym: "GAD-7",
      description: "Instrumento de rastreio de sintomas ansiosos.",
      questionCount: 7,
      durationMinutes: 3,
      testSlug: "/testes"
    },
    faqs: [
      {
        question: "Um ataque de pânico pode ser fatal?",
        answer: "Não, embora os sintomas físicos sejam intensos e imitem emergências médicas."
      }
    ],
    references: [
      {
        id: "nimh-pan-2025",
        shortLabel: "NIMH, 2025",
        fullCitation: "National Institute of Mental Health. (2025). Panic Disorder Overview.",
        sourceUrl: "https://www.nimh.nih.gov"
      }
    ]
  },
  "compulsao-alimentar-emocoes-saude": {
    slug: "compulsao-alimentar-emocoes-saude",
    seoTitle: "Compulsão Alimentar e Emoções: Ciclos e Cuidado | Mental Saúde",
    seoDescription: "Conecte o comer emocional e a compulsão alimentar aos ciclos de regulação emocional, compreendendo caminhos para o tratamento.",
    category: "Hábitos e Comportamento",
    readingTime: "8 min de leitura",
    title: "Compulsão alimentar e regulação emocional: compreendendo os ciclos",
    subtitle: "Conecte o comer emocional e a compulsão alimentar aos ciclos de regulação emocional, compreendendo caminhos para o tratamento.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    reviewerSlug: "camila-mendes",
    reviewedAt: "18 de agosto de 2026",
    image: "/manus-storage/editorial-autocuidado-2026_8b8cb1ef.png",
    primaryEntity: "Compulsão Alimentar",
    directAnswer: "A compulsão alimentar envolve episódios de ingestão rápida de grandes volumes de alimentos com sensação de perda de controle, frequentemente disparados por estados emocionais difíceis.",
    keyTakeaways: [
      "Episódios compulsivos são distintos da indulgência esporádica.",
      "A regulação emocional desajustada atua como principal gatilho.",
      "Abordagens multidisciplinares envolvem nutrição e psicologia."
    ],
    tableOfContents: [
      { id: "ciclo-compulsivo", label: "O ciclo da compulsão" }
    ],
    sections: [
      {
        id: "ciclo-compulsivo",
        title: "Entendendo o ciclo alimentar",
        paragraphs: [
          {
            segments: [
              { text: "O comportamento compulsivo muitas vezes funciona como uma tentativa mal adaptada de anestesiar emoções dolorosas " },
              { text: "WHO, 2025", refId: "who-eat-2025", displayText: "WHO, 2025" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O transtorno da compulsão alimentar afeta o bem-estar metabólico e psicológico.",
      whatEvidenceSuggests: "Nutrição compassiva combinada com TCC melhora a relação com a comida.",
      whatWeDontKnowYet: "Mecanismos precisos de modulação neuroendócrina."
    },
    relatedTestSlug: "phq-9",
    relatedTest: {
      title: "Questionário de Saúde do Paciente (PHQ-9)",
      acronym: "PHQ-9",
      description: "Instrumento de rastreio de sintomas depressivos.",
      questionCount: 9,
      durationMinutes: 3,
      testSlug: "/testes"
    },
    faqs: [
      {
        question: "Compulsão alimentar tem tratamento?",
        answer: "Sim, através de acompanhamento psicológico e nutricional especializado."
      }
    ],
    references: [
      {
        id: "who-eat-2025",
        shortLabel: "WHO, 2025",
        fullCitation: "World Health Organization. (2025). Eating disorders guidance.",
        sourceUrl: "https://www.who.int"
      }
    ]
  },
  "sofrimento-mental-sinais-cuidado": {
    slug: "sofrimento-mental-sinais-cuidado",
    seoTitle: "Sofrimento Mental Invisível: Sinais e Cuidado | Mental Saúde",
    seoDescription: "Aprenda a identificar os sinais sutis do sofrimento mental invisível e a importância do acolhimento precoce.",
    category: "Bem-estar e Prevenção",
    readingTime: "7 min de leitura",
    title: "Sofrimento mental invisível: reconhecendo sinais e caminhos de cuidado",
    subtitle: "Aprenda a identificar os sinais sutis do sofrimento mental invisível e a importância do acolhimento precoce.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dr. Roberto S. (CRM 112340)",
    reviewerSlug: "roberto-s",
    reviewedAt: "18 de agosto de 2026",
    image: "/manus-storage/editorial-estresse-2026_09d273e9.png",
    primaryEntity: "Sofrimento Mental",
    directAnswer: "O sofrimento mental silencioso manifesta-se por apatia persistente e exaustão invisível, mesmo quando o indivíduo mantém suas obrigações diárias.",
    keyTakeaways: [
      "Nem todo sofrimento vem acompanhado de crise aguda.",
      "A exaustão silenciosa drena a vitalidade e o entusiasmo.",
      "Buscar apoio antes do colapso preserva a saúde mental."
    ],
    tableOfContents: [
      { id: "sinais-invisiveis", label: "Sinais invisíveis" }
    ],
    sections: [
      {
        id: "sinais-invisiveis",
        title: "Reconhecendo o desgaste sutil",
        paragraphs: [
          {
            segments: [
              { text: "Muitas pessoas sobrevivem à rotina acumulando fadiga emocional sem perceber que estão em sofrimento clínico " },
              { text: "NIMH, 2025", refId: "nimh-suff-2025", displayText: "NIMH, 2025" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "O silenciamento emocional agrava quadros depressivos futuros.",
      whatEvidenceSuggests: "Espaços de escuta protegida reduzem a somatização.",
      whatWeDontKnowYet: "Indicadores biológicos precoces de fadiga crônica."
    },
    relatedTestSlug: "dass-21",
    relatedTest: {
      title: "Escala de Depressão, Ansiedade e Estresse (DASS-21)",
      acronym: "DASS-21",
      description: "Instrumento multiescala de rastreio.",
      questionCount: 21,
      durationMinutes: 4,
      testSlug: "/testes/dass-21"
    },
    faqs: [
      {
        question: "Quando devo procurar ajuda para sofrimento emocional?",
        answer: "Sempre que a apatia ou o mal-estar persistirem por mais de duas semanas."
      }
    ],
    references: [
      {
        id: "nimh-suff-2025",
        shortLabel: "NIMH, 2025",
        fullCitation: "National Institute of Mental Health. (2025). Emotional well-being and distress.",
        sourceUrl: "https://www.nimh.nih.gov"
      }
    ]
  },
  "saude-mental-preventiva-habitos": {
    slug: "saude-mental-preventiva-habitos",
    seoTitle: "Saúde Mental Preventiva: Hábitos Validados pela Ciência | Mental Saúde",
    seoDescription: "Descubra práticas diárias baseadas em evidências para preservar o bem-estar emocional, regular o estresse e fortalecer a resiliência.",
    category: "Prevenção e Longevidade",
    readingTime: "8 min de leitura",
    title: "Saúde mental preventiva: hábitos diários validados pela ciência",
    subtitle: "Descubra práticas diárias baseadas em evidências para preservar o bem-estar emocional, regular o estresse e fortalecer a resiliência.",
    author: "Equipe Editorial Mental Saúde",
    authorSlug: "equipe-editorial",
    reviewer: "Dra. Camila Mendes (CRP 06/88921)",
    reviewerSlug: "camila-mendes",
    reviewedAt: "18 de agosto de 2026",
    image: "/manus-storage/editorial-sono-2026_283594e9.png",
    primaryEntity: "Saúde Mental Preventiva",
    directAnswer: "A saúde mental preventiva baseia-se em hábitos consistentes como sono regulado, atividade física, pausas cognitivas e conexões sociais que modulam a resposta ao estresse.",
    keyTakeaways: [
      "A prevenção reduz a vulnerabilidade a transtornos psiquiátricos.",
      "Hábitos simples de higiene mental protegem o sistema nervoso.",
      "A consistência supera a intensidade na construção de resiliência."
    ],
    tableOfContents: [
      { id: "pilares-prevencao", label: "Pilares da prevenção" }
    ],
    sections: [
      {
        id: "pilares-prevencao",
        title: "Construindo resiliência diária",
        paragraphs: [
          {
            segments: [
              { text: "Investir em autocuidado preventivo fortalece os recursos psicológicos diante de adversidades " },
              { text: "WHO, 2025", refId: "who-prev-2025", displayText: "WHO, 2025" },
              { text: "." }
            ]
          }
        ]
      }
    ],
    evidenceBox: {
      whatWeKnow: "Hábitos preventivos atenuam a carga alostática do estresse.",
      whatEvidenceSuggests: "Pequenas intervenções diárias geram impactos cumulativos positivos.",
      whatWeDontKnowYet: "Dose exata de atividade física ideal para cada perfil neurobiológico."
    },
    relatedTestSlug: "dass-21",
    relatedTest: {
      title: "Escala de Depressão, Ansiedade e Estresse (DASS-21)",
      acronym: "DASS-21",
      description: "Instrumento multiescala de rastreio.",
      questionCount: 21,
      durationMinutes: 4,
      testSlug: "/testes/dass-21"
    },
    faqs: [
      {
        question: "Prevenção substitui terapia?",
        answer: "Não, são complementares. A prevenção mantém o equilíbrio, enquanto a terapia trata questões instaladas."
      }
    ],
    references: [
      {
        id: "who-prev-2025",
        shortLabel: "WHO, 2025",
        fullCitation: "World Health Organization. (2025). Mental health promotion and prevention.",
        sourceUrl: "https://www.who.int"
      }
    ]
  },
  ...ADDITIONAL_ARTICLES_DATABASE
};
