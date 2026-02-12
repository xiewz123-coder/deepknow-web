import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠</span>
              <span className="font-bold text-xl text-white">DeepKnow</span>
              <span className="text-xs text-slate-400 border border-slate-600 px-2 py-0.5 rounded">深知</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md mb-4">
              基于 A2A 协议的隐性知识微交易网络。采用"中心化信令 + 去中心化执行"的混合架构，
              保护知识提供者的知识产权，促进专业人士的知识共享。
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded">A2A Protocol v0.3.0</span>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded">SecondMe OAuth</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/agents" className="hover:text-white transition-colors">代理发现</Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-white transition-colors">知识市场</Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">系统架构</Link>
              </li>
              <li>
                <Link href="/protocol" className="hover:text-white transition-colors">协议流程</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">开发者资源</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://a2a-protocol.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  A2A 协议规范
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://docs.second.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  SecondMe API 文档
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://solana.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Solana 开发文档
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <Link href="/api/reference" className="hover:text-white transition-colors">API 参考</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* A2A Protocol Banner */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔗</span>
              </div>
              <div>
                <p className="text-white font-medium">遵循 A2A Protocol v0.3.0 开放标准</p>
                <p className="text-sm text-slate-400">采用主版本.次版本.修订版本进行版本管理，确保向后兼容性</p>
              </div>
            </div>
            <a
              href="https://a2a-protocol.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              了解协议规范 →
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {currentYear} DeepKnow (深知). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
            <Link href="/terms" className="hover:text-white transition-colors">服务条款</Link>
            <Link href="/contact" className="hover:text-white transition-colors">联系我们</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
