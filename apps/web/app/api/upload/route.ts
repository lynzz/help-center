import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // 保存文件到临时目录
  const tempFilePath = path.join('/tmp', file.name)
  await writeFile(tempFilePath, buffer)

  const strapiUrl = process.env.STRAPI_API_URL
  const strapiToken = process.env.STRAPI_API_TOKEN

  if (!strapiUrl || !strapiToken) {
    return NextResponse.json({ error: 'Strapi configuration is missing' }, { status: 500 })
  }

  try {
    const formData = new FormData()
    formData.append('files', new Blob([buffer], { type: file.type }), file.name)

    const response = await fetch(`${strapiUrl}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${strapiToken}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error('Failed to upload image to Strapi')
    }

    const data = await response.json()
    // 返回 Strapi 提供的完整 URL
    return NextResponse.json([{ url: `${strapiUrl}${data[0].url}` }])
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
