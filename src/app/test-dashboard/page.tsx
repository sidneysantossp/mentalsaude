'use client'

import { useEffect, useState } from 'react'

export default function TestDashboard() {
  const [status, setStatus] = useState('Loading...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testAPIs()
  }, [])

  const testAPIs = async () => {
    try {
      // Test 1: Check if we can reach the results API
      setStatus('Testing /api/results...')
      const resultsResponse = await fetch('/api/results')
      const resultsData = await resultsResponse.json()
      console.log('Results API:', resultsData)
      
      // Test 2: Check if we can reach the health API
      setStatus('Testing /api/health...')
      const healthResponse = await fetch('/api/health')
      const healthData = await healthResponse.json()
      console.log('Health API:', healthData)
      
      // Test 3: Check auth
      setStatus('Testing auth...')
      const token = localStorage.getItem('auth_token')
      console.log('Token exists:', !!token)
      
      if (token) {
        const authResponse = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const authData = await authResponse.json()
        console.log('Auth API:', authData)
      }
      
      setStatus('All tests completed! Check console for details.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStatus('Error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Debug Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <p className="text-lg">{status}</p>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={testAPIs}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Re-run Tests
            </button>
            
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <div className="space-y-2">
            <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
            <p><strong>Local Storage:</strong></p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {typeof localStorage !== 'undefined' 
                ? JSON.stringify({
                    auth_token: localStorage.getItem('auth_token') ? 'exists' : 'none',
                    user: localStorage.getItem('user') ? 'exists' : 'none'
                  }, null, 2)
                : 'N/A'
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}