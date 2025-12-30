import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Clock, Users, Shield, ChevronRight, Brain, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Como Funciona o PHQ-9 | Mental Saúde',
  description: 'Entenda detalhadamente como funciona o teste PHQ-9, suas perguntas, metodologia e para quem é indicado.',
  keywords: ['PHQ-9 como funciona', 'teste depressão', 'metodologia PHQ-9', 'saúde mental'],
}

export default function PHQ9ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Início</Link>
          <span>/</span>
          <Link href="/depressao" className="hover:text-gray-900">Depressão</Link>
          <span>/</span>
          <Link href="/phq-9" className="hover:text-gray-900">PHQ-9</Link>
          <span>/</span>
          <span className="text-gray-900">Como Funciona</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Como Funciona o PHQ-9
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda a metodologia, estrutura e aplicação deste instrumento de triagem
          </p>
        </div>

        {/* Resumo Rápido */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-3">Resumo em 8 linhas</h2>
            <p className="text-blue-800 text-sm leading-relaxed">
              O PHQ-9 é um questionário autoaplicável com 9 perguntas sobre sintomas depressivos 
              das últimas duas semanas. Cada resposta recebe pontuação 0-3 baseada na frequência. 
              Pontuação total indica gravidade (0-4 mínimo, 5-9 leve, 10-14 moderado, 15-19 moderadamente grave, 20-27 grave). 
              Inclui item adicional sobre funcionamento. Desenvolvido para cuidados primários, 
              leva 5 minutos e tem sensibilidade 80% e especificidade 92% para depressão maior.
            </p>
          </CardContent>
        </Card>

        {/* Estrutura do Teste */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Estrutura e Formato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O PHQ-9 foi projetado para ser simples, rápido e clinicamente relevante:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Formato das Perguntas</h4>
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Cada pergunta segue o padrão:
                  </p>
                  <div className="bg-white border rounded p-3 text-sm">
                    <p className="font-medium mb-2">"Nas últimas duas semanas, com que frequência você foi incomodado por..."</p>
                    <p className="text-gray-600">[sintoma específico]</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Opções de Resposta</h4>
                <div className="bg-gray-50 border rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Nenhuma vez</span>
                      <span className="font-bold text-blue-600">0</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Vários dias</span>
                      <span className="font-bold text-blue-600">1</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Mais da metade dos dias</span>
                      <span className="font-bold text-blue-600">2</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Quase todos os dias</span>
                      <span className="font-bold text-blue-600">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* As 9 Perguntas Detalhadas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              As 9 Perguntas em Detalhe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h4 className="font-semibold text-gray-900">Humor Deprimido</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Pouco interesse ou prazer em fazer as coisas"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Avalia anedonia - perda de interesse em atividades normalmente prazerosas
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <h4 className="font-semibold text-gray-900">Tristeza</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Se sentiu para baixo, deprimido ou sem esperança"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Sintoma central da depressão - humor triste persistente
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <h4 className="font-semibold text-gray-900">Sono</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Dificuldade para pegar no sono ou dormir mais que o habitual"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Avalia insônia ou hipersonia - alterações do padrão de sono
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <h4 className="font-semibold text-gray-900">Energia</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Se sentiu cansado ou com pouca energia"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Fadiga - sintoma físico comum na depressão
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                    <h4 className="font-semibold text-gray-900">Apetite</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Comeu pouco ou comeu demais"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Alterações no apetite e consequentemente no peso
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                    <h4 className="font-semibold text-gray-900">Autoestima</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Se sentiu mal consigo mesmo ou que é um fracasso"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Sentimentos de culpa ou inutilidade excessivos
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">7</span>
                    <h4 className="font-semibold text-gray-900">Concentração</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Dificuldade de se concentrar nas coisas"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Problemas cognitivos - atenção e memória
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">8</span>
                    <h4 className="font-semibold text-gray-900">Psicomotricidade</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Se moveu ou falou mais devagar que o normal"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Lentidão psicomotora ou agitação
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-bold">9</span>
                    <h4 className="font-semibold text-gray-900">Ideação Suicida</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Pensou em se ferir ou que estaria melhor morto"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Item crítico - avaliação de risco suicida
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Item 10 - Funcionamento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Item 10: Avaliação de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                Além dos 9 itens, o PHQ-9 inclui uma avaliação do impacto dos sintomas:
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">Pergunta de Funcionamento</h4>
                <p className="text-sm text-green-800 mb-3">
                  "Se você marcou algum problema, quão difícil esses problemas tornaram seu trabalho, 
                  atividades em casa, ou relacionamentos com outras pessoas?"
                </p>
                
                <div className="grid md:grid-cols-4 gap-3">
                  <div className="bg-white border rounded p-3 text-center">
                    <div className="font-bold text-green-700">Nada difícil</div>
                    <div className="text-xs text-gray-600">Funcionamento preservado</div>
                  </div>
                  <div className="bg-white border rounded p-3 text-center">
                    <div className="font-bold text-yellow-700">Um pouco difícil</div>
                    <div className="text-xs text-gray-600">Impacto leve</div>
                  </div>
                  <div className="bg-white border rounded p-3 text-center">
                    <div className="font-bold text-orange-700">Muito difícil</div>
                    <div className="text-xs text-gray-600">Impacto significativo</div>
                  </div>
                  <div className="bg-white border rounded p-3 text-center">
                    <div className="font-bold text-red-700">Extremamente difícil</div>
                    <div className="text-xs text-gray-600">Impacto severo</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Importância do Funcionamento</h4>
                <p className="text-sm text-blue-800">
                  Esta avaliação ajuda a entender o impacto real dos sintomas na vida do paciente, 
                  complementando a pontuação de gravidade com uma medida prática de prejuízo funcional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Para Quem é Indicado */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Para Quem é Indicado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">População Alvo</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <h5 className="font-medium text-green-900 mb-2">Ideal Para</h5>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li>• Adultos (18+ anos)</li>
                      <li>• Cuidados primários</li>
                      <li>• Triagem inicial</li>
                      <li>• Monitoramento de tratamento</li>
                      <li>• Pesquisas clínicas</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-yellow-50">
                    <h5 className="font-medium text-yellow-900 mb-2">Cuidados Necessários</h5>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>• Adolescentes (validação limitada)</li>
                      <li>• Idosos (sintomas atípicos)</li>
                      <li>• Comorbidades psiquiátricas</li>
                      <li>• Condições médicas crônicas</li>
                      <li>• Gravidez e pós-parto</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contextos de Uso</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600">🏥</span>
                    </div>
                    <h5 className="font-medium text-sm">Clínica Médica</h5>
                    <p className="text-xs text-gray-600 mt-1">Triagem em consultas</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600">🧠</span>
                    </div>
                    <h5 className="font-medium text-sm">Saúde Mental</h5>
                    <p className="text-xs text-gray-600 mt-1">Avaliação especializada</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600">💻</span>
                    </div>
                    <h5 className="font-medium text-sm">Autoavaliação</h5>
                    <p className="text-xs text-gray-600 mt-1">Monitoramento pessoal</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processo de Aplicação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Processo de Aplicação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Antes do Teste</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Explicar o propósito do teste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Garantir privacidade e confidencialidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Verificar capacidade de compreensão</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Disponibilizar ambiente tranquilo</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Durante o Teste</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Responder honestamente sobre as últimas 2 semanas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Não demorar muito em cada pergunta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Se necessário, pedir esclarecimentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Responder a todas as perguntas</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Dicas para Resposta Precisa</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Considere um "dia típico" das últimas duas semanas</li>
                  <li>• Não se baseie apenas no humor do dia do teste</li>
                  <li>• Se estiver sob influência de álcool, adie o teste</li>
                  <li>• Se estiver muito estressado, considere o contexto</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas Frequentes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Perguntas Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Quanto tempo leva para responder?</h4>
                <p className="text-sm text-gray-600">
                  Geralmente de 3 a 5 minutos. A maioria das pessoas completa em menos de 10 minutos.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Posso fazer o teste sozinho?</h4>
                <p className="text-sm text-gray-600">
                  Sim, o PHQ-9 foi desenvolvido como um instrumento autoaplicável. No entanto, 
                  os resultados devem ser discutidos com um profissional de saúde.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Com que frequência posso fazer o teste?</h4>
                <p className="text-sm text-gray-600">
                  Para monitoramento, pode ser feito a cada 2-4 semanas durante tratamento. 
                  Para triagem geral, anualmente ou quando houver preocupação com sintomas.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">O teste funciona em outras línguas?</h4>
                <p className="text-sm text-gray-600">
                  Sim, o PHQ-9 foi validado em mais de 30 idiomas, incluindo português do Brasil. 
                  A versão brasileira mantém as propriedades psicométricas do original.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navegação */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Explore o Ecossistema PHQ-9</h3>
                <div className="space-y-2">
                  <Link href="/phq-9" className="block text-sm hover:text-blue-100">
                    ← Voltar para página principal do PHQ-9
                  </Link>
                  <Link href="/phq-9/pontuacao" className="block text-sm hover:text-blue-100">
                    → Guia completo de pontuação
                  </Link>
                  <Link href="/phq-9/validacao" className="block text-sm hover:text-blue-100">
                    → Evidências científicas
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3">Pronto para testar?</h3>
                <Link href="/testes/teste-de-depressao">
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Brain className="h-4 w-4 mr-2" />
                    Fazer Teste PHQ-9
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
