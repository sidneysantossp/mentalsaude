import { prisma } from '@/lib/prisma-db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { getCategoryLabel } from '@/lib/categories'

export const dynamic = 'force-dynamic'

async function getTests() {
  try {
    const tests = await prisma.test.findMany({
      include: {
        questions: true,
        _count: {
          select: {
            testResults: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return tests
  } catch (error) {
    console.error('Error fetching tests:', error)
    return []
  }
}

export default async function TestsPage() {
  const tests = await getTests()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Testes</h1>
          <p className="text-gray-600">Crie e gerencie os testes psicológicos da plataforma</p>
        </div>
        <Link href="/admin/tests/new">
          <Button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Teste
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">Nenhum teste cadastrado ainda</p>
              <Link href="/admin/tests/new">
                <Button>Criar Primeiro Teste</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{test.title}</CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      {getCategoryLabel(test.category)}
                    </Badge>
                  </div>
                  <Badge variant={test.isActive ? "default" : "secondary"}>
                    {test.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {test.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questões:</span>
                    <span className="font-medium">{test.questions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Realizações:</span>
                    <span className="font-medium">{test._count.testResults}</span>
                  </div>
                  {test.timeLimit && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tempo limite:</span>
                      <span className="font-medium">{test.timeLimit} min</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/tests/${test.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </Link>
                  <Link href={`/admin/tests/${test.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
