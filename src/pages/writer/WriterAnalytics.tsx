
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChart3, Heart, Eye, AreaChart, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

export default function WriterAnalytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("30days");
  
  // Mock data for analytics
  const overviewStats = [
    { title: "Total Articles", value: "12", change: "+2", icon: BarChart },
    { title: "Total Views", value: "8,432", change: "+12%", icon: Eye },
    { title: "Total Saves", value: "512", change: "+8%", icon: Heart },
    { title: "Avg. Read Time", value: "4m 32s", change: "+0.5m", icon: Users },
  ];
  
  const topArticles = [
    { id: "1", title: "Understanding Climate Change in Africa", views: 1240, saves: 78, published: "2023-06-15" },
    { id: "2", title: "Renewable Energy Solutions for Rural Areas", views: 980, saves: 63, published: "2023-07-22" },
    { id: "3", title: "Water Conservation Technologies", views: 856, saves: 51, published: "2023-08-10" },
    { id: "4", title: "Sustainable Agriculture Practices", views: 745, saves: 42, published: "2023-09-05" },
    { id: "5", title: "Impact of Deforestation on Local Communities", views: 632, saves: 38, published: "2023-10-18" },
  ];
  
  const monthlyData = {
    views: [1200, 1580, 1750, 2100, 1850, 2300, 2450, 2800, 3100, 3400, 3700, 3900],
    saves: [65, 82, 91, 108, 95, 115, 122, 135, 148, 172, 183, 195],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track the performance of your articles and content</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                <Badge variant={stat.change.startsWith('+') ? "default" : "destructive"} className="text-xs">
                  {stat.change}
                </Badge>
                <p className="text-xs text-muted-foreground ml-2">from previous period</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detail">Detailed Analytics</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Views and saves over the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {/* This would be a chart in a real application */}
              <div className="h-full flex flex-col">
                <div className="text-sm font-medium mb-2 flex justify-between">
                  <span>Views</span>
                  <span className="text-primary">34,832 total</span>
                </div>
                <div className="flex-1 flex items-end gap-1">
                  {monthlyData.views.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary rounded-t" 
                        style={{ height: `${(value / Math.max(...monthlyData.views)) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-1">{monthlyData.months[index]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 mb-2 text-sm font-medium flex justify-between">
                  <span>Saves</span>
                  <span className="text-green-600">1,561 total</span>
                </div>
                <div className="flex-1 flex items-end gap-1">
                  {monthlyData.saves.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-green-500 rounded-t" 
                        style={{ height: `${(value / Math.max(...monthlyData.saves)) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-1">{monthlyData.months[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Articles</CardTitle>
              <CardDescription>Articles with the most views and saves</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div key={article.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted transition-colors">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted-foreground/10">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{article.title}</p>
                      <p className="text-xs text-muted-foreground">Published {article.published}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{article.saves.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detail" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Article Performance Details</CardTitle>
              <CardDescription>
                In-depth statistics for each article
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Detailed analytics would be shown here with charts for individual articles
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>
                Information about your readers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Audience demographics and analytics would be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
