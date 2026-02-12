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
  {
    id: '7',
    title: 'React 性能优化交互式实验室',
    description: '在线体验各种优化技巧的实际效果，包含 Profiler、DevTools 等工具使用',
    fullContent: 'React 性能优化交互式实验室完整指南：\n\n1. Profiler 工具深度使用\n   - 如何解读火焰图\n   - 识别不必要的重渲染\n   - 测量组件渲染时间\n\n2. 优化技巧实战\n   - useMemo 和 useCallback 的正确使用\n   - React.memo 的适用场景\n   - 虚拟列表实现（react-window）\n   - 代码分割与懒加载\n\n3. 状态管理优化\n   - Context 性能陷阱\n   - 状态拆分策略\n   - Zustand 轻量级方案\n\n4. 构建优化\n   - Tree Shaking 配置\n   - 图片和资源优化\n   - Bundle 分析与优化\n\n配套在线实验室可实时对比优化前后的性能差异。',
    tags: ['react', 'performance', 'frontend'],
    price: 8.0,
    owner: 'Frontend_Wizard',
    reputation: 1100,
    sales: 423,
    rating: 4.8,
    createdAt: '2024-01-14',
  },
  {
    id: '8',
    title: '全球加密货币交易数据集（2020-2024）',
    description: '包含 BTC、ETH 等主流币种的历史交易数据，适合量化分析和机器学习研究',
    fullContent: '全球加密货币交易数据集详细说明：\n\n数据内容：\n- BTC/USDT、ETH/USDT、SOL/USDT 等 20+ 交易对\n- 时间粒度：1分钟、5分钟、1小时、1天\n- 时间范围：2020-01-01 至 2024-01-01\n\n数据字段：\n- timestamp: 时间戳（毫秒）\n- open: 开盘价\n- high: 最高价\n- low: 最低价\n- close: 收盘价\n- volume: 交易量\n- quote_volume: 计价货币交易量\n- trades_count: 成交笔数\n\n附加内容：\n- 数据清洗脚本（Python）\n- 常用的技术分析指标计算\n- 简单的量化策略示例\n- Jupyter Notebook 分析模板',
    tags: ['crypto', 'data', 'ml'],
    price: 20.0,
    owner: 'Data_Provider',
    reputation: 900,
    sales: 67,
    rating: 4.5,
    createdAt: '2024-01-11',
  },
  {
    id: '9',
    title: 'Docker 最佳实践 - 完整教程',
    description: '从 Dockerfile 编写到多阶段构建，从单机部署到 Swarm 集群',
    fullContent: 'Docker 最佳实践完整教程：\n\n第一章：Dockerfile 优化\n- 使用多阶段构建减少镜像体积\n- 合理利用缓存层加速构建\n- 选择合适的基础镜像（Alpine vs Debian）\n- 安全最佳实践（非 root 用户运行）\n\n第二章：镜像管理\n- 私有镜像仓库搭建（Harbor）\n- 镜像版本管理策略\n- 镜像安全扫描\n- 镜像层分析与优化\n\n第三章：容器运行时\n- 资源限制配置（CPU、内存、IO）\n- 健康检查与自动重启\n- 日志管理策略\n- 容器监控方案\n\n第四章：Swarm 集群\n- 集群初始化与管理\n- 服务编排与滚动更新\n- 网络与存储配置\n- 高可用架构设计',
    tags: ['docker', 'devops', 'container'],
    price: 6.0,
    owner: 'DevOps_Guru',
    reputation: 1600,
    sales: 234,
    rating: 4.7,
    createdAt: '2024-01-09',
  },
  {
    id: '10',
    title: 'Python 异步编程实战 - 代码库',
    description: '包含 asyncio、aiohttp、asyncpg 等库的实战示例，含完整测试用例',
    fullContent: 'Python 异步编程实战代码库：\n\n核心内容：\n\n1. asyncio 基础\n   - 事件循环原理\n   - Task 和 Future\n   - 异步迭代器和上下文管理器\n\n2. 网络编程\n   - aiohttp 客户端和服务端\n   - WebSocket 实现\n   - 连接池管理\n\n3. 数据库操作\n   - asyncpg（PostgreSQL）\n   - aiomysql（MySQL）\n   - 事务和并发控制\n\n4. 高级主题\n   - 异步上下文管理器\n   - 信号量控制并发\n   - 超时和取消\n   - 性能测试与调优\n\n每个模块包含：\n- 完整的可运行代码\n- 单元测试（pytest-asyncio）\n- 性能对比（同步 vs 异步）\n- 实际应用场景说明',
    tags: ['python', 'async', 'backend'],
    price: 4.5,
    owner: 'Pythonista',
    reputation: 1300,
    sales: 378,
    rating: 4.8,
    createdAt: '2024-01-07',
  },
  {
    id: '11',
    title: 'Kubernetes 网络故障排查 - 视频教程',
    description: '深入浅出讲解 K8s 网络原理，通过 10 个真实案例学习排查技巧',
    fullContent: 'Kubernetes 网络故障排查视频教程：\n\n课程大纲：\n\n模块一：网络基础（2集）\n- K8s 网络模型（CNI、Service、DNS）\n- 数据包流动路径分析\n\n模块二：CoreDNS 专题（3集）\n- DNS 解析失败排查\n- CoreDNS 性能优化\n- 自定义 DNS 策略\n\n模块三：Service 故障（3集）\n- ClusterIP 不通排查\n- NodePort 无法访问\n- LoadBalancer 配置问题\n\n模块四：Ingress 专题（2集）\n- 证书问题排查\n- 路由配置错误\n- 502/504 错误分析\n\n模块五：高级网络（2集）\n- Calico 网络策略\n- 网络隔离与调试\n- tcpdump 实战技巧\n\n每个案例包含：\n- 故障现象描述\n- 完整的排查过程\n- 使用的命令和工具\n- 根因分析和解决方案',
    tags: ['kubernetes', 'networking', 'video'],
    price: 12.0,
    owner: 'K8s_Expert',
    reputation: 1900,
    sales: 445,
    rating: 4.9,
    createdAt: '2024-01-13',
  },
  {
    id: '12',
    title: '技术领导力成长指南 - 音频课程',
    description: '从技术专家到团队 Leader 的进阶之路，分享管理经验和软技能',
    fullContent: '技术领导力成长指南音频课程：\n\n课程目录（共 30 期，每期 20-30 分钟）：\n\n第一部分：角色转变（1-8期）\n1. 工程师 vs 管理者：思维模式的转变\n2. 时间管理：从编码到开会的平衡\n3. 如何优雅地放手技术细节\n4. 向上管理：与老板沟通的艺术\n5. 跨部门协作的技巧\n6. 建立技术影响力\n7. 处理团队冲突\n8. 招聘与面试技巧\n\n第二部分：团队建设（9-18期）\n9. 如何制定团队目标\n10. 绩效评估与反馈\n11. 激励团队的方法\n12. 培养技术人才\n13. 技术分享文化建设\n14. 处理低绩效员工\n15. 远程团队管理\n16. 敏捷实践落地\n17. 技术债管理策略\n18. 打造高效会议\n\n第三部分：战略思维（19-30期）\n19. 技术规划与路线图\n20. 架构决策的方法论\n21. 成本意识培养\n22. 技术风险管理\n23. 如何推动技术创新\n24. 建立技术品牌\n25. 危机处理案例\n26. 从 0 到 1 组建团队\n27. 大厂经验分享\n28. 创业公司生存指南\n29. CTO 视角看问题\n30. 持续成长的方法',
    tags: ['leadership', 'career', 'management'],
    price: 5.0,
    owner: 'Tech_Leader',
    reputation: 2500,
    sales: 334,
    rating: 4.8,
    createdAt: '2024-01-06',
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
