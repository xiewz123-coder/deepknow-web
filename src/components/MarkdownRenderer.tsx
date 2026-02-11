'use client'

import { useMemo } from 'react'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderedContent = useMemo(() => {
    const lines = content.split('\n')
    const elements: React.ReactElement[] = []
    let codeBlock: string[] = []
    let inCodeBlock = false
    let codeLang = ''

    lines.forEach((line, index) => {
      // 代码块处理
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // 结束代码块
          elements.push(
            <pre key={`code-${index}`} className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4">
              <code className="text-sm font-mono">{codeBlock.join('\n')}</code>
            </pre>
          )
          codeBlock = []
          inCodeBlock = false
          codeLang = ''
        } else {
          // 开始代码块
          inCodeBlock = true
          codeLang = line.slice(3).trim()
        }
        return
      }

      if (inCodeBlock) {
        codeBlock.push(line)
        return
      }

      // 空行
      if (line.trim() === '') {
        elements.push(<div key={`empty-${index}`} className="h-4" />)
        return
      }

      // 标题
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold text-slate-900 mt-8 mb-4 pb-2 border-b border-slate-200">
            {parseInline(line.slice(2))}
          </h1>
        )
        return
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-slate-800 mt-6 mb-3">
            {parseInline(line.slice(3))}
          </h2>
        )
        return
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-bold text-slate-700 mt-4 mb-2">
            {parseInline(line.slice(4))}
          </h3>
        )
        return
      }
      if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={index} className="text-lg font-semibold text-slate-700 mt-3 mb-2">
            {parseInline(line.slice(5))}
          </h4>
        )
        return
      }

      // 引用块
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 py-2 my-4 bg-indigo-50 text-slate-700 italic rounded-r">
            {parseInline(line.slice(2))}
          </blockquote>
        )
        return
      }

      // 分隔线
      if (line === '---' || line === '***') {
        elements.push(<hr key={index} className="my-6 border-slate-300" />)
        return
      }

      // 列表项
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index} className="ml-4 text-slate-700 my-1 flex items-start gap-2">
            <span className="text-indigo-500 mt-1.5">•</span>
            <span>{parseInline(line.slice(2))}</span>
          </li>
        )
        return
      }

      if (/^\d+\./.test(line)) {
        const match = line.match(/^(\d+)\.\s*(.*)$/)
        if (match) {
          elements.push(
            <li key={index} className="ml-4 text-slate-700 my-1 flex items-start gap-2">
              <span className="text-indigo-500 font-medium min-w-[1.5rem]">{match[1]}.</span>
              <span>{parseInline(match[2])}</span>
            </li>
          )
          return
        }
      }

      // 表格
      if (line.includes('|')) {
        elements.push(
          <div key={index} className="my-2 font-mono text-sm text-slate-600 bg-slate-50 p-2 rounded overflow-x-auto border border-slate-200">
            {line}
          </div>
        )
        return
      }

      // ASCII 图表
      if (/[┌┐└┘│─├┤┬┴┼]/.test(line)) {
        elements.push(
          <pre key={index} className="text-sm text-slate-600 bg-slate-50 p-3 rounded overflow-x-auto my-2 border border-slate-200 font-mono">
            {line}
          </pre>
        )
        return
      }

      // 普通段落
      elements.push(
        <p key={index} className="text-slate-700 leading-relaxed my-2">
          {parseInline(line)}
        </p>
      )
    })

    return elements
  }, [content])

  return <div className="prose prose-slate max-w-none">{renderedContent}</div>
}

// 行内样式解析
function parseInline(text: string): React.ReactNode {
  // 处理粗体 **text**
  let result = text
  const parts: (React.ReactElement | string)[] = []
  let lastIndex = 0

  // 粗体
  const boldRegex = /\*\*(.+?)\*\*/g
  let match
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(<strong key={match.index} className="font-semibold text-slate-900">{match[1]}</strong>)
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  if (parts.length === 0) return text
  return <>{parts}</>
}
