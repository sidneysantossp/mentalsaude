'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AdminNavigation from '@/components/admin/admin-navigation'
import { 
  Users, 
  FileText, 
  Brain, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  MessageCircle
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalTests: number
  totalResults: number
  activeUsers: number
  recentUsers: number
  recentTests: number
  chatUsers: number
  chatMessages: number
}

interface RecentActivity {
  id: string
  type: 'user' | 'test' | 'result'
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTests: 0,
    totalResults: 0,
    activeUsers: 0,
    recentUsers: 0,
    recentTests: 0,
    chatUsers: 0,
    chatMessages: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (!initialized) return

    // Only proceed if session status is determined
    if (status === 'loading') {
      return
    }

    // Check if user is admin
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    // Only fetch data if user is authenticated and is admin
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchDashboardData()
    }
  }, [status, session, router, initialized])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch dashboard stats
      const statsResponse = await fetch('/api/admin/dashboard/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.stats)
      }

      // Fetch recent activity
      const activityResponse = await fetch('/api/admin/dashboard/activity')
      if (activityResponse.ok) {
        const activityData = await activityResponse.json()
        setRecentActivity(activityData.activities)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImportTests = async () => {
    if (!confirm('Tem certeza que deseja importar os testes do frontend para o banco de dados? Esta ação pode criar duplicatas se executada múltiplas vezes.')) {
      return
    }

    setImporting(true)
    try {
      const response = await fetch('/api/admin/import-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Testes importados com sucesso!\n\nResultados:\n${data.results.map(r => `✅ ${r.title} (${r.questionsCount} questões)`).join('\n')}`)
        
        // Refresh dashboard data
        fetchDashboardData()
      } else {
        const error = await response.json()
        alert(`Erro ao importar testes: ${error.error}`)
      }
    } catch (error) {
      console.error('Error importing tests:', error)
      alert('Erro ao importar testes')
    } finally {
      setImporting(false)
    }
  }

  // Show loading only during initial session check
  if (!initialized || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Show access denied if not admin
  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta área.</p>
          <Link href="/auth/signin">
            <Button>Fazer Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Dashboard Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bem-vindo, {session.user?.name}
              </span>
              <Badge variant="secondary">Administrador</Badge>
              <Link href="/admin/profile">
                <Button variant="outline" size="sm">
                  Meu Perfil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <AdminNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total de Usuários</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  <p className="text-xs text-green-600">+{stats.recentUsers} esta semana</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total de Testes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
                  <p className="text-xs text-green-600">+{stats.recentTests} esta semana</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Chat Ativo</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.chatUsers}</p>
                  <p className="text-xs text-gray-600">{stats.chatMessages} mensagens</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Resultados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalResults}</p>
                  <p className="text-xs text-gray-600">Total realizados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Atividade Recente</span>
                </CardTitle>
                <CardDescription>
                  Últimas atividades no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-gray-500">Carregando...</p>
                    </div>
                  ) : recentActivity.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhuma atividade recente</p>
                  ) : (
                    recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          {activity.status === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {activity.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                          {activity.status === 'error' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <span>Ações Rápidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/admin/users/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </Link>
                  <Link href="/admin/tests/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Teste
                    </Button>
                  </Link>
                  <Link href="/admin/chat-management">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Gerenciar Chat
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleImportTests}
                    disabled={importing}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {importing ? 'Importando...' : 'Importar Testes'}
                  </Button>
                  <Link href="/admin/reports">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Relatórios
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}