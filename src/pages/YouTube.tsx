
import { useState, useEffect } from 'react';
import { youtubeService, YouTubeVideo } from '@/services/youtubeService';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Play as YouTubeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function YouTube() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const latestVideos = await youtubeService.getLatestVideos(6);
        setVideos(latestVideos);
        setSelectedVideo(latestVideos[0]); // Auto-select first video
        setError(null);
      } catch (err) {
        console.error('Failed to fetch YouTube videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoSelect = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="flex items-center gap-2 mb-6">
          <YouTubeIcon className="text-red-600" />
          <h1 className="text-3xl font-bold">InfoStream Africa YouTube Channel</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-full aspect-video rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="flex items-center gap-2 mb-6">
          <YouTubeIcon className="text-red-600" />
          <h1 className="text-3xl font-bold">InfoStream Africa YouTube Channel</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <YouTubeIcon className="text-red-600" />
          <h1 className="text-3xl font-bold">InfoStream Africa YouTube Channel</h1>
        </div>
        <Button variant="outline" asChild>
          <a 
            href="https://www.youtube.com/@InfoStreamAfrica" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            Visit YouTube Channel <ExternalLink className="size-4" />
          </a>
        </Button>
      </div>

      {selectedVideo && (
        <div className="mb-8">
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

      <h2 className="text-2xl font-semibold mb-4">Latest Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card 
            key={video.id} 
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedVideo?.id === video.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleVideoSelect(video)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm">Play Video</Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-2">{video.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{video.viewCount} views</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
