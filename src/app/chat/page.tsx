'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Salas de chat disponíveis
  const defaultRooms: Room[] = [
    {
      id: 'geral',
      name: 'Bate Papo Geral',
      description: 'Conversas gerais sobre diversos assuntos',
      users: 145,
      category: 'Geral'
    },
    {
      id: 'amigos',
      name: 'Amigos e Amizades',
      description: 'Faça novos amigos e converse com pessoas amigáveis',
      users: 89,
      category: 'Relacionamentos'
    },
    {
      id: 'jovens',
      name: 'Jovens e Adolescentes',
      description: 'Espaço para o público jovem conversar',
      users: 67,
      category: 'Jovens'
    },
    {
      id: 'games',
      name: 'Games e Tecnologia',
      description: 'Conversas sobre jogos, tecnologia e inovações',
      users: 234,
      category: 'Tecnologia'
    },
    {
      id: 'musica',
      name: 'Música e Cultura',
      description: 'Compartilhe suas músicas e gostos musicais',
      users: 156,
      category: 'Cultura'
    },
    {
      id: 'esportes',
      name: 'Esportes e Fitness',
      description: 'Converse sobre esportes, futebol e atividades físicas',
      users: 198,
      category: 'Esportes'
    },
    {
      id: 'filmes',
      name: 'Filmes e Séries',
      description: 'Discussões sobre cinema, séries e entretenimento',
      users: 176,
      category: 'Entretenimento'
    },
    {
      id: 'noticias',
      name: 'Notícias e Atualidades',
      description: 'Debata os acontecimentos do dia a dia',
      users: 92,
      category: 'Notícias'
    },
    {
      id: 'amor',
      name: 'Amor e Relacionamentos',
      description: 'Conversas sobre relacionamentos e sentimentos',
      users: 203,
      category: 'Relacionamentos'
    },
    {
      id: 'trabalho',
      name: 'Trabalho e Carreira',
      description: 'Discuta profissões, empregos e carreira',
      users: 78,
      category: 'Carreira'
    },
    {
      id: 'estudos',
      name: 'Estudos e Educação',
      description: 'Tire dúvidas e compartilhe conhecimento',
      users: 124,
      category: 'Educação'
    },
    {
      id: 'saude',
      name: 'Saúde e Bem-estar',
      description: 'Converse sobre saúde, medicina e bem-estar',
      users: 87,
      category: 'Saúde'
    }
  ]

  useEffect(() => {
    setRooms(defaultRooms)
    
    // Gerar nome de usuário aleatório se não existir
    const savedUsername = localStorage.getItem('chatUsername')
    if (savedUsername) {
      setUsername(savedUsername)
      setIsConnected(true)
    } else {
      generateRandomUsername()
    }

    // Simular mensagens iniciais
    const initialMessages: Message[] = [
      {
        id: '1',
        username: 'Sistema',
        content: 'Bem-vindo ao Bate Papo! Escolha uma sala para começar a conversar.',
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

  const generateRandomUsername = () => {
    const adjectives = ['Feliz', 'Amigo', 'Legal', 'Divertido', 'Alegre', 'Calmo', 'Esperto', 'Criativo']
    const nouns = ['Gato', 'Sol', 'Estrela', 'Flor', 'Rio', 'Montanha', 'Mar', 'Céu']
    const numbers = Math.floor(Math.random() * 999)
    
    const randomUsername = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${numbers}`
    setUsername(randomUsername)
    localStorage.setItem('chatUsername', randomUsername)
    setIsConnected(true)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const joinRoom = (room: Room) => {
    setSelectedRoom(room)
    
    // Simular entrada na sala
    const joinMessage: Message = {
      id: Date.now().toString(),
      username: 'Sistema',
      content: `Você entrou na sala "${room.name}"`,
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
        'Olá! Como vai?',
        'Interessante essa conversa!',
        'Concordo com você.',
        'Alguém aqui quer conversar sobre outro assunto?',
        'Que legal! 😊',
        'Eu também acho isso!',
        'Boa tarde a todos!',
        'Alguém mais daqui de [cidade]?'
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
    }, Math.random() * 5000 + 2000)
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
            <CardTitle className="text-2xl font-bold text-blue-600">Bate Papo</CardTitle>
            <p className="text-gray-600">Conecte-se para começar a conversar</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome de usuário:</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                maxLength={20}
              />
            </div>
            <Button 
              onClick={() => {
                if (username.trim()) {
                  localStorage.setItem('chatUsername', username.trim())
                  setIsConnected(true)
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!username.trim()}
            >
              Entrar no Bate Papo
            </Button>
            <Button 
              onClick={generateRandomUsername}
              variant="outline"
              className="w-full"
            >
              Gerar nome aleatório
            </Button>
          </CardContent>
        </Card>
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
            <h1 className="text-xl font-bold text-gray-800">Bate Papo</h1>
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
        {/* Sidebar - Salas */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800 mb-2">Salas de Bate Papo</h2>
            <p className="text-sm text-gray-600">Escolha uma sala para conversar</p>
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

        {/* Chat Principal */}
        <div className="flex-1 flex flex-col bg-white">
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
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      Você está conversando como <span className="font-medium">{username}</span>
                    </div>
                  </div>
                </div>

                {/* Users Sidebar */}
                {showUserList && (
                  <div className="w-64 border-l border-gray-200 bg-gray-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium text-gray-800">
                        Usuários na sala ({onlineUsers.length})
                      </h3>
                    </div>
                    <ScrollArea className="h-full">
                      <div className="p-4 space-y-3">
                        {onlineUsers.map(user => (
                          <div key={user.id} className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(user.status)}`} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800">
                                {user.username}
                                {user.username === username && (
                                  <span className="text-xs text-gray-500 ml-1">(você)</span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 capitalize">
                                {user.status === 'online' ? 'Disponível' : 
                                 user.status === 'away' ? 'Ausente' : 'Ocupado'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Bem-vindo ao Bate Papo!
                </h3>
                <p className="text-gray-500 mb-4">
                  Escolha uma sala da lista à esquerda para começar a conversar
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{onlineUsers.length} usuários online</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{rooms.length} salas disponíveis</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}