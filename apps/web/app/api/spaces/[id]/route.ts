import { NextResponse } from 'next/server';
import { fetchFromStrapi } from '@/lib/strapi';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await fetchFromStrapi(`/api/spaces/${id}?populate=*`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching space:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
