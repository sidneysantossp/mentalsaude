import { Brain, MessageCircle, Search, Volume2 } from 'lucide-react'

const voiceSearchOptimization = {
  // Perguntas comuns para busca por voz
  voiceQueries: {
    'compulsao-alimentar': [
      'como saber se tenho compulsão alimentar',
      'teste online de compulsão alimentar',
      'quais são os sintomas de transtorno alimentar',
      'avaliação gratuita de binge eating',
      'como parar de comer compulsivamente'
    ],
    'depressao': [
      'como saber se estou deprimido',
      'teste de depressão online gratuito',
      'quais os sintomas de depressão',
      'avaliação de saúde mental depressão',
      'teste phq-9 online'
    ],
    'fobia-social': [
      'como saber se tenho fobia social',
      'teste de ansiedade social online',
      'como superar medo de falar em público',
      'avaliação de ansiedade social gratuita',
      'sintomas de fobia social'
    ],
    'insonia': [
      'como saber se tenho insônia',
      'teste de distúrbios do sono online',
      'avaliação gratuita de problemas de sono',
      'como melhorar qualidade do sono',
      'teste isi insônia online'
    ],
    'burnout': [
      'como saber se estou com burnout',
      'teste de esgotamento profissional',
      'sintomas de síndrome de burnout',
      'avaliação gratuita de estresse trabalho',
      'como prevenir burnout'
    ],
    'estresse': [
      'como medir meu nível de estresse',
      'teste de estresse online gratuito',
      'sintomas de estresse crônico',
      'avaliação de tensão emocional',
      'como reduzir estresse rapidamente'
    ],
    'sindrome-impostor': [
      'como saber se tenho síndrome do impostor',
      'teste de impostor syndrome online',
      'sintomas de sentir fraude profissional',
      'como superar síndrome do impostor',
      'avaliação de autoconfiança profissional'
    ],
    'tdah': [
      'como saber se tenho TDAH adulto',
      'teste de déficit de atenção online',
      'sintomas de TDAH em adultos',
      'avaliação gratuita de hiperatividade',
      'teste asrs tdah online'
    ],
    'toc': [
      'como saber se tenho TOC',
      'teste de transtorno obsessivo compulsivo',
      'sintomas de obsessões e compulsões',
      'avaliação gratuita de TOC',
      'como tratar transtorno obsessivo'
    ],
    'transtorno-afetivo-bipolar': [
      'como saber se sou bipolar',
      'teste de transtorno bipolar online',
      'sintomas de mania e depressão',
      'avaliação de humor bipolar',
      'teste mdq bipolar online'
    ],
    'transtorno-ansiedade': [
      'como saber se tenho transtorno de ansiedade',
      'teste de ansiedade generalizada',
      'sintomas de preocupação excessiva',
      'avaliação gratuita de gad-7',
      'como controlar ansiedade crônica'
    ],
    'depressao-maior': [
      'como saber se tenho depressão maior',
      'teste de transtorno depressivo maior',
      'diferença depressão e depressão maior',
      'avaliação clínica depressão dsm-5',
      'sintomas graves de depressão'
    ]
  },

  // Respostas otimizadas para SGE
  sgeAnswers: {
    'compulsao-alimentar': {
      main: 'A compulsão alimentar é caracterizada por episódios recorrentes de ingestão excessiva de alimentos acompanhados por sensação de perda de controle.',
      keyPoints: [
        'Episódios de comer grandes quantidades rapidamente',
        'Sensação de perda de controle durante alimentação',
        'Sentimentos de culpa ou vergonha após comer',
        'Comer escondido ou sozinho',
        'Impacto negativo na qualidade de vida'
      ],
      nextSteps: [
        'Faça nossa avaliação gratuita baseada na BES',
        'Consulte um profissional de saúde mental',
        'Busque grupos de apoio especializados',
        'Considere acompanhamento nutricional'
      ]
    },
    'depressao': {
      main: 'A depressão é um transtorno de humor que causa sentimentos persistentes de tristeza e perda de interesse.',
      keyPoints: [
        'Humor deprimido na maior parte do dia',
        'Perda de interesse ou prazer nas atividades',
        'Fadiga e perda de energia',
        'Alterações no sono e apetite',
        'Dificuldade de concentração'
      ],
      nextSteps: [
        'Faça o teste PHQ-9 gratuito',
        'Converse com um profissional de saúde',
        'Mantenha uma rotina de exercícios',
        'Busque apoio de amigos e familiares'
      ]
    }
    // ... adicionar para outras categorias
  },

  // Perguntas follow-up para engajamento
  followUpQuestions: {
    general: [
      'Quais são os principais sintomas?',
      'Como é feito o diagnóstico?',
      'Qual o tratamento mais eficaz?',
      'Como prevenir esta condição?',
      'Quando procurar ajuda profissional?'
    ],
    specific: {
      'compulsao-alimentar': [
        'Qual a diferença entre compulsão alimentar e comer demais?',
        'A compulsão alimentar tem cura?',
        'Como ajudar alguém com transtorno alimentar?'
      ],
      'depressao': [
        'Depressão é igual a tristeza?',
        'Como ajudar alguém com depressão?',
        'Antidepressivos são necessários?'
      ]
    }
  }
}

export default function VoiceSearchContent({ category }: { category: string }) {
  const categoryQueries = voiceSearchOptimization.voiceQueries[category as keyof typeof voiceSearchOptimization.voiceQueries] || []
  const sgeData = voiceSearchOptimization.sgeAnswers[category as keyof typeof voiceSearchOptimization.sgeAnswers]

  return (
    <div className="space-y-8">
      {/* Seção de Busca por Voz */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center mb-6">
          <Volume2 className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Perguntas Comuns por Voz</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {categoryQueries.map((query, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Search className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-700 italic">"{query}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção SGE */}
      {sgeData && (
        <section className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <Brain className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Resposta Detalhada</h3>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-800 font-medium mb-6">
              {sgeData.main}
            </p>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Pontos Principais:</h4>
              <ul className="space-y-2">
                {sgeData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Próximos Passos:</h4>
              <ul className="space-y-2">
                {sgeData.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Perguntas Follow-up */}
      <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center mb-6">
          <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Outras Perguntas que Você Pode Ter</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Perguntas Gerais:</h4>
            <ul className="space-y-2">
              {voiceSearchOptimization.followUpQuestions.general.map((question, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{question}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Perguntas Específicas:</h4>
            <ul className="space-y-2">
              {voiceSearchOptimization.followUpQuestions.specific[category as keyof typeof voiceSearchOptimization.followUpQuestions.specific]?.map((question, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{question}</span>
                </li>
              )) || (
                <li className="text-gray-500 italic">Perguntas específicas em desenvolvimento...</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}