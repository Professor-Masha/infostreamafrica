
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Article } from '@/types/article';

interface ArticleMetadataProps {
  article: Article;
  categories: string[];
  tags: string;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
  setTags: React.Dispatch<React.SetStateAction<string>>;
}

export function ArticleMetadata({ 
  article, 
  categories, 
  tags, 
  setArticle, 
  setTags 
}: ArticleMetadataProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={article.title} 
          onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter article title"
          className="text-xl font-bold"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={article.description} 
          onChange={(e) => setArticle(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Write a brief description of your article"
          className="resize-none h-20"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={article.category} 
            onValueChange={(value) => setArticle(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input 
            id="tags" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>
      </div>
    </div>
  );
}
