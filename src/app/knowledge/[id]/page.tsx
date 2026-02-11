'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { knowledgeDatabase } from '@/data/knowledge-content'
import Loading from '@/components/Loading'
import MarkdownRenderer from '@/components/MarkdownRenderer'

// 模拟已购买的知识ID列表
const mockPurchasedKnowledge = ['1', '3', '5']

export default function KnowledgeContentPage() {
  const params = useParams()
  const router = useRouter()
  const knowledgeId = params.id as string
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟加载延迟
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const item = knowledgeDatabase.find(k => k.id === knowledgeId)
  const isPurchased = mockPurchasedKnowledge.includes(knowledgeId)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loading message="加载知识内容..." />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">知识不存在</h2>
          <p className="text-slate-500 mb-6">该知识项目可能已被删除或下架</p>
          <Link href="/marketplace" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← 返回知识市场
          </Link>
        </div>
      </div>
    )
  }

  if (!isPurchased) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-indigo-600">首页</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-indigo-600">知识市场</Link>
          <span>/</span>
          <span className="text-slate-800">知识内容</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">🔒 内容已加密</h2>
          <p className="text-slate-600 mb-6">购买后即可查看完整内容</p>

          <div className="bg-slate-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
            <h3 className="font-medium text-slate-800 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{item.description}</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl font-bold text-emerald-600">{item.price} SOL</span>
              <span className="text-sm text-slate-400">已售 {item.sales} 份</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push(`/purchase/${item.id}`)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              立即购买
            </button>
            <Link
              href="/marketplace"
              className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              返回市场
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">首页</Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-indigo-600">仪表盘</Link>
        <span>/</span>
        <span className="text-slate-800">我的知识</span>
      </div>

      {/* Content Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h1>
            <p className="text-slate-600">{item.description}</p>
          </div>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
            已购买
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map(tag => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {item.owner[0]}
            </div>
            <span>{item.owner}</span>
          </div>
          <span>|</span>
          <span>信誉分: {item.reputation}</span>
          <span>|</span>
          <span>评分: {item.rating} ⭐</span>
          <span>|</span>
          <span>发布于: {item.createdAt}</span>
        </div>
      </div>

      {/* Knowledge Content */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium text-slate-700">知识内容</span>
          </div>
          <div className="flex gap-2">
            <button className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </button>
            <button className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              导出
            </button>
          </div>
        </div>

        <div className="p-8">
          <MarkdownRenderer content={item.content} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
        >
          ← 返回仪表盘
        </Link>
        <Link
          href="/marketplace"
          className="px-4 py-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          继续浏览 →
        </Link>
      </div>
    </div>
  )
}
