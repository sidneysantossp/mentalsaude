'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Brain, 
  Heart, 
  Shield, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
<<<<<<< HEAD
import Footer from '@/components/Footer'
=======
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

const teamMembers = [
  {
    name: "Dra. Ana Silva",
    role: "Psicóloga Clínica",
    credentials: "CRP 12/34567",
    bio: "Especialista em terapia cognitivo-comportamental com mais de 15 anos de experiência.",
    avatar: "/images/team/ana-silva.jpg"
  },
  {
    name: "Dr. Carlos Mendes",
    role: "Psiquiatra",
    credentials: "CRM 12345-SP",
    bio: "Especialista em saúde mental e transtornos de ansiedade.",
    avatar: "/images/team/carlos-mendes.jpg"
  },
  {
    name: "Dra. Maria Santos",
    role: "Neuropsicóloga",
    credentials: "CRP 12/54321",
    bio: "Especialista em avaliação neuropsicológica e reabilitação cognitiva.",
    avatar: "/images/team/maria-santos.jpg"
  }
]

const milestones = [
  {
    year: "2020",
    title: "Fundação",
    description: "Início das operações com missão de democratizar o acesso à saúde mental"
  },
  {
    year: "2021",
    title: "Primeiros Testes",
    description: "Lançamento dos primeiros testes psicológicos validados"
  },
  {
    year: "2022",
    title: "Expansão",
    description: "Alcance de 100.000 usuários atendidos em todo o Brasil"
  },
  {
    year: "2023",
    title: "Inovação",
    description: "Implementação de IA para análises preditivas e acompanhamento"
  },
  {
    year: "2024",
    title: "Excelência",
    description: "Reconhecimento como plataforma líder em saúde mental digital"
  }
]

const values = [
  {
    icon: Heart,
    title: "Empatia",
    description: "Colocamos as pessoas no centro de tudo o que fazemos, com compreensão e cuidado genuíno."
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Proteção total dos seus dados com criptografia avançada e conformidade com LGPD."
  },
  {
    icon: Lightbulb,
    title: "Inovação",
    description: "Tecnologia de ponta para tornar a saúde mental mais acessível e eficaz."
  },
  {
    icon: Target,
    title: "Precisão",
    description: "Ferramentas cientificamente validadas para resultados confiáveis e acurados."
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Construindo uma rede de apoio e suporte mútuo para todos os usuários."
  },
  {
    icon: Zap,
    title: "Acessibilidade",
    description: "Saúde mental de qualidade para todos, independentemente de localização ou renda."
  }
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission')

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <Brain className="h-4 w-4 mr-2" />
                  Sobre Nós
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Transformando
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">Saúde Mental</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Estamos revolucionando o acesso à saúde mental no Brasil através de tecnologia 
                inovadora e ferramentas psicológicas validadas cientificamente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Link href="/tests" className="flex items-center">
                    Conhecer Nossos Testes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                  <Link href="/contact">Fale Conosco</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
                <div className="text-gray-600">Usuários Atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">Testes Validados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Disponibilidade</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission/Vision/Tabs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['mission', 'vision', 'values'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab === 'mission' ? 'Missão' : tab === 'vision' ? 'Visão' : 'Valores'}
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                {activeTab === 'mission' && (
                  <div className="text-center">
                    <Brain className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Democratizar o acesso à saúde mental no Brasil através de tecnologia inovadora, 
                      oferecendo ferramentas psicológicas acessíveis, validadas e eficazes que 
                      capacitem as pessoas a compreenderem e melhorarem seu bem-estar emocional.
                    </p>
                  </div>
                )}

                {activeTab === 'vision' && (
                  <div className="text-center">
                    <Target className="h-16 w-16 text-purple-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Visão</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Ser a plataforma líder em saúde mental digital na América Latina, 
                      transformando milhões de vidas através da prevenção, diagnóstico 
                      e acompanhamento psicológico acessível a todos.
                    </p>
                  </div>
                )}

                {activeTab === 'values' && (
                  <div>
                    <Star className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossos Valores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {values.map((value, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <value.icon className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                            <p className="text-gray-700">{value.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossa Equipe Especializada
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Profissionais altamente qualificados dedicados à sua saúde mental
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                    <p className="text-sm text-gray-500 mb-4">{member.credentials}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossa Jornada
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Marcos importantes na nossa história de transformação
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <div className="text-blue-600 font-bold text-sm mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-700">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Comece Sua Jornada de Bem-Estar Hoje
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de milhares de pessoas que já transformaram 
              suas vidas através da nossa plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/tests" className="flex items-center">
                  Fazer um Teste Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/contact">Agendar Consulta</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-700">contato@mentalsaude.com.br</p>
                </div>
                <div>
                  <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Telefone</h3>
                  <p className="text-gray-700">0800 123 4567</p>
                </div>
                <div>
                  <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Endereço</h3>
                  <p className="text-gray-700">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
<<<<<<< HEAD

      {/* Footer */}
      <Footer />
=======
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
    </LayoutWrapper>
  )
}