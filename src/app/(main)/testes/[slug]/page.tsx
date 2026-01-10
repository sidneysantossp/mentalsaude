'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Brain, Clock, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Info, LogIn, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { getCategoryLabel } from '@/lib/categories'
import { testsInfo } from '@/lib/tests-info'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentalhealthtests.com'

interface Question {
  id: string
  text: string
  type: 'LIKERT_SCALE' | 'MULTIPLE_CHOICE' | 'YES_NO'
  options: string
  order: number
}

type OptionObject = { value: string | number; label: string }
type OptionItem = string | OptionObject

const getOptionValue = (option: OptionItem) =>
  typeof option === 'string'
    ? option
    : String(option.value)

const getOptionLabel = (option: OptionItem) =>
  typeof option === 'string' ? option : option.label

function parseQuestionOptions(rawOptions: string): OptionItem[] {
  try {
    const parsed = JSON.parse(rawOptions)
    return Array.isArray(parsed) ? (parsed as OptionItem[]) : []
  } catch {
    return rawOptions
      .split('|')
      .map(option => option.trim())
      .filter(Boolean)
  }
}

interface Test {
  id: string
  title: string
  slug: string
  description: string
  instructions: string
  timeLimit?: number
  category: string
  questions: Question[]
}

type ArticleSection = {
  id: string
  title: string
  summary: string
  shortFocus: string
  longTailKeywords: string[]
  listItems: string[]
  authorityLinks: { href: string; label: string }[]
}

type ArticleContext = {
  testTitle: string
  conditionName: string
}

const ARTICLE_CONNECTORS = [
  'Comece avaliando se as emoções intensas persistem por semanas e se a rotina foi afetada.',
  'Em seguida, observe se há perda de prazer nas atividades rotineiras e se o sono ficou irregular.',
  'Depois, documente pensamentos negativos recorrentes e compare-os com episódios anteriores.',
  'Também vale mapear fatores de estresse recentes, como carga de trabalho, família ou pandemia.',
  'Considere se há sintoma físico associado, como dores inexplicáveis ou alterações no apetite.',
  'Uma parte crucial é analisar o impacto nas relações interpessoais e no desempenho profissional.',
  'Procure registrar a frequência e intensidade dos episódios para discutir com um especialista.',
  'A partir desse registro, priorize estratégias de autocuidado e rotinas estruturadas.',
  'Inclua membros da rede de apoio para manter o acompanhamento constante.',
  'Por fim, mantenha um plano de segurança visível e revise o progresso com o profissional.'
]

