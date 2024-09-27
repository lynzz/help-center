import { NextResponse } from 'next/server';
import { fetchFromStrapi, postToStrapi } from '@/lib/strapi';

export async function GET() {
  try {
    const data = await fetchFromStrapi('/api/spaces');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await postToStrapi('/api/spaces', body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating space:', error);
    return NextResponse.json(
      { error: 'Failed to create space' },
      { status: 500 }
    );
  }
}
