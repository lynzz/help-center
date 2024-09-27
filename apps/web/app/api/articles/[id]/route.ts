import { NextResponse } from 'next/server';
import { fetchFromStrapi, putToStrapi } from '@/lib/strapi';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await fetchFromStrapi(`/api/articles/${id}?populate=*`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const data = await putToStrapi(`/api/articles/${id}`, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
