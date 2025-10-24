// Service Worker para PWA - Mental Saúde
const CACHE_NAME = 'mental-saude-v1'
const urlsToCache = [
  '/',
  '/tests',
  '/results',
  '/dashboard',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/js/',
  '/images/',
  '/icons/'
]

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto')
        return cache.addAll(urlsToCache)
      })
      .then(() => {
        console.log('Service Worker: Instalação completa')
        return self.skipWaiting()
      })
  )
})

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('Service Worker: Ativação completa')
      return self.clients.claim()
    })
  )
})

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna resposta do cache
        if (response) {
          return response
        }

        // Clone da requisição
        const fetchRequest = event.request.clone()

        return fetch(fetchRequest).then((response) => {
          // Verifica se resposta é válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // Clone da resposta
          const responseToCache = response.clone()

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })

          return response
        }).catch(() => {
          // Fallback para offline
          if (event.request.destination === 'document') {
            return caches.match('/offline.html')
          }
        })
      })
  )
})

// Background Sync para dados offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-test-results') {
    event.waitUntil(syncTestResults())
  }
  if (event.tag === 'background-sync-mood-data') {
    event.waitUntil(syncMoodData())
  }
})

// Push Notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação da Mental Saúde',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/xmark.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Mental Saúde', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    )
  }
})

// Funções de sincronização
async function syncTestResults() {
  // Sincronizar resultados de testes pendentes
  try {
    const pendingResults = await getPendingTestResults()
    for (const result of pendingResults) {
      await fetch('/api/test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      })
    }
  } catch (error) {
    console.error('Erro ao sincronizar resultados:', error)
  }
}

async function syncMoodData() {
  // Sincronizar dados de humor pendentes
  try {
    const pendingMoodData = await getPendingMoodData()
    for (const mood of pendingMoodData) {
      await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mood)
      })
    }
  } catch (error) {
    console.error('Erro ao sincronizar dados de humor:', error)
  }
}

// Funções auxiliares para dados offline
async function getPendingTestResults() {
  // Obter resultados pendentes do IndexedDB
  return []
}

async function getPendingMoodData() {
  // Obter dados de humor pendentes do IndexedDB
  return []
}