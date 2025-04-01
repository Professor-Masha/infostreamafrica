
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isUpdated?: boolean;
  tags?: string[];
  status: 'draft' | 'published';
  references?: string[];
}
