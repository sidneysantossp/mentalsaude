'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ChevronUp,
  Heart
} from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Newsletter Section */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Receba Dicas de Saúde Mental
            </h3>
            <p className="text-gray-300 mb-8">
              Inscreva-se para receber conteúdo exclusivo e atualizações sobre saúde mental
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Inscrever-se
              </button>
            </form>
            {subscribed && (
              <p className="mt-4 text-green-400">
                ✨ Inscrito com sucesso!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mental Saúde
              </h3>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sua plataforma confiável para testes psicológicos gratuitos e acompanhamento de saúde mental.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  href="/testes" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Testes
                </Link>
              </li>
              <li>
                <Link 
                  href="/chat" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Chat
                </Link>
              </li>
              <li>
                <Link 
                  href="/sobre" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Tests Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Categorias de Testes</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/testes/depressao" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Teste de Depressão
                </Link>
              </li>
              <li>
                <Link 
                  href="/testes/ansiedade" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Teste de Ansiedade
                </Link>
              </li>
              <li>
                <Link 
                  href="/testes/estresse" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Teste de Estresse
                </Link>
              </li>
              <li>
                <Link 
                  href="/testes/adhd" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Teste de ADHD
                </Link>
              </li>
              <li>
                <Link 
                  href="/testes/todos" 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Todos os Testes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">contato@mentalsaude.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">São Paulo, Brasil</span>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h5 className="font-semibold text-red-400 mb-2">Emergência</h5>
              <p className="text-sm text-gray-300 mb-2">
                Se você está em crise, procure ajuda imediatamente.
              </p>
              <a 
                href="tel:188" 
                className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>CVV: 188</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>
                © 2024 Mental Saúde. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6">
                <Link 
                  href="/privacidade" 
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Política de Privacidade
                </Link>
                <Link 
                  href="/termos" 
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Termos de Uso
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>no Brasil</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-50"
        aria-label="Voltar ao topo"
      >
        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  )
}