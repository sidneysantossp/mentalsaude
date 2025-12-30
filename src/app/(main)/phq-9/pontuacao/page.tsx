import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Calculator, AlertTriangle, ChevronRight, Brain, TrendingUp, Shield, Info } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pontuação PHQ-9: Interpretação Completa | Mental Saúde',
  description: 'Guia completo para interpretar a pontuação do PHQ-9. Entenda cada nível de gravidade e o que fazer com seu resultado.',
  keywords: ['PHQ-9 pontuação', 'interpretação PHQ-9', 'níveis depressão', 'resultado teste depressão'],
}

export default function PHQ9PontuacaoPage() {
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
          <span className="text-gray-900">Pontuação</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interpretação da Pontuação PHQ-9
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda cada nível de gravidade e saiba como proceder com seu resultado
          </p>
        </div>

        {/* Resumo Rápido */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-3">Resumo em 8 linhas</h2>
            <p className="text-blue-800 text-sm leading-relaxed">
              Pontuação PHQ-9 varia 0-27. 0-4: mínima (monitoramento). 5-9: leve (autocuidado, observar). 
              10-14: moderada (avaliação profissional recomendada). 15-19: moderadamente grave (tratamento urgente). 
              20-27: grave (intervenção imediata). Item 9 (suicídio) sempre requer atenção especial, 
              mesmo com pontuação baixa. Funcionamento avaliado separadamente. Resultados devem ser 
              interpretados em contexto clínico completo.
            </p>
          </CardContent>
        </Card>

        {/* Tabela de Pontuação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
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
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold text-green-700">0-4</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Mínima</Badge>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm">Monitoramento, autocuidado</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold text-yellow-700">5-9</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Leve</Badge>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm">Observar, considerar ajuda</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold text-orange-700">10-14</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">Moderada</Badge>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm">Avaliação profissional recomendada</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold text-red-700">15-19</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <Badge variant="destructive">Moderadamente grave</Badge>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm">Tratamento urgente necessário</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold text-red-800">20-27</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <Badge variant="destructive">Grave</Badge>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm">Intervenção médica imediata</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalhamento por Nível */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Detalhamento por Nível de Gravidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Mínima */}
              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-700">0-4 pontos</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Mínima</Badge>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">O que significa</h4>
                    <p className="text-sm text-green-800">
                      Poucos ou nenhum sintoma depressivo. Funcionamento geralmente preservado.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Sintomas típicos</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Humor normal ou levemente baixo ocasionalmente</li>
                      <li>• Interesse mantido em atividades</li>
                      <li>• Sono e apetite normais</li>
                      <li>• Energia e concentração adequadas</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Recomendações</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Manter hábitos saudáveis</li>
                      <li>• Monitorar mudanças no humor</li>
                      <li>• Praticar autocuidado regular</li>
                      <li>• Reavaliar se sintomas persistirem</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Leve */}
              <div className="border rounded-lg p-4 bg-yellow-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-yellow-700">5-9 pontos</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Leve</Badge>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">!</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">O que significa</h4>
                    <p className="text-sm text-yellow-800">
                      Sintomas depressivos leves presentes, mas funcionamento ainda razoável.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Sintomas típicos</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Humor frequentemente para baixo</li>
                      <li>• Alguma perda de interesse</li>
                      <li>• Pequenas alterações de sono ou apetite</li>
                      <li>• Ligeira fadiga ou dificuldade de concentração</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Recomendações</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Aumentar autocuidado e atividades prazerosas</li>
                      <li>• Conversar com amigos ou familiares</li>
                      <li>• Considerar conversar com profissional</li>
                      <li>• Monitorar se sintomas pioram</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Moderada */}
              <div className="border rounded-lg p-4 bg-orange-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-700">10-14 pontos</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">Moderada</Badge>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">⚠</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">O que significa</h4>
                    <p className="text-sm text-orange-800">
                      Sintomas depressivos claros afetando significativamente o funcionamento.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">Sintomas típicos</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Humor deprimido na maior parte do tempo</li>
                      <li>• Perda clara de interesse e prazer</li>
                      <li>• Alterações notáveis de sono e apetite</li>
                      <li>• Fadiga significativa, dificuldade de concentração</li>
                      <li>• Possíveis sentimentos de culpa ou inutilidade</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">Recomendações</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Buscar avaliação profissional urgente</li>
                      <li>• Considerar tratamento (psicoterapia e/ou medicação)</li>
                      <li>• Informar pessoas próximas</li>
                      <li>• Evitar decisões importantes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Moderadamente Grave */}
              <div className="border rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-700">15-19 pontos</span>
                    <Badge variant="destructive">Moderadamente grave</Badge>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">‼</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">O que significa</h4>
                    <p className="text-sm text-red-800">
                      Sintomas depressivos severos com prejuízo funcional significativo.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Sintomas típicos</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Humor muito deprimido quase diariamente</li>
                      <li>• Quase nenhum interesse ou prazer</li>
                      <li>• Alterações graves de sono e apetite</li>
                      <li>• Fadiga extrema, dificuldade de funcionar</li>
                      <li>• Sentimentos intensos de inutilidade</li>
                      <li>• Possíveis pensamentos de morte</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Recomendações</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Buscar ajuda médica imediata</li>
                      <li>• Tratamento combinado geralmente necessário</li>
                      <li>• Considerar afastamento temporário do trabalho</li>
                      <li>• Apoio familiar essencial</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Grave */}
              <div className="border rounded-lg p-4 bg-red-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-800">20-27 pontos</span>
                    <Badge variant="destructive">Grave</Badge>
                  </div>
                  <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                    <span className="text-red-800 font-bold">🚨</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">O que significa</h4>
                    <p className="text-sm text-red-800">
                      Depressão grave com incapacidade funcional e risco elevado.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Sintomas típicos</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Todos os sintomas depressivos presentes e intensos</li>
                      <li>• Incapacidade de realizar atividades básicas</li>
                      <li>• Isolamento social completo</li>
                      <li>• Pensamentos suicidas frequentes</li>
                      <li>• Possíveis sintomas psicóticos</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Recomendações</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Emergência médica - procurar hospital ou CAPS</li>
                      <li>• Não ficar sozinho</li>
                      <li>• Tratamento intensivo necessário</li>
                      <li>• Possível necessidade de internação</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Item 9 - Risco Suicida */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Atenção Especial: Item 9 (Risco Suicida)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">Por que o Item 9 é Especial</h4>
                <p className="text-sm text-red-800 mb-3">
                  O item 9 ("Pensou em se ferir ou que estaria melhor morto") é o único que 
                  requer atenção independente da pontuação total:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white border rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-red-700">Qualquer resposta {'>'} 0</span>
                      <Badge variant="destructive" className="text-xs">Atenção</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      Mesmo pontuação 1 ("vários dias") requer avaliação imediata de risco suicida.
                    </p>
                  </div>
                  
                  <div className="bg-white border rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-red-800">Resposta 2 ou 3</span>
                      <Badge variant="destructive" className="text-xs">Emergência</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Mais da metade dos dias" ou "quase todos os dias" indica risco elevado 
                      e requer intervenção urgente.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">O Que Fazer se Item 9 {'>'} 0</h4>
                <div className="space-y-2 text-sm text-orange-800">
                  <p>1. <strong>Não minimize</strong> - leve a sério qualquer pensamento sobre morte</p>
                  <p>2. <strong>Busque ajuda imediata</strong> - ligue 188 (CVV) ou procure emergência</p>
                  <p>3. <strong>Não fique sozinho</strong> - peça para alguém ficar com você</p>
                  <p>4. <strong>Remova riscos</strong> - afaste objetos perigosos</p>
                  <p>5. <strong>Seja honesto</strong> - informe profissionais sobre esses pensamentos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funcionamento vs Pontuação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Pontuação vs Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                A pontuação do PHQ-9 e o funcionamento avaliado no item 10 podem não corresponder:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-yellow-50">
                  <h4 className="font-semibold text-yellow-900 mb-2">Pontuação Alta, Funcionamento Preservado</h4>
                  <p className="text-sm text-yellow-800">
                    Pode indicar alta resiliência, suporte social forte, ou que a pessoa 
                    está "funcionando" mas com grande sofrimento interno.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-orange-50">
                  <h4 className="font-semibold text-orange-900 mb-2">Pontuação Baixa, Funcionamento Prejudicado</h4>
                  <p className="text-sm text-orange-800">
                    Pode indicar outras condições (ansiedade, problemas médicos) ou 
                    que a pessoa está minimizando sintomas.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Importância Clínica</h4>
                <p className="text-sm text-blue-800">
                  Profissionais consideram tanto a pontuação quanto o funcionamento 
                  para decidir sobre tratamento. Funcionamento prejudicado mesmo com 
                  pontuação moderada pode indicar necessidade de intervenção.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoramento e Mudanças */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Monitoramento e Mudanças na Pontuação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">O que Considerar Melhora</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Redução {'≥'} 5 pontos</strong> - resposta clínica significativa</li>
                  <li>• <strong>Pontuação {'≤'} 9</strong> - sintomas leves ou mínimos</li>
                  <li>• <strong>Pontuação {'≤'} 4</strong> - remissão (ideal)</li>
                  <li>• <strong>Melhora no funcionamento</strong> - item 10</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Frequência de Reavaliação</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-2">Durante Tratamento</h5>
                    <p className="text-sm text-gray-600">
                      Reavaliar a cada 2-4 semanas no início, depois a cada 2-3 meses.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium text-gray-900 mb-2">Após Remissão</h5>
                    <p className="text-sm text-gray-600">
                      Monitorar a cada 3-6 meses para detectar recaídas precocemente.
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
              <Info className="h-5 w-5 text-blue-600" />
              Perguntas Frequentes sobre Pontuação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Minha pontuação mudou muito em poucos dias. Isso é normal?</h4>
                <p className="text-sm text-gray-600">
                  Sim, o humor pode flutuar. Se mudanças forem extremas, considere fatores 
                  como estresse agudo, privação de sono ou uso de substâncias.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Posso ter depressão com pontuação baixa?</h4>
                <p className="text-sm text-gray-600">
                  Sim. Algumas pessoas com depressão (especialmente com sintomas atípicos) 
                  podem ter pontuações mais baixas. Avaliação profissional é essencial.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">O que significa pontuação zero?</h4>
                <p className="text-sm text-gray-600">
                  Indica ausência de sintomas depressivos nas últimas duas semanas. 
                  Continue monitorando sua saúde mental.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Como diferenciar tristeza normal de depressão pela pontuação?</h4>
                <p className="text-sm text-gray-600">
                  Tristeza normal geralmente resulta em pontuação ≤ 4, é reativa a eventos 
                  específicos e melhora com tempo. Depressão mantém pontuação ≥ 10 por semanas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Entendeu sua pontuação?</h3>
              <p className="mb-6">
                Se você ainda não fez o teste ou quer reavaliar seus sintomas:
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/testes/teste-de-depressao">
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Brain className="h-4 w-4 mr-2" />
                    Fazer Teste PHQ-9
                  </Button>
                </Link>
                <Link href="/phq-9/pos-teste">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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
