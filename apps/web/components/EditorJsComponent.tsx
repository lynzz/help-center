'use client'

import { useEffect, useRef } from 'react'
import EditorJS, { I18nDictionary, OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Checklist from '@editorjs/checklist'
import Quote from '@editorjs/quote'
import CodeTool from '@editorjs/code'
import ImageTool from '@editorjs/image'
import LinkTool from '@editorjs/link'
import Paragraph from '@editorjs/paragraph'

const i18n: I18nDictionary = {
  /**
   * 多个工具通用的文案
   */
  toolNames: {
    "Text": "文本",
    "Heading": "标题",
    "List": "列表",
    "Checklist": "清单",
    "Quote": "引用",
    "Code": "代码",
    "Image": "图片",
    "Link": "链接",
  },
  /**
   * 工具设置
   */
  toolSettings: {
    "Heading": {
      "Title": "标题",
      "Subtitle": "副标题"
    }
  },
  /**
   * UI 文案
   */
  ui: {
    "blockTunes": {
      "toggler": {
        "Click to tune": "点击调整",
        "or drag to move": "或拖动"
      },
    },
    "inlineToolbar": {
      "converter": {
        "Convert to": "转换为"
      }
    },
    "toolbar": {
      "toolbox": {
        "Add": "添加"
      }
    }
  },
  /**
   * 对于每个工具的文案
   */
  tools: {
    "link": {
      "Add a link": "添加链接"
    },
    "image": {
      "Select an Image": "选择图片",
      "Caption": "图片说明",
      "Select an image": "选择图片",
      "With border": "带边框",
      "Stretch image": "拉伸图片",
      "With background": "带背景"
    }
  },
  /**
   * 提示文案
   */
  tunes: {
    "delete": {
      "Delete": "删除",
      "Click to delete": "点击删除"
    },
    "moveUp": {
      "Move up": "上移"
    },
    "moveDown": {
      "Move down": "下移"
    }
  }
}

interface EditorJsComponentProps {
  data?: any
  onChange: (data: OutputData, html: string) => void
}

const EditorJsComponent: React.FC<EditorJsComponentProps> = ({ data, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          checklist: Checklist,
          quote: Quote,
          code: CodeTool,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file: File) {
                  return new Promise((resolve, reject) => {
                    const formData = new FormData()
                    formData.append('file', file)

                    fetch('/api/upload', {
                      method: 'POST',
                      body: formData
                    })
                      .then(response => response.json())
                      .then(result => {
                        // 直接使用 Strapi 返回的完整 URL
                        resolve({
                          success: 1,
                          file: {
                            url: result[0].url,
                          }
                        })
                      })
                      .catch(error => {
                        console.error('Error uploading image:', error)
                        reject(error)
                      })
                  })
                }
              }
            }
          },
          linkTool: LinkTool,
          paragraph: Paragraph,
        },
        data: data,
        onChange: async () => {
          const content = await editorRef.current?.save()
          const html = await editorDataToHtml(content)
          onChange(content, html)
        },
        i18n: i18n,
      })

      editorRef.current = editor
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
      }
    }
  }, [])

  return <div id="editorjs" className="prose max-w-none" />
}

// 辅助函数：将 Editor.js 数据转换为 HTML
async function editorDataToHtml(data: OutputData): Promise<string> {
  let html = ''
  for (const block of data.blocks) {
    switch (block.type) {
      case 'header':
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`
        break
      case 'paragraph':
        html += `<p>${block.data.text}</p>`
        break
      case 'list':
        const listType = block.data.style === 'ordered' ? 'ol' : 'ul'
        html += `<${listType}>${block.data.items.map((item: string) => `<li>${item}</li>`).join('')}</${listType}>`
        break
      case 'checklist':
        html += `<ul class="checklist">${block.data.items.map((item: { text: string, checked: boolean }) => 
          `<li><input type="checkbox" ${item.checked ? 'checked' : ''}>${item.text}</li>`).join('')}</ul>`
        break
      case 'quote':
        html += `<blockquote>${block.data.text}</blockquote>`
        break
      case 'code':
        html += `<pre><code>${block.data.code}</code></pre>`
        break
      case 'image':
        html += `<figure><img src="${block.data.file.url}" alt="${block.data.caption}"><figcaption>${block.data.caption}</figcaption></figure>`
        break
      // 可以根据需要添加更多类型的处理
    }
  }
  return html
}

export default EditorJsComponent
