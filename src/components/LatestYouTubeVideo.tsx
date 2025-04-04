
import { useState, useEffect } from 'react';
import { youtubeService, YouTubeVideo } from '@/services/youtubeService';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Play as YouTubeIcon } from 'lucide-react';

export function LatestYouTubeVideo() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [channelInfo, setChannelInfo] = useState<any>(null);

  useEffect(() => {
    const fetchVideosAndChannel = async () => {
      try {
        setIsLoading(true);
        const [latestVideos, channelData] = await Promise.all([
          youtubeService.getLatestVideos(4),
          youtubeService.getChannelInfo()
        ]);
        
        setVideos(latestVideos);
        setSelectedVideo(latestVideos[0]); // Auto-select first video
        setChannelInfo(channelData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch YouTube data:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideosAndChannel();
  }, []);

  if (isLoading) {
    return (
      <div className="my-8 border border-border rounded-lg overflow-hidden">
        <div className="bg-muted p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Latest from Our YouTube Channel</h2>
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="p-4">
          <Skeleton className="w-full aspect-video" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-video w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 border border-border rounded-lg overflow-hidden">
        <div className="bg-muted p-4">
          <h2 className="text-xl font-semibold">Latest from Our YouTube Channel</h2>
        </div>
        <div className="p-8 text-center text-muted-foreground">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!videos.length) return null;

  const channelUrl = channelInfo?.snippet?.customUrl
    ? `https://www.youtube.com/${channelInfo.snippet.customUrl}`
    : 'https://www.youtube.com/@InfoStreamAfrica';
    
  return (
    <div className="my-8 border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-muted p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <YouTubeIcon className="text-red-600 h-5 w-5" />
          <h2 className="text-xl font-semibold">Latest from Our YouTube Channel</h2>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a 
            href={channelUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            Visit Channel <ExternalLink className="size-3.5" />
          </a>
        </Button>
      </div>
      
      <div className="p-4">
        {selectedVideo && (
          <div className="mb-4">
            <VideoPlayer 
              videoId={selectedVideo.id} 
              title={selectedVideo.title} 
            />
            <div className="mt-2">
              <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{selectedVideo.description}</p>
            </div>
          </div>
        )}
        
        <h3 className="font-medium mt-4 mb-3">More Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((video) => (
            <Card 
              key={video.id} 
              className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedVideo?.id === video.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedVideo(video)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm" className="text-xs">Play Video</Button>
                  </div>
                </div>
                <div className="p-2">
                  <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