const ARTICLE_SECTIONS: ArticleSection[] = [
  {
    id: 'diferenca-tristeza',
    title: 'Como distinguir tristeza passageira de depressão persistente',
    summary:
      'Aprenda a reconhecer a diferença entre tristeza ocasional e um quadro depressivo que exige intervenção.\nFoque em duração, intensidade e prejuízo funcional para certificar que o PHQ-9 é o instrumento certo.\nMantenha a curiosidade sobre o que impulsiona esses sentimentos antes de avançar com o teste.\nExplore expressões como "diferença tristeza e depressão online" e "teste psicológico para detectar depressão persistente" no restante do texto.',
    shortFocus: 'diferença entre tristeza e depressão persistente',
    longTailKeywords: [
      'diferença tristeza e depressão online',
      'como saber se é depressão ou cansaço crônico',
      'teste psicológico para detectar depressão persistente'
    ],
    listItems: [
      '**Duração:** tristeza que some em dias raramente exige triagem formal.',
      '**Intensidade:** tristeza leve que não bloqueia a vida ainda difere de anedonia profunda.',
      '**Funcionamento:** quando o humor compromete trabalho, estudos e relacionamentos, o teste ganha peso'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'sintomas',
    title: 'Sintomas físicos e emocionais que você deve registrar',
    summary:
      'Listar sinais físicos e emocionais ajuda a montar um dossiê rico para o teste.\nObserve alterações no sono, apetite e energia além da mente acelerada.\nDocumente tudo para ter dados concretos durante a aplicação do teste.\nInclua termos como "sintomas físicos de depressão persistente" e "teste psiquiátrico para fadiga constante" conforme expandimos o conteúdo.',
    shortFocus: 'sintomas físicos e emocionais para monitorar',
    longTailKeywords: [
      'sintomas físicos de depressão persistente',
      'como ansiedade se manifesta no corpo',
      'testes psiquiátricos para fadiga constante'
    ],
    listItems: [
      '**Sono:** insônia ou hipersonia frequente',
      '**Corpo:** dores sem causa clara e fadiga contínua',
      '**Emoções:** culpa excessiva, irritabilidade e medo constante'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'interpretacao-resultados',
    title: 'Interpretando os resultados do PHQ-9 (ou GAD-7) com precisão',
    summary:
      'Descubra como converter os números em insights reais e tirar proveito dos testes disponíveis.\nCompreenda a escala, as faixas de gravidade e o que elas significam para você.\nUse esse entendimento para conversar com um profissional preparado.\nRefira-se a "interpretar PHQ-9 online" e "escores do GAD-7 explicados" ao detalhar as faixas.',
    shortFocus: 'interpretação precisa dos resultados do PHQ-9 e GAD-7',
    longTailKeywords: [
      'interpretar PHQ-9 online',
      'escores do GAD-7 explicados',
      'faixas de gravidade do teste psiquiátrico'
    ],
    listItems: [
      '**Faixas baixas:** 0-4 indica sintomas mínimos, mas acompanhe se o quadro evoluir.',
      '**Faixas intermediárias:** 10-19 merece atenção terapêutica e conversa com especialista.',
      '**Faixas altas:** 20+ sinaliza risco e precisa de encaminhamento urgente.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'quando-ajuda',
    title: 'Quando procurar ajuda médica e quais serviços do SUS acionar',
    summary:
      'Saiba identificar o momento certo de buscar suporte clínico e quais portas do SUS abrir.\nDescubra quais sinais exigem encaminhamento imediato e como priorizar agenda de psiquiatria.\nTenha a segurança de saber que a rede pública dispõe de respostas atualizadas.\nConsidere termos como "quando ir para o SUS com depressão" e "redes de apoio governamentais saúde mental" durante a leitura.',
    shortFocus: 'recursos médicos e SUS para transtornos mentais',
    longTailKeywords: [
      'quando ir para o SUS com depressão',
      'agendar psiquiatra SUS ansiedade',
      'redes de apoio governamentais saúde mental'
    ],
    listItems: [
      '**CAPS e atenção básica:** portas de entrada para triagens e suporte humanizado.',
      '**Samu 192 e UPAs:** para crises agudas que exigem atenção imediata.',
      '**Referências:** leve o resultado do teste para acelerar a triagem.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'autocuidado',
    title: 'Estratégias práticas de autocuidado e rotinas que reforçam o bem-estar',
    summary:
      'Construa hábitos que sustentam a estabilidade emocional durante e depois do teste.\nCombine sono regular, movimento e refeições com intenção para criar alicerces sólidos.\nRegistre os lembretes de autocuidado para revisitar sempre que o humor cair.\nUse expressões como "rotina para depressão leve" e "autocuidado para ansiedade generalizada" para guiar a escrita.',
    shortFocus: 'autocuidado para depressão e ansiedade no cotidiano',
    longTailKeywords: [
      'rotina para depressão leve',
      'autocuidado para ansiedade generalizada',
      'planos de bem-estar mental para adultos'
    ],
    listItems: [
      '**Sono ritualizado:** mantenha horários consistentes mesmo em dias ruins.',
      '**Movimento diário:** pequenas caminhadas reduzem o cortisol e acalmam o cérebro.',
      '**Nutrição consciente:** alimentos ricos em triptofano estabilizam neurotransmissores.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'consulta-profissional',
    title: 'Como relatar seus sintomas ao psiquiatra ou psicólogo',
    summary:
      'Traga os dados do teste, fale da frequência e intensidade e mostre o histórico pessoal.\nVamos guiar você para que a conversa com o profissional seja clara, objetiva e confiante.\nInclua detalhes que ajudem a ajustar diagnóstico e tratamento desde a primeira consulta.\nIncorpore palavras como "preparo para consulta de saúde mental" e "relato de sintomas para psicólogo" na narrativa.',
    shortFocus: 'preparo para consulta psiquiátrica e descrição de sintomas',
    longTailKeywords: [
      'como falar com psiquiatra sobre ansiedade',
      'preparo para consulta de saúde mental',
      'relato de sintomas para psicólogo'
    ],
    listItems: [
      '**Relate o que mudou:** detalhes de início, frequência e gatilhos.',
      '**Mostre os registros:** leve anotações do teste, diário de humor e eventos estressores.',
      '**Priorize segurança:** mencione pensamentos de crise mesmo que escapem do teste.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'mitos',
    title: 'Desmistificando mitos sobre depressão e ansiedade',
    summary:
      'Questione a desinformação e entenda o que é real nos medos de quem busca ajuda.\nOs mitos comuns sobre fraqueza ou falta de fé atrapalham o diagnóstico precoce.\nTenha clareza para separar dados científicos das crenças populares.\nMencione "mitos sobre depressão no Brasil" e "verdades sobre ansiedade crônica" enquanto desmonta essas ideias.',
    shortFocus: 'mitos e verdades sobre transtornos mentais',
    longTailKeywords: [
      'mitos sobre depressão no Brasil',
      'verdades sobre ansiedade crônica',
      'o que não significa depressão'
    ],
    listItems: [
      '**Mito:** tristeza é sinal de fraqueza. **Verdade:** é sintoma neurológico legítimo.',
      '**Mito:** antidepressivo vicia. **Verdade:** indicações precisas respeitam protocolos.',
      '**Mito:** só terapia resolve. **Verdade:** combinação com clínica é mais eficiente.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'estilo-vida',
    title: 'Como o estilo de vida influencia depressão, ansiedade e recuperação',
    summary:
      'Analise o impacto do sono, alimentação, álcool e ambiente de trabalho no seu quadro mental.\nPequenas mudanças em hábitos cotidianos podem reverter a sensação de sobrecarga.\nUse o teste como base para revisar cada domínio da sua vida.\nInclua termos como "como o sono afeta a depressão" e "hábitos alimentares na saúde mental" no conteúdo.',
    shortFocus: 'estilo de vida e comportamentos na saúde mental',
    longTailKeywords: [
      'como o sono afeta a depressão',
      'atividade física e ansiedade',
      'hábitos alimentares na saúde mental'
    ],
    listItems: [
      '**Sono irregular:** afeta regulação emocional e sensibilidade ao estresse.',
      '**Sedentarismo:** reduz oxigenação cerebral e aumenta a ruminação.',
      '**Uso de álcool:** pode mascarar sintomas e interferir em medicamentos.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'monitoramento',
    title: 'Monitoramento contínuo e reavaliação do quadro',
    summary:
      'Aprenda a usar o teste como régua de acompanhamento, não apenas como diagnóstico único.\nReavalie pontuações, compare registros e discuta mudanças a cada ciclo.\nIsso garante previsibilidade e segurança para sua jornada terapêutica.\nReferencie "monitorar sintomas depressivos com testes" e "uso de diários de humor e testes" durante o monitoramento.',
    shortFocus: 'monitoramento contínuo de sintomas depressivos e ansiosos',
    longTailKeywords: [
      'monitorar sintomas depressivos com testes',
      'reavaliar resultados psiquiátricos online',
      'uso de diários de humor e testes'
    ],
    listItems: [
      '**Compare faixas:** acompanhe se as pontuações sobem, caem ou se mantêm.',
      '**Integre dados:** combine resposta do teste com o diário emocional.',
      '**Ajuste plano:** revise metas com o profissional a cada avaliação.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  },
  {
    id: 'por-que-mental-saude',
    title: 'Por que realizar este teste na Mental Saúde é uma decisão estratégica',
    summary:
      'Valorize o ambiente protegido e documentado da nossa plataforma antes de iniciar o teste.\nBasta um clique para manter o histórico, salvar documentos e acessar recomendações personalizadas.\nSua jornada é orientada por dados, segurança e integração com profissionais ali recomendados.\nTraga termos como "teste psicológico online mental saúde" e "benefícios de salvar resultados no app" para mostrar a proposta da plataforma.',
    shortFocus: 'vantagens do teste psicológico online na Mental Saúde',
    longTailKeywords: [
      'teste psicológico online mental saúde',
      'plataforma confiável para triagem mental',
      'benefícios de salvar resultados no app'
    ],
    listItems: [
      '**Salvar resultados:** garante histórico para acompanhar progresso.',
      '**Segurança:** dados criptografados e controle de privacidade.',
      '**Integração:** encaminhamos para especialistas e recursos governamentais.'
    ],
    authorityLinks: [
      { href: 'https://www.gov.br/anvisa/pt-br', label: 'Anvisa' },
      { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' }
    ]
  }
]

const buildArticleParagraphs = (section: ArticleSection, context: ArticleContext) => {
  return ARTICLE_CONNECTORS.map((connector, index) => {
    const keywordList = section.longTailKeywords.join(', ')
    const sentences = [
      `A ${section.shortFocus} ajuda a decodificar sintomas e a alicerçar cada ponto da jornada de conhecimento.`,
      `No contexto de ${keywordList} e da categoria ${context.conditionName.toLowerCase()}, as observações ganham clareza.`,
      `${connector} Ao combinar esses dados com ${context.testTitle}, você cria um histórico que respeita a singularidade do seu caso.`,
      `Os termos de transição como “depois”, “além disso” e “outra perspectiva” reforçam o alinhamento entre o que essa página entrega e as intenções de busca.`,
      `A cada parágrafo você amplia o repertório, pulsa nos long tails e fortalece a narrativa que explica o teste em nossa plataforma.`
    ]
    return sentences.join(' ')
  })
}

const formatParagraphText = (text: string) => {
  return text.split('**').map((chunk, index) =>
    index % 2 === 1 ? (
      <strong key={`${chunk}-${index}`}>{chunk}</strong>
    ) : (
      chunk
    )
  )
}

function SEOArticle({ testTitle, conditionName }: ArticleContext) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const context = { testTitle, conditionName }
  const toggleSection = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="space-y-10 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-900">Conteúdo exclusivo sobre {conditionName}</h2>
      {ARTICLE_SECTIONS.map(section => {
        const isOpen = expanded[section.id]
        const detailParagraphs = buildArticleParagraphs(section, context)
        return (
          <article key={section.id} className="space-y-6 border-t border-slate-100 pt-6 first:border-t-0">
            <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
            <p
              className="text-sm text-slate-600"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {section.summary}
            </p>
            <div className={`${isOpen ? '' : 'hidden'} space-y-4`}>
              {detailParagraphs.map((paragraph, index) => (
                <p key={`${section.id}-detail-${index}`} className="text-sm leading-relaxed text-slate-700">
                  {formatParagraphText(paragraph)}
                </p>
              ))}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">Pontos estratégicos</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {section.listItems.map(item => (
                    <li key={`${section.id}-list-${item}`}>{formatParagraphText(item)}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-blue-600">
                {section.authorityLinks.map(link => (
                  <Link
                    key={`${section.id}-link-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-slate-900 underline"
              onClick={() => toggleSection(section.id)}
            >
              {isOpen ? 'Leia menos' : 'Leia mais'}
            </button>
          </article>
        )
      })}
    </section>
  )
}

const LONGTAIL_QUESTIONS = [
  {
    question: 'Quais sintomas me levam a buscar um teste de depressão persistente?',
    answer:
      'Procure o teste se notar tristeza constante, falta de energia, alterações no sono ou apetite e dificuldades de concentração que persistem há semanas. Também valem alterações de humor em redes sociais e isolamento, e isso se combina com o histórico médico.'
  },
  {
    question: 'Como saber se a tristeza virou um quadro crônico que precisa de avaliação?',
    answer:
      'Observe quanto tempo a tristeza dura, se ela afeta energia, sono e vontade de fazer atividades. Quando esses sinais persistem por semanas ou meses e nada parece melhorar, é hora de usar o teste e documentar a frequência dos sintomas.'
  },
  {
    question: 'O que fazer quando o resultado do teste mostra sintomas moderados?',
    answer:
      'Marque uma consulta, traga o teste preenchido e destaque os itens com maior pontuação. Use o histórico para apontar evolução e discuta estratégias como terapia cognitivo-comportamental e ajustes de hábitos.'
  },
  {
    question: 'Teste online pode substituir a consulta presencial?',
    answer:
      'Não substitui, mas serve como triagem e preparo. Ele documenta padrões e facilita o atendimento presencial, porque o profissional já chega com dados organizados e foco em hipóteses.'
  },
  {
    question: 'Como usar o teste em episódios depressivos intensos ou momentos em que tudo parece pesado?',
    answer:
      'Durante o pico de sintomas, priorize segurança (CVV 188, SAMU) e depois registre o que ocorreu. O teste, aplicado com calma, documentará gatilhos e ajudará o profissional a ajustar suportes e medicações.'
  },
  {
    question: 'Quais fatores ambientais mais influenciam o resultado?',
    answer:
      'Estresse no trabalho, conflitos familiares, sono fragmentado e isolamento social elevam o risco. Anote essas variáveis nas notas do teste para fornecer contexto ao profissional.'
  },
  {
    question: 'Como incorporar o resultado do teste ao cuidado remoto ou teleconsulta?',
    answer:
      'Envie o PDF salvo pela plataforma, destaque os itens críticos e complemente com registros de sono, sono e consumo de substâncias. Isso permite ajustes rápidos de medicação.'
  },
  {
    question: 'O teste exige cadastro ou posso responder anonimamente?',
    answer:
      'Você pode responder sem conta para ter uma visão imediata. Criar perfil permite salvar resultados, comparar tendências e compartilhar com equipe de saúde.'
  },
  {
    question: 'O que fazer se o teste indicar risco elevado para suicídio?',
    answer:
      'Procure imediatamente serviços de emergência (CVV 188, hospitais públicos). Informe familiares e siga o plano de segurança enquanto prepara uma consulta urgente.'
  },
  {
    question: 'Como usar os resultados para melhorar a rotina e reduzir recaídas?',
    answer:
      'Transforme os insights em metas semanais de autocuidado, monitore as variações e destaque pequenas conquistas. Atualize o teste mensalmente para comparar evolução.'
  }
]

function LongtailAccordion() {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-900">Perguntas frequentes sobre depressão</h2>
      <div className="space-y-3">
        {LONGTAIL_QUESTIONS.map((item, index) => (
          <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              {index + 1}. {item.question}
            </summary>
            <p className="mt-3 text-sm text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

const CATEGORY_TO_CONDITION_SLUG: Record<string, string> = {
  DEPRESSION: 'depressao',
  ANXIETY: 'ansiedade'
}

export default function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [slug, setSlug] = useState<string>('')
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [testStarted, setTestStarted] = useState(false)
  const conditionSlug =
    test && CATEGORY_TO_CONDITION_SLUG[test.category as keyof typeof CATEGORY_TO_CONDITION_SLUG]
  const decisionPagesData = slug ? testsInfo[slug]?.decisionPages ?? [] : []
  const activeSlug = slug || test?.slug || ''
  const baseSlug = slug || test?.slug

  const jsonLd =
    test && slug
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: test.title,
          description: test.description,
          url: `${SITE_URL}/testes/${slug}`,
          mainEntity: {
            '@type': 'Questionnaire',
            name: test.title,
            about: getCategoryLabel(test.category),
            numberOfQuestions: test.questions.length,
            typicalTime: test.timeLimit ? `PT${test.timeLimit}M` : 'PT0M',
            audience: {
              '@type': 'Audience',
              audienceType: 'Adultos'
            }
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Testes',
                item: `${SITE_URL}/testes`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: test.title,
                item: `${SITE_URL}/testes/${slug}`
              }
            ]
          }
        }
      : null

  const renderStructuredData = () => {
    if (!jsonLd) return null
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    )
  }

  useEffect(() => {
    const initPage = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
      fetchTest(resolvedParams.slug)
    }
    initPage()
  }, [])

  useEffect(() => {
    if (testStarted && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(timer)
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [testStarted, timeRemaining])

  const fetchTest = async (testSlug: string) => {
    try {
      const response = await fetch(`/api/tests/${testSlug}`)
      if (!response.ok) throw new Error('Erro ao carregar teste')
      
      const data = await response.json()
      setTest(data)
    } catch (error) {
      console.error('Erro ao carregar teste:', error)
      toast.error('Erro ao carregar teste')
    } finally {
      setLoading(false)
    }
  }

    const startTest = () => {
      setTestStarted(true)
    if (test?.timeLimit) {
      setTimeRemaining(test.timeLimit * 60)
    }
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  useEffect(() => {
    if (typeof document === 'undefined') return
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
  }, [currentQuestion])

  const handleNext = () => {
    if (!test) return
    
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!test) return

    let score = 0
    test.questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const options = parseQuestionOptions(question.options).map(getOptionValue)
        const answerIndex = options.indexOf(answer)
        score += Math.max(answerIndex, 0)
      }
    })

    setTotalScore(score)
    setShowResults(true)

    if (session?.user) {
      try {
        await fetch('/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testId: test.id,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
              questionId,
              answer
            })),
            userId: session.user.id,
            score
          })
        })
        toast.success('Resultado salvo com sucesso!')
      } catch (error) {
        console.error('Erro ao salvar resultado:', error)
        toast.error('Erro ao salvar resultado')
      }
    } else {
      toast.info('Faça login para salvar seus resultados')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getResultMessage = () => {
    if (!test) return ''
    
    const maxScore = test.questions.length * 4
    const percentage = (totalScore / maxScore) * 100

    if (percentage < 25) return 'Sintomas mínimos ou ausentes'
    if (percentage < 50) return 'Sintomas leves'
    if (percentage < 75) return 'Sintomas moderados'
    return 'Sintomas graves - recomendamos buscar ajuda profissional'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando teste...</p>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Teste não encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              O teste que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link href="/testes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para testes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!testStarted) {
    const categoryLabel = getCategoryLabel(test.category)
    return (
      <>
        {renderStructuredData()}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/testes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
                <CardDescription className="text-base">{test.description}</CardDescription>
              </div>
              <Badge variant="outline" className="ml-4">
                {categoryLabel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {status !== 'authenticated' && (
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900">Importante: Salvar Resultados</AlertTitle>
                <AlertDescription className="text-blue-800">
                  Para salvar seus resultados em PDF ou na plataforma, você precisa estar logado. 
                  Caso contrário, o teste não será salvo ao final.
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="default" asChild>
                      <Link href="/auth/signin">
                        <LogIn className="mr-2 h-4 w-4" />
                        Fazer Login
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/auth/signup">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Criar Conta
                      </Link>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {baseSlug && (
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                <Link href={`/testes/${baseSlug}/como-funciona`} className="underline">
                  Entenda como o teste funciona
                </Link>
                <Link href={`/testes/${baseSlug}/pontuacao`} className="underline">
                  Veja a pontuação antes de começar
                </Link>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Instruções</h3>
                <p className="text-muted-foreground">{test.instructions}</p>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>{test.questions.length} questões</span>
                </div>
                {test.timeLimit && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{test.timeLimit} minutos</span>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={startTest} size="lg" className="w-full">
              Iniciar Teste
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        <div className="mt-10 space-y-10">
          <SEOArticle testTitle={test.title} conditionName={categoryLabel} />
          <LongtailAccordion />
        </div>
      </div>
    </>
  )
}

  const handleDownloadPdf = () => {
    if (typeof window !== 'undefined' && window.print) {
      window.print()
    }
  }

  if (showResults) {
    const resultMessage = getResultMessage()
    const nowLabel = new Date().toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    })

    return (
      <>
        {renderStructuredData()}
        <div className="container mx-auto px-4 py-10">
        <div className="mx-auto w-full max-w-4xl rounded-[32px] border border-gray-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Mental Saúde Platform
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Relatório em PDF
              </h2>
              <p className="text-sm text-muted-foreground">Resultados clínicos validados</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p className="font-medium text-slate-900">{test.title}</p>
              <p>{nowLabel}</p>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Pontuação</p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {totalScore} / {test.questions.length * 4}
                </p>
                <p className="text-sm text-muted-foreground">Avaliação</p>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Categoria</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{getCategoryLabel(test.category)}</p>
                <p className="text-sm text-muted-foreground">Teste realizado</p>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Tempo</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {test.timeLimit ? `${test.timeLimit} min` : 'Sem limite'}
                </p>
                <p className="text-sm text-muted-foreground">Duração sugerida</p>
              </div>
            </div>

            <div className="rounded-3xl border border-green-200 bg-gradient-to-r from-emerald-50 to-white p-6 shadow-inner">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-semibold">Resultado</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-slate-900">{resultMessage}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Resultado baseado nos seus relatos das últimas duas semanas.
              </p>
            </div>

            {/*
              warning for session
            */}
            {!session && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-900">Resultado não salvo</AlertTitle>
                <AlertDescription className="text-amber-800">
                  Você não está logado, portanto seus resultados não foram salvos. Faça login ou crie uma conta
                  para acompanhar seu progresso.
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-500" />
                <p className="text-sm font-semibold text-slate-800">Recomendações</p>
              </div>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Este teste é apenas uma triagem inicial. Busque suporte profissional se você estiver enfrentando
                sintomas persistentes ou intensos. Pratique autocuidado diário, mantenha conexões significativas e
                considere compartilhar este relatório com um profissional confiável.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 text-slate-800 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-600">Ação recomendada</p>
                <p className="text-lg font-semibold">Registre-se para salvar ou baixe o PDF</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <Button
                  asChild
                  className="w-full md:w-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white border-0"
                >
                  <Link href="/auth/signup">
                    Registrar para salvar este teste
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadPdf}
                  disabled={status !== 'authenticated'}
                  className="w-full md:w-auto border-white bg-white text-black hover:text-black"
                  title={status !== 'authenticated' ? 'Faça login para habilitar o download' : undefined}
                >
                  Baixar PDF
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/80 p-6 text-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Explorar o teste</p>
              <p className="text-lg font-semibold text-slate-900">Entenda melhor a pontuação, a validade e o que fazer em seguida</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link href={`/testes/${activeSlug}/pontuacao`}>Pontuação detalhada</Link>
                </Button>
                <Button variant="outline" asChild size="sm">
                  <Link href={`/testes/${activeSlug}/validacao`}>Validação científica</Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link href={`/testes/${activeSlug}/pos-teste`}>Próximos passos</Link>
                </Button>
                <Button variant="ghost" asChild size="sm" className="px-0 text-left text-blue-600 hover:text-blue-700">
                  <Link href={`/testes/${activeSlug}/como-funciona`}>Como funciona o instrumento</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                {decisionPagesData.map(page => (
                  <Link key={page.slug} href={`/decisao/${page.slug}`} className="underline">
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 px-8 py-5 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white">
            Mental Saúde • {nowLabel}
          </div>
        </div>
      </div>
    </>
  )
}

  const currentQ = test?.questions?.[currentQuestion]
  const options = currentQ ? parseQuestionOptions(currentQ.options) : []
  const progress = test ? ((currentQuestion + 1) / test.questions.length) * 100 : 0

  return (
    <>
      {renderStructuredData()}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setTestStarted(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          {timeRemaining !== null && (
            <Badge variant={timeRemaining < 60 ? 'destructive' : 'secondary'}>
              <Clock className="mr-2 h-4 w-4" />
              {formatTime(timeRemaining)}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Questão {currentQuestion + 1} de {test?.questions?.length ?? 0}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQ?.text ?? ''}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={(currentQ && answers[currentQ.id]) || ''}
              onValueChange={(value) => currentQ && handleAnswer(currentQ.id, value)}
              className="space-y-3"
            >
              {options.map((option, index) => {
                const optionValue = getOptionValue(option)
                const optionLabel = getOptionLabel(option)
                return (
                  <RadioGroupItem
                    key={optionValue}
                    value={optionValue}
                    id={`option-${index}`}
                    aria-label={optionLabel}
                  >
                    <span className="text-base">{optionLabel}</span>
                  </RadioGroupItem>
                )
              })}
            </RadioGroup>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!currentQ || !answers[currentQ.id]}
                className="flex-1"
              >
                {currentQuestion === (test?.questions?.length ?? 1) - 1 ? 'Finalizar' : 'Próxima'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
