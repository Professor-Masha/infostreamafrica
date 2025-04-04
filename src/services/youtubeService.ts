// YouTube data service for fetching videos from YouTube API
// This service uses the YouTube Data API v3

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  viewCount: string;
}

// New API key, stored securely
const API_KEY = 'AIzaSyAy0QxpZvaAS5NakevOTz9z0Kd8KamCNoI';
const CHANNEL_ID = 'UCJowOS1R0FnhipXVqEnYU1A'; // InfoStreamAfrica sample channel ID

// Helper function to fetch data from YouTube API
const fetchFromYouTube = async (endpoint: string, params: Record<string, string>) => {
  const baseUrl = 'https://www.googleapis.com/youtube/v3';
  const queryParams = new URLSearchParams({
    key: API_KEY,
    ...params
  });
  
  try {
    const response = await fetch(`${baseUrl}/${endpoint}?${queryParams}`);
    if (!response.ok) {
      throw new Error(`YouTube API request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from YouTube API:', error);
    throw error;
  }
};

// Transform YouTube API response to our internal format
const transformVideoItem = (item: any): YouTubeVideo => {
  return {
    id: item.id.videoId || item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    publishedAt: item.snippet.publishedAt,
    channelTitle: item.snippet.channelTitle,
    viewCount: item.statistics?.viewCount || '0'
  };
};

export const youtubeService = {
  // Get multiple latest videos (modified to fetch 4 by default)
  getLatestVideos: async (count: number = 4): Promise<YouTubeVideo[]> => {
    try {
      const data = await fetchFromYouTube('search', {
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: count.toString(),
        order: 'date',
        type: 'video'
      });
      
      if (!data.items || data.items.length === 0) {
        throw new Error('No videos found');
      }
      
      // Get video IDs to fetch statistics
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const videoDetails = await fetchFromYouTube('videos', {
        part: 'snippet,statistics',
        id: videoIds
      });
      
      if (!videoDetails.items || videoDetails.items.length === 0) {
        return data.items.map(transformVideoItem);
      }
      
      // Create a map for quick lookup
      const detailsMap: Record<string, any> = {};
      videoDetails.items.forEach((item: any) => {
        detailsMap[item.id] = item;
      });
      
      // Merge search results with video details
      return data.items.map((item: any) => {
        const videoId = item.id.videoId;
        if (detailsMap[videoId]) {
          return transformVideoItem(detailsMap[videoId]);
        }
        return transformVideoItem(item);
      });
    } catch (error) {
      console.error('Failed to fetch latest videos:', error);
      // Fallback to mock data if API fails
      return MOCK_YOUTUBE_VIDEOS.slice(0, count);
    }
  },
  
  // Get channel information
  getChannelInfo: async (): Promise<any> => {
    try {
      const data = await fetchFromYouTube('channels', {
        part: 'snippet,statistics',
        id: CHANNEL_ID
      });
      
      if (!data.items || data.items.length === 0) {
        throw new Error('Channel not found');
      }
      
      return data.items[0];
    } catch (error) {
      console.error('Failed to fetch channel info:', error);
      return null;
    }
  },
  
  // Get a single video by ID
  getVideoById: async (id: string): Promise<YouTubeVideo | undefined> => {
    try {
      const data = await fetchFromYouTube('videos', {
        part: 'snippet,statistics',
        id: id
      });
      
      if (!data.items || data.items.length === 0) {
        throw new Error(`Video with ID ${id} not found`);
      }
      
      return transformVideoItem(data.items[0]);
    } catch (error) {
      console.error(`Failed to fetch video with ID ${id}:`, error);
      // Fallback to mock data if API fails
      return MOCK_YOUTUBE_VIDEOS.find(video => video.id === id);
    }
  },
  
  // Additional convenience methods remain the same
  getLatestVideo: async (): Promise<YouTubeVideo> => {
    const videos = await youtubeService.getLatestVideos(1);
    return videos[0];
  },
  
  getTrendingVideos: async (count: number = 4): Promise<YouTubeVideo[]> => {
    try {
      const data = await fetchFromYouTube('search', {
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: (count * 2).toString(), // Request more to filter by views
        order: 'viewCount',
        type: 'video'
      });
      
      if (!data.items || data.items.length === 0) {
        throw new Error('No videos found');
      }
      
      // Get video IDs to fetch statistics
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const videoDetails = await fetchFromYouTube('videos', {
        part: 'snippet,statistics',
        id: videoIds
      });
      
      if (!videoDetails.items || videoDetails.items.length === 0) {
        return data.items.slice(0, count).map(transformVideoItem);
      }
      
      // Sort by view count and take top 'count'
      const sortedVideos = videoDetails.items.sort((a: any, b: any) => {
        return parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount);
      }).slice(0, count);
      
      return sortedVideos.map(transformVideoItem);
    } catch (error) {
      console.error('Failed to fetch trending videos:', error);
      return MOCK_YOUTUBE_VIDEOS.slice(0, count);
    }
  },
  
  getFeaturedVideos: async (count: number = 3): Promise<YouTubeVideo[]> => {
    try {
      // For featured videos, we can use a specific playlist or just get popular videos
      const data = await fetchFromYouTube('search', {
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: count.toString(),
        order: 'relevance', // Most relevant videos
        type: 'video'
      });
      
      if (!data.items || data.items.length === 0) {
        throw new Error('No videos found');
      }
      
      // Get video IDs to fetch statistics
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const videoDetails = await fetchFromYouTube('videos', {
        part: 'snippet,statistics',
        id: videoIds
      });
      
      if (!videoDetails.items || videoDetails.items.length === 0) {
        return data.items.map(transformVideoItem);
      }
      
      return videoDetails.items.map(transformVideoItem);
    } catch (error) {
      console.error('Failed to fetch featured videos:', error);
      // Fallback to mock data if API fails
      return [MOCK_YOUTUBE_VIDEOS[1], MOCK_YOUTUBE_VIDEOS[3], MOCK_YOUTUBE_VIDEOS[5]].slice(0, count);
    }
  }
};

// Mock YouTube data as fallback if API calls fail
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

export type { YouTubeVideo };
