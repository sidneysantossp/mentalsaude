import { getTestBySlug } from '@/lib/db'
import { prisma } from '@/lib/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Mail, Calendar, Shield } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            testResults: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export default async function UsersPage() {
  const users = await getUsers()

  const roleLabels: Record<string, string> = {
    USER: 'Usuário',
    ADMIN: 'Administrador',
    PROFESSIONAL: 'Profissional'
  }

  const roleColors: Record<string, string> = {
    USER: 'bg-blue-100 text-blue-800',
    ADMIN: 'bg-red-100 text-red-800',
    PROFESSIONAL: 'bg-green-100 text-green-800'
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Usuários</h1>
          <p className="text-gray-600">Visualize e gerencie todos os usuários da plataforma</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            {users.length} usuários
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Todos os usuários cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Nenhum usuário cadastrado</p>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {user.name || 'Sem nome'}
                        </h3>
                        <Badge className={roleColors[user.role]}>
                          {roleLabels[user.role]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {user._count.testResults} testes
                      </p>
                      <p className="text-xs text-gray-500">realizados</p>
                    </div>
                    <Link href={`/admin/users/${user.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
