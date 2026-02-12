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

// 任务状态定义
const taskStatuses = [
  {
    id: 'pending',
    name: '待匹配',
    icon: '⏳',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    description: '任务已创建，等待合适的知识提供者响应',
    duration: '0-5s',
  },
  {
    id: 'matching',
    name: '匹配中',
    icon: '🔍',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: '系统正在广播意图，收集 Provider 的报价',
    duration: '5-30s',
  },
  {
    id: 'processing',
    name: '处理中',
    icon: '⚙️',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    description: 'Seeker 已选择 Provider，正在进行支付和内容交付',
    duration: '10s-5min',
  },
  {
    id: 'delivering',
    name: '交付中',
    icon: '📦',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Provider 正在加密并传输知识内容',
    duration: '5-30s',
  },
  {
    id: 'completed',
    name: '已完成',
    icon: '✅',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    description: '交易完成，Seeker 已收到并解密知识内容',
    duration: '-',
  },
  {
    id: 'cancelled',
    name: '已取消',
    icon: '❌',
    color: 'bg-red-100 text-red-700 border-red-200',
    description: '任务被取消或超时未匹配到合适的 Provider',
    duration: '-',
  },
]

// 通知机制
const notificationMethods = [
  {
    id: 'polling',
    name: '轮询 (Polling)',
    icon: '🔄',
    description: '客户端定期向服务器查询任务状态',
    pros: ['实现简单', '兼容性好', '可控频率'],
    cons: ['实时性较差', '增加服务器负载', '空轮询浪费资源'],
    useCase: '适用于对实时性要求不高的场景',
    code: `// 客户端轮询示例
const checkStatus = async () => {
  const res = await fetch(
    '/api/tasks/123/status'
  );
  const { status } = await res.json();

  if (status === 'completed') {
    clearInterval(pollInterval);
    showResult();
  }
};

const pollInterval = setInterval(
  checkStatus,
  5000 // 每5秒轮询一次
);`,
  },
  {
    id: 'streaming',
    name: '流式推送 (SSE)',
    icon: '📡',
    description: '服务器通过 Server-Sent Events 实时推送状态更新',
    pros: ['实时性好', '单向通信安全', '自动重连'],
    cons: ['需要保持连接', '部分代理不支持', '长时间连接可能断开'],
    useCase: '适用于需要实时进度更新的场景',
    code: `// SSE 客户端示例
const eventSource = new EventSource(
  '/api/tasks/123/stream'
);

eventSource.onmessage = (event) => {
  const update = JSON.parse(event.data);

  if (update.status === 'progress') {
    updateProgress(update.percent);
  }

  if (update.status === 'completed') {
    eventSource.close();
    showResult(update.data);
  }
};

eventSource.onerror = () => {
  // 自动重连或降级到轮询
};`,
  },
  {
    id: 'webhook',
    name: 'WebHook 推送',
    icon: '⚡',
    description: '任务状态变更时，服务器向客户端注册的回调地址发送通知',
    pros: ['实时性最好', '无空闲连接', '支持异步处理'],
    cons: ['需要公网地址', '需处理重试', '安全性需额外配置'],
    useCase: '适用于服务端处理或移动端推送',
    code: `// WebHook 注册示例
const registerWebhook = async () => {
  await fetch('/api/tasks/123/webhook', {
    method: 'POST',
    body: JSON.stringify({
      url: 'https://myapp.com/webhook/task-123',
      events: ['status_changed', 'completed'],
      secret: 'whsec_xxx' // 用于签名验证
    })
  });
};

// 接收 WebHook
app.post('/webhook/task-123', (req, res) => {
  const signature = req.headers['x-webhook-signature'];

  // 验证签名
  if (verifySignature(req.body, signature)) {
    handleTaskUpdate(req.body);
    res.status(200).send('OK');
  }
});`,
  },
]

