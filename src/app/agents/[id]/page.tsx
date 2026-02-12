'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getAgentById } from '@/data/agents'

export default function AgentDetailPage() {
  const params = useParams()
  const agentId = params.id as string
  const agent = getAgentById(agentId)

  if (!agent) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">代理未找到</h1>
          <p className="text-slate-600 mb-4">该代理不存在或已被移除</p>
          <Link href="/agents" className="text-indigo-600 hover:text-indigo-700 font-medium">
            返回代理发现
          </Link>
        </div>
      </div>
    )
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
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
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
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/agents" className="text-slate-500 hover:text-slate-700">
              代理发现
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{agent.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <img
                src={agent.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${agent.id}`}
                alt={agent.name}
                className="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/20 object-cover"
              />
              <span
                className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${
                  agent.status === 'active'
                    ? 'bg-emerald-500'
                    : agent.status === 'busy'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold">{agent.name}</h1>
                {agent.provider.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    已验证
                  </span>
                )}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[agent.status]}`}
                >
                  {statusText[agent.status]}
                </span>
              </div>
              <p className="text-indigo-100 text-lg max-w-2xl">{agent.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                立即调用
              </button>
              <p className="text-center text-indigo-200 text-sm">
                {agent.pricing.basePrice === 0
                  ? '免费使用'
                  : `${agent.pricing.basePrice} ${agent.pricing.currency} / ${
                      agent.pricing.model === 'perCall'
                        ? '次'
                        : agent.pricing.model === 'perToken'
                        ? '千Token'
                        : '订阅'
                    }`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">核心技能</h2>
              <div className="flex flex-wrap gap-2">
                {agent.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">能力列表</h2>
              <div className="space-y-4">
                {agent.capabilities.map((cap) => (
                  <div
                    key={cap.name}
                    className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 text-lg">
                        {cap.type === 'query' && '🔍'}
                        {cap.type === 'task' && '⚙️'}
                        {cap.type === 'stream' && '📡'}
                        {cap.type === 'push' && '📤'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-900">{cap.name}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            cap.enabled
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {cap.enabled ? '可用' : '维护中'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{cap.description}</p>
                      <p className="text-xs text-slate-400 mt-1 capitalize">
                        类型: {cap.type === 'query' ? '查询' : cap.type === 'task' ? '任务' : cap.type === 'stream' ? '流式' : '推送'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Endpoints */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">A2A 端点</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <span className="w-20 text-sm font-medium text-slate-500">A2A URL</span>
                  <code className="flex-1 text-sm text-slate-700 bg-slate-100 px-3 py-1.5 rounded">
                    {agent.endpoints.a2aUrl}
                  </code>
                </div>
                {agent.endpoints.humanUrl && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="w-20 text-sm font-medium text-slate-500">Web界面</span>
                    <a
                      href={agent.endpoints.humanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      {agent.endpoints.humanUrl} ↗
                    </a>
                  </div>
                )}
                {agent.endpoints.websocketUrl && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="w-20 text-sm font-medium text-slate-500">WebSocket</span>
                    <code className="flex-1 text-sm text-slate-700 bg-slate-100 px-3 py-1.5 rounded">
                      {agent.endpoints.websocketUrl}
                    </code>
                  </div>
                )}
                {agent.endpoints.docsUrl && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="w-20 text-sm font-medium text-slate-500">文档</span>
                    <a
                      href={agent.endpoints.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      {agent.endpoints.docsUrl} ↗
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Authentication */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">认证信息</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">认证方案:</span>
                  <div className="flex gap-2">
                    {agent.authentication.schemes.map((scheme) => (
                      <span
                        key={scheme}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded"
                      >
                        {scheme === 'none' ? '无需认证' : scheme.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
                {agent.authentication.description && (
                  <p className="text-sm text-slate-600">
                    {agent.authentication.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Provider */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">统计数据</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">用户评分</span>
                  <div className="flex items-center gap-2">
                    {renderStars(agent.rating)}
                    <span className="font-medium text-slate-900">{agent.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">评价数量</span>
                  <span className="font-medium text-slate-900">{agent.ratingCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">平均响应</span>
                  <span className="font-medium text-slate-900">
                    {agent.avgResponseTime < 1000
                      ? `${agent.avgResponseTime}ms`
                      : `${(agent.avgResponseTime / 1000).toFixed(1)}s`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">总交易量</span>
                  <span className="font-medium text-slate-900">{agent.totalTransactions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">信誉分</span>
                  <span className="font-medium text-slate-900">{agent.reputation}/100</span>
                </div>
              </div>
            </div>

            {/* Provider */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">提供者信息</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-slate-500">名称</span>
                  <p className="font-medium text-slate-900">{agent.provider.name}</p>
                </div>
                {agent.provider.description && (
                  <div>
                    <span className="text-sm text-slate-500">描述</span>
                    <p className="text-slate-700">{agent.provider.description}</p>
                  </div>
                )}
                {agent.provider.email && (
                  <div>
                    <span className="text-sm text-slate-500">联系邮箱</span>
                    <p className="text-indigo-600">{agent.provider.email}</p>
                  </div>
                )}
                {agent.provider.website && (
                  <div>
                    <span className="text-sm text-slate-500">网站</span>
                    <a
                      href={agent.provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 block"
                    >
                      {agent.provider.website} ↗
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-sm text-slate-500">验证状态</span>
                  <div className="flex items-center gap-2 mt-1">
                    {agent.provider.verified ? (
                      <>
                        <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-emerald-600 font-medium">已验证</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-500">未验证</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Version */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">版本信息</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">当前版本</span>
                  <span className="font-medium text-slate-900">v{agent.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">创建时间</span>
                  <span className="text-slate-700">
                    {new Date(agent.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">最后更新</span>
                  <span className="text-slate-700">
                    {new Date(agent.updatedAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
