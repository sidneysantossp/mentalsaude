import Database from 'better-sqlite3'
import path from 'path'
import { performance } from 'perf_hooks'

const dbPath = path.join(process.cwd(), 'data', 'local.db')
const db = new Database(dbPath)

// Test configuration
const TEST_CONFIG = {
  // Test scenarios
  scenarios: [
    { users: 1000, name: '1K usuários' },
    { users: 5000, name: '5K usuários' },
    { users: 10000, name: '10K usuários' },
    { users: 50000, name: '50K usuários' },
    { users: 100000, name: '100K usuários' },
    { users: 500000, name: '500K usuários' },
    { users: 1000000, name: '1M usuários' }
  ],
  // Test results per user
  resultsPerUser: 5,
  // Batch size for inserts
  batchSize: 1000
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatTime(ms) {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`
  return `${(ms / 60000).toFixed(2)}min`
}

async function runPerformanceTest() {
  console.log('🚀 Iniciando Testes de Performance SQLite')
  console.log('=' .repeat(60))
  
  const results = []
  
  for (const scenario of TEST_CONFIG.scenarios) {
    console.log(`\n📊 Testando: ${scenario.name}`)
    
    // Clean up previous test data
    db.exec('DELETE FROM test_results')
    db.exec('DELETE FROM answers')
    db.exec('DELETE FROM users')
    
    const startTime = performance.now()
    const startSize = getDatabaseSize()
    
    // Insert users
    console.log(`  👥 Inserindo ${scenario.users} usuários...`)
    const userInsertStart = performance.now()
    
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password, name, role)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    for (let i = 0; i < scenario.users; i += TEST_CONFIG.batchSize) {
      const batch = Math.min(TEST_CONFIG.batchSize, scenario.users - i)
      
      const transaction = db.transaction(() => {
        for (let j = 0; j < batch; j++) {
          const userId = `user_${Date.now()}_${i + j}_${Math.random().toString(36).substr(2, 9)}`
          const email = `user${i + j}@test.com`
          const password = '$2b$10$hashedpassword'
          const name = `User ${i + j}`
          
          insertUser.run(userId, email, password, name, 'user')
        }
      })
      
      transaction()
      
      if ((i + batch) % 10000 === 0) {
        console.log(`    Progresso: ${Math.min(i + batch, scenario.users)}/${scenario.users}`)
      }
    }
    
    const userInsertTime = performance.now() - userInsertStart
    
    // Insert test results
    console.log(`  📝 Inserindo ${scenario.users * TEST_CONFIG.resultsPerUser} resultados...`)
    const resultsInsertStart = performance.now()
    
    const insertResult = db.prepare(`
      INSERT INTO test_results (id, user_id, test_id, total_score, category, interpretation, recommendations)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    
    const insertAnswer = db.prepare(`
      INSERT INTO answers (id, question_id, test_result_id, value, score)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    for (let i = 0; i < scenario.users; i += TEST_CONFIG.batchSize) {
      const batch = Math.min(TEST_CONFIG.batchSize, scenario.users - i)
      
      const transaction = db.transaction(() => {
        for (let j = 0; j < batch; j++) {
          const userId = `user_${Date.now()}_${i + j}_${Math.random().toString(36).substr(2, 9)}`
          
          // Insert test results for this user
          for (let k = 0; k < TEST_CONFIG.resultsPerUser; k++) {
            const resultId = `result_${Date.now()}_${i + j}_${k}_${Math.random().toString(36).substr(2, 9)}`
            const testId = String((k % 3) + 1) // Rotate between 3 tests
            const score = Math.floor(Math.random() * 27)
            const category = ['Minimal', 'Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 4)]
            
            insertResult.run(resultId, userId, testId, score, category, 'Test interpretation', 'Test recommendations')
            
            // Insert answers for this result
            for (let l = 0; l < 9; l++) {
              const answerId = `answer_${Date.now()}_${i + j}_${k}_${l}_${Math.random().toString(36).substr(2, 9)}`
              const questionId = `q${l + 1}`
              const value = String(Math.floor(Math.random() * 4))
              const answerScore = Math.floor(Math.random() * 4)
              
              insertAnswer.run(answerId, questionId, resultId, value, answerScore)
            }
          }
        }
      })
      
      transaction()
      
      if ((i + batch) % 5000 === 0) {
        console.log(`    Progresso: ${Math.min(i + batch, scenario.users)}/${scenario.users}`)
      }
    }
    
    const resultsInsertTime = performance.now() - resultsInsertStart
    const totalTime = performance.now() - startTime
    const endSize = getDatabaseSize()
    
    // Test query performance
    console.log(`  🔍 Testando performance de consultas...`)
    const queryStart = performance.now()
    
    // Test user lookup
    const userLookup = db.prepare('SELECT * FROM users WHERE email = ?').get('user500@test.com')
    
    // Test user results
    const userResults = db.prepare(`
      SELECT tr.*, t.title 
      FROM test_results tr 
      JOIN tests t ON tr.test_id = t.id 
      WHERE tr.user_id = ?
    `).all('user_500_test')
    
    // Test aggregate queries
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_users,
        AVG(total_score) as avg_score,
        category,
        COUNT(*) as count
      FROM test_results tr 
      JOIN users u ON tr.user_id = u.id 
      GROUP BY category
    `).all()
    
    const queryTime = performance.now() - queryStart
    
    const result = {
      scenario: scenario.name,
      users: scenario.users,
      totalResults: scenario.users * TEST_CONFIG.resultsPerUser,
      totalAnswers: scenario.users * TEST_CONFIG.resultsPerUser * 9,
      userInsertTime,
      resultsInsertTime,
      totalTime,
      queryTime,
      startSize,
      endSize,
      sizeIncrease: endSize - startSize,
      usersPerSecond: Math.round(scenario.users / (userInsertTime / 1000)),
      resultsPerSecond: Math.round((scenario.users * TEST_CONFIG.resultsPerUser) / (resultsInsertTime / 1000))
    }
    
    results.push(result)
    
    console.log(`  ✅ Concluído em ${formatTime(totalTime)}`)
    console.log(`     📁 Tamanho: ${formatBytes(endSize)} (+${formatBytes(result.sizeIncrease)})`)
    console.log(`     ⚡ Performance: ${result.usersPerSecond} usuários/s, ${result.resultsPerSecond} resultados/s`)
    console.log(`     🔍 Consultas: ${formatTime(queryTime)}`)
    
    // Check if we should stop (database getting too large)
    if (endSize > 500 * 1024 * 1024) { // 500MB
      console.log(`  ⚠️  Parando testes - banco de dados muito grande`)
      break
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📋 RESUMO DOS TESTES')
  console.log('='.repeat(60))
  
  console.table(results.map(r => ({
    'Cenário': r.scenario,
    'Usuários': r.users.toLocaleString(),
    'Resultados': r.totalResults.toLocaleString(),
    'Tamanho': formatBytes(r.endSize),
    'Tempo Total': formatTime(r.totalTime),
    'Usuários/s': r.usersPerSecond.toLocaleString(),
    'Consultas': formatTime(r.queryTime)
  })))
  
  // Recommendations
  console.log('\n🎯 RECOMENDAÇÕES')
  console.log('='.repeat(60))
  
  const lastResult = results[results.length - 1]
  
  if (lastResult.endSize < 50 * 1024 * 1024) { // < 50MB
    console.log('✅ Excelente para pequeno/médio porte')
    console.log('   👥 Até 10K usuários sem problemas')
    console.log('   📁 Tamanho gerenciável')
  } else if (lastResult.endSize < 200 * 1024 * 1024) { // < 200MB
    console.log('⚠️  Adequado para médio porte com otimizações')
    console.log('   👥 Até 50K usuários com monitoramento')
    console.log('   📁 Considerar compressão')
  } else {
    console.log('❌ Recomendado migrar para grande porte')
    console.log('   👥 Considerar PostgreSQL/MySQL')
    console.log('   📁 Banco muito grande para SQLite')
  }
  
  console.log('\n📈 MÉTRICAS CHAVE')
  console.log('='.repeat(60))
  console.log(`• Maior teste: ${lastResult.scenario}`)
  console.log(`• Tamanho final: ${formatBytes(lastResult.endSize)}`)
  console.log(`• Performance pico: ${Math.max(...results.map(r => r.usersPerSecond)).toLocaleString()} usuários/s`)
  console.log(`• Tempo consulta: ${formatTime(lastResult.queryTime)}`)
  
  db.close()
}

function getDatabaseSize() {
  try {
    const stats = require('fs').statSync(dbPath)
    return stats.size
  } catch {
    return 0
  }
}

// Run the test
runPerformanceTest().catch(console.error)