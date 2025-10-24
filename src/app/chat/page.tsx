'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Crown, 
  MessageCircle, 
  Hash,
  Heart,
  Brain,
  Star,
  Shield,
  Zap,
  Calendar
} from 'lucide-react'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'

interface ChatRoom {
  id: string
  name: string
  description: string
  type: 'PUBLIC' | 'PREMIUM'
  category: string
  memberCount: number
  maxMembers: number
  isActive: boolean
  lastMessage?: {
    content: string
    timestamp: string
    author: string
  }
  image?: string
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
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
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
    },
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
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
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
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
    },
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
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
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
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
    },
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
]

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

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
      case 'SUPPORT': return 'bg-pink-500'
      case 'ANXIETY': return 'bg-blue-500'
      case 'DEPRESSION': return 'bg-purple-500'
      case 'SELF_ESTEEM': return 'bg-yellow-500'
      case 'MINDFULNESS': return 'bg-green-500'
      case 'STRESS': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'SUPPORT': return 'Apoio'
      case 'ANXIETY': return 'Ansiedade'
      case 'DEPRESSION': return 'Depressão'
      case 'SELF_ESTEEM': return 'Autoestima'
      case 'MINDFULNESS': return 'Mindfulness'
      case 'STRESS': return 'Estresse'
      default: return category
    }
  }

  const handleEnterRoom = (room: ChatRoom) => {
    setSelectedRoom(room)
    setIsAuthModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAuthModalOpen(false)
    setSelectedRoom(null)
  }

  const handleEnterAsGuest = () => {
    if (selectedRoom) {
      // Lógica para entrar como convidado
      console.log(`Entrando como convidado na sala: ${selectedRoom.name}`)
      // Redirecionar para a sala
      window.location.href = `/chat/${selectedRoom.id}`
    }
  }

  const handleLogin = () => {
    // Lógica para login
    console.log('Fazer login e entrar na sala')
    // Redirecionar para página de login ou abrir modal de login
    window.location.href = '/login'
  }

  const handleRegister = () => {
    // Lógica para registro
    console.log('Fazer registro e entrar na sala')
    // Redirecionar para página de registro
    window.location.href = '/register'
  }

  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Salas de Bate-Papo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Salas de
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent block">Bate-Papo</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Conecte-se com outras pessoas em um ambiente seguro e de apoio mútuo. 
            Compartilhe experiências e receba suporte da comunidade.
          </p>
        </div>
      </section>

      {/* Chat Rooms Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mockRooms.map((room) => (
              <Card key={room.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 bg-white hover:border-yellow-500 hover:-translate-y-1">
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={room.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'} 
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getCategoryColor(room.category)} text-white`}>
                      {getCategoryIcon(room.category)}
                      <span className="ml-1">{getCategoryName(room.category)}</span>
                    </Badge>
                  </div>

                  {/* Premium Badge */}
                  {room.type === 'PREMIUM' && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                        <Crown className="h-3 w-3" />
                        <span className="text-xs font-medium">PREMIUM</span>
                      </div>
                    </div>
                  )}

                  {/* Active Status */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center space-x-2">
                      {room.isActive ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      )}
                      <span className="text-white text-xs font-medium">
                        {room.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{room.memberCount} membros</span>
                    <span className="mx-2">•</span>
                    <span>{room.lastMessage?.timestamp || 'Sem mensagens'}</span>
                  </div>
                  
                  <h2 className="font-bold text-gray-900 text-xl mb-3 leading-tight">
                    {room.name}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {room.description}
                  </p>
                  
                  {room.lastMessage && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 text-sm truncate font-medium">
                        "{room.lastMessage.content}"
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        — {room.lastMessage.author}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {room.memberCount}/{room.maxMembers} capacidade
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                      onClick={() => handleEnterRoom(room)}
                    >
                      Entrar na Sala
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {selectedRoom && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={handleCloseModal}
          roomName={selectedRoom.name}
          roomType={selectedRoom.type}
          onEnterAsGuest={handleEnterAsGuest}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}

      {/* Footer */}
      <Footer />
    </LayoutWrapper>
  )
}