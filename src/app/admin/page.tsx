import { prisma } from '@/lib/prisma-db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  FileText, 
  BarChart3, 
  Activity,
  TrendingUp,
  BookOpen
} from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const [totalUsers, totalTests, totalResults, totalPosts] = await Promise.all([
      prisma.user.count(),
      prisma.test.count(),
      prisma.testResult.count(),
      0 // Blog posts - implementar depois
    ])

  const recentUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    }
  })

  const recentResults = await prisma.testResult.count({
    where: {
      completedAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    }
  })

  return {
    totalUsers,
    totalTests,
    totalResults,
    totalPosts,
    recentUsers,
    recentResults
  }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      totalUsers: 0,
      totalTests: 0,
      totalResults: 0,
      totalPosts: 0,
      recentUsers: 0,
      recentResults: 0
    }
  }
}

async function getRecentActivity() {
  try {
    const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  })

  const recentResults = await prisma.testResult.findMany({
    take: 5,
    orderBy: { completedAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      },
      test: {
        select: { title: true }
      }
    }
  })

  return { recentUsers, recentResults }
  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return { recentUsers: [], recentResults: [] }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const { recentUsers, recentResults } = await getRecentActivity()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
        <p className="text-gray-600">Visão geral do sistema Mental Saúde</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Usuários</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                <p className="text-xs text-green-600 mt-1">+{stats.recentUsers} esta semana</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Testes Criados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTests}</p>
                <p className="text-xs text-gray-600 mt-1">Disponíveis</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resultados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalResults}</p>
                <p className="text-xs text-green-600 mt-1">+{stats.recentResults} esta semana</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Posts do Blog</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPosts}</p>
                <p className="text-xs text-gray-600 mt-1">Publicados</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Usuários Recentes
            </CardTitle>
            <CardDescription>Últimos usuários cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum usuário cadastrado</p>
              ) : (
                recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{user.name || 'Sem nome'}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Resultados Recentes
            </CardTitle>
            <CardDescription>Últimos testes realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhum resultado disponível</p>
              ) : (
                recentResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{result.test.title}</p>
                      <p className="text-sm text-gray-500">{result.user.name || result.user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {result.totalScore} pts
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(result.completedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
