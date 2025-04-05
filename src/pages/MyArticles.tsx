
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Eye, Plus, FileText, Filter, Check, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/types/article";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Mock data for user's articles
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Medical Research",
    description: "A beginner's guide to starting a career in medical research.",
    content: "<p>This is a sample content for the article about medical research.</p>",
    date: "2023-05-20",
    author: "admin",
    authorFullName: "Dr. Jane Smith",
    category: "Medicine",
    status: "published",
    tags: ["medicine", "research", "career"],
  },
  {
    id: "2",
    title: "Understanding Protein Synthesis",
    description: "A deep dive into the process of protein synthesis and its importance.",
    content: "<p>This is a sample content about protein synthesis.</p>",
    date: "2023-05-15",
    author: "blogger1",
    authorFullName: "Prof. Alex Johnson",
    category: "Biochemistry",
    status: "draft",
    tags: ["biochemistry", "proteins", "cellular biology"],
  },
  {
    id: "3",
    title: "Recent Advancements in CRISPR Technology",
    description: "Exploring the latest developments in CRISPR gene editing.",
    content: "<p>This is sample content about CRISPR technology advancements.</p>",
    date: "2023-05-10",
    author: "blogger2",
    authorFullName: "Dr. Michael Chen",
    category: "Biology",
    status: "published",
    tags: ["crispr", "gene editing", "biotechnology"],
  },
  {
    id: "4",
    title: "Introduction to COVID-19 Vaccines",
    description: "Understanding how mRNA vaccines work.",
    content: "<p>This is sample content about COVID-19 vaccine technology.</p>",
    date: "2023-06-10",
    author: "admin",
    authorFullName: "Dr. Jane Smith",
    category: "Medicine",
    status: "scheduled",
    scheduledDate: "2025-05-10T14:30:00.000Z",
    tags: ["covid", "vaccines", "mrna"],
  },
];

export default function MyArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Simulate API call to get user's articles
    setIsLoading(true);
    setTimeout(() => {
      let filteredArticles = [...mockArticles];
      
      // If not admin, only show the current user's articles
      if (!isAdmin && user) {
        filteredArticles = mockArticles.filter(article => article.author === user.username);
      }
      
      setArticles(filteredArticles);
      setIsLoading(false);
    }, 500);
  }, [isAdmin, user]);

  const filteredArticles = articles.filter(article => {
    // Apply status filter
    if (filter !== "all" && article.status !== filter) {
      return false;
    }
    
    // Apply search filter
    if (search && !article.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleCreateNew = () => {
    navigate("/blog/new");
  };

  const handleEdit = (id: string) => {
    navigate(`/blog/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/article/${id}`);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would be an API call to delete the article
    console.log("Deleting article:", id);
    
    // Update local state
    setArticles(prev => prev.filter(article => article.id !== id));
    
    toast({
      title: "Article deleted",
      description: "The article has been successfully deleted."
    });
  };

  const handlePublish = (id: string, shouldPublish: boolean) => {
    // In a real app, this would be an API call to publish/unpublish the article
    setArticles(prev => 
      prev.map(article => 
        article.id === id 
          ? { ...article, status: shouldPublish ? 'published' : 'draft' } 
          : article
      )
    );
    
    toast({
      title: shouldPublish ? "Article published" : "Article unpublished",
      description: shouldPublish 
        ? "The article has been published successfully." 
        : "The article has been moved back to drafts."
    });
  };

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {isAdmin ? "All Articles" : "My Articles"}
          </h1>
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select 
              value={filter} 
              onValueChange={(value: "all" | "published" | "draft" | "scheduled") => setFilter(value)}
            >
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Articles</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <p>Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-10 border rounded-md">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              {search ? "Try adjusting your search criteria." : "Start creating your first article."}
            </p>
            <Button onClick={handleCreateNew}>Create New Article</Button>
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Title</th>
                  {isAdmin && (
                    <th className="text-left p-3 font-medium hidden md:table-cell">Author</th>
                  )}
                  <th className="text-left p-3 font-medium hidden md:table-cell">Category</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-muted/50">
                    <td className="p-3">{article.title}</td>
                    {isAdmin && (
                      <td className="p-3 hidden md:table-cell">{article.authorFullName || article.author}</td>
                    )}
                    <td className="p-3 hidden md:table-cell">{article.category}</td>
                    <td className="p-3 hidden md:table-cell">
                      {article.status === 'scheduled' && article.scheduledDate
                        ? new Date(article.scheduledDate).toLocaleDateString()
                        : article.date}
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : article.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                      }`}>
                        {article.status === 'published' 
                          ? 'Published' 
                          : article.status === 'scheduled'
                          ? 'Scheduled'
                          : 'Draft'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        {article.status === 'published' && (
                          <Button variant="ghost" size="icon" onClick={() => handleView(article.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(article.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        {isAdmin && article.status === 'draft' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handlePublish(article.id, true)}
                            title="Publish article"
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        
                        {isAdmin && article.status === 'published' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handlePublish(article.id, false)}
                            title="Unpublish article"
                          >
                            <X className="h-4 w-4 text-amber-600" />
                          </Button>
                        )}
                        
                        {article.status === 'scheduled' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Scheduled for publication"
                          >
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
