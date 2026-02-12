'use client'

import { useState } from 'react'

interface NodeInfo {
  title: string
  core: string
  components: string
  role: string
}

const techStackData: Record<string, NodeInfo> = {
  seeker: {
    title: 'User A: Seeker Node (Client)',
    core: 'Python 3.10+, Electron/React',
    components: 'LangChain (Flow), ChromaDB (Vector), Solana Wallet',
    role: '负责本地意图分析、向 Broker 广播请求、以及最后的支付签名。',
  },
  provider: {
    title: 'User B: Provider Node (Client)',
    core: 'Python 3.10+, HuggingFace (bge-m3)',
    components: 'Local File Watcher, PII Scrubber, AES Encryption',
    role: '监听广播，本地计算向量相似度，生成报价，清洗隐私数据后加密传输。',
  },
  broker: {
    title: 'Cloud Server: Broker',
    core: 'FastAPI (Async Python)',
    components: 'Redis (Pub/Sub), PostgreSQL (Metadata), WebSocket Gateway',
    role: '高并发信令通道。负责用户认证、意图广播分发、信誉分管理。',
  },
  chain: {
    title: 'Blockchain Layer',
    core: 'Solana Network',
    components: 'SPL Token Standard, solana-py',
    role: '处理微支付结算，提供不可篡改的交易凭证，作为交付的触发信号。',
  },
}

// 安全机制数据
const securityFeatures = [
  {
    id: 'auth',
    icon: '🔐',
    title: '身份认证',
    description: '采用 SecondMe OAuth 2.0 认证',
    details: [
      '符合 OpenID Connect Discovery 规范',
      '支持 API Key、OAuth 2.0 等多种认证方式',
      'JWT Token 身份验证，确保请求合法性',
      '双因素认证（2FA）支持',
    ],
  },
  {
    id: 'encryption',
    icon: '🔒',
    title: '端到端加密',
    description: '知识内容全程加密保护',
    details: [
      'ECDH 密钥协商机制',
      'AES-256-GCM 对称加密',
      '内容传输前本地加密',
      '服务端无法解密内容',
    ],
  },
  {
    id: 'privacy',
    icon: '🛡️',
    title: '隐私保护',
    description: '知识提供者的知识产权保障',
    details: [
      '向量检索，原始内容不上传',
      '本地计算相似度，保护知识来源',
      '仅传输加密后的内容片段',
      '交付后自动清理临时数据',
    ],
  },
  {
    id: 'blockchain',
    icon: '⛓️',
    title: '区块链结算',
    description: '不可篡改的交易凭证',
    details: [
      'Solana 智能合约托管资金',
      '交易完成后自动释放',
      '链上存证，可追溯审计',
      '去中心化，无需信任第三方',
    ],
  },
]

// 不透明执行理念
const opaqueExecutionConcept = {
  title: '不透明执行 (Opaque Execution)',
  subtitle: '保护知识产权，促进知识共享',
  description: 'A2A 协议的核心理念：代理基于声明的能力协作，无需共享内部思维、计划或工具实现。',
  principles: [
    {
      icon: '🎭',
      title: '能力声明',
      description: 'Provider 只需声明能回答什么类型的问题，无需暴露知识来源和推理过程',
    },
    {
      icon: '🔏',
      title: '过程隔离',
      description: 'Seeker 看不到 Provider 如何检索知识，只看到最终交付的结果',
    },
    {
      icon: '🤝',
      title: '可信协作',
      description: '通过信誉评分和链上结算建立信任，而非依赖透明的过程审计',
    },
    {
      icon: '🚀',
      title: '效率优先',
      description: 'Provider 可以使用任何内部工具和方法，不受平台限制',
    },
  ],
  comparison: {
    traditional: [
      '需要公开知识来源和参考文献',
      '推理过程必须可被审计',
      '知识容易被复制和二次传播',
      '专业人士不愿意分享核心经验',
    ],
    opaque: [
      '只需声明能提供什么类型的知识',
      '内部检索和推理过程完全保密',
      '加密交付，防止未授权传播',
      '保护知识产权，吸引更多专业人士',
    ],
  },
}

