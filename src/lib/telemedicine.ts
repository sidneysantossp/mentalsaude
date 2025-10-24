// Sistema de Telemedicina com WebRTC
export interface TelemedicineSession {
  id: string
  appointmentId: string
  professionalId: string
  userId: string
  status: 'waiting' | 'active' | 'ended' | 'failed'
  startTime?: Date
  endTime?: Date
  duration?: number
  recordingUrl?: string
  quality: 'low' | 'medium' | 'high'
  participants: Participant[]
}

export interface Participant {
  id: string
  name: string
  role: 'professional' | 'user'
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
  connectionQuality: 'poor' | 'fair' | 'good' | 'excellent'
}

export interface VideoCallSettings {
  video: {
    enabled: boolean
    quality: '360p' | '720p' | '1080p'
    device?: string
  }
  audio: {
    enabled: boolean
    device?: string
    echoCancellation: boolean
    noiseSuppression: boolean
  }
  screen: {
    sharing: boolean
    quality: '720p' | '1080p'
  }
}

export class TelemedicineService {
  private peerConnection: RTCPeerConnection | null = null
  private localStream: MediaStream | null = null
  private remoteStreams: Map<string, MediaStream> = new Map()
  private socket: any = null

  async initializeSession(sessionId: string, userId: string) {
    try {
      // Configurar conexão Socket.io para telemedicina
      this.socket = io('/telemedicine', {
        query: { sessionId, userId }
      })

      // Configurar WebRTC
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { 
            urls: 'turn:turn.example.com:3478',
            username: 'user',
            credential: 'pass'
          }
        ]
      }

      this.peerConnection = new RTCPeerConnection(configuration)

      // Event handlers
      this.setupPeerConnectionHandlers()
      this.setupSocketHandlers()

