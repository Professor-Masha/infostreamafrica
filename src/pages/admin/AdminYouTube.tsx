
import React, { useState } from "react";
import { 
  Youtube, 
  Trash2, 
  Filter, 
  Search,
  Edit,
  Plus,
  Globe,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// YouTube video interface
interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  youtubeId: string;
  thumbnail: string;
  publishDate: string;
  channelTitle: string;
  featured: boolean;
  embedded: boolean;
}

// Mock YouTube videos
const mockYouTubeVideos: YouTubeVideo[] = [
  { 
    id: "1", 
    title: "Understanding Medical Research Methods", 
    description: "This video provides an overview of the most common medical research methods and their applications in clinical settings.", 
    category: "Medical Education", 
    youtubeId: "dQw4w9WgXcQ", 
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", 
    publishDate: "2023-05-20", 
    channelTitle: "MediScience Hub",
    featured: true,
    embedded: true
  },
  { 
    id: "2", 
    title: "Latest Advancements in Cardiac Surgery", 
    description: "Exploring the cutting-edge techniques and technologies in modern cardiac surgery.", 
    category: "Medical Procedures", 
    youtubeId: "Zr9qX9k1Y98", 
    thumbnail: "https://img.youtube.com/vi/Zr9qX9k1Y98/mqdefault.jpg", 
    publishDate: "2023-05-15", 
    channelTitle: "MediScience Hub",
    featured: false,
    embedded: true
  },
  { 
    id: "3", 
    title: "COVID-19 Vaccine Development Timeline", 
    description: "A detailed explanation of how COVID-19 vaccines were developed, tested, and approved in record time.", 
    category: "Virology", 
    youtubeId: "KMc3vL_MIeo", 
    thumbnail: "https://img.youtube.com/vi/KMc3vL_MIeo/mqdefault.jpg", 
    publishDate: "2023-05-10", 
    channelTitle: "MediScience Hub",
    featured: true,
    embedded: false
  },
];

// Available YouTube categories
const youtubeCategories = [
  "Medical Education", 
  "Medical Procedures", 
  "Virology", 
  "Pharmacology", 
  "Anatomy", 
  "Biochemistry",
  "Pathology",
  "Clinical Practice"
];