export default function ArchitecturePage() {
  const [selectedNode, setSelectedNode] = useState<string>('seeker')
  const [activeSection, setActiveSection] = useState<'architecture' | 'security' | 'opaque'>('architecture')

  const data = techStackData[selectedNode]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">系统架构与技术选型</h1>
        <p className="mt-2 text-slate-600">
          DeepKnow 采用"中心化信令 + 去中心化执行"的混合架构，确保服务端仅作为握手通道，不接触用户私有数据。
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-8 p-1 bg-slate-100 rounded-xl">
        {[
          { id: 'architecture', name: '系统架构', icon: '🏗️' },
          { id: 'security', name: '安全与认证', icon: '🔒' },
          { id: 'opaque', name: '不透明执行', icon: '🎭' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeSection === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Architecture Section */}
      {activeSection === 'architecture' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Interactive Map (Left) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-gradient-to-br from-slate-100/80 via-indigo-50/50 to-slate-100/80 rounded-2xl border border-slate-200/60 backdrop-blur-sm">
            {/* User A - Seeker */}
            <div
              className={`border-2 rounded-xl p-6 bg-white relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedNode === 'seeker'
                  ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
                  : 'border-slate-200'
              }`}
              onClick={() => setSelectedNode('seeker')}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-6xl">👤</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">User A: Seeker Node</h4>
              <p className="text-sm text-slate-500 mb-4">需求发起方，负责广播意图与支付。</p>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• Agent Core</li>
                <li>• Solana Wallet</li>
                <li>• Local Vector DB</li>
              </ul>
            </div>

            {/* User B - Provider */}
            <div
              className={`border-2 rounded-xl p-6 bg-white relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedNode === 'provider'
                  ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
                  : 'border-slate-200'
              }`}
              onClick={() => setSelectedNode('provider')}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-6xl">🧠</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">User B: Provider Node</h4>
              <p className="text-sm text-slate-500 mb-4">知识贡献方，负责本地检索与加密交付。</p>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• Local Private Files</li>
                <li>• ChromaDB</li>
                <li>• E2E Encryption</li>
              </ul>
            </div>

            {/* Cloud Server - Broker */}
            <div
              className={`border-2 rounded-xl p-6 bg-white relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedNode === 'broker'
                  ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
                  : 'border-slate-200'
              }`}
              onClick={() => setSelectedNode('broker')}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-6xl">☁️</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Cloud Server: Broker</h4>
              <p className="text-sm text-slate-500 mb-4">高并发信令服务器，负责撮合与广播。</p>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• WebSocket Gateway</li>
                <li>• Redis Pub/Sub</li>
                <li>• Auth Service</li>
              </ul>
            </div>

            {/* Blockchain */}
            <div
              className={`border-2 rounded-xl p-6 bg-white relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedNode === 'chain'
                  ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
                  : 'border-slate-200'
              }`}
              onClick={() => setSelectedNode('chain')}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-6xl">🔗</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Blockchain: Payment</h4>
              <p className="text-sm text-slate-500 mb-4">去中心化结算层。</p>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• Solana Network</li>
                <li>• SPL Token</li>
              </ul>
            </div>
          </div>

          {/* Detail Panel (Right) */}
          <div className="lg:col-span-1 bg-slate-800 text-slate-100 rounded-xl p-6 shadow-xl">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-indigo-400 border-b border-slate-600 pb-2">
                {data.title}
              </h4>
              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <strong className="text-slate-300 block mb-1">核心框架</strong>
                  <p className="text-slate-400">{data.core}</p>
                </div>
                <div>
                  <strong className="text-slate-300 block mb-1">关键组件</strong>
                  <p className="text-slate-400">{data.components}</p>
                </div>
                <div>
                  <strong className="text-slate-300 block mb-1">职责</strong>
                  <p className="text-slate-400">{data.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Section */}
      {activeSection === 'security' && (
        <div className="space-y-8">
          {/* Security Overview */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🛡️</span>
              <div>
                <h2 className="text-2xl font-bold">安全与认证机制</h2>
                <p className="text-indigo-100 mt-1">
                  DeepKnow 遵循 A2A 协议安全规范，与 OpenAPI 安全方案对齐，全方位保护用户数据和知识产权
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">OAuth 2.0</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">OpenID Connect</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">ECDH</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">AES-256-GCM</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">JWT</span>
            </div>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map(feature => (
              <div key={feature.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{feature.description}</p>
                    <ul className="mt-4 space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Badges */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">认证徽章说明</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-medium text-slate-900">已认证</p>
                  <p className="text-xs text-slate-500">通过 SecondMe OAuth</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-medium text-slate-900">加密保护</p>
                  <p className="text-xs text-slate-500">AES-256 端到端加密</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="font-medium text-slate-900">知识产权</p>
                  <p className="text-xs text-slate-500">本地计算，内容加密</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-2xl">⛓️</span>
                <div>
                  <p className="font-medium text-slate-900">链上存证</p>
                  <p className="text-xs text-slate-500">Solana 区块链结算</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">身份验证流程</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {[
                { step: 1, title: 'OAuth 登录', desc: 'SecondMe 授权' },
                { step: 2, title: 'JWT 签发', desc: '获取访问令牌' },
                { step: 3, title: '请求签名', desc: '验证身份合法性' },
                { step: 4, title: '安全通信', desc: '加密数据传输' },
              ].map((item, idx) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <p className="font-medium text-slate-900 mt-2">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  {idx < 3 && (
                    <svg className="hidden md:block w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Opaque Execution Section */}
      {activeSection === 'opaque' && (
        <div className="space-y-8">
          {/* Concept Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{opaqueExecutionConcept.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{opaqueExecutionConcept.title}</h2>
                <p className="text-emerald-100 mt-1">{opaqueExecutionConcept.subtitle}</p>
              </div>
            </div>
            <p className="text-lg text-emerald-50 max-w-3xl">
              {opaqueExecutionConcept.description}
            </p>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opaqueExecutionConcept.principles.map(principle => (
              <div key={principle.title} className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{principle.icon}</span>
                <h3 className="font-bold text-slate-900 mb-2">{principle.title}</h3>
                <p className="text-sm text-slate-600">{principle.description}</p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">传统模式 vs 不透明执行</h3>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📖</span>
                  <h4 className="font-bold text-slate-900">传统知识分享</h4>
                </div>
                <ul className="space-y-3">
                  {opaqueExecutionConcept.comparison.traditional.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-emerald-50/50">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎭</span>
                  <h4 className="font-bold text-emerald-900">A2A 不透明执行</h4>
                </div>
                <ul className="space-y-3">
                  {opaqueExecutionConcept.comparison.opaque.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-emerald-800">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">不透明执行流程</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block"></div>

              <div className="space-y-6">
                {[
                  { step: 1, title: '能力声明', desc: 'Provider 发布 AgentCard，声明能回答的问题类型和技能领域', icon: '📝' },
                  { step: 2, title: '意图广播', desc: 'Seeker 广播需求，Provider 本地计算匹配度，无需上传知识内容', icon: '📡' },
                  { step: 3, title: '报价生成', desc: 'Provider 基于本地检索结果生成报价，仅返回脱敏的预览信息', icon: '💰' },
                  { step: 4, title: '加密交付', desc: '交易完成后，Provider 加密知识内容，Seeker 本地解密查看', icon: '🔐' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-10">
                      {item.step}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{item.icon}</span>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                      </div>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-slate-800 rounded-xl p-8 text-center">
            <blockquote className="text-xl text-slate-100 italic">
              "知识的价值在于应用，而非来源。不透明执行让专业人士能够放心分享核心经验，
              而无需担心知识产权泄露。"
            </blockquote>
            <p className="text-slate-400 mt-4">— A2A Protocol Design Philosophy</p>
          </div>
        </div>
      )}
    </div>
  )
}
