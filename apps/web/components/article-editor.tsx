'use client';

import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { debounce } from 'lodash';
import { ofetch } from 'ofetch';
import { Doc as YDoc } from 'yjs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import TiptapEditor from '@/components/tiptap-editor';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Article, ArticleDetails } from '@/types/article';
import { Spinner } from '@/components/ui/spinner';
import { BlockEditor } from '@/components/BlockEditor';
import { BlocksContent } from '@strapi/blocks-react-renderer';
interface ArticleEditorProps {
  initialArticles: Article[];
}

export default function ArticleEditor({ initialArticles }: ArticleEditorProps) {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const saveArticle = useCallback(
    debounce(async (article: ArticleDetails) => {
      try {
        const response = await ofetch(`/api/articles/${article.documentId}`, {
          method: 'PUT',
          body: {
            title: article.title,
            blocks: article.blocks
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

  const handleArticleSelect = async (article: Article) => {
    setIsLoading(true);
    try {
      const response = await ofetch<ArticleDetails>(
        `/api/articles/${article.documentId}`
      );
      setSelectedArticle(response);
    } catch (error) {
      console.error('Error fetching article details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load article details',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (blocks: BlocksContent) => {
    if (selectedArticle) {
      const updatedArticle = {
        ...selectedArticle,
        blocks
      };
      setSelectedArticle(updatedArticle);
      saveArticle(updatedArticle);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedArticle) {
      const updatedArticle = {
        ...selectedArticle,
        title: e.target.value
      };
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
        }));
    };
    return buildTree(articles);
  }, [articles]);

  const renderArticleTree = (articles: Article[]) => {
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
      <div className="w-1/4 pr-4">
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
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : selectedArticle ? (
          <>
            <Input
              className="mb-4 border-none text-2xl font-bold"
              value={selectedArticle.title}
              onChange={handleTitleChange}
            />
            <ScrollArea className="flex-grow">
              {/* <TiptapEditor
                content={selectedArticle.content}
                onChange={handleContentChange}
              /> */}
              <BlockEditor
                content={selectedArticle.blocks}
                onChange={handleContentChange}
              />
            </ScrollArea>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">请选择一个文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
