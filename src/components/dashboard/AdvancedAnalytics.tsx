'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Heart, 
  Activity, 
  Target, 
  Award, 
  Calendar,
  Clock,
  Star,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface AnalyticsData {
  moodTrends: Array<{
    date: string
    mood: number
    anxiety: number
    stress: number
    sleep: number
  }>
  testProgress: Array<{
    category: string
    completed: number
    total: number
    improvement: number
  }>
  weeklyActivity: Array<{
    day: string
    tests: number
    moodEntries: number
    sessions: number
  }>
  achievements: Array<{
    title: string
    description: string
    date: string
    points: number
  }>
  insights: Array<{
    type: string
    title: string
    description: string
    priority: string
  }>
}

export default function AdvancedAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      // Simular carregamento de dados
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setData({
        moodTrends: [
          { date: '01/01', mood: 6, anxiety: 7, stress: 5, sleep: 6 },
          { date: '02/01', mood: 7, anxiety: 6, stress: 4, sleep: 7 },
          { date: '03/01', mood: 8, anxiety: 5, stress: 3, sleep: 8 },
          { date: '04/01', mood: 7, anxiety: 6, stress: 4, sleep: 7 },
          { date: '05/01', mood: 9, anxiety: 4, stress: 2, sleep: 9 },
          { date: '06/01', mood: 8, anxiety: 5, stress: 3, sleep: 8 },
          { date: '07/01', mood: 9, anxiety: 3, stress: 2, sleep: 9 }
        ],
        testProgress: [
          { category: 'Depressão', completed: 3, total: 5, improvement: 25 },
          { category: 'Ansiedade', completed: 4, total: 5, improvement: 40 },
          { category: 'Estresse', completed: 2, total: 3, improvement: 30 },
          { category: 'ADHD', completed: 1, total: 2, improvement: 15 }
        ],
        weeklyActivity: [
          { day: 'Seg', tests: 1, moodEntries: 1, sessions: 0 },
          { day: 'Ter', tests: 0, moodEntries: 1, sessions: 1 },
          { day: 'Qua', tests: 2, moodEntries: 1, sessions: 0 },
          { day: 'Qui', tests: 0, moodEntries: 1, sessions: 1 },
          { day: 'Sex', tests: 1, moodEntries: 1, sessions: 0 },
          { day: 'Sáb', tests: 0, moodEntries: 0, sessions: 0 },
          { day: 'Dom', tests: 1, moodEntries: 1, sessions: 1 }
        ],
        achievements: [
          { title: 'Primeiro Passo', description: 'Complete seu primeiro teste', date: '01/01', points: 10 },
          { title: 'Semana Consistente', description: '7 dias seguidos de atividades', date: '07/01', points: 30 },
          { title: 'Explorador', description: 'Complete 5 testes diferentes', date: '05/01', points: 50 }
        ],
        insights: [
          { type: 'positive', title: 'Melhora Significativa', description: 'Seus níveis de ansiedade diminuíram 40% este mês', priority: 'high' },
          { type: 'suggestion', title: 'Foco em Sono', description: 'Tente manter uma rotina regular de sono', priority: 'medium' },
          { type: 'warning', title: 'Estresse Elevado', description: 'Níveis de estresse acima da média na terça', priority: 'low' }
        ]
      })
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'suggestion': return <Target className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Análise Avançada</h2>
          <p className="text-gray-600">Acompanhe seu progresso e insights personalizados</p>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === 'week' ? 'Semana' : range === 'month' ? 'Mês' : 'Ano'}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Média de Humor</p>
                <p className="text-2xl font-bold text-gray-900">8.2</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Testes Completos</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">Este mês</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sequência Atual</p>
                <p className="text-2xl font-bold text-gray-900">7 dias</p>
                <div className="flex items-center mt-1">
                  <Zap className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Recorde!</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pontos Ganhos</p>
                <p className="text-2xl font-bold text-gray-900">450</p>
                <div className="flex items-center mt-1">
                  <Award className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Nível 5</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Bem-Estar</CardTitle>
              <CardDescription>Acompanhe suas métricas emocionais ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.moodTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mood" stroke="#10b981" name="Humor" strokeWidth={2} />
                  <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" name="Ansiedade" strokeWidth={2} />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Estresse" strokeWidth={2} />
                  <Line type="monotone" dataKey="sleep" stroke="#6366f1" name="Sono" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progresso nos Testes</CardTitle>
              <CardDescription>Seu desenvolvimento em cada categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.testProgress.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {category.completed}/{category.total}
                        </span>
                        <Badge variant="secondary" className="text-green-600">
                          +{category.improvement}%
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={(category.completed / category.total) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Semanal</CardTitle>
              <CardDescription>Suas atividades diárias dos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tests" fill="#3b82f6" name="Testes" />
                  <Bar dataKey="moodEntries" fill="#10b981" name="Registros de Humor" />
                  <Bar dataKey="sessions" fill="#8b5cf6" name="Sessões" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4">
            {data.insights.map((insight, index) => (
              <Card key={index} className={`border-l-4 ${getPriorityColor(insight.priority)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                      {insight.priority === 'high' ? 'Alta' : insight.priority === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conquistas Recentes</CardTitle>
              <CardDescription>Seus últimos prêmios e reconhecimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">+{achievement.points} pts</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}