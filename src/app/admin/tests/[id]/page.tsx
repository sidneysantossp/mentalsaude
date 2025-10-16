'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from '@/components/ui/image-upload'
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Eye, 
  Brain,
  Heart,
  Flame,
  Activity,
  Clock,
  FileText,
  Plus,
  X
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

export default function EditTest() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [testId, setTestId] = useState<string | null>(null)
  
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    timeLimit: '',
    imageUrl: '',
    isActive: true
  })

  useEffect(() => {
    // Garantir que está no cliente
    setMounted(true)
    
    // Verificar autenticação primeiro
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    // Extrair ID diretamente do window.location
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      console.log('Window location pathname:', path)
      
      // Pega o último segmento da URL
      const lastSlashIndex = path.lastIndexOf('/')
      const id = lastSlashIndex !== -1 ? path.substring(lastSlashIndex + 1) : ''
      console.log('Extracted ID:', id)
      
      if (id && id !== '[id]') {
        setTestId(id)
      } else {
        setError('ID não encontrado na URL')
        setLoading(false)
      }
    }
  }, [status, session, router])

  useEffect(() => {
    // Buscar dados do teste quando tivermos o ID e a sessão estiver pronta
    if (testId && status === 'authenticated' && mounted) {
      fetchTest()
    }
  }, [testId, status, mounted])

  const fetchTest = async () => {
    if (!testId) return
    
    try {
      setError(null)
      console.log('Fetching test with ID:', testId)
      const response = await fetch(`/api/admin/tests/${testId}`)
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Test data received:', data)
        setTest(data.test)
        setFormData({
          title: data.test.title,
          description: data.test.description,
          category: data.test.category,
          timeLimit: data.test.timeLimit?.toString() || '',
          imageUrl: data.test.imageUrl || '',
          isActive: data.test.isActive
        })
      } else if (response.status === 404) {
        setError('Teste não encontrado')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Erro ao buscar teste')
      }
    } catch (error) {
      console.error('Error fetching test:', error)
      setError('Erro de conexão ao buscar teste')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testId) return
    
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/tests/${testId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          timeLimit: formData.timeLimit ? parseInt(formData.timeLimit) : null,
          imageUrl: formData.imageUrl || null,
          isActive: formData.isActive
        })
      })

      if (response.ok) {
        const updatedTest = await response.json()
        setTest(updatedTest.test)
        alert('Teste atualizado com sucesso!')
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao atualizar teste')
      }
    } catch (error) {
      console.error('Error updating test:', error)
      alert('Erro ao atualizar teste')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!testId) return
    
    if (!confirm('Tem certeza que deseja excluir este teste? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/tests/${testId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Teste excluído com sucesso!')
        router.push('/admin/tests')
      } else {
        alert('Erro ao excluir teste')
      }
    } catch (error) {
      console.error('Error deleting test:', error)
      alert('Erro ao excluir teste')
    }
  }

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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando teste...</p>
          {testId && <p className="text-sm text-gray-500 mt-2">ID: {testId}</p>}
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

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {error || 'Teste não encontrado'}
          </h2>
          <p className="text-gray-600 mb-4">
            {error || 'O teste que você está procurando não existe.'}
          </p>
          {testId && <p className="text-sm text-gray-500 mb-4">ID procurado: {testId}</p>}
          <Link href="/admin/tests">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Testes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = getCategoryIcon(test.category)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/tests" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <IconComponent className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Editar Teste</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/testes/${test.category.toLowerCase().replace('_', '-')}`}>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </Link>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Info Card */}
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconComponent className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-xl">{test.title}</CardTitle>
                  <CardDescription>
                    <Badge className={getCategoryColor(test.category)}>
                      {getCategoryLabel(test.category)}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Brain className="h-4 w-4" />
                  <span>{test.questionCount} questões</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="h-4 w-4" />
                  <span>{test.resultCount} realizações</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Informações do Teste</CardTitle>
              <CardDescription>
                Edite as informações básicas do teste
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Teste</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Teste de Depressão"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DEPRESSION">Depressão</SelectItem>
                      <SelectItem value="ANXIETY">Ansiedade</SelectItem>
                      <SelectItem value="ADHD">TDAH</SelectItem>
                      <SelectItem value="STRESS">Estresse</SelectItem>
                      <SelectItem value="OCD">Compulsão</SelectItem>
                      <SelectItem value="BURNOUT">Burnout</SelectItem>
                      <SelectItem value="SLEEP">Sono</SelectItem>
                      <SelectItem value="SELF_ESTEEM">Autoestima</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o objetivo e conteúdo do teste..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Imagem de Destaque</Label>
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  onRemove={() => setFormData({ ...formData, imageUrl: '' })}
                  disabled={saving}
                />
                <p className="text-sm text-gray-500">
                  Arraste uma imagem ou cole uma URL. Esta imagem aparecerá no card do teste.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Tempo Limite (minutos)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                    placeholder="Deixe em branco para sem limite"
                    min="1"
                  />
                  <p className="text-sm text-gray-500">
                    Deixe em branco se o teste não tiver limite de tempo
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Status do Teste</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="isActive" className="text-sm">
                      {formData.isActive ? 'Teste Ativo' : 'Teste Inativo'}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formData.isActive 
                      ? 'O teste está visível e disponível para os usuários'
                      : 'O teste está oculto e não disponível para os usuários'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-gray-500">
                  Criado em {new Date(test.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/admin/tests">
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Quick Actions */}
        <Card className="shadow-sm mt-6">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Gerencie questões e visualize resultados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={`/admin/questions?testId=${test.id}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="h-4 w-4 mr-2" />
                  Gerenciar Questões
                </Button>
              </Link>
              <Link href={`/admin/results?testId=${test.id}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Ver Resultados
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}