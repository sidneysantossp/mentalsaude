'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Settings, 
  ArrowLeft,
  Save,
  RefreshCw,
  Database,
  Shield,
  Bell,
  Mail,
  Globe,
  Users,
  FileText,
  Brain,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'

interface SystemSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  maxUsers: number
  allowRegistration: boolean
  emailNotifications: boolean
  maintenanceMode: boolean
  aiServiceEnabled: boolean
  dataRetentionDays: number
}

interface SystemStatus {
  database: 'online' | 'offline' | 'error'
  api: 'online' | 'offline' | 'error'
  aiService: 'online' | 'offline' | 'error'
  storage: 'healthy' | 'warning' | 'critical'
}

export default function AdminSettings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'Plataforma de Saúde Mental',
    siteDescription: 'Avaliações psicológicas online para compreender melhor seu bem-estar emocional',
    contactEmail: 'contato@saudemental.com',
    maxUsers: 1000,
    allowRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
    aiServiceEnabled: true,
    dataRetentionDays: 365
  })
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    database: 'online',
    api: 'online',
    aiService: 'online',
    storage: 'healthy'
  })
  const [loading, setLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(true)

  useEffect(() => {
    // Check if user is admin
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    fetchSystemStatus()
  }, [status, session, router])

  const fetchSystemStatus = async () => {
    try {
      const response = await fetch('/api/admin/settings/status')
      if (response.ok) {
        const data = await response.json()
        setSystemStatus(data.status)
      }
    } catch (error) {
      console.error('Error fetching system status:', error)
    } finally {
      setStatusLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        alert('Configurações salvas com sucesso!')
      } else {
        alert('Erro ao salvar configurações')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Erro ao salvar configurações')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof SystemSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'offline':
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'error':
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online'
      case 'offline':
        return 'Offline'
      case 'error':
        return 'Erro'
      case 'healthy':
        return 'Saudável'
      case 'warning':
        return 'Atenção'
      case 'critical':
        return 'Crítico'
      default:
        return 'Desconhecido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'offline':
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
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
              <Link href="/admin" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Configurações do Sistema</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleSaveSettings} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/admin" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Dashboard
            </Link>
            <Link href="/admin/users" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Usuários
            </Link>
            <Link href="/admin/tests" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Testes
            </Link>
            <Link href="/admin/questions" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Questões
            </Link>
            <Link href="/admin/results" className="py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Resultados
            </Link>
            <Link href="/admin/settings" className="py-4 px-1 border-b-2 border-blue-500 text-sm font-medium text-blue-600">
              Configurações
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Status */}
        <Card className="shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              <span>Status do Sistema</span>
            </CardTitle>
            <CardDescription>
              Status atual dos componentes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Database className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Banco de Dados</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(systemStatus.database)}
                    <Badge className={getStatusColor(systemStatus.database)}>
                      {getStatusText(systemStatus.database)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">API</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(systemStatus.api)}
                    <Badge className={getStatusColor(systemStatus.api)}>
                      {getStatusText(systemStatus.api)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Brain className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Serviço IA</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(systemStatus.aiService)}
                    <Badge className={getStatusColor(systemStatus.aiService)}>
                      {getStatusText(systemStatus.aiService)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Armazenamento</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(systemStatus.storage)}
                    <Badge className={getStatusColor(systemStatus.storage)}>
                      {getStatusText(systemStatus.storage)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span>Configurações Gerais</span>
              </CardTitle>
              <CardDescription>
                Informações básicas do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Site
                </label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  placeholder="Nome do site"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Site
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  placeholder="Descrição do site"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contato
                </label>
                <Input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Máximo de Usuários
                </label>
                <Input
                  type="number"
                  value={settings.maxUsers}
                  onChange={(e) => handleInputChange('maxUsers', parseInt(e.target.value))}
                  placeholder="1000"
                />
              </div>
            </CardContent>
          </Card>

          {/* User Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Configurações de Usuários</span>
              </CardTitle>
              <CardDescription>
                Gerenciamento de usuários e permissões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Permitir Novos Cadastros</p>
                  <p className="text-sm text-gray-500">Usuários podem se cadastrar no site</p>
                </div>
                <button
                  onClick={() => handleInputChange('allowRegistration', !settings.allowRegistration)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.allowRegistration ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Notificações por Email</p>
                  <p className="text-sm text-gray-500">Enviar notificações por email</p>
                </div>
                <button
                  onClick={() => handleInputChange('emailNotifications', !settings.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Modo de Manutenção</p>
                  <p className="text-sm text-gray-500">Desativar acesso ao site</p>
                </div>
                <button
                  onClick={() => handleInputChange('maintenanceMode', !settings.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Service Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span>Configurações de Serviços</span>
              </CardTitle>
              <CardDescription>
                Configurações dos serviços integrados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Serviço de IA</p>
                  <p className="text-sm text-gray-500">Análise inteligente de resultados</p>
                </div>
                <button
                  onClick={() => handleInputChange('aiServiceEnabled', !settings.aiServiceEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.aiServiceEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.aiServiceEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retenção de Dados (dias)
                </label>
                <Input
                  type="number"
                  value={settings.dataRetentionDays}
                  onChange={(e) => handleInputChange('dataRetentionDays', parseInt(e.target.value))}
                  placeholder="365"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Dias para manter dados de usuários inativos
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>Backup e Segurança</span>
              </CardTitle>
              <CardDescription>
                Configurações de backup e segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">Backup Automático</p>
                </div>
                <p className="text-sm text-blue-700">
                  Backup diário realizado às 02:00 UTC
                </p>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Fazer Backup Agora
                </Button>
                
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restaurar Backup
                </Button>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-900">Último Backup</p>
                </div>
                <p className="text-sm text-yellow-700">
                  {new Date().toLocaleDateString('pt-BR')} às 02:00 UTC
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}