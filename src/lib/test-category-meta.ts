import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  Heart,
  Flame,
  Zap,
  Users,
  AlertTriangle,
  Eye,
  Cloud,
  Shield
} from 'lucide-react'

export type CategoryMeta = {
  icon: LucideIcon
  gradient: string
  accent: string
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  DEPRESSION: {
    icon: Brain,
    gradient: 'from-blue-500 via-blue-600 to-purple-700',
    accent: 'bg-blue-500/80'
  },
  ANXIETY: {
    icon: Heart,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    accent: 'bg-blue-500/80'
  },
  OCD: {
    icon: Flame,
    gradient: 'from-orange-500 via-pink-500 to-purple-600',
    accent: 'bg-orange-500/80'
  },
  ADHD: {
    icon: Zap,
    gradient: 'from-yellow-400 via-orange-500 to-pink-500',
    accent: 'bg-yellow-400/80'
  },
  STRESS: {
    icon: Users,
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    accent: 'bg-red-500/80'
  },
  BURNOUT: {
    icon: Flame,
    gradient: 'from-pink-500 via-purple-500 to-red-600',
    accent: 'bg-pink-500/80'
  }
}

export const DEFAULT_CATEGORY_META: CategoryMeta = {
  icon: Shield,
  gradient: 'from-slate-500 via-slate-600 to-slate-700',
  accent: 'bg-slate-500/80'
}
