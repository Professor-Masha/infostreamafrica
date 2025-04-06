
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleEditor } from "@/components/ArticleEditor";
import { ArticlePreview } from "@/components/ArticlePreview";
import { Article } from "@/types/article";

interface BlogEditorContentProps {
  article: Article;
  categories: string[];
  tags: string;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  handleContentChange: (content: string) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function BlogEditorContent({
  article,
  categories,
  tags,
  setArticle,
  setTags,
  handleContentChange,
  activeTab,
  setActiveTab
}: BlogEditorContentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      
      <TabsContent value="editor" className="mt-6">
        <ArticleEditor 
          article={article}
          categories={categories}
          tags={tags}
          setArticle={setArticle}
          setTags={setTags}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          handleContentChange={handleContentChange}
        />
      </TabsContent>
      
      <TabsContent value="preview" className="mt-6">
        <ArticlePreview article={article} tags={tags} />
      </TabsContent>
    </Tabs>
  );
}
