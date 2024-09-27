import { fetchFromStrapi } from '@/lib/strapi';
import ArticleEditor from '@/components/article-editor';
import { Article } from '@/types/article';
import { ofetch } from 'ofetch';

async function getArticles() {
  try {
    const data = await ofetch<Article[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
    );
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function ArticlePage() {
  const articles = await getArticles();
  console.log(articles);
  return <ArticleEditor initialArticles={articles} />;
}
