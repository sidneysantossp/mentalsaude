import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Users, FileText, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Metodologia e Conselho Editorial | Mental Saúde',
  description: 'Nossa metodologia científica com validação de testes e conselho editorial de especialistas. Conheça o processo de revisão e garantia de qualidade.',
  keywords: ['metodologia', 'conselho editorial', 'validação', 'saúde mental', 'testes psicológicos'],
}

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Metodologia e Conselho Editorial
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compromisso com evidência científica, ética e transparência na avaliação de saúde mental
          </p>
        </div>

        {/* Seção 1: Nossa Abordagem */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Nossa Abordagem Científica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Seleção de Instrumentos</h3>
                <p className="text-gray-600 text-sm">
                  Utilizamos apenas escalas validadas cientificamente e reconhecidas pela comunidade médica internacional,
                  como PHQ-9, GAD-7, AUDIT, entre outras. Cada instrumento é selecionado baseado em evidências de validação
                  para a população brasileira.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tradução e Adaptação</h3>
                <p className="text-gray-600 text-sm">
                  Todos os instrumentos passam por processo de tradução, retrotradução e adaptação cultural seguindo
                  diretrizes internacionais, garantindo que o significado e a interpretação sejam preservados para o contexto brasileiro.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Validação Estatística</h3>
                <p className="text-gray-600 text-sm">
                  Nossos testes são validados estatisticamente com amostras representativas da população brasileira,
                  garantindo confiabilidade (consistência interna) e validade (capacidade de medir o que se propõe).
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Limitações Éticas</h3>
                <p className="text-gray-600 text-sm">
                  Todos os testes incluem declarações claras sobre suas limitações, sendo ferramentas de triagem
                  e não instrumentos de diagnóstico. Sempre orientamos sobre a necessidade de avaliação profissional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 2: Conselho Editorial */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Conselho Editorial
            </CardTitle>
            <CardDescription>
              Especialistas que garantem a qualidade e segurança do nosso conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">DR</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Dr. Roberto Silva</h4>
                    <p className="text-sm text-gray-600 mb-1">Psiquiatra - CRM 12345/SP</p>
                    <p className="text-sm text-gray-600 mb-2">Especialista em Psiquiatria pela FMUSP</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">Depressão</Badge>
                      <Badge variant="secondary">Ansiedade</Badge>
                      <Badge variant="secondary">TDAH</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">PS</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Dra. Paula Santos</h4>
                    <p className="text-sm text-gray-600 mb-1">Psicóloga - CRP 06/67890</p>
                    <p className="text-sm text-gray-600 mb-2">Mestre em Psicologia Clínica pela PUC-SP</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">Terapia CBT</Badge>
                      <Badge variant="secondary">Avaliação Psicológica</Badge>
                      <Badge variant="secondary">Burnout</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-900 mb-2">Critérios de Revisão</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Todo conteúdo clínico é revisado por profissional qualificado</li>
                <li>• Referências atualizadas com no máximo 5 anos</li>
                <li>• Verificação de evidências científicas e diretrizes clínicas</li>
                <li>• Revisão semestral de todo o conteúdo</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Seção 3: Processo Editorial */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Processo Editorial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pesquisa e Seleção</h4>
                  <p className="text-sm text-gray-600">
                    Pesquisa sistemática de evidências científicas em bases como PubMed, Cochrane e Lilacs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Redação Inicial</h4>
                  <p className="text-sm text-gray-600">
                    Conteúdo elaborado por especialistas com linguagem acessível e tecnicamente precisa.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Revisão Clínica</h4>
                  <p className="text-sm text-gray-600">
                    Análise por membro do conselho editorial para garantir precisão técnica e ética.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Atualização Contínua</h4>
                  <p className="text-sm text-gray-600">
                    Revisão periódica com data de última atualização visível em todas as páginas.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 4: Fontes e Referências */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Fontes e Referências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Bases Científicas Consultadas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• PubMed/MEDLINE - Literatura médica internacional</li>
                  <li>• Cochrane Library - Revisões sistemáticas</li>
                  <li>• Lilacs - Literatura Latino-Americana</li>
                  <li>• SciELO - Scientific Electronic Library Online</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Diretrizes Clínicas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• DSM-5-TR - Manual Diagnóstico e Estatístico de Transtornos Mentais</li>
                  <li>• CID-11 - Classificação Internacional de Doenças</li>
                  <li>• Diretrizes da Associação Brasileira de Psiquiatria (ABP)</li>
                  <li>• Protocolos do Ministério da Saúde do Brasil</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 5: Transparência e Limitações */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Transparência e Limitações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h5 className="font-semibold text-red-900 mb-2">Importante: Limitações dos Testes</h5>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Nossos testes são ferramentas de triagem, não diagnóstico</li>
                  <li>• Resultados não substituem avaliação profissional qualificada</li>
                  <li>• Fatores como estresse agudo podem influenciar temporariamente os resultados</li>
                  <li>• Testes não consideram histórico clínico completo</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-900 mb-2">Quando Procurar Ajuda Imediata</h5>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Pensamentos sobre morte ou suicídio</li>
                  <li>• Incapacidade de realizar atividades diárias</li>
                  <li>• Sintomas que interferem no trabalho ou relacionamentos</li>
                  <li>• Uso de substâncias para lidar com sintomas</li>
                </ul>
                <div className="mt-3">
                  <Link 
                    href="/ajuda-emergencial" 
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    → Ver recursos de ajuda emergencial
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 6: Changelog e Atualizações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              Atualizações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">15/12/2025</span>
                  <Badge variant="outline">Atualização</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Revisão das diretrizes para interpretação do PHQ-9 conforme atualização do DSM-5-TR.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">10/12/2025</span>
                  <Badge variant="outline">Novo Conteúdo</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Adicionada seção sobre diferenças entre tristeza e depressão.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">05/12/2025</span>
                  <Badge variant="outline">Correção</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Atualizados pontos de corte para GAD-7 conforme validação brasileira recente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
