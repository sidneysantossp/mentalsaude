// Chatbot Terapêutico com Z-AI SDK
import ZAI from 'z-ai-web-dev-sdk'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  mood?: number
  context?: string
}

export interface TherapySession {
  id: string
  userId: string
  messages: ChatMessage[]
  startedAt: Date
  lastActive: Date
  moodBefore?: number
  moodAfter?: number
  topics: string[]
  insights: string[]
}

export interface AIInsight {
  type: 'pattern' | 'recommendation' | 'warning' | 'achievement'
  title: string
  description: string
  confidence: number
  actionable: boolean
  priority: 'low' | 'medium' | 'high'
}

export class AITherapistService {
  private static zai: any = null

  static async initialize() {
    if (!this.zai) {
      this.zai = await ZAI.create()
    }
    return this.zai
  }

  static async startSession(userId: string): Promise<TherapySession> {
    await this.initialize()
    
    const welcomeMessage = await this.generateResponse(
      "Olá! Sou seu assistente de saúde mental. Como você está se sentindo hoje?",
      { 
        isFirstMessage: true,
        userName: await this.getUserName(userId)
      }
    )

    return {
      id: `session_${Date.now()}`,
      userId,
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date()
        }
      ],
      startedAt: new Date(),
      lastActive: new Date(),
      topics: [],
      insights: []
    }
  }

  static async sendMessage(
    sessionId: string, 
    userMessage: string, 
    mood?: number,
    context?: any
  ): Promise<string> {
    await this.initialize()

    try {
      // Analisar mensagem do usuário
      const analysis = await this.analyzeMessage(userMessage, mood, context)
      
      // Gerar resposta terapêutica
      const response = await this.generateResponse(userMessage, {
        mood,
        analysis,
        sessionId,
        previousContext: context
      })

      // Gerar insights se necessário
      if (analysis.requiresInsights) {
        await this.generateInsights(sessionId, analysis)
      }

      return response
    } catch (error) {
      console.error('Error in AI therapist:', error)
      return "Desculpe, estou tendo dificuldades para processar sua mensagem. Que tal tentar novamente?"
    }
  }

  private static async generateResponse(
    userMessage: string, 
    context: any
  ): Promise<string> {
    const systemPrompt = `Você é um assistente de saúde mental compassivo e profissional.

Regras importantes:
1. Sempre seja empático e validador dos sentimentos do usuário
2. Nunca faça diagnósticos médicos - sempre recomende procurar um profissional
3. Use linguagem acolhedora e sem julgamentos
4. Ofereça técnicas práticas de bem-estar quando apropriado
5. Reconheça padrões emocionais e sugira reflexões construtivas
6. Mantenha confidencialidade e ética profissional
7. Adapte o tom de acordo com o estado emocional do usuário
8. Use português brasileiro caloroso e acessível

Contexto adicional: ${JSON.stringify(context)}`

    const completion = await this.zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return completion.choices[0]?.message?.content || 
           "Estou aqui para ouvir você. Pode compartilhar o que está sentindo."
  }

  private static async analyzeMessage(
    message: string, 
    mood?: number, 
    context?: any
  ): Promise<any> {
    const analysisPrompt = `Analise esta mensagem de saúde mental:

Mensagem: "${message}"
Humor reportado: ${mood || 'não informado'}
Contexto: ${JSON.stringify(context || {})}

Retorne um JSON com:
{
  "emotionalTone": "positivo|negativo|neutro|ansioso|deprimido|irritado",
  "riskLevel": "baixo|médio|alto",
  "mainTopics": ["tópico1", "tópico2"],
  "requiresCrisisIntervention": boolean,
  "requiresInsights": boolean,
  "suggestedTechniques": ["técnica1", "técnica2"],
  "followUpQuestions": ["pergunta1", "pergunta2"]
}`

    try {
      const completion = await this.zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Você é um analista de saúde mental especializado.' },
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.3
      })

      const response = completion.choices[0]?.message?.content
      return JSON.parse(response || '{}')
    } catch (error) {
      return {
        emotionalTone: 'neutro',
        riskLevel: 'baixo',
        mainTopics: [],
        requiresCrisisIntervention: false,
        requiresInsights: false,
        suggestedTechniques: [],
        followUpQuestions: []
      }
    }
  }

  private static async generateInsights(
    sessionId: string, 
    analysis: any
  ): Promise<AIInsight[]> {
    const insights: AIInsight[] = []

    // Insight de padrão emocional
    if (analysis.emotionalTone === 'negativo' || analysis.emotionalTone === 'deprimido') {
      insights.push({
        type: 'pattern',
        title: 'Padrão Emocional Identificado',
        description: 'Detectei um padrão de sentimentos negativos recorrentes. Isso pode ser um sinal para buscar apoio adicional.',
        confidence: 0.8,
        actionable: true,
        priority: 'medium'
      })
    }

    // Insight de crise
    if (analysis.requiresCrisisIntervention) {
      insights.push({
        type: 'warning',
        title: 'Atenção: Suporte Imediato',
        description: 'Recomendo procurar ajuda profissional imediatamente. Ligue para 188 (CVV) ou procure um serviço de emergência.',
        confidence: 0.95,
        actionable: true,
        priority: 'high'
      })
    }

    // Insight de técnica recomendada
    if (analysis.suggestedTechniques.length > 0) {
      insights.push({
        type: 'recommendation',
        title: 'Técnica Recomendada',
        description: `Tente praticar: ${analysis.suggestedTechniques.join(', ')}`,
        confidence: 0.7,
        actionable: true,
        priority: 'low'
      })
    }

    return insights
  }

  private static async getUserName(userId: string): Promise<string> {
    // Obter nome do usuário do banco de dados
    return "amigo(a)"
  }

  static async generateWeeklyReport(userId: string): Promise<string> {
    await this.initialize()

    const reportPrompt = `Gere um relatório semanal de saúde mental para um usuário.

Inclua:
1. Resumo do bem-estar emocional da semana
2. Padrões identificados
3. Progressos e desafios
4. Recomendações personalizadas
5. Próximos passos para a próxima semana

Use tom encorajador e construtivo.`

    try {
      const completion = await this.zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Você é um profissional de saúde mental especializado em relatórios terapêuticos.' },
          { role: 'user', content: reportPrompt }
        ],
        temperature: 0.6,
        max_tokens: 800
      })

      return completion.choices[0]?.message?.content || 
             "Relatório em processamento. Tente novamente mais tarde."
    } catch (error) {
      console.error('Error generating weekly report:', error)
      return "Não foi possível gerar o relatório neste momento."
    }
  }

  static async getCrisisSupport(): Promise<string> {
    return `Entendo que você está passando por um momento difícil. Por favor, saiba que ajuda está disponível:

🆘 **Recursos Imediatos:**
• CVV - Centro de Valorização da Vida: 188 (24h)
• SAMU - Emergência: 192
• CAPS mais próximo: Procure na sua cidade

📱 **Aplicativos de Apoio:**
• Meditation & Relaxation
• Calm
• Headspace

🏥 **Quando Procurar Ajuda Profissional:**
• Pensamentos sobre se machucar
• Dificuldade de funcionar no dia a dia
• Sintomas que persistem por mais de 2 semanas
• Impacto significativo em relacionamentos ou trabalho

Você não está sozinho(a). Pedir ajuda é um ato de coragem.`
  }
}

// React Hook para o chatbot
export function useAITherapist(userId: string) {
  const [session, setSession] = React.useState<TherapySession | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [insights, setInsights] = React.useState<AIInsight[]>([])

  const startNewSession = async () => {
    setLoading(true)
    try {
      const newSession = await AITherapistService.startSession(userId)
      setSession(newSession)
    } catch (error) {
      console.error('Error starting session:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (message: string, mood?: number) => {
    if (!session) return

    setLoading(true)
    try {
      const response = await AITherapistService.sendMessage(
        session.id, 
        message, 
        mood,
        { previousMessages: session.messages }
      )

      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        mood
      }

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, newMessage, assistantMessage],
        lastActive: new Date()
      } : null)

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateWeeklyReport = async () => {
    setLoading(true)
    try {
      const report = await AITherapistService.generateWeeklyReport(userId)
      return report
    } catch (error) {
      console.error('Error generating report:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    session,
    loading,
    insights,
    startNewSession,
    sendMessage,
    generateWeeklyReport,
    getCrisisSupport: AITherapistService.getCrisisSupport
  }
}