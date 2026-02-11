'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  reputation: number
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const res = await fetch('/api/user/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    window.location.href = '/'
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <Link href="/" className="font-bold text-xl text-slate-900 tracking-tight">
              DeepKnow <span className="text-indigo-600 text-sm font-medium border border-indigo-200 bg-indigo-50 px-2 py-0.5 rounded-full">深知</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/marketplace" className="text-slate-600 hover:text-slate-900 font-medium">
              知识市场
            </Link>
            <Link href="/architecture" className="text-slate-600 hover:text-slate-900 font-medium">
              系统架构
            </Link>
            <Link href="/protocol" className="text-slate-600 hover:text-slate-900 font-medium">
              协议流程
            </Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 font-medium">
              个人中心
            </Link>
          </div>

          <div className="flex items-center">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
<img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=indigo`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 bg-white"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-8 h-8 rounded-full bg-indigo-100 hidden items-center justify-center text-indigo-600 font-medium border border-slate-200">
                    {user.name?.[0] || 'U'}
                  </div>
                  <div className="hidden md:block text-sm">
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-slate-500 text-xs">信誉: {user.reputation}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  退出
                </button>
              </div>
            ) : (
              <a
                href="/api/auth/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                SecondMe 登录
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
