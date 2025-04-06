
import React, { useState, useRef } from "react";
import { 
  Video, 
  Upload, 
  Trash2, 
  Filter, 
  Search,
  Edit,
  Eye,
  Plus
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
  DialogTrigger,
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

// Video interface
interface VideoData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
  uploadDate: string;
  duration: string;
  views: number;
  featured: boolean;
}

// Mock video data
const mockVideos: VideoData[] = [
  { 
    id: "1", 
    title: "Understanding Medical Research Methods", 
    description: "This video provides an overview of the most common medical research methods and their applications in clinical settings.", 
    category: "Medical Education", 
    tags: ["research", "medical", "methodology"],
    thumbnail: "https://picsum.photos/seed/med1/300/200", 
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
    uploadDate: "2023-05-20", 
    duration: "12:34",
    views: 1245,
    featured: true
  },
  { 
    id: "2", 
    title: "Latest Advancements in Cardiac Surgery", 
    description: "Exploring the cutting-edge techniques and technologies in modern cardiac surgery.", 
    category: "Medical Procedures", 
    tags: ["surgery", "cardiac", "technology"],
    thumbnail: "https://picsum.photos/seed/med2/300/200", 
    videoUrl: "https://www.youtube.com/watch?v=example2", 
    uploadDate: "2023-05-15", 
    duration: "25:10",
    views: 892,
    featured: false
  },
  { 
    id: "3", 
    title: "COVID-19 Vaccine Development Timeline", 
    description: "A detailed explanation of how COVID-19 vaccines were developed, tested, and approved in record time.", 
    category: "Virology", 
    tags: ["covid", "vaccine", "development"],
    thumbnail: "https://picsum.photos/seed/med3/300/200", 
    videoUrl: "https://www.youtube.com/watch?v=example3", 
    uploadDate: "2023-05-10", 
    duration: "18:45",
    views: 3210,
    featured: true
  },
];

// Available video categories
const videoCategories = [
  "Medical Education", 
  "Medical Procedures", 
  "Virology", 
  "Pharmacology", 
  "Anatomy", 
  "Biochemistry",
  "Pathology",
  "Clinical Practice"
];

