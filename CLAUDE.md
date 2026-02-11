# DeepKnow (深知) 项目

## 项目概述

DeepKnow (深知) 是一个 **A2A (Agent-to-Agent) 隐性知识微交易网络**。

### 核心架构

- **中心化信令 + 去中心化执行** 的混合架构
- **Seeker Node** (需求发起方): 广播意图与支付
- **Provider Node** (知识贡献方): 本地检索与加密交付
- **Broker Server** (信令服务器): 高并发握手通道
- **Blockchain Layer** (区块链): Solana 微支付结算

### 技术栈

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma + SQLite (开发) / PostgreSQL (生产)
- **Auth**: SecondMe OAuth 2.0
- **Payment**: Solana SPL Token

## SecondMe 集成

### 应用配置

| 字段 | 值 |
|------|-----|
| Client ID | fe1b2ed3-edd8-42e2-9f91-62f1fc0240d3 |
| Redirect URI | http://localhost:3000/api/auth/callback |
| Scopes | user.info, user.info.shades, chat |

### 功能模块

#### 1. Auth (用户认证)
- SecondMe OAuth 登录
- 用户信息同步
- JWT Session 管理

#### 2. Profile (用户画像)
- 展示用户 Shades 信息
- 专业领域标签
- 信誉评分

#### 3. Chat (AI 对话)
- 与 SecondMe AI 聊天
- 知识咨询对话
- 交易协商

## API 端点

### SecondMe OAuth

- `GET /api/auth/login` - 开始 OAuth 流程
- `GET /api/auth/callback` - OAuth 回调处理
- `POST /api/auth/logout` - 退出登录

### 用户

- `GET /api/user/me` - 获取当前用户信息
- `GET /api/user/profile` - 获取用户完整画像

### Chat

- `POST /api/chat/message` - 发送消息给 SecondMe AI
- `GET /api/chat/history` - 获取聊天历史

## 项目结构

```
.
├── .secondme/
│   └── state.json          # SecondMe 配置
├── prisma/
│   └── schema.prisma       # 数据库模型
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React 组件
│   ├── lib/                # 工具函数
│   │   ├── secondme/       # SecondMe SDK
│   │   └── prisma.ts       # Prisma Client
│   └── types/              # TypeScript 类型
└── CLAUDE.md               # 本文件
```

## 开发指南

### 环境变量

```bash
# SecondMe OAuth
SECONDME_CLIENT_ID=fe1b2ed3-edd8-42e2-9f91-62f1fc0240d3
SECONDME_CLIENT_SECRET=c888a72c02e065d0924f9b3b5b1b63aae96afbcfff4773259a399b44b60d1bee
SECONDME_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Database
DATABASE_URL=file:./dev.db

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 启动开发服务器

```bash
npm install
npx prisma db push
npm run dev
```

访问 http://localhost:3000

## 安全注意事项

1. `.secondme/` 目录包含敏感信息，已添加到 `.gitignore`
2. 生产环境使用 PostgreSQL 替代 SQLite
3. 定期轮换 OAuth Client Secret
4. 所有 API 请求使用 HTTPS

## 参考文档

- [SecondMe API 文档](https://docs.second.me)
- [项目技术方案](https://github.com/your-org/deepknow)
