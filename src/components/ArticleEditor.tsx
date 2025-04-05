
import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from './RichTextEditor';
import { ArticleMetadata } from './ArticleMetadata';
import { Article } from '@/types/article';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

// Form schema for the author and scheduling form
const scheduleFormSchema = z.object({
  authorFullName: z.string().min(1, { message: "Author name is required" }),
  isScheduled: z.boolean().default(false),
  scheduledDate: z.date().optional(),
  scheduledTime: z.string().optional(),
});

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
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false);

  // Initialize the form with current values
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      authorFullName: article.authorFullName || "",
      isScheduled: article.status === 'scheduled',
      scheduledDate: article.scheduledDate ? new Date(article.scheduledDate) : undefined,
      scheduledTime: article.scheduledDate ? new Date(article.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '12:00',
    },
  });

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

  const onAuthorFormSubmit = (data: z.infer<typeof scheduleFormSchema>) => {
    const updatedArticle = { ...article };
    
    // Update author information
    updatedArticle.authorFullName = data.authorFullName;
    
    // Update scheduling information
    if (data.isScheduled && data.scheduledDate) {
      updatedArticle.status = 'scheduled';
      
      // Combine date and time
      const scheduledDateTime = new Date(data.scheduledDate);
      
      if (data.scheduledTime) {
        const [hours, minutes] = data.scheduledTime.split(':').map(Number);
        scheduledDateTime.setHours(hours || 0, minutes || 0);
      }
      
      updatedArticle.scheduledDate = scheduledDateTime.toISOString();
    } else if (data.isScheduled) {
      // If scheduled is checked but no date is selected
      toast({
        title: "Date required",
        description: "Please select a date for scheduling publication.",
        variant: "destructive"
      });
      return;
    } else {
      // Not scheduled
      updatedArticle.status = 'draft';
      updatedArticle.scheduledDate = undefined;
    }
    
    setArticle(updatedArticle);
    setIsAuthorDialogOpen(false);
    
    toast({
      title: "Author info updated",
      description: data.isScheduled 
        ? "Article has been scheduled for publication." 
        : "Author information has been updated.",
    });
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
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="author">Author</Label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAuthorDialogOpen(true)}
            type="button"
          >
            {article.authorFullName ? "Edit Author & Schedule" : "Set Author & Schedule"}
          </Button>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/20">
          <div>
            <p className="text-sm font-medium">{article.authorFullName || article.author}</p>
            {article.status === 'scheduled' && article.scheduledDate && (
              <p className="text-xs text-muted-foreground">
                Scheduled for publication: {new Date(article.scheduledDate).toLocaleString()}
              </p>
            )}
          </div>
          {article.status === 'scheduled' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              Scheduled
            </span>
          )}
        </div>
      </div>
      
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

      {/* Author and Scheduling Dialog */}
      <Dialog open={isAuthorDialogOpen} onOpenChange={setIsAuthorDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Author & Publication Schedule</DialogTitle>
            <DialogDescription>
              Set the author information and optionally schedule this article for publication.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAuthorFormSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="authorFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isScheduled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Schedule for later publication</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        The article will be automatically published at the specified date and time.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              {form.watch("isScheduled") && (
                <div className="flex flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="scheduledDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Publication Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="scheduledTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAuthorDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
