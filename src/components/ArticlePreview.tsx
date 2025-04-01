
import React from 'react';
import { Calendar, FileText, Tag } from 'lucide-react';
import { Article } from '@/types/article';

interface ArticlePreviewProps {
  article: Article;
  tags: string;
}

export function ArticlePreview({ article, tags }: ArticlePreviewProps) {
  return (
    <div className="border rounded-md p-6 space-y-4">
      <h1 className="text-3xl font-bold">{article.title || "Untitled Article"}</h1>
      
      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        {article.date && (
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {article.date}
          </div>
        )}
        {article.author && (
          <div className="flex items-center">
            <FileText className="mr-1 h-4 w-4" />
            {article.author}
          </div>
        )}
        {article.category && (
          <div className="flex items-center">
            <Tag className="mr-1 h-4 w-4" />
            {article.category}
          </div>
        )}
      </div>
      
      {article.image && (
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-auto rounded-md object-cover max-h-96" 
        />
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {article.description && (
          <p className="text-lg font-medium italic text-muted-foreground">
            {article.description}
          </p>
        )}
        
        <div dangerouslySetInnerHTML={{ __html: article.content || "<p>No content yet</p>" }} />
      </div>
      
      {tags && (
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {tags.split(',').map((tag, index) => tag.trim()).filter(tag => tag).map((tag, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
