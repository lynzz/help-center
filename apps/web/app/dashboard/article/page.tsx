'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import EditorJsComponent from '@/components/EditorJsComponent'
import { OutputData } from '@editorjs/editorjs'

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  editorContent: z.any(),
  content: z.string(),
})

export default function ArticlePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      editorContent: {},
      content: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          content: values.content, // 发送 HTML 内容到后端
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create article')
      }

      const data = await response.json()
      console.log('Article created:', data)
      toast({
        title: "Success",
        description: "Article created successfully",
      })
      // 可以在这里添加重定向逻辑，例如跳转到文章列表页面
    } catch (error) {
      console.error('Error creating article:', error)
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">编辑文章</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input placeholder="输入文章标题" {...field} />
                </FormControl>
                <FormDescription>
                  请输入文章的标题。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="editorContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容</FormLabel>
                <FormControl>
                  <EditorJsComponent
                    data={field.value}
                    onChange={(data: OutputData, html: string) => {
                      field.onChange(data);
                      form.setValue('content', html);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  使用编辑器编写文章内容。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "保存中..." : "保存文章"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
