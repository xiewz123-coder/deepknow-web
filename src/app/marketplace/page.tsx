'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data for knowledge items
const mockKnowledgeItems = [
  {
    id: '1',
    title: 'K8s 生产环境故障排查指南',
    description: '基于 50+ 次生产事故的故障排查经验，涵盖 CrashLoopBackOff、OOMKilled 等常见问题',
    tags: ['kubernetes', 'devops', 'troubleshooting'],
    price: 2.5,
    owner: 'Expert_A',
    reputation: 950,
    sales: 128,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Solana 智能合约安全审计清单',
    description: '常见的 Solana 合约漏洞及防范措施，包括重入攻击、整数溢出等',
    tags: ['solana', 'blockchain', 'security'],
    price: 5.0,
    owner: 'Security_Pro',
    reputation: 1200,
    sales: 86,
    rating: 4.9,
  },
  {
    id: '3',
    title: '向量数据库选型与性能优化',
    description: 'ChromaDB、Pinecone、Milvus 等向量数据库的对比与最佳实践',
    tags: ['ai', 'database', 'vector'],
    price: 3.0,
    owner: 'AI_Engineer',
    reputation: 800,
    sales: 215,
    rating: 4.6,
  },
  {
    id: '4',
    title: 'WebSocket 高并发架构设计',
    description: '百万级并发的 WebSocket 信令服务器架构设计经验',
    tags: ['websocket', 'backend', 'architecture'],
    price: 4.0,
    owner: 'System_Arch',
    reputation: 1500,
    sales: 342,
    rating: 4.9,
  },
  {
    id: '5',
    title: 'LLM Prompt Engineering 进阶',
    description: '高级提示工程技巧，提升 GPT-4/Claude 的输出质量',
    tags: ['ai', 'llm', 'prompt-engineering'],
    price: 1.5,
    owner: 'AI_Researcher',
    reputation: 1100,
    sales: 567,
    rating: 4.7,
  },
  {
    id: '6',
    title: '端到端加密通信协议实现',
    description: 'ECDH + AES-256-GCM 加密协议的工程实现指南',
    tags: ['security', 'encryption', 'cryptography'],
    price: 6.0,
    owner: 'Crypto_Expert',
    reputation: 2000,
    sales: 93,
    rating: 5.0,
  },
]

const tags = ['全部', 'kubernetes', 'devops', 'solana', 'blockchain', 'ai', 'security', 'backend']

export default function MarketplacePage() {
  const [selectedTag, setSelectedTag] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = mockKnowledgeItems.filter(item => {
    const matchesTag = selectedTag === '全部' || item.tags.includes(selectedTag)
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">知识交易市场</h1>
        <p className="mt-2 text-slate-600">
          浏览和购买有价值的隐性知识。所有知识均经过端到端加密保护，确保隐私安全。
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="搜索知识..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Knowledge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-slate-800 line-clamp-2 flex-1 mr-2">{item.title}</h3>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium shrink-0">
                {item.price} SOL
              </span>
            </div>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">{item.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-medium">
                  {item.owner[0]}
                </div>
                <span className="text-sm text-slate-600">{item.owner}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center text-amber-500">
                  ★ {item.rating}
                </span>
                <span className="text-slate-400">已售 {item.sales}</span>
              </div>
            </div>

            <Link href={`/purchase/${item.id}`}>
              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                购买知识
              </button>
            </Link>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-slate-500">没有找到匹配的知识项目</p>
        </div>
      )}
    </div>
  )
}
