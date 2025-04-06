
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/types/article";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublishActions } from "@/components/blog/PublishActions";
import { BlogEditorContent } from "@/components/blog/BlogEditorContent";

// Mock categories for our editor
const categories = [
  "Medicine", 
  "Biochemistry", 
  "Biology", 
  "Clinical Research", 
  "Journals", 
  "Conferences",
  "Videos",
  "YouTube",
  "Other"
];

// Mock initial article for new posts
const initialArticle: Article = {
  id: "",
  title: "",
  description: "",
  content: "",
  date: new Date().toISOString().split('T')[0],
  author: "",
  authorFullName: "",
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
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("editor");

  useEffect(() => {
    if (user) {
      // Set the author based on the logged-in user
      setArticle(prev => ({ ...prev, author: user.username }));
    }
  }, [user]);

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
          author: user?.username || "Unknown",
          authorFullName: "John Doe",
          category: "Medicine",
          status: "draft",
          tags: ["medicine", "research"]
        };
        setArticle(mockArticle);
        setTags(mockArticle.tags?.join(", ") || "");
        setIsLoading(false);
      }, 500);
    }
  }, [id, user]);

  const handleContentChange = (content: string) => {
    setArticle(prev => ({ ...prev, content }));
  };

  const handleSave = (status: 'draft' | 'published') => {
    // Don't change status if it's scheduled
    if (article.status === 'scheduled' && status === 'draft') {
      return;
    }
    
    setIsLoading(true);
    
    // Process tags from comma-separated string to array
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const updatedArticle = {
      ...article,
      status: article.status === 'scheduled' ? 'scheduled' : status,
      tags: tagsArray,
      // Update the date to current date
      date: new Date().toISOString().split('T')[0]
    };

    // In a real app, this would be an API call to save the article
    console.log("Saving article:", updatedArticle);
    
    // Simulate save delay
    setTimeout(() => {
      setIsLoading(false);
      
      let title = "";
      let description = "";
      
      if (article.status === 'scheduled') {
        title = "Scheduled article saved";
        description = "Your article will be published automatically at the scheduled time.";
      } else {
        title = status === 'published' ? "Article published" : "Draft saved";
        description = status === 'published' 
          ? "Your article has been published successfully." 
          : "Your draft has been saved.";
      }
      
      toast({ title, description });
      
      if (status === 'published') {
        // Navigate to the article page or a success page
        navigate('/my-articles');
      }
    }, 1000);
  };

  return (
    <ProtectedRoute requiredRole="any">
      <div className="max-w-5xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {id ? "Edit Article" : "Create New Article"}
          </h1>
          <PublishActions 
            article={article}
            isLoading={isLoading}
            isAdmin={isAdmin}
            onSave={handleSave}
          />
        </div>

        <BlogEditorContent 
          article={article}
          categories={categories}
          tags={tags}
          setArticle={setArticle}
          setTags={setTags}
          handleContentChange={handleContentChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </ProtectedRoute>
  );
}
