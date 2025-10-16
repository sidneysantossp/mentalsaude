// Sistema de Moderação e Permissões
export interface ModerationAction {
  id: string
  type: 'WARNING' | 'MUTE' | 'KICK' | 'BAN' | 'DELETE_MESSAGE'
  userId: string
  moderatorId: string
  roomId?: string
  messageId?: string
  reason: string
  duration?: number // em horas para mute/ban
  createdAt: Date
  expiresAt?: Date
  isActive: boolean
}

export interface PermissionLevel {
  level: number
  role: string
  permissions: Permission[]
}

export interface Permission {
  action: string
  resource: string
  conditions?: string[]
}

export interface ContentFilter {
  id: string
  type: 'WORD' | 'PATTERN' | 'AI'
  pattern: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
  action: 'FLAG' | 'BLOCK' | 'REVIEW'
  isActive: boolean
}

export class ModerationService {
  private static readonly PERMISSION_LEVELS: PermissionLevel[] = [
    {
      level: 0,
      role: 'BANNED',
      permissions: []
    },
    {
      level: 1,
      role: 'MEMBER',
      permissions: [
        { action: 'read', resource: 'messages' },
        { action: 'create', resource: 'messages' },
        { action: 'edit', resource: 'own_messages' },
        { action: 'delete', resource: 'own_messages' },
        { action: 'join', resource: 'public_rooms' },
        { action: 'leave', resource: 'rooms' }
      ]
    },
    {
      level: 2,
      role: 'MODERATOR',
      permissions: [
        { action: 'read', resource: 'messages' },
        { action: 'create', resource: 'messages' },
        { action: 'edit', resource: 'own_messages' },
        { action: 'delete', resource: 'own_messages' },
        { action: 'delete', resource: 'other_messages' },
        { action: 'join', resource: 'public_rooms' },
        { action: 'leave', resource: 'rooms' },
        { action: 'mute', resource: 'users', conditions: ['same_room'] },
        { action: 'kick', resource: 'users', conditions: ['same_room'] },
        { action: 'warn', resource: 'users', conditions: ['same_room'] },
        { action: 'moderate', resource: 'content' }
      ]
    },
    {
      level: 3,
      role: 'ADMIN',
      permissions: [
        { action: '*', resource: '*' } // Todas as permissões
      ]
    }
  ]

  private static readonly CONTENT_FILTERS: ContentFilter[] = [
    // Palavras ofensivas (exemplo)
    {
      id: 'offensive_words',
      type: 'WORD',
      pattern: '\\b(palavra1|palavra2|palavra3)\\b',
      severity: 'HIGH',
      action: 'BLOCK',
      isActive: true
    },
    // Padrões de spam
    {
      id: 'spam_pattern',
      type: 'PATTERN',
      pattern: '(http[s]?:\\/\\/){2,}',
      severity: 'MEDIUM',
      action: 'FLAG',
      isActive: true
    },
    // Comportamento suspeito
    {
      id: 'rapid_messages',
      type: 'PATTERN',
      pattern: 'RAPID_MESSAGE_PATTERN',
      severity: 'MEDIUM',
      action: 'REVIEW',
      isActive: true
    }
  ]

  static async checkPermission(
    userId: string, 
    action: string, 
    resource: string, 
    context?: any
  ): Promise<boolean> {
    try {
      // Buscar role do usuário na sala (se aplicável)
      const userRole = await this.getUserRole(userId, context?.roomId)
      
      // Buscar nível de permissão
      const permissionLevel = this.PERMISSION_LEVELS.find(
        level => level.role === userRole
      )

      if (!permissionLevel) {
        return false
      }

      // Verificar permissão específica
      return this.hasPermission(permissionLevel, action, resource, context)
      
    } catch (error) {
      console.error('Error checking permission:', error)
      return false
    }
  }

  static async moderateContent(
    content: string, 
    userId: string, 
    roomId?: string
  ): Promise<{
    allowed: boolean
    flags: string[]
    action: 'ALLOW' | 'FLAG' | 'BLOCK' | 'REVIEW'
    reason?: string
  }> {
    const flags: string[] = []
    let action: 'ALLOW' | 'FLAG' | 'BLOCK' | 'REVIEW' = 'ALLOW'
    let reason: string | undefined

    // Verificar filtros de conteúdo
    for (const filter of this.CONTENT_FILTERS) {
      if (!filter.isActive) continue

      const isMatch = await this.checkContentFilter(content, filter)
      if (isMatch) {
        flags.push(filter.id)
        
        // Determinar ação baseada na severidade
        if (filter.severity === 'HIGH' || filter.action === 'BLOCK') {
          action = 'BLOCK'
          reason = 'Contéudo viola as diretrizes da comunidade'
        } else if (filter.action === 'FLAG' && action !== 'BLOCK') {
          action = 'FLAG'
          reason = 'Conteúdo precisa de revisão'
        } else if (filter.action === 'REVIEW' && action === 'ALLOW') {
          action = 'REVIEW'
          reason = 'Conteúdo marcado para análise'
        }
      }
    }

    // Verificar comportamento suspeito
    const suspiciousBehavior = await this.detectSuspiciousBehavior(userId, roomId)
    if (suspiciousBehavior) {
      flags.push('SUSPICIOUS_BEHAVIOR')
      if (action === 'ALLOW') {
        action = 'REVIEW'
        reason = 'Atividade suspeita detectada'
      }
    }

    return {
      allowed: action !== 'BLOCK',
      flags,
      action,
      reason
    }
  }

