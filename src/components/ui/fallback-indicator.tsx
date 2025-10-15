'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function FallbackIndicator() {
  const [isFallback, setIsFallback] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if we're in fallback mode
    const checkFallbackMode = async () => {
      try {
        const response = await fetch('/api/health')
        const data = await response.json()
        setIsFallback(data.fallback || false)
        setIsVisible(true)
      } catch (error) {
        setIsFallback(true)
        setIsVisible(true)
      }
    }

    checkFallbackMode()
    
    // Check every 30 seconds
    const interval = setInterval(checkFallbackMode, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (!isVisible || !isFallback) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-pulse">
      <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 px-3 py-2 flex items-center gap-2 shadow-lg">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">Modo Offline</span>
      </Badge>
    </div>
  )
}