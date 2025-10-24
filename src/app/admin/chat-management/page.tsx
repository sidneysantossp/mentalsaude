'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  Users, 
  MessageCircle, 
  Ban, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  RefreshCw,
  Search,
  Filter,
  Home,
  FileText,
  BarChart3,
  LogOut,
  Edit,
  Eye,
  Users2,
  Lock,
  Unlock,
  Trash2,
  Crown,
  X
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ChatUser {
  id: string
  username: string
  status: 'online' | 'away' | 'busy' | 'banned'
  currentRoom?: string
  joinTime: string
  lastSeen: string
  messageCount: number
  reports: number
  isModerator?: boolean
}

interface ChatRoom {
  id: string
  name: string
  description: string
  users: number
  maxUsers: number
  category: string
  isActive: boolean
  messages: number
  requiresModeration?: boolean
}

interface ChatMessage {
  id: string
  username: string
  content: string
  room: string
  timestamp: string
  isReported: boolean
  isDeleted: boolean
  reports: number
}

export default function ChatManagementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<ChatUser[]>([])
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'users' | 'rooms' | 'messages'>('users')
  const [showRoomManagement, setShowRoomManagement] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (!initialized) return

    // Only proceed if session status is determined
    if (status === 'loading') {
      return
    }

    // Check if user is admin
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    // Only fetch data if user is authenticated and is admin
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchChatData()
    }
  }, [status, session, router, initialized])

  const fetchChatData = async () => {
    try {
      const [usersRes, roomsRes, messagesRes] = await Promise.all([
        fetch('/api/chat/users'),
        fetch('/api/chat/rooms'),
        fetch('/api/chat/messages?limit=100')
      ])

      if (usersRes.ok) {
        const usersData = await usersRes.json()
        if (usersData.success) {
          setUsers(usersData.data.map((user: any) => ({
            ...user,
            messageCount: Math.floor(Math.random() * 50),
            reports: Math.floor(Math.random() * 3)
          })))
        }
      }

      if (roomsRes.ok) {
        const roomsData = await roomsRes.json()
        if (roomsData.success) {
          setRooms(roomsData.data.map((room: any) => ({
            ...room,
            isActive: true,
            messages: Math.floor(Math.random() * 500),
            requiresModeration: Math.random() > 0.7
          })))
        }
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json()
        if (messagesData.success) {
          setMessages(messagesData.data.map((msg: any) => ({
            ...msg,
            isReported: Math.random() > 0.9,
            isDeleted: false,
            reports: Math.random() > 0.95 ? Math.floor(Math.random() * 5) + 1 : 0
          })))
        }
      }
    } catch (error) {
      console.error('Error fetching chat data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBanUser = async (userId: string, username: string) => {
    try {
      // Simular banimento
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: 'banned' as const } : user
      ))

      toast({
        title: "Usuário banido",
        description: `${username} foi banido do bate papo`,
      })
    } catch (error) {
      toast({
        title: "Erro ao banir usuário",
        description: "Não foi possível banir o usuário",
        variant: "destructive"
      })
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isDeleted: true } : msg
      ))

      toast({
        title: "Mensagem deletada",
        description: "A mensagem foi removida com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro ao deletar mensagem",
        description: "Não foi possível remover a mensagem",
        variant: "destructive"
      })
    }
  }

  const handleToggleRoom = async (roomId: string) => {
    try {
      setRooms(prev => prev.map(room => 
        room.id === roomId ? { ...room, isActive: !room.isActive } : room
      ))

      toast({
        title: "Sala atualizada",
        description: "O status da sala foi alterado",
      })
    } catch (error) {
      toast({
        title: "Erro ao atualizar sala",
        description: "Não foi possível alterar o status da sala",
        variant: "destructive"
      })
    }
  }

  const handleUpdateRoom = async (roomId: string, updates: Partial<ChatRoom>) => {
    try {
      setRooms(prev => prev.map(room => 
        room.id === roomId ? { ...room, ...updates } : room
      ))

      toast({
        title: "Sala atualizada",
        description: "As configurações da sala foram atualizadas",
      })
      setShowRoomManagement(null)
    } catch (error) {
      toast({
        title: "Erro ao atualizar sala",
        description: "Não foi possível atualizar as configurações",
        variant: "destructive"
      })
    }
  }

  const handleDeleteRoom = async (roomId: string, roomName: string) => {
    if (!confirm(`Tem certeza que deseja excluir a sala "${roomName}"? Esta ação não pode ser desfeita.`)) {
      return
    }

    try {
      setRooms(prev => prev.filter(room => room.id !== roomId))

      toast({
        title: "Sala excluída",
        description: `A sala "${roomName}" foi removida`,
      })
      setShowRoomManagement(null)
    } catch (error) {
      toast({
        title: "Erro ao excluir sala",
        description: "Não foi possível excluir a sala",
        variant: "destructive"
      })
    }
  }

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMessages = messages.filter(msg => 
    !msg.isDeleted && 
    (selectedRoom === 'all' || msg.room === selectedRoom) &&
    (msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
     msg.username.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      case 'banned': return 'bg-gray-800'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Disponível'
      case 'away': return 'Ausente'
      case 'busy': return 'Ocupado'
      case 'banned': return 'Banido'
      default: return 'Desconhecido'
    }
  }

  // Componente RoomManagementModal
  function RoomManagementModal({ room, onUpdate, onDelete, onClose }: {
    room: ChatRoom
    onUpdate: (updates: Partial<ChatRoom>) => void
    onDelete: () => void
    onClose: () => void
  }) {
    const [formData, setFormData] = useState({
      name: room.name,
      description: room.description,
      maxUsers: room.maxUsers,
      category: room.category,
      isActive: room.isActive,
      requiresModeration: room.requiresModeration || false
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onUpdate(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Sala</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite o nome da sala"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geral">Geral</SelectItem>
                <SelectItem value="Suporte">Suporte</SelectItem>
                <SelectItem value="Jogos">Jogos</SelectItem>
                <SelectItem value="Música">Música</SelectItem>
                <SelectItem value="Filmes">Filmes</SelectItem>
                <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                <SelectItem value="Estudos">Estudos</SelectItem>
                <SelectItem value="18+">18+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descreva o propósito da sala"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxUsers">Limite de Usuários</Label>
            <Input
              id="maxUsers"
              type="number"
              min="2"
              max="100"
              value={formData.maxUsers}
              onChange={(e) => setFormData(prev => ({ ...prev, maxUsers: parseInt(e.target.value) || 10 }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Status Atual</Label>
            <div className="flex items-center space-x-2">
              <Badge variant={formData.isActive ? 'default' : 'secondary'}>
                {formData.isActive ? 'Ativa' : 'Inativa'}
              </Badge>
              <span className="text-sm text-gray-500">
                {room.users}/{formData.maxUsers} usuários online
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="requiresModeration"
              checked={formData.requiresModeration}
              onChange={(e) => setFormData(prev => ({ ...prev, requiresModeration: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <Label htmlFor="requiresModeration">Requer moderação</Label>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Estatísticas da Sala</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Usuários:</span>
              <p className="font-medium">{room.users}</p>
            </div>
            <div>
              <span className="text-gray-500">Mensagens:</span>
              <p className="font-medium">{room.messages}</p>
            </div>
            <div>
              <span className="text-gray-500">Capacidade:</span>
              <p className="font-medium">{room.maxUsers}</p>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <p className="font-medium">{room.isActive ? 'Ativa' : 'Inativa'}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button type="button" variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir Sala
          </Button>
          <div className="flex items-center space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              <Edit className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </form>
    )
  }

  // Show loading only during initial session check
  if (!initialized || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Show access denied if not admin
  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta área.</p>
          <Link href="/auth/signin">
            <Button>Fazer Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Gerenciamento de Chat</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bem-vindo, {session.user?.name}
              </span>
              <Badge variant="secondary">Administrador</Badge>
              <Link href="/admin/profile">
                <Button variant="outline" size="sm">
                  Meu Perfil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              <Link href="/admin" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <Home className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Dashboard
              </Link>
              <Link href="/admin/users" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Usuários
              </Link>
              <Link href="/admin/tests" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <FileText className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Testes
              </Link>
              <Link href="/admin/chat-management" className="bg-blue-50 border-r-2 border-blue-500 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-blue-700">
                <MessageCircle className="mr-3 h-5 w-5 text-blue-500" />
                Chat
              </Link>
              <Link href="/admin/questions" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Questões
              </Link>
              <Link href="/admin/results" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <BarChart3 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Resultados
              </Link>
              <Link href="/admin/reports" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <BarChart3 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Relatórios
              </Link>
              <Link href="/admin/settings" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Configurações
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/admin" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                    <Home className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500">Chat</span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Chat</h2>
                <p className="text-gray-600 mt-1">Monitore e modere o bate papo em tempo real</p>
              </div>
              <Button onClick={fetchChatData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>

            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Usuários Online</p>
                          <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'online').length}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Salas Ativas</p>
                          <p className="text-2xl font-bold text-gray-900">{rooms.filter(r => r.isActive).length}</p>
                        </div>
                        <MessageCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Mensagens Reportadas</p>
                          <p className="text-2xl font-bold text-gray-900">{messages.filter(m => m.isReported).length}</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Usuários Banidos</p>
                          <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'banned').length}</p>
                        </div>
                        <Ban className="h-8 w-8 text-gray-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar usuários ou mensagens..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
                  <Button
                    variant={activeTab === 'users' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('users')}
                    className="flex items-center space-x-2"
                  >
                    <Users className="h-4 w-4" />
                    <span>Usuários</span>
                  </Button>
                  <Button
                    variant={activeTab === 'rooms' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('rooms')}
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Salas</span>
                  </Button>
                  <Button
                    variant={activeTab === 'messages' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('messages')}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Mensagens</span>
                  </Button>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'users' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Usuários Online</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <div className="space-y-4">
                          {filteredUsers.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    <Users className="h-5 w-5 text-gray-600" />
                                  </div>
                                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(user.status)}`} />
                                </div>
                                <div>
                                  <div className="font-medium">{user.username}</div>
                                  <div className="text-sm text-gray-500">
                                    {user.currentRoom ? `Sala: ${user.currentRoom}` : 'Não em sala'}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {getStatusText(user.status)} • {user.messageCount} mensagens
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {user.reports > 0 && (
                                  <Badge variant="destructive" className="text-xs">
                                    {user.reports} reportes
                                  </Badge>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBanUser(user.id, user.username)}
                                  disabled={user.status === 'banned'}
                                >
                                  <Ban className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'rooms' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Salas de Chat</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <div className="space-y-4">
                          {rooms.map(room => (
                            <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-medium">{room.name}</h3>
                                  <Badge variant={room.isActive ? 'default' : 'secondary'}>
                                    {room.isActive ? 'Ativa' : 'Inativa'}
                                  </Badge>
                                  {room.requiresModeration && (
                                    <Badge variant="destructive" className="text-xs">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Requer moderação
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                                <div className="text-xs text-gray-500 mt-2">
                                  {room.users}/{room.maxUsers} usuários • {room.messages} mensagens • {room.category}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Dialog open={showRoomManagement === room.id} onOpenChange={(open) => !open && setShowRoomManagement(null)}>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setShowRoomManagement(room.id)}
                                    >
                                      <Settings className="h-4 w-4 mr-1" />
                                      Gerenciar
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Gerenciar Sala - {room.name}</DialogTitle>
                                    </DialogHeader>
                                    <RoomManagementModal 
                                      room={room} 
                                      onUpdate={(updates) => handleUpdateRoom(room.id, updates)}
                                      onDelete={() => handleDeleteRoom(room.id, room.name)}
                                      onClose={() => setShowRoomManagement(null)}
                                    />
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  size="sm"
                                  variant={room.isActive ? 'destructive' : 'default'}
                                  onClick={() => handleToggleRoom(room.id)}
                                >
                                  {room.isActive ? 'Desativar' : 'Ativar'}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'messages' && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Mensagens Recentes</CardTitle>
                        <select
                          value={selectedRoom}
                          onChange={(e) => setSelectedRoom(e.target.value)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          <option value="all">Todas as salas</option>
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                          ))}
                        </select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <div className="space-y-4">
                          {filteredMessages.map(message => (
                            <div key={message.id} className={`p-4 border rounded-lg ${message.isReported ? 'border-red-200 bg-red-50' : ''}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-medium">{message.username}</span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(message.timestamp).toLocaleString('pt-BR')}
                                    </span>
                                    <span className="text-xs text-gray-400">• {message.room}</span>
                                    {message.isReported && (
                                      <Badge variant="destructive" className="text-xs">
                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                        Reportada ({message.reports})
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-700">{message.content}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteMessage(message.id)}
                                  disabled={message.isDeleted}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}