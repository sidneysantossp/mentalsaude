'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Brain, ChevronLeft, ChevronRight, Clock, CheckCircle, Download, User, TrendingUp, Shield, Heart, Share2, Mail } from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import TestResultAuth from '@/components/auth/TestResultAuth'
import PDFGenerator from '@/components/test/PDFGenerator'
import ShareResults from '@/components/test/ShareResults'
import AccordionFAQ from '@/components/test/AccordionFAQ'
import Footer from '@/components/Footer'

interface Question {
  id: string
  text: string
  type: string
  order: number
  options: {
    id: string
    text: string
    value: number
    order: number
  }[]
}

interface Test {
  id: string
  title: string
  description: string
  category: string
  timeLimit: number
  questionCount: number
  estimatedTime: string
  questions: string
  difficulty: string
  icon: string
  color: string
  image: string
  instructions: string
  isActive: boolean
}

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string

  const [test, setTest] = useState<Test | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (testId) {
      // Check if testId is numeric (old URL format)
      if (/^\d+$/.test(testId)) {
        // Redirect to the correct URL format using category
        fetchTestForRedirect(testId)
      } else {
        fetchTest()
      }
    }
  }, [testId])

  const fetchTestForRedirect = async (id: string) => {
    try {
      const response = await fetch(`/api/tests/${id}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data.test) {
          const category = data.data.test.category.toLowerCase().replace('_', '-')
          router.replace(`/testes/${category}`)
          return
        }
      }
      
      // If test not found or error, redirect to tests page
      router.replace('/testes')
    } catch (err) {
      console.error('Erro ao redirecionar:', err)
      router.replace('/testes')
    }
  }

  const fetchTest = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tests/${testId}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar teste')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setTest(data.data.test)
        setQuestions(data.data.questions)
      } else {
        throw new Error(data.error || 'Erro desconhecido')
      }
    } catch (err) {
      console.error('Erro ao carregar teste:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar teste')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmitTest()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmitTest = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Por favor, responda todas as perguntas antes de finalizar.')
      return
    }

    setIsSubmitting(true)
    try {
      // Convert answers to the format expected by the API
      const formattedAnswers = Object.entries(answers).map(([questionId, score]) => ({
        questionId,
        score
      }))

      const response = await fetch(`/api/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: formattedAnswers,
          testType: test?.category || 'Teste Psicológico'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setTestResult(data.result)
        setShowResults(true)
      } else {
        throw new Error(data.error || 'Erro ao enviar respostas')
      }
    } catch (err) {
      console.error('Erro ao enviar teste:', err)
      alert('Erro ao enviar suas respostas. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100
  }

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
    const maxScore = questions.length * 3 // Maximum score per question is 3
    return Math.round((totalScore / maxScore) * 100)
  }

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    // Here you could show a success message or update UI
  }

  const getSEOContent = () => {
    // Enhanced content based on test category
    if (test?.category === 'DEPRESSAO') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Depressão PHQ-9</strong> é um instrumento de rastreamento desenvolvido por pesquisadores da Columbia University, considerado o padrão-ouro para avaliação de depressão em cuidados primários. Este questionário avalia os nove critérios diagnósticos de depressão maior segundo o DSM-5, medindo a frequência dos sintomas nas últimas duas semanas.</p><h2>Como funciona a avaliação?</h2><p>O teste avalia sintomas como humor deprimido, perda de interesse ou prazer, alterações no sono e apetite, fadiga, dificuldade de concentração, sentimentos de inadequação e pensamentos de morte. Cada resposta é pontuada de 0-3 baseada na frequência do sintoma.</p><h2>Para que serve?</h2><p>Funciona como ferramenta de rastreamento para identificar pessoas que podem estar sofrendo de depressão e necessitam de avaliação clínica detalhada. Com sensibilidade de 88% e especificidade de 88%, é altamente confiável para detectar casos que necessitam intervenção profissional.</p><h2>Como interpretar os resultados?</h2><p>As pontuações são classificadas em: 0-4 (mínima), 5-9 (leve), 10-14 (moderada), 15-19 (moderadamente grave), 20-27 (grave). Cada nível corresponde a diferentes recomendações de intervenção.</p>`
        },
        {
          question: 'Quais são os principais fatores de risco para depressão?',
          answer: `<p>A depressão resulta de uma complexa interação de fatores biológicos, genéticos, ambientais e psicológicos. <strong>Fatores biológicos:</strong> histórico familiar de depressão, desequilíbrios químicos cerebrais (neurotransmissores como serotonina, dopamina e norepinefrina).</p><p><strong>Fatores ambientais:</strong> eventos estressantes da vida (perda, divórcio, problemas financeiros), traumas na infância, doenças crônicas.</p><p><strong>Fatores psicológicos:</strong> baixa autoestima, perfeccionismo, pessimismo, dificuldade em lidar com estresse. Mulheres têm maior probabilidade de desenvolver depressão, possivelmente devido a fatores hormonais e sociais.</p>`
        },
        {
          question: 'Quais tratamentos são mais eficazes para depressão?',
          answer: `<p>O tratamento mais eficaz geralmente combina abordagens múltiplas. <strong>Psicoterapia:</strong> Terapia Cognitivo-Comportamental (TCC) é altamente eficaz, ajudando a identificar e modificar padrões de pensamento negativo.</p><p><strong>Medicamentos:</strong> Antidepressivos como ISRS (Inibidores Seletivos de Recaptação de Serotonina) podem ser necessários para casos moderados a graves.</p><p><strong>Abordagens complementares:</strong> Exercícios físicos regulares demonstram efeitos antidepressivos comparáveis à medicação em casos leves a moderados. Outras opções incluem terapia de luz para depressão sazonal, mindfulness, e mudanças no estilo de vida.</p>`
        }
      ]
    } else if (test?.category === 'COMPULSAO_ALIMENTAR') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Compulsão Alimentar</strong> utiliza a Binge Eating Scale (BES), um questionário autoaplicável de 16 itens desenvolvido especificamente para avaliar a gravidade dos sintomas de compulsão alimentar. Desenvolvida por Gormally et al. (1982), é amplamente utilizada devido à sua excelente validade e confiabilidade.</p><h2>Como funciona?</h2><p>A escala avalia aspectos comportamentais (comer rapidamente, comer até sentir desconforto), emocionais (culpa, vergonha) e cognitivos (preocupação com comida e peso). Cada resposta é pontuada, resultando em uma classificação que varia de ausência de compulsão a compulsão severa.</p><h2>Para que serve?</h2><p>Funciona como ferramenta para identificar padrões alimentares problemáticos e entender se os comportamentos indicam um Transtorno da Compulsão Alimentar Periódica que necessita tratamento profissional.</p>`
        },
        {
          question: 'Quais são os sinais de alerta da compulsão alimentar?',
          answer: `<p>Os sinais característicos incluem: comer muito mais rápido que o normal, comer até sentir desconforto físico, comer grandes quantidades mesmo sem fome, comer sozinho por vergonha da quantidade, sentir-se deprimido ou culpado após os episódios.</p><p><strong>Outros indicadores importantes:</strong> alimentos desaparecem rapidamente da casa, embalagens vazias escondidas, acúmulo de peso rápido, isolamento social durante refeições, dietas restritivas seguidas por episódios de compulsão.</p>`
        },
        {
          question: 'Como tratar a compulsão alimentar?',
          answer: `<p>O tratamento mais eficaz combina abordagens multidisciplinares. <strong>Terapia Cognitivo-Comportamental (TCC)</strong> é considerada padrão-ouro, ajudando a modificar padrões de pensamento disfuncionais.</p><p><strong>Abordagens complementares:</strong> Terapia Interpessoal, mindfulness, alimentação intuitiva. Em alguns casos, medicamentos como ISRS podem ser indicados. Grupos de apoio e acompanhamento nutricional com especialista em transtornos alimentares complementam o tratamento.</p>`
        }
      ]
    } else if (test?.category === 'ESTRESSE') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Nível de Estresse</strong> utiliza escalas validadas para medir e quantificar o nível de estresse que uma pessoa está experimentando. Avalia sintomas físicos, emocionais e comportamentais associados ao estresse crônico.</p><h2>Como funciona?</h2><p>Avalia percepção sobre eventos estressantes, capacidade de controle, reações emocionais e impacto na vida diária durante o último mês.</p><h2>Para que serve?</h2><p>Ajuda a identificar quando o estresse está se tornando prejudicial e necessita atenção. Estresse crônico pode levar a sérios problemas de saúde física e mental.</p>`
        },
        {
          question: 'Quais são os principais sinais de estresse crônico?',
          answer: `<p><strong>Sinais físicos:</strong> Tensão muscular, dores de cabeça, problemas digestivos, fadiga, insônia, sistema imunológico enfraquecido.</p><p><strong>Sinais emocionais:</strong> Irritabilidade, ansiedade, depressão, sobrecarga, dificuldade de concentração.</p><p><strong>Sinais comportamentais:</strong> Mudanças no apetite, procrastinação, aumento do consumo de álcool ou tabaco, isolamento social.</p>`
        },
        {
          question: 'Como reduzir o estresse de forma eficaz?',
          answer: `<p><strong>Técnicas de relaxamento:</strong> Meditação, respiração profunda, relaxamento muscular progressivo.</p><p><strong>Exercícios físicos:</strong> Atividade regular libera endorfinas e reduz cortisol.</p><p><strong>Organização:</strong> Gerenciamento de tempo, estabelecimento de prioridades, aprendizado a dizer não.</p><p><strong>Apoio social:</strong> Conversar com amigos, familiares ou profissionais de saúde mental.</p>`
        }
      ]
    } else if (test?.category === 'BURNOUT') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Burnout</strong> utiliza o Maslach Burnout Inventory (MBI), instrumento mais reconhecido mundialmente para avaliar Síndrome de Burnout. Avalia três dimensões principais: exaustão emocional, despersonalização e redução de realização pessoal.</p><h2>Como funciona?</h2><p>Avalia frequência de sentimentos relacionados ao trabalho nas últimas semanas, incluindo cansaço emocional, cinismo, e senso de eficácia profissional.</p><h2>Para que serve?</h2><p>Identifica profissionais em risco de Burnout e orienta intervenções preventivas antes que a condição se torne severa.</p>`
        },
        {
          question: 'Quais são os estágios do Burnout?',
          answer: `<p><strong>Estágio 1 - Advertência:</strong> Sintomas leves como cansaço, ansiedade, dores de cabeça.</p><p><strong>Estágio 2 - Redução de interesse:</strong> Procrastinação, cinismo, isolamento social.</p><p><strong>Estágio 3 - Exaustão crônica:</strong> Fadiga persistente, depressão, doenças físicas.</p><p><strong>Estágio 4 - Burnout completo:</strong> Colapso físico e mental, incapacidade de funcionar.</p>`
        },
        {
          question: 'Como prevenir e tratar o Burnout?',
          answer: `<p><strong>Prevenção:</strong> Estabelecer limites claros, pausas regulares, desenvolvimento profissional, apoio social.</p><p><strong>Tratamento:</strong> Psicoterapia, mudanças no ambiente de trabalho, exercícios físicos, mindfulness, em casos graves afastamento temporário.</p>`
        }
      ]
    } else if (test?.category === 'TDAH') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de TDAH</strong> utiliza a ASRS (Adult ADHD Self-Report Scale), desenvolvida em colaboração com a Organização Mundial de Saúde. Avalia sintomas de desatenção e hiperatividade em adultos.</p><h2>Como funciona?</h2><p>Avalia frequência de 18 sintomas principais nos últimos 6 meses, divididos em dois clusters: desatenção (9 sintomas) e hiperatividade/impulsividade (9 sintomas).</p><h2>Para que serve?</h2><p>Instrumento de rastreamento para identificar adultos que podem ter TDAH e necessitam de avaliação especializada completa.</p>`
        },
        {
          question: 'Quais são os sintomas principais de TDAH em adultos?',
          answer: `<p><strong>Desatenção:</strong> Dificuldade em manter foco, organização, seguir instruções, perder objetos, distração fácil.</p><p><strong>Hiperatividade:</strong> Inquietação, dificuldade em ficar parado, excesso de energia.</p><p><strong>Impulsividade:</strong> Decisões precipitadas, interrupções, dificuldade em esperar.</p>`
        },
        {
          question: 'Como tratar TDAH em adultos?',
          answer: `<p><strong>Medicamentos:</strong> Estimulantes (metilfenidato, anfetaminas) e não estimulantes (atomoxetina).</p><p><strong>Terapia:</strong> TCC para desenvolver habilidades organizacionais e estratégias de enfrentamento.</p><p><strong>Coaching:</strong> Treinamento executivo para melhorar função e produtividade.</p>`
        }
      ]
    } else if (test?.category === 'TOC') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de TOC</strong> utiliza a Y-BOCS (Yale-Brown Obsessive Compulsive Scale), considerada padrão-ouro para avaliar gravidade do Transtorno Obsessivo-Compulsivo.</p><h2>Como funciona?</h2><p>Avalia tempo gasto, interferência, desconforto e controle sobre obsessões (pensamentos intrusivos) e compulsões (comportamentos repetitivos).</p><h2>Para que serve?</h2><p>Quantifica a gravidade dos sintomas e monitora progresso do tratamento ao longo do tempo.</p>`
        },
        {
          question: 'Quais são os tipos de TOC?',
          answer: `<p><strong>Verificação:</strong> Trancar portas, verificar gás, aparelhos.</p><p><strong>Contaminação:</strong> Medo de germes, lavagem excessiva.</p><p><strong>Simetria/ordem:</strong> Alinhamento, organização rígida.</p><p><strong>Obsessões sexuais/religiosas:</strong> Pensamentos intrusivos indesejados.</p>`
        },
        {
          question: 'Como tratar o TOC?',
          answer: `<p><strong>Terapia de Exposição:</strong> Exposição gradual com prevenção de resposta (EPR).</p><p><strong>Medicamentos:</strong> ISRS em doses mais altas que para depressão.</p><p><strong>Abordagens complementares:</strong> Mindfulness, terapia de aceitação e compromisso.</p>`
        }
      ]
    } else if (test?.category === 'FOBIA_SOCIAL') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Fobia Social</strong> utiliza escalas como LSAS (Liebowitz Social Anxiety Scale) para avaliar medo e evitação de situações sociais.</p><h2>Como funciona?</h2><p>Avalia ansiedade e evitação em diversas situações sociais e de desempenho, interagir com strangers, falar em público, comer em público.</p><h2>Para que serve?</h2><p>Identifica pessoas com fobia social e diferencia entre timidez normal e transtorno que necessita tratamento.</p>`
        },
        {
          question: 'Fobia social vs timidez normal?',
          answer: `<p><strong>Timidez normal:</strong> Desconforto leve em situações sociais novas, melhora com exposição.</p><p><strong>Fobia social:</strong> Medo intenso, evitação persistente, interferência significativa na vida, sintomas físicos intensos.</p>`
        },
        {
          question: 'Como tratar fobia social?',
          answer: `<p><strong>Terapia cognitivo-comportamental:</strong> Reestruturação de pensamentos negativos, exposição gradual.</p><p><strong>Treinamento de habilidades sociais:</strong> Prática de conversação, assertividade.</p><p><strong>Medicamentos:</strong> ISRS, betabloqueadores para situações específicas.</p>`
        }
      ]
    } else if (test?.category === 'INSONIA') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Insônia</strong> utiliza o Índice de Gravidade de Insônia (ISI) para avaliar dificuldades de sono e seu impacto diurno.</p><h2>Como funciona?</h2><p>Avalia dificuldade para iniciar/manter sono, despertar precoce, satisfação com sono, interferência na vida diária e preocupação com sono.</p><h2>Para que serve?</h2><p>Diferencia insônia transitória de crônica e orienta necessidade de intervenção especializada.</p>`
        },
        {
          question: 'Quais são os tipos de insônia?',
          answer: `<p><strong>Início:</strong> Dificuldade em adormecer (>30 min).</p><p><strong>Manutenção:</strong> Despertares noturnos frequentes.</p><p><strong>Terminal:</strong> Despertar precoce sem conseguir voltar a dormir.</p><p><strong>Mista:</strong> Combinação dos tipos acima.</p>`
        },
        {
          question: 'Como tratar insônia?',
          answer: `<p><strong>Higiene do sono:</strong> Horários regulares, ambiente escuro/frio, sem eletrônicos.</p><p><strong>TCC-I:</strong> Terapia cognitivo-comportamental específica para insônia.</p><p><strong>Relaxamento:</strong> Técnicas de respiração, meditação, progressiva.</p>`
        }
      ]
    } else if (test?.category === 'SINDROME_IMPOSTOR') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Síndrome do Impostor</strong> avalia padrões de pensamento relacionados à sensação de ser fraudulento apesar do sucesso evidente.</p><h2>Como funciona?</h2><p>Avalia crenças sobre competência, medo de exposição, atribuição de sucesso a fatores externos, minimização de conquistas.</p><h2>Para que serve?</h2><p>Identifica profissionais que podem estar se autossabotando devido à síndrome do impostor.</p>`
        },
        {
          question: 'Quem tem síndrome do impostor?',
          answer: `<p>Afeta até 70% das pessoas em algum momento, especialmente:</p><p>• Profissionais bem-sucedidos</p><p>• Mulheres em áreas dominadas por homens</p><p>• Minorias em ambientes majoritários</p><p>• Perfeccionistas</p>`
        },
        {
          question: 'Como superar a síndrome do impostor?',
          answer: `<p><strong>Reconhecimento:</strong> Identificar padrões de pensamento.</p><p><strong>Evidências:</strong> Documentar conquistas reais.</p><p><strong>Mentoria:</strong> Buscar apoio de profissionais experientes.</p><p><strong>Terapia:</strong> TCC para modificar crenças disfuncionais.</p>`
        }
      ]
    } else if (test?.category === 'DEPRESSAO_MAIOR') {
      return [
        {
          question: `O que é ${test.title} e como ele funciona?`,
          answer: `<p>O <strong>Teste de Depressão Maior</strong> avalia critérios diagnósticos completos segundo DSM-5 para Transtorno Depressivo Maior.</p><h2>Como funciona?</h2><p>Avalia presença de pelo menos 5 sintomas por 2+ semanas, incluindo humor deprimido ou anedonia, com impacto funcional significativo.</p><h2>Para que serve?</h2><p>Diferencia depressão maior de outras formas de depressão e orienta necessidade de tratamento especializado.</p>`
        },
        {
          question: 'Depressão maior vs outras depressões?',
          answer: `<p><strong>Depressão maior:</strong> 5+ sintomas, 2+ semanas, impacto funcional severo.</p><p><strong>Distimia:</strong> Sintomas crônicos leves por 2+ anos.</p><p><strong>Depressão adaptativa:</strong> Reação a evento estressor específico.</p>`
        },
        {
          question: 'Tratamento da depressão maior?',
          answer: `<p><strong>Abordagem combinada:</strong> Psicoterapia + farmacoterapia.</p><p><strong>TCC:</strong> Modificação de padrões cognitivos.</p><p><strong>Medicamentos:</strong> Antidepressivos, estabilizadores de humor.</p><p><strong>Intervenções severas:</strong> TEC, estimulação magnética.</p>`
        }
      ]
    }
    return []
  }

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando teste...</p>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (error || !test) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || 'Teste não encontrado'}</p>
              <Link href="/testes">
                <Button variant="outline">Voltar para Testes</Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  if (showResults && testResult) {
    return (
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teste Concluído com Sucesso!</h1>
            <p className="text-gray-600">Aqui está sua análise detalhada de saúde mental</p>
          </div>

          {/* Main Score Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{test?.title}</h2>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className={`${testResult.color} bg-opacity-10 text-base px-4 py-2`}>
                    {testResult.severity}
                  </Badge>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{new Date(testResult.completedAt).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{testResult.percentage}%</div>
                    <p className="text-sm text-gray-600">Pontuação Total</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{testResult.score}/{testResult.maxScore}</div>
                    <p className="text-sm text-gray-600">Pontos Obtidos</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-4xl font-bold text-green-600 mb-2">{questions.length}</div>
                    <p className="text-sm text-gray-600">Perguntas</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Nível de {testResult.severity.toLowerCase()}</span>
                    <span>{testResult.percentage}%</span>
                  </div>
                  <Progress value={testResult.percentage} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Interpretation Card */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl">Interpretação dos Resultados</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {testResult.interpretation}
                </p>
                <div className={`p-4 rounded-lg ${testResult.color} bg-opacity-10`}>
                  <p className={`font-semibold ${testResult.color}`}>
                    Nível: {testResult.severity}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights Card */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-xl">Insights Personalizados</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {testResult.recommendations}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Gerado por IA com base em evidências científicas</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Criar Conta</h3>
                <p className="text-sm text-gray-600 mb-4">Salve seus resultados e acompanhe sua evolução</p>
                <Button className="w-full" onClick={() => setShowAuthModal(true)}>
                  {user ? 'Ver Minha Conta' : 'Criar Conta Gratuita'}
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Baixar PDF</h3>
                <p className="text-sm text-gray-600 mb-4">Exporte seus resultados em PDF</p>
                <PDFGenerator 
                  testResult={testResult}
                  test={test}
                  questions={questions}
                />
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Compartilhar</h3>
                <p className="text-sm text-gray-600 mb-4">Compartilhe com um profissional</p>
                <ShareResults 
                  testResult={testResult}
                  test={test}
                />
              </CardContent>
            </Card>
          </div>

          {/* Professional Help Section */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-0 shadow-md mb-8">
            <CardContent className="p-8">
              <div className="text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Precisa de Ajuda Profissional?</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Nossos resultados são uma ferramenta de autoavaliação. Se você está enfrentando dificuldades, 
                  recomendamos procurar um psicólogo ou psiquiatra para uma avaliação completa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-500 hover:bg-red-600">
                    <Mail className="h-4 w-4 mr-2" />
                    Encontrar Profissional
                  </Button>
                  <Button size="lg" variant="outline">
                    Agendar Consulta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/testes">
              <Button variant="outline" className="w-full sm:w-auto">
                Fazer Outro Teste
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full sm:w-auto">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/testes" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para Testes
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
            <p className="text-gray-600 mb-4">{test.description}</p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span>{questions.length} perguntas</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{test.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{currentQuestion + 1} de {questions.length}</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Pergunta {currentQuestion + 1}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentQ?.text}
              </p>
            </div>

            {/* Answer Options */}
            <RadioGroup
              value={answers[currentQ?.id || '']?.toString()}
              onValueChange={(value) => handleAnswerChange(currentQ?.id || '', value)}
              className="space-y-3"
            >
              {currentQ?.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={option.id} />
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            disabled={answers[currentQ?.id || ''] === undefined || isSubmitting}
          >
            {isSubmitting ? (
              'Enviando...'
            ) : currentQuestion === questions.length - 1 ? (
              'Finalizar Teste'
            ) : (
              <>
                Próxima
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* SEO FAQ Section */}
        {getSEOContent().length > 0 && (
          <div className="mt-12 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Saiba Mais Sobre Este Teste</h2>
              <p className="text-gray-600">Informações detalhadas para entender melhor a avaliação</p>
            </div>
            <AccordionFAQ items={getSEOContent()} />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </LayoutWrapper>
  )

  // Add Auth Modal
  if (showAuthModal && testResult) {
    return (
      <TestResultAuth
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        testResult={testResult}
      />
    )
  }
}