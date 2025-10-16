// Sistema de Gamificação para Engajamento
export interface GamificationSystem {
  userPoints: number
  currentLevel: number
  nextLevelPoints: number
  achievements: Achievement[]
  streaks: Streak[]
  challenges: Challenge[]
  rewards: Reward[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
  progress: number
  maxProgress: number
  category: 'testing' | 'consistency' | 'improvement' | 'social'
}

export interface Streak {
  type: 'daily' | 'weekly' | 'monthly'
  currentCount: number
  bestCount: number
  lastActive: Date
  isActive: boolean
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'test' | 'mood' | 'learning' | 'social'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  deadline: Date
  progress: number
  isCompleted: boolean
  requirements: ChallengeRequirement[]
}

export interface ChallengeRequirement {
  type: string
  target: number
  current: number
}

export interface Reward {
  id: string
  title: string
  description: string
  type: 'badge' | 'avatar' | 'theme' | 'feature'
  pointsCost: number
  isUnlocked: boolean
  unlockedAt?: Date
}

export class GamificationService {
  static readonly ACHIEVEMENTS: Omit<Achievement, 'progress' | 'unlockedAt'>[] = [
    // Testes
    {
      id: 'first_test',
      title: 'Primeiro Passo',
      description: 'Complete seu primeiro teste psicológico',
      icon: '🎯',
      points: 10,
      rarity: 'common',
      maxProgress: 1,
      category: 'testing'
    },
    {
      id: 'test_explorer',
      title: 'Explorador',
      description: 'Complete 5 testes diferentes',
      icon: '🔍',
      points: 50,
      rarity: 'rare',
      maxProgress: 5,
      category: 'testing'
    },
    {
      id: 'test_master',
      title: 'Mestre dos Testes',
      description: 'Complete todos os tipos de testes disponíveis',
      icon: '🏆',
      points: 200,
      rarity: 'epic',
      maxProgress: 8,
      category: 'testing'
    },
    
    // Consistência
    {
      id: 'daily_streak_7',
      title: 'Semana Consistente',
      description: 'Mantenha uma sequência de 7 dias de atividades',
      icon: '📅',
      points: 30,
      rarity: 'rare',
      maxProgress: 7,
      category: 'consistency'
    },
    {
      id: 'daily_streak_30',
      title: 'Mês Dedicado',
      description: 'Mantenha uma sequência de 30 dias de atividades',
      icon: '🌟',
      points: 150,
      rarity: 'epic',
      maxProgress: 30,
      category: 'consistency'
    },
    
    // Melhoria
    {
      id: 'first_improvement',
      title: 'Crescimento',
      description: 'Mostre melhoria em qualquer teste',
      icon: '📈',
      points: 25,
      rarity: 'common',
      maxProgress: 1,
      category: 'improvement'
    },
    {
      id: 'significant_improvement',
      title: 'Transformação',
      description: 'Melhore seus resultados em 20% ou mais',
      icon: '🚀',
      points: 100,
      rarity: 'epic',
      maxProgress: 1,
      category: 'improvement'
    }
  ]

  static readonly CHALLENGES: Omit<Challenge, 'progress' | 'isCompleted'>[] = [
    {
      id: 'daily_checkin',
      title: 'Check-in Diário',
      description: 'Registre seu humor por 7 dias consecutivos',
      type: 'mood',
      difficulty: 'easy',
      points: 20,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      requirements: [
        { type: 'mood_entries', target: 7, current: 0 }
      ]
    },
    {
      id: 'test_week',
      title: 'Semana de Testes',
      description: 'Complete 3 testes diferentes esta semana',
      type: 'test',
      difficulty: 'medium',
      points: 40,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      requirements: [
        { type: 'tests_completed', target: 3, current: 0 }
      ]
    },
    {
      id: 'learning_journey',
      title: 'Jornada de Aprendizado',
      description: 'Leia 5 artigos sobre saúde mental',
      type: 'learning',
      difficulty: 'easy',
      points: 30,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      requirements: [
        { type: 'articles_read', target: 5, current: 0 }
      ]
    }
  ]

  static async awardPoints(userId: string, points: number, reason: string) {
    // Implementar sistema de pontos
    console.log(`Awarding ${points} points to user ${userId} for: ${reason}`)
  }

  static async checkAchievements(userId: string, action: string, metadata?: any) {
    // Verificar conquistas desbloqueadas
    const relevantAchievements = this.ACHIEVEMENTS.filter(
      achievement => achievement.category === this.getCategoryFromAction(action)
    )

    for (const achievement of relevantAchievements) {
      // Lógica para verificar se conquista foi desbloqueada
      await this.unlockAchievement(userId, achievement.id)
    }
  }

  static async updateStreak(userId: string, type: 'daily' | 'weekly' | 'monthly') {
    // Atualizar sequências do usuário
    console.log(`Updating ${type} streak for user ${userId}`)
  }

  static async getLeaderboard(limit: number = 10) {
    // Obter ranking de usuários
    return []
  }

  private static getCategoryFromAction(action: string): Achievement['category'] {
    if (action.includes('test')) return 'testing'
    if (action.includes('mood') || action.includes('daily')) return 'consistency'
    if (action.includes('improvement')) return 'improvement'
    return 'testing'
  }

  private static async unlockAchievement(userId: string, achievementId: string) {
    // Desbloquear conquista para o usuário
    console.log(`Unlocking achievement ${achievementId} for user ${userId}`)
  }
}

// React Hook para gamificação
export function useGamification(userId: string) {
  const [gameData, setGameData] = React.useState<GamificationSystem | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Carregar dados de gamificação do usuário
    loadGamificationData()
  }, [userId])

  const loadGamificationData = async () => {
    // Implementar carregamento de dados
    setLoading(false)
  }

  const completeAction = async (action: string, metadata?: any) => {
    await GamificationService.checkAchievements(userId, action, metadata)
    await loadGamificationData() // Recarregar dados
  }

  return {
    gameData,
    loading,
    completeAction,
    refreshData: loadGamificationData
  }
}