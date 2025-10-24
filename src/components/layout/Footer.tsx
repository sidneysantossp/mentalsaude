import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-6 w-6" />
              <span className="text-lg font-bold">Mental Health Tests</span>
            </div>
            <p className="text-gray-400 text-sm">
              Plataforma confiável para avaliação e acompanhamento da saúde mental.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Testes</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/tests" className="hover:text-white transition-colors">Depressão</Link></li>
              <li><Link href="/tests" className="hover:text-white transition-colors">Ansiedade</Link></li>
              <li><Link href="/tests" className="hover:text-white transition-colors">Burnout</Link></li>
              <li><Link href="/tests" className="hover:text-white transition-colors">TDAH</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Artigos</Link></li>
              <li><Link href="/resources/videos" className="hover:text-white transition-colors">Vídeos</Link></li>
              <li><Link href="/resources/professionals" className="hover:text-white transition-colors">Profissionais</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Mental Health Tests. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}