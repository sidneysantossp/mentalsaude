'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Send, 
  Users, 
  Lock, 
  Crown, 
  MessageCircle, 
  Hash,
  Search,
  Plus,
  Settings,
  User,
  Star,
  Shield,
  Zap,
  Heart,
  Brain
} from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

interface ChatRoom {
  id: string
  name: string
  description: string
  type: 'PUBLIC' | 'PREMIUM'
  category: string
  memberCount: number
  maxMembers: number
  isActive: boolean
  isJoined?: boolean
  lastMessage?: {
    content: string
    timestamp: string
    author: string
  }
}

interface ChatMessage {
  id: string
  content: string
  author: {
    name: string
    avatar?: string
    role?: string
  }
  timestamp: string
  isOwn?: boolean
}

const mockRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Bem-Estar Diário',
    description: 'Compartilhe suas experiências e dicas de autocuidado',
    type: 'PUBLIC',
    category: 'SUPPORT',
    memberCount: 234,
    maxMembers: 500,
    isActive: true,
    lastMessage: {
      content: 'Hoje foi um dia desafiador, mas consegui superar!',
      timestamp: '2 min atrás',
      author: 'Maria S.'
    }
  },
  {
    id: '2',
    name: 'Ansiedade e Estratégias',
    description: 'Técnicas e apoio para lidar com a ansiedade',
    type: 'PUBLIC',
    category: 'ANXIETY',
    memberCount: 189,
    maxMembers: 300,
    isActive: true,
    lastMessage: {
      content: 'A respiração profunda realmente funciona! 🧘‍♀️',
      timestamp: '5 min atrás',
      author: 'João P.'
    }
  },
  {
    id: '3',
    name: 'Depressão: Apoio Mútuo',
    description: 'Espaço seguro para compartilhar e receber apoio',
    type: 'PUBLIC',
    category: 'DEPRESSION',
    memberCount: 156,
    maxMembers: 250,
    isActive: true,
    lastMessage: {
      content: 'Pequenos passos fazem grande diferença 💙',
      timestamp: '8 min atrás',
      author: 'Ana C.'
    }
  },
  {
    id: '4',
    name: 'Autoestima e Confiança',
    description: 'Desenvolva sua autoconfiança com o grupo',
    type: 'PREMIUM',
    category: 'SELF_ESTEEM',
    memberCount: 67,
    maxMembers: 100,
    isActive: true,
    lastMessage: {
      content: 'Hoje me senti orgulhoso de mim mesmo!',
      timestamp: '12 min atrás',
      author: 'Carlos M.'
    }
  },
  {
    id: '5',
    name: 'Meditação e Mindfulness',
    description: 'Práticas guiadas e experiências compartilhadas',
    type: 'PREMIUM',
    category: 'MINDFULNESS',
    memberCount: 89,
    maxMembers: 150,
    isActive: true,
    lastMessage: {
      content: 'Alguém quer meditar juntos amanhã?',
      timestamp: '15 min atrás',
      author: 'Patrícia L.'
    }
  },
  {
    id: '6',
    name: 'Estresse e Trabalho',
    description: 'Equilíbrio entre vida profissional e bem-estar',
    type: 'PREMIUM',
    category: 'STRESS',
    memberCount: 124,
    maxMembers: 200,
    isActive: true,
    lastMessage: {
      content: 'Dicas para desconectar após o expediente?',
      timestamp: '20 min atrás',
      author: 'Roberto S.'
    }
  }
]

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Olá pessoal! Como estão se sentindo hoje? 😊',
    author: {
      name: 'Maria Silva',
      role: 'member'
    },
    timestamp: '14:30'
  },
  {
    id: '2',
    content: 'Oi Maria! Hoje estou bem, melhorando a cada dia 🌱',
    author: {
      name: 'João Pedro',
      role: 'member'
    },
    timestamp: '14:32'
  },
  {
    id: '3',
    content: 'Que bom ouvir isso! A técnica de respiração que compartilhei ontem ajudou alguém?',
    author: {
      name: 'Ana Costa',
      role: 'moderator'
    },
    timestamp: '14:35'
  },
  {
    id: '4',
    content: 'Sim Ana! Fiz 5 minutos hoje e já senti diferença. Obrigado por compartilhar! 🙏',
    author: {
      name: 'Carlos Mendes',
      role: 'member'
    },
    timestamp: '14:38'
  }
]

