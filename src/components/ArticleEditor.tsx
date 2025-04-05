
import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from './RichTextEditor';
import { ArticleMetadata } from './ArticleMetadata';
import { Article } from '@/types/article';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState('');
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  const handleVideoInsert = () => {
    setIsVideoDialogOpen(true);
  };

  const handleVideoSubmit = () => {
    // Extract YouTube video ID from URL
    let videoId = videoUrl;
    
    // Handle full YouTube URLs
    if (videoUrl.includes('youtube.com/watch?v=')) {
      const urlParams = new URLSearchParams(new URL(videoUrl).search);
      videoId = urlParams.get('v') || '';
    } 
    // Handle youtu.be short URLs
    else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    }

    if (videoId) {
      // Insert a YouTube iframe into the content
      const videoEmbed = `<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
      const newContent = article.content + videoEmbed;
      handleContentChange(newContent);
      
      toast({
        title: "Video added",
        description: "The video has been inserted into your article.",
      });
    } else {
      toast({
        title: "Invalid video URL",
        description: "Please provide a valid YouTube URL.",
        variant: "destructive"
      });
    }
    
    setVideoUrl('');
    setIsVideoDialogOpen(false);
  };

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
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              // Insert the image at the current cursor position in the editor
              const imageTag = `<img src="${imageUrl}" alt="Uploaded image" class="w-full max-w-full h-auto my-4 rounded-md" />`;
              const newContent = article.content + imageTag;
              handleContentChange(newContent);
              
              toast({
                title: "Image uploaded",
                description: "The image has been added to your article."
              });
            }
          }} 
        />
        
        <RichTextEditor 
          value={article.content} 
          onChange={handleContentChange}
          placeholder="Write your article content here... Use the toolbar above to format your content."
          onImageUploadRequest={handleImageUpload}
          onVideoInsertRequest={handleVideoInsert}
        />
      </div>

      {/* Video Embed Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert YouTube Video</DialogTitle>
            <DialogDescription>
              Enter the YouTube video URL or ID to embed in your article.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsVideoDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleVideoSubmit}>Insert Video</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
