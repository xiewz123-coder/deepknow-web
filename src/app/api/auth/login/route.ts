import { NextRequest, NextResponse } from 'next/server'
import { getAuthorizationUrl } from '@/lib/secondme'
import { randomBytes } from 'crypto'

export async function GET(request: NextRequest) {
  // Generate state for CSRF protection
  const state = randomBytes(32).toString('hex')

  // Store state in cookie
  const response = NextResponse.redirect(getAuthorizationUrl(state))
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
  })

  return response
}
