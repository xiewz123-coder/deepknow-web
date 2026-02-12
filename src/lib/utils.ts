/**
 * 格式化数字，添加千分位分隔符
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN')
}

/**
 * 格式化价格，保留小数位
 */
export function formatPrice(price: number, currency: string = 'SOL'): string {
  if (price === 0) return '免费'
  return `${price.toFixed(2)} ${currency}`
}

/**
 * 格式化响应时间
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60000).toFixed(1)}min`
}

/**
 * 格式化日期
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * 生成星级评分 HTML
 */
export function renderStars(rating: number, size: 'sm' | 'md' | 'lg' = 'md'): string {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const stars = []
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating)
    stars.push(`
      <svg class="${sizeClasses[size]} ${filled ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    `)
  }
  return stars.join('')
}

/**
 * 状态颜色映射
 */
export const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  inactive: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  busy: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
}

/**
 * 状态文字映射
 */
export const statusText: Record<string, string> = {
  active: '在线',
  inactive: '离线',
  busy: '繁忙',
  pending: '待匹配',
  processing: '处理中',
  completed: '已完成',
  cancelled: '已取消',
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 随机生成 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * 睡眠函数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 深拷贝
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 检查是否为有效 URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 复制到剪贴板
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
