'use client'

import { useState, useEffect } from 'react'
  Heart, 
  Flame, 
  Zap, 
  Shield, 
  Calendar, 
  Users,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Award
} from 'lucide-react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

interface Test {
  id: string
  title: string
  description: string
  category: string
  timeLimit: number
  questionCount: number
  estimatedTime: string
  questions: string
  difficulty: string
  icon: string
  color: string
  image: string
  instructions: string
  isActive: boolean
}

// Configuração das categorias para landing pages
const categoryConfig = {
  'compulsao-alimentar': {
    title: 'Compulsão Alimentar',
    description: 'Avaliação de transtorno alimentar com a Binge Eating Scale',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    stats: { users: '2.3k', time: '15 min', accuracy: '95%' }
  },
  'depressao': {
    title: 'Depressão',
    description: 'Teste PHQ-9 para avaliação de sintomas depressivos',
    icon: Brain,
    color: 'from-blue-500 to-indigo-600',
    stats: { users: '5.1k', time: '10 min', accuracy: '97%' }
  },
  'depressao-maior': {
    title: 'Depressão Maior',
    description: 'Avaliação completa baseada nos critérios DSM-5',
    icon: AlertTriangle,
    color: 'from-gray-600 to-gray-800',
    stats: { users: '1.8k', time: '20 min', accuracy: '96%' }
  },
  'fobia-social': {
    title: 'Fobia Social',
    description: 'Avaliação de ansiedade social com a escala LSAS',
    icon: Users,
    color: 'from-purple-500 to-purple-700',
    stats: { users: '3.2k', time: '15 min', accuracy: '94%' }
  },
  'insonia': {
    title: 'Insônia',
    description: 'Avaliação de distúrbios do sono com o ISI',
    icon: Moon,
    color: 'from-indigo-500 to-blue-600',
    stats: { users: '2.7k', time: '10 min', accuracy: '95%' }
  },
  'burnout': {
    title: 'Burnout',
    description: 'Avaliação de esgotamento profissional com MBI',
    icon: Zap,
    color: 'from-orange-500 to-red-600',
    stats: { users: '4.5k', time: '15 min', accuracy: '96%' }
  },
  'estresse': {
    title: 'Estresse',
    description: 'Medição de níveis de estresse com a PSS',
    icon: Flame,
    color: 'from-yellow-500 to-orange-600',
    stats: { users: '6.2k', time: '10 min', accuracy: '95%' }
  },
  'sindrome-impostor': {
    title: 'Síndrome do Impostor',
    description: 'Avaliação de sentimentos de fraude profissional',
    icon: Target,
    color: 'from-teal-500 to-cyan-600',
    stats: { users: '1.9k', time: '15 min', accuracy: '93%' }
  },
  'tdah': {
    title: 'TDAH',
    description: 'Teste ASRS para TDAH em adultos',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    stats: { users: '3.8k', time: '15 min', accuracy: '96%' }
  },
  'toc': {
    title: 'TOC',
    description: 'Avaliação de transtorno obsessivo-compulsivo',
    icon: Shield,
    color: 'from-violet-500 to-purple-600',
    stats: { users: '2.1k', time: '20 min', accuracy: '97%' }
  },
  'transtorno-afetivo-bipolar': {
    title: 'Transtorno Bipolar',
    description: 'Avaliação de humor com o MDQ',
    icon: Sun,
    color: 'from-pink-500 to-purple-600',
    stats: { users: '1.5k', time: '15 min', accuracy: '94%' }
  },
  'transtorno-ansiedade': {
    title: 'Transtorno de Ansiedade',
    description: 'Teste GAD-7 para ansiedade generalizada',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    stats: { users: '4.8k', time: '10 min', accuracy: '96%' }
  }
}


  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/tests')
      
      if (!response.ok) {
        throw new Error('Erro ao buscar testes')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setTests(data.data)
  // Agrupar testes por categoria
  const testsByCategory = tests.reduce((acc, test) => {
    const categoryKey = test.category.toLowerCase().replace('_', '-')
    if (!acc[categoryKey]) {
      acc[categoryKey] = []
    }
    acc[categoryKey].push(test)
    return acc
  }, {} as Record<string, Test[]>)

  const categories = Object.keys(categoryConfig)

  return (
    <LayoutWrapper>
    </LayoutWrapper>
  )
}