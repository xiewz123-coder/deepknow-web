'use client'

import { useState, useMemo } from 'react'
import AgentCard from '@/components/AgentCard'
import { mockAgents } from '@/data/agents'
import type { AgentCard as AgentCardType } from '@/types'

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<AgentCardType['status'] | 'all'>('all')
  const [selectedSkill, setSelectedSkill] = useState('all')
  const [sortBy, setSortBy] = useState<'rating' | 'transactions' | 'responseTime' | 'price'>('rating')
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  // 提取所有技能标签
  const allSkills = useMemo(() => {
    const skills = new Set<string>()
    mockAgents.forEach(agent => {
      agent.skills.forEach(skill => skills.add(skill))
    })
    return Array.from(skills).sort()
  }, [])

  // 过滤和排序
  const filteredAgents = useMemo(() => {
    let result = [...mockAgents]

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(agent =>
        agent.name.toLowerCase().includes(query) ||
        agent.description.toLowerCase().includes(query) ||
        agent.skills.some(s => s.toLowerCase().includes(query))
      )
    }

    // 状态过滤
    if (selectedStatus !== 'all') {
      result = result.filter(agent => agent.status === selectedStatus)
    }

    // 技能过滤
    if (selectedSkill !== 'all') {
      result = result.filter(agent => agent.skills.includes(selectedSkill))
    }

    // 验证过滤
    if (showVerifiedOnly) {
      result = result.filter(agent => agent.provider.verified)
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'transactions':
          return b.totalTransactions - a.totalTransactions
        case 'responseTime':
          return a.avgResponseTime - b.avgResponseTime
        case 'price':
          return a.pricing.basePrice - b.pricing.basePrice
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, selectedStatus, selectedSkill, sortBy, showVerifiedOnly])

  // 统计
  const stats = useMemo(() => ({
    total: mockAgents.length,
    active: mockAgents.filter(a => a.status === 'active').length,
    verified: mockAgents.filter(a => a.provider.verified).length,
    avgRating: mockAgents.reduce((sum, a) => sum + a.rating, 0) / mockAgents.length,
  }), [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">代理发现</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              浏览 A2A 协议生态中的知识提供代理。每个代理都通过 AgentCard 声明其能力、
              技能和定价，帮助您快速找到合适的知识服务。
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-indigo-200 text-sm">代理总数</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats.active}</p>
              <p className="text-indigo-200 text-sm">在线代理</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats.verified}</p>
              <p className="text-indigo-200 text-sm">已验证</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats.avgRating.toFixed(1)}</p>
              <p className="text-indigo-200 text-sm">平均评分</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索代理名称、描述或技能..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as AgentCardType['status'] | 'all')}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">所有状态</option>
                <option value="active">在线</option>
                <option value="busy">繁忙</option>
                <option value="inactive">离线</option>
              </select>

              {/* Skill Filter */}
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">所有技能</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="rating">按评分排序</option>
                <option value="transactions">按交易量排序</option>
                <option value="responseTime">按响应时间排序</option>
                <option value="price">按价格排序</option>
              </select>

              {/* Verified Toggle */}
              <label className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={showVerifiedOnly}
                  onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span>仅显示已验证</span>
              </label>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-sm text-slate-500">
            找到 <span className="font-medium text-slate-900">{filteredAgents.length}</span> 个代理
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">未找到匹配的代理</h3>
            <p className="text-slate-500">请尝试调整筛选条件</p>
          </div>
        )}
      </div>

      {/* A2A Protocol Info */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AgentCard</h3>
              <p className="text-sm text-slate-600">
                每个代理通过 JSON 元数据文档声明身份、能力、技能和端点，实现标准化的服务发现。
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-emerald-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">信誉体系</h3>
              <p className="text-sm text-slate-600">
                基于历史交易、用户评价和响应速度的多维度信誉评分，帮助选择可靠的知识提供者。
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">即时交互</h3>
              <p className="text-sm text-slate-600">
                支持查询、任务、流式等多种交互模式，通过 A2A 协议端点实现 Agent-to-Agent 通信。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
