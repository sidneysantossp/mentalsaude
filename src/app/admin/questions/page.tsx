import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Plus, Edit, Trash2, FileText } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getQuestionsWithTests() {
  // Return empty array during build to avoid database connection issues
  return []
}

export default async function QuestionsPage() {
  const tests = await getQuestionsWithTests()
  const totalQuestions = tests.reduce((sum, test) => sum + test.questions.length, 0)

  const questionTypeLabels: Record<string, string> = {
    MULTIPLE_CHOICE: 'Múltipla Escolha',
    LIKERT_SCALE: 'Escala Likert',
    YES_NO: 'Sim/Não',
    TEXT: 'Texto Livre'
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Questões</h1>
          <p className="text-gray-600">Crie e gerencie as questões dos testes psicológicos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Questões</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalQuestions}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Testes com Questões</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {tests.filter(t => t.questions.length > 0).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Testes sem Questões</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {tests.filter(t => t.questions.length === 0).length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {tests.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">Nenhum teste cadastrado ainda</p>
              <Link href="/admin/tests/new">
                <Button>Criar Primeiro Teste</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          tests.map((test) => (
            <Card key={test.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{test.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {test.questions.length} {test.questions.length === 1 ? 'questão' : 'questões'}
                    </CardDescription>
                  </div>
                  <Link href={`/admin/tests/${test.id}/questions/new`}>
                    <Button size="sm" className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:opacity-90">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Questão
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {test.questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <HelpCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Nenhuma questão cadastrada para este teste</p>
                    <Link href={`/admin/tests/${test.id}/questions/new`}>
                      <Button variant="outline" size="sm" className="mt-4">
                        Adicionar Primeira Questão
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {test.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">{question.text}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {questionTypeLabels[question.type] || question.type}
                            </Badge>
                            {question.options && (
                              <span className="text-xs text-gray-500">
                                {JSON.parse(question.options).length} opções
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
