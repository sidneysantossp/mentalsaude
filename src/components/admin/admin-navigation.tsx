'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'

interface AdminNavigationProps {
  currentPath?: string
}

export default function AdminNavigation({ currentPath }: AdminNavigationProps) {
  const pathname = usePathname()
  const current = currentPath || pathname

  const isActive = (path: string) => {
    if (path === '/admin') {
      return current === '/admin' || current === '/admin/'
    }
    return current === path
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {/* Home Link */}
          <Link 
            href="/" 
            className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 flex items-center space-x-1"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          
          {/* Admin Navigation */}
          <Link 
            href="/admin" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/users" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin/users') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Usuários
          </Link>
          <Link 
            href="/admin/tests" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin/tests') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Testes
          </Link>
          <Link 
            href="/admin/chat-management" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin/chat-management') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Chat
          </Link>
          <Link 
            href="/admin/questions" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin/questions') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Questões
          </Link>
          <Link 
            href="/admin/results" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin/results') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Resultados
          </Link>
          <Link 
            href="/admin/reports" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin/reports') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Relatórios
          </Link>
          <Link 
            href="/admin/settings" 
            className={`py-4 px-1 border-b-2 text-sm font-medium ${
              isActive('/admin/settings') 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Configurações
          </Link>
        </div>
      </div>
    </nav>
  )
}