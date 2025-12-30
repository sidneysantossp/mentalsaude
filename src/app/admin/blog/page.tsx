import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BookOpen, Calendar, Eye, Edit } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function BlogPage() {
  // Mock data - implementar com Prisma depois
  const posts = [
    {
      id: '1',
      title: 'Como lidar com a ansiedade no dia a dia',
      excerpt: 'Dicas práticas para gerenciar sintomas de ansiedade e melhorar sua qualidade de vida...',
      author: 'Dr. João Silva',
      category: 'Ansiedade',
      status: 'published',
      views: 1234,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Sinais de depressão: quando procurar ajuda',
      excerpt: 'Entenda os principais sintomas da depressão e saiba quando é hora de buscar apoio profissional...',
      author: 'Dra. Maria Santos',
      category: 'Depressão',
      status: 'published',
      views: 892,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '3',
      title: 'Burnout: prevenção e tratamento',
      excerpt: 'Como identificar e prevenir o esgotamento profissional antes que se torne um problema sério...',
      author: 'Dr. João Silva',
      category: 'Burnout',
      status: 'draft',
      views: 0,
      createdAt: new Date('2024-01-20')
    }
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Blog</h1>
          <p className="text-gray-600">Crie e gerencie artigos sobre saúde mental</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Artigo
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{posts.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Publicados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {posts.filter(p => p.status === 'published').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rascunhos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {posts.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Edit className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Artigos do Blog</CardTitle>
          <CardDescription>Gerencie todos os artigos publicados e rascunhos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Por {post.author}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.createdAt.toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views} visualizações
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </Link>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
