import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Calculator, AlertTriangle, ChevronRight, Brain, TrendingUp, Shield, Info } from 'lucide-react'
import Link from 'next/link'
import { testsInfo } from '@/lib/tests-info'

export const metadata: Metadata = {
  title: 'Pontuação SPIN: Interpretação Completa | Mental Saúde',
  description: 'Interprete sua pontuação SPIN: 0-20 mínima, 21-30 leve, 31-40 moderada, 41-50 grave, 51-68 muito grave. Saiba o que fazer com seu resultado de fobia social.',
  keywords: ['SPIN pontuação', 'interpretação SPIN', 'níveis fobia social', 'resultado teste fobia social'],
}

export default function SPINPontuacaoPage() {
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
          <span className="text-gray-900">Pontuação</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Calculator className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interpretação da Pontuação SPIN
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda cada nível de gravidade da ansiedade social e saiba como proceder com seu resultado
          </p>
        </div>

        {/* Resumo Rápido */}
        <Card className="mb-8 bg-indigo-50 border-indigo-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-indigo-900 mb-3">Resumo em 8 linhas</h2>
            <p className="text-indigo-800 text-sm leading-relaxed">
              Pontuação SPIN varia 0-68. 0-20: mínima (sem preocupações). 21-30: leve (técnicas de enfrentamento). 
              31-40: moderada (psicoterapia recomendada). 41-50: grave (tratamento intensivo). 
              51-68: muito grave (ajuda urgente). Cada item pontuado 0-4, soma indica nível de ansiedade social. 
              Resultados devem ser interpretados em contexto clínico completo com avaliação profissional.
            </p>
          </CardContent>
        </Card>

        {/* Tabela de Pontuação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-600" />
              Tabela de Pontuação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Pontuação</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Gravidade</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold">Recomendação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testInfo.scoring.ranges.map((range, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-3 font-bold text-indigo-700">{range.label}</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <Badge 
                            variant={range.min >= 41 ? "destructive" : range.min >= 31 ? "secondary" : "outline"}
                          >
                            {range.min <= 20 ? "Mínima" : range.min <= 30 ? "Leve" : range.min <= 40 ? "Moderada" : range.min <= 50 ? "Grave" : "Muito Grave"}
                          </Badge>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-sm">{range.guidance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        
        
        {/* Monitoramento e Progresso */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Monitoramento e Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">O que Considerar Melhora</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Redução {'≥'} 10 pontos</strong> - resposta clínica significativa</li>
                  <li>• <strong>Pontuação {'≤'} 30</strong> - sintomas leves ou mínimos</li>
                  <li>• <strong>Pontuação {'≤'} 20</strong> - remissão (ideal)</li>
                  <li>• <strong>Melhora no funcionamento</strong> - social e ocupacional</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Frequência de Reavaliação</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-2">Durante Tratamento</h5>
                    <p className="text-sm text-gray-600">
                      Reavaliar a cada 4-6 semanas para monitorar progresso.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-2">Após Remissão</h5>
                    <p className="text-sm text-gray-600">
                      Monitorar a cada 3-6 meses para detectar recaídas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas Frequentes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-600" />
              Perguntas Frequentes sobre Pontuação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Minha pontuação mudou muito em poucas semanas. Isso é normal?</h4>
                <p className="text-sm text-gray-600">
                  Sim, a ansiedade social pode flutuar com situações específicas. Mudanças extremas podem indicar 
                  resposta ao tratamento ou estresse agudo.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Posso ter fobia social com pontuação baixa?</h4>
                <p className="text-sm text-gray-600">
                  Sim. Algumas pessoas com fobia social podem subestimar sintomas ou ter 
                  boa capacidade de enfrentamento, resultando em pontuações mais baixas.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">O que significa pontuação zero?</h4>
                <p className="text-sm text-gray-600">
                  Indica ausência de sintomas significativos de ansiedade social. Continue 
                  monitorando sua saúde mental e buscando informações preventivas.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Como diferenciar timidez de fobia social pela pontuação?</h4>
                <p className="text-sm text-gray-600">
                  Timidez geralmente resulta em pontuação {'≤'} 20, é reativa e não prejudica funcionamento. 
                  Fobia social mantém pontuação {'≥'} 31 por semanas e interfere significativamente na vida.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Entendeu sua pontuação?</h3>
              <p className="mb-6">
                Se você ainda não fez o teste ou quer reavaliar seus sintomas:
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/testes/teste-fobia-social">
                  <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
                    <Brain className="h-4 w-4 mr-2" />
                    Fazer Teste SPIN
                  </Button>
                </Link>
                <Link href="/testes/teste-fobia-social/pos-teste">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Próximos Passos
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