      return true
    } catch (error) {
      console.error('Erro ao inicializar sessão de telemedicina:', error)
      return false
    }
  }

  async startLocalStream(settings: VideoCallSettings) {
    try {
      const constraints = {
        video: settings.video.enabled ? {
          width: { ideal: settings.video.quality === '1080p' ? 1920 : settings.video.quality === '720p' ? 1280 : 640 },
          height: { ideal: settings.video.quality === '1080p' ? 1080 : settings.video.quality === '720p' ? 720 : 360 },
          deviceId: settings.video.device
        } : false,
        audio: settings.audio.enabled ? {
          deviceId: settings.audio.device,
          echoCancellation: settings.audio.echoCancellation,
          noiseSuppression: settings.audio.noiseSuppression
        } : false
      }

      this.localStream = await navigator.mediaDevices.getUserMedia(constraints)
      
      if (this.peerConnection) {
        this.localStream.getTracks().forEach(track => {
          this.peerConnection!.addTrack(track, this.localStream!)
        })
      }

      return this.localStream
    } catch (error) {
      console.error('Erro ao acessar mídia local:', error)
      throw error
    }
  }

  async createOffer() {
    if (!this.peerConnection) throw new Error('PeerConnection não inicializada')

    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(offer)

    this.socket.emit('call-offer', {
      offer: offer,
      sessionId: this.socket.id
    })

    return offer
  }

  async handleOffer(offer: any) {
    if (!this.peerConnection) throw new Error('PeerConnection não inicializada')

    await this.peerConnection.setRemoteDescription(offer)
    const answer = await this.peerConnection.createAnswer()
    await this.peerConnection.setLocalDescription(answer)

    this.socket.emit('call-answer', {
      answer: answer,
      sessionId: this.socket.id
    })

    return answer
  }

  async handleAnswer(answer: any) {
    if (!this.peerConnection) throw new Error('PeerConnection não inicializada')
    await this.peerConnection.setRemoteDescription(answer)
  }

  async handleIceCandidate(candidate: any) {
    if (!this.peerConnection) throw new Error('PeerConnection não inicializada')
    await this.peerConnection.addIceCandidate(candidate)
  }

  toggleAudio(enabled: boolean) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = enabled
      })
    }
  }

  toggleVideo(enabled: boolean) {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = enabled
      })
    }
  }

  async startScreenShare() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      })

      if (this.peerConnection && this.localStream) {
        // Parar vídeo da câmera
        this.localStream.getVideoTracks().forEach(track => {
          track.enabled = false
        })

        // Adicionar tela
        screenStream.getTracks().forEach(track => {
          this.peerConnection!.addTrack(track, screenStream)
        })

        // Quando parar compartilhamento, voltar para câmera
        screenStream.getVideoTracks()[0].onended = () => {
          this.stopScreenShare()
        }
      }

      return screenStream
    } catch (error) {
      console.error('Erro ao compartilhar tela:', error)
      throw error
    }
  }

  stopScreenShare() {
    // Implementar lógica para voltar para câmera
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = true
      })
    }
  }

  async endCall() {
    // Parar streams locais
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop())
      this.localStream = null
    }

    // Parar streams remotos
    this.remoteStreams.forEach(stream => {
      stream.getTracks().forEach(track => track.stop())
    })
    this.remoteStreams.clear()

    // Fechar conexão
    if (this.peerConnection) {
      this.peerConnection.close()
      this.peerConnection = null
    }

    // Desconectar socket
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  getConnectionQuality(): 'poor' | 'fair' | 'good' | 'excellent' {
    if (!this.peerConnection) return 'poor'

    // Implementar lógica de verificação de qualidade
    const stats = this.peerConnection.getStats()
    // Analisar latency, packet loss, bandwidth
    return 'good' // Placeholder
  }

  private setupPeerConnectionHandlers() {
    if (!this.peerConnection) return

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('ice-candidate', {
          candidate: event.candidate,
          sessionId: this.socket.id
        })
      }
    }

    this.peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams
      this.remoteStreams.set(event.track.id, remoteStream)
    }

    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', this.peerConnection?.connectionState)
    }
  }

  private setupSocketHandlers() {
    if (!this.socket) return

    this.socket.on('call-offer', async (data: any) => {
      await this.handleOffer(data.offer)
    })

    this.socket.on('call-answer', async (data: any) => {
      await this.handleAnswer(data.answer)
    })

    this.socket.on('ice-candidate', async (data: any) => {
      await this.handleIceCandidate(data.candidate)
    })

    this.socket.on('user-disconnected', (userId: string) => {
      const stream = this.remoteStreams.get(userId)
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        this.remoteStreams.delete(userId)
      }
    })
  }
}

// React Hook para telemedicina
export function useTelemedicine(sessionId: string, userId: string) {
  const [service, setService] = useState<TelemedicineService | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map())
  const [isConnected, setIsConnected] = useState(false)
  const [connectionQuality, setConnectionQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good')

  useEffect(() => {
    const telemedicineService = new TelemedicineService()
    
    const initialize = async () => {
      const initialized = await telemedicineService.initializeSession(sessionId, userId)
      if (initialized) {
        setService(telemedicineService)
        setIsConnected(true)
      }
    }

    initialize()

    return () => {
      telemedicineService.endCall()
    }
  }, [sessionId, userId])

  const startCall = async (settings: VideoCallSettings) => {
    if (!service) return false

    try {
      const stream = await service.startLocalStream(settings)
      setLocalStream(stream)
      await service.createOffer()
      return true
    } catch (error) {
      console.error('Erro ao iniciar chamada:', error)
      return false
    }
  }

  const toggleAudio = (enabled: boolean) => {
    service?.toggleAudio(enabled)
  }

  const toggleVideo = (enabled: boolean) => {
    service?.toggleVideo(enabled)
  }

  const startScreenShare = async () => {
    return await service?.startScreenShare()
  }

  const endCall = () => {
    service?.endCall()
    setLocalStream(null)
    setRemoteStreams(new Map())
    setIsConnected(false)
  }

  return {
    service,
    localStream,
    remoteStreams,
    isConnected,
    connectionQuality,
    startCall,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    endCall
  }
}