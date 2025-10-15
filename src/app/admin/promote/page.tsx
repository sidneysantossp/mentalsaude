'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Shield, UserCheck, AlertCircle } from 'lucide-react'

export default function PromoteUserPage() {
  const [email, setEmail] = useState('sid.websp@gmail.com')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const promoteUser = async () => {
    setLoading(true)
    setMessage('')
    setMessageType('')

    try {
      const response = await fetch('/api/admin/promote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`✅ ${data.message}`)
        setMessageType('success')
        console.log('Usuário promovido:', data.user)
      } else {
        setMessage(`❌ ${data.error}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(`❌ Erro de conexão: ${error.message}`)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Promover Usuário para Admin
            </CardTitle>
            <CardDescription>
              Promova um usuário existente para ter privilégios de administrador
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email do Usuário
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@exemplo.com"
                className="w-full"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                messageType === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {messageType === 'success' ? (
                  <UserCheck className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span className="text-sm">{message}</span>
              </div>
            )}

            <Button 
              onClick={promoteUser}
              disabled={loading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Promovendo...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Promover para Admin
                </>
              )}
            </Button>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Instruções:</h3>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Confirme o email do usuário que deseja promover</li>
                <li>Clique em "Promover para Admin"</li>
                <li>O usuário terá acesso ao painel administrativo</li>
                <li>Peça para o usuário fazer logout e login novamente</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}