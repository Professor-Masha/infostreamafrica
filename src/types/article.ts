
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  authorFullName?: string;
  category: string;
  image?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isUpdated?: boolean;
  tags?: string[];
  status: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
  references?: string[];
  videoLinks?: string[];
  youtubeIds?: string[];
  relatedArticleIds?: string[];
  seoKeywords?: string[];
  seoDescription?: string;
  viewCount?: number;
  lastModified?: string;
  editorNotes?: string;
}
