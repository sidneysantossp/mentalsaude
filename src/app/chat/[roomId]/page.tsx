'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Send, 
  Users, 
  MessageCircle, 
  Heart, 
  Brain, 
  Star, 
  Shield, 
  Zap,
  Crown,
  User,
  Settings,
  Search,
  Paperclip,
  Smile,
  MoreVertical,
  BarChart3,
  Activity,
  Clock,
  MessageSquare,
  TrendingUp,
  Calendar
} from 'lucide-react'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import Footer from '@/components/Footer'

interface Message {
  id: string
  author: string
  content: string
  timestamp: string
  isOwn?: boolean
  avatar?: string
}

interface ChatRoom {
  id: string
  name: string
  description: string
  type: 'PUBLIC' | 'PREMIUM'
  category: string
  memberCount: number
  maxMembers: number
  isActive: boolean
  image?: string
}

export default function ChatRoomPage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.roomId as string

  const [room, setRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'users' | 'stats'>('users')

  // Mock room data - em produção viria da API
  const mockRooms: Record<string, ChatRoom> = {
    '1': {
      id: '1',
      name: 'Bem-Estar Diário',
      description: 'Compartilhe suas experiências e dicas de autocuidado',
      type: 'PUBLIC',
      category: 'SUPPORT',
      memberCount: 234,
      maxMembers: 500,
      isActive: true,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    '2': {
      id: '2',
      name: 'Ansiedade e Estratégias',
      description: 'Técnicas e apoio para lidar com a ansiedade',
      type: 'PUBLIC',
      category: 'ANXIETY',
      memberCount: 189,
      maxMembers: 300,
      isActive: true,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    '3': {
      id: '3',
      name: 'Depressão: Apoio Mútuo',
      description: 'Espaço seguro para compartilhar e receber apoio',
      type: 'PUBLIC',
      category: 'DEPRESSION',
      memberCount: 156,
      maxMembers: 250,
      isActive: true,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  }

  // Mock online users - em produção viria da API/WebSocket
  const mockOnlineUsers = [
    { id: '1', name: 'Maria S.', avatar: 'MS', status: 'online', isModerator: false },
    { id: '2', name: 'João P.', avatar: 'JP', status: 'online', isModerator: false },
    { id: '3', name: 'Ana C.', avatar: 'AC', status: 'online', isModerator: true },
    { id: '4', name: 'Carlos M.', avatar: 'CM', status: 'away', isModerator: false },
    { id: '5', name: 'Patrícia L.', avatar: 'PL', status: 'online', isModerator: false },
    { id: '6', name: 'Roberto S.', avatar: 'RS', status: 'online', isModerator: false },
    { id: '7', name: 'Fernanda K.', avatar: 'FK', status: 'offline', isModerator: false },
    { id: '8', name: 'Você', avatar: 'EU', status: 'online', isModerator: false, isCurrentUser: true }
  ]

  // Mock messages - em produção viriam da API/WebSocket
  const mockMessages: Message[] = [
    {
      id: '1',
      author: 'Maria S.',
      content: 'Olá pessoal! Como estão se sentindo hoje?',
      timestamp: '14:30',
      avatar: 'MS'
    },
    {
      id: '2',
      author: 'João P.',
      content: 'Oi Maria! Hoje estou bem, graças a Deus. A meditação tem ajudado bastante 🧘‍♀️',
      timestamp: '14:32',
      avatar: 'JP'
    },
    {
      id: '3',
      author: 'Ana C.',
      content: 'Que bom João! Eu também comecei a meditar recentemente. Alguém tem dicas de técnicas para iniciantes?',
      timestamp: '14:35',
      avatar: 'AC'
    },
    {
      id: '4',
      author: 'Carlos M.',
      content: 'Recomendo começar com 5 minutos de respiração profunda. Existem vários apps guiados que ajudam!',
      timestamp: '14:37',
      avatar: 'CM'
    },
    {
      id: '5',
      author: 'Você',
      content: 'Ótimas dicas! Vou experimentar',
      timestamp: '14:40',
      isOwn: true,
      avatar: 'EU'
    }
  ]

  useEffect(() => {
    // Simular carregamento da sala
    const loadRoom = async () => {
      setIsLoading(true)
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const foundRoom = mockRooms[roomId]
      if (!foundRoom) {
        router.push('/chat')
        return
      }
      
      setRoom(foundRoom)
      setMessages(mockMessages)
      setOnlineUsers(mockOnlineUsers)
      setIsLoading(false)
    }

    if (roomId) {
      loadRoom()
    }
  }, [roomId, router])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SUPPORT': return <Heart className="h-4 w-4" />
      case 'ANXIETY': return <Brain className="h-4 w-4" />
      case 'DEPRESSION': return <MessageCircle className="h-4 w-4" />
      case 'SELF_ESTEEM': return <Star className="h-4 w-4" />
      case 'MINDFULNESS': return <Zap className="h-4 w-4" />
      case 'STRESS': return <Shield className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'SUPPORT': return 'bg-pink-500'
      case 'ANXIETY': return 'bg-blue-500'
      case 'DEPRESSION': return 'bg-purple-500'
      case 'SELF_ESTEEM': return 'bg-yellow-500'
      case 'MINDFULNESS': return 'bg-green-500'
      case 'STRESS': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    
    // Simular envio da mensagem
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newMsg: Message = {
      id: Date.now().toString(),
      author: 'Você',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      avatar: 'EU'
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
    setIsSending(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'away': return 'Ausente'
      case 'offline': return 'Offline'
      default: return 'Offline'
    }
  }

  if (isLoading) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando sala...</p>
          </div>
        </div>
        <Footer />
      </LayoutWrapper>
    )
  }

  if (!room) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sala não encontrada</h2>
              <p className="text-gray-600 mb-6">Esta sala não existe ou foi removida.</p>
              <Link href="/chat">
                <Button className="w-full">
                  Voltar para as Salas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/chat"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(room.category)}
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-900 flex items-center">
                      {room.name}
                      {room.type === 'PREMIUM' && (
                        <Crown className="w-4 h-4 text-yellow-500 ml-2" />
                      )}
                    </h1>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {room.memberCount} membros • {onlineUsers.filter(u => u.status === 'online').length} online
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Chat Layout */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 max-w-7xl mx-auto">
            {/* Chat Area */}
            <div className="flex-1">
              {/* Messages Area */}
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex ${message.isOwn ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 max-w-xs lg:max-w-md`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            message.isOwn 
                              ? 'bg-purple-500 text-white ml-2' 
                              : 'bg-gray-200 text-gray-600 mr-2'
                          }`}>
                            {message.avatar}
                          </div>
                          <div>
                            {!message.isOwn && (
                              <p className="text-xs text-gray-500 mb-1">{message.author}</p>
                            )}
                            <div className={`rounded-lg px-3 py-2 ${
                              message.isOwn 
                                ? 'bg-purple-500 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className={`text-xs text-gray-400 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Message Input - Fixed at bottom */}
              <Card className="sticky bottom-4">
                <CardContent className="p-4">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <Button type="button" variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                    </Button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        disabled={isSending}
                      />
                    </div>

                    <Button type="button" variant="ghost" size="sm">
                      <Smile className="w-4 h-4 text-gray-500" />
                    </Button>

                    <Button 
                      type="submit" 
                      disabled={!newMessage.trim() || isSending}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      {isSending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Online Users */}
            <div className="w-80 hidden lg:block">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  {/* Tab Navigation */}
                  <div className="flex items-center space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={activeTab === 'users' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('users')}
                      className={`flex-1 ${activeTab === 'users' ? 'bg-black text-white hover:bg-black' : ''}`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Usuários
                    </Button>
                    <Button
                      variant={activeTab === 'stats' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('stats')}
                      className={`flex-1 ${activeTab === 'stats' ? 'bg-black text-white hover:bg-black' : ''}`}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Estatísticas
                    </Button>
                  </div>

                  {/* Users Tab */}
                  {activeTab === 'users' && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Usuários na Sala</h3>
                        <span className="text-sm text-gray-500">
                          {onlineUsers.filter(u => u.status === 'online').length} online
                        </span>
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {onlineUsers.map((user) => (
                          <div 
                            key={user.id} 
                            className={`flex items-center space-x-3 p-2 rounded-lg ${
                              user.isCurrentUser ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                            } transition-colors`}
                          >
                            <div className="relative">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
                                user.isCurrentUser 
                                  ? 'bg-purple-500 text-white' 
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                {user.avatar}
                              </div>
                              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className={`text-sm font-medium truncate ${
                                  user.isCurrentUser ? 'text-purple-900' : 'text-gray-900'
                                }`}>
                                  {user.name}
                                </p>
                                {user.isCurrentUser && (
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                    Você
                                  </span>
                                )}
                                {user.isModerator && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                    Moderador
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">{getStatusText(user.status)}</p>
                            </div>

                            <Button variant="ghost" size="sm" className="opacity-0 hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Stats Tab */}
                  {activeTab === 'stats' && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Estatísticas da Sala</h3>
                      
                      {/* Activity Stats */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Mensagens Hoje</p>
                              <p className="text-xs text-gray-500">Total enviadas</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">47</p>
                            <p className="text-xs text-green-600">+12%</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                              <Activity className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Participação</p>
                              <p className="text-xs text-gray-500">Usuários ativos</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">23</p>
                            <p className="text-xs text-gray-500">de {onlineUsers.length}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                              <Clock className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Tempo Médio</p>
                              <p className="text-xs text-gray-500">Permanência</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-600">45m</p>
                            <p className="text-xs text-green-600">+8m</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Crescimento</p>
                              <p className="text-xs text-gray-500">Esta semana</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-orange-600">+18</p>
                            <p className="text-xs text-green-600">+28%</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Criada em</p>
                              <p className="text-xs text-gray-500">Data de criação</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-pink-600">15/03</p>
                            <p className="text-xs text-gray-500">2 meses</p>
                          </div>
                        </div>
                      </div>

                      {/* Room Info */}
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Informações da Sala</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Capacidade</span>
                            <span className="font-medium">{room.memberCount}/{room.maxMembers}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Categoria</span>
                            <span className="font-medium">{room.category}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Tipo</span>
                            <span className="font-medium">{room.type === 'PREMIUM' ? 'Premium' : 'Pública'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className={`font-medium ${room.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                              {room.isActive ? 'Ativa' : 'Inativa'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LayoutWrapper>
  )
}