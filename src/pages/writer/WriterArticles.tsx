
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@/types/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  FileText, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash, 
  Eye, 
  Copy, 
  PlusCircle,
  ExternalLink,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for articles
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Understanding Protein Synthesis in Medical Research",
    description: "A comprehensive guide to protein synthesis mechanisms and their implications in medical research.",
    content: "<p>This is the full content of the article about protein synthesis...</p>",
    date: "2023-05-20",
    author: "currentuser",
    authorFullName: "John Doe",
    category: "Biochemistry",
    image: "https://picsum.photos/seed/med1/800/400",
    isNew: false,
    isTrending: true,
    tags: ["protein", "synthesis", "biochemistry", "medical-research"],
    status: "published"
  },
  {
    id: "2",
    title: "CRISPR Technology: A Comprehensive Review",
    description: "Exploring the revolutionary CRISPR technology and its applications in modern medicine.",
    content: "<p>Draft content about CRISPR technology...</p>",
    date: "2023-05-15",
    author: "currentuser",
    category: "Genetics",
    tags: ["crispr", "genetics", "gene-editing", "technology"],
    status: "draft"
  },
  {
    id: "3",
    title: "The Future of mRNA Vaccines",
    description: "Analyzing the potential and future applications of mRNA vaccine technology beyond COVID-19.",
    content: "<p>Content about mRNA vaccines and their future applications...</p>",
    date: "2023-05-10",
    author: "currentuser",
    authorFullName: "John Doe",
    category: "Immunology",
    image: "https://picsum.photos/seed/med3/800/400",
    tags: ["mrna", "vaccines", "immunology", "future-tech"],
    status: "scheduled",
    scheduledDate: "2023-06-01T09:00:00.000Z"
  },
  {
    id: "4",
    title: "Advancements in Neuroscience: Brain Mapping Techniques",
    description: "Exploring the latest techniques in brain mapping and their significance in neuroscience research.",
    content: "<p>Content about brain mapping techniques...</p>",
    date: "2023-04-25",
    author: "currentuser",
    authorFullName: "John Doe",
    category: "Neuroscience",
    image: "https://picsum.photos/seed/med4/800/400",
    isNew: true,
    tags: ["neuroscience", "brain-mapping", "research", "technology"],
    status: "published"
  },
  {
    id: "5",
    title: "The Role of Epigenetics in Disease Prevention",
    description: "Understanding how epigenetic factors influence disease development and prevention strategies.",
    content: "<p>Draft content about epigenetics...</p>",
    date: "2023-04-20",
    author: "currentuser",
    category: "Epigenetics",
    tags: ["epigenetics", "disease-prevention", "genetics", "health"],
    status: "draft"
  }
];

export default function WriterArticles() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(
    new URLSearchParams(location.search).get("status") || "all"
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  // Get unique categories from articles
  const categories = Array.from(new Set(articles.map(article => article.category)));

  // Filter articles based on search, status, and category
  const filteredArticles = articles.filter(article => {
    // Status filter
    if (statusFilter !== "all" && article.status !== statusFilter) {
      return false;
    }
    
    // Category filter
    if (categoryFilter !== "all" && article.category !== categoryFilter) {
      return false;
    }
    
    // Search filter (case-insensitive in title or description)
    if (search && !article.title.toLowerCase().includes(search.toLowerCase()) && 
        !article.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleEditArticle = (id: string) => {
    navigate(`/writer/edit/${id}`);
  };

  const handleViewArticle = (id: string) => {
    navigate(`/article/${id}`);
  };

  const confirmDeleteArticle = (id: string) => {
    setArticleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteArticle = () => {
    if (articleToDelete) {
      setArticles(articles.filter(article => article.id !== articleToDelete));
      toast({
        title: "Article deleted",
        description: "The article has been permanently deleted."
      });
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };

  const handleDuplicateArticle = (id: string) => {
    const articleToDuplicate = articles.find(article => article.id === id);
    if (articleToDuplicate) {
      const duplicatedArticle: Article = {
        ...articleToDuplicate,
        id: Date.now().toString(),
        title: `Copy of ${articleToDuplicate.title}`,
        status: "draft",
        date: new Date().toISOString().split('T')[0]
      };
      setArticles([...articles, duplicatedArticle]);
      toast({
        title: "Article duplicated",
        description: "A copy of the article has been created as a draft."
      });
    }
  };

  const getStatusIcon = (status: 'draft' | 'published' | 'scheduled') => {
    switch (status) {
      case 'published':
        return <Eye className="h-4 w-4 text-green-500" />;
      case 'draft':
        return <Edit className="h-4 w-4 text-amber-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadgeClass = (status: 'draft' | 'published' | 'scheduled') => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'draft':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Articles</h1>
          <p className="text-muted-foreground">Manage your articles and drafts</p>
        </div>
        <Button onClick={() => navigate('/writer/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Article Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select 
                value={statusFilter} 
                onValueChange={(value: string) => setStatusFilter(value)}
              >
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Drafts</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
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
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
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
                {search || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your filters."
                  : "Create your first article to get started."}
              </p>
              <Button onClick={() => navigate('/writer/new')}>Create New Article</Button>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {article.image ? (
                            <div className="h-10 w-10 mr-3 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={article.image} 
                                alt={article.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 mr-3 bg-muted rounded flex items-center justify-center flex-shrink-0">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium line-clamp-1">{article.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1 md:hidden">{article.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{article.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(article.status)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getStatusBadgeClass(article.status)
                          }`}>
                            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                          </span>
                        </div>
                        {article.status === 'scheduled' && article.scheduledDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(article.scheduledDate).toLocaleDateString()}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{article.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditArticle(article.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {article.status === 'published' && (
                              <DropdownMenuItem onClick={() => handleViewArticle(article.id)}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Published
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDuplicateArticle(article.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => confirmDeleteArticle(article.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteArticle}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
