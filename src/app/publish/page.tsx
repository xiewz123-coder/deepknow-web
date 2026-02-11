'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type PublishStep = 'form' | 'encrypting' | 'uploading' | 'success'

export default function PublishPage() {
  const router = useRouter()
  const [step, setStep] = useState<PublishStep>('form')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullContent: '',
    price: '',
    tags: [] as string[],
    tagInput: '',
  })
  const [knowledgeId, setKnowledgeId] = useState('')

  const availableTags = ['kubernetes', 'devops', 'solana', 'blockchain', 'ai', 'security', 'backend', 'frontend', 'database', 'cloud']

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.price) return

    setStep('encrypting')
    // Simulate encryption
    setTimeout(() => {
      setStep('uploading')
      // Simulate upload
      setTimeout(() => {
        setKnowledgeId('KNOW_' + Math.random().toString(36).substring(2, 10).toUpperCase())
        setStep('success')
      }, 2000)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">首页</Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-indigo-600">仪表盘</Link>
        <span>/</span>
        <span className="text-slate-800">发布新知识</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">发布新知识</h1>
        <p className="mt-2 text-slate-600">将你的专业知识转化为加密资产，安全地进行交易</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
            step === 'form' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
          }`}>
            1
          </div>
          <span className="ml-2 text-sm font-medium text-slate-700">填写信息</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${step === 'form' ? 'bg-slate-200' : 'bg-indigo-600'}`} />
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
            step === 'encrypting' ? 'bg-indigo-600 text-white' :
            step === 'uploading' || step === 'success' ? 'bg-indigo-100 text-indigo-600' :
            'bg-slate-100 text-slate-400'
          }`}>
            2
          </div>
          <span className={`ml-2 text-sm font-medium ${step === 'form' ? 'text-slate-400' : 'text-slate-700'}`}>本地加密</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${step === 'success' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
            step === 'success' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            3
          </div>
          <span className={`ml-2 text-sm font-medium ${step === 'success' ? 'text-slate-700' : 'text-slate-400'}`}>发布完成</span>
        </div>
      </div>

      {step === 'form' && (
        <div className="bg-white border border-slate-200 rounded-xl p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                知识标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如：K8s 生产环境故障排查指南"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-slate-500">标题应简洁明了，突出知识的核心价值</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                简介描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="简要描述这份知识的内容和价值..."
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-slate-500">购买者在购买前可以看到这段描述</p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">标签分类</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-slate-500">已选择：</span>
                  {formData.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:text-indigo-900">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                定价 (SOL) <span className="text-red-500">*</span>
              </label>
              <div className="relative max-w-xs">
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="2.5"
                  min="0.1"
                  step="0.1"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">SOL</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">平台收取 2% 服务费，剩余 98% 归你所有</p>
            </div>

            {/* Full Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                知识内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.fullContent}
                onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                placeholder="在此输入完整的知识内容..."
                rows={10}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
              />
              <p className="mt-1 text-xs text-slate-500">支持 Markdown 格式，购买后将完整展示给买家</p>
            </div>

            {/* Security Notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h4 className="font-medium text-emerald-800 mb-1">隐私保护说明</h4>
                  <p className="text-sm text-emerald-700">
                    你的知识内容将在本地进行 AES-256-GCM 加密，然后才上传到服务器。
                    只有付费购买者才能使用他们的私钥解密查看内容，平台无法访问原始内容。
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                取消
              </Link>
              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description || !formData.price || !formData.fullContent}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交并加密发布
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'encrypting' && (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">本地加密中</h2>
          <p className="text-slate-600 mb-4">正在使用 AES-256-GCM 加密知识内容...</p>
          <div className="bg-slate-100 rounded-lg p-3 mx-auto max-w-xs">
            <p className="text-xs text-slate-500 font-mono">生成加密密钥...</p>
          </div>
        </div>
      )}

      {step === 'uploading' && (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">上传加密内容</h2>
          <p className="text-slate-600 mb-4">正在将加密后的知识上传到服务器...</p>
          <div className="bg-slate-100 rounded-lg p-3 mx-auto max-w-xs">
            <p className="text-xs text-slate-500 font-mono">上传进度: 68%</p>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">🎉 发布成功！</h2>
            <p className="text-slate-600 mb-6">你的知识已成功加密并发布到市场</p>

            <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-slate-500 mb-1">知识 ID</p>
              <p className="text-lg font-mono text-slate-800">{knowledgeId}</p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-indigo-800 mb-2">接下来</h4>
              <ul className="text-sm text-indigo-700 text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>知识已上架到市场，其他用户可以搜索和购买</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>当有人购买时，你将收到 SOL 收益</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>你可以在仪表盘中管理已发布的知识</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/marketplace')}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                去市场查看
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                返回仪表盘
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
