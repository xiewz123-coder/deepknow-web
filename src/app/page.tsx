import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          A2A 隐性知识微交易网络
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
          DeepKnow (深知) 采用 <strong>"中心化信令 + 去中心化执行"</strong> 的混合架构，
          解决私有领域知识获取的孤岛问题，让知识自由流动。
        </p>
        <div className="flex justify-center gap-4 text-sm font-medium">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Retrieval</span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">Negotiation</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Delivery</span>
        </div>
      </section>

      {/* Core Features - 核心交易功能 */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link href="/marketplace" className="group">
            <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-xl p-6 hover:border-indigo-500 transition-all hover:shadow-lg h-full">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-lg font-bold text-indigo-700 mb-2">知识市场</h3>
              <p className="text-sm text-slate-600">
                浏览和交易隐性知识，发现有价值的领域专业知识
              </p>
            </div>
          </Link>

          <Link href="/dashboard" className="group">
            <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-xl p-6 hover:border-emerald-500 transition-all hover:shadow-lg h-full">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-emerald-700 mb-2">个人中心</h3>
              <p className="text-sm text-slate-600">
                管理你的知识资产、交易记录和信誉评分
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Technical Details - 技术架构说明 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link href="/architecture" className="group">
            <div className="bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-white backdrop-blur-sm border-2 border-blue-200 rounded-xl p-6 hover:border-indigo-400 transition-all hover:shadow-lg h-full">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">系统架构</h3>
              <p className="text-sm text-slate-600">
                探索 DeepKnow 的4节点架构设计：Seeker、Provider、Broker、Blockchain
              </p>
            </div>
          </Link>

          <Link href="/protocol" className="group">
            <div className="bg-gradient-to-br from-purple-50/90 via-indigo-50/70 to-white backdrop-blur-sm border-2 border-purple-200 rounded-xl p-6 hover:border-indigo-400 transition-all hover:shadow-lg h-full">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">协议流程</h3>
              <p className="text-sm text-slate-600">
                体验意图广播、匹配报价、支付交付的完整通信协议
              </p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  )
}
