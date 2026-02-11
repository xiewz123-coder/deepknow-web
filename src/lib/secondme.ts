// SecondMe OAuth Configuration
// 从环境变量读取配置，确保生产环境安全

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name]?.trim() || defaultValue || ''
  if (!value && process.env.NODE_ENV === 'production') {
    console.warn(`Missing environment variable: ${name}`)
  }
  return value
}

export const SECONDME_CONFIG = {
  clientId: getEnvVar('SECONDME_CLIENT_ID'),
  clientSecret: getEnvVar('SECONDME_CLIENT_SECRET'),
  redirectUri: getEnvVar('SECONDME_REDIRECT_URI', 'http://localhost:3000/api/auth/callback'),
  authorizationEndpoint: 'https://go.second.me/oauth/',
  tokenEndpoint: 'https://app.mindos.com/gate/lab/api/oauth/token/code',
  apiBaseUrl: 'https://app.mindos.com/gate/lab',
  scopes: ['user.info', 'user.info.shades', 'chat'],
}

// Generate OAuth authorization URL
export function getAuthorizationUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: SECONDME_CONFIG.clientId,
    redirect_uri: SECONDME_CONFIG.redirectUri,
    response_type: 'code',
    scope: SECONDME_CONFIG.scopes.join(' '),
  })

  if (state) {
    params.append('state', state)
  }

  return `${SECONDME_CONFIG.authorizationEndpoint}?${params.toString()}`
}

// Exchange code for access token
export async function exchangeCodeForToken(code: string): Promise<{
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  tokenType: string
} | null> {
  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SECONDME_CONFIG.redirectUri,
      client_id: SECONDME_CONFIG.clientId,
      client_secret: SECONDME_CONFIG.clientSecret,
    })

    const response = await fetch(SECONDME_CONFIG.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      console.error('Token exchange failed:', await response.text())
      return null
    }

    // SecondMe API response format: { code: 0, data: {...} }
    const result = await response.json()
    console.log('Token exchange result:', result)

    if (result.code !== 0) {
      console.error('Token exchange error:', result.message || 'Unknown error')
      return null
    }

    // Extract data from the response
    const tokenData = result.data
    return {
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresIn: tokenData.expiresIn,
      tokenType: tokenData.tokenType,
    }
  } catch (error) {
    console.error('Token exchange error:', error)
    return null
  }
}

// Fetch user info from SecondMe API
export async function fetchUserInfo(accessToken: string): Promise<{
  id: string
  email?: string
  name?: string
  avatar?: string
  shades?: any
} | null> {
  try {
    const response = await fetch(`${SECONDME_CONFIG.apiBaseUrl}/api/secondme/user/info`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      console.error('Fetch user info failed:', await response.text())
      return null
    }

    // SecondMe API response format: { code: 0, data: {...} }
    const result = await response.json()
    console.log('User info result:', result)

    if (result.code !== 0) {
      console.error('Fetch user info error:', result.message)
      return null
    }

    return result.data
  } catch (error) {
    console.error('Fetch user info error:', error)
    return null
  }
}