  static async createModerationAction(
    type: ModerationAction['type'],
    userId: string,
    moderatorId: string,
    reason: string,
    options?: {
      roomId?: string
      messageId?: string
      duration?: number
    }
  ): Promise<ModerationAction> {
    const actionData: Partial<ModerationAction> = {
      id: `mod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      userId,
      moderatorId,
      reason,
      createdAt: new Date(),
      isActive: true
    }

    if (options?.roomId) actionData.roomId = options.roomId
    if (options?.messageId) actionData.messageId = options.messageId
    if (options?.duration) {
      actionData.duration = options.duration
      actionData.expiresAt = new Date(Date.now() + options.duration * 60 * 60 * 1000)
    }

    // Implementar lógica de salvar no banco de dados
    await this.saveModerationAction(actionData as ModerationAction)

    // Aplicar ação imediatamente
    await this.applyModerationAction(actionData as ModerationAction)

    return actionData as ModerationAction
  }

  static async getUserRole(userId: string, roomId?: string): Promise<string> {
    try {
      if (!roomId) {
        // Buscar role global do usuário
        const user = await db.user.findUnique({
          where: { id: userId },
          select: { role: true }
        })
        return user?.role || 'MEMBER'
      }

      // Buscar role específico da sala
      const membership = await db.roomMembership.findUnique({
        where: {
          roomId_userId: {
            roomId,
            userId
          }
        },
        select: { role: true, isBanned: true }
      })

      if (membership?.isBanned) return 'BANNED'
      return membership?.role || 'MEMBER'
      
    } catch (error) {
      console.error('Error getting user role:', error)
      return 'MEMBER'
    }
  }

  private static hasPermission(
    permissionLevel: PermissionLevel,
    action: string,
    resource: string,
    context?: any
  ): boolean {
    // Verificar permissão universal
    const hasUniversalPermission = permissionLevel.permissions.some(
      perm => perm.action === '*' && perm.resource === '*'
    )
    
    if (hasUniversalPermission) return true

    // Verificar permissão específica
    const hasSpecificPermission = permissionLevel.permissions.some(
      perm => {
        const actionMatch = perm.action === action || perm.action === '*'
        const resourceMatch = perm.resource === resource || perm.resource === '*'
        
        if (!actionMatch || !resourceMatch) return false
        
        // Verificar condições
        if (perm.conditions) {
          return this.checkConditions(perm.conditions, context)
        }
        
        return true
      }
    )

    return hasSpecificPermission
  }

  private static checkConditions(conditions: string[], context?: any): boolean {
    if (!context) return false

    return conditions.every(condition => {
      switch (condition) {
        case 'same_room':
          return context.roomId && context.userRoomId === context.roomId
        case 'own_content':
          return context.userId === context.contentOwnerId
        default:
          return false
      }
    })
  }

  private static async checkContentFilter(content: string, filter: ContentFilter): Promise<boolean> {
    switch (filter.type) {
      case 'WORD':
        const regex = new RegExp(filter.pattern, 'gi')
        return regex.test(content)
      
      case 'PATTERN':
        if (filter.pattern === 'RAPID_MESSAGE_PATTERN') {
          // Implementar lógica para detectar mensagens rápidas
          return await this.checkRapidMessaging(content)
        }
        const patternRegex = new RegExp(filter.pattern, 'gi')
        return patternRegex.test(content)
      
      case 'AI':
        // Implementar análise com IA
        return await this.analyzeWithAI(content)
      
      default:
        return false
    }
  }

  private static async detectSuspiciousBehavior(userId: string, roomId?: string): Promise<boolean> {
    try {
      // Verificar mensagens recentes do usuário
      const recentMessages = await db.chatMessage.findMany({
        where: {
          userId,
          createdAt: {
            gte: new Date(Date.now() - 5 * 60 * 1000) // Últimos 5 minutos
          }
        },
        take: 10
      })

      // Detectar spam (muitas mensagens em pouco tempo)
      if (recentMessages.length > 10) {
        return true
      }

      // Detectar mensagens duplicadas
      const messageContents = recentMessages.map(m => m.content)
      const uniqueMessages = new Set(messageContents)
      if (uniqueMessages.size < messageContents.length * 0.5) {
        return true
      }

      return false
    } catch (error) {
      console.error('Error detecting suspicious behavior:', error)
      return false
    }
  }

  private static async checkRapidMessaging(content: string): Promise<boolean> {
    // Implementar lógica para detectar mensagens muito rápidas
    return false
  }

  private static async analyzeWithAI(content: string): Promise<boolean> {
    try {
      // Usar Z-AI SDK para análise de conteúdo
      const ZAI = await import('z-ai-web-dev-sdk')
      const zai = await ZAI.create()

      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Você é um moderador de conteúdo. Analise se a mensagem contém linguagem ofensiva, discurso de ódio, ou conteúdo inapropriado. Responda apenas com "APROPRIATE" ou "INAPPROPRIATE".'
          },
          {
            role: 'user',
            content: content
          }
        ],
        temperature: 0.1
      })

      const result = completion.choices[0]?.message?.content
      return result?.includes('INAPPROPRIATE') || false
      
    } catch (error) {
      console.error('Error analyzing content with AI:', error)
      return false
    }
  }

  private static async saveModerationAction(action: ModerationAction): Promise<void> {
    // Implementar salvamento no banco de dados
    console.log('Saving moderation action:', action)
  }

  private static async applyModerationAction(action: ModerationAction): Promise<void> {
    switch (action.type) {
      case 'MUTE':
        await this.applyMute(action.userId, action.roomId!, action.duration!)
        break
      case 'KICK':
        await this.applyKick(action.userId, action.roomId!)
        break
      case 'BAN':
        await this.applyBan(action.userId, action.roomId, action.duration)
        break
      case 'DELETE_MESSAGE':
        await this.deleteMessage(action.messageId!)
        break
    }
  }

  private static async applyMute(userId: string, roomId: string, duration: number): Promise<void> {
    // Implementar lógica de mutar usuário
    console.log(`Muting user ${userId} in room ${roomId} for ${duration} hours`)
  }

  private static async applyKick(userId: string, roomId: string): Promise<void> {
    // Implementar lógica de expulsar usuário
    console.log(`Kicking user ${userId} from room ${roomId}`)
  }

  private static async applyBan(userId: string, roomId?: string, duration?: number): Promise<void> {
    // Implementar lógica de banir usuário
    console.log(`Banning user ${userId} ${roomId ? `from room ${roomId}` : 'globally'} ${duration ? `for ${duration} hours` : 'permanently'}`)
  }

  private static async deleteMessage(messageId: string): Promise<void> {
    // Implementar lógica de deletar mensagem
    console.log(`Deleting message ${messageId}`)
  }
}

// React Hook para moderação
export function useModeration(userId: string, roomId?: string) {
  const [userPermissions, setUserPermissions] = useState<string[]>([])
  const [isModerator, setIsModerator] = useState(false)
  const [moderationHistory, setModerationHistory] = useState<ModerationAction[]>([])

  useEffect(() => {
    loadUserPermissions()
    loadModerationHistory()
  }, [userId, roomId])

  const loadUserPermissions = async () => {
    try {
      const role = await ModerationService.getUserRole(userId, roomId)
      const permissionLevel = ModerationService['PERMISSION_LEVELS'].find(
        level => level.role === role
      )

      if (permissionLevel) {
        const permissions = permissionLevel.permissions.map(p => `${p.action}:${p.resource}`)
        setUserPermissions(permissions)
        setIsModerator(['MODERATOR', 'ADMIN'].includes(role))
      }
    } catch (error) {
      console.error('Error loading user permissions:', error)
    }
  }

  const loadModerationHistory = async () => {
    try {
      // Implementar carregamento do histórico
    } catch (error) {
      console.error('Error loading moderation history:', error)
    }
  }

  const checkPermission = async (action: string, resource: string, context?: any) => {
    return await ModerationService.checkPermission(userId, action, resource, context)
  }

  const moderateContent = async (content: string) => {
    return await ModerationService.moderateContent(content, userId, roomId)
  }

  const createModerationAction = async (
    type: ModerationAction['type'],
    targetUserId: string,
    reason: string,
    options?: any
  ) => {
    return await ModerationService.createModerationAction(
      type,
      targetUserId,
      userId,
      reason,
      options
    )
  }

  return {
    userPermissions,
    isModerator,
    moderationHistory,
    checkPermission,
    moderateContent,
    createModerationAction,
    refreshPermissions: loadUserPermissions
  }
}