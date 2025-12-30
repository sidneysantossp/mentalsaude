import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Clock, Users, Shield, ChevronRight, Brain, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import Link from 'next/link'
import { testsInfo } from '@/lib/tests-info'

export const metadata: Metadata = {
  title: 'Como Funciona o SPIN | Mental Saúde',
  description: 'SPIN: como funciona o teste de fobia social? Entenda as 17 perguntas, pontuação e para quem é indicado. Guia completo da metodologia validada.',
  keywords: ['SPIN como funciona', 'teste fobia social', 'metodologia SPIN', 'saúde mental'],
}

export default function SPINComoFuncionaPage() {
  const testInfo = testsInfo['teste-fobia-social']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-y-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Início</Link>
          <span>/</span>
          <Link href="/testes" className="hover:text-gray-900">Testes</Link>
          <span>/</span>
          <Link href="/testes/teste-fobia-social" className="hover:text-gray-900">Teste de Fobia Social</Link>
          <span>/</span>
          <span className="text-gray-900">Como Funciona</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <FileText className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Como Funciona o SPIN
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda a metodologia, estrutura e aplicação deste instrumento de avaliação
          </p>
        </div>

        {/* Resumo Rápido */}
        <Card className="mb-8 bg-indigo-50 border-indigo-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-indigo-900 mb-3">Resumo em 8 linhas</h2>
            <p className="text-indigo-800 text-sm leading-relaxed">
              O SPIN é questionário autoaplicável com 17 perguntas sobre ansiedade social. 
              Cada resposta recebe pontuação 0-4 baseada na frequência. Pontuação total 0-68 indica gravidade. 
              Avalia medo, evitamento e sintomas físicos em situações sociais. 
              Desenvolvido para settings clínicos, leva 10 minutos. Sensibilidade 80% e especificidade 85% 
              para transtorno de ansiedade social.
            </p>
          </CardContent>
        </Card>

        {/* Estrutura do Teste */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Estrutura e Formato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O Social Phobia Inventory (SPIN) foi projetado para avaliar os múltiplos aspectos 
              da ansiedade social de forma sistemática e validada:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Formato das Perguntas</h4>
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Cada pergunta avalia a frequência de sintomas na última semana:
                  </p>
                  <div className="bg-white border rounded p-3 text-sm">
                    <p className="font-medium mb-2">"Nas últimas semanas, com que frequência..."</p>
                    <p className="text-gray-600">[sintoma específico de ansiedade social]</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Opções de Resposta</h4>
                <div className="bg-gray-50 border rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Nenhuma vez</span>
                      <span className="font-bold text-indigo-600">0</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Raramente</span>
                      <span className="font-bold text-indigo-600">1</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Às vezes</span>
                      <span className="font-bold text-indigo-600">2</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Frequentemente</span>
                      <span className="font-bold text-indigo-600">3</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border rounded p-2">
                      <span className="text-sm">Sempre</span>
                      <span className="font-bold text-indigo-600">4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* As 3 Dimensões Avaliadas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              As 3 Dimensões Avaliadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                O SPIN avalia três dimensões principais da ansiedade social:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h4 className="font-semibold text-gray-900">Medo</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Avalia medo de situações sociais e preocupação com o que os outros pensam.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Itens 1-6 (6 perguntas)
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <h4 className="font-semibold text-gray-900">Evitamento</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Mede a tendência de evitar situações sociais por ansiedade.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Itens 7-12 (6 perguntas)
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <h4 className="font-semibold text-gray-900">Sintomas Físicos</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Avalia manifestações físicas da ansiedade em contextos sociais.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Itens 13-17 (5 perguntas)
                  </p>
                </div>
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
                      <li>• Suspeita de ansiedade social</li>
                      <li>• Avaliação inicial em clínica</li>
                      <li>• Monitoramento de tratamento</li>
                      <li>• Triagem em cuidados primários</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-yellow-50">
                    <h5 className="font-medium text-yellow-900 mb-2">Cuidados Necessários</h5>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>• Adolescentes (validação limitada)</li>
                      <li>• Comorbidades psiquiátricas</li>
                      <li>• Condições médicas crônicas</li>
                      <li>• Contexto cultural específico</li>
                      <li>• Analfabetismo funcional</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contextos de Uso</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-indigo-600">🏥</span>
                    </div>
                    <h5 className="font-medium text-sm">Clínica</h5>
                    <p className="text-xs text-gray-600 mt-1">Avaliação especializada</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600">👥</span>
                    </div>
                    <h5 className="font-medium text-sm">Grupos</h5>
                    <p className="text-xs text-gray-600 mt-1">Terapia em grupo</p>
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
                      <span>Explicar o propósito e confidencialidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Ambiente tranquilo e sem interrupções</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Verificar compreensão das instruções</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Garantir tempo suficiente (10-15 min)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Durante o Teste</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Responder sobre as últimas semanas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Ser honesto e consistente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Não demorar excessivamente em cada item</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Responder a todas as 17 perguntas</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-900 mb-2">Dicas para Resposta Precisa</h4>
                <ul className="space-y-1 text-sm text-indigo-800">
                  <li>• Pense em um "dia típico" das últimas semanas</li>
                  <li>• Não se baseie apenas no humor do dia do teste</li>
                  <li>• Considere diferentes situações sociais</li>
                  <li>• Se estiver em tratamento, pense antes das intervenções</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validação e Propriedades */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Validação e Propriedades Psicométricas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Propriedades Psicométricas</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Confiabilidade</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Alfa de Cronbach: 0.92-0.94</li>
                      <li>• Teste-reteste: 0.83-0.89</li>
                      <li>• Consistência interna excelente</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Validade</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Validade de construto estabelecida</li>
                      <li>• Correlação com outros instrumentos</li>
                      <li>• Sensibilidade a mudanças no tratamento</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Pontos de Corte Validados</h4>
                <p className="text-sm text-green-800 mb-3">
                  Estudos brasileiros estabeleceram pontos de corte específicos para a população:
                </p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• {'>'} 19: sugestivo de transtorno de ansiedade social</li>
                  <li>• {'>'} 30: indicativo de ansiedade social moderada-grave</li>
                  <li>• {'>'} 40: indicativo de ansiedade social grave</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas Frequentes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-600" />
              Perguntas Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Quanto tempo leva para responder?</h4>
                <p className="text-sm text-gray-600">
                  Geralmente de 8 a 12 minutos. A maioria completa em menos de 15 minutos.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Posso fazer o teste sozinho?</h4>
                <p className="text-sm text-gray-600">
                  Sim, o SPIN foi desenvolvido como autoaplicável. No entanto, os resultados 
                  devem ser discutidos com profissional de saúde mental.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Com que frequência posso fazer o teste?</h4>
                <p className="text-sm text-gray-600">
                  Para monitoramento, a cada 4-6 semanas durante tratamento. 
                  Para triagem, anualmente ou quando houver preocupação.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">O teste funciona em outras línguas?</h4>
                <p className="text-sm text-gray-600">
                  Sim, o SPIN foi validado em mais de 20 idiomas, incluindo português do Brasil 
                  com propriedades psicométricas mantidas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navegação */}
        <Card className="bg-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Explore o Ecossistema SPIN</h3>
                <div className="space-y-2">
                  <Link href="/testes/teste-fobia-social" className="block text-sm hover:text-indigo-100">
                    ← Voltar para página principal do SPIN
                  </Link>
                  <Link href="/testes/teste-fobia-social/pontuacao" className="block text-sm hover:text-indigo-100">
                    → Guia completo de pontuação
                  </Link>
                  <Link href="/testes/teste-fobia-social/validacao" className="block text-sm hover:text-indigo-100">
                    → Evidências científicas
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3">Pronto para testar?</h3>
                <Link href="/testes/teste-fobia-social">
                  <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
                    <Brain className="h-4 w-4 mr-2" />
                    Fazer Teste SPIN
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
