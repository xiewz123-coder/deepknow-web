import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, fetchUserInfo } from '@/lib/secondme'

// In-memory user store for development
const userStore = new Map()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const storedState = request.cookies.get('oauth_state')?.value

  // Verify state for CSRF protection
  if (!state || state !== storedState) {
    return NextResponse.redirect(new URL('/?error=invalid_state', request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url))
  }

  // Exchange code for access token
  const tokenData = await exchangeCodeForToken(code)
  if (!tokenData) {
    return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url))
  }

  // Fetch user info from SecondMe
  const rawUserInfo = await fetchUserInfo(tokenData.accessToken)
  if (!rawUserInfo) {
    return NextResponse.redirect(new URL('/?error=fetch_user_failed', request.url))
  }

  // SecondMe returns userId instead of id, normalize the field
  const userInfo = {
    ...rawUserInfo,
    id: (rawUserInfo as any).userId || rawUserInfo.id,
  }

  // Calculate token expiration
  const tokenExpires = tokenData.expiresIn
    ? new Date(Date.now() + tokenData.expiresIn * 1000)
    : null

  // Try database first, fallback to memory store
  let userId = ''
  try {
    const { default: prisma } = await import('@/lib/prisma')
    const user = await prisma.user.upsert({
      where: { secondmeId: userInfo.id },
      update: {
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.avatar,
        shades: userInfo.shades ? JSON.stringify(userInfo.shades) : null,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken || null,
        tokenExpires,
      },
      create: {
        secondmeId: userInfo.id,
        email: userInfo.email || null,
        name: userInfo.name || null,
        avatar: userInfo.avatar || null,
        shades: userInfo.shades ? JSON.stringify(userInfo.shades) : null,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken || null,
        tokenExpires,
        reputation: 0,
      },
    })
    userId = user.id
  } catch (dbError) {
    // Fallback to memory store
    userId = `secondme-${userInfo.id}`
    userStore.set(userId, {
      id: userId,
      secondmeId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      avatar: userInfo.avatar,
      shades: userInfo.shades,
      reputation: 100,
      createdAt: new Date().toISOString(),
      accessToken: tokenData.accessToken,
    })
    console.log('Using memory store for user:', userId)
  }

  // Create session cookie
  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set('session', JSON.stringify({
    userId: userId,
    accessToken: tokenData.accessToken,
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  // Clear oauth_state cookie
  response.cookies.delete('oauth_state')

  return response
}
