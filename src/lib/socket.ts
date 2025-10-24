import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'
import { db } from '@/lib/db'

export const config = {
  api: {
    bodyParser: false,
  },
}

// Setup function for server.ts
export function setupSocket(io: ServerIO) {
  console.log('Socket.IO server setup complete')

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    // Basic connection events
    socket.on('join-room', (data: { roomId: string }) => {
      socket.join(data.roomId)
      console.log(`Socket ${socket.id} joined room ${data.roomId}`)
    })

    socket.on('send-message', (data: { roomId: string; content: string }) => {
      io.to(data.roomId).emit('new-message', {
        id: Date.now().toString(),
        content: data.content,
        sender: socket.id,
        timestamp: new Date()
      })
    })

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`)
    })
  })
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponse & { socket: any }) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })

    setupSocket(io)

    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler