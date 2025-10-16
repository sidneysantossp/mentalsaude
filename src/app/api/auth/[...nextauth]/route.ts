import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions = {
  // adapter: PrismaAdapter(db),  // Disabled due to JWT session errors
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔍 [NEXTAUTH] Tentando login:', {
          email: credentials?.email,
          passwordLength: credentials?.password?.length,
          timestamp: new Date().toISOString()
        });
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ [NEXTAUTH] Credenciais incompletas');
          return null
        }

        try {
          console.log('🔍 [NEXTAUTH] Buscando usuário no banco...');
          const user = await db.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user || !user.password) {
            console.log('❌ [NEXTAUTH] Usuário não encontrado ou sem senha');
            return null
          }

          console.log('✅ [NEXTAUTH] Usuário encontrado, verificando senha...');
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          console.log('🔐 [NEXTAUTH] Senha válida:', isPasswordValid);

          if (!isPasswordValid) {
            console.log('❌ [NEXTAUTH] Senha inválida');
            return null
          }

          console.log('✅ [NEXTAUTH] Login bem-sucedido para:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('❌ [NEXTAUTH] Erro durante autenticação:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key-for-development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }