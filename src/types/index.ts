// 用户类型
export interface User {
  id: string
  secondmeId?: string
  name: string
  email?: string
  avatar?: string
  reputation: number
  shades?: UserShades
  createdAt: string
}

export interface UserShades {
  interests: string[]
  expertise: string[]
}

// 知识项目类型
export interface KnowledgeItem {
  id: string
  title: string
  description: string
  content?: string
  tags: string[]
  price: number
  owner: string
  reputation: number
  sales: number
  rating: number
  createdAt: string
  status?: 'active' | 'inactive'
}

// 交易类型
export interface Transaction {
  id: string
  type: 'purchase' | 'sale'
  amount: number
  item: string
  date: string
  status: 'confirmed' | 'pending' | 'failed'
  txHash?: string
}

// SecondMe OAuth 类型
export interface SecondMeTokenData {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  tokenType: string
}

export interface SecondMeUserInfo {
  id: string
  userId?: string
  email?: string
  name?: string
  avatar?: string
  shades?: UserShades
  selfIntroduction?: string
  profileCompleteness?: number
  route?: string
}

// API 响应类型
export interface ApiResponse<T = unknown> {
  code: number
  data?: T
  message?: string
  error?: string
}

// 发布知识表单类型
export interface PublishFormData {
  title: string
  description: string
  fullContent: string
  price: string
  tags: string[]
}

// 消息类型
export type MessageType = 'success' | 'error' | 'info' | 'warning'

export interface Message {
  id: string
  type: MessageType
  content: string
}
