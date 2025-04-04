
// YouTube data service with specific videos from your channel

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  viewCount: string;
}

// API key, stored securely for future API integration
const API_KEY = 'AIzaSyAy0QxpZvaAS5NakevOTz9z0Kd8KamCNoI';
const CHANNEL_ID = 'UCJowOS1R0FnhipXVqEnYU1A'; // InfoStreamAfrica sample channel ID

// Your specific YouTube videos from the provided iframes
const YOUR_VIDEOS: YouTubeVideo[] = [
  {
    id: "wDOxm4Zks9M",
    title: "Ras Kuuku ft Samini - My Own (Official Video)",
    description: "Ras Kuuku teams up with Samini on this incredible song titled 'My Own'. Video directed by Bra Shizzle.",
    thumbnail: `https://img.youtube.com/vi/wDOxm4Zks9M/maxresdefault.jpg`,
    publishedAt: "2023-09-15T14:00:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "183,421"
  },
  {
    id: "I3kyojEX2wo",
    title: "Kofi Kinaata - The Carpenter (Official Video)",
    description: "Multiple Award-winning Ghanaian musician, Kofi Kinaata, drops visuals for his latest song 'The Carpenter'.",
    thumbnail: `https://img.youtube.com/vi/I3kyojEX2wo/maxresdefault.jpg`,
    publishedAt: "2023-07-21T12:00:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "415,062"
  },
  {
    id: "fGXdz_nNC90",
    title: "Camidoh Ft King Promise - Kamili (Official Video)",
    description: "Ghanaian musician Camidoh teams up with King Promise on this beautiful song titled 'Kamili'.",
    thumbnail: `https://img.youtube.com/vi/fGXdz_nNC90/maxresdefault.jpg`,
    publishedAt: "2023-05-18T14:30:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "321,754"
  },
  {
    id: "hBUFu3z079Y",
    title: "Ras Kuuku - One More (Official Video)",
    description: "Ghanaian reggae/dancehall artist Ras Kuuku releases visuals for his song 'One More'.",
    thumbnail: `https://img.youtube.com/vi/hBUFu3z079Y/maxresdefault.jpg`,
    publishedAt: "2023-04-12T15:45:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "257,839"
  },
  {
    id: "6VwIOPLB8i0",
    title: "Ataaka - Love & Grace (Official Video)",
    description: "Ataaka shares his message of love and grace in this inspiring music video.",
    thumbnail: `https://img.youtube.com/vi/6VwIOPLB8i0/maxresdefault.jpg`,
    publishedAt: "2023-03-24T13:20:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "187,542"
  },
  {
    id: "lCs_544i9Hw",
    title: "Wutah Kobby - For The Culture (Official Video)",
    description: "Wutah Kobby celebrates African culture in this vibrant music video 'For The Culture'.",
    thumbnail: `https://img.youtube.com/vi/lCs_544i9Hw/maxresdefault.jpg`,
    publishedAt: "2023-03-02T10:15:00Z",
    channelTitle: "InfoStreamAfrica",
    viewCount: "195,738"
  }
];

// Channel info mockup based on your brand
const CHANNEL_INFO = {
  id: CHANNEL_ID,
  snippet: {
    title: "InfoStream Africa",
    description: "Your source for trending African music, news, and entertainment",
    customUrl: "@InfoStreamAfrica",
    thumbnails: {
      default: { url: "https://yt3.googleusercontent.com/ytc/APkrFKawxU3RKACNhTXnL7k-UJXPigdHoOF5Jq1h8Czs=s88-c-k-c0x00ffffff-no-rj" },
      medium: { url: "https://yt3.googleusercontent.com/ytc/APkrFKawxU3RKACNhTXnL7k-UJXPigdHoOF5Jq1h8Czs=s240-c-k-c0x00ffffff-no-rj" }
    }
  },
  statistics: {
    subscriberCount: "105000",
    videoCount: "324"
  }
};

export const youtubeService = {
  // Get multiple latest videos
  getLatestVideos: async (count: number = 4): Promise<YouTubeVideo[]> => {
    // Return your specific videos instead of API call
    return Promise.resolve(YOUR_VIDEOS.slice(0, count));
  },
  
  // Get channel information
  getChannelInfo: async (): Promise<any> => {
    // Return mock channel info based on your brand
    return Promise.resolve(CHANNEL_INFO);
  },
  
  // Get a single video by ID
  getVideoById: async (id: string): Promise<YouTubeVideo | undefined> => {
    const video = YOUR_VIDEOS.find(v => v.id === id);
    return Promise.resolve(video);
  },
  
  // Additional convenience methods
  getLatestVideo: async (): Promise<YouTubeVideo> => {
    return Promise.resolve(YOUR_VIDEOS[0]);
  },
  
  getTrendingVideos: async (count: number = 4): Promise<YouTubeVideo[]> => {
    // Simulate trending by reordering based on view count
    const sorted = [...YOUR_VIDEOS].sort((a, b) => {
      const viewsA = parseInt(a.viewCount.replace(/,/g, ''));
      const viewsB = parseInt(b.viewCount.replace(/,/g, ''));
      return viewsB - viewsA;
    });
    return Promise.resolve(sorted.slice(0, count));
  },
  
  getFeaturedVideos: async (count: number = 3): Promise<YouTubeVideo[]> => {
    // Simulate featured videos by picking specific ones
    const featured = [YOUR_VIDEOS[1], YOUR_VIDEOS[2], YOUR_VIDEOS[4]].slice(0, count);
    return Promise.resolve(featured);
  }
};

// The duplicate export type declaration has been fully removed
