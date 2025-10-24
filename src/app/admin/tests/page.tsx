'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
<<<<<<< HEAD
=======
import AdminNavigation from '@/components/admin/admin-navigation'
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Brain,
  Heart,
  Flame,
  Activity,
  Clock,
  Filter,
  Download,
  ArrowLeft,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

interface Test {
  id: string
  title: string
  description: string
  category: string
  timeLimit: number | null
  isActive: boolean
  createdAt: string
  questionCount: number
  resultCount: number
}

export default function AdminTests() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Check if user is admin
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    fetchTests()
  }, [status, session, router])

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/admin/tests')
      if (response.ok) {
        const data = await response.json()
        setTests(data.tests)
      }
    } catch (error) {
      console.error('Error fetching tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTest = async (testId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/tests/${testId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !currentStatus
        })
      })

      if (response.ok) {
        setTests(tests.map(test => 
          test.id === testId 
            ? { ...test, isActive: !currentStatus }
            : test
        ))
      } else {
        alert('Erro ao atualizar status do teste')
      }
    } catch (error) {
      console.error('Error toggling test:', error)
      alert('Erro ao atualizar status do teste')
    }
  }

  const handleDeleteTest = async (testId: string) => {
    if (!confirm('Tem certeza que deseja excluir este teste? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/tests/${testId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setTests(tests.filter(test => test.id !== testId))
      } else {
        alert('Erro ao excluir teste')
      }
    } catch (error) {
      console.error('Error deleting test:', error)
      alert('Erro ao excluir teste')
    }
  }

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || test.category === filterCategory
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && test.isActive) ||
                         (filterStatus === 'inactive' && !test.isActive)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return Brain
      case 'ANXIETY': return Heart
      case 'ADHD': return Activity
      case 'STRESS': return Flame
      default: return FileText
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return 'Depressão'
      case 'ANXIETY': return 'Ansiedade'
      case 'ADHD': return 'TDAH'
      case 'STRESS': return 'Estresse'
      case 'OCD': return 'Compulsão'
      case 'BURNOUT': return 'Burnout'
      case 'SLEEP': return 'Sono'
      case 'SELF_ESTEEM': return 'Autoestima'
      default: return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return 'bg-blue-100 text-blue-800'
      case 'ANXIETY': return 'bg-green-100 text-green-800'
      case 'ADHD': return 'bg-orange-100 text-orange-800'
      case 'STRESS': return 'bg-red-100 text-red-800'
      case 'OCD': return 'bg-purple-100 text-purple-800'
      case 'BURNOUT': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando testes...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
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
              <Link href="/admin" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Gerenciamento de Testes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/tests/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Teste
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
<<<<<<< HEAD
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/admin" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Dashboard
            </Link>
            <Link href="/admin/users" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Usuários
            </Link>
            <Link href="/admin/tests" className="py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
              Testes
            </Link>
            <Link href="/admin/questions" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Questões
            </Link>
            <Link href="/admin/results" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Resultados
            </Link>
            <Link href="/admin/settings" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Configurações
            </Link>
          </div>
        </div>
      </nav>
=======
      <AdminNavigation />
>>>>>>> ea77019058fe465d921176d51fea7060fb6ac701

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por título ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todas categorias</option>
                  <option value="DEPRESSION">Depressão</option>
                  <option value="ANXIETY">Ansiedade</option>
                  <option value="ADHD">TDAH</option>
                  <option value="STRESS">Estresse</option>
                  <option value="OCD">Compulsão</option>
                  <option value="BURNOUT">Burnout</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todos status</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>

                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total de Testes</p>
                  <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Testes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tests.filter(t => t.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Questões</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tests.reduce((sum, test) => sum + test.questionCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Realizados</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tests.reduce((sum, test) => sum + test.resultCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum teste encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                  ? 'Tente ajustar os filtros de busca' 
                  : 'Comece criando um novo teste'}
              </p>
              <Link href="/admin/tests/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Teste
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              const IconComponent = getCategoryIcon(test.category)
              return (
                <Card key={test.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <Badge className={getCategoryColor(test.category)}>
                          {getCategoryLabel(test.category)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleTest(test.id, test.isActive)}
                        className="p-1"
                      >
                        {test.isActive ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {test.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Brain className="h-3 w-3" />
                          <span>{test.questionCount} questões</span>
                        </div>
                        {test.timeLimit && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{test.timeLimit} min</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{test.resultCount} realizações</span>
                        <span>{new Date(test.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Link href={`/admin/tests/${test.id}`}>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                          </Button>
                        </Link>
                        <Link href={`/admin/tests/${test.id}`}>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTest(test.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}