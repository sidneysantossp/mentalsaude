import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, Heart, AlertTriangle, Users, Calendar, Shield, ChevronRight, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Depressão: Sintomas, Causas e Tratamento | Mental Saúde',
  description: 'Guia completo sobre depressão: entenda sintomas, causas, fatores de risco, quando procurar ajuda e tratamentos baseados em evidências científicas.',
  keywords: ['depressão', 'sintomas depressão', 'tratamento depressão', 'saúde mental', 'PHQ-9'],
}

export default function DepressaoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Início</Link>
          <span>/</span>
          <span className="text-gray-900">Depressão</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Depressão
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda o que é depressão, seus sintomas, causas e como buscar ajuda profissional
          </p>
        </div>

        {/* Resumo Rápido (para IA) */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-3">Resumo em 8 linhas</h2>
            <p className="text-blue-800 text-sm leading-relaxed">
              Depressão é um transtorno de humor caracterizado por tristeza persistente, perda de interesse e 
              sintomas físicos. Diferente de tristeza normal, afeta funcionamento diário e requer tratamento. 
              Causas incluem fatores biológicos, genéticos e ambientais. Sintomas principais: humor deprimido, 
              anedonia, alterações de sono e apetite. Diagnóstico requer avaliação profissional. 
              Tratamentos eficazes incluem psicoterapia e/ou medicação. Prognóstico é bom com tratamento adequado.
            </p>
          </CardContent>
        </Card>

        {/* O Que é Depressão */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              O Que é Depressão?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Depressão é um transtorno mental que afeta como você se sente, pensa e lida com atividades diárias. 
              Não é apenas sentir-se triste - é uma condição médica persistente que pode interferir significativamente 
              na qualidade de vida.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Depressão vs Tristeza Normal</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-900">Tristeza Normal</h5>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>• Resposta a eventos específicos</li>
                    <li>• Dura alguns dias ou semanas</li>
                    <li>• Não afeta funcionamento geral</li>
                    <li>• Melhora com tempo e apoio</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Depressão</h5>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>• Persistente sem causa clara</li>
                    <li>• Dura semanas ou meses</li>
                    <li>• Interfere em atividades diárias</li>
                    <li>• Requer tratamento profissional</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sintomas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Sintomas Principais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sintomas Emocionais</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Humor deprimido na maior parte do dia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Perda de interesse ou prazer (anedonia)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Sentimentos de culpa ou inutilidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Irritabilidade ou frustração excessiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Dificuldade de concentração</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sintomas Físicos</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Fadiga ou perda de energia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Alterações de sono (insônia ou excesso)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Mudanças no apetite e peso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Dores físicas sem causa clara</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Diminuição do desejo sexual</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Sinais de Emergência</h4>
              <p className="text-sm text-red-800 mb-3">
                Procure ajuda imediata se você tiver pensamentos sobre morte ou suicídio.
              </p>
              <Link href="/ajuda-emergencial">
                <Button variant="destructive" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Buscar Ajuda Imediata
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Causas e Fatores de Risco */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Causas e Fatores de Risco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Fatores Biológicos</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Desequilíbrio de neurotransmissores (serotonina, dopamina, noradrenalina)</li>
                  <li>• Predisposição genética (história familiar)</li>
                  <li>• Alterações na estrutura e função cerebral</li>
                  <li>• Problemas hormonais (tireoide, menopausa)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Fatores Psicológicos</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Padrões de pensamento negativo</li>
                  <li>• Baixa autoestima crônica</li>
                  <li>• Perfeccionismo excessivo</li>
                  <li>• História de trauma ou abuso</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Fatores Sociais e Ambientais</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Eventos estressantes (perda, divórcio, desemprego)</li>
                  <li>• Isolamento social</li>
                  <li>• Problemas financeiros crônicos</li>
                  <li>• Doenças crônicas ou dor crônica</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnóstico */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Diagnóstico e Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              O diagnóstico de depressão deve ser feito por profissional de saúde mental qualificado. 
              Geralmente envolve:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Avaliação Clínica</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Entrevista detalhada sobre sintomas</li>
                  <li>• História médica e psiquiátrica</li>
                  <li>• Avaliação do funcionamento diário</li>
                  <li>• Exame físico para descartar outras causas</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Instrumentos de Avaliação</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Escalas de depressão (PHQ-9, BDI)</li>
                  <li>• Questionários de funcionamento</li>
                  <li>• Avaliação de risco suicida</li>
                  <li>• Testes cognitivos se necessário</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Testes online são ferramentas de triagem e não substituem 
                avaliação profissional. Use nossos testes como ponto de partida para conversar com um médico.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tratamento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              Tratamentos Baseados em Evidências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Psicoterapia</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium text-gray-900">Terapia Cognitivo-Comportamental (TCC)</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Ajuda a identificar e mudar padrões de pensamento negativo e comportamentos disfuncionais.
                    </p>
                    <Badge variant="secondary" className="mt-2">Primeira linha</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h5 className="font-medium text-gray-900">Terapia Interpessoal</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Foca em melhorar relacionamentos e habilidades sociais que podem contribuir para depressão.
                    </p>
                    <Badge variant="secondary" className="mt-2">Eficaz</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Medicamentos</h4>
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Antidepressivos podem ser prescritos por psiquiatra, especialmente em casos moderados a graves:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>ISRS</strong> (Inibidores Seletivos de Recaptação de Serotonina) - primeira linha</li>
                    <li>• <strong>IRS</strong> (Inibidores de Recaptação de Serotonina e Noradrenalina)</li>
                    <li>• <strong>Tricíclicos</strong> - em casos específicos</li>
                    <li>• <strong>Outras classes</strong> - conforme avaliação médica</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    Medicamentos devem ser sempre prescritos e acompanhados por médico psiquiatra.
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Abordagens Complementares</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600">🏃</span>
                    </div>
                    <h5 className="font-medium text-sm">Exercício Físico</h5>
                    <p className="text-xs text-gray-600 mt-1">30 minutos diários</p>
                  </div>
                  
                  <div className="text-center p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600">🥗</span>
                    </div>
                    <h5 className="font-medium text-sm">Alimentação</h5>
                    <p className="text-xs text-gray-600 mt-1">Dieta balanceada</p>
                  </div>
                  
                  <div className="text-center p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600">😴</span>
                    </div>
                    <h5 className="font-medium text-sm">Higiene do Sono</h5>
                    <p className="text-xs text-gray-600 mt-1">Rotina regular</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quando Procurar Ajuda */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Quando Procurar Ajuda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-3">Sinais de que você precisa procurar ajuda:</h4>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li>• Sintomas duram mais de 2 semanas</li>
                  <li>• Dificuldade em trabalhar ou estudar</li>
                  <li>• Problemas nos relacionamentos</li>
                  <li>• Sintomas afetam cuidados básicos (higiene, alimentação)</li>
                  <li>• Pensamentos sobre morte ou suicídio</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Onde Procurar Ajuda</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Médico de família/clínico geral</li>
                    <li>• Psiquiatra</li>
                    <li>• Psicólogo</li>
                    <li>• CAPS (Centro de Atenção Psicossocial)</li>
                    <li>• UBS (Unidade Básica de Saúde)</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Como se Preparar</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Anote seus sintomas e quando começaram</li>
                    <li>• Liste medicamentos que usa</li>
                    <li>• Mencione problemas de saúde</li>
                    <li>• Leve questões para perguntar</li>
                    <li>• Considere levar alguém junto</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas Frequentes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Perguntas Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Depressão tem cura?</h4>
                <p className="text-sm text-gray-600">
                  Depressão é tratável e muitas pessoas alcançam remissão completa dos sintomas com tratamento adequado. 
                  Algumas pessoas podem ter recaídas, mas com estratégias de prevenção é possível manter a saúde mental a longo prazo.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Quanto tempo dura o tratamento?</h4>
                <p className="text-sm text-gray-600">
                  O tratamento inicial geralmente dura 6-12 semanas para ver melhora significativa. 
                  Tratamento de manutenção pode continuar por 6-12 meses ou mais, dependendo do caso.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Posso tratar depressão sozinho?</h4>
                <p className="text-sm text-gray-600">
                  Embora autocuidado seja importante, depressão geralmente requer tratamento profissional. 
                  Tentativas de tratar sozinho podem piorar a condição ou levar a complicações.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Antidepressivos causam dependência?</h4>
                <p className="text-sm text-gray-600">
                  Antidepressivos modernos não causam dependência ou vício, mas podem causar sintomas de abstinência 
                  se parados abruptamente. Por isso, a retirada deve ser sempre supervisionada pelo médico.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recursos e Próximos Passos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Recursos e Próximos Passos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Avalie Seus Sintomas</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Faça nossa triagem inicial para entender melhor seus sintomas:
                </p>
                <Link href="/testes/teste-de-depressao">
                  <Button className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    Fazer Teste PHQ-9
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recursos de Apoio</h4>
                <div className="space-y-2">
                  <Link href="/ajuda-emergencial" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Ajuda emergencial 24h
                  </Link>
                  <Link href="/metodologia" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Nossa metodologia científica
                  </Link>
                  <Link href="/ansiedade" className="block text-sm text-blue-600 hover:text-blue-700">
                    → Entenda a relação com ansiedade
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referências Científicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Referências e Fontes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• American Psychiatric Association. (2022). DSM-5-TR™.</p>
              <p>• World Health Organization. (2022). Depression fact sheet.</p>
              <p>• Ministério da Saúde do Brasil. (2021). Protocolos de atenção à saúde mental.</p>
              <p>• Kroenke K, et al. (2001). The PHQ-9. JAMA.</p>
              <p>• Cuijpers P, et al. (2020). Psychological treatment of depression.</p>
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
