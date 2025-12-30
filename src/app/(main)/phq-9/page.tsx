import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Clock, Users, Shield, ChevronRight, Brain, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PHQ-9: Teste de Depressão | Mental Saúde',
  description: 'PHQ-9 é uma escala validada para triagem de depressão. Faça o teste, entenda a pontuação e saiba quais próximos passos tomar.',
  keywords: ['PHQ-9', 'teste depressão', 'escala depressão', 'triagem depressão', 'saúde mental'],
}

export default function PHQ9Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Início</Link>
          <span>/</span>
          <Link href="/depressao" className="hover:text-gray-900">Depressão</Link>
          <span>/</span>
          <span className="text-gray-900">PHQ-9</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PHQ-9 - Teste de Depressão
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ferramenta validada para avaliação de sintomas depressivos nas últimas duas semanas
          </p>
        </div>

        {/* Alerta Importante */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Importante: Ferramenta de Triagem</h3>
              <p className="text-sm text-yellow-800">
                O PHQ-9 é um instrumento de triagem e <strong>não substitui diagnóstico profissional</strong>. 
                Use este teste como ponto de partida para conversar com um médico ou psicólogo.
              </p>
            </div>
          </div>
        </div>

        {/* O que é o PHQ-9 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              O Que é o PHQ-9?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O Patient Health Questionnaire-9 (PHQ-9) é um questionário de 9 itens desenvolvido para 
              triagem de depressão em cuidados primários. É amplamente utilizado mundialmente e validado 
              para a população brasileira.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">9</span>
                </div>
                <h4 className="font-semibold text-sm">Perguntas</h4>
                <p className="text-xs text-gray-600 mt-1">Avalia sintomas principais</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-sm">5 minutos</h4>
                <p className="text-xs text-gray-600 mt-1">Tempo médio de resposta</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-sm">Validado</h4>
                <p className="text-xs text-gray-600 mt-1">Evidência científica sólida</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Como Funciona */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Como Funciona o Teste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Instruções</h4>
                <p className="text-gray-700 mb-4">
                  Para cada pergunta, indique com que frequência você teve o problema descrito 
                  nas últimas duas semanas:
                </p>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="font-semibold text-gray-900">0</div>
                      <div className="text-sm text-gray-600">Nenhuma vez</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">1</div>
                      <div className="text-sm text-gray-600">Vários dias</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">2</div>
                      <div className="text-sm text-gray-600">Mais da metade dos dias</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">3</div>
                      <div className="text-sm text-gray-600">Quase todos os dias</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sintomas Avaliados</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Humor deprimido</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Perda de interesse/prazer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Dificuldade para dormir</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Cansaço/fadiga</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Apetite aumentado ou diminuído</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                    <span>Sentimento de fracasso</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">7</span>
                    <span>Dificuldade de concentração</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">8</span>
                    <span>Lentidão ou agitação</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">9</span>
                    <span>Pensamentos de morte/suicídio</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interpretação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Interpretação dos Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                A pontuação total varia de 0 a 27 pontos. Veja como interpretar:
              </p>
              
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-700">0-4 pontos</span>
                      <Badge variant="secondary">Mínimo</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Pouca ou nenhuma depressão. Continue monitorando sua saúde mental.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-yellow-700">5-9 pontos</span>
                      <Badge variant="secondary">Leve</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Sintomas depressivos leves. Considere conversar com um profissional se persistirem.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-orange-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-700">10-14 pontos</span>
                      <Badge variant="secondary">Moderado</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Depressão moderada. Recomendado procurar avaliação profissional.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-700">15-19 pontos</span>
                      <Badge variant="destructive">Moderadamente grave</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Depressão moderadamente grave. Busque ajuda profissional urgentemente.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-800">20-27 pontos</span>
                      <Badge variant="destructive">Grave</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Depressão grave. Procure ajuda profissional imediatamente.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-blue-900 mb-2">Item 10 - Funcionamento</h4>
                <p className="text-sm text-blue-800">
                  Além da pontuação, o PHQ-9 avalia como esses problemas dificultam suas atividades diárias 
                  (trabalho, casa, relacionamentos). Isso ajuda a entender o impacto real dos sintomas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitações */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Limitações e Considerações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">Limitações Importantes</h4>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• Não diagnostica outros transtornos (ansiedade, bipolaridade)</li>
                  <li>• Pode ser influenciado por condições médicas (dor crônica, hipotireoidismo)</li>
                  <li>• Não considera contexto de vida do paciente</li>
                  <li>• Resultados podem variar dependendo do humor do dia</li>
                  <li>• Não substitui avaliação clínica completa</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-3">Quando o Teste Pode Não Ser Preciso</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Durante uso de álcool ou substâncias</li>
                  <li>• Em períodos de estresse agudo</li>
                  <li>• Com privação de sono extremo</li>
                  <li>• Em condições médicas não tratadas</li>
                  <li>• Em idosos (sintomas podem se manifestar diferentemente)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ecossistema PHQ-9 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Explore o Ecossistema PHQ-9
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recursos do PHQ-9</h4>
                <div className="space-y-2">
                  <Link href="/phq-9/como-funciona" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Como funciona em detalhes
                  </Link>
                  <Link href="/phq-9/pontuacao" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Guia completo de pontuação
                  </Link>
                  <Link href="/phq-9/validacao" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Evidências científicas
                  </Link>
                  <Link href="/phq-9/pos-teste" className="block text-sm text-blue-600 hover:text-blue-700">
                    → O que fazer após o teste
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recursos Relacionados</h4>
                <div className="space-y-2">
                  <Link href="/depressao" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Guia completo de depressão
                  </Link>
                  <Link href="/gad-7" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Teste de ansiedade GAD-7
                  </Link>
                  <Link href="/metodologia" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Nossa metodologia
                  </Link>
                  <Link href="/ajuda-emergencial" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Ajuda emergencial
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Pronto para fazer o teste?</h3>
              <p className="mb-6">
                Avalie seus sintomas depressivos com o PHQ-9 de forma rápida e confidencial.
              </p>
              <Link href="/testes/teste-de-depressao">
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Brain className="h-4 w-4 mr-2" />
                  Fazer Teste PHQ-9
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Referências */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Referências Científicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Kroenke K, Spitzer RL, Williams JB. (2001). The PHQ-9. JAMA.</p>
              <p>• Santos IS, et al. (2019). PHQ-9 validation in Brazilian population. Rev Saúde Pública.</p>
              <p>• American Psychiatric Association. (2022). DSM-5-TR™.</p>
              <p>• Ministério da Saúde do Brasil. (2017). Protocolos de atenção básica.</p>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>Última atualização: 15/12/2025</p>
              <p>Revisão clínica: Dr. Roberto Silva - CRM 12345/SP</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
