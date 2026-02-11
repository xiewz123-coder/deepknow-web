'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// Mock data - same as marketplace
const mockKnowledgeItems = [
  {
    id: '1',
    title: 'K8s 生产环境故障排查指南',
    description: '基于 50+ 次生产事故的故障排查经验，涵盖 CrashLoopBackOff、OOMKilled 等常见问题',
    fullContent: '本指南详细记录了 Kubernetes 生产环境中常见的故障场景，包括但不限于：\n\n1. CrashLoopBackOff 故障诊断流程\n2. OOMKilled 内存优化策略\n3. ImagePullBackOff 镜像拉取问题解决\n4. Pod 启动失败排查步骤\n5. 网络不通问题诊断\n\n每个场景都包含：故障现象、根因分析、排查命令、解决方案和预防措施。',
    tags: ['kubernetes', 'devops', 'troubleshooting'],
    price: 2.5,
    owner: 'Expert_A',
    reputation: 950,
    sales: 128,
    rating: 4.8,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Solana 智能合约安全审计清单',
    description: '常见的 Solana 合约漏洞及防范措施，包括重入攻击、整数溢出等',
    fullContent: 'Solana 智能合约安全审计完整清单，覆盖：\n\n1. 账户验证检查\n2. 签名验证流程\n3. 重入攻击防护\n4. 整数溢出检测\n5. PDA (Program Derived Address) 安全使用\n6. CPI (Cross-Program Invocation) 安全规范\n\n附带自动化审计脚本和手动检查清单。',
    tags: ['solana', 'blockchain', 'security'],
    price: 5.0,
    owner: 'Security_Pro',
    reputation: 1200,
    sales: 86,
    rating: 4.9,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    title: '向量数据库选型与性能优化',
    description: 'ChromaDB、Pinecone、Milvus 等向量数据库的对比与最佳实践',
    fullContent: '向量数据库全面评测报告：\n\n1. 主流向量数据库对比（ChromaDB、Pinecone、Milvus、Weaviate、Qdrant）\n2. 性能基准测试结果\n3. 不同场景下的选型建议\n4. 大规模数据导入优化\n5. 查询性能调优技巧\n6. 成本效益分析\n\n包含详细的性能测试数据和架构建议。',
    tags: ['ai', 'database', 'vector'],
    price: 3.0,
    owner: 'AI_Engineer',
    reputation: 800,
    sales: 215,
    rating: 4.6,
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    title: 'WebSocket 高并发架构设计',
    description: '百万级并发的 WebSocket 信令服务器架构设计经验',
    fullContent: '高并发 WebSocket 架构设计实战：\n\n1. 单机百万连接架构\n2. 分布式集群设计方案\n3. 心跳与断线重连机制\n4. 消息可靠性保证\n5. 水平扩展策略\n6. 监控与告警体系\n\n基于真实生产环境的架构设计文档。',
    tags: ['websocket', 'backend', 'architecture'],
    price: 4.0,
    owner: 'System_Arch',
    reputation: 1500,
    sales: 342,
    rating: 4.9,
    createdAt: '2024-01-28',
  },
  {
    id: '5',
    title: 'LLM Prompt Engineering 进阶',
    description: '高级提示工程技巧，提升 GPT-4/Claude 的输出质量',
    fullContent: 'Prompt Engineering 高级技巧指南：\n\n1. Chain-of-Thought 思维链技巧\n2. Few-shot 示例设计原则\n3. 角色设定与上下文管理\n4. 输出格式控制方法\n5. 幻觉问题缓解策略\n6. 成本优化技巧\n\n包含大量实际案例和模板。',
    tags: ['ai', 'llm', 'prompt-engineering'],
    price: 1.5,
    owner: 'AI_Researcher',
    reputation: 1100,
    sales: 567,
    rating: 4.7,
    createdAt: '2024-04-05',
  },
  {
    id: '6',
    title: '端到端加密通信协议实现',
    description: 'ECDH + AES-256-GCM 加密协议的工程实现指南',
    fullContent: '端到端加密协议完整实现：\n\n1. ECDH 密钥交换原理与实现\n2. AES-256-GCM 加密方案\n3. 密钥派生函数 (KDF) 使用\n4. 前向保密机制\n5. 消息认证与完整性校验\n6. 移动端性能优化\n\n提供多语言实现示例（Python、TypeScript、Go）。',
    tags: ['security', 'encryption', 'cryptography'],
    price: 6.0,
    owner: 'Crypto_Expert',
    reputation: 2000,
    sales: 93,
    rating: 5.0,
    createdAt: '2024-02-14',
  },
]

type PurchaseStep = 'preview' | 'confirm' | 'processing' | 'success'

