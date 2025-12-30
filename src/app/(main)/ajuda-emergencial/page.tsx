import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, MapPin, MessageCircle, AlertTriangle, Clock, Heart, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ajuda Emergencial | Mental Saúde',
  description: 'Recursos imediatos de ajuda para crise de saúde mental. Telefones, serviços e orientações para emergências psicológicas no Brasil.',
  keywords: ['ajuda emergencial', 'crise', 'suicídio', 'saúde mental', 'CVV', 'CAPS'],
}

export default function AjudaEmergencialPage() {
  return (
    <div className="min-h-screen bg-red-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Alerta Crítico */}
        <div className="bg-red-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Ajuda Imediata</h1>
          </div>
          <p className="text-lg mb-4">
            Se você está em crise ou pensando em se machucar, procure ajuda imediatamente. 
            Você não está sozinho e existem pessoas que podem ajudar.
          </p>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="font-semibold mb-2">Ligue imediatamente:</p>
            <div className="text-3xl font-bold">188</div>
            <p className="text-sm mt-1">CVV - Centro de Valorização da Vida (24h, gratuito e confidencial)</p>
          </div>
        </div>

        {/* Recursos Imediatos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-600" />
              Recursos Imediatos - 24 horas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 bg-red-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">CVV - Centro de Valorização da Vida</h3>
                    <Badge variant="destructive">24h</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-red-600">188</p>
                  <p className="text-sm text-gray-600">
                    Apoio emocional para pessoas em crise suicida. 
                    Atendimento gratuito, sigiloso e sem julgamentos.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Telefone</Badge>
                    <Badge variant="outline">Chat</Badge>
                    <Badge variant="outline">E-mail</Badge>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">SAMU - Serviço de Atendimento Móvel de Urgência</h3>
                    <Badge variant="destructive">24h</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-600">192</p>
                  <p className="text-sm text-gray-600">
                    Para emergências médicas que necessitem de atendimento imediato,
                    incluindo crises psiquiátricas graves.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Ambulância</Badge>
                    <Badge variant="outline">Emergência</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Serviços de Saúde Mental */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Serviços de Saúde Mental no Brasil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg">CAPS - Centros de Atenção Psicossocial</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Serviços especializados em saúde mental que oferecem atendimento 
                    interdisciplinar (psiquiatria, psicologia, assistência social, terapia ocupacional).
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">CAPS I</h4>
                      <p className="text-xs text-gray-600">Municípios com população &gt; 20.000</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">CAPS II</h4>
                      <p className="text-xs text-gray-600">Municípios com população &gt; 70.000</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">CAPS III</h4>
                      <p className="text-xs text-gray-600">Atendimento 24h, municípios &gt; 200.000</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Como encontrar:</strong> Procure na secretaria de saúde do seu município 
                    ou ligue 136 (Disque Saúde) para localizar o CAPS mais próximo.
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg">UBS - Unidades Básicas de Saúde</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Primeiro contato para atendimento em saúde mental. Médicos generalistas 
                    podem fazer avaliação inicial e encaminhar para especialista se necessário.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Como encontrar:</strong> Procure a UBS mais próxima da sua residência. 
                    Leve documentos de identificação e cartão SUS.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sinais de Emergência */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Quando Procurar Ajuda Imediata
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-3">Sinais de Crise Imediata</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Pensamentos sobre morte ou suicídio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Planejamento de como se machucar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Isolamento social extremo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Perda de contato com a realidade</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Comportamento agressivo ou destrutivo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Uso excessivo de substâncias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Incapacidade de cuidar de si mesmo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>Alucinações ou delírios</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">O Que Fazer Agora</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <div>
                      <p className="font-semibold">Ligue para o CVV (188)</p>
                      <p className="text-gray-600">Fale com um voluntário treinado imediatamente</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <p className="font-semibold">Não fique sozinho</p>
                      <p className="text-gray-600">Peça para um amigo ou familiar ficar com você</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <div>
                      <p className="font-semibold">Remova meios perigosos</p>
                      <p className="text-gray-600">Afaste medicamentos, armas ou outros objetos de risco</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <div>
                      <p className="font-semibold">Procure emergência se necessário</p>
                      <p className="text-gray-600">Hospital ou SAMU (192) se houver risco de vida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recursos Online */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Recursos Online e Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">CVV Online</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Chat e e-mail com voluntários treinados, disponível 24h.
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Site:</strong> cvv.org.br</p>
                  <p><strong>Chat:</strong> Disponível no site</p>
                  <p><strong>E-mail:</strong> ouvindo@cvv.org.br</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Saúde Mental Brasil</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Aplicativo do Ministério da Saúde com recursos e informações.
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Disponível:</strong> Android e iOS</p>
                  <p><strong>Gratuito:</strong> Sim</p>
                  <p><strong>Conteúdo:</strong> Informações e direcionamento</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Como Ajudar Outra Pessoa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Como Ajudar Alguém em Crise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <h4 className="font-semibold text-pink-900 mb-3">Sinais que Alguém Precisa de Ajuda</h4>
                <ul className="space-y-2 text-sm text-pink-800">
                  <li>• Fala sobre morte, suicídio ou "desaparecer"</li>
                  <li>• Expressa sentimentos de desesperança ou inutilidade</li>
                  <li>• Isola-se de amigos e familiares</li>
                  <li>• Mudanças drásticas no comportamento ou humor</li>
                  <li>• Despedidas ou "dar coisas importantes"</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-green-700">O Que Fazer</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Escute sem julgar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Mostre que você se importa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Pergunte diretamente sobre suicídio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Remova meios perigosos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Procure ajuda profissional</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-700">O Que Evitar</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Não minimize os sentimentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Não diga "isso vai passar"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Não prometa segredos perigosos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Não deixe a pessoa sozinha</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Não tente resolver sozinho</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer com Links Rápidos */}
        <div className="mt-12 text-center">
          <div className="bg-blue-600 text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Lembre-se: Ajuda está disponível</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/testes/teste-de-depressao" 
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
              >
                Fazer Teste de Triagem
              </Link>
              <Link 
                href="/metodologia" 
                className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800"
              >
                Nossa Metodologia
              </Link>
            </div>
            <p className="mt-4 text-sm">
              Você não está sozinho. Buscar ajuda é um ato de coragem.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
