import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react'

export default async function CategoriesPage() {
  const categories = [
    { value: 'DEPRESSION', label: 'Depressão', color: 'bg-blue-100 text-blue-800', tests: 2 },
    { value: 'ANXIETY', label: 'Ansiedade', color: 'bg-green-100 text-green-800', tests: 3 },
    { value: 'BURNOUT', label: 'Burnout', color: 'bg-orange-100 text-orange-800', tests: 1 },
    { value: 'ADHD', label: 'TDAH', color: 'bg-purple-100 text-purple-800', tests: 1 },
    { value: 'OCD', label: 'TOC', color: 'bg-pink-100 text-pink-800', tests: 1 },
    { value: 'STRESS', label: 'Estresse', color: 'bg-red-100 text-red-800', tests: 1 },
    { value: 'SLEEP', label: 'Sono', color: 'bg-indigo-100 text-indigo-800', tests: 0 },
    { value: 'SELF_ESTEEM', label: 'Autoestima', color: 'bg-yellow-100 text-yellow-800', tests: 0 }
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categorias de Testes</h1>
          <p className="text-gray-600">Gerencie as categorias disponíveis para os testes psicológicos</p>
        </div>
        <Button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Categorias</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{categories.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FolderTree className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Com Testes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {categories.filter(c => c.tests > 0).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FolderTree className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Sem Testes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {categories.filter(c => c.tests === 0).length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <FolderTree className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Categorias</CardTitle>
          <CardDescription>Todas as categorias disponíveis no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.value}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 rounded-lg">
                    <FolderTree className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.label}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={category.color}>{category.value}</Badge>
                      <span className="text-sm text-gray-500">
                        {category.tests} {category.tests === 1 ? 'teste' : 'testes'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled={category.tests > 0}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• As categorias são usadas para organizar os testes psicológicos</p>
            <p>• Não é possível excluir categorias que possuem testes associados</p>
            <p>• Você pode editar o nome e a descrição de cada categoria</p>
            <p>• As cores são atribuídas automaticamente para melhor visualização</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
