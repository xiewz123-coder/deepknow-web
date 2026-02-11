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

export default function ArchitecturePage() {
  const [selectedNode, setSelectedNode] = useState<string>('seeker')

  const data = techStackData[selectedNode]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">系统架构与技术选型</h1>
        <p className="mt-2 text-slate-600">
          DeepKnow 系统由四个核心部分组成。点击节点卡片，查看每个组件的详细技术栈配置。
          系统设计确保服务端仅作为握手通道，不接触用户私有数据。
        </p>
      </div>

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
    </div>
  )
}
