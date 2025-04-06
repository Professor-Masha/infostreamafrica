
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/SaveButton";
import { Calendar, Share2, MessageSquare } from "lucide-react";

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, this would be fetched from an API
  const video = {
    id,
    title: "Africa's Tech Revolution: Innovations Changing the Continent",
    description: "This comprehensive documentary explores how technology is transforming business, education, healthcare, and society across Africa. From mobile banking solutions to agricultural innovations, discover how African entrepreneurs and communities are leveraging technology to solve local challenges and create opportunities.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example embed URL
    uploadDate: "2023-10-05",
    creator: "InfoStream Africa",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=ISA",
    category: "Technology",
    tags: ["technology", "innovation", "entrepreneurship", "africa", "digital transformation"],
    viewCount: 12530,
    saveCount: 856,
    commentCount: 128,
    relatedVideos: [
      { id: "v2", title: "Digital Education in Rural Africa", thumbnail: "https://via.placeholder.com/320x180?text=Digital+Education" },
      { id: "v3", title: "African Startups to Watch in 2023", thumbnail: "https://via.placeholder.com/320x180?text=African+Startups" },
      { id: "v4", title: "Mobile Banking Revolution in East Africa", thumbnail: "https://via.placeholder.com/320x180?text=Mobile+Banking" },
    ]
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <iframe 
              src={video.videoUrl} 
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Video Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary">{video.category}</Badge>
              <div className="text-sm text-muted-foreground">
                <Calendar className="inline h-4 w-4 mr-1" />
                {video.uploadDate}
              </div>
              <div className="text-sm text-muted-foreground">
                {video.viewCount.toLocaleString()} views
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <SaveButton 
                itemId={id || ""} 
                itemType="video" 
                size="md"
                variant="outline"
              />
              <Button variant="outline" size="sm" onClick={handleShareClick}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments ({video.commentCount})
              </Button>
            </div>
            
            {/* Creator Info */}
            <div className="flex items-center gap-3 mb-6">
              <Avatar>
                <AvatarImage src={video.creatorAvatar} alt={video.creator} />
                <AvatarFallback>{video.creator.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{video.creator}</h3>
                <p className="text-sm text-muted-foreground">Content Creator</p>
              </div>
              <Button size="sm" variant="secondary" className="ml-auto">
                Follow
              </Button>
            </div>
            
            {/* Video Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{video.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => navigate(`/search?q=${tag}`)}>
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Related Videos</CardTitle>
              <CardDescription>
                You might also be interested in these
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {video.relatedVideos.map((relatedVideo) => (
                  <div 
                    key={relatedVideo.id} 
                    className="flex gap-3 cursor-pointer hover:bg-muted p-2 rounded-md transition-colors"
                    onClick={() => navigate(`/video/${relatedVideo.id}`)}
                  >
                    <img 
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium line-clamp-2 text-sm">{relatedVideo.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{video.creator}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
