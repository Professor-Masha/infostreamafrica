
// YouTube data service for fetching videos from YouTube API
// Note: For a production app, you would use a real API key

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  viewCount: string;
}

// Mock YouTube data
const MOCK_YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "video1",
    title: "Latest News from Africa - Weekly Update",
    description: "Get the latest updates on what's happening across Africa this week.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=Africa+Weekly+Update",
    publishedAt: "2025-04-01T10:30:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "12,453"
  },
  {
    id: "video2",
    title: "Economic Development in East Africa",
    description: "Exploring the economic boom in East African countries and what it means for the region.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=Economic+Development",
    publishedAt: "2025-03-28T14:15:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "8,732"
  },
  {
    id: "video3",
    title: "Climate Change Effects on African Agriculture",
    description: "How climate change is affecting farming practices across the continent.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=Climate+Change+Africa",
    publishedAt: "2025-03-25T09:45:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "15,287"
  },
  {
    id: "video4",
    title: "African Tech Startups to Watch in 2025",
    description: "The most innovative African tech startups making waves this year.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=African+Tech+Startups",
    publishedAt: "2025-03-21T16:20:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "20,198"
  },
  {
    id: "video5",
    title: "Traditional African Cuisines You Need to Try",
    description: "Exploring delicious traditional foods from different African regions.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=African+Cuisines",
    publishedAt: "2025-03-18T11:00:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "9,546"
  },
  {
    id: "video6",
    title: "Africa's Rising Influence in Global Politics",
    description: "How African nations are gaining more prominence in international relations.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=African+Global+Politics",
    publishedAt: "2025-03-15T13:30:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "11,782"
  },
  {
    id: "video7",
    title: "Wildlife Conservation Success Stories from Africa",
    description: "Highlighting successful conservation efforts across African national parks.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=Wildlife+Conservation",
    publishedAt: "2025-03-10T15:45:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "14,325"
  },
  {
    id: "video8",
    title: "African Fashion Trends 2025",
    description: "The latest fashion trends emerging from African designers.",
    thumbnail: "https://via.placeholder.com/480x360.png?text=African+Fashion",
    publishedAt: "2025-03-05T12:15:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "18,963"
  }
];

// In a real app, you would use the YouTube Data API with a proper API key
export const youtubeService = {
  getLatestVideo: async (): Promise<YouTubeVideo> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return the first video as the latest
    return MOCK_YOUTUBE_VIDEOS[0];
  },
  
  getLatestVideos: async (count: number = 6): Promise<YouTubeVideo[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    // Return the requested number of videos
    return MOCK_YOUTUBE_VIDEOS.slice(0, count);
  },
  
  getTrendingVideos: async (count: number = 4): Promise<YouTubeVideo[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    // For mock data, we'll sort by view count (in a real app, this would come from the API)
    return [...MOCK_YOUTUBE_VIDEOS]
      .sort((a, b) => parseInt(b.viewCount.replace(/,/g, '')) - parseInt(a.viewCount.replace(/,/g, '')))
      .slice(0, count);
  },
  
  getFeaturedVideos: async (count: number = 3): Promise<YouTubeVideo[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    // For mock data, we'll just pick some videos (in a real app, this would be curated)
    return [MOCK_YOUTUBE_VIDEOS[1], MOCK_YOUTUBE_VIDEOS[3], MOCK_YOUTUBE_VIDEOS[5]].slice(0, count);
  },
  
  getVideoById: async (id: string): Promise<YouTubeVideo | undefined> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_YOUTUBE_VIDEOS.find(video => video.id === id);
  }
};

export type { YouTubeVideo };