export default function AdminVideos() {
  const [videos, setVideos] = useState<VideoData[]>(mockVideos);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  // Form state for new/edit video
  const [videoDialog, setVideoDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoData>({
    id: "",
    title: "",
    description: "",
    category: "",
    tags: [],
    thumbnail: "",
    videoUrl: "",
    uploadDate: new Date().toISOString().split('T')[0],
    duration: "",
    views: 0,
    featured: false
  });
  const [tagInput, setTagInput] = useState("");

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
      tags: [],
      thumbnail: "",
      videoUrl: "",
      uploadDate: new Date().toISOString().split('T')[0],
      duration: "",
      views: 0,
      featured: false
    });
    setTagInput("");
    setVideoDialog(true);
  };

  const openEditVideoDialog = (video: VideoData) => {
    setEditMode(true);
    setCurrentVideo({ ...video });
    setTagInput("");
    setVideoDialog(true);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !currentVideo.tags.includes(tagInput.trim())) {
      setCurrentVideo({
        ...currentVideo,
        tags: [...currentVideo.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCurrentVideo({
      ...currentVideo,
      tags: currentVideo.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleVideoUpload = () => {
    // In a real app, this would upload the video to a server/CDN
    // and get back a URL. For this example, we'll simulate it.
    
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      // Here we're just using the filename, in a real app you'd upload the file
      setCurrentVideo({
        ...currentVideo,
        videoUrl: URL.createObjectURL(file),
        duration: "00:00" // Would be extracted from the actual video
      });
      
      toast({
        title: "Video uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };

  const handleThumbnailUpload = () => {
    if (thumbnailInputRef.current?.files?.length) {
      const file = thumbnailInputRef.current.files[0];
      setCurrentVideo({
        ...currentVideo,
        thumbnail: URL.createObjectURL(file)
      });
      
      toast({
        title: "Thumbnail uploaded",
        description: `Thumbnail has been set successfully.`
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
    if (!currentVideo.videoUrl) {
      toast({
        title: "Missing video",
        description: "Please upload or provide a URL for the video.",
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
        title: "Video updated",
        description: "The video has been updated successfully."
      });
    } else {
      setVideos([...videos, currentVideo]);
      toast({
        title: "Video added",
        description: "The new video has been added successfully."
      });
    }
    
    setVideoDialog(false);
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    toast({
      title: "Video deleted",
      description: "The video has been removed successfully."
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
      description: `The video has been ${newStatus ? "added to" : "removed from"} featured videos.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Video Management</h1>
          <p className="text-muted-foreground">Upload and manage videos for different categories.</p>
        </div>
        <Button onClick={openAddVideoDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Video
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
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
              {videoCategories.map(category => (
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
              <Video className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No videos found</h3>
              <p className="text-muted-foreground mb-4">
                {search || categoryFilter !== "all"
                  ? "Try adjusting your filters."
                  : "Add your first video to get started."}
              </p>
              <Button onClick={openAddVideoDialog}>Add New Video</Button>
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
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                      {video.duration}
                    </div>
                    {video.featured && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                        Featured
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
                            <Eye className="mr-2 h-4 w-4" />
                            {video.featured ? "Unfeature" : "Feature"} 
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteVideo(video.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {video.description}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{video.category}</span>
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {video.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-muted text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
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
              <Video className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No videos found</h3>
              <p className="text-muted-foreground mb-4">
                {search || categoryFilter !== "all"
                  ? "Try adjusting your filters."
                  : "Add your first video to get started."}
              </p>
              <Button onClick={openAddVideoDialog}>Add New Video</Button>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Video</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Category</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">Upload Date</th>
                    <th className="text-left p-3 font-medium">Views</th>
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
                            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white px-1 text-[10px] rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{video.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{video.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">{video.category}</td>
                      <td className="p-3 hidden md:table-cell">{video.uploadDate}</td>
                      <td className="p-3">{video.views}</td>
                      <td className="p-3">
                        {video.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                            Regular
                          </span>
                        )}
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
                              <Eye className="mr-2 h-4 w-4" />
                              {video.featured ? "Unfeature" : "Feature"} 
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteVideo(video.id)}
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
        </TabsContent>
      </Tabs>

      {/* Video Add/Edit Dialog */}
      <Dialog open={videoDialog} onOpenChange={setVideoDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Video" : "Add New Video"}</DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Update the video details and content." 
                : "Add a new video to the platform."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
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
                    {videoCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add a tag" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} className="flex-shrink-0">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {currentVideo.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-muted text-sm px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Video Upload</Label>
                <div className="grid gap-2">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="video/*" 
                    onChange={handleVideoUpload}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </Button>
                  <Label htmlFor="videoUrl">Or enter video URL (YouTube, Vimeo, etc.)</Label>
                  <Input 
                    id="videoUrl" 
                    placeholder="https://..." 
                    value={currentVideo.videoUrl}
                    onChange={(e) => setCurrentVideo({...currentVideo, videoUrl: e.target.value})}
                  />
                </div>
                {currentVideo.videoUrl && !currentVideo.videoUrl.startsWith('blob:') && (
                  <div className="p-2 border rounded mt-2 text-sm break-all">
                    {currentVideo.videoUrl}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <div className="grid gap-2">
                  <input 
                    type="file" 
                    ref={thumbnailInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleThumbnailUpload}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Thumbnail
                  </Button>
                </div>
                {currentVideo.thumbnail && (
                  <div className="aspect-video mt-2 border rounded overflow-hidden">
                    <img 
                      src={currentVideo.thumbnail} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={currentVideo.featured}
                  onChange={(e) => setCurrentVideo({...currentVideo, featured: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Label htmlFor="featured">Feature this video</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVideo}>
              {editMode ? "Update Video" : "Add Video"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
