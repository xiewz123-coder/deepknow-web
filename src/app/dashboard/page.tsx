'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  reputation: number
  shades?: any
  createdAt: string
}

// Mock transaction data
const mockTransactions = [
  { id: 'tx1', type: 'purchase', amount: 2.5, item: 'K8s 生产环境故障排查指南', date: '2025-02-08', status: 'confirmed' },
  { id: 'tx2', type: 'sale', amount: 5.0, item: 'Solana 智能合约安全审计清单', date: '2025-02-07', status: 'confirmed' },
  { id: 'tx3', type: 'purchase', amount: 3.0, item: '向量数据库选型与性能优化', date: '2025-02-06', status: 'pending' },
]

// Mock knowledge items
const mockMyKnowledge = [
  { id: 'k1', title: 'WebSocket 高并发架构设计', price: 4.0, sales: 12, status: 'active' },
  { id: 'k2', title: 'LLM Prompt Engineering 进阶', price: 1.5, sales: 28, status: 'active' },
]

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const res = await fetch('/api/user/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        // Not logged in, redirect to home
        router.push('/')
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-500">加载中...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <p className="text-slate-500">请先登录</p>
        </div>
      </div>
    )
  }

  const totalSales = mockMyKnowledge.reduce((sum, item) => sum + item.sales * item.price, 0)
  const totalPurchases = mockTransactions
    .filter(tx => tx.type === 'purchase' && tx.status === 'confirmed')
    .reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">个人中心</h1>
        <p className="mt-2 text-slate-600">管理你的知识资产、交易记录和账户信息</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl text-indigo-600 font-medium">
              {user.name?.[0] || 'U'}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500">{user.email}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-slate-600">信誉评分: <strong className="text-indigo-600">{user.reputation}</strong></span>
              <span className="text-slate-600">注册时间: {new Date(user.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-indigo-600">{mockMyKnowledge.length}</div>
          <div className="text-sm text-slate-500">我的知识</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-emerald-600">{totalSales.toFixed(2)} SOL</div>
          <div className="text-sm text-slate-500">总销售额</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-amber-600">{totalPurchases.toFixed(2)} SOL</div>
          <div className="text-sm text-slate-500">总支出</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-600">{mockTransactions.length}</div>
          <div className="text-sm text-slate-500">交易次数</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6">
          {[
            { id: 'overview', label: '概览' },
            { id: 'knowledge', label: '我的知识' },
            { id: 'transactions', label: '交易记录' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">欢迎使用 DeepKnow!</h3>
            <p className="text-indigo-700">
              你已成功通过 SecondMe 登录。现在可以开始浏览知识市场，或者发布你自己的知识资产。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-800 mb-4">最近交易</h4>
              {mockTransactions.slice(0, 3).map(tx => (
                <div key={tx.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{tx.type === 'purchase' ? '购买' : '出售'}: {tx.item}</p>
                    <p className="text-xs text-slate-500">{tx.date}</p>
                  </div>
                  <span className={`text-sm font-medium ${tx.type === 'purchase' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {tx.type === 'purchase' ? '-' : '+'}{tx.amount} SOL
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-800 mb-4">我的知识资产</h4>
              {mockMyKnowledge.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">已售 {item.sales} 次</p>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">{item.price} SOL</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="space-y-8">
          {/* 已购买的知识 */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">已购买的知识</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/knowledge/1" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">K8s 生产环境故障排查指南</h4>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">已购买</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">基于 50+ 次生产事故的故障排查经验...</p>
                  <div className="flex items-center text-sm text-indigo-600">
                    <span>点击阅读 →</span>
                  </div>
                </div>
              </Link>

              <Link href="/knowledge/3" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">向量数据库选型与性能优化</h4>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">已购买</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">ChromaDB、Pinecone、Milvus 等向量数据库的对比...</p>
                  <div className="flex items-center text-sm text-indigo-600">
                    <span>点击阅读 →</span>
                  </div>
                </div>
              </Link>

              <Link href="/knowledge/5" className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">LLM Prompt Engineering 进阶</h4>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">已购买</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">高级提示工程技巧，提升 GPT-4/Claude 的输出质量...</p>
                  <div className="flex items-center text-sm text-indigo-600">
                    <span>点击阅读 →</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* 我发布的知识 */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">我发布的知识</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMyKnowledge.map(item => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6">
                  <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                  <div className="flex justify-between text-sm text-slate-500 mb-4">
                    <span>价格: {item.price} SOL</span>
                    <span>已售: {item.sales}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                    {item.status === 'active' ? '上架中' : '已下架'}
                  </span>
                </div>
              ))}
              <Link href="/publish">
                <button className="w-full h-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors">
                  <span className="text-3xl mb-2">+</span>
                  <span className="font-medium">发布新知识</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">项目</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">金额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockTransactions.map(tx => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      tx.type === 'purchase' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {tx.type === 'purchase' ? '购买' : '出售'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800">{tx.item}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 text-sm font-medium">{tx.amount} SOL</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      tx.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {tx.status === 'confirmed' ? '已完成' : '处理中'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
