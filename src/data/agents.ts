import type { AgentCard } from '@/types'

/**
 * Mock AgentCard 数据 - A2A协议代理发现
 * 用于展示知识提供者的能力、信誉和定价
 */
export const mockAgents: AgentCard[] = [
  {
    id: 'agent-001',
    name: 'K8s专家助手',
    description: '专注于Kubernetes集群管理、故障排查、性能优化和最佳实践。能够提供详细的YAML配置审查和架构建议。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=k8s-expert',
    version: '2.1.0',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-06-20T10:30:00Z',
    capabilities: [
      { name: '集群诊断', description: '分析集群健康状态，识别潜在问题', type: 'query', enabled: true },
      { name: '配置审查', description: '审查YAML配置，提供最佳实践建议', type: 'task', enabled: true },
      { name: '故障排查', description: '协助定位和解决集群故障', type: 'stream', enabled: true },
      { name: '架构咨询', description: '提供Kubernetes架构设计建议', type: 'query', enabled: true },
    ],
    skills: ['Kubernetes', 'Docker', 'Helm', 'Istio', 'Prometheus', 'Grafana', 'DevOps'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/k8s-expert',
      humanUrl: 'https://k8s-expert.deepknow.network',
      docsUrl: 'https://docs.deepknow.network/agents/k8s-expert',
    },
    authentication: {
      schemes: ['jwt'],
      required: true,
      description: '需要JWT Token认证',
    },
    rating: 4.8,
    ratingCount: 127,
    avgResponseTime: 850,
    totalTransactions: 342,
    reputation: 95,
    status: 'active',
    pricing: {
      model: 'perCall',
      basePrice: 0.05,
      currency: 'SOL',
      description: '每次调用收费0.05 SOL',
    },
    provider: {
      name: '云原生技术团队',
      description: '专注于云原生技术的专业团队',
      email: 'contact@cloudnative-team.com',
      website: 'https://cloudnative-team.com',
      verified: true,
    },
  },
  {
    id: 'agent-002',
    name: 'Solana智能合约审计',
    description: 'Solana区块链智能合约安全审计专家。能够识别常见漏洞、优化gas费用、提供安全加固建议。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=solana-auditor',
    version: '1.5.3',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-07-05T14:20:00Z',
    capabilities: [
      { name: '合约审计', description: '全面审计智能合约安全性', type: 'task', enabled: true },
      { name: '漏洞检测', description: '自动检测常见安全漏洞', type: 'query', enabled: true },
      { name: 'Gas优化', description: '优化合约执行成本', type: 'task', enabled: true },
      { name: '安全建议', description: '提供安全加固方案', type: 'query', enabled: true },
    ],
    skills: ['Solana', 'Rust', 'Anchor', 'Web3.js', '智能合约', '安全审计', '加密学'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/solana-auditor',
      humanUrl: 'https://solana-auditor.deepknow.network',
      docsUrl: 'https://docs.deepknow.network/agents/solana-auditor',
    },
    authentication: {
      schemes: ['apiKey', 'jwt'],
      required: true,
      description: '支持API Key或JWT认证',
    },
    rating: 4.9,
    ratingCount: 89,
    avgResponseTime: 1200,
    totalTransactions: 156,
    reputation: 98,
    status: 'active',
    pricing: {
      model: 'perCall',
      basePrice: 0.2,
      currency: 'SOL',
      description: '每次审计收费0.2 SOL',
    },
    provider: {
      name: 'BlockSec Labs',
      description: '区块链安全研究团队',
      email: 'security@blocksec.io',
      website: 'https://blocksec.io',
      verified: true,
    },
  },
  {
    id: 'agent-003',
    name: 'AI模型微调顾问',
    description: '深度学习模型微调专家，精通LoRA、QLoRA等技术。帮助你在消费级GPU上高效微调大语言模型。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai-finetune',
    version: '3.0.1',
    createdAt: '2024-01-20T12:00:00Z',
    updatedAt: '2024-07-10T09:15:00Z',
    capabilities: [
      { name: '微调方案', description: '制定模型微调策略', type: 'query', enabled: true },
      { name: '代码生成', description: '生成训练脚本和配置文件', type: 'task', enabled: true },
      { name: '故障诊断', description: '诊断训练过程中的问题', type: 'stream', enabled: true },
      { name: '性能优化', description: '优化训练速度和内存使用', type: 'query', enabled: true },
    ],
    skills: ['PyTorch', 'Hugging Face', 'LoRA', 'QLoRA', 'DeepSpeed', 'LLaMA', 'GPT'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/ai-finetune',
      humanUrl: 'https://ai-finetune.deepknow.network',
      websocketUrl: 'wss://api.deepknow.network/agents/ai-finetune/stream',
    },
    authentication: {
      schemes: ['jwt'],
      required: true,
      description: '需要JWT Token认证',
    },
    rating: 4.7,
    ratingCount: 203,
    avgResponseTime: 650,
    totalTransactions: 518,
    reputation: 92,
    status: 'active',
    pricing: {
      model: 'perToken',
      basePrice: 0.001,
      currency: 'SOL',
      description: '每千Token收费0.001 SOL',
    },
    provider: {
      name: 'AI Research Hub',
      description: 'AI研究和应用团队',
      email: 'research@aihub.dev',
      website: 'https://aihub.dev',
      verified: true,
    },
  },
  {
    id: 'agent-004',
    name: 'WebSocket实时通信',
    description: '实时通信架构专家，帮助设计和优化WebSocket、SSE等实时通信方案。支持百万级并发连接。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=websocket-expert',
    version: '1.2.0',
    createdAt: '2024-03-05T09:30:00Z',
    updatedAt: '2024-06-28T11:45:00Z',
    capabilities: [
      { name: '架构设计', description: '设计高并发实时通信架构', type: 'query', enabled: true },
      { name: '性能调优', description: '优化连接管理和消息路由', type: 'task', enabled: true },
      { name: '故障排查', description: '诊断连接问题和消息丢失', type: 'stream', enabled: true },
    ],
    skills: ['WebSocket', 'Socket.io', 'Redis', 'Node.js', 'Go', '负载均衡', '分布式系统'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/websocket-expert',
      humanUrl: 'https://websocket-expert.deepknow.network',
    },
    authentication: {
      schemes: ['none'],
      required: false,
      description: '无需认证',
    },
    rating: 4.6,
    ratingCount: 67,
    avgResponseTime: 450,
    totalTransactions: 189,
    reputation: 88,
    status: 'active',
    pricing: {
      model: 'free',
      basePrice: 0,
      currency: 'SOL',
      description: '免费使用',
    },
    provider: {
      name: 'Realtime Systems',
      description: '实时通信系统专家',
      email: 'contact@realtime.io',
      website: 'https://realtime.io',
      verified: false,
    },
  },
  {
    id: 'agent-005',
    name: '密码学算法顾问',
    description: '现代密码学专家，精通零知识证明、同态加密、多方计算等前沿技术。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=crypto-expert',
    version: '2.0.0',
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-07-12T16:30:00Z',
    capabilities: [
      { name: '算法选择', description: '推荐适合的密码学方案', type: 'query', enabled: true },
      { name: 'ZK证明', description: '零知识证明设计和实现', type: 'task', enabled: true },
      { name: '安全分析', description: '密码学协议安全性分析', type: 'query', enabled: true },
    ],
    skills: ['零知识证明', '同态加密', 'MPC', '椭圆曲线', 'SNARKs', 'STARKs', 'Bulletproofs'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/crypto-expert',
      humanUrl: 'https://crypto-expert.deepknow.network',
      docsUrl: 'https://docs.deepknow.network/agents/crypto-expert',
    },
    authentication: {
      schemes: ['apiKey'],
      required: true,
      description: '需要API Key认证',
    },
    rating: 4.9,
    ratingCount: 45,
    avgResponseTime: 1800,
    totalTransactions: 87,
    reputation: 96,
    status: 'busy',
    pricing: {
      model: 'perCall',
      basePrice: 0.3,
      currency: 'SOL',
      description: '每次咨询收费0.3 SOL',
    },
    provider: {
      name: 'CryptoLab Research',
      description: '密码学研究机构',
      email: 'research@cryptolab.org',
      website: 'https://cryptolab.org',
      verified: true,
    },
  },
  {
    id: 'agent-006',
    name: '前端性能优化',
    description: 'Web性能优化专家，专注于Core Web Vitals、渲染优化和资源加载策略。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=frontend-perf',
    version: '1.8.2',
    createdAt: '2024-02-15T11:00:00Z',
    updatedAt: '2024-07-08T10:00:00Z',
    capabilities: [
      { name: '性能审计', description: '全面分析网站性能问题', type: 'task', enabled: true },
      { name: '优化建议', description: '提供具体优化方案', type: 'query', enabled: true },
      { name: '代码重构', description: '重构建议和实施指导', type: 'task', enabled: true },
    ],
    skills: ['React', 'Next.js', 'Performance', 'Web Vitals', 'Lighthouse', 'Webpack', 'Vite'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/frontend-perf',
      humanUrl: 'https://frontend-perf.deepknow.network',
    },
    authentication: {
      schemes: ['none'],
      required: false,
      description: '无需认证',
    },
    rating: 4.5,
    ratingCount: 112,
    avgResponseTime: 380,
    totalTransactions: 267,
    reputation: 85,
    status: 'active',
    pricing: {
      model: 'free',
      basePrice: 0,
      currency: 'SOL',
      description: '免费使用',
    },
    provider: {
      name: 'WebPerf Team',
      description: 'Web性能优化团队',
      email: 'team@webperf.dev',
      website: 'https://webperf.dev',
      verified: false,
    },
  },
  {
    id: 'agent-007',
    name: '数据库架构师',
    description: '分布式数据库专家，精通PostgreSQL、MySQL、MongoDB和NewSQL数据库设计与优化。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=db-architect',
    version: '2.5.1',
    createdAt: '2024-01-25T15:30:00Z',
    updatedAt: '2024-07-11T08:45:00Z',
    capabilities: [
      { name: 'Schema设计', description: '数据库表结构设计', type: 'query', enabled: true },
      { name: '查询优化', description: 'SQL查询性能优化', type: 'task', enabled: true },
      { name: '分库分表', description: '分布式数据库架构', type: 'query', enabled: true },
      { name: '备份恢复', description: '数据备份和恢复策略', type: 'task', enabled: true },
    ],
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'TiDB', '分库分表'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/db-architect',
      humanUrl: 'https://db-architect.deepknow.network',
      docsUrl: 'https://docs.deepknow.network/agents/db-architect',
    },
    authentication: {
      schemes: ['jwt'],
      required: true,
      description: '需要JWT Token认证',
    },
    rating: 4.7,
    ratingCount: 78,
    avgResponseTime: 720,
    totalTransactions: 198,
    reputation: 91,
    status: 'active',
    pricing: {
      model: 'perCall',
      basePrice: 0.08,
      currency: 'SOL',
      description: '每次咨询收费0.08 SOL',
    },
    provider: {
      name: 'DB Masters',
      description: '数据库专家联盟',
      email: 'contact@dbmasters.io',
      website: 'https://dbmasters.io',
      verified: true,
    },
  },
  {
    id: 'agent-008',
    name: '微服务治理',
    description: '微服务架构和治理专家，提供服务网格、熔断、限流、链路追踪等解决方案。',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=microservices',
    version: '1.3.0',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-06-30T14:20:00Z',
    capabilities: [
      { name: '架构设计', description: '微服务拆分和架构设计', type: 'query', enabled: true },
      { name: '服务治理', description: '熔断、限流、降级策略', type: 'task', enabled: true },
      { name: '链路追踪', description: '分布式链路追踪方案', type: 'query', enabled: true },
    ],
    skills: ['微服务', 'Service Mesh', 'Istio', 'gRPC', 'Kubernetes', 'Consul', 'Nacos'],
    endpoints: {
      a2aUrl: 'https://api.deepknow.network/agents/microservices',
      humanUrl: 'https://microservices.deepknow.network',
    },
    authentication: {
      schemes: ['apiKey'],
      required: true,
      description: '需要API Key认证',
    },
    rating: 4.4,
    ratingCount: 56,
    avgResponseTime: 950,
    totalTransactions: 134,
    reputation: 87,
    status: 'inactive',
    pricing: {
      model: 'perCall',
      basePrice: 0.1,
      currency: 'SOL',
      description: '每次咨询收费0.1 SOL',
    },
    provider: {
      name: 'Cloud Architects',
      description: '云架构师团队',
      email: 'info@cloudarch.io',
      website: 'https://cloudarch.io',
      verified: false,
    },
  },
]

/**
 * 获取所有Agent
 */
export function getAllAgents(): AgentCard[] {
  return mockAgents
}

/**
 * 根据ID获取Agent
 */
export function getAgentById(id: string): AgentCard | undefined {
  return mockAgents.find(agent => agent.id === id)
}

/**
 * 按技能筛选Agent
 */
export function getAgentsBySkill(skill: string): AgentCard[] {
  return mockAgents.filter(agent =>
    agent.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  )
}

/**
 * 按状态筛选Agent
 */
export function getAgentsByStatus(status: AgentCard['status']): AgentCard[] {
  return mockAgents.filter(agent => agent.status === status)
}

/**
 * 获取验证过的Agent
 */
export function getVerifiedAgents(): AgentCard[] {
  return mockAgents.filter(agent => agent.provider.verified)
}

/**
 * 按评分排序Agent
 */
export function getTopRatedAgents(limit: number = 5): AgentCard[] {
  return [...mockAgents]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}
