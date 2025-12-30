/**
 * Cache utilities for performance optimization
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T, ttlMinutes: number = 5): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

// Global cache instance
export const cache = new MemoryCache()

/**
 * Cache wrapper for database queries
 */
export function withCache<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttlMinutes: number = 5
): Promise<T> {
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return Promise.resolve(cached)
  }

  return queryFn().then(data => {
    cache.set(key, data, ttlMinutes)
    return data
  })
}

/**
 * Invalidate cache patterns
 */
export function invalidateCache(pattern: string): void {
  // Simple pattern matching - in production, use a more sophisticated approach
  const keys = Array.from(cache['cache'].keys())
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  })
}

/**
 * Cache keys constants
 */
export const CACHE_KEYS = {
  TESTS: 'tests',
  TEST_BY_SLUG: (slug: string) => `test:${slug}`,
  USER_RESULTS: (userId: string) => `user_results:${userId}`,
  QUESTIONS_BY_TEST: (testId: string) => `questions:${testId}`,
  PROFILE: (userId: string) => `profile:${userId}`
} as const
