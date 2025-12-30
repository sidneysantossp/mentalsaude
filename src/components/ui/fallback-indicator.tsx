'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function FallbackIndicator() {
  const [isFallback, setIsFallback] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkFallbackMode = async () => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setIsFallback(true)
        setIsVisible(true)
        return
      }

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

    const interval = setInterval(() => {
      if (typeof navigator === 'undefined' || navigator.onLine) {
        checkFallbackMode()
      }
    }, 60000)

    const handleOnline = () => checkFallbackMode()
    const handleOffline = () => {
      setIsFallback(true)
      setIsVisible(true)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
    }

    return () => {
      clearInterval(interval)
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
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