// 模拟任务时间线数据
const taskTimeline = [
  {
    time: '2024-01-15 10:23:01',
    status: 'pending',
    title: '任务创建',
    description: 'Seeker 提交知识查询请求',
    actor: 'Seeker',
    details: '请求内容: "如何解决 K8s Pod 频繁重启问题?"',
  },
  {
    time: '2024-01-15 10:23:03',
    status: 'matching',
    title: '意图广播',
    description: 'Server 广播请求到所有在线 Provider',
    actor: 'Broker',
    details: '广播范围: 12 个在线 Provider',
  },
  {
    time: '2024-01-15 10:23:08',
    status: 'matching',
    title: '收到报价',
    description: '3 个 Provider 返回报价',
    actor: 'Provider',
    details: '匹配度: 0.92, 0.85, 0.78 | 报价: 0.5, 0.8, 0.3 SOL',
  },
  {
    time: '2024-01-15 10:23:15',
    status: 'processing',
    title: '选择报价',
    description: 'Seeker 选择匹配度最高的 Provider',
    actor: 'Seeker',
    details: '选择: Provider-A (匹配度 0.92, 0.5 SOL)',
  },
  {
    time: '2024-01-15 10:23:16',
    status: 'processing',
    title: '链上支付',
    description: '资金锁定在智能合约中',
    actor: 'Blockchain',
    details: 'Tx: 0x7f3a...2b1c | 金额: 0.5 SOL',
  },
  {
    time: '2024-01-15 10:23:45',
    status: 'delivering',
    title: '内容加密',
    description: 'Provider 使用 ECDH 协商密钥并加密内容',
    actor: 'Provider',
    details: '算法: AES-256-GCM | 密钥协商: ECDH',
  },
  {
    time: '2024-01-15 10:23:47',
    status: 'delivering',
    title: '内容传输',
    description: '加密内容通过 WebSocket 传输',
    actor: 'Broker',
    details: '大小: 2.4 KB | 加密: 是',
  },
  {
    time: '2024-01-15 10:23:48',
    status: 'completed',
    title: '任务完成',
    description: 'Seeker 解密内容并确认收货',
    actor: 'Seeker',
    details: '自动评价: ⭐⭐⭐⭐⭐ | 资金释放给 Provider',
  },
]

