import fs from 'fs'
import path from 'path'
import { createUser, authenticateUser, prisma } from '../src/lib/mysql'

interface EnvMap {
  [key: string]: string
}

const loadEnv = () => {
  const envPath = path.resolve(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) {
    return
  }

  const content = fs.readFileSync(envPath, 'utf-8')
  const entries = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))

  entries.forEach(entry => {
    const [key, ...rest] = entry.split('=')
    if (!key) {
      return
    }

    const value = rest.join('=').trim().replace(/^"(.*)"$/, '$1')
    process.env[key] = value
  })
}

const removeTestUser = async (email: string) => {
  try {
    await prisma.user.deleteMany({
      where: { email }
    })
  } catch (error) {
    console.warn('Falha ao limpar usuário de teste:', (error as Error).message)
  }
}

const run = async () => {
  loadEnv()
  const timestamp = Date.now()
  const testEmail = `teste+${timestamp}@example.com`
  const testPassword = 'Teste123!'
  const testName = 'Teste Automático'

  console.log('Iniciando teste de registro/login para', testEmail)

  await removeTestUser(testEmail)

  try {
    const user = await createUser(testEmail, testPassword, testName)
    console.log('✔ Registro concluído:', user.email, user.id)

    const auth = await authenticateUser(testEmail, testPassword)
    console.log('✔ Login concluído:', auth.user.email, `token=${auth.token.slice(0, 8)}…`)
    console.log('Teste de registro/login passou com sucesso')
  } catch (error) {
    console.error('❌ Erro durante o teste de autenticação:', (error as Error).message)
    process.exitCode = 1
  } finally {
    await removeTestUser(testEmail)
    await prisma.$disconnect()
  }
}

run()
