
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Image, Link2, List, ListOrdered, Bold, Italic, Heading, Quote, Code, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/types/article";

// Mock categories for our editor
const categories = [
  "Medicine", 
  "Biochemistry", 
  "Biology", 
  "Clinical Research", 
  "Journals", 
  "Conferences",
  "Other"
];

// Mock initial article for new posts
const initialArticle: Article = {
  id: "",
  title: "",
  description: "",
  content: "",
  date: new Date().toISOString().split('T')[0],
  author: "Your Name",
  category: "Medicine",
  status: "draft",
  tags: []
};

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article>(initialArticle);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string>("");
  const [preview, setPreview] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      // Mock fetching an existing article
      setIsLoading(true);
      // In a real app, this would be an API call to fetch the article by ID
      setTimeout(() => {
        const mockArticle: Article = {
          id: id,
          title: "Sample Existing Article",
          description: "This is a placeholder for an existing article.",
          content: "<p>This is the content of an existing article. It would be loaded from the server in a real application.</p>",
          date: new Date().toISOString().split('T')[0],
          author: "Your Name",
          category: "Medicine",
          status: "draft",
          tags: ["medicine", "research"]
        };
        setArticle(mockArticle);
        setTags(mockArticle.tags?.join(", ") || "");
        setIsLoading(false);
      }, 500);
    }
  }, [id]);

  const handleContentChange = (content: string) => {
    setArticle(prev => ({ ...prev, content }));
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to a server and get back a URL
      // For now, we'll just create a local object URL
      const imageUrl = URL.createObjectURL(file);
      setArticle(prev => ({ ...prev, image: imageUrl }));
      toast({
        title: "Image uploaded",
        description: `${file.name} has been added to your article.`
      });
    }
  };

  const handleSave = (status: 'draft' | 'published') => {
    setIsLoading(true);
    
    // Process tags from comma-separated string to array
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const updatedArticle = {
      ...article,
      status,
      tags: tagsArray,
      // Update the date to current date
      date: new Date().toISOString().split('T')[0]
    };

    // In a real app, this would be an API call to save the article
    console.log("Saving article:", updatedArticle);
    
    // Simulate save delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: status === 'published' ? "Article published" : "Draft saved",
        description: status === 'published' 
          ? "Your article has been published successfully." 
          : "Your draft has been saved."
      });
      
      if (status === 'published') {
        // Navigate to the article page or a success page
        navigate('/my-articles');
      }
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {id ? "Edit Article" : "Create New Article"}
        </h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSave('draft')} 
            disabled={isLoading}
          >
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSave('published')} 
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-6">
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
            
            <div>
              <Label htmlFor="editor">Content</Label>
              <div className="border rounded-md p-3">
                <div className="flex flex-wrap gap-2 mb-3 border-b pb-3">
                  <Button variant="ghost" size="sm" onClick={handleImageUpload}>
                    <Image size={16} />
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                  <Button variant="ghost" size="sm">
                    <Link2 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bold size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Heading size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ListOrdered size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Quote size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Code size={16} />
                  </Button>
                </div>
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
        </TabsContent>
        
        <TabsContent value="preview">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
