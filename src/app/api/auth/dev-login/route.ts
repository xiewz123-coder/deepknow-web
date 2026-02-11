import { NextRequest, NextResponse } from 'next/server'

// Development mode mock login
export async function GET(request: NextRequest) {
  // Create a mock user session
  const mockUser = {
    userId: 'dev-user-001',
    accessToken: 'dev-mock-token',
  }

  // Create session cookie
  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set('session', JSON.stringify(mockUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return response
}
