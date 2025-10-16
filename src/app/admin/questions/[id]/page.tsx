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
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Eye, 
  HelpCircle,
  Brain,
  Heart,
  Flame,
  Activity,
  Plus,
  X,
  GripVertical
} from 'lucide-react'

interface Question {
  id: string
  text: string
  type: string
  order: number
  testId: string
  testTitle: string
  testCategory: string
  options: QuestionOption[]
  createdAt: string
}

interface QuestionOption {
  id: string
  text: string
  value: number
  order: number
}

interface Test {
  id: string
  title: string
  category: string
}

export default function EditQuestion() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [questionId, setQuestionId] = useState<string | null>(null)
  
  const [question, setQuestion] = useState<Question | null>(null)
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    text: '',
    type: '',
    testId: '',
    order: 1
  })
  const [options, setOptions] = useState<QuestionOption[]>([])

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
        setQuestionId(id)
      } else {
        setLoading(false)
      }
    }
  }, [status, session, router])

  useEffect(() => {
    // Buscar dados quando tivermos o ID e a sessão estiver pronta
    if (questionId && status === 'authenticated' && mounted) {
      fetchData()
    }
  }, [questionId, status, mounted])

  const fetchData = async () => {
    try {
      // Fetch question
      const questionResponse = await fetch(`/api/admin/questions/${questionId}`)
      if (questionResponse.ok) {
        const questionData = await questionResponse.json()
        setQuestion(questionData.question)
        setFormData({
          text: questionData.question.text,
          type: questionData.question.type,
          testId: questionData.question.testId,
          order: questionData.question.order
        })
        setOptions(questionData.question.options || [])
      } else if (questionResponse.status === 404) {
        router.push('/admin/questions')
      }

      // Fetch tests for dropdown
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: formData.text,
          type: formData.type,
          testId: formData.testId,
          order: formData.order,
          options: formData.type !== 'TEXT' ? options : []
        })
      })

      if (response.ok) {
        const updatedQuestion = await response.json()
        setQuestion(updatedQuestion.question)
        alert('Questão atualizada com sucesso!')
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao atualizar questão')
      }
    } catch (error) {
      console.error('Error updating question:', error)
      alert('Erro ao atualizar questão')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta questão? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/questions/${questionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Questão excluída com sucesso!')
        router.push('/admin/questions')
      } else {
        alert('Erro ao excluir questão')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Erro ao excluir questão')
    }
  }

  const addOption = () => {
    const newOption: QuestionOption = {
      id: `temp-${Date.now()}`,
      text: '',
      value: options.length,
      order: options.length + 1
    }
    setOptions([...options, newOption])
  }

  const updateOption = (index: number, field: 'text' | 'value', value: string | number) => {
    const updatedOptions = [...options]
    if (field === 'text') {
      updatedOptions[index].text = value as string
    } else {
      updatedOptions[index].value = Number(value)
    }
    setOptions(updatedOptions)
  }

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index)
    // Reorder remaining options
    const reorderedOptions = updatedOptions.map((opt, i) => ({
      ...opt,
      order: i + 1,
      value: i
    }))
    setOptions(reorderedOptions)
  }

  const moveOption = (index: number, direction: 'up' | 'down') => {
    const newOptions = [...options]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < options.length) {
      // Swap options
      [newOptions[index], newOptions[targetIndex]] = [newOptions[targetIndex], newOptions[index]]
      
      // Update order and value
      newOptions.forEach((opt, i) => {
        opt.order = i + 1
        opt.value = i
      })
      
      setOptions(newOptions)
    }
  }

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
          <p className="text-gray-600">Carregando questão...</p>
          {questionId && <p className="text-sm text-gray-500 mt-2">ID: {questionId}</p>}
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

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Questão não encontrada</h2>
          <p className="text-gray-600 mb-4">A questão que você está procurando não existe.</p>
          <Link href="/admin/questions">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Questões
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = getCategoryIcon(question.testCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/questions" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <IconComponent className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Editar Questão</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Question Info Card */}
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconComponent className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-xl">Questão #{question.order}</CardTitle>
                  <CardDescription>
                    <Badge className={getCategoryColor(question.testCategory)}>
                      {getCategoryLabel(question.testCategory)}
                    </Badge>
                    <Badge className={getTypeColor(question.type)} ml-2>
                      {getTypeLabel(question.type)}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Teste: {question.testTitle}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Informações da Questão</CardTitle>
              <CardDescription>
                Edite o texto e configurações da questão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="testId">Teste</Label>
                  <Select
                    value={formData.testId}
                    onValueChange={(value) => setFormData({ ...formData, testId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um teste" />
                    </SelectTrigger>
                    <SelectContent>
                      {tests.map(test => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Questão</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LIKERT_SCALE">Escala Likert</SelectItem>
                      <SelectItem value="MULTIPLE_CHOICE">Múltipla Escolha</SelectItem>
                      <SelectItem value="YES_NO">Sim/Não</SelectItem>
                      <SelectItem value="TEXT">Texto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="order">Ordem da Questão</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Texto da Questão</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Digite o texto da questão..."
                  rows={3}
                  required
                />
              </div>

              {/* Options Section */}
              {formData.type !== 'TEXT' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Opções de Resposta</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOption}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Opção
                    </Button>
                  </div>
                  
                  {options.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nenhuma opção adicionada</p>
                      <p className="text-sm text-gray-500">Adicione opções para esta questão</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {options.map((option, index) => (
                        <div key={option.id} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <Input
                              placeholder="Texto da opção"
                              value={option.text}
                              onChange={(e) => updateOption(index, 'text', e.target.value)}
                            />
                            <Input
                              type="number"
                              placeholder="Valor"
                              value={option.value}
                              onChange={(e) => updateOption(index, 'value', e.target.value)}
                              min="0"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveOption(index, 'up')}
                              disabled={index === 0}
                            >
                              ↑
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveOption(index, 'down')}
                              disabled={index === options.length - 1}
                            >
                              ↓
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-gray-500">
                  Criada em {new Date(question.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/admin/questions">
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
              Navegue rapidamente para outras áreas relacionadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href={`/admin/tests/${question.testId}/edit`}>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Editar Teste
                </Button>
              </Link>
              
              <Link href={`/admin/questions?test=${question.testId}`}>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Ver Questões do Teste
                </Button>
              </Link>
              
              <Link href={`/admin/questions/new?test=${question.testId}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Questão neste Teste
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}