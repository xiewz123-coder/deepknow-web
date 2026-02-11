// 详细知识内容数据 - 购买后可查阅

export interface KnowledgeItem {
  id: string
  title: string
  description: string
  content: string
  tags: string[]
  price: number
  owner: string
  reputation: number
  sales: number
  rating: number
  createdAt: string
}

export const knowledgeDatabase: KnowledgeItem[] = [
  {
    id: '1',
    title: 'K8s 生产环境故障排查指南',
    description: '基于 50+ 次生产事故的故障排查经验，涵盖 CrashLoopBackOff、OOMKilled 等常见问题',
    content: `# K8s 生产环境故障排查指南

> 基于 50+ 次生产事故的实战经验总结

---

## 1. CrashLoopBackOff 故障诊断

### 1.1 故障现象
Pod 状态显示 CrashLoopBackOff，容器反复重启

### 1.2 排查命令
\`\`\`bash
# 查看 Pod 事件
kubectl describe pod <pod-name>

# 查看容器日志
kubectl logs <pod-name> --previous

# 查看退出码
echo $?
\`\`\`

### 1.3 常见原因与解决方案

| 原因 | 排查方法 | 解决方案 |
|------|---------|---------|
| 启动命令错误 | 检查 command/args | 修正启动命令 |
| 资源不足 | 查看 LimitRange | 调整资源限制 |
| 健康检查失败 | 检查 livenessProbe | 调整探测参数 |
| 依赖服务不可用 | 检查服务连接 | 添加初始化容器 |

---

## 2. OOMKilled 内存优化

### 2.1 故障识别
Pod 状态：OOMKilled，Exit Code 137

### 2.2 内存分析
\`\`\`bash
# 查看内存使用
kubectl top pod <pod-name>

# 查看内存限制
kubectl get pod <pod-name> -o yaml | grep -A5 resources
\`\`\`

### 2.3 优化策略
1. **设置合理的内存限制**
   - requests: 实际使用量的 80%
   - limits: 实际使用量的 150%

2. **启用 VPA 自动扩缩容**
   \`\`\`yaml
   apiVersion: autoscaling.k8s.io/v1
   kind: VerticalPodAutoscaler
   metadata:
     name: my-app-vpa
   spec:
     targetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: my-app
     updatePolicy:
       updateMode: "Auto"
   \`\`\`

---

## 3. ImagePullBackOff 镜像拉取失败

### 3.1 排查清单
- [ ] 镜像标签是否正确
- [ ] 镜像仓库是否可访问
- [ ] ImagePullSecrets 是否配置
- [ ] 镜像是否存在

### 3.2 私有仓库配置
\`\`\`bash
# 创建镜像拉取密钥
kubectl create secret docker-registry regcred \\
  --docker-server=<your-registry-server> \\
  --docker-username=<your-name> \\
  --docker-password=<your-pword> \\
  --docker-email=<your-email>
\`\`\`

---

## 4. Pod 启动失败排查树

\`\`\`
Pod 处于 Pending?
├─ 是 → 检查资源配额 → 检查节点资源 → 检查调度约束
└─ 否 → Pod 处于 ContainerCreating?
    ├─ 是 → 检查存储卷 → 检查网络配置 → 检查镜像拉取
    └─ 否 → 查看容器日志 → 检查启动命令 → 检查配置文件
\`\`\`

---

## 5. 网络不通问题诊断

### 5.1 Service 无法访问
\`\`\`bash
# 检查 Endpoint
kubectl get endpoints <service-name>

# 测试服务连通性
kubectl run debug --rm -it --image=busybox -- /bin/sh
wget -O- http://<service-name>:<port>
\`\`\`

### 5.2 DNS 解析问题
\`\`\`bash
# 检查 CoreDNS
kubectl get pods -n kube-system -l k8s-app=kube-dns

# 测试 DNS 解析
nslookup kubernetes.default
\`\`\`

---

## 6. 预防措施

1. **配置监控告警**
   - Pod 重启次数 > 3 次/小时
   - 内存使用率 > 85%
   - 磁盘使用率 > 80%

2. **设置资源限制**
   - 所有容器必须设置 resources
   - 使用 LimitRange 强制默认值

3. **健康检查配置**
   - 配置合理的 livenessProbe
   - 配置 readinessProbe
   - 设置适当的 initialDelaySeconds

---

## 附录：常用排查命令速查表

| 场景 | 命令 |
|------|------|
| 查看 Pod 详情 | kubectl describe pod <name> |
| 查看日志 | kubectl logs <name> -f |
| 进入容器 | kubectl exec -it <name> -- /bin/sh |
| 查看资源使用 | kubectl top pod/node |
| 查看事件 | kubectl get events --sort-by=.metadata.creationTimestamp |

---

*文档版本: v1.0 | 最后更新: 2024-01-15*`,
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
    content: `# Solana 智能合约安全审计清单

> 全面的 Solana Program 安全审计指南

---

## 1. 账户验证检查

### 1.1 所有权验证
\`\`\`rust
// ❌ 错误：未验证账户所有权
let user_account = &mut ctx.accounts.user_account;
user_account.balance += amount;

// ✅ 正确：验证账户所有权
require!(
    ctx.accounts.user_account.owner == program_id,
    ErrorCode::InvalidAccountOwner
);
\`\`\`

### 1.2 签名验证
\`\`\`rust
// ❌ 错误：未验证签名
let authority = &ctx.accounts.authority;

// ✅ 正确：验证签名
require!(
    authority.is_signer,
    ErrorCode::MissingSignature
);
\`\`\`

### 1.3 PDA 验证
\`\`\`rust
// 验证 PDA 地址是否正确派生
let (expected_pda, bump) = Pubkey::find_program_address(
    &[b"user", authority.key().as_ref()],
    program_id
);
require!(
    ctx.accounts.user_pda.key() == expected_pda,
    ErrorCode::InvalidPDA
);
\`\`\`

---

## 2. 算术安全检查

### 2.1 整数溢出保护
\`\`\`rust
use anchor_lang::prelude::*;

// ❌ 错误：直接使用 + 运算符
let new_balance = account.balance + amount;

// ✅ 正确：使用 checked_add
let new_balance = account.balance
    .checked_add(amount)
    .ok_or(ErrorCode::Overflow)?;
\`\`\`

### 2.2 除零检查
\`\`\`rust
// ✅ 正确：检查除数不为零
require!(divisor != 0, ErrorCode::DivisionByZero);
let result = numerator.checked_div(divisor).ok_or(ErrorCode::Overflow)?;
\`\`\`

### 2.3 精度损失防护
\`\`\`rust
// 乘法先于除法，减少精度损失
let result = amount
    .checked_mul(rate)
    .ok_or(ErrorCode::Overflow)?
    .checked_div(10000)
    .ok_or(ErrorCode::Overflow)?;
\`\`\`

---

## 3. 重入攻击防护

### 3.1 状态更新先行
\`\`\`rust
// ✅ 正确：先更新状态，再转账
fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    let user = &mut ctx.accounts.user;

    // 1. 检查余额
    require!(user.balance >= amount, ErrorCode::InsufficientBalance);

    // 2. 先更新状态（关键！）
    user.balance = user.balance.checked_sub(amount).unwrap();

    // 3. 后执行转账
    **ctx.accounts.user.try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.recipient.try_borrow_mut_lamports()? += amount;

    Ok(())
}
\`\`\`

### 3.2 重入锁模式
\`\`\`rust
#[account]
pub struct ReentrancyGuard {
    locked: bool,
}

impl ReentrancyGuard {
    pub fn lock(&mut self) -> Result<()> {
        require!(!self.locked, ErrorCode::ReentrancyDetected);
        self.locked = true;
        Ok(())
    }

    pub fn unlock(&mut self) {
        self.locked = false;
    }
}
\`\`\`

---

## 4. CPI (跨程序调用) 安全

### 4.1 程序 ID 白名单
\`\`\`rust
// ✅ 正确：验证目标程序 ID
const ALLOWED_PROGRAMS: &[Pubkey] = &[
    spl_token::ID,
    spl_token_2022::ID,
];

require!(
    ALLOWED_PROGRAMS.contains(&cpi_program.key()),
    ErrorCode::UnauthorizedCPI
);
\`\`\`

### 4.2 账户权限控制
\`\`\`rust
// 限制 CPI 调用的账户权限
let cpi_accounts = Transfer {
    from: ctx.accounts.from.to_account_info(),
    to: ctx.accounts.to.to_account_info(),
    authority: ctx.accounts.authority.to_account_info(),
};

// 确保 authority 是当前程序控制的 PDA
let seeds = &[b"authority", &[bump]];
let signer = &[&seeds[..]];

let cpi_ctx = CpiContext::new_with_signer(
    ctx.accounts.token_program.to_account_info(),
    cpi_accounts,
    signer,
);
\`\`\`

---

## 5. 权限控制检查表

- [ ] 管理员函数有权限验证
- [ ] 敏感操作有多签要求
- [ ] 时间锁控制关键操作
- [ ] 暂停机制（Pause/Circuit Breaker）

### 5.1 管理员权限验证
\`\`\`rust
// ✅ 正确：验证管理员权限
pub fn admin_only(ctx: Context<AdminOnly>) -> Result<()> {
    require!(
        ctx.accounts.admin.key() == ADMIN_PUBKEY,
        ErrorCode::UnauthorizedAdmin
    );
    Ok(())
}
\`\`\`

---

## 6. 自动化审计工具

### 6.1 cargo-audit
\`\`\`bash
# 检查依赖漏洞
cargo audit
\`\`\`

### 6.2 sealevel-attacks 测试
\`\`\`bash
# 运行攻击模拟测试
cargo test-sbf --features test-attacks
\`\`\`

### 6.3 静态分析脚本
\`\`\`python
#!/usr/bin/env python3
"""Solana 合约安全检查脚本"""

import re
import sys

def check_arithmetic_overflow(file_path):
    """检查算术运算是否有溢出保护"""
    with open(file_path, 'r') as f:
        content = f.read()

    # 危险模式：直接使用 + - * /
    dangerous_patterns = [
        r'\w+\s*\+\s*\w+',
        r'\w+\s*\-\s*\w+',
        r'\w+\s*\*\s*\w+',
    ]

    issues = []
    for pattern in dangerous_patterns:
        matches = re.finditer(pattern, content)
        for match in matches:
            # 排除注释和字符串
            line_num = content[:match.start()].count('\n') + 1
            issues.append(f"Line {line_num}: 可能的未检查算术运算")

    return issues

def main():
    if len(sys.argv) < 2:
        print("Usage: python audit.py <program-file>")
        sys.exit(1)

    issues = check_arithmetic_overflow(sys.argv[1])
    if issues:
        print("⚠️  发现潜在问题：")
        for issue in issues:
            print(f"  - {issue}")
    else:
        print("✅ 未发现问题")

if __name__ == '__main__':
    main()
\`\`\`

---

## 附录：常见漏洞案例分析

| 漏洞类型 | 危害等级 | 典型案例 | 修复难度 |
|---------|---------|---------|---------|
| 整数溢出 | 🔴 高 | Wormhole 3.2亿 | 低 |
| 权限绕过 | 🔴 高 | Cashio 2800万 | 中 |
| 重入攻击 | 🟡 中 | Various | 低 |
| PDA 碰撞 | 🟡 中 | - | 中 |
| 账户验证缺失 | 🔴 高 | Multiple | 低 |

---

*文档版本: v1.2 | 最后更新: 2024-02-20*`,
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
    content: `# 向量数据库选型与性能优化指南

> 2024 年向量数据库全面评测与选型建议

---

## 1. 主流向量数据库对比

### 1.1 功能特性对比表

| 特性 | ChromaDB | Pinecone | Milvus | Weaviate | Qdrant |
|------|----------|----------|--------|----------|--------|
| 开源 | ✅ | ❌ | ✅ | ✅ | ✅ |
| 本地部署 | ✅ | ❌ | ✅ | ✅ | ✅ |
| 云托管 | ❌ | ✅ | ✅ | ✅ | ✅ |
| 混合搜索 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 多模态 | ❌ | ✅ | ✅ | ✅ | ❌ |
| 水平扩展 | 有限 | ✅ | ✅ | ✅ | ✅ |

### 1.2 性能基准测试

**测试环境**: 100万条 768维向量

| 数据库 | 写入 QPS | 查询延迟 (P99) | 内存占用 |
|--------|---------|---------------|---------|
| ChromaDB | 1,200 | 45ms | 4.2GB |
| Pinecone (p1) | 2,500 | 12ms | - |
| Milvus | 3,800 | 18ms | 6.8GB |
| Weaviate | 2,100 | 28ms | 5.1GB |
| Qdrant | 4,200 | 15ms | 5.5GB |

---

## 2. 选型决策树

\`\`\`
预算充足?
├─ 是 → 数据量 > 1000万?
│   ├─ 是 → Pinecone (托管省心)
│   └─ 否 → Weaviate (功能丰富)
└─ 否 → 需要本地部署?
    ├─ 是 → 数据量 > 100万?
    │   ├─ 是 → Milvus (企业级)
    │   └─ 否 → Qdrant (轻量快速)
    └─ 否 → ChromaDB (简单易用)
\`\`\`

---

## 3. ChromaDB 最佳实践

### 3.1 连接配置优化
\`\`\`python
import chromadb
from chromadb.config import Settings

# 生产环境配置
client = chromadb.PersistentClient(
    path="./chroma_db",
    settings=Settings(
        anonymized_telemetry=False,
        allow_reset=False,
        is_persistent=True,
    )
)

# 使用连接池
collection = client.get_or_create_collection(
    name="documents",
    metadata={"hnsw:space": "cosine"}  # 选择距离度量
)
\`\`\`

### 3.2 批量写入优化
\`\`\`python
from tqdm import tqdm

def batch_upsert(collection, documents, batch_size=1000):
    """批量写入以提高吞吐量"""
    for i in tqdm(range(0, len(documents), batch_size)):
        batch = documents[i:i+batch_size]
        collection.upsert(
            ids=[d['id'] for d in batch],
            embeddings=[d['embedding'] for d in batch],
            metadatas=[d['metadata'] for d in batch],
            documents=[d['text'] for d in batch]
        )
\`\`\`

---

## 4. Milvus 生产部署

### 4.1 Docker Compose 配置
\`\`\`yaml
version: '3.5'

services:
  etcd:
    image: quay.io/coreos/etcd:v3.5.5
    environment:
      - ETCD_AUTO_COMPACTION_MODE=revision
      - ETCD_AUTO_COMPACTION_RETENTION=1000
      - ETCD_QUOTA_BACKEND_BYTES=4294967296
    volumes:
      - etcd_data:/etcd
    command: etcd -advertise-client-urls=http://127.0.0.1:2379 -listen-client-urls http://0.0.0.0:2379 --data-dir /etcd

  minio:
    image: minio/minio:RELEASE.2023-03-20T20-16-18Z
    environment:
      MINIO_ACCESS_KEY: minioadmin
      MINIO_SECRET_KEY: minioadmin
    volumes:
      - minio_data:/minio_data
    command: minio server /minio_data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  standalone:
    image: milvusdb/milvus:v2.3.3
    command: ["milvus", "run", "standalone"]
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
    volumes:
      - milvus_data:/var/lib/milvus
    ports:
      - "19530:19530"
      - "9091:9091"
    depends_on:
      - etcd
      - minio

volumes:
  etcd_data:
  minio_data:
  milvus_data:
\`\`\`

### 4.2 集合设计优化
\`\`\`python
from pymilvus import Collection, FieldSchema, CollectionSchema, DataType

# 设计高性能集合 schema
fields = [
    FieldSchema(name="id", dtype=DataType.VARCHAR, max_length=36, is_primary=True),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=768),
    FieldSchema(name="category", dtype=DataType.VARCHAR, max_length=50),
    FieldSchema(name="timestamp", dtype=DataType.INT64),
    FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=65535),
]

schema = CollectionSchema(fields, "Optimized collection")
collection = Collection("documents", schema)

# 创建优化索引
index_params = {
    "metric_type": "COSINE",
    "index_type": "HNSW",
    "params": {
        "M": 16,              # 图的最大出度
        "efConstruction": 200  # 构建时的搜索范围
    }
}
collection.create_index(field_name="embedding", index_params=index_params)
\`\`\`

---

## 5. 查询性能调优

### 5.1 HNSW 参数调优

| 参数 | 说明 | 建议值 |
|------|------|--------|
| M | 图的连接数 | 8-64 (数据量越大，值越大) |
| efConstruction | 构建时搜索范围 | 100-500 |
| ef | 查询时搜索范围 | 32-512 (精度vs性能权衡) |

### 5.2 混合搜索策略
\`\`\`python
# 向量 + 过滤条件搜索
results = collection.search(
    data=[query_vector],
    anns_field="embedding",
    param={"metric_type": "COSINE", "params": {"ef": 64}},
    limit=10,
    expr='category == "tech" and timestamp > 1700000000',  # 过滤条件
    output_fields=["text", "category"]
)
\`\`\`

---

## 6. 大规模数据导入优化

### 6.1 并行导入
\`\`\`python
from multiprocessing import Pool
import numpy as np

def import_batch(batch_data):
    """单个批次导入"""
    collection = get_collection()  # 每个进程独立连接
    collection.insert(batch_data)
    return len(batch_data)

# 并行导入
def parallel_import(data, num_workers=8):
    batches = np.array_split(data, num_workers)
    with Pool(num_workers) as pool:
        results = pool.map(import_batch, batches)
    return sum(results)
\`\`\`

### 6.2 数据预处理
\`\`\`python
# 向量归一化（使用余弦相似度时）
def normalize_vectors(vectors):
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    return vectors / norms

# 降维（如果需要）
from sklearn.decomposition import PCA

pca = PCA(n_components=384)  # 从768维降到384维
reduced_vectors = pca.fit_transform(vectors)
\`\`\`

---

## 7. 监控与维护

### 7.1 关键监控指标

| 指标 | 告警阈值 | 说明 |
|------|---------|------|
| 查询延迟 P99 | > 100ms | 用户体验下降 |
| 内存使用率 | > 85% | 可能触发 OOM |
| 磁盘使用率 | > 80% | 需要扩容 |
| 索引构建时间 | > 1小时 | 影响新数据可见性 |

### 7.2 定期维护任务
\`\`\`bash
#!/bin/bash
# 维护脚本

# 1. 数据备份
mysqldump -u root -p milvus > backup_$(date +%Y%m%d).sql

# 2. 清理过期数据（保留90天）
curl -X POST http://localhost:9091/api/v1/cleanup \
  -d '{"older_than_days": 90}'

# 3. 索引优化
curl -X POST http://localhost:9091/api/v1/compact
\`\`\`

---

## 附录：选型速查表

| 场景 | 推荐方案 | 预估成本/月 |
|------|---------|------------|
| 原型开发/小项目 | ChromaDB | 免费 |
| 中型 SaaS | Qdrant 自托管 | $200-500 |
| 大规模生产 | Milvus 集群 | $1000+ |
| 无运维团队 | Pinecone | $70-2000 |
| 多模态搜索 | Weaviate | $300-1500 |

---

*文档版本: v1.1 | 最后更新: 2024-03-10*`,
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
    content: `# WebSocket 高并发架构设计

> 支撑百万级并发的实时通信系统架构

---

## 1. 架构总览

### 1.1 系统架构图

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        负载均衡层 (LB)                        │
│                    (Nginx / HAProxy / LVS)                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  WS Server 1 │ │  WS Server 2 │ │  WS Server N │
│   (Node 1)   │ │   (Node 2)   │ │   (Node N)   │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      消息队列层 (MQ)                          │
│                 (Redis / Kafka / RabbitMQ)                   │
└───────────────────────┬─────────────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      共享存储层                               │
│              (Redis Cluster / etcd / Database)               │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 2. 单机性能优化

### 2.1 连接数优化
\`\`\`go
// 调整系统限制
// /etc/security/limits.conf
* soft nofile 1000000
* hard nofile 1000000

// Go 服务器配置
package main

import (
    "net/http"
    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    // 禁用压缩以提高 CPU 效率
    EnableCompression: false,
    // 允许所有来源（生产环境请配置具体域名）
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

// 优化连接配置
type ConnConfig struct {
    // 写超时
    WriteWait time.Duration
    // 读超时（心跳间隔的 2-3 倍）
    PongWait time.Duration
    // 心跳发送间隔
    PingPeriod time.Duration
    // 最大消息大小
    MaxMessageSize int64
}

var defaultConfig = ConnConfig{
    WriteWait:      10 * time.Second,
    PongWait:       60 * time.Second,
    PingPeriod:     54 * time.Second,
    MaxMessageSize: 65536,
}
\`\`\`

### 2.2 内存优化策略
\`\`\`go
// 使用 sync.Pool 复用对象
var bufferPool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 1024)
    },
}

// 高效的消息广播
type Hub struct {
    clients    map[*Client]bool
    broadcast  chan []byte
    register   chan *Client
    unregister chan *Client
    mu         sync.RWMutex
}

func (h *Hub) Run() {
    for {
        select {
        case client := <-h.register:
            h.mu.Lock()
            h.clients[client] = true
            h.mu.Unlock()

        case client := <-h.unregister:
            h.mu.Lock()
            if _, ok := h.clients[client]; ok {
                delete(h.clients, client)
                close(client.send)
            }
            h.mu.Unlock()

        case message := <-h.broadcast:
            // 使用读锁并发广播
            h.mu.RLock()
            clients := make([]*Client, 0, len(h.clients))
            for client := range h.clients {
                clients = append(clients, client)
            }
            h.mu.RUnlock()

            // 使用 worker pool 限制并发
            for _, client := range clients {
                select {
                case client.send <- message:
                default:
                    // 发送缓冲区满，关闭连接
                    close(client.send)
                    h.mu.Lock()
                    delete(h.clients, client)
                    h.mu.Unlock()
                }
            }
        }
    }
}
\`\`\`

---

## 3. 分布式集群设计

### 3.1 基于用户 ID 的一致性哈希
\`\`\`go
package consistenthash

import (
    "hash/crc32"
    "sort"
    "strconv"
)

type Hash func(data []byte) uint32

type Map struct {
    hash     Hash
    replicas int            // 虚拟节点数
    keys     []int          // 排序后的哈希环
    hashMap  map[int]string // 哈希 -> 节点映射
}

func New(replicas int, fn Hash) *Map {
    m := &Map{
        replicas: replicas,
        hash:     fn,
        hashMap:  make(map[int]string),
    }
    if m.hash == nil {
        m.hash = crc32.ChecksumIEEE
    }
    return m
}

// 添加节点
func (m *Map) Add(keys ...string) {
    for _, key := range keys {
        for i := 0; i < m.replicas; i++ {
            hash := int(m.hash([]byte(strconv.Itoa(i) + key)))
            m.keys = append(m.keys, hash)
            m.hashMap[hash] = key
        }
    }
    sort.Ints(m.keys)
}

// 获取用户对应的节点
func (m *Map) Get(key string) string {
    if len(m.keys) == 0 {
        return ""
    }
    hash := int(m.hash([]byte(key)))
    // 二分查找最近的节点
    idx := sort.Search(len(m.keys), func(i int) bool {
        return m.keys[i] >= hash
    })
    if idx == len(m.keys) {
        idx = 0
    }
    return m.hashMap[m.keys[idx]]
}
\`\`\`

### 3.2 跨节点消息路由
\`\`\`go
// 基于 Redis Pub/Sub 的消息路由
type MessageRouter struct {
    redis     *redis.Client
    localHub  *Hub
    nodeID    string
}

func (r *MessageRouter) Start() {
    pubsub := r.redis.Subscribe(context.Background(), "broadcast", "user:*")
    ch := pubsub.Channel()

    for msg := range ch {
        switch {
        case msg.Channel == "broadcast":
            // 广播到本地所有客户端
            r.localHub.broadcast <- []byte(msg.Payload)

        case strings.HasPrefix(msg.Channel, "user:"):
            // 发送到特定用户
            userID := strings.TrimPrefix(msg.Channel, "user:")
            if client := r.localHub.GetClient(userID); client != nil {
                client.send <- []byte(msg.Payload)
            }
        }
    }
}

// 发送消息到特定用户（可能位于其他节点）
func (r *MessageRouter) SendToUser(userID string, message []byte) error {
    // 1. 检查本地
    if client := r.localHub.GetClient(userID); client != nil {
        client.send <- message
        return nil
    }

    // 2. 发布到 Redis，让对应节点接收
    return r.redis.Publish(context.Background(), "user:"+userID, message).Err()
}
\`\`\`

---

## 4. 心跳与断线重连

### 4.1 心跳机制
\`\`\`go
type Client struct {
    hub      *Hub
    conn     *websocket.Conn
    send     chan []byte
    userID   string
    lastPong time.Time
}

func (c *Client) writePump() {
    ticker := time.NewTicker(pingPeriod)
    defer func() {
        ticker.Stop()
        c.conn.Close()
    }()

    for {
        select {
        case message, ok := <-c.send:
            c.conn.SetWriteDeadline(time.Now().Add(writeWait))
            if !ok {
                c.conn.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }

            w, err := c.conn.NextWriter(websocket.TextMessage)
            if err != nil {
                return
            }
            w.Write(message)

            // 合并多个消息一起发送
            n := len(c.send)
            for i := 0; i < n; i++ {
                w.Write(newline)
                w.Write(<-c.send)
            }

            if err := w.Close(); err != nil {
                return
            }

        case <-ticker.C:
            c.conn.SetWriteDeadline(time.Now().Add(writeWait))
            if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
                return
            }
        }
    }
}

func (c *Client) readPump() {
    defer func() {
        c.hub.unregister <- c
        c.conn.Close()
    }()

    c.conn.SetReadLimit(maxMessageSize)
    c.conn.SetReadDeadline(time.Now().Add(pongWait))
    c.conn.SetPongHandler(func(string) error {
        c.conn.SetReadDeadline(time.Now().Add(pongWait))
        c.lastPong = time.Now()
        return nil
    })

    for {
        _, message, err := c.conn.ReadMessage()
        if err != nil {
            if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
                log.Printf("error: %v", err)
            }
            break
        }
        c.hub.handleMessage(c, message)
    }
}
\`\`\`

### 4.2 客户端重连策略
\`\`\`typescript
class WebSocketClient {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 10;
    private reconnectDelay = 1000;
    private messageQueue: string[] = [];

    connect() {
        this.ws = new WebSocket('wss://api.example.com/ws');

        this.ws.onopen = () => {
            console.log('Connected');
            this.reconnectAttempts = 0;
            // 发送队列中的消息
            while (this.messageQueue.length > 0) {
                this.send(this.messageQueue.shift()!);
            }
        };

        this.ws.onclose = () => {
            this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    private attemptReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnect attempts reached');
            return;
        }

        // 指数退避
        const delay = Math.min(
            this.reconnectDelay * Math.pow(2, this.reconnectAttempts),
            30000 // 最大 30 秒
        );

        setTimeout(() => {
            this.reconnectAttempts++;
            console.log('Reconnecting... attempt', this.reconnectAttempts);
            this.connect();
        }, delay);
    }

    send(message: string) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            this.messageQueue.push(message);
        }
    }
}
\`\`\`

---

## 5. 监控与告警

### 5.1 Prometheus 指标
\`\`\`go
package metrics

import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
)

var (
    ConnectionsActive = promauto.NewGauge(prometheus.GaugeOpts{
        Name: "websocket_connections_active",
        Help: "Current active WebSocket connections",
    })

    MessagesTotal = promauto.NewCounterVec(prometheus.CounterOpts{
        Name: "websocket_messages_total",
        Help: "Total WebSocket messages",
    }, []string{"direction"}) // in/out

    MessageLatency = promauto.NewHistogram(prometheus.HistogramOpts{
        Name:    "websocket_message_latency_seconds",
        Help:    "Message processing latency",
        Buckets: prometheus.DefBuckets,
    })

    ErrorsTotal = promauto.NewCounterVec(prometheus.CounterOpts{
        Name: "websocket_errors_total",
        Help: "Total WebSocket errors",
    }, []string{"type"})
)

// 在代码中使用
func (h *Hub) handleMessage(client *Client, msg []byte) {
    start := time.Now()
    defer func() {
        metrics.MessageLatency.Observe(time.Since(start).Seconds())
    }()

    metrics.MessagesTotal.WithLabelValues("in").Inc()

    // 处理消息...
}
\`\`\`

---

## 6. 压测配置

### 6.1 使用 k6 进行压测
\`\`\`javascript
// ws-load-test.js
import ws from 'k6/ws';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 10000 },    // 逐步增加到 1 万连接
    { duration: '5m', target: 10000 },    // 保持 5 分钟
    { duration: '2m', target: 50000 },    // 增加到 5 万连接
    { duration: '5m', target: 50000 },    // 保持 5 分钟
    { duration: '2m', target: 0 },        // 逐步减少
  ],
  thresholds: {
    ws_connecting_duration: ['p(95)<500'], // 95% 连接建立时间 < 500ms
  },
};

export default function () {
  const url = 'wss://api.example.com/ws';

  const res = ws.connect(url, null, function (socket) {
    socket.on('open', () => {
      socket.send(JSON.stringify({ type: 'subscribe', channel: 'updates' }));
    });

    socket.on('message', (data) => {
      check(data, {
        'message is valid': (r) => r.length > 0,
      });
    });

    socket.setTimeout(function () {
      socket.close();
    }, 30000);
  });

  check(res, {
    'status is 101': (r) => r && r.status === 101,
  });

  sleep(1);
}
\`\`\`

---

## 性能基准

| 指标 | 单机性能 | 集群性能 (10节点) |
|------|---------|------------------|
| 并发连接 | 100,000 | 1,000,000+ |
| 消息吞吐量 | 50,000 msg/s | 500,000 msg/s |
| 延迟 P99 | < 50ms | < 100ms |
| 内存占用 | ~8GB | ~80GB |

---

*文档版本: v1.0 | 最后更新: 2024-01-28*`,
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
    content: `# LLM Prompt Engineering 进阶指南

> 高级提示工程技巧，让 AI 输出质量提升 200%

---

## 1. Chain-of-Thought (思维链)

### 1.1 基础思维链
\`\`\`
❌ 简单提问：
"小明有 10 个苹果，给了小红 3 个，又买了 5 个，还剩几个？"

✅ 思维链提示：
"请逐步解决这个问题：
小明有 10 个苹果，给了小红 3 个，又买了 5 个，还剩几个？

请按以下步骤思考：
1. 初始数量是多少？
2. 第一次变化后数量是多少？
3. 第二次变化后数量是多少？
4. 最终答案是什么？"
\`\`\`

### 1.2 Few-shot CoT 示例
\`\`\`
以下是几个逐步推理的示例：

问题：一个农场有 5 只鸡和 3 只兔子，一共有多少条腿？
推理：
1. 每只鸡有 2 条腿，5 只鸡有 5×2=10 条腿
2. 每只兔子有 4 条腿，3 只兔子有 3×4=12 条腿
3. 总共 10+12=22 条腿
答案：22

问题：一本书 120 页，小明每天看 15 页，需要几天看完？
推理：
1. 总页数是 120 页
2. 每天看 15 页
3. 需要 120÷15=8 天
答案：8

问题：[你的问题]
推理：
\`\`\`

---

## 2. 角色设定与上下文管理

### 2.1 系统角色设定
\`\`\`
你是一位资深的技术架构师，拥有 15 年分布式系统开发经验。
你的专长包括：
- 微服务架构设计
- 高并发系统优化
- 云原生技术应用

在回答问题时，请：
1. 从架构师的角度分析方案优劣
2. 提供具体的代码示例
3. 指出潜在的技术风险
4. 给出可落地的实施建议
\`\`\`

### 2.2 动态角色切换
\`\`\`
请扮演以下角色回答我的问题：

【角色】：代码审查专家
【风格】：严谨、挑剔、注重细节
【任务】：审查以下代码，找出潜在问题
【输出格式】：
- 🔴 严重问题：[说明]
- 🟡 改进建议：[说明]
- 🟢 良好实践：[说明]

代码：
[code]
\`\`\`

---

## 3. 输出格式控制

### 3.1 JSON 结构化输出
\`\`\`
请将以下信息整理成 JSON 格式：

要求：
{
  "product_name": "产品名称（字符串）",
  "features": ["特性列表（字符串数组）"],
  "pricing": {
    "basic": "基础版价格（数字）",
    "pro": "专业版价格（数字）"
  },
  "target_users": ["目标用户群体（数组）"]
}

原始信息：
[输入文本]
\`\`\`

### 3.2 Markdown 表格
\`\`\`
请将以下数据整理成 Markdown 表格：

表格列：功能、适用场景、价格、推荐指数(1-5)

数据：
- 功能A：适合小型团队，免费，推荐度4
- 功能B：适合企业用户，$99/月，推荐度5
- 功能C：适合个人使用，$9/月，推荐度3
\`\`\`

### 3.3 思维导图格式
\`\`\`
请用文本层级结构（适合制作思维导图）输出：

主题：[主题]

要求：
1. 使用缩进表示层级关系
2. 最多 3 个层级
3. 每个层级最多 5 个分支
4. 使用简洁的关键词

示例格式：
├── 一级主题
│   ├── 二级主题
│   │   ├── 三级主题
│   │   └── 三级主题
│   └── 二级主题
└── 一级主题
\`\`\`

---

## 4. 幻觉问题缓解

### 4.1 不确定时承认限制
\`\`\`
当你回答问题时，请遵循以下原则：

1. 如果你不确定答案，明确说"我不确定"或"我需要更多信息"
2. 如果问题涉及最新事件（2024年后），说明知识截止日期
3. 区分事实和推测，推测前加上"我认为"或"可能"
4. 如果涉及专业建议（医疗、法律等），建议咨询专业人士

问题：[用户问题]
\`\`\`

### 4.2 引用验证
\`\`\`
请回答以下问题，并在回答中标注信息来源：

问题：[问题]

要求：
1. 如果能确定事实，用【事实】标注
2. 如果是基于常识的推断，用【推断】标注
3. 如果是不确定的信息，用【待验证】标注
4. 如果可以找到来源，附上参考链接
\`\`\`

---

## 5. 成本优化技巧

### 5.1 提示压缩
\`\`\`
❌ 冗长提示：
"请你帮我分析一下下面的这段代码有什么问题。我最近在写一个 Python 程序，但是遇到了一些困难。这段代码是用来处理用户输入的，但是我感觉它不够安全。请你仔细看看，然后告诉我哪里有问题，以及应该怎么修改。"

✅ 精简提示：
"审查以下 Python 代码的安全漏洞，按严重程度列出：

代码：
[user_input = input(); eval(user_input)]

输出格式：漏洞类型 | 风险等级 | 修复代码"
\`\`\`

### 5.2 分块处理长文本
\`\`\`
任务：总结这篇长文档的要点

文档已分为 5 个部分。请先总结每个部分，然后给出整体摘要。

【第 1/5 部分】
[文本片段]

请总结这部分的 3 个关键点：
\`\`\`

---

## 6. 高级技巧模板

### 6.1 自我一致性验证
\`\`\`
请用 3 种不同的方法回答这个问题，然后比较结果是否一致：

问题：[问题]

方法 1：直接计算
方法 2：反向验证
方法 3：类比推理

如果结果不一致，请分析原因并给出最可能的正确答案。
\`\`\`

### 6.2 对抗性提示
\`\`\`
我需要你评估两个相反的观点：

观点 A：[观点1]
观点 B：[观点2]

请分别：
1. 为观点 A 提供最强有力的 3 个论据
2. 为观点 B 提供最强有力的 3 个论据
3. 分析哪个观点的证据更充分
4. 提出一个综合两个观点的折中方案
\`\`\`

### 6.3 递归改进
\`\`\`
请帮我改进以下文本。我们将进行多轮迭代：

【原始文本】
[文本]

【第 1 轮】请先列出 3 个主要改进点
【第 2 轮】基于改进点重写文本
【第 3 轮】进一步优化，使文本更简洁有力

请直接输出第 3 轮的最终结果，并简要说明改进过程。
\`\`\`

---

## 7. 场景化模板

### 7.1 代码生成
\`\`\`
请生成一个 [Python/JavaScript/Go] 函数，实现 [功能描述]。

要求：
- 输入：[参数说明]
- 输出：[返回值说明]
- 处理边界情况：[特殊情况]
- 时间复杂度：[要求]
- 包含完整的类型注解/注释
- 包含 3 个单元测试用例
\`\`\`

### 7.2 文本改写
\`\`\`
请将以下文本改写成适合 [目标场景] 的版本。

【目标场景】：技术博客/微博/学术报告/产品文档
【风格要求】：专业/轻松/严谨/活泼
【字数限制】：200字以内

原文：
[文本]
\`\`\`

### 7.3 数据分析
\`\`\`
请分析以下数据并给出洞察：

数据：
[CSV/JSON 数据]

请提供：
1. 关键统计指标（均值、中位数、极值）
2. 趋势分析（上升/下降/波动）
3. 异常点识别
4. 可执行的优化建议
5. 可视化图表描述（Mermaid 语法）
\`\`\`

---

## 附录：Prompt 优化检查清单

- [ ] 指令是否清晰具体？
- [ ] 是否提供了足够的上下文？
- [ ] 是否指定了输出格式？
- [ ] 是否包含示例（Few-shot）？
- [ ] 是否设置了约束条件？
- [ ] 是否考虑了边界情况？
- [ ] 是否要求逐步推理（CoT）？
- [ ] 是否指定了角色/风格？

---

*文档版本: v1.0 | 最后更新: 2024-04-05*`,
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
    content: `# 端到端加密通信协议实现

> ECDH + AES-256-GCM 工程化实现完整指南

---

## 1. 协议概述

### 1.1 加密流程

\`\`\`
┌─────────┐                    ┌─────────┐
│  Alice  │                    │   Bob   │
└────┬────┘                    └────┬────┘
     │                              │
     │  1. 生成临时密钥对 (ECDH)     │
     │  ──────────────────────────> │
     │     公钥 A                   │
     │                              │
     │                              │  2. 生成临时密钥对
     │     公钥 B                   │
     │  <────────────────────────── │
     │                              │
     │  3. 双方计算共享密钥          │
     │     Shared = ECDH(私钥, 对方公钥) │
     │                              │
     │  4. HKDF 派生加密密钥         │
     │     Key = HKDF(Shared, 盐值) │
     │                              │
     │  5. AES-256-GCM 加密通信      │
     │  ==========================> │
     │     密文 + Tag + Nonce       │
     │                              │
\`\`\`

### 1.2 安全特性

| 特性 | 说明 | 实现方式 |
|------|------|---------|
| 前向保密 | 长期密钥泄露不影响历史会话 | 每次会话生成临时 ECDH 密钥 |
| 身份认证 | 防止中间人攻击 | 结合数字签名验证身份 |
| 完整性保护 | 防止消息篡改 | AES-GCM 认证加密 |
| 重放保护 | 防止消息重放 | 包含时间戳和序列号 |

---

## 2. Python 实现

### 2.1 依赖安装
\`\`\`bash
pip install cryptography pycryptodome
\`\`\`

### 2.2 完整实现
\`\`\`python
import os
import hashlib
from typing import Tuple, Dict
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.backends import default_backend
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

class E2EEncryption:
    """端到端加密实现 (ECDH + AES-256-GCM)"""

    def __init__(self):
        self.curve = ec.SECP256R1()  # P-256 曲线
        self.backend = default_backend()

    def generate_keypair(self) -> Tuple[ec.EllipticCurvePrivateKey, ec.EllipticCurvePublicKey]:
        """生成 ECDH 密钥对"""
        private_key = ec.generate_private_key(self.curve, self.backend)
        public_key = private_key.public_key()
        return private_key, public_key

    def derive_shared_secret(
        self,
        private_key: ec.EllipticCurvePrivateKey,
        peer_public_key: ec.EllipticCurvePublicKey
    ) -> bytes:
        """计算共享密钥"""
        shared_secret = private_key.exchange(ec.ECDH(), peer_public_key)
        return shared_secret

    def derive_encryption_key(
        self,
        shared_secret: bytes,
        salt: bytes = None,
        info: bytes = b'e2e-encryption-v1'
    ) -> bytes:
        """使用 HKDF 派生加密密钥"""
        if salt is None:
            salt = os.urandom(32)

        hkdf = HKDF(
            algorithm=hashes.SHA256(),
            length=32,  # AES-256 需要 32 字节密钥
            salt=salt,
            info=info,
            backend=self.backend
        )
        return hkdf.derive(shared_secret)

    def encrypt(
        self,
        plaintext: bytes,
        key: bytes,
        associated_data: bytes = None
    ) -> Dict[str, bytes]:
        """AES-256-GCM 加密"""
        nonce = get_random_bytes(12)  # GCM 推荐 96 位 nonce

        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)

        if associated_data:
            cipher.update(associated_data)

        ciphertext, tag = cipher.encrypt_and_digest(plaintext)

        return {
            'ciphertext': ciphertext,
            'nonce': nonce,
            'tag': tag
        }

    def decrypt(
        self,
        ciphertext: bytes,
        key: bytes,
        nonce: bytes,
        tag: bytes,
        associated_data: bytes = None
    ) -> bytes:
        """AES-256-GCM 解密"""
        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)

        if associated_data:
            cipher.update(associated_data)

        plaintext = cipher.decrypt_and_verify(ciphertext, tag)
        return plaintext

    def public_key_to_bytes(self, public_key: ec.EllipticCurvePublicKey) -> bytes:
        """公钥序列化"""
        return public_key.public_bytes(
            encoding=serialization.Encoding.X962,
            format=serialization.PublicFormat.UncompressedPoint
        )

    def public_key_from_bytes(self, data: bytes) -> ec.EllipticCurvePublicKey:
        """公钥反序列化"""
        return ec.EllipticCurvePublicKey.from_encoded_point(self.curve, data)


# 使用示例
class SecureSession:
    """安全会话管理"""

    def __init__(self):
        self.e2e = E2EEncryption()
        self.private_key = None
        self.public_key = None
        self.encryption_key = None

    def initiate_handshake(self) -> bytes:
        """发起握手，返回公钥"""
        self.private_key, self.public_key = self.e2e.generate_keypair()
        return self.e2e.public_key_to_bytes(self.public_key)

    def complete_handshake(self, peer_public_key_bytes: bytes) -> None:
        """完成握手，生成共享密钥"""
        peer_public_key = self.e2e.public_key_from_bytes(peer_public_key_bytes)
        shared_secret = self.e2e.derive_shared_secret(self.private_key, peer_public_key)
        self.encryption_key = self.e2e.derive_encryption_key(shared_secret)

    def send_message(self, plaintext: str) -> Dict[str, bytes]:
        """加密发送消息"""
        timestamp = str(int(time.time())).encode()
        plaintext_bytes = plaintext.encode('utf-8')

        # 关联数据包含时间戳，防止重放
        return self.e2e.encrypt(
            plaintext_bytes,
            self.encryption_key,
            associated_data=timestamp
        )

    def receive_message(self, encrypted: Dict[str, bytes], timestamp: int) -> str:
        """解密接收消息"""
        plaintext = self.e2e.decrypt(
            encrypted['ciphertext'],
            self.encryption_key,
            encrypted['nonce'],
            encrypted['tag'],
            associated_data=str(timestamp).encode()
        )
        return plaintext.decode('utf-8')


# 完整通信示例
if __name__ == '__main__':
    import time

    # Alice 和 Bob 各自创建会话
    alice = SecureSession()
    bob = SecureSession()

    # 1. 握手阶段
    alice_pubkey = alice.initiate_handshake()
    bob_pubkey = bob.initiate_handshake()

    # 2. 交换公钥并生成共享密钥
    alice.complete_handshake(bob_pubkey)
    bob.complete_handshake(alice_pubkey)

    # 3. 加密通信
    message = "Hello, Bob! This is a secret message."
    encrypted = alice.send_message(message)
    print(f"加密后: {encrypted['ciphertext'].hex()[:50]}...")

    # 4. 解密消息
    decrypted = bob.receive_message(encrypted, int(time.time()))
    print(f"解密后: {decrypted}")
\`\`\`

---

## 3. TypeScript/JavaScript 实现

### 3.1 WebCrypto API 实现
\`\`\`typescript
// e2e-crypto.ts
export class E2EEncryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly CURVE = 'P-256';

  // 生成 ECDH 密钥对
  async generateKeyPair(): Promise<CryptoKeyPair> {
    return await crypto.subtle.generateKey(
      {
        name: 'ECDH',
        namedCurve: E2EEncryption.CURVE,
      },
      false, // 不可导出
      ['deriveKey']
    );
  }

  // 派生共享密钥
  async deriveSharedSecret(
    privateKey: CryptoKey,
    publicKey: CryptoKey
  ): Promise<CryptoKey> {
    return await crypto.subtle.deriveKey(
      {
        name: 'ECDH',
        public: publicKey,
      },
      privateKey,
      {
        name: E2EEncryption.ALGORITHM,
        length: E2EEncryption.KEY_LENGTH,
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // 导出公钥
  async exportPublicKey(publicKey: CryptoKey): Promise<ArrayBuffer> {
    return await crypto.subtle.exportKey('raw', publicKey);
  }

  // 导入公钥
  async importPublicKey(keyData: ArrayBuffer): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
      'raw',
      keyData,
      {
        name: 'ECDH',
        namedCurve: E2EEncryption.CURVE,
      },
      false,
      []
    );
  }

  // 加密
  async encrypt(
    plaintext: string,
    key: CryptoKey,
    associatedData?: ArrayBuffer
  ): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array; tag: ArrayBuffer }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();

    const ciphertext = await crypto.subtle.encrypt(
      {
        name: E2EEncryption.ALGORITHM,
        iv,
        additionalData: associatedData,
        tagLength: 128,
      },
      key,
      encoder.encode(plaintext)
    );

    return {
      ciphertext,
      iv,
      tag: ciphertext.slice(-16), // GCM tag 是最后 16 字节
    };
  }

  // 解密
  async decrypt(
    ciphertext: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array,
    associatedData?: ArrayBuffer
  ): Promise<string> {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: E2EEncryption.ALGORITHM,
        iv,
        additionalData: associatedData,
        tagLength: 128,
      },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }
}

// React Hook 示例
export function useSecureChat() {
  const [sessionKey, setSessionKey] = useState<CryptoKey | null>(null);
  const e2e = useRef(new E2EEncryption());

  const initiateHandshake = async () => {
    const keyPair = await e2e.current.generateKeyPair();
    // 存储私钥，发送公钥给对方
    const publicKeyBuffer = await e2e.current.exportPublicKey(keyPair.publicKey);
    return Buffer.from(publicKeyBuffer).toString('base64');
  };

  const completeHandshake = async (peerPublicKeyBase64: string) => {
    const peerKeyData = Buffer.from(peerPublicKeyBase64, 'base64');
    const peerPublicKey = await e2e.current.importPublicKey(peerKeyData);
    // 假设我们有之前保存的私钥
    // const sharedKey = await e2e.current.deriveSharedSecret(privateKey, peerPublicKey);
    // setSessionKey(sharedKey);
  };

  const sendEncrypted = async (message: string) => {
    if (!sessionKey) throw new Error('Session not established');
    return await e2e.current.encrypt(message, sessionKey);
  };

  return { initiateHandshake, completeHandshake, sendEncrypted };
}
\`\`\`

---

## 4. Go 实现

### 4.1 完整实现
\`\`\`go
package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/ecdh"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"io"

	"golang.org/x/crypto/hkdf"
)

type E2ECipher struct {
	curve ecdh.Curve
}

func NewE2ECipher() (*E2ECipher, error) {
	curve := ecdh.X25519()
	return &E2ECipher{curve: curve}, nil
}

func (e *E2ECipher) GenerateKeyPair() (ecdh.PrivateKey, ecdh.PublicKey, error) {
	privateKey, err := e.curve.GenerateKey(rand.Reader)
	if err != nil {
		return nil, nil, err
	}
	return privateKey, privateKey.PublicKey(), nil
}

func (e *E2ECipher) DeriveSharedSecret(privateKey ecdh.PrivateKey, publicKey ecdh.PublicKey) ([]byte, error) {
	return privateKey.ECDH(publicKey)
}

func (e *E2ECipher) DeriveEncryptionKey(sharedSecret []byte, salt []byte) ([]byte, error) {
	hkdfReader := hkdf.New(sha256.New, sharedSecret, salt, []byte("e2e-encryption"))

	key := make([]byte, 32) // AES-256
	if _, err := io.ReadFull(hkdfReader, key); err != nil {
		return nil, err
	}
	return key, nil
}

func (e *E2ECipher) Encrypt(plaintext []byte, key []byte) ([]byte, []byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, nil, err
	}

	nonce := make([]byte, 12)
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, nil, err
	}

	aesgcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, nil, err
	}

	ciphertext := aesgcm.Seal(nil, nonce, plaintext, nil)
	return ciphertext, nonce, nil
}

func (e *E2ECipher) Decrypt(ciphertext []byte, key []byte, nonce []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	aesgcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	return aesgcm.Open(nil, nonce, ciphertext, nil)
}

// 使用示例
func main() {
	cipher, _ := NewE2ECipher()

	// Alice
	alicePriv, alicePub, _ := cipher.GenerateKeyPair()

	// Bob
	bobPriv, bobPub, _ := cipher.GenerateKeyPair()

	// 交换公钥，各自计算共享密钥
	aliceShared, _ := cipher.DeriveSharedSecret(alicePriv, bobPub)
	bobShared, _ := cipher.DeriveSharedSecret(bobPriv, alicePub)

	// 派生加密密钥
	salt := make([]byte, 32)
	rand.Read(salt)

	aliceKey, _ := cipher.DeriveEncryptionKey(aliceShared, salt)
	bobKey, _ := cipher.DeriveEncryptionKey(bobShared, salt)

	// Alice 加密
	message := []byte("Hello from Alice!")
	encrypted, nonce, _ := cipher.Encrypt(message, aliceKey)

	fmt.Printf("Encrypted: %s\\n", base64.StdEncoding.EncodeToString(encrypted))

	// Bob 解密
	decrypted, _ := cipher.Decrypt(encrypted, bobKey, nonce)
	fmt.Printf("Decrypted: %s\\n", string(decrypted))
}
\`\`\`

---

## 5. 安全注意事项

### 5.1 密钥管理

| 密钥类型 | 存储方式 | 生命周期 |
|---------|---------|---------|
| ECDH 临时私钥 | 内存（不可导出） | 单次会话 |
| 派生加密密钥 | 内存 | 单次会话 |
| 长期身份密钥 | 硬件安全模块/Keychain | 永久 |

### 5.2 常见攻击防护

\`\`\`
攻击类型              防护措施
───────────────────────────────────────────────
中间人攻击            身份密钥签名验证
重放攻击              时间戳 + Nonce
密钥泄露              前向保密（每次会话新密钥）
流量分析              固定长度填充
侧信道攻击            常量时间算法
\`\`\`

---

*文档版本: v1.0 | 最后更新: 2024-02-14*`,
    tags: ['security', 'encryption', 'cryptography'],
    price: 6.0,
    owner: 'Crypto_Expert',
    reputation: 2000,
    sales: 93,
    rating: 5.0,
    createdAt: '2024-02-14',
  },
]

// 获取知识内容
export function getKnowledgeById(id: string): KnowledgeItem | undefined {
  return knowledgeDatabase.find(item => item.id === id)
}

// 获取所有知识
export function getAllKnowledge(): KnowledgeItem[] {
  return knowledgeDatabase
}
