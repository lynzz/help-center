import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { title, content } = await request.json()

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const strapiUrl = process.env.STRAPI_API_URL
  const strapiToken = process.env.STRAPI_API_TOKEN

  if (!strapiUrl || !strapiToken) {
    return NextResponse.json({ error: 'Strapi configuration is missing' }, { status: 500 })
  }

  try {
    const response = await fetch(`${strapiUrl}/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${strapiToken}`
      },
      body: JSON.stringify({
        data: {
          title,
          content
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create article in Strapi')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
