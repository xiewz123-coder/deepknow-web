import { NextResponse } from 'next/server'
import { getAuthorizationUrl } from '@/lib/secondme'

export async function GET() {
  const authUrl = getAuthorizationUrl('test-state')

  return NextResponse.json({
    clientId: process.env.SECONDME_CLIENT_ID?.substring(0, 8) + '...',
    redirectUri: process.env.SECONDME_REDIRECT_URI,
    nodeEnv: process.env.NODE_ENV,
    authUrl: authUrl,
  })
}