export default function PurchasePage() {
  const params = useParams()
  const router = useRouter()
  const [step, setStep] = useState<PurchaseStep>('preview')
  const [txHash, setTxHash] = useState('')

  const item = mockKnowledgeItems.find(i => i.id === params.id)

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">知识项目不存在</h2>
          <p className="text-slate-500 mb-6">该知识项目可能已被删除或下架</p>
          <Link href="/marketplace" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← 返回知识市场
          </Link>
        </div>
      </div>
    )
  }

  const handlePurchase = () => {
    setStep('processing')
    // Simulate blockchain transaction
    setTimeout(() => {
      setTxHash('5Kj9xYz2Abc7Def8Ghi9Jkl0Mno1Pqr2Stu3Vwx4Yz5')
      setStep('success')
    }, 2500)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-slate-600">{rating}</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">首页</Link>
        <span>/</span>
        <Link href="/marketplace" className="hover:text-indigo-600">知识市场</Link>
        <span>/</span>
        <span className="text-slate-800">购买确认</span>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
            step === 'preview' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
          }`}>
            1
          </div>
          <span className="ml-2 text-sm font-medium text-slate-700">预览确认</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${
          step === 'preview' ? 'bg-slate-200' : 'bg-indigo-600'
        }`} />
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
            step === 'confirm' ? 'bg-indigo-600 text-white' :
            step === 'processing' || step === 'success' ? 'bg-indigo-100 text-indigo-600' :
            'bg-slate-100 text-slate-400'
          }`}>
            2
          </div>
          <span className={`ml-2 text-sm font-medium ${
            step === 'preview' ? 'text-slate-400' : 'text-slate-700'
          }`}>支付确认</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${
          step === 'success' ? 'bg-indigo-600' : 'bg-slate-200'
        }`} />
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
            step === 'success' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            3
          </div>
          <span className={`ml-2 text-sm font-medium ${
            step === 'success' ? 'text-slate-700' : 'text-slate-400'
          }`}>交易完成</span>
        </div>
      </div>

      {step === 'preview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Knowledge Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-slate-900">{item.title}</h1>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-lg font-bold">
                  {item.price} SOL
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {item.owner[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.owner}</p>
                    <p className="text-xs text-slate-500">信誉分 {item.reputation}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex items-center gap-1">
                  {renderStars(item.rating)}
                  <span className="text-xs text-slate-500">({item.sales} 已售)</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">知识简介</h3>
                <p className="text-slate-600 mb-4">{item.description}</p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    <strong>⚠️ 购买须知：</strong>本知识内容经过端到端加密保护。
                    购买后您将获得解密密钥，知识将保存在您的本地设备中。
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-800 mb-2">内容预览</h4>
                  <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans">
                    {item.fullContent.substring(0, 200)}...
                  </pre>
                  <p className="text-xs text-slate-400 mt-2">完整内容购买后可见</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Purchase Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">订单摘要</h3>

              <div className="space-y-3 mb-4 pb-4 border-b border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">知识价格</span>
                  <span className="text-slate-800">{item.price} SOL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">平台服务费</span>
                  <span className="text-slate-800">{(item.price * 0.02).toFixed(3)} SOL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">链上手续费</span>
                  <span className="text-slate-800">~0.000005 SOL</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-slate-800">总计</span>
                <span className="text-xl font-bold text-emerald-600">
                  {(item.price * 1.02).toFixed(3)} SOL
                </span>
              </div>

              <button
                onClick={() => setStep('confirm')}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors mb-3"
              >
                确认购买
              </button>

              <Link
                href="/marketplace"
                className="block w-full text-center text-slate-500 hover:text-slate-700 text-sm"
              >
                返回市场
              </Link>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>安全加密交易</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">确认支付</h2>
              <p className="text-slate-600">您即将使用 Solana 钱包进行支付</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600">购买项目</span>
                <span className="font-medium text-slate-800 text-right max-w-xs">{item.title}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600">卖家</span>
                <span className="font-medium text-slate-800">{item.owner}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="text-slate-800 font-semibold">支付金额</span>
                <span className="text-xl font-bold text-emerald-600">{(item.price * 1.02).toFixed(3)} SOL</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('preview')}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                返回修改
              </button>
              <button
                onClick={handlePurchase}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                立即支付
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">交易处理中</h2>
          <p className="text-slate-600 mb-4">正在向 Solana 网络提交交易...</p>
          <div className="bg-slate-100 rounded-lg p-3 mx-auto max-w-xs">
            <p className="text-xs text-slate-500 font-mono truncate">等待区块确认...</p>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">🎉 购买成功！</h2>
            <p className="text-slate-600 mb-6">您已成功购买该知识，内容已加密传输到您的设备</p>

            <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-slate-500 mb-1">交易哈希</p>
              <p className="text-sm font-mono text-slate-800 break-all">{txHash}</p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-indigo-800 mb-2">下一步</h4>
              <ul className="text-sm text-indigo-700 text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">1.</span>
                  <span>下载 DeepKnow 客户端以解密和查看知识内容</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">2.</span>
                  <span>使用您的 Solana 钱包私钥解密内容</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">3.</span>
                  <span>知识将保存在您的本地设备，可随时查阅</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push(`/knowledge/${params.id}`)}
                className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                立即阅读
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                查看我的知识
              </button>
              <button
                onClick={() => router.push('/marketplace')}
                className="px-4 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                继续浏览
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
