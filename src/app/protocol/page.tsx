'use client'

import { useState } from 'react'

const protocolPayloads: Record<number, string> = {
  1: JSON.stringify({
    "type": "BROADCAST_REQUEST",
    "req_id": "uuid-v4-a1b2",
    "vector": [0.12, -0.45, 0.88, "... (768 dims)"],
    "budget_cap": 5.0,
    "tags": ["kubernetes", "devops"]
  }, null, 2),
  2: JSON.stringify({
    "type": "BID_OFFER",
    "req_id": "uuid-v4-a1b2",
    "provider_id": "agent_B_8821",
    "price": 2.5,
    "confidence": 0.88,
    "preview": "基于 2023-10 的生产环境事故复盘报告..."
  }, null, 2),
  3: JSON.stringify({
    "type": "DELIVERY_ENCRYPTED",
    "tx_hash": "5Kj9...z2x1",
    "content_blob": "ENCRYPTED_BYTES[...]",
    "algo": "AES-256-GCM",
    "note": "Decryption key negotiated via ECDH"
  }, null, 2)
}

const steps = [
  {
    id: 1,
    title: '意图广播 (Intent Broadcast)',
    icon: '📡',
    description: 'Seeker 提出问题（例如："如何解决 K8s CrashLoopBackOff?"）。客户端将问题转化为向量 (Embedding)，并附带预算上限，通过 WebSocket 发送给 Server。',
    privacy: '原始问题不一定直接发送，主要是向量和标签，保护提问隐私。',
    privacyColor: 'blue',
  },
  {
    id: 2,
    title: '本地匹配与报价 (Local Match & Bid)',
    icon: '⚡',
    description: 'Provider 收到广播后，Agent Core 在本地 ChromaDB 中搜索相似向量。如果相似度（Score）超过阈值（如 0.75），则自动生成报价并返回。',
    privacy: '报价包含 "preview" 字段，提供部分脱敏摘要以证明拥有该知识，而不泄露完整内容。',
    privacyColor: 'amber',
  },
  {
    id: 3,
    title: '交易与交付 (Transaction & Delivery)',
    icon: '🔐',
    description: 'Seeker 接受报价并在链上锁定资金。Provider 确认链上交易成功后，通过 ECDH 协商密钥，使用 AES-256-GCM 加密完整内容并发送。',
    privacy: '服务端只能看到加密的 Blob 数据，无法查看具体知识内容。',
    privacyColor: 'emerald',
  },
]

export default function ProtocolPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const step = steps.find(s => s.id === currentStep) || steps[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">核心通信协议流转</h1>
        <p className="mt-2 text-slate-600">
          DeepKnow 采用基于 JSON over WebSocket 的通信协议。以下演示一次完整的知识交易过程：
          从意图广播，到本地匹配报价，最后到链上支付与交付。
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Stepper Controls */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex space-x-2">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentStep === s.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {s.id}. {s.title.split(' ')[0]}
              </button>
            ))}
          </div>
          <div className="text-sm text-slate-500 font-mono">
            Status: {currentStep === 1 ? 'Idle' : currentStep === 2 ? 'Matching...' : 'Transacting...'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Visual Description */}
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-200 bg-gradient-to-br from-indigo-50/30 via-slate-50/50 to-blue-50/30">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl mb-4">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-800">步骤 {step.id}: {step.title}</h4>
              <p className="text-slate-600">{step.description}</p>
              <div className={`mt-4 p-4 bg-${step.privacyColor}-50 border border-${step.privacyColor}-100 rounded-lg text-sm text-${step.privacyColor}-800`}>
                <strong>隐私保护：</strong> {step.privacy}
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="bg-slate-900 overflow-x-auto">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-xs text-slate-400 font-mono">Payload Preview</span>
              <span className="text-xs text-emerald-400 font-mono">JSON</span>
            </div>
            <pre className="p-6 text-sm text-emerald-300 font-mono leading-relaxed">
              {protocolPayloads[currentStep]}
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← 上一步
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
          disabled={currentStep === 3}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步 →
        </button>
      </div>
    </div>
  )
}