export default function AdminYouTube() {
  const [videos, setVideos] = useState<YouTubeVideo[]>(mockYouTubeVideos);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  
  // Form state for new/edit video
  const [videoDialog, setVideoDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<YouTubeVideo>({
    id: "",
    title: "",
    description: "",
    category: "",
    youtubeId: "",
    thumbnail: "",
    publishDate: new Date().toISOString().split('T')[0],
    channelTitle: "MediScience Hub",
    featured: false,
    embedded: true
  });

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    // Category filter
    if (categoryFilter !== "all" && video.category !== categoryFilter) {
      return false;
    }
    
    // Search filter (case-insensitive in title or description)
    if (search && !video.title.toLowerCase().includes(search.toLowerCase()) && 
        !video.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const openAddVideoDialog = () => {
    setEditMode(false);
    setCurrentVideo({
      id: Date.now().toString(),
      title: "",
      description: "",
      category: "",
      youtubeId: "",
      thumbnail: "",
      publishDate: new Date().toISOString().split('T')[0],
      channelTitle: "MediScience Hub",
      featured: false,
      embedded: true
    });
    setVideoDialog(true);
  };

  const openEditVideoDialog = (video: YouTubeVideo) => {
    setEditMode(true);
    setCurrentVideo({ ...video });
    setVideoDialog(true);
  };

  const extractYouTubeId = (url: string): string => {
    if (!url) return "";
    
    // Handle youtu.be URLs
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || "";
    }
    
    // Handle youtube.com URLs
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v') || "";
  };

  const handleYouTubeUrlChange = (url: string) => {
    try {
      const youtubeId = extractYouTubeId(url);
      
      if (youtubeId) {
        // Fetch video thumbnail and potentially other metadata
        const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
        
        setCurrentVideo({
          ...currentVideo,
          youtubeId,
          thumbnail
        });
      } else {
        setCurrentVideo({
          ...currentVideo,
          youtubeId: url, // Just store the input if we couldn't parse a YouTube ID
          thumbnail: ""
        });
      }
    } catch (error) {
      // If URL parsing fails, just store the raw input
      setCurrentVideo({
        ...currentVideo,
        youtubeId: url,
        thumbnail: ""
      });
    }
  };

  const validateVideoForm = () => {
    if (!currentVideo.title) {
      toast({
        title: "Missing title",
        description: "Please provide a title for the video.",
        variant: "destructive"
      });
      return false;
    }
    if (!currentVideo.description) {
      toast({
        title: "Missing description",
        description: "Please provide a description for the video.",
        variant: "destructive"
      });
      return false;
    }
    if (!currentVideo.category) {
      toast({
        title: "Missing category",
        description: "Please select a category for the video.",
        variant: "destructive"
      });
      return false;
    }
    if (!currentVideo.youtubeId) {
      toast({
        title: "Missing YouTube URL or ID",
        description: "Please provide a YouTube URL or ID.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSaveVideo = () => {
    if (!validateVideoForm()) return;
    
    if (editMode) {
      setVideos(videos.map(video => 
        video.id === currentVideo.id ? currentVideo : video
      ));
      toast({
        title: "YouTube video updated",
        description: "The YouTube video has been updated successfully."
      });
    } else {
      setVideos([...videos, currentVideo]);
      toast({
        title: "YouTube video added",
        description: "The new YouTube video has been added successfully."
      });
    }
    
    setVideoDialog(false);
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    toast({
      title: "YouTube video removed",
      description: "The YouTube video has been removed successfully."
    });
  };

  const handleToggleFeatured = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, featured: !video.featured } : video
    ));
    
    const video = videos.find(v => v.id === id);
    const newStatus = !video?.featured;
    
    toast({
      title: newStatus ? "Video featured" : "Video unfeatured",
      description: `The YouTube video has been ${newStatus ? "added to" : "removed from"} featured videos.`
    });
  };

  const handleToggleEmbedded = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, embedded: !video.embedded } : video
    ));
    
    const video = videos.find(v => v.id === id);
    const newStatus = !video?.embedded;
    
    toast({
      title: newStatus ? "Video embedded" : "Video embedding disabled",
      description: `The YouTube video will ${newStatus ? "be embedded" : "link to YouTube"} on the frontend.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">YouTube Management</h1>
          <p className="text-muted-foreground">Manage YouTube videos displayed on the platform.</p>
        </div>
        <Button onClick={openAddVideoDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add YouTube Video
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search YouTube videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="w-full md:w-64">
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
              {youtubeCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-10 border rounded-md">
              <Youtube className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No YouTube videos found</h3>
              <p className="text-muted-foreground mb-4">
                {search || categoryFilter !== "all"
                  ? "Try adjusting your filters."
                  : "Add your first YouTube video to get started."}
              </p>
              <Button onClick={openAddVideoDialog}>Add YouTube Video</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    {video.featured && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                        Featured
                      </div>
                    )}
                    {video.embedded ? (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                        Embedded
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 text-xs rounded flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        Link
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditVideoDialog(video)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFeatured(video.id)}>
                            {video.featured ? (
                              <>Remove from Featured</>
                            ) : (
                              <>Add to Featured</>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleEmbedded(video.id)}>
                            {video.embedded ? (
                              <>Disable Embedding</>
                            ) : (
                              <>Enable Embedding</>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => window.open(`https://youtube.com/watch?v=${video.youtubeId}`, "_blank")}
                          >
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Open on YouTube
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteVideo(video.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {video.description}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{video.category}</span>
                      <span>{video.channelTitle}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-10 border rounded-md">
              <Youtube className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No YouTube videos found</h3>
              <p className="text-muted-foreground mb-4">
                {search || categoryFilter !== "all"
                  ? "Try adjusting your filters."
                  : "Add your first YouTube video to get started."}
              </p>
              <Button onClick={openAddVideoDialog}>Add YouTube Video</Button>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Video</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Category</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
                    <th className="text-left p-3 font-medium">Channel</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredVideos.map((video) => (
                    <tr key={video.id} className="hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="h-12 w-20 mr-3 relative flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="h-full w-full object-cover rounded"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{video.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{video.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">{video.category}</td>
                      <td className="p-3 hidden md:table-cell">{video.publishDate}</td>
                      <td className="p-3">{video.channelTitle}</td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          {video.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Featured
                            </span>
                          )}
                          {video.embedded ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Embedded
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                              Link Only
                            </span>
                          )}
                        </div>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openEditVideoDialog(video)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFeatured(video.id)}>
                              {video.featured ? (
                                <>Remove from Featured</>
                              ) : (
                                <>Add to Featured</>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleEmbedded(video.id)}>
                              {video.embedded ? (
                                <>Disable Embedding</>
                              ) : (
                                <>Enable Embedding</>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => window.open(`https://youtube.com/watch?v=${video.youtubeId}`, "_blank")}
                            >
                              <ArrowUpRight className="mr-2 h-4 w-4" />
                              Open on YouTube
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteVideo(video.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
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
        </TabsContent>
      </Tabs>

      {/* YouTube Video Add/Edit Dialog */}
      <Dialog open={videoDialog} onOpenChange={setVideoDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit YouTube Video" : "Add YouTube Video"}</DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Update the YouTube video details." 
                : "Add a YouTube video to the platform."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube URL or Video ID</Label>
              <Input 
                id="youtubeUrl" 
                placeholder="https://www.youtube.com/watch?v=... or video ID" 
                value={currentVideo.youtubeId}
                onChange={(e) => handleYouTubeUrlChange(e.target.value)}
              />
            </div>
            
            {currentVideo.thumbnail && (
              <div className="aspect-video border rounded overflow-hidden">
                <img 
                  src={currentVideo.thumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="Enter video title" 
                value={currentVideo.title}
                onChange={(e) => setCurrentVideo({...currentVideo, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter video description" 
                className="min-h-[100px]"
                value={currentVideo.description}
                onChange={(e) => setCurrentVideo({...currentVideo, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={currentVideo.category} 
                onValueChange={(value: string) => 
                  setCurrentVideo({...currentVideo, category: value})
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {youtubeCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={currentVideo.featured}
                  onCheckedChange={(checked) => 
                    setCurrentVideo({...currentVideo, featured: checked})
                  }
                />
                <Label htmlFor="featured">Feature this video</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="embedded"
                  checked={currentVideo.embedded}
                  onCheckedChange={(checked) => 
                    setCurrentVideo({...currentVideo, embedded: checked})
                  }
                />
                <Label htmlFor="embedded">Embed on website (instead of linking to YouTube)</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVideo}>
              {editMode ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
