
import { toast } from "@/components/ui/use-toast";

// Types of interactions we'll track
export type InteractionType = 
  | 'view'      // Article viewed
  | 'click'     // Article card clicked
  | 'share'     // Article shared
  | 'bookmark'  // Article bookmarked
  | 'read'      // Article fully read (estimated)
  | 'trend';    // Trending click

// Structure of an interaction event
export interface InteractionEvent {
  articleId: string;
  category: string;
  type: InteractionType;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Structure for analytics data
export interface AnalyticsData {
  mostViewed: Record<string, number>;
  mostClicked: Record<string, number>;
  categoryBreakdown: Record<string, number>;
  recentInteractions: InteractionEvent[];
}

// In-memory store for analytics data
// In a real app, this would be persisted to a database
class AnalyticsService {
  private events: InteractionEvent[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Load from localStorage if available
    try {
      const storedEvents = localStorage.getItem('article_analytics');
      if (storedEvents) {
        this.events = JSON.parse(storedEvents);
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    }
  }

  // Track a new interaction
  trackInteraction(
    articleId: string,
    category: string,
    type: InteractionType,
    metadata?: Record<string, any>
  ) {
    const event: InteractionEvent = {
      articleId,
      category,
      type,
      timestamp: Date.now(),
      metadata,
    };

    this.events.push(event);
    
    // Persist to localStorage (simple storage solution)
    try {
      localStorage.setItem('article_analytics', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to save analytics data:', error);
    }

    // Notify listeners
    this.listeners.forEach(listener => listener());
    
    console.log(`Analytics: Tracked ${type} for article ${articleId}`);
  }

  // Subscribe to analytics updates
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Get all tracked events
  getAllEvents(): InteractionEvent[] {
    return [...this.events];
  }

  // Get analytics data summary
  getAnalyticsSummary(): AnalyticsData {
    const mostViewed: Record<string, number> = {};
    const mostClicked: Record<string, number> = {};
    const categoryBreakdown: Record<string, number> = {};

    // Process events to generate statistics
    this.events.forEach(event => {
      // Track views by article
      if (event.type === 'view') {
        mostViewed[event.articleId] = (mostViewed[event.articleId] || 0) + 1;
      }

      // Track clicks by article
      if (event.type === 'click') {
        mostClicked[event.articleId] = (mostClicked[event.articleId] || 0) + 1;
      }

      // Track interactions by category
      categoryBreakdown[event.category] = (categoryBreakdown[event.category] || 0) + 1;
    });

    // Get recent events, sorted by timestamp (newest first)
    const recentInteractions = [...this.events]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50); // Limit to 50 most recent

    return {
      mostViewed,
      mostClicked,
      categoryBreakdown,
      recentInteractions,
    };
  }

  // Clear all analytics data (for testing or privacy compliance)
  clearAnalytics() {
    this.events = [];
    localStorage.removeItem('article_analytics');
    this.listeners.forEach(listener => listener());
    toast({
      title: "Analytics Cleared",
      description: "All tracking data has been deleted.",
    });
  }
}

// Create a singleton instance
export const analyticsService = new AnalyticsService();
