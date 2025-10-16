'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { LogIn, UserPlus, MessageCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthenticated: (nickname: string) => void
}

export default function AuthModal({ isOpen, onClose, onAuthenticated }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Login successful",
          description: "Bem-vindo de volta!",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !name) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      })

      if (response.ok) {
        toast({
          title: "Registro successful",
          description: "Sua conta foi criada com sucesso!",
        })
        // Auto login after registration
        await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
      } else {
        const data = await response.json()
        toast({
          title: "Erro no registro",
          description: data.error || "Ocorreu um erro ao criar sua conta",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar sua conta",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/chat' })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login com Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNicknameSubmit = () => {
    if (!nickname.trim()) {
      toast({
        title: "Apelido obrigatório",
        description: "Por favor, digite um apelido para continuar",
        variant: "destructive",
      })
      return
    }

    onAuthenticated(nickname.trim())
    onClose()
    toast({
      title: "Bem-vindo ao espaço de apoio!",
      description: `Seu apelido é: ${nickname.trim()}`,
    })
  }

  const handleGuestAccess = () => {
    if (!nickname.trim()) {
      toast({
        title: "Apelido obrigatório",
        description: "Por favor, digite um apelido para continuar como convidado",
        variant: "destructive",
      })
      return
    }

    onAuthenticated(nickname.trim())
    onClose()
    toast({
      title: "Acesso de convidado",
      description: `Bem-vindo ao espaço de apoio, ${nickname.trim()}!`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Entrar no Espaço de Apoio
          </DialogTitle>
          <DialogDescription>
            Para acessar as salas de apoio, faça login ou continue como convidado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {session ? (
            // Usuário já está logado - apenas escolher apelido
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  Logado como {session.user?.email}
                </Badge>
                <p className="text-sm text-gray-600">
                  Escolha um apelido para o espaço de apoio:
                </p>
              </div>
              
              <div className="space-y-2">
                <Input
                  placeholder="Digite seu apelido..."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={20}
                />
                <Button 
                  onClick={handleNicknameSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!nickname.trim()}
                >
                  Entrar no Espaço de Apoio
                </Button>
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Usar outra conta
                </Button>
              </div>
            </div>
          ) : (
            // Usuário não está logado - mostrar opções de login/registro/convidado
            <Tabs defaultValue="guest" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="guest">Convidado</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Registrar</TabsTrigger>
              </TabsList>

              <TabsContent value="guest" className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Entre como convidado para acessar o espaço de apoio
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Input
                    placeholder="Digite seu apelido..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={20}
                  />
                  <Button 
                    onClick={handleGuestAccess}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!nickname.trim()}
                  >
                    Entrar como Convidado
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Ou continue com
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="w-full"
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}