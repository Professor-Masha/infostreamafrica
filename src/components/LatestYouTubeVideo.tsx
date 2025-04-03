
import { useState, useEffect } from 'react';
import { youtubeService, YouTubeVideo } from '@/services/youtubeService';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function LatestYouTubeVideo() {
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        setIsLoading(true);
        const latestVideo = await youtubeService.getLatestVideo();
        setVideo(latestVideo);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch latest YouTube video:', err);
        setError('Failed to load the latest video. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  if (isLoading) {
    return (
      <div className="my-8 border border-border rounded-lg overflow-hidden">
        <div className="bg-muted p-4">
          <h2 className="text-xl font-semibold">Latest from Our YouTube Channel</h2>
        </div>
        <div className="p-4">
          <Skeleton className="w-full aspect-video" />
          <div className="mt-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
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

  if (!video) return null;

  return (
    <div className="my-8 border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-muted p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Latest from Our YouTube Channel</h2>
        <Button variant="outline" size="sm" asChild>
          <a 
            href="https://www.youtube.com/@InfoStreamAfrica" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            Visit Channel <ExternalLink className="size-3.5" />
          </a>
        </Button>
      </div>
      <div className="p-4">
        <VideoPlayer 
          videoId={video.id} 
          title={video.title} 
        />
        <div className="mt-4">
          <h3 className="text-lg font-medium">{video.title}</h3>
          <p className="text-muted-foreground mt-1">{video.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
            <span>{video.viewCount} views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
