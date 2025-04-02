
import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  AreaChart, Area
} from "recharts";
import { RefreshCcw, Trash2 } from "lucide-react";
import { analyticsService, InteractionEvent } from "@/services/analyticsService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(analyticsService.getAnalyticsSummary());
  const { toast } = useToast();
  
  // Format for view count chart
  const viewsData = Object.entries(analyticsData.mostViewed)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Format for clicks chart
  const clicksData = Object.entries(analyticsData.mostClicked)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Format for category breakdown
  const categoryData = Object.entries(analyticsData.categoryBreakdown)
    .map(([name, value]) => ({ name, value }));
  
  // Format for timeline data (last 7 days)
  const timelineData = (() => {
    const now = new Date();
    const result = [];
    const eventsByDay: Record<string, number> = {};
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateStr = date.toLocaleDateString();
      eventsByDay[dateStr] = 0;
    }
    
    // Count events by day
    analyticsData.recentInteractions.forEach(event => {
      const date = new Date(event.timestamp);
      const dateStr = date.toLocaleDateString();
      if (eventsByDay[dateStr] !== undefined) {
        eventsByDay[dateStr]++;
      }
    });
    
    // Convert to array for chart
    Object.entries(eventsByDay).forEach(([date, count]) => {
      result.push({ date, count });
    });
    
    return result;
  })();

  // Listen for analytics updates
  useEffect(() => {
    const unsubscribe = analyticsService.subscribe(() => {
      setAnalyticsData(analyticsService.getAnalyticsSummary());
    });
    
    return unsubscribe;
  }, []);
  
  const handleRefresh = () => {
    setAnalyticsData(analyticsService.getAnalyticsSummary());
    toast({
      title: "Analytics Refreshed",
      description: "Latest data has been loaded.",
    });
  };
  
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all analytics data? This cannot be undone.")) {
      analyticsService.clearAnalytics();
      setAnalyticsData(analyticsService.getAnalyticsSummary());
    }
  };
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const getInteractionLabel = (type: string) => {
    switch(type) {
      case 'view': return 'Viewed';
      case 'click': return 'Clicked';
      case 'share': return 'Shared';
      case 'bookmark': return 'Bookmarked';
      case 'read': return 'Read';
      case 'trend': return 'Trend Clicked';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="destructive" onClick={handleClear} className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Clear Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Interactions</CardTitle>
            <CardDescription>All tracked events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{analyticsData.recentInteractions.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Content categories engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{Object.keys(analyticsData.categoryBreakdown).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>Unique articles interacted with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {new Set([
                ...Object.keys(analyticsData.mostViewed),
                ...Object.keys(analyticsData.mostClicked)
              ]).size}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Viewed Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="id" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="Views" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Most Clicked Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={clicksData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="id" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#82ca9d" name="Clicks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Recent Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Time</th>
                      <th className="text-left p-2">Article ID</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Interaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.recentInteractions.slice(0, 20).map((event, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="p-2">{formatTimestamp(event.timestamp)}</td>
                        <td className="p-2">{event.articleId}</td>
                        <td className="p-2">{event.category}</td>
                        <td className="p-2">{getInteractionLabel(event.type)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="raw">
          <Card>
            <CardHeader>
              <CardTitle>Raw Analytics Data</CardTitle>
              <CardDescription>
                All recorded interactions in JSON format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[500px] text-xs">
                {JSON.stringify(analyticsService.getAllEvents(), null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
