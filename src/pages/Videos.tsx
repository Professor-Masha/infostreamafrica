
import { useState, useEffect } from 'react';
import { youtubeService, YouTubeVideo } from '@/services/youtubeService';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Star } from 'lucide-react';

export default function Videos() {
  const [trendingVideos, setTrendingVideos] = useState<YouTubeVideo[]>([]);
  const [latestVideos, setLatestVideos] = useState<YouTubeVideo[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trending");
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const [trending, latest, featured] = await Promise.all([
          youtubeService.getTrendingVideos(4),
          youtubeService.getLatestVideos(4),
          youtubeService.getFeaturedVideos(3)
        ]);
        
        setTrendingVideos(trending);
        setLatestVideos(latest);
        setFeaturedVideos(featured);
        
        // Set initial selected video based on active tab
        if (activeTab === "trending") setSelectedVideo(trending[0]);
        else if (activeTab === "latest") setSelectedVideo(latest[0]);
        else setSelectedVideo(featured[0]);
        
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Set selected video based on new active tab
    if (value === "trending" && trendingVideos.length) setSelectedVideo(trendingVideos[0]);
    else if (value === "latest" && latestVideos.length) setSelectedVideo(latestVideos[0]);
    else if (value === "featured" && featuredVideos.length) setSelectedVideo(featuredVideos[0]);
  };

  const handleVideoSelect = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl" />
        <div className="relative p-8">
          <h1 className="text-4xl font-bold mb-2">Info Stream Africa Videos</h1>
          <p className="text-xl text-muted-foreground">Discover the latest and most popular videos from across Africa</p>
        </div>
      </div>

      {/* Main video player section */}
      {selectedVideo && !isLoading && (
        <div className="mb-10">
          <VideoPlayer 
            videoId={selectedVideo.id} 
            title={selectedVideo.title} 
            autoPlay={true} 
          />
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">{selectedVideo.title}</h2>
            <p className="text-muted-foreground mt-2">{selectedVideo.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>{new Date(selectedVideo.publishedAt).toLocaleDateString()}</span>
              <span>{selectedVideo.viewCount} views</span>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="mb-10">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="mt-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-1" />
          </div>
        </div>
      )}

      {/* Tabs for different video categories */}
      <Tabs defaultValue="trending" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="size-4" /> Trending
          </TabsTrigger>
          <TabsTrigger value="latest" className="flex items-center gap-2">
            <Clock className="size-4" /> Latest
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2">
            <Star className="size-4" /> Featured
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : (
              trendingVideos.map((video) => (
                <div 
                  key={video.id}
                  className={`group cursor-pointer rounded-lg overflow-hidden border ${selectedVideo?.id === video.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                      {video.viewCount} views
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="latest" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : (
              latestVideos.map((video) => (
                <div 
                  key={video.id}
                  className={`group cursor-pointer rounded-lg overflow-hidden border ${selectedVideo?.id === video.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-1 rounded">
                      New
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : (
              featuredVideos.map((video) => (
                <div 
                  key={video.id}
                  className={`group cursor-pointer rounded-lg overflow-hidden border ${selectedVideo?.id === video.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-1 rounded-full py-0.5 flex items-center gap-1">
                      <Star className="size-3" /> Featured
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
