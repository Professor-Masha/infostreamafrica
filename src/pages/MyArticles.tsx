
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Eye, Plus, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/types/article";

// Mock data for user's articles
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Medical Research",
    description: "A beginner's guide to starting a career in medical research.",
    content: "<p>This is a sample content for the article about medical research.</p>",
    date: "2023-05-20",
    author: "Dr. John Smith",
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
    author: "Dr. Jane Doe",
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
    author: "Dr. Alex Johnson",
    category: "Biology",
    status: "published",
    tags: ["crispr", "gene editing", "biotechnology"],
  },
];

export default function MyArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to get user's articles
    setIsLoading(true);
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 500);
  }, []);

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

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Articles</h1>
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
            onValueChange={(value: "all" | "published" | "draft") => setFilter(value)}
          >
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Articles</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
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
                  <td className="p-3 hidden md:table-cell">{article.category}</td>
                  <td className="p-3 hidden md:table-cell">{article.date}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {article.status === 'published' ? 'Published' : 'Draft'}
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
  );
}
