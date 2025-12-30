'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    text: '',
    type: 'LIKERT_SCALE',
    order: 1,
    options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']
  })

  const questionTypes = [
    { value: 'LIKERT_SCALE', label: 'Escala Likert' },
    { value: 'MULTIPLE_CHOICE', label: 'Múltipla Escolha' },
    { value: 'YES_NO', label: 'Sim/Não' },
    { value: 'TEXT', label: 'Texto Livre' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/tests/${params.id}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          options: JSON.stringify(formData.options)
        })
      })

      if (!response.ok) throw new Error('Erro ao criar questão')

      toast.success('Questão criada com sucesso!')
      router.push(`/admin/tests/${params.id}`)
    } catch (error) {
      toast.error('Erro ao criar questão')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, '']
    })
  }

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index)
    setFormData({ ...formData, options: newOptions })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href={`/admin/tests/${params.id}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nova Questão</h1>
        <p className="text-gray-600">Adicione uma nova questão ao teste</p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Informações da Questão</CardTitle>
          <CardDescription>Preencha os detalhes da questão</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Texto da Questão *</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Ex: Você se sente nervoso ou ansioso?"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Questão *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Ordem *</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                min="1"
                required
              />
              <p className="text-xs text-gray-500">Posição da questão no teste</p>
            </div>

            {(formData.type === 'LIKERT_SCALE' || formData.type === 'MULTIPLE_CHOICE') && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Opções de Resposta *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addOption}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Opção
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Opção ${index + 1}`}
                        required
                      />
                      {formData.options.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:opacity-90"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Salvando...' : 'Criar Questão'}
              </Button>
              <Link href={`/admin/tests/${testId}`}>
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
