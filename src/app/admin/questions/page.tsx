'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Brain,
  Heart,
  Flame,
  Activity,
  Filter,
  Download,
  ArrowLeft,
  List,
  Grid3X3
} from 'lucide-react'

interface Question {
  id: string
  text: string
  type: string
  order: number
  testId: string
  testTitle: string
  testCategory: string
  optionsCount: number
  createdAt: string
}

export default function AdminQuestions() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [tests, setTests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTest, setFilterTest] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

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

    fetchData()
  }, [status, session, router])

  const fetchData = async () => {
    try {
      // Fetch questions
      const questionsResponse = await fetch('/api/admin/questions')
      if (questionsResponse.ok) {
        const questionsData = await questionsResponse.json()
        setQuestions(questionsData.questions)
      }

      // Fetch tests for filter
      const testsResponse = await fetch('/api/admin/tests')
      if (testsResponse.ok) {
        const testsData = await testsResponse.json()
        setTests(testsData.tests)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta questão? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/questions/${questionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setQuestions(questions.filter(question => question.id !== questionId))
      } else {
        alert('Erro ao excluir questão')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Erro ao excluir questão')
    }
  }

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.testTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTest = filterTest === 'all' || question.testId === filterTest
    const matchesType = filterType === 'all' || question.type === filterType
    
    return matchesSearch && matchesTest && matchesType
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DEPRESSION': return Brain
      case 'ANXIETY': return Heart
      case 'ADHD': return Activity
      case 'STRESS': return Flame
      default: return HelpCircle
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'LIKERT_SCALE': return 'Escala Likert'
      case 'MULTIPLE_CHOICE': return 'Múltipla Escolha'
      case 'YES_NO': return 'Sim/Não'
      case 'TEXT': return 'Texto'
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'LIKERT_SCALE': return 'bg-blue-100 text-blue-800'
      case 'MULTIPLE_CHOICE': return 'bg-green-100 text-green-800'
      case 'YES_NO': return 'bg-purple-100 text-purple-800'
      case 'TEXT': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando questões...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <HelpCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
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
              <h1 className="text-xl font-bold text-gray-900">Gerenciamento de Questões</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/questions/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Questão
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/admin" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Dashboard
            </Link>
            <Link href="/admin/users" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Usuários
            </Link>
            <Link href="/admin/tests" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Testes
            </Link>
            <Link href="/admin/questions" className="py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por texto ou teste..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterTest}
                  onChange={(e) => setFilterTest(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todos os testes</option>
                  {tests.map(test => (
                    <option key={test.id} value={test.id}>
                      {test.title}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="LIKERT_SCALE">Escala Likert</option>
                  <option value="MULTIPLE_CHOICE">Múltipla Escolha</option>
                  <option value="YES_NO">Sim/Não</option>
                  <option value="TEXT">Texto</option>
                </select>

                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-l-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>

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
                <HelpCircle className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Questões</p>
                  <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Testes com Questões</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {[...new Set(questions.map(q => q.testId))].length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <List className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Escala Likert</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {questions.filter(q => q.type === 'LIKERT_SCALE').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Grid3X3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Múltipla Escolha</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {questions.filter(q => q.type === 'MULTIPLE_CHOICE').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions Display */}
        {filteredQuestions.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma questão encontrada</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterTest !== 'all' || filterType !== 'all' 
                  ? 'Tente ajustar os filtros de busca' 
                  : 'Comece criando uma nova questão'}
              </p>
              <Link href="/admin/questions/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Questão
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : viewMode === 'list' ? (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Lista de Questões</CardTitle>
              <CardDescription>
                {filteredQuestions.length} questão(ões) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredQuestions.map((question) => {
                  const IconComponent = getCategoryIcon(question.testCategory)
                  return (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <IconComponent className="h-4 w-4 text-blue-600" />
                            <Badge className={getCategoryColor(question.testCategory)}>
                              {getCategoryLabel(question.testCategory)}
                            </Badge>
                            <Badge className={getTypeColor(question.type)}>
                              {getTypeLabel(question.type)}
                            </Badge>
                            <Badge variant="outline">
                              Ordem: {question.order}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            {question.text}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Teste: {question.testTitle}</span>
                            <span>{question.optionsCount} opções</span>
                            <span>{new Date(question.createdAt).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Link href={`/admin/questions/${question.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Link href={`/admin/questions/${question.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question) => {
              const IconComponent = getCategoryIcon(question.testCategory)
              return (
                <Card key={question.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      <Badge className={getCategoryColor(question.testCategory)}>
                        {getCategoryLabel(question.testCategory)}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm line-clamp-3">
                      {question.text}
                    </CardTitle>
                    <CardDescription>
                      {question.testTitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <Badge className={getTypeColor(question.type)}>
                          {getTypeLabel(question.type)}
                        </Badge>
                        <Badge variant="outline">
                          Ordem: {question.order}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{question.optionsCount} opções</span>
                        <span>{new Date(question.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Link href={`/admin/questions/${question.id}`}>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                          </Button>
                        </Link>
                        <Link href={`/admin/questions/${question.id}`}>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
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