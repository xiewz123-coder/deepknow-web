'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { KnowledgeItem, KnowledgeContentType } from '@/types'

// 内容类型配置
const contentTypes: {
  id: KnowledgeContentType | 'all'
  name: string
  icon: string
  color: string
  bgColor: string
}[] = [
  { id: 'all', name: '全部', icon: '📦', color: 'text-slate-700', bgColor: 'bg-slate-100' },
  { id: 'article', name: '文章', icon: '📄', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  { id: 'video', name: '视频', icon: '🎬', color: 'text-red-700', bgColor: 'bg-red-100' },
  { id: 'audio', name: '音频', icon: '🎧', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  { id: 'code', name: '代码', icon: '💻', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  { id: 'consultation', name: '咨询', icon: '💬', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  { id: 'document', name: '文档', icon: '📑', color: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  { id: 'interactive', name: '交互', icon: '🎯', color: 'text-pink-700', bgColor: 'bg-pink-100' },
  { id: 'dataset', name: '数据', icon: '📊', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
]

// 增强的Mock数据
const mockKnowledgeItems: KnowledgeItem[] = [
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
    createdAt: '2024-01-10',
    contentType: 'article',
    preview: {
      type: 'text',
      content: '第一章：Pod 启动失败排查\n1.1 查看 Pod 事件\nkubectl describe pod <pod-name>\n\n1.2 检查资源限制...',
      title: '目录预览',
    },
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
    createdAt: '2024-01-08',
    contentType: 'document',
    preview: {
      type: 'image',
      content: '/previews/solana-audit.png',
      title: '审计流程图',
      fileSize: '2.4 MB',
    },
  },
  {
    id: '3',
    title: 'WebSocket 高并发架构设计实战',
    description: '百万级并发的 WebSocket 信令服务器架构设计经验，含完整代码实现',
    tags: ['websocket', 'backend', 'architecture'],
    price: 4.0,
    owner: 'System_Arch',
    reputation: 1500,
    sales: 342,
    rating: 4.9,
    createdAt: '2024-01-05',
    contentType: 'code',
    preview: {
      type: 'code',
      content: `type Hub struct {
  clients    map[string]*Client
  broadcast  chan []byte
  register   chan *Client
  unregister chan *Client
}

func NewHub() *Hub {
  return &Hub{
    clients:    make(map[string]*Client),
    broadcast:  make(chan []byte),
    register:   make(chan *Client),
    unregister: make(chan *Client),
  }
}`,
      language: 'go',
      title: 'Hub 结构体',
    },
  },
  {
    id: '4',
    title: 'AI 模型微调入门到精通 - 视频课程',
    description: 'LoRA、QLoRA 等微调技术详解，配有实战演示和 Jupyter Notebook',
    tags: ['ai', 'llm', 'fine-tuning'],
    price: 15.0,
    owner: 'AI_Master',
    reputation: 2100,
    sales: 892,
    rating: 4.7,
    createdAt: '2024-01-12',
    contentType: 'video',
    preview: {
      type: 'video',
      content: '/previews/ai-finetune-preview.mp4',
      title: '课程预告片',
      duration: '02:30',
    },
  },
  {
    id: '5',
    title: '区块链技术架构深度解析 - 音频专栏',
    description: '每天通勤30分钟，听懂区块链底层原理。共 50 期，已完结',
    tags: ['blockchain', 'architecture', 'audio'],
    price: 3.0,
    owner: 'Chain_Expert',
    reputation: 1800,
    sales: 567,
    rating: 4.6,
    createdAt: '2024-01-03',
    contentType: 'audio',
    preview: {
      type: 'audio',
      content: '/previews/blockchain-audio-preview.mp3',
      title: '试听：第1期 - 区块链本质',
      duration: '28:45',
    },
  },
  {
    id: '6',
    title: '1对1 架构咨询（1小时）',
    description: '资深架构师一对一答疑，可讨论系统设计、技术选型、性能优化等话题',
    tags: ['consultation', 'architecture', 'career'],
    price: 50.0,
    owner: 'Arch_Mentor',
    reputation: 3200,
    sales: 156,
    rating: 5.0,
    createdAt: '2024-01-15',
    contentType: 'consultation',
    preview: {
      type: 'text',
      content: '咨询流程：\n1. 预约时间并填写问题清单\n2. 线上视频会议（支持录制）\n3. 会后提供文字总结和建议\n\n擅长领域：微服务、云原生、高并发、性能优化',
      title: '服务说明',
    },
  },
  {
    id: '7',
    title: 'React 性能优化交互式实验室',
    description: '在线体验各种优化技巧的实际效果，包含 Profiler、DevTools 等工具使用',
    tags: ['react', 'performance', 'frontend'],
    price: 8.0,
    owner: 'Frontend_Wizard',
    reputation: 1100,
    sales: 423,
    rating: 4.8,
    createdAt: '2024-01-14',
    contentType: 'interactive',
    interactiveUrl: '/labs/react-perf',
    preview: {
      type: 'iframe',
      content: '/labs/react-perf/preview',
      title: '在线预览',
    },
  },
  {
    id: '8',
    title: '全球加密货币交易数据集（2020-2024）',
    description: '包含 BTC、ETH 等主流币种的历史交易数据，适合量化分析和机器学习研究',
    tags: ['crypto', 'data', 'ml'],
    price: 20.0,
    owner: 'Data_Provider',
    reputation: 900,
    sales: 67,
    rating: 4.5,
    createdAt: '2024-01-11',
    contentType: 'dataset',
    preview: {
      type: 'text',
      content: '数据集说明：\n- 时间范围：2020-01-01 至 2024-01-01\n- 数据量：2.5 GB（压缩后）\n- 格式：CSV + Parquet\n- 包含字段：timestamp, open, high, low, close, volume',
      title: '数据说明',
      fileSize: '2.5 GB',
    },
  },
  {
    id: '9',
    title: 'Docker 最佳实践 - 完整教程',
    description: '从 Dockerfile 编写到多阶段构建，从单机部署到 Swarm 集群',
    tags: ['docker', 'devops', 'container'],
    price: 6.0,
    owner: 'DevOps_Guru',
    reputation: 1600,
    sales: 234,
    rating: 4.7,
    createdAt: '2024-01-09',
    contentType: 'article',
    preview: {
      type: 'text',
      content: '第一章：Dockerfile 优化\n- 使用多阶段构建减少镜像体积\n- 合理利用缓存层\n- 选择合适的基础镜像...',
      title: '目录预览',
    },
  },
  {
    id: '10',
    title: 'Python 异步编程实战 - 代码库',
    description: '包含 asyncio、aiohttp、asyncpg 等库的实战示例，含完整测试用例',
    tags: ['python', 'async', 'backend'],
    price: 4.5,
    owner: 'Pythonista',
    reputation: 1300,
    sales: 378,
    rating: 4.8,
    createdAt: '2024-01-07',
    contentType: 'code',
    preview: {
      type: 'code',
      content: `import asyncio
import aiohttp

async def fetch_data(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def main():
    urls = ['https://api.example.com/data'] * 10
    results = await asyncio.gather(
        *[fetch_data(url) for url in urls]
    )
    return results`,
      language: 'python',
      title: '并发请求示例',
    },
  },
  {
    id: '11',
    title: 'Kubernetes 网络故障排查 - 视频教程',
    description: '深入浅出讲解 K8s 网络原理，通过 10 个真实案例学习排查技巧',
    tags: ['kubernetes', 'networking', 'video'],
    price: 12.0,
    owner: 'K8s_Expert',
    reputation: 1900,
    sales: 445,
    rating: 4.9,
    createdAt: '2024-01-13',
    contentType: 'video',
    preview: {
      type: 'video',
      content: '/previews/k8s-network-preview.mp4',
      title: '第1集预览',
      duration: '15:20',
    },
  },
  {
    id: '12',
    title: '技术领导力成长指南 - 音频课程',
    description: '从技术专家到团队 Leader 的进阶之路，分享管理经验和软技能',
    tags: ['leadership', 'career', 'management'],
    price: 5.0,
    owner: 'Tech_Leader',
    reputation: 2500,
    sales: 334,
    rating: 4.8,
    createdAt: '2024-01-06',
    contentType: 'audio',
    preview: {
      type: 'audio',
      content: '/previews/leadership-preview.mp3',
      title: '试听：如何平衡技术与管理',
      duration: '32:15',
    },
  },
]

const tags = ['全部', 'kubernetes', 'devops', 'solana', 'blockchain', 'ai', 'security', 'backend', 'frontend', 'career']

// 知识类型图标映射
const getContentTypeIcon = (type: KnowledgeContentType) => {
  return contentTypes.find(t => t.id === type)?.icon || '📦'
}

const getContentTypeName = (type: KnowledgeContentType) => {
  return contentTypes.find(t => t.id === type)?.name || '其他'
}

const getContentTypeStyle = (type: KnowledgeContentType) => {
  const config = contentTypes.find(t => t.id === type)
  return {
    color: config?.color || 'text-slate-700',
    bgColor: config?.bgColor || 'bg-slate-100',
  }
}

// 预览组件
function KnowledgePreviewCard({ preview, contentType }: { preview?: KnowledgePreview; contentType: KnowledgeContentType }) {
  if (!preview) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
        <span className="text-3xl">{getContentTypeIcon(contentType)}</span>
        <p className="text-sm text-slate-500 mt-2">暂无预览</p>
      </div>
    )
  }

  switch (preview.type) {
    case 'text':
      return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="text-xs text-slate-500 mb-1">{preview.title}</p>
          <pre className="text-xs text-slate-700 line-clamp-4 font-mono whitespace-pre-wrap">{preview.content}</pre>
          {preview.fileSize && (
            <p className="text-xs text-slate-400 mt-2">📁 {preview.fileSize}</p>
          )}
        </div>
      )

    case 'code':
      return (
        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800">
            <span className="text-xs text-slate-400">{preview.title}</span>
            <span className="text-xs text-slate-500">{preview.language}</span>
          </div>
          <pre className="p-3 text-xs text-emerald-300 font-mono line-clamp-4 overflow-hidden">{preview.content}</pre>
        </div>
      )

    case 'video':
      return (
        <div className="relative bg-slate-900 rounded-lg overflow-hidden aspect-video">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="text-center">
              <span className="text-4xl">▶️</span>
              <p className="text-xs text-slate-400 mt-2">{preview.title}</p>
            </div>
          </div>
          {preview.duration && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
              {preview.duration}
            </span>
          )}
        </div>
      )

    case 'audio':
      return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎧</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{preview.title}</p>
              {preview.duration && (
                <p className="text-xs text-slate-500">⏱️ {preview.duration}</p>
              )}
            </div>
            <span className="text-xl">▶️</span>
          </div>
        </div>
      )

    case 'image':
      return (
        <div className="relative bg-slate-100 border border-slate-200 rounded-lg overflow-hidden aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl">🖼️</span>
              <p className="text-xs text-slate-500 mt-2">{preview.title}</p>
            </div>
          </div>
          {preview.fileSize && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 text-white text-xs rounded">
              {preview.fileSize}
            </span>
          )}
        </div>
      )

    case 'iframe':
      return (
        <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-200 rounded-lg p-4 text-center">
          <span className="text-3xl">🎯</span>
          <p className="text-sm font-medium text-indigo-700 mt-2">{preview.title}</p>
          <p className="text-xs text-indigo-500 mt-1">点击体验交互式预览</p>
        </div>
      )

    default:
      return null
  }
}

export default function MarketplacePage() {
  const [selectedTag, setSelectedTag] = useState('全部')
  const [selectedContentType, setSelectedContentType] = useState<KnowledgeContentType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price_asc' | 'price_desc' | 'rating'>('popular')

  const filteredItems = useMemo(() => {
    let items = mockKnowledgeItems.filter(item => {
      const matchesTag = selectedTag === '全部' || item.tags.includes(selectedTag)
      const matchesType = selectedContentType === 'all' || item.contentType === selectedContentType
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTag && matchesType && matchesSearch
    })

    // 排序
    switch (sortBy) {
      case 'popular':
        items.sort((a, b) => b.sales - a.sales)
        break
      case 'newest':
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'price_asc':
        items.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        items.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        items.sort((a, b) => b.rating - a.rating)
        break
    }

    return items
  }, [selectedTag, selectedContentType, searchQuery, sortBy])

  // 统计
  const stats = useMemo(() => {
    const total = mockKnowledgeItems.length
    const typeCount = contentTypes.slice(1).map(type => ({
      ...type,
      count: mockKnowledgeItems.filter(item => item.contentType === type.id).length,
    }))
    return { total, typeCount }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">知识交易市场</h1>
        <p className="mt-2 text-slate-600">
          浏览和购买有价值的隐性知识。支持文章、视频、音频、代码、咨询等多种内容形式。
        </p>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="搜索知识..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="popular">🔥 最热</option>
          <option value="newest">🆕 最新</option>
          <option value="price_asc">💰 价格从低到高</option>
          <option value="price_desc">💰 价格从高到低</option>
          <option value="rating">⭐ 评分最高</option>
        </select>
      </div>

      {/* Content Type Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-slate-700">内容形式：</span>
          <span className="text-xs text-slate-500">({filteredItems.length} 个结果)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {contentTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedContentType(type.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedContentType === type.id
                  ? `${type.bgColor} ${type.color} ring-2 ring-offset-1 ring-indigo-500`
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
              {type.id !== 'all' && (
                <span className="text-xs opacity-70">
                  ({stats.typeCount.find(t => t.id === type.id)?.count || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-slate-700">知识标签：</span>
        </div>
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Knowledge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => {
          const typeStyle = getContentTypeStyle(item.contentType)
          return (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-200 flex flex-col">
              {/* Preview Area */}
              <div className="p-3 bg-slate-50 border-b border-slate-100">
                <KnowledgePreviewCard preview={item.preview} contentType={item.contentType} />
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Title and Type */}
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 flex-1">{item.title}</h3>
                </div>

                {/* Content Type Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${typeStyle.bgColor} ${typeStyle.color}`}>
                    <span>{getContentTypeIcon(item.contentType)}</span>
                    {getContentTypeName(item.contentType)}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                    {item.price} SOL
                  </span>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2 flex-1">{item.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-slate-400">+{item.tags.length - 3}</span>
                  )}
                </div>

                {/* Owner and Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-medium">
                      {item.owner[0]}
                    </div>
                    <span className="text-slate-600">{item.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center text-amber-500">
                      ★ {item.rating}
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500">{item.sales} 已售</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-3 pt-0">
                <Link href={`/purchase/${item.id}`}>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <span>查看详情</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">未找到匹配的知识</h3>
          <p className="text-slate-500">请尝试调整筛选条件</p>
        </div>
      )}

      {/* Content Type Explanation */}
      <div className="mt-12 bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">📚 内容形式说明</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contentTypes.slice(1).map(type => (
            <div key={type.id} className="flex items-start gap-3">
              <span className="text-2xl">{type.icon}</span>
              <div>
                <h3 className="font-medium text-slate-900">{type.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {type.id === 'article' && '结构化文字内容'}
                  {type.id === 'video' && '视频教程或演示'}
                  {type.id === 'audio' && '音频课程或播客'}
                  {type.id === 'code' && '代码示例或库'}
                  {type.id === 'consultation' && '一对一咨询服务'}
                  {type.id === 'document' && 'PDF或文档资料'}
                  {type.id === 'interactive' && '在线交互体验'}
                  {type.id === 'dataset' && '数据集或数据库'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