export default function ChatPage() {
  const sessionData = useSession()
  const session = sessionData?.data || null
  const router = useRouter()
  const params = useParams()
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)
  const [rooms, setRooms] = useState<ChatRoom[]>(mockRooms)
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const roomId = params?.id as string

  useEffect(() => {
    if (roomId) {
      const room = rooms.find(r => r.id === roomId)
      if (room) {
        if (room.type === 'PREMIUM' && !session) {
          setShowPremiumModal(true)
        } else {
          setSelectedRoom(room)
        }
      }
    }
  }, [roomId, rooms, session])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedRoom) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        content: newMessage,
        author: {
          name: session?.user?.name || 'Usuário',
          role: 'member'
        },
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleJoinRoom = (room: ChatRoom) => {
    if (room.type === 'PREMIUM' && !session) {
      setShowPremiumModal(true)
    } else {
      router.push(`/chat/${room.id}`)
    }
  }

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SUPPORT': return <Heart className="h-4 w-4" />
      case 'ANXIETY': return <Brain className="h-4 w-4" />
      case 'DEPRESSION': return <MessageCircle className="h-4 w-4" />
      case 'SELF_ESTEEM': return <Star className="h-4 w-4" />
      case 'MINDFULNESS': return <Zap className="h-4 w-4" />
      case 'STRESS': return <Shield className="h-4 w-4" />
      default: return <Hash className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'SUPPORT': return 'bg-pink-100 text-pink-800'
      case 'ANXIETY': return 'bg-blue-100 text-blue-800'
      case 'DEPRESSION': return 'bg-purple-100 text-purple-800'
      case 'SELF_ESTEEM': return 'bg-yellow-100 text-yellow-800'
      case 'MINDFULNESS': return 'bg-green-100 text-green-800'
      case 'STRESS': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (selectedRoom) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-50">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/chat')}
                >
                  ←
                </Button>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="font-semibold text-gray-900">{selectedRoom.name}</h2>
                    {selectedRoom.type === 'PREMIUM' && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedRoom.memberCount} membros online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getCategoryColor(selectedRoom.category)}>
                  {getCategoryIcon(selectedRoom.category)}
                  <span className="ml-1">{selectedRoom.category}</span>
                </Badge>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 200px)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  {!message.isOwn && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-gray-600" />
                      </div>
                      <span className="text-xs font-medium">
                        {message.author.name}
                      </span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Salas de Bate-Papo
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Conecte-se com outras pessoas em um ambiente seguro e de apoio
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link href="/plans">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white">
                    <Crown className="h-4 w-4 mr-2" />
                    Assinar Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar salas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Criar Sala
              </Button>
            </div>
          </div>

          {/* Room Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200">
                Todas
              </Badge>
              <Badge className="bg-pink-100 text-pink-800 cursor-pointer hover:bg-pink-200">
                <Heart className="h-3 w-3 mr-1" />
                Apoio
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200">
                <Brain className="h-3 w-3 mr-1" />
                Ansiedade
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 cursor-pointer hover:bg-purple-200">
                <MessageCircle className="h-3 w-3 mr-1" />
                Depressão
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 cursor-pointer hover:bg-yellow-200">
                <Star className="h-3 w-3 mr-1" />
                Autoestima
              </Badge>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(room.category)}>
                        {getCategoryIcon(room.category)}
                      </Badge>
                      {room.type === 'PREMIUM' && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {room.memberCount}/{room.maxMembers}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4">
                    {room.description}
                  </p>
                  
                  {room.lastMessage && (
                    <div className="mb-4 p-2 bg-gray-50 rounded text-sm">
                      <p className="text-gray-700 truncate">{room.lastMessage.content}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {room.lastMessage.author} • {room.lastMessage.timestamp}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {room.isActive ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      )}
                      <span className="text-sm text-gray-500">
                        {room.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => handleJoinRoom(room)}
                      className={room.type === 'PREMIUM' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : ''}
                    >
                      {room.type === 'PREMIUM' ? (
                        <>
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Entrar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Desbloqueie Salas Exclusivas
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Junte-se à nossa comunidade premium e tenha acesso a salas moderadas, 
              conteúdo exclusivo e suporte especializado 24/7.
            </p>
            <Link href="/plans">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Crown className="h-4 w-4 mr-2" />
                Ver Planos Premium
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-xl">Sala Exclusiva Premium</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Esta sala é exclusiva para membros premium. 
                Junte-se a nós para ter acesso a conteúdo exclusivo!
              </p>
              <div className="space-y-2">
                <Link href="/auth/signin">
                  <Button className="w-full">
                    Fazer Login
                  </Button>
                </Link>
                <Link href="/plans">
                  <Button variant="outline" className="w-full">
                    Ver Planos Premium
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowPremiumModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </LayoutWrapper>
  )
}