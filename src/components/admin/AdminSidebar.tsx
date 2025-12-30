'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BookOpen, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TestTube,
  HelpCircle,
  FolderTree
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    title: 'Testes',
    icon: TestTube,
    href: '/admin/tests',
  },
  {
    title: 'Questões',
    icon: HelpCircle,
    href: '/admin/questions',
  },
  {
    title: 'Categorias',
    icon: FolderTree,
    href: '/admin/categories',
  },
  {
    title: 'Usuários',
    icon: Users,
    href: '/admin/users',
  },
  {
    title: 'Blog',
    icon: BookOpen,
    href: '/admin/blog',
  },
  {
    title: 'Configurações',
    icon: Settings,
    href: '/admin/settings',
  },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'relative flex flex-col h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-pink-50 border-r border-orange-200 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-orange-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Mental Saúde</h2>
              <p className="text-xs text-gray-500">Painel Admin</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white shadow-md'
                  : 'text-gray-700 hover:bg-orange-100',
                collapsed && 'justify-center'
              )}
            >
              <Icon className={cn('w-5 h-5', collapsed ? 'w-6 h-6' : '')} />
              {!collapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-orange-200">
        <button
          onClick={() => {
            // Implementar logout
            window.location.href = '/api/auth/signout'
          }}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className={cn('w-5 h-5', collapsed ? 'w-6 h-6' : '')} />
          {!collapsed && <span className="font-medium">Sair</span>}
        </button>
      </div>
    </div>
  )
}
