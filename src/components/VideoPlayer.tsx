
import { useState, useEffect } from 'react';
import { analyticsService } from "@/services/analyticsService";
import { Play, Maximize, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  autoPlay?: boolean;
  onPlay?: () => void;
}

export function VideoPlayer({ videoId, title, autoPlay = false, onPlay }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLDivElement | null>(null);

  // Track video play in analytics
  useEffect(() => {
    if (isPlaying) {
      analyticsService.trackInteraction(videoId, 'video', 'play', { title });
      onPlay?.();
    }
  }, [isPlaying, videoId, title, onPlay]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleFullScreen = () => {
    if (videoElement) {
      if (!document.fullscreenElement) {
        videoElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const fullScreenChangeHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', fullScreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullScreenChangeHandler);
    };
  }, []);

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-black" 
      ref={element => setVideoElement(element)}
    >
      {!isPlaying ? (
        <div className="relative">
          {/* Video thumbnail with play button overlay */}
          <img 
            src={`https://via.placeholder.com/1280x720.png?text=${encodeURIComponent(title)}`} 
            alt={title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              className="size-16 rounded-full bg-primary/90 hover:bg-primary text-white"
              onClick={handlePlay}
            >
              <Play className="size-8" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* This would be a real YouTube embed in production */}
          <div className="aspect-video bg-black flex items-center justify-center">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video"
            ></iframe>
          </div>
          
          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-end gap-2 bg-gradient-to-t from-black/80 to-transparent text-white">
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={handleToggleMute}
            >
              {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={handleFullScreen}
            >
              <Maximize className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
