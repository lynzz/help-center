import { NextResponse } from 'next/server'
import { uploadToStrapi } from '@/libs/strapi';

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 使用 uploadToStrapi 函数上传文件
    const uploadedFile = await uploadToStrapi(buffer);

    // 返回上传后的 URL
    return NextResponse.json({ url: uploadedFile.url });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
