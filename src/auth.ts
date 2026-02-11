import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'

/**
 * NextAuth 配置
 * 注意：项目主要使用自定义 SecondMe OAuth 流程 (/api/auth/login, /api/auth/callback)
 * 此配置主要用于 session 管理和 Prisma 适配器
 */
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id
      }
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId as string
        ;(session.user as any).accessToken = token.accessToken as string
      }
      return session
    },
  },
  providers: [
    // 开发环境凭证登录（仅在开发环境使用）
    Credentials({
      id: 'credentials',
      name: 'Development Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 仅在开发环境允许
        if (process.env.NODE_ENV === 'production') {
          return null
        }

        if (credentials?.email === 'dev@deepknow.local' && credentials?.password === 'dev123') {
          return {
            id: 'dev-user-001',
            name: '开发测试用户',
            email: 'dev@deepknow.local',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev-user',
          }
        }
        return null
      },
    }),
  ],
})
