'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Brain,
  Heart,
  Flame,
  Zap,
  Shield,
  Star,
  Users,
  Calendar,
  Lock,
  ChevronRight,
  AlertTriangle,
  Eye,
  Cloud
} from 'lucide-react'
import Link from 'next/link'
import FAQSection, { FAQItem } from '@/components/home/FAQSection'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

const testCategories = [
  {
    id: 'depression',
    title: 'Teste de Depressão',
    description: 'Avalie seus sintomas depressivos e entenda seu nível de bem-estar emocional',
    icon: Brain,
    color: 'bg-blue-500',
    tests: ['Teste de Depressão', 'Teste de Sofrimento Psíquico'],
    image: '/images/depression-therapy.jpg'
  },
  {
    id: 'anxiety',
    title: 'Teste de Ansiedade',
    description: 'Meça seus níveis de ansiedade e como ela afeta seu dia a dia',
    icon: Heart,
    color: 'bg-cyan-500',
    tests: ['Teste de Ansiedade', 'Teste de Fobia Social'],
    image: '/images/anxiety-meditation.jpg'
  },
  {
    id: 'compulsion',
    title: 'Teste de Compulsão Alimentar',
    description: 'Identifique padrões de alimentação compulsiva e sua relação com as emoções',
    icon: Flame,
    color: 'bg-orange-500',
    tests: ['Teste de Compulsão Alimentar'],
    image: '/images/healthy-eating.jpg'
  },
  {
    id: 'adhd',
    title: 'Teste de TDAH',
    description: 'Avalie sintomas de desatenção, hiperatividade e impulsividade',
    icon: Zap,
    color: 'bg-yellow-500',
    tests: ['Teste de TDAH - Desatenção', 'Teste de TDAH - Hiperatividade'],
    image: '/images/adhd-focus.jpg'
  },
  {
    id: 'stress',
    title: 'Teste de Estresse',
    description: 'Avalie seu nível de estresse atual e seus principais gatilhos',
    icon: Users,
    color: 'bg-red-500',
    tests: ['Teste de Nível de Estresse'],
    image: '/images/stress-management.jpg'
  },
  {
    id: 'burnout',
    title: 'Teste de Burnout',
    description: 'Identifique sinais de esgotamento profissional e impacto na sua qualidade de vida',
    icon: Flame,
    color: 'bg-red-600',
    tests: ['Teste de Burnout Profissional', 'Teste de Esgotamento'],
    image: '/images/burnout-work.jpg'
  },
  {
    id: 'panic',
    title: 'Teste Transtorno de Pânico',
    description: 'Avalie sintomas de crises de pânico e ansiedade aguda para entender melhor sua condição',
    icon: AlertTriangle,
    color: 'bg-purple-500',
    tests: ['Teste de Transtorno de Pânico', 'Avaliação de Crises de Ansiedade'],
    image: '/images/panic-disorder.jpg'
  },
  {
    id: 'social-phobia',
    title: 'Teste Fobia Social',
    description: 'Identifique medos e ansiedade em situações sociais e seu impacto na vida cotidiana',
    icon: Eye,
    color: 'bg-indigo-500',
    tests: ['Teste de Fobia Social', 'Avaliação de Ansiedade Social'],
    image: '/images/social-phobia.jpg'
  },
  {
    id: 'mental-suffering',
    title: 'Grau de Sofrimento Mental',
    description: 'Meça o nível de sofrimento psíquico e seu impacto no bem-estar geral',
    icon: Cloud,
    color: 'bg-gray-600',
    tests: ['Teste de Sofrimento Mental', 'Avaliação de Distresse Psicológico'],
    image: '/images/mental-suffering.jpg'
  }
]

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Os testes são realmente gratuitos?",
    answer: "Sim! Todos os nossos testes psicológicos são 100% gratuitos. Não há custos ocultos, assinaturas ou pagamentos necessários para acessar qualquer um dos testes disponíveis em nossa plataforma."
  },
  {
    id: 2,
    question: "Quanto tempo demora para fazer um teste?",
    answer: "O tempo médio varia de 10 a 15 minutos por teste, dependendo da complexidade e do número de questões. Cada teste informa o tempo estimado antes de você começar, para que possa se organizar melhor."
  },
  {
    id: 3,
    question: "Os resultados são imediatos?",
    answer: "Sim! Após finalizar qualquer teste, você recebe seus resultados imediatamente. Nossa plataforma gera um relatório detalhado com suas pontuações, interpretações e recomendações personalizadas."
  },
  {
    id: 4,
    question: "Os testes são cientificamente validados?",
    answer: "Absolutamente. Todos os nossos testes são baseados em instrumentos científicos validados pela comunidade acadêmica internacional, como PHQ-9 para depressão, GAD-7 para ansiedade, e outras escalas reconhecidas mundialmente."
  },
  {
    id: 5,
    question: "Meus dados estão seguros e confidenciais?",
    answer: "Sim, sua privacidade é nossa prioridade. Todos os dados são criptografados e protegidos conforme a LGPD. Seus resultados são confidenciais e não compartilhamos informações pessoais com terceiros sem seu consentimento explícito."
  },
  {
    id: 6,
    question: "Posso fazer os testes mais de uma vez?",
    answer: "Sim! Você pode refazer os testes quantas vezes desejar. Recomendamos fazer reavaliações periódicas (a cada 2-3 meses) para acompanhar sua evolução e progresso ao longo do tempo."
  },
  {
    id: 7,
    question: "Os resultados substituem uma consulta médica?",
    answer: "Não. Nossos testes são ferramentas de autoavaliação e rastreamento, não substituem diagnóstico profissional ou tratamento médico. Se tiver sintomas graves, procure sempre um psicólogo ou psiquiatra."
  },
  {
    id: 8,
    question: "Como funciona o acompanhamento do progresso?",
    answer: "Nossa plataforma armazena seu histórico de testes de forma segura, permitindo que você acompanhe sua evolução através de gráficos e relatórios comparativos. Você pode visualizar tendências, melhorias e identificar áreas que precisam de mais atenção."
  }
]

