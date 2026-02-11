import { NextRequest, NextResponse } from 'next/server'

// Mock user for development
const mockUser = {
  id: 'dev-user-001',
  secondmeId: 'secondme-dev-001',
  email: 'dev@deepknow.local',
  name: '开发测试用户',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev-user',
  shades: {
    interests: ['AI', 'Blockchain', 'DevOps'],
    expertise: ['Kubernetes', 'Solana', 'React'],
  },
  reputation: 1000,
  createdAt: new Date().toISOString(),
}

// In-memory user store (shared with callback route)
const userStore = new Map()

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const session = JSON.parse(sessionCookie)

    // Return mock user for development login
    if (session.userId === 'dev-user-001') {
      return NextResponse.json(mockUser)
    }

    // Check memory store for SecondMe users
    if (session.userId && session.userId.startsWith('secondme-')) {
      const user = userStore.get(session.userId)
      if (user) {
        return NextResponse.json(user)
      }
    }

    // Try to fetch from database for real users
    try {
      const { default: prisma } = await import('@/lib/prisma')
      const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
          id: true,
          secondmeId: true,
          email: true,
          name: true,
          avatar: true,
          shades: true,
          reputation: true,
          createdAt: true,
        },
      })

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      return NextResponse.json({
        ...user,
        shades: user.shades ? JSON.parse(user.shades) : null,
      })
    } catch (dbError) {
      // Database not available
      // For SecondMe users in memory, create a temporary response
      if (session.userId && session.userId.startsWith('secondme-')) {
        return NextResponse.json({
          id: session.userId,
          secondmeId: session.userId.replace('secondme-', ''),
          email: 'user@second.me',
          name: 'SecondMe User',
          avatar: null,
          shades: { interests: [], expertise: [] },
          reputation: 100,
          createdAt: new Date().toISOString(),
        })
      }
      return NextResponse.json(mockUser)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }
}
