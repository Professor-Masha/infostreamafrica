
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article } from "@/types/article";
import { Heart, Trash2, Eye, Calendar, FileText, Video as VideoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock saved articles and videos for the user
  const savedArticles = [
    { 
      id: "1", 
      title: "Understanding Climate Change in Africa", 
      description: "An in-depth look at climate change effects across the African continent.",
      date: "2023-10-15", 
      author: "John Smith",
      category: "Environment"
    },
    { 
      id: "2", 
      title: "Traditional Medicine in Modern Healthcare", 
      description: "How traditional African medicines are being integrated into modern healthcare systems.",
      date: "2023-09-22", 
      author: "Sarah Johnson",
      category: "Health"
    },
    { 
      id: "3", 
      title: "Renewable Energy Solutions for Rural Areas", 
      description: "Innovative approaches to providing sustainable energy in rural African communities.",
      date: "2023-08-30", 
      author: "David Okafor",
      category: "Technology"
    },
  ];
  
  const savedVideos = [
    { 
      id: "1", 
      title: "Africa's Tech Revolution", 
      description: "How technology is transforming business and society across Africa.",
      duration: "18:24", 
      creator: "Tech Insights",
      category: "Technology",
      thumbnailUrl: "https://via.placeholder.com/320x180?text=Africa's+Tech+Revolution"
    },
    { 
      id: "2", 
      title: "Wildlife Conservation Efforts", 
      description: "Current initiatives to protect Africa's endangered species.",
      duration: "24:15", 
      creator: "Nature Explorers",
      category: "Environment",
      thumbnailUrl: "https://via.placeholder.com/320x180?text=Wildlife+Conservation"
    },
  ];

  const recentActivity = [
    { action: "Saved article", item: "Understanding Climate Change in Africa", date: "2023-10-15" },
    { action: "Saved video", item: "Africa's Tech Revolution", date: "2023-10-13" },
    { action: "Commented on", item: "Traditional Medicine in Modern Healthcare", date: "2023-10-10" },
    { action: "Saved article", item: "Renewable Energy Solutions for Rural Areas", date: "2023-10-05" },
  ];

  const handleRemoveSavedItem = (id: string, type: 'article' | 'video') => {
    // In a real app, this would remove the item from the saved items list
    console.log(`Removing ${type} with id: ${id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user?.username} />
                  ) : (
                    <AvatarFallback className="text-4xl">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <CardTitle className="text-center">{user?.fullName || user?.username}</CardTitle>
                <CardDescription className="text-center">{user?.email}</CardDescription>
                
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline" className="py-1">
                    <FileText className="h-3 w-3 mr-1" />
                    Reader
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                  <ul className="space-y-2">
                    {recentActivity.map((activity, index) => (
                      <li key={index} className="text-sm">
                        <span className="text-muted-foreground">{activity.action}:</span> {activity.item}
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/settings')}>
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="saved-articles">
                <FileText className="h-4 w-4 mr-2" />
                Saved Articles
              </TabsTrigger>
              <TabsTrigger value="saved-videos">
                <VideoIcon className="h-4 w-4 mr-2" />
                Saved Videos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved-articles" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedArticles.length > 0 ? (
                  savedArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge className="mb-2">{article.category}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSavedItem(article.id, 'article')}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <CardTitle className="text-lg cursor-pointer hover:text-blue-600" onClick={() => navigate(`/article/${article.id}`)}>
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{article.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span>By {article.author}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/article/${article.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Read Article
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No saved articles yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Articles you save will appear here for easy access.
                    </p>
                    <Button onClick={() => navigate('/')}>Browse Articles</Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="saved-videos" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedVideos.length > 0 ? (
                  savedVideos.map((video) => (
                    <Card key={video.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge className="mb-2">{video.category}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSavedItem(video.id, 'video')}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <div className="relative mb-3 aspect-video overflow-hidden rounded-md">
                          <img 
                            src={video.thumbnailUrl} 
                            alt={video.title} 
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <CardTitle className="text-lg cursor-pointer hover:text-blue-600" onClick={() => navigate(`/video/${video.id}`)}>
                          {video.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{video.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>By {video.creator}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/video/${video.id}`)}>
                          <VideoIcon className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No saved videos yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Videos you save will appear here for easy access.
                    </p>
                    <Button onClick={() => navigate('/videos')}>Browse Videos</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
