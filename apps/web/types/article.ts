export interface Article {
  id: string;
  pid: string | null;
  documentId: string;
  title: string;
  children?: Article[];
}

export interface ArticleDetails extends Article {
  content: string;
  blocks: any;
}
