'use client'

import Link from 'next/link'
import type { AgentCard as AgentCardType } from '@/types'

interface AgentCardProps {
  agent: AgentCardType
}

export default function AgentCard({ agent }: AgentCardProps) {
  // 格式化响应时间显示
  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  // 格式化价格显示
  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return '免费'
    return `${price} ${currency}`
  }

  // 状态颜色映射
  const statusColors = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    inactive: 'bg-slate-100 text-slate-600 border-slate-200',
    busy: 'bg-amber-100 text-amber-700 border-amber-200',
  }

  // 状态文字映射
  const statusText = {
    active: '在线',
    inactive: '离线',
    busy: '繁忙',
  }

  // 星级评分显示
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-200 fill-slate-200'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-200 transition-all duration-200">
      {/* 头部：头像、名称、状态 */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={agent.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${agent.id}`}
            alt={agent.name}
            className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 object-cover"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              agent.status === 'active'
                ? 'bg-emerald-500'
                : agent.status === 'busy'
                ? 'bg-amber-500'
                : 'bg-slate-400'
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-900 truncate">{agent.name}</h3>
            {agent.provider.verified && (
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[agent.status]}`}
          >
            {statusText[agent.status]}
          </span>
        </div>
      </div>

      {/* 描述 */}
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{agent.description}</p>

      {/* 技能标签 */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100"
          >
            {skill}
          </span>
        ))}
        {agent.skills.length > 5 && (
          <span className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded-md">
            +{agent.skills.length - 5}
          </span>
        )}
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-slate-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            {renderStars(agent.rating)}
          </div>
          <p className="text-xs text-slate-500">
            {agent.rating.toFixed(1)} ({agent.ratingCount})
          </p>
        </div>
        <div className="text-center border-x border-slate-100">
          <p className="text-sm font-semibold text-slate-900">
            {formatResponseTime(agent.avgResponseTime)}
          </p>
          <p className="text-xs text-slate-500">响应时间</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">
            {agent.totalTransactions}
          </p>
          <p className="text-xs text-slate-500">交易量</p>
        </div>
      </div>

      {/* 价格和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-slate-900">
            {formatPrice(agent.pricing.basePrice, agent.pricing.currency)}
          </p>
          <p className="text-xs text-slate-500 capitalize">
            {agent.pricing.model === 'perCall' && '每次调用'}
            {agent.pricing.model === 'perToken' && '每千Token'}
            {agent.pricing.model === 'subscription' && '订阅制'}
            {agent.pricing.model === 'free' && '免费使用'}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/agents/${agent.id}`}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            查看详情
          </Link>
        </div>
      </div>
    </div>
  )
}
