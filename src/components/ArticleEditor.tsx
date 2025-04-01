
import React, { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextToolbar } from './RichTextToolbar';
import { ArticleMetadata } from './ArticleMetadata';
import { Article } from '@/types/article';

interface ArticleEditorProps {
  article: Article;
  categories: string[];
  tags: string;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: () => void;
  handleContentChange: (content: string) => void;
}

export function ArticleEditor({
  article,
  categories,
  tags,
  setArticle,
  setTags,
  fileInputRef,
  handleImageUpload,
  handleContentChange
}: ArticleEditorProps) {
  return (
    <div className="space-y-6">
      <ArticleMetadata 
        article={article}
        categories={categories}
        tags={tags}
        setArticle={setArticle}
        setTags={setTags}
      />
      
      <div>
        <Label htmlFor="editor">Content</Label>
        <div className="border rounded-md p-3">
          <RichTextToolbar onImageUpload={handleImageUpload} />
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setArticle(prev => ({ ...prev, image: imageUrl }));
              }
            }} 
          />
          <Textarea 
            id="editor" 
            value={article.content} 
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Write your article content here..."
            className="min-h-[400px] font-mono resize-y"
          />
        </div>
      </div>
    </div>
  );
}
