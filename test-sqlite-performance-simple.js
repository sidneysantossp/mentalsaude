const Database = require('better-sqlite3')
const path = require('path')
const { performance } = require('perf_hooks')

const dbPath = path.join(process.cwd(), 'data', 'performance-test.db')
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS test_results (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    test_id TEXT NOT NULL,
    total_score INTEGER,
    category TEXT,
    interpretation TEXT,
    recommendations TEXT,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`)

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
  console.log('🚀 Testes de Performance SQLite para Produção')
  console.log('=' .repeat(60))
  
  const testScenarios = [
    { users: 1000, name: '1K usuários' },
    { users: 5000, name: '5K usuários' },
    { users: 10000, name: '10K usuários' },
    { users: 25000, name: '25K usuários' },
    { users: 50000, name: '50K usuários' }
  ]
  
  const results = []
  
  for (const scenario of testScenarios) {
    console.log(`\n📊 Testando: ${scenario.name}`)
    
    // Clean up
    db.exec('DELETE FROM test_results')
    db.exec('DELETE FROM users')
    db.exec('VACUUM')
    
    const startTime = performance.now()
    const startSize = getDatabaseSize()
    
    // Insert users
    console.log(`  👥 Inserindo ${scenario.users} usuários...`)
    const userInsertStart = performance.now()
    
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password, name, role)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    const batchSize = 1000
    for (let i = 0; i < scenario.users; i += batchSize) {
      const batch = Math.min(batchSize, scenario.users - i)
      
      const transaction = db.transaction(() => {
        for (let j = 0; j < batch; j++) {
          const userIndex = i + j
          const userId = `user_${Date.now()}_${userIndex}_${Math.random().toString(36).substr(2, 9)}`
          const email = `user${userIndex}@test.com`
          const password = '$2b$10$hashedpassword12345678901234567890123456789012345678901234567890'
          const name = `User ${userIndex}`
          
          insertUser.run(userId, email, password, name, 'user')
        }
      })
      
      transaction()
      
      if ((i + batch) % 5000 === 0 || (i + batch) === scenario.users) {
        console.log(`    Progresso: ${Math.min(i + batch, scenario.users)}/${scenario.users}`)
      }
    }
    
    const userInsertTime = performance.now() - userInsertStart
    
    // Insert test results (2 per user)
    console.log(`  📝 Inserindo ${scenario.users * 2} resultados...`)
    const resultsInsertStart = performance.now()
    
    const insertResult = db.prepare(`
      INSERT INTO test_results (id, user_id, test_id, total_score, category, interpretation, recommendations)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    
    // Get all user IDs first
    const allUsers = db.prepare('SELECT id FROM users').all()
    
    for (let i = 0; i < allUsers.length; i += batchSize) {
      const batch = Math.min(batchSize, allUsers.length - i)
      
      const transaction = db.transaction(() => {
        for (let j = 0; j < batch; j++) {
          const user = allUsers[i + j]
          
          // Insert 2 results per user
          for (let k = 0; k < 2; k++) {
            const resultId = `result_${Date.now()}_${i + j}_${k}_${Math.random().toString(36).substr(2, 9)}`
            const testId = String((k % 3) + 1)
            const score = Math.floor(Math.random() * 27)
            const category = ['Minimal', 'Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 4)]
            
            insertResult.run(resultId, user.id, testId, score, category, 'Test interpretation', 'Test recommendations')
          }
        }
      })
      
      transaction()
      
      if ((i + batch) % 5000 === 0 || (i + batch) === allUsers.length) {
        console.log(`    Progresso: ${Math.min(i + batch, allUsers.length)}/${allUsers.length}`)
      }
    }
    
    const resultsInsertTime = performance.now() - resultsInsertStart
    const totalTime = performance.now() - startTime
    const endSize = getDatabaseSize()
    
    // Test query performance
    console.log(`  🔍 Testando consultas...`)
    const queryStart = performance.now()
    
    // Test random user lookup
    const randomEmail = `user${Math.floor(Math.random() * scenario.users)}@test.com`
    const userLookup = db.prepare('SELECT * FROM users WHERE email = ?').get(randomEmail)
    
    // Test user results query
    if (allUsers.length > 0) {
      const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)]
      const userResults = db.prepare(`
        SELECT * FROM test_results WHERE user_id = ? ORDER BY completed_at DESC
      `).all(randomUser.id)
    }
    
    // Test aggregate query
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(DISTINCT id) as unique_users
      FROM users
    `).get()
    
    const resultStats = db.prepare(`
      SELECT 
        COUNT(*) as total_results,
        AVG(total_score) as avg_score,
        category
      FROM test_results 
      GROUP BY category
    `).all()
    
    const queryTime = performance.now() - queryStart
    
    const result = {
      scenario: scenario.name,
      users: scenario.users,
      totalResults: scenario.users * 2,
      userInsertTime,
      resultsInsertTime,
      totalTime,
      queryTime,
      startSize,
      endSize,
      sizeIncrease: endSize - startSize,
      usersPerSecond: Math.round(scenario.users / (userInsertTime / 1000)),
      resultsPerSecond: Math.round((scenario.users * 2) / (resultsInsertTime / 1000)),
      avgUserSize: (endSize / scenario.users).toFixed(2)
    }
    
    results.push(result)
    
    console.log(`  ✅ Concluído em ${formatTime(totalTime)}`)
    console.log(`     📁 Tamanho: ${formatBytes(endSize)} (+${formatBytes(result.sizeIncrease)})`)
    console.log(`     ⚡ Performance: ${result.usersPerSecond.toLocaleString()} usuários/s`)
    console.log(`     📊 Média/usuário: ${result.avgUserSize} bytes`)
    console.log(`     🔍 Consultas: ${formatTime(queryTime)}`)
    
    // Stop if database gets too large
    if (endSize > 100 * 1024 * 1024) { // 100MB
      console.log(`  ⚠️  Parando testes - banco de dados atingiu ${formatBytes(endSize)}`)
      break
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📋 RESUMO DE PERFORMANCE')
  console.log('='.repeat(60))
  
  console.table(results.map(r => ({
    'Cenário': r.scenario,
    'Usuários': r.users.toLocaleString(),
    'Resultados': r.totalResults.toLocaleString(),
    'Tamanho': formatBytes(r.endSize),
    'Tempo Total': formatTime(r.totalTime),
    'Usuários/s': r.usersPerSecond.toLocaleString(),
    'Bytes/Usuário': r.avgUserSize,
    'Consulta': formatTime(r.queryTime)
  })))
  
  // Analysis and recommendations
  console.log('\n🎯 ANÁLISE E RECOMENDAÇÕES')
  console.log('='.repeat(60))
  
  const lastResult = results[results.length - 1]
  const maxUsersPerSecond = Math.max(...results.map(r => r.usersPerSecond))
  const avgQueryTime = results.reduce((sum, r) => sum + r.queryTime, 0) / results.length
  
  console.log(`\n📈 MÉTRICAS OBTIDAS:`)
  console.log(`• Maior teste: ${lastResult.scenario} (${lastResult.users.toLocaleString()} usuários)`)
  console.log(`• Tamanho final: ${formatBytes(lastResult.endSize)}`)
  console.log(`• Performance pico: ${maxUsersPerSecond.toLocaleString()} usuários/s`)
  console.log(`• Tempo médio consulta: ${formatTime(avgQueryTime)}`)
  console.log(`• Espaço por usuário: ${lastResult.avgUserSize} bytes`)
  
  console.log(`\n💡 CAPACIDADE ESTIMADA:`)
  
  // Calculate based on 1GB database size limit
  const usersPerGB = Math.floor((1024 * 1024 * 1024) / parseFloat(lastResult.avgUserSize))
  console.log(`• Baseado em tamanho: ${usersPerGB.toLocaleString()} usuários (1GB)`)
  
  // Calculate based on query performance
  const acceptableQueryTime = 100 // 100ms
  const usersByQueryPerformance = lastResult.users * (acceptableQueryTime / lastResult.queryTime)
  console.log(`• Baseado em performance: ${Math.floor(usersByQueryPerformance).toLocaleString()} usuários (<100ms consultas)`)
  
  console.log(`\n🎯 RECOMENDAÇÕES:`)
  
  if (lastResult.users >= 50000 && lastResult.queryTime < 50 && lastResult.endSize < 50 * 1024 * 1024) {
    console.log(`✅ **EXCELLENTE para produção**`)
    console.log(`   👥 Suporta até ${Math.floor(usersByQueryPerformance).toLocaleString()} usuários simultâneos`)
    console.log(`   📁 Tamanho eficiente: ${lastResult.avgUserSize} bytes/usuário`)
    console.log(`   ⚡ Performance excelente: ${maxUsersPerSecond.toLocaleString()} inserções/s`)
    console.log(`   🔍 Consultas rápidas: ${formatTime(avgQueryTime)} médio`)
  } else if (lastResult.users >= 10000 && lastResult.queryTime < 200) {
    console.log(`⚠️  **BOM para pequeno/médio porte**`)
    console.log(`   👥 Ideal até ${Math.floor(usersByQueryPerformance / 2).toLocaleString()} usuários`)
    console.log(`   📁 Monitorar tamanho do banco`)
    console.log(`   ⚡ Performance aceitável`)
  } else {
    console.log(`❌ **LIMITADO para produção**`)
    console.log(`   👥 Recomendado até ${Math.floor(usersByQueryPerformance / 4).toLocaleString()} usuários`)
    console.log(`   🔄 Considerar PostgreSQL/MySQL para maior escala`)
  }
  
  console.log(`\n📊 LIMITES TÍPICOS SQLITE:`)
  console.log(`• **Desenvolvimento**: Ilimitado ✅`)
  console.log(`• **Pequeno porte** (< 1K usuários): Excelente ✅`)
  console.log(`• **Médio porte** (1K-10K usuários): Bom ✅`)
  console.log(`• **Grande porte** (10K-100K usuários): Aceitável ⚠️`)
  console.log(`• **Enterprise** (> 100K usuários): Não recomendado ❌`)
  
  console.log(`\n🔄 QUANDO MIGRAR:`)
  console.log(`• Mais de 50K usuários ativos`)
  console.log(`• Banco > 100MB`)
  console.log(`• Consultas > 200ms`)
  console.log(`• Múltiplos servidores (concorrência)`)
  console.log(`• Necessidade de replicação`)
  
  db.close()
}

function getDatabaseSize() {
  try {
    const fs = require('fs')
    const stats = fs.statSync(dbPath)
    return stats.size
  } catch {
    return 0
  }
}

// Run the test
runPerformanceTest().catch(console.error)