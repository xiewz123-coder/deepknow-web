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

// ============================================
// A2A 协议 - AgentCard 类型定义
// ============================================

/**
 * AgentCard - A2A协议核心概念
 * 每个代理通过JSON元数据文档声明其身份、能力、技能、端点和认证要求
 */
export interface AgentCard {
  /** 代理唯一标识符 */
  id: string
  /** 代理显示名称 */
  name: string
  /** 代理描述 */
  description: string
  /** 代理头像/Logo URL */
  avatar?: string
  /** 版本号 */
  version: string
  /** 创建时间 */
  createdAt: string
  /** 最后更新时间 */
  updatedAt: string
  /** 核心能力列表 */
  capabilities: AgentCapability[]
  /** 技能标签 */
  skills: string[]
  /** 端点信息 */
  endpoints: AgentEndpoint
  /** 认证要求 */
  authentication: AgentAuthentication
  /** 用户评分 (1-5) */
  rating: number
  /** 评分数量 */
  ratingCount: number
  /** 平均响应时间 (毫秒) */
  avgResponseTime: number
  /** 历史交易数量 */
  totalTransactions: number
  /** 信誉分 */
  reputation: number
  /** 当前状态 */
  status: 'active' | 'inactive' | 'busy'
  /** 定价信息 */
  pricing: AgentPricing
  /** 提供者信息 */
  provider: AgentProvider
}

/** 代理能力 */
export interface AgentCapability {
  /** 能力名称 */
  name: string
  /** 能力描述 */
  description: string
  /** 能力类型 */
  type: 'query' | 'task' | 'stream' | 'push'
  /** 输入参数 */
  parameters?: Record<string, unknown>
  /** 是否可用 */
  enabled: boolean
}

/** 代理端点 */
export interface AgentEndpoint {
  /** A2A协议端点URL */
  a2aUrl: string
  /** 人类可读的Web界面 */
  humanUrl?: string
  /** WebSocket实时通信端点 */
  websocketUrl?: string
  /** API文档URL */
  docsUrl?: string
}

/** 代理认证配置 */
export interface AgentAuthentication {
  /** 认证方案 */
  schemes: ('none' | 'apiKey' | 'oauth2' | 'jwt')[]
  /** 是否需要认证 */
  required: boolean
  /** 认证说明 */
  description?: string
}

/** 代理定价 */
export interface AgentPricing {
  /** 定价模型 */
  model: 'free' | 'perCall' | 'perToken' | 'subscription'
  /** 基础价格 (SOL或代币) */
  basePrice: number
  /** 货币单位 */
  currency: string
  /** 详细说明 */
  description?: string
}

/** 代理提供者信息 */
export interface AgentProvider {
  /** 提供者名称 */
  name: string
  /** 提供者描述 */
  description?: string
  /** 联系邮箱 */
  email?: string
  /** 网站URL */
  website?: string
  /** 验证状态 */
  verified: boolean
}
