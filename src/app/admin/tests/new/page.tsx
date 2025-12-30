'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ImageUpload } from '@/components/admin/ImageUpload'

export default function NewTestPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'ANXIETY',
    instructions: '',
    timeLimit: '',
    isPremium: false,
    cardImage: '',
    isActive: true
  })

  const categories = [
    { value: 'DEPRESSION', label: 'Depressão' },
    { value: 'ANXIETY', label: 'Ansiedade' },
    { value: 'BURNOUT', label: 'Burnout' },
    { value: 'ADHD', label: 'TDAH' },
    { value: 'OCD', label: 'TOC' },
    { value: 'STRESS', label: 'Estresse' },
    { value: 'SLEEP', label: 'Sono' },
    { value: 'SELF_ESTEEM', label: 'Autoestima' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timeLimit: formData.timeLimit ? parseInt(formData.timeLimit) : null,
          shortDescription: formData.shortDescription || null,
          cardImage: formData.cardImage || null
        })
      })

      if (!response.ok) throw new Error('Erro ao criar teste')

      toast.success('Teste criado com sucesso!')
      router.push('/admin/tests')
    } catch (error) {
      toast.error('Erro ao criar teste')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/tests">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Teste</h1>
        <p className="text-gray-600">Preencha as informações do teste psicológico</p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Informações do Teste</CardTitle>
          <CardDescription>Configure os detalhes básicos do teste</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Teste *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Teste de Ansiedade"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o objetivo e o que o teste avalia..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Mini Descrição (para o card)</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Breve descrição que aparecerá no card do teste..."
                rows={2}
              />
              <p className="text-xs text-gray-500">Texto curto que aparece no card de visualização</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instruções *</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Instruções para o usuário realizar o teste..."
                rows={4}
                required
              />
            </div>

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
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardImage">Imagem do Card</Label>
              <ImageUpload
                value={formData.cardImage}
                onChange={(url) => setFormData({ ...formData, cardImage: url })}
                onRemove={() => setFormData({ ...formData, cardImage: '' })}
              />
              <p className="text-xs text-gray-500">Arraste uma imagem ou cole a URL da imagem destacada do card</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="isPremium">Teste Premium</Label>
                <p className="text-sm text-gray-500">Marque se o teste é exclusivo para usuários premium</p>
              </div>
              <Switch
                id="isPremium"
                checked={formData.isPremium}
                onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="isActive">Teste Ativo</Label>
                <p className="text-sm text-gray-500">O teste estará disponível para os usuários</p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:opacity-90"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Salvando...' : 'Criar Teste'}
              </Button>
              <Link href="/admin/tests">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
