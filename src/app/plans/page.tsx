'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  Crown, 
  Users, 
  MessageCircle, 
  Star, 
  Zap,
  Shield,
  Heart,
  Brain,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
<<<<<<< HEAD
import Footer from '@/components/Footer'
=======
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 'R$ 0',
    period: '/mês',
    description: 'Perfeito para começar sua jornada',
    features: [
      'Acesso a 3 salas de bate-papo gratuitas',
      'Testes psicológicos básicos',
      'Resultados imediatos',
      'Dashboard pessoal',
      'Suporte por email'
    ],
    limitations: [
      'Sem salas exclusivas',
      'Sem conteúdo premium',
      'Sem prioridade no suporte'
    ],
    popular: false,
    buttonText: 'Começar Gratuitamente',
    buttonVariant: 'outline' as const,
    color: 'border-gray-200'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R$ 29,90',
    period: '/mês',
    description: 'Acesso completo à comunidade',
    features: [
      'Acesso ilimitado a todas as salas',
      'Salas exclusivas moderadas',
      'Todos os testes psicológicos',
      'Análises detalhadas com gráficos',
      'Acompanhamento de evolução',
      'Conteúdo educativo exclusivo',
      'Suporte prioritário 24/7',
      'Sem anúncios'
    ],
    limitations: [],
    popular: true,
    buttonText: 'Assinar Agora',
    buttonVariant: 'default' as const,
    color: 'border-blue-500 shadow-lg'
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 'R$ 297',
    period: '/única',
    description: 'Acesso vitalício a tudo',
    features: [
      'Todos os benefícios Premium',
      'Acesso vitalício (pagamento único)',
      'Novos recursos para sempre',
      'Suporte VIP dedicado',
      'Workshops exclusivos',
      'Certificado de membro',
      'Acesso antecipado a novidades',
      'Bônus especiais mensais'
    ],
    limitations: [],
    popular: false,
    buttonText: 'Melhor Oferta',
    buttonVariant: 'default' as const,
    color: 'border-purple-500 shadow-lg'
  }
]

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Membro Premium',
    content: 'As salas de chat mudaram minha vida. Finalmente encontrei um lugar seguro para compartilhar minhas experiências.',
    rating: 5,
    avatar: 'AS'
  },
  {
    name: 'Carlos Mendes',
    role: 'Membro Premium',
    content: 'O acompanhamento da evolução com gráficos me ajudou a ver meu progresso real. Vale cada centavo!',
    rating: 5,
    avatar: 'CM'
  },
  {
    name: 'Patrícia Santos',
    role: 'Membro Premium',
    content: 'O conteúdo exclusivo e as salas moderadas fazem toda a diferença. Sinto-me apoiada 24/7.',
    rating: 5,
    avatar: 'PS'
  }
]

const faqItems = [
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento. O acesso continua até o final do período pago.'
  },
  {
    question: 'Qual a diferença entre as salas gratuitas e premium?',
    answer: 'As salas premium são moderadas por profissionais, têm menos membros para maior interação, e contam com participantes mais engajados.'
  },
  {
    question: 'Os testes psicológicos são cientificamente validados?',
    answer: 'Sim! Todos os nossos testes são baseados em escalas validadas cientificamente como PHQ-9, GAD-7, entre outras.'
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos todas as normas da LGPD para proteger sua privacidade.'
  },
  {
    question: 'Posso mudar de plano depois?',
    answer: 'Sim! Você pode upgrade ou downgrade seu plano a qualquer momento.'
  }
]

export default function PlansPage() {
  const { data: session } = useSession()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubscribe = (planId: string) => {
    if (!session) {
      // Redirecionar para login
      window.location.href = '/auth/signin?redirect=/plans'
      return
    }
    
    // Lógica de assinatura será implementada
    console.log(`Assinando plano ${planId}`)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <Crown className="h-4 w-4 mr-2" />
                  Planos de Assinatura
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Escolha Seu Plano de
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">Bem-Estar</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Acesso completo a ferramentas profissionais para sua saúde mental. 
                Escolha o plano que melhor se adapta às suas necessidades.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Mensal
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Anual (economize 20%)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.popular ? 'scale-105' : ''} ${plan.color} hover:shadow-xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {plan.id === 'free' && <Users className="h-12 w-12 text-gray-600" />}
                      {plan.id === 'premium' && <Crown className="h-12 w-12 text-blue-600" />}
                      {plan.id === 'lifetime' && <Star className="h-12 w-12 text-purple-600" />}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-3 opacity-60">
                          <Lock className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                      variant={plan.buttonVariant}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {plan.buttonText}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compare os Recursos
              </h2>
              <p className="text-lg text-gray-600">
                Veja exatamente o que está incluído em cada plano
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Recursos
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        Gratuito
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                        Premium
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                        Lifetime
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Salas de Bate-Papo</td>
                      <td className="px-6 py-4 text-center">3 salas</td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Salas Exclusivas</td>
                      <td className="px-6 py-4 text-center text-red-600">
                        <Lock className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Testes Psicológicos</td>
                      <td className="px-6 py-4 text-center">Básicos</td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Análises com Gráficos</td>
                      <td className="px-6 py-4 text-center text-red-600">
                        <Lock className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Suporte Prioritário</td>
                      <td className="px-6 py-4 text-center text-red-600">
                        <Lock className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Sem Anúncios</td>
                      <td className="px-6 py-4 text-center text-red-600">
                        <Lock className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                O Que Nossos Membros Dizem
              </h2>
              <p className="text-lg text-gray-600">
                Histórias reais de transformação e bem-estar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Perguntas Frequentes
                </h2>
                <p className="text-lg text-gray-600">
                  Tire suas dúvidas sobre nossos planos
                </p>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left flex items-center justify-between"
                      >
                        <span className="font-semibold text-gray-900">{item.question}</span>
                        <div className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </button>
                      {expandedFaq === index && (
                        <p className="mt-4 text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Comece Sua Jornada de Bem-Estar Hoje
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já transformaram suas vidas 
              através da nossa comunidade de apoio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/chat" className="flex items-center">
                  Experimentar Salas Gratuitas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/tests">Fazer um Teste Agora</Link>
              </Button>
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