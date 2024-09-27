'use client'

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { debounce } from 'lodash';
import { ofetch } from 'ofetch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import TiptapEditor from '@/components/tiptap-editor';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface Article {
  id: string;
  pid: string;
  documentId: string;
  title: string;
  content: string;
  children?: Article[];
}

export default function ArticlePage() {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const fetchedArticles = await ofetch<Article[]>('/api/articles');
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch articles',
        variant: 'destructive'
      });
    }
  };

  const saveArticle = useCallback(
    debounce(async (article: Article) => {
      try {
        const response = await ofetch(`/api/articles/${article.documentId}`, {
          method: 'PUT',
          body: {
            title: article.title,
            content: article.content
          }
        });

        console.log('Article saved:', response);
        toast({
          title: 'Success',
          description: 'Article saved successfully'
        });
      } catch (error) {
        console.error('Error saving article:', error);
        toast({
          title: 'Error',
          description: 'Failed to save article',
          variant: 'destructive'
        });
      }
    }, 1000),
    [toast]
  );

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleContentChange = (content: string) => {
    if (selectedArticle) {
      const updatedArticle = { ...selectedArticle, content };
      setSelectedArticle(updatedArticle);
      saveArticle(updatedArticle);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedArticle) {
      const updatedArticle = { ...selectedArticle, title: e.target.value };
      setSelectedArticle(updatedArticle);
      saveArticle(updatedArticle);
    }
  };

  const articleTree = useMemo(() => {
    const buildTree = (
      articles: Article[],
      parentId: string | null = null
    ): Article[] => {
      return articles
        .filter((article) => article.pid === parentId)
        .map((article) => ({
          ...article,
          children: buildTree(articles, article.id)
        }))
        .filter(
          (article) => article.children.length > 0 || article.pid === parentId
        );
    };
    return buildTree(articles);
  }, [articles]);

  const renderArticleTree = (articles: Article[]) => {
    console.log('articles', articles);
    return articles.map((article) => (
      <NavigationMenu.Item key={article.id}>
        <NavigationMenu.Trigger
          className="group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          onClick={() => handleArticleSelect(article)}
        >
          {article.title}
          {article.children && article.children.length > 0 && (
            <ChevronDownIcon
              className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          )}
        </NavigationMenu.Trigger>
        {article.children && article.children.length > 0 && (
          <NavigationMenu.Content className="ml-4">
            {renderArticleTree(article.children)}
          </NavigationMenu.Content>
        )}
      </NavigationMenu.Item>
    ));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4">
        <ScrollArea className="h-[calc(100vh-32px)]">
          <NavigationMenu.Root className="relative">
            <NavigationMenu.List className="flex flex-col space-y-1">
              {renderArticleTree(articleTree)}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </ScrollArea>
      </div>
      <Separator orientation="vertical" className="h-full" />
      <div className="flex flex-1 flex-col p-4">
        {selectedArticle ? (
          <>
            <Input
              className="mb-4 border-none text-2xl font-bold"
              value={selectedArticle.title}
              onChange={handleTitleChange}
            />
            <Separator className="my-4" />
            <ScrollArea className="flex-grow">
              <TiptapEditor
                content={selectedArticle.content}
                onChange={handleContentChange}
              />
            </ScrollArea>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Select an article to edit</p>
          </div>
        )}
      </div>
    </div>
  );
}
