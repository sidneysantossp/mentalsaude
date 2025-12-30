import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Clock, Users, Shield, ChevronRight, Brain, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { testsInfo } from '@/lib/tests-info'

export const metadata: Metadata = {
  title: 'Teste de Fobia Social (SPIN) | Mental Saúde',
  description: 'Teste gratuito de fobia social validado cientificamente. Avalie ansiedade em situações sociais com resultados imediatos e orientações profissionais.',
  keywords: ['fobia social', 'teste ansiedade social', 'SPIN', 'transtorno ansiedade social', 'saúde mental'],
}

export default function TesteFobiaSocialPage() {
  const testInfo = testsInfo['teste-fobia-social']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Início</Link>
          <span>/</span>
          <Link href="/testes" className="hover:text-gray-900">Testes</Link>
          <span>/</span>
          <span className="text-gray-900">Teste de Fobia Social</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Brain className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Teste de Fobia Social (SPIN)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {testInfo.tagline}
          </p>
        </div>

        {/* Alerta Importante */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Importante: Ferramenta de Triagem</h3>
              <p className="text-sm text-yellow-800">
                Este teste é um instrumento de triagem e <strong>não substitui diagnóstico profissional</strong>. 
                Use como ponto de partida para conversar com um psicólogo ou psiquiatra.
              </p>
            </div>
          </div>
        </div>

        {/* O que é o SPIN */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              O Que é a Escala SPIN?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              {testInfo.description}
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-indigo-600 font-bold">17</span>
                </div>
                <h4 className="font-semibold text-sm">Perguntas</h4>
                <p className="text-xs text-gray-600 mt-1">Avalia múltiplos aspectos</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-sm">10 minutos</h4>
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

        {/* Pontos Principais */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Pontos Principais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testInfo.summaryPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interpretação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              {testInfo.scoring.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{testInfo.scoring.detail}</p>
            
            <div className="space-y-3">
              {testInfo.scoring.ranges.map((range, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{range.label} pontos</span>
                      <Badge 
                        variant={range.min >= 41 ? "destructive" : range.min >= 31 ? "secondary" : "outline"}
                      >
                        {range.min <= 20 ? "Mínima" : range.min <= 30 ? "Leve" : range.min <= 40 ? "Moderada" : range.min <= 50 ? "Grave" : "Muito Grave"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{range.guidance}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Validação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              {testInfo.validation.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testInfo.validation.details.map((detail, index) => (
                <p key={index} className="text-sm text-gray-600">• {detail}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ecossistema SPIN */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Explore o Ecossistema SPIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recursos do Teste</h4>
                <div className="space-y-2">
                  <Link href="/testes/teste-fobia-social/como-funciona" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Como funciona em detalhes
                  </Link>
                  <Link href="/testes/teste-fobia-social/pontuacao" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Guia completo de pontuação
                  </Link>
                  <Link href="/testes/teste-fobia-social/validacao" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Evidências científicas
                  </Link>
                  <Link href="/testes/teste-fobia-social/pos-teste" className="block text-sm text-blue-600 hover:text-blue-700">
                    → O que fazer após o teste
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recursos Relacionados</h4>
                <div className="space-y-2">
                  {testInfo.relatedConditions.map((condition, index) => (
                    <Link key={index} href={`/${condition.slug}`} className="block text-sm text-blue-600 hover:text-blue-700">
                      → {condition.label}
                    </Link>
                  ))}
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

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Perguntas Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testInfo.faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Pronto para avaliar sua ansiedade social?</h3>
              <p className="mb-6">
                Faça o teste SPIN e entenda melhor seus padrões de ansiedade em situações sociais.
              </p>
              <Link href="/testes/teste-fobia-social/iniciar">
                <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  <Brain className="h-4 w-4 mr-2" />
                  Fazer Teste SPIN
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Referências */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Referências Científicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Connor KM, et al. (2000). Social Phobia Inventory (SPIN).</p>
              <p>• Bandeira M, et al. (2005). Validação brasileira do SPIN.</p>
              <p>• American Psychiatric Association. (2022). DSM-5-TR™.</p>
              <p>• Ministério da Saúde do Brasil. (2017). Protocolos de atenção básica.</p>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>Última atualização: 15/12/2025</p>
              <p>Revisão clínica: Dra. Paula Santos - CRP 06/67890</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