export default function ProtocolPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [activeTab, setActiveTab] = useState<'flow' | 'status' | 'notification'>('flow')
  const [selectedNotification, setSelectedNotification] = useState(notificationMethods[0])
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const step = steps.find(s => s.id === currentStep) || steps[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">核心通信协议流转</h1>
        <p className="mt-2 text-slate-600">
          DeepKnow 采用基于 JSON over WebSocket 的通信协议。以下演示一次完整的知识交易过程：
          从意图广播，到本地匹配报价，最后到链上支付与交付。
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
        {[
          { id: 'flow', name: '基础协议流程', icon: '🔄' },
          { id: 'status', name: '任务状态流转', icon: '📊' },
          { id: 'notification', name: '异步通知机制', icon: '🔔' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* 基础协议流程 Tab */}
      {activeTab === 'flow' && (
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

          {/* Navigation Buttons */}
          <div className="flex justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
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
      )}

      {/* 任务状态流转 Tab */}
      {activeTab === 'status' && (
        <div className="space-y-8">
          {/* 状态说明卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {taskStatuses.map(status => (
              <div
                key={status.id}
                className={`p-4 rounded-xl border-2 ${status.color} bg-white transition-transform hover:scale-105`}
              >
                <div className="text-3xl mb-2">{status.icon}</div>
                <h3 className="font-bold text-sm">{status.name}</h3>
                <p className="text-xs mt-1 opacity-80">{status.description}</p>
                <div className="mt-3 text-xs font-mono opacity-60">
                  ⏱️ {status.duration}
                </div>
              </div>
            ))}
          </div>

          {/* 任务生命周期时间线 */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="text-lg font-bold">📋 任务生命周期示例</h2>
              <p className="text-indigo-100 text-sm mt-1">
                展示一个完整知识查询任务从创建到完成的完整流程
              </p>
            </div>

            <div className="p-6">
              {/* 时间线 */}
              <div className="relative">
                {/* 时间线主线 */}
                <div className="absolute left-4 md:left-24 top-0 bottom-0 w-0.5 bg-slate-200"></div>

                {/* 时间线事件 */}
                <div className="space-y-6">
                  {taskTimeline.map((event, index) => {
                    const statusInfo = taskStatuses.find(s => s.id === event.status)
                    const isExpanded = expandedEvent === index

                    return (
                      <div
                        key={index}
                        className="relative flex flex-col md:flex-row gap-4 md:gap-8"
                      >
                        {/* 时间 */}
                        <div className="md:w-20 text-xs text-slate-500 font-mono flex-shrink-0 pt-2">
                          {event.time.split(' ')[1]}
                        </div>

                        {/* 节点 */}
                        <div className={`absolute left-4 md:left-24 w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 -translate-x-1.5 mt-2 ${
                          statusInfo?.color.split(' ')[0] || 'bg-slate-400'
                        }`}></div>

                        {/* 内容卡片 */}
                        <div
                          className="ml-12 md:ml-8 flex-1 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setExpandedEvent(isExpanded ? null : index)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{statusInfo?.icon}</span>
                              <div>
                                <h4 className="font-semibold text-slate-900">{event.title}</h4>
                                <p className="text-sm text-slate-600">{event.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo?.color}`}>
                                {statusInfo?.name}
                              </span>
                              <svg
                                className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* 展开详情 */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-500">参与方:</span>
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                                  {event.actor}
                                </span>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-3">
                                <p className="text-xs text-slate-500 mb-1">详细信息:</p>
                                <p className="text-sm text-slate-700 font-mono">{event.details}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 统计信息 */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">47s</p>
                  <p className="text-sm text-slate-500">总耗时</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">8</p>
                  <p className="text-sm text-slate-500">状态变更</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">3</p>
                  <p className="text-sm text-slate-500">参与 Provider</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">0.5</p>
                  <p className="text-sm text-slate-500">SOL 交易额</p>
                </div>
              </div>
            </div>
          </div>

          {/* 状态流转图 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">🔄 状态流转图</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              {[
                { from: '待匹配', to: '匹配中', arrow: '→', color: 'text-blue-600' },
                { from: '匹配中', to: '处理中', arrow: '→', color: 'text-indigo-600' },
                { from: '匹配中', to: '已取消', arrow: '→', color: 'text-red-600', note: '(超时/无匹配)' },
                { from: '处理中', to: '交付中', arrow: '→', color: 'text-purple-600' },
                { from: '处理中', to: '已取消', arrow: '→', color: 'text-red-600', note: '(支付失败)' },
                { from: '交付中', to: '已完成', arrow: '→', color: 'text-emerald-600' },
                { from: '交付中', to: '已取消', arrow: '→', color: 'text-red-600', note: '(传输失败)' },
              ].map((flow, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-slate-100 rounded-lg font-medium text-slate-700">
                    {flow.from}
                  </span>
                  <span className={`font-bold ${flow.color}`}>{flow.arrow}</span>
                  <span className="px-3 py-1.5 bg-slate-100 rounded-lg font-medium text-slate-700">
                    {flow.to}
                  </span>
                  {flow.note && (
                    <span className="text-xs text-slate-400 italic">{flow.note}</span>
                  )}
                  {idx < 6 && <span className="mx-2 text-slate-300">|</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 异步通知机制 Tab */}
      {activeTab === 'notification' && (
        <div className="space-y-6">
          {/* 通知机制选择 */}
          <div className="grid grid-cols-3 gap-4">
            {notificationMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedNotification(method)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedNotification.id === method.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-3xl mb-2">{method.icon}</div>
                <h3 className="font-bold text-slate-900">{method.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{method.description}</p>
              </button>
            ))}
          </div>

          {/* 详细信息 */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>{selectedNotification.icon}</span>
                {selectedNotification.name}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* 优缺点 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-emerald-600 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    优点
                  </h3>
                  <ul className="space-y-2">
                    {selectedNotification.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    缺点
                  </h3>
                  <ul className="space-y-2">
                    {selectedNotification.cons.map((con, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <h3 className="text-sm font-bold text-amber-700 mb-1">💡 适用场景</h3>
                  <p className="text-sm text-amber-800">{selectedNotification.useCase}</p>
                </div>
              </div>

              {/* 代码示例 */}
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                  <span className="text-xs text-slate-400 font-mono">Code Example</span>
                  <span className="text-xs text-emerald-400 font-mono">JavaScript</span>
                </div>
                <pre className="p-4 text-sm text-emerald-300 font-mono leading-relaxed overflow-x-auto">
                  {selectedNotification.code}
                </pre>
              </div>
            </div>
          </div>

          {/* 对比总结 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📊 三种机制对比</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">特性</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">轮询</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">SSE</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">WebHook</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: '实时性', polling: '⭐⭐', sse: '⭐⭐⭐⭐⭐', webhook: '⭐⭐⭐⭐⭐' },
                    { name: '实现复杂度', polling: '⭐⭐', sse: '⭐⭐⭐', webhook: '⭐⭐⭐⭐' },
                    { name: '服务器负载', polling: '⭐⭐⭐⭐⭐', sse: '⭐⭐⭐', webhook: '⭐⭐' },
                    { name: '网络要求', polling: '⭐⭐', sse: '⭐⭐⭐', webhook: '⭐⭐⭐⭐' },
                    { name: '可靠性', polling: '⭐⭐⭐', sse: '⭐⭐⭐⭐', webhook: '⭐⭐⭐⭐⭐' },
                  ].map(row => (
                    <tr key={row.name} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-700">{row.name}</td>
                      <td className="py-3 px-4 text-center">{row.polling}</td>
                      <td className="py-3 px-4 text-center">{row.sse}</td>
                      <td className="py-3 px-4 text-center">{row.webhook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* A2A Protocol Version Info */}
      <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🔗</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">A2A Protocol v0.3.0</h3>
              <p className="text-slate-400 text-sm mt-1">DeepKnow 遵循开放的 A2A 协议标准</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://a2a-protocol.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <span>协议规范</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://github.com/a2a-protocol/spec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <span>GitHub</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-slate-400">主版本</p>
            <p className="font-mono font-medium">0</p>
          </div>
          <div>
            <p className="text-slate-400">次版本</p>
            <p className="font-mono font-medium">3</p>
          </div>
          <div>
            <p className="text-slate-400">修订版本</p>
            <p className="font-mono font-medium">0</p>
          </div>
          <div>
            <p className="text-slate-400">向后兼容</p>
            <p className="text-emerald-400">✓ 是</p>
          </div>
        </div>
      </div>
    </div>
  )
}
