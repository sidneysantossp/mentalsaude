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
import { ImageUpload } from '@/components/ui/image-upload'
import { 
  ArrowLeft, 
  Save, 
  Plus,
  FileText,
  Brain,
  Heart,
  Flame,
  Activity
} from 'lucide-react'

export default function NewTest() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    timeLimit: '',
    imageUrl: '',
    isActive: true
  })

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
  }, [status, session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/tests', {
        method: 'POST',
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
        const data = await response.json()
        alert('Teste criado com sucesso!')
        router.push(`/admin/tests/${data.test.id}`)
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao criar teste')
      }
    } catch (error) {
      console.error('Error creating test:', error)
      alert('Erro ao criar teste')
    } finally {
      setLoading(false)
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
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

  const IconComponent = formData.category ? getCategoryIcon(formData.category) : FileText

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
                <Plus className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Criar Novo Teste</h1>
              </div>
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
        {/* Create Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <IconComponent className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle>Informações do Teste</CardTitle>
                  <CardDescription>
                    Preencha as informações básicas para criar um novo teste
                  </CardDescription>
                </div>
              </div>
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
                  <p className="text-sm text-gray-500">
                    Um título claro e descritivo para o teste
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
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
                  <p className="text-sm text-gray-500">
                    Selecione a categoria que melhor descreve o teste
                  </p>
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
                <p className="text-sm text-gray-500">
                  Explique o que o teste avalia e como funciona
                </p>
              </div>

              <div className="space-y-2">
                <Label>Imagem de Destaque</Label>
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  onRemove={() => setFormData({ ...formData, imageUrl: '' })}
                  disabled={loading}
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
                      ? 'O teste estará visível e disponível para os usuários'
                      : 'O teste ficará oculto e não disponível para os usuários'
                    }
                  </p>
                </div>
              </div>

              {/* Preview Card */}
              {formData.title && formData.category && (
                <div className="border-t pt-6">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Visualização Prévia</Label>
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {formData.category === 'DEPRESSION' ? 'Depressão' :
                             formData.category === 'ANXIETY' ? 'Ansiedade' :
                             formData.category === 'ADHD' ? 'TDAH' :
                             formData.category === 'STRESS' ? 'Estresse' :
                             formData.category === 'OCD' ? 'Compulsão' :
                             formData.category === 'BURNOUT' ? 'Burnout' :
                             formData.category === 'SLEEP' ? 'Sono' :
                             formData.category === 'SELF_ESTEEM' ? 'Autoestima' : formData.category}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          formData.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {formData.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{formData.title}</CardTitle>
                      {formData.description && (
                        <CardDescription className="text-sm">
                          {formData.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    {formData.timeLimit && (
                      <CardContent className="pt-0">
                        <div className="flex items-center text-sm text-gray-600">
                          <span>⏱️ {formData.timeLimit} minutos</span>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-gray-500">
                  Após criar, você poderá adicionar questões ao teste
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/admin/tests">
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Criando...' : 'Criar Teste'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Help Card */}
        <Card className="shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Dicas para Criar um Bom Teste</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">1.</span>
              <div>
                <p className="font-medium">Título Claro</p>
                <p className="text-sm text-gray-600">Use um título que descreva claramente o que o teste avalia</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">2.</span>
              <div>
                <p className="font-medium">Descrição Detalhada</p>
                <p className="text-sm text-gray-600">Explique o propósito do teste e o que os usuários podem esperar</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">3.</span>
              <div>
                <p className="font-medium">Categoria Adequada</p>
                <p className="text-sm text-gray-600">Escolha a categoria que melhor representa o conteúdo do teste</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">4.</span>
              <div>
                <p className="font-medium">Tempo Apropriado</p>
                <p className="text-sm text-gray-600">Defina um tempo limite razoável baseado na complexidade das questões</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}