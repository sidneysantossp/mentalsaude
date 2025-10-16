'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Send, 
  Users, 
  MessageCircle, 
  Smile, 
  Paperclip, 
  Settings,
  LogOut,
  User,
  Hash,
  Volume2,
  VolumeX
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import AuthModal from '@/components/chat/auth-modal'

interface Message {
  id: string
  username: string
  content: string
  timestamp: Date
  room: string
  isSystem?: boolean
  userId?: string
}

interface Room {
  id: string
  name: string
  description: string
  users: number
  category: string
  isPrivate?: boolean
  maxUsers?: number
}

interface User {
  id: string
  username: string
  status: 'online' | 'away' | 'busy'
  avatar?: string
  currentRoom?: string
}

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showUserList, setShowUserList] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const router = useRouter()
  const { data: session } = useSession()

  // Salas de chat disponíveis - Exatamente as 14 categorias de testes
  const defaultRooms: Room[] = [
    {
      id: 'compulsao-alimentar',
      name: 'Compulsão Alimentar',
      description: 'Apoio para recuperação da compulsão alimentar',
      users: 198,
      category: 'Transtornos Alimentares'
    },
    {
      id: 'depressao',
      name: 'Depressão',
      description: 'Apoio mútuo para quem luta contra depressão',
      users: 234,
      category: 'Transtornos de Humor'
    },
    {
      id: 'depressao-maior',
      name: 'Depressão Maior',
      description: 'Espaço seguro para compartilhar experiências com depressão maior',
      users: 156,
      category: 'Transtornos de Humor'
    },
    {
      id: 'fobia-social',
      name: 'Fobia Social',
      description: 'Superando a ansiedade social juntos',
      users: 178,
      category: 'Transtornos de Ansiedade'
    },
    {
      id: 'insonia',
      name: 'Insônia',
      description: 'Comunidade para quem tem dificuldades para dormir',
      users: 223,
      category: 'Transtornos do Sono'
    },
    {
      id: 'burnout',
      name: 'Burnout',
      description: 'Prevenção e recuperação da síndrome de burnout',
      users: 301,
      category: 'Relacionados ao Trabalho'
    },
    {
      id: 'estresse',
      name: 'Estresse',
      description: 'Técnicas e apoio para controlar o estresse',
      users: 267,
      category: 'Transtornos de Ansiedade'
    },
    {
      id: 'sindrome-impostor',
      name: 'Síndrome do Impostor',
      description: 'Superando a sensação de fraude profissional',
      users: 167,
      category: 'Relacionados ao Trabalho'
    },
    {
      id: 'tdah',
      name: 'TDAH',
      description: 'Dicas e apoio para adultos com TDAH',
      users: 289,
      category: 'Transtornos do Neurodesenvolvimento'
    },
    {
      id: 'toc',
      name: 'TOC',
      description: 'Compartilhando estratégias para lidar com TOC',
      users: 145,
      category: 'Transtornos Obsessivo-Compulsivos'
    },
    {
      id: 'transtorno-afetivo-bipolar',
      name: 'Transtorno Afetivo Bipolar',
      description: 'Comunidade para discutir o transtorno afetivo bipolar',
      users: 89,
      category: 'Transtornos de Humor'
    },
    {
      id: 'transtorno-ansiedade',
      name: 'Transtorno de Ansiedade',
      description: 'Apoio para quem vive com transtornos de ansiedade',
      users: 312,
      category: 'Transtornos de Ansiedade'
    }
  ]

  useEffect(() => {
    setRooms(defaultRooms)
    
    // Verificar se usuário está autenticado
    const savedUsername = localStorage.getItem('chatUsername')
    if (savedUsername) {
      setUsername(savedUsername)
      setIsConnected(true)
    } else {
      // Mostrar modal de autenticação
      setShowAuthModal(true)
    }

    // Simular mensagens iniciais
    const initialMessages: Message[] = [
      {
        id: '1',
        username: 'Sistema',
        content: 'Bem-vindo ao nosso espaço de apoio! Este é um lugar seguro para compartilhar experiências e receber apoio mútuo em sua jornada de saúde mental.',
        timestamp: new Date(),
        room: 'system',
        isSystem: true
      },
      {
        id: '2',
        username: 'Sistema',
        content: 'Importante: Este grupo não substitui tratamento profissional. Em caso de crise, procure ajuda especializada ou ligue para o CVV (188).',
        timestamp: new Date(),
        room: 'system',
        isSystem: true
      }
    ]
    setMessages(initialMessages)

    // Simular usuários online
    const mockUsers: User[] = [
      { id: '1', username: 'AnaSilva', status: 'online' },
      { id: '2', username: 'Carlos123', status: 'online' },
      { id: '3', username: 'MariaJ', status: 'away' },
      { id: '4', username: 'PedroHK', status: 'online' },
      { id: '5', username: 'JuliaM', status: 'busy' },
      { id: '6', username: 'RafaelS', status: 'online' },
      { id: '7', username: 'LuciaF', status: 'online' },
      { id: '8', username: 'MarcosB', status: 'away' }
    ]
    setOnlineUsers(mockUsers)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleAuthenticated = (nickname: string) => {
    setUsername(nickname)
    localStorage.setItem('chatUsername', nickname)
    setIsConnected(true)
  }

  const generateRandomUsername = () => {
    const adjectives = ['Feliz', 'Amigo', 'Legal', 'Divertido', 'Alegre', 'Calmo', 'Esperto', 'Criativo']
    const nouns = ['Gato', 'Sol', 'Estrela', 'Flor', 'Rio', 'Montanha', 'Mar', 'Céu']
    const numbers = Math.floor(Math.random() * 999)
    
    const randomUsername = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${numbers}`
    return randomUsername
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const joinRoom = (room: Room) => {
    setSelectedRoom(room)
    
    // Mensagem de boas-vindas específica para cada sala
    const welcomeMessages: Record<string, string> = {
      'compulsao-alimentar': 'Bem-vindo ao grupo de apoio para compulsão alimentar. Juntos somos mais fortes na recuperação.',
      'depressao': 'Bem-vindo ao grupo de apoio para depressão. Aqui você pode compartilhar livremente suas experiências.',
      'depressao-maior': 'Bem-vindo ao grupo de depressão maior. Aqui encontrará compreensão e solidariedade.',
      'fobia-social': 'Aqui é um lugar seguro para falar sobre fobia social. Você não está sozinho(a).',
      'insonia': 'Bem-vindo ao grupo de insônia. Vamos compartilhar o que funciona para uma noite melhor de sono.',
      'burnout': 'Bem-vindo ao grupo de burnout. Vamos compartilhar estratégias para recuperar nossa energia.',
      'estresse': 'Bem-vindo ao grupo de estresse. Vamos encontrar equilíbrio juntos.',
      'sindrome-impostor': 'Bem-vindo ao grupo da síndrome do impostor. Você merece estar onde está!',
      'tdah': 'Bem-vindo ao grupo de TDAH. Espaço para compartilhar dicas e apoio. Sinta-se em casa!',
      'toc': 'Bem-vindo ao grupo de TOC. Compartilhe suas estratégias e receba apoio compreensivo.',
      'transtorno-afetivo-bipolar': 'Bem-vindo ao grupo de transtorno afetivo bipolar. Compartilhe experiências e estratégias.',
      'transtorno-ansiedade': 'Bem-vindo ao grupo de transtorno de ansiedade. Este é um espaço seguro para falar sobre ansiedade.'
    }
    
    const welcomeMessage = welcomeMessages[room.id] || `Você entrou na sala "${room.name}". Este é um espaço seguro para compartilhar e receber apoio.`
    
    // Simular entrada na sala
    const joinMessage: Message = {
      id: Date.now().toString(),
      username: 'Sistema',
      content: welcomeMessage,
      timestamp: new Date(),
      room: room.id,
      isSystem: true
    }
    
    setMessages([joinMessage])
    
    toast({
      title: "Sala alterada",
      description: `Você entrou em ${room.name}`,
    })
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedRoom || !username) return

    const message: Message = {
      id: Date.now().toString(),
      username: username,
      content: newMessage,
      timestamp: new Date(),
      room: selectedRoom.id,
      userId: 'current-user'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simular resposta de outro usuário
    setTimeout(() => {
      const responses = [
        'Entendo como você se sente. Você não está sozinho(a) nisso.',
        'Isso é muito comum. Eu também passo por coisas parecidas.',
        'Alguma vez já tentou respiração profunda? Me ajuda bastante.',
        'Que bom que você compartilhou isso aqui! É corajoso demais.',
        'Lembrando que estamos juntos nessa jornada 🤗',
        'Pequenos passos também são progresso. Celebre cada um!',
        'Alguém mais aqui já tentou terapia? Faz muita diferença.',
        'Hoje foi um dia difícil, mas amanhã é uma nova oportunidade.',
        'Você é mais forte do que imagina. Continue firme!',
        'Aqui é um espaço seguro para sermos vulneráveis.',
        'Alguma técnica de mindfulness que vocês recomendam?',
        'Estou passando por algo similar. Podemos conversar mais?',
        'Lembro-me que a recuperação não é linear, e tudo bem.',
        'Vocês são incríveis! Esse grupo me ajuda muito.',
        'Respeito muito sua coragem de compartilhar isso.'
      ]
      
      const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        username: randomUser.username,
        content: randomResponse,
        timestamp: new Date(),
        room: selectedRoom.id
      }
      
      setMessages(prev => [...prev, botMessage])
    }, Math.random() * 8000 + 3000)
  }

  const changeUsername = () => {
    const newUsername = prompt('Digite seu novo nome de usuário:', username)
    if (newUsername && newUsername.trim()) {
      setUsername(newUsername.trim())
      localStorage.setItem('chatUsername', newUsername.trim())
      toast({
        title: "Nome alterado",
        description: `Seu nome de usuário agora é ${newUsername.trim()}`,
      })
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setSelectedRoom(null)
    setMessages([])
    localStorage.removeItem('chatUsername')
    setShowAuthModal(true)
    toast({
      title: "Desconectado",
      description: "Você saiu do bate papo",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoomsByCategory = () => {
    const categories = rooms.reduce((acc, room) => {
      if (!acc[room.category]) {
        acc[room.category] = []
      }
      acc[room.category].push(room)
      return acc
    }, {} as Record<string, Room[]>)
    
    return categories
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">Espaço de Apoio</CardTitle>
            <p className="text-gray-600">Conecte-se para receber e oferecer apoio</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Entrar no Espaço de Apoio
            </Button>
          </CardContent>
        </Card>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Espaço de Apoio</h1>
            {selectedRoom && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Hash className="h-3 w-3 mr-1" />
                {selectedRoom.name}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserList(!showUserList)}
            >
              <Users className="h-4 w-4" />
              <span className="ml-1 text-sm">{onlineUsers.length}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={changeUsername}
            >
              <User className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={disconnect}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Salas - FIXA */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col fixed h-[calc(100vh-64px)] left-0 top-16 z-10">
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <h2 className="font-semibold text-gray-800 mb-2">Salas de Apoio</h2>
            <p className="text-sm text-gray-600">Encontre uma comunidade para sua jornada</p>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {Object.entries(getRoomsByCategory()).map(([category, categoryRooms]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{category}</h3>
                  <div className="space-y-2">
                    {categoryRooms.map(room => (
                      <Card 
                        key={room.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedRoom?.id === room.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => joinRoom(room)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-gray-800">{room.name}</h4>
                              <p className="text-xs text-gray-600 mt-1">{room.description}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{room.users}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Principal - COM MARGEM PARA SIDEBAR */}
        <div className="flex-1 flex flex-col bg-white ml-80">
          {selectedRoom ? (
            <>
              {/* Messages Area */}
              <div className="flex-1 flex">
                <div className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.userId === 'current-user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isSystem
                                ? 'bg-gray-100 text-gray-600 text-center text-sm'
                                : message.userId === 'current-user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {!message.isSystem && (
                              <div className="font-medium text-xs opacity-75 mb-1">
                                {message.username} • {formatTime(message.timestamp)}
                              </div>
                            )}
                            <div className="text-sm">{message.content}</div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        maxLength={500}
                      />
                      <Button 
                        onClick={sendMessage}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* User List Sidebar */}
                {showUserList && (
                  <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Usuários Online ({onlineUsers.length})
                    </h3>
                    <div className="space-y-3">
                      {onlineUsers.map(user => (
                        <div key={user.id} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                          <span className="text-sm text-gray-700">{user.username}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Welcome Screen
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center max-w-4xl mx-auto p-8">
                <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Bem-vindo ao nosso Espaço de Apoio</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Encontre uma comunidade que entende sua jornada. Escolha uma sala para compartilhar experiências e receber apoio mútuo.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {rooms.map(room => (
                    <Card 
                      key={room.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500"
                      onClick={() => joinRoom(room)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg text-gray-800">{room.name}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            {room.users}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {room.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">⚠️ Importante</h3>
                  <p className="text-blue-800 text-sm">
                    Este espaço de apoio não substitui tratamento profissional. Em caso de crise, 
                    procure ajuda especializada ou ligue para o <strong>CVV (188)</strong>.
                  </p>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Salas de apoio disponíveis para cada categoria de teste da plataforma</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  )
}