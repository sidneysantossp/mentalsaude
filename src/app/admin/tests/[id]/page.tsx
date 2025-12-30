import { prisma } from '@/lib/prisma-db'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Trash2, Plus, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getTest(id: string) {
  try {
    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            testResults: true
          }
        }
      }
    })
    return test
  } catch (error) {
    console.error('Error fetching test:', error)
    return null
  }
}

export default async function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const test = await getTest(id)

  if (!test) {
    notFound()
  }

  const categoryLabels: Record<string, string> = {
    DEPRESSION: 'Depressão',
    ANXIETY: 'Ansiedade',
    BURNOUT: 'Burnout',
    ADHD: 'TDAH',
    OCD: 'TOC',
    STRESS: 'Estresse',
    SLEEP: 'Sono',
    SELF_ESTEEM: 'Autoestima'
  }

  const questionTypeLabels: Record<string, string> = {
    MULTIPLE_CHOICE: 'Múltipla Escolha',
    LIKERT_SCALE: 'Escala Likert',
    YES_NO: 'Sim/Não',
    TEXT: 'Texto Livre'
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/tests">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Testes
          </Button>
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                {categoryLabels[test.category] || test.category}
              </Badge>
              <Badge variant={test.isActive ? "default" : "secondary"}>
                {test.isActive ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/tests/${test.id}/edit`}>
              <Button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:opacity-90">
                <Edit className="w-4 h-4 mr-2" />
                Editar Teste
              </Button>
            </Link>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Questões</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{test.questions.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Realizações</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{test._count.testResults}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tempo Limite</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {test.timeLimit || '-'}
                </p>
                {test.timeLimit && <p className="text-xs text-gray-500 mt-1">minutos</p>}
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Teste</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
              <p className="text-gray-600">{test.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Instruções</h3>
              <p className="text-gray-600">{test.instructions}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Criado em</h3>
              <p className="text-gray-600">
                {new Date(test.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Questões do Teste</CardTitle>
              <Link href={`/admin/tests/${id}/questions/new`}>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </Link>
            </div>
            <CardDescription>
              {test.questions.length} questões cadastradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {test.questions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">Nenhuma questão cadastrada</p>
                <Link href={`/admin/tests/${id}/questions/new`}>
                  <Button size="sm">Adicionar Primeira Questão</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {test.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 mb-1">{question.text}</p>
                      <Badge variant="outline" className="text-xs">
                        {questionTypeLabels[question.type] || question.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
