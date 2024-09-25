import { NextResponse } from 'next/server'

export async function GET() {
  const strapiUrl = process.env.STRAPI_API_URL
  const strapiToken = process.env.STRAPI_API_TOKEN

  if (!strapiUrl || !strapiToken) {
    return NextResponse.json({ error: 'Strapi configuration is missing' }, { status: 500 })
  }

  try {
    const response = await fetch(`${strapiUrl}/api/spaces`, {
      headers: {
        'Authorization': `Bearer ${strapiToken}`
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch spaces from Strapi')
    }

    const data = await response.json()
    return NextResponse.json(data.data)
  } catch (error) {
    console.error('Error fetching spaces:', error)
    return NextResponse.json({ error: 'Failed to fetch spaces' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const strapiUrl = process.env.STRAPI_API_URL
  const strapiToken = process.env.STRAPI_API_TOKEN

  if (!strapiUrl || !strapiToken) {
    return NextResponse.json({ error: 'Strapi configuration is missing' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const response = await fetch(`${strapiUrl}/api/spaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${strapiToken}`
      },
      body: JSON.stringify({ data: body })
    })

    if (!response.ok) {
      throw new Error('Failed to create space in Strapi')
    }

    const data = await response.json()
    return NextResponse.json(data.data)
  } catch (error) {
    console.error('Error creating space:', error)
    return NextResponse.json({ error: 'Failed to create space' }, { status: 500 })
  }
}