export default function Home() {
  return (
    <LayoutWrapper>
      {/* CTA Banner Section - Top */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/cta-banner-background.jpg"
              alt="Comece sua jornada de saúde mental"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Comece Sua Jornada de
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent block">Bem-Estar Hoje</span>
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já transformaram suas vidas com nossos testes psicológicos gratuitos e validados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white text-base px-8 py-3 h-auto font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl">
                <Link href="/auth/signup" className="flex items-center">
                  Criar Conta Gratuita
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-3 h-auto border-2 border-white text-black hover:bg-white hover:text-black font-bold transition-all duration-300 rounded-xl">
                <Link href="/tests" className="text-black hover:text-black">Ver Todos os Testes</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">+10.000 Usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">4.9 Avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">100% Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section id="tests" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Testes Psicológicos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Avaliações profissionais abrangentes para compreender melhor sua saúde mental e bem-estar emocional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testCategories.slice(0, 8).map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-black flex flex-col h-80 rounded-xl">
                  {/* Card Image Section - Top Portion */}
                  <div className="relative h-48 overflow-hidden -mt-6 -mx-6">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* FREE Badge */}
                    <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg transition-all duration-300 hover:scale-105">
                      GRATUITO
                    </div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <IconComponent className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <CardContent className="px-6 pb-4 pt-3 space-y-3 flex flex-col flex-grow -mt-2">
                    {/* Category Title */}
                    <h3 className="font-bold text-black text-base leading-tight">
                      {category.title}
                    </h3>

                    {/* Test Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                      <span className="flex items-center space-x-1">
                        <Brain className="h-3 w-3 text-black" />
                        <span>{category.tests.length} teste{category.tests.length > 1 ? 's' : ''}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-black" />
                        <span>10-15 min</span>
                      </span>
                    </div>
                    
                    {/* Spacer to push button to bottom */}
                    <div className="flex-grow"></div>
                    
                    {/* Start Test Button */}
                    <Link href={`/tests/${category.id === 'depression' ? '1' : category.id === 'compulsion' ? '2' : category.id === 'anxiety' ? '3' : category.id === 'stress' ? '4' : category.id === 'mental-suffering' ? '5' : category.id}`}>
                      <Button 
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 hover:scale-105"
                      >
                        <span>Iniciar Teste</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[225px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-therapy-background.jpg"
              alt="Saúde Mental e Bem-Estar"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-purple-900/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
          <div className="text-center max-w-4xl mx-auto text-white">
            <div className="mb-4">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold mb-4 shadow-lg hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-105">
                <Brain className="h-3 w-3 mr-2" />
                Testes Psicológicos Gratuitos e Validados
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
              Avalie Sua
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent block">Saúde Mental</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed max-w-3xl mx-auto font-medium">
              Testes gratuitos e confiáveis para compreender melhor seu bem-estar emocional. 
              Resultados imediatos baseados em instrumentos científicos validados.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-base px-6 py-3 h-auto font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl">
                <Link href="/tests" className="flex items-center">
                  Iniciar Avaliação
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-6 py-3 h-auto border-2 border-black !text-black hover:bg-blue-900 hover:!text-black hover:border-blue-900 font-bold transition-all duration-300 rounded-xl">
                <Link href="/tests" className="!text-black hover:!text-black">Conhecer os Testes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Dados Seguros</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Criptografia avançada e proteção total das suas informações</p>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Testes Validados</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Instrumentos científicos aprovados pela comunidade</p>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Acompanhamento</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Monitore sua evolução com relatórios detalhados</p>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Gratuito</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Acesso livre a todos os testes e funcionalidades</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por Que Escolher Nossa Plataforma?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos a melhor experiência em avaliação de saúde mental com tecnologia avançada e cuidado profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-0">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Testes Científicos</h3>
                <p className="text-gray-600 leading-relaxed">
                  Utilizamos apenas instrumentos validados pela comunidade científica internacional para garantir resultados precisos e confiáveis.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-0">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacidade Total</h3>
                <p className="text-gray-600 leading-relaxed">
                  Seus dados são criptografados e protegidos conforme a LGPD, garantindo total confidencialidade das suas informações.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-0">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Acompanhamento</h3>
                <p className="text-gray-600 leading-relaxed">
                  Acompanhe sua evolução ao longo do tempo com gráficos detalhados e relatórios compreensivos do seu progresso.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog de Saúde Mental
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra artigos, dicas e estratégias para cuidar do seu bem-estar emocional e mental
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Blog Card 1 */}
            <Card className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden -mt-6 -mx-6">
                <Image
                  src="/images/blog-anxiety-management.jpg"
                  alt="Técnicas para Gerenciar Ansiedade"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                  Ansiedade
                </div>
              </div>
              
              {/* Content */}
              <CardContent className="p-6 -mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>15 de Novembro, 2024</span>
                  <span>•</span>
                  <span>8 min leitura</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  5 Técnicas Comprovadas para Gerenciar a Ansiedade no Dia a Dia
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  Aprenda estratégias práticas e baseadas em evidências para controlar os sintomas de ansiedade e recuperar o equilíbrio emocional.
                </p>
                
                <Link href="/blog/tecnicas-ansiedade" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Ler Artigo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Blog Card 2 */}
            <Card className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden -mt-6 -mx-6">
                <Image
                  src="/images/blog-depression-coping.jpg"
                  alt="Estratégias para Lidar com a Depressão"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                  Depressão
                </div>
              </div>
              
              {/* Content */}
              <CardContent className="p-6 -mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>12 de Novembro, 2024</span>
                  <span>•</span>
                  <span>10 min leitura</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  Como Construir uma Rotina de Autocuidado Durante a Depressão
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  Descubra pequenas ações diárias que podem fazer uma grande diferença no combate aos sintomas depressivos e na recuperação do bem-estar.
                </p>
                
                <Link href="/blog/autocuidado-depressao" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Ler Artigo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Blog Card 3 */}
            <Card className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden -mt-6 -mx-6">
                <Image
                  src="/images/blog-mindfulness-meditation.jpg"
                  alt="Mindfulness e Meditação"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                  Mindfulness
                </div>
              </div>
              
              {/* Content */}
              <CardContent className="p-6 -mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>8 de Novembro, 2024</span>
                  <span>•</span>
                  <span>6 min leitura</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  Os Benefícios Científicos da Meditação para a Saúde Mental
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  Explore o que a ciência diz sobre como a prática regular de meditação pode transformar sua saúde mental e reduzir o estresse.
                </p>
                
                <Link href="/blog/beneficios-meditacao" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Ler Artigo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
          
          {/* View All Posts Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 h-auto rounded-xl transition-all duration-300">
              <Link href="/blog" className="flex items-center">
                Ver Todos os Artigos
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tire suas dúvidas sobre nossos testes psicológicos e como funcionam
            </p>
          </div>
          
          <FAQSection items={faqData} />
        </div>
      </section>
    </LayoutWrapper>
  )
}
