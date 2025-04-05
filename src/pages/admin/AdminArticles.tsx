
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  FileText, 
  Filter, 
  Download, 
  Check, 
  X,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Article } from "@/types/article";

// Mock data for articles
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Medical Research",
    description: "A beginner's guide to starting a career in medical research.",
    content: "<p>This is a sample content for the article about medical research.</p>",
    date: "2023-05-20",
    author: "admin",
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
    category: "Biology",
    status: "published",
    tags: ["crispr", "gene editing", "biotechnology"],
  },
  {
    id: "4",
    title: "The Role of Genetics in Cancer Research",
    description: "Understanding how genetic research is advancing cancer treatments.",
    content: "<p>Sample content about genetics and cancer research.</p>",
    date: "2023-05-05",
    author: "admin",
    category: "Medicine",
    status: "published",
    tags: ["genetics", "cancer", "research"],
  },
  {
    id: "5",
    title: "Biotechnology Trends for 2023",
    description: "Exploring the upcoming trends in biotechnology for 2023.",
    content: "<p>Sample content about biotechnology trends.</p>",
    date: "2023-05-01",
    author: "blogger1",
    category: "Technology",
    status: "draft",
    tags: ["biotechnology", "trends", "innovation"],
  },
];

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Extract unique categories from articles
  const categories = ["all", ...Array.from(new Set(articles.map(article => article.category)))];

  // Filter articles based on search, status, and category
  const filteredArticles = articles.filter(article => {
    // Status filter
    if (filter !== "all" && article.status !== filter) {
      return false;
    }
    
    // Category filter
    if (categoryFilter !== "all" && article.category !== categoryFilter) {
      return false;
    }
    
    // Search filter (case-insensitive)
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
    setArticles(prev => prev.filter(article => article.id !== id));
    
    toast({
      title: "Article deleted",
      description: "The article has been successfully deleted."
    });
  };

  const handlePublish = (id: string, shouldPublish: boolean) => {
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

  const exportArticles = () => {
    // In a real application, this would generate a CSV or Excel file
    toast({
      title: "Export initiated",
      description: "Your articles are being exported. The download will start shortly."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Articles Management</h1>
          <p className="text-muted-foreground">Manage all articles across the platform.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportArticles}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <Select 
            value={filter} 
            onValueChange={(value: "all" | "published" | "draft") => setFilter(value)}
          >
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Select 
            value={categoryFilter} 
            onValueChange={(value: string) => setCategoryFilter(value)}
          >
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredArticles.length === 0 ? (
        <div className="text-center py-10 border rounded-md">
          <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            {search || filter !== "all" || categoryFilter !== "all"
              ? "Try adjusting your filters."
              : "Start creating your first article."}
          </p>
          <Button onClick={handleCreateNew}>Create New Article</Button>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Author</th>
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
                  <td className="p-3">{article.author}</td>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(article.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(article.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {article.status === 'draft' && (
                          <DropdownMenuItem onClick={() => handlePublish(article.id, true)}>
                            <Check className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        {article.status === 'published' && (
                          <DropdownMenuItem onClick={() => handlePublish(article.id, false)}>
                            <X className="mr-2 h-4 w-4" />
                            Unpublish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
