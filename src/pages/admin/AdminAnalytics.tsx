
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Cell 
} from "recharts";
import { 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  Users, 
  Eye, 
  Clock,
  Download
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for analytics
const pageViewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 5000 },
  { name: "Apr", views: 7000 },
  { name: "May", views: 6000 },
  { name: "Jun", views: 8000 },
  { name: "Jul", views: 10000 },
  { name: "Aug", views: 12000 },
  { name: "Sep", views: 14000 },
  { name: "Oct", views: 16000 },
  { name: "Nov", views: 15000 },
  { name: "Dec", views: 18000 },
];

const userActivityData = [
  { name: "Mon", active: 500, new: 90 },
  { name: "Tue", active: 450, new: 80 },
  { name: "Wed", active: 600, new: 100 },
  { name: "Thu", active: 550, new: 85 },
  { name: "Fri", active: 700, new: 120 },
  { name: "Sat", active: 900, new: 150 },
  { name: "Sun", active: 800, new: 140 },
];

const categoryDistributionData = [
  { name: "Medicine", value: 30, color: "#8884d8" },
  { name: "Biochemistry", value: 20, color: "#83a6ed" },
  { name: "Biology", value: 15, color: "#8dd1e1" },
  { name: "Technology", value: 12, color: "#82ca9d" },
  { name: "Health", value: 10, color: "#a4de6c" },
  { name: "Science", value: 8, color: "#d0ed57" },
  { name: "Other", value: 5, color: "#ffc658" },
];

const topArticlesData = [
  { title: "Getting Started with Medical Research", views: 1542, category: "Medicine" },
  { title: "Understanding Protein Synthesis", views: 1289, category: "Biochemistry" },
  { title: "Recent Advancements in CRISPR Technology", views: 1176, category: "Biology" },
  { title: "The Role of Genetics in Cancer Research", views: 954, category: "Medicine" },
  { title: "Biotechnology Trends for 2023", views: 876, category: "Technology" },
];

const topSearchQueriesData = [
  { query: "medical research", count: 345 },
  { query: "protein synthesis", count: 290 },
  { query: "CRISPR", count: 276 },
  { query: "genetics cancer", count: 254 },
  { query: "biotechnology", count: 223 },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("90days");
  
  const downloadReport = () => {
    // In a real app, this would generate a report file
    console.log("Downloading analytics report...");
  };
  
  // Stat cards data
  const stats = [
    { 
      title: "Total Article Views", 
      value: "845,173", 
      change: "+12.5%", 
      isPositive: true,
      icon: Eye
    },
    { 
      title: "Avg. Time on Page", 
      value: "3m 42s", 
      change: "+8.3%", 
      isPositive: true,
      icon: Clock
    },
    { 
      title: "Active Users", 
      value: "15,492", 
      change: "+22.4%", 
      isPositive: true,
      icon: Users
    },
    { 
      title: "Bounce Rate", 
      value: "32.7%", 
      change: "-3.8%", 
      isPositive: true,
      icon: BarChart3
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track performance and user engagement.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={downloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.isPositive ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={`${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from previous period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Traffic Overview
          </TabsTrigger>
          <TabsTrigger value="content">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Content Analytics
          </TabsTrigger>
          <TabsTrigger value="users">
            <LineChartIcon className="h-4 w-4 mr-2" />
            User Activity
          </TabsTrigger>
        </TabsList>
        
        {/* Traffic Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Views Over Time</CardTitle>
              <CardDescription>
                Total number of article views by month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageViewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" name="Page Views" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Search Queries</CardTitle>
                <CardDescription>
                  Most popular search terms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {topSearchQueriesData.map((item, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-primary-foreground mr-2">
                          {index + 1}
                        </div>
                        <span>{item.query}</span>
                      </div>
                      <span className="text-muted-foreground">{item.count} searches</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  Where your visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Direct', value: 35 },
                        { name: 'Organic Search', value: 25 },
                        { name: 'Social Media', value: 20 },
                        { name: 'Referral', value: 15 },
                        { name: 'Other', value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Direct', value: 35, color: '#8884d8' },
                        { name: 'Organic Search', value: 25, color: '#83a6ed' },
                        { name: 'Social Media', value: 20, color: '#8dd1e1' },
                        { name: 'Referral', value: 15, color: '#82ca9d' },
                        { name: 'Other', value: 5, color: '#ffc658' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Content Analytics Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Distribution by Category</CardTitle>
              <CardDescription>
                Percentage of articles by category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Articles</CardTitle>
              <CardDescription>
                Articles with the most views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium">Title</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {topArticlesData.map((article, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="p-3">{article.title}</td>
                        <td className="p-3">{article.category}</td>
                        <td className="p-3">{article.views.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User Activity Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Active and new users over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="active" 
                    stroke="#8884d8" 
                    name="Active Users" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="new" 
                    stroke="#82ca9d" 
                    name="New Users" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  User distribution by location
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    layout="vertical" 
                    data={[
                      { country: "Nigeria", users: 4500 },
                      { country: "Kenya", users: 3200 },
                      { country: "South Africa", users: 2800 },
                      { country: "Ghana", users: 1900 },
                      { country: "Ethiopia", users: 1500 },
                      { country: "Other", users: 4100 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="country" type="category" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8884d8" name="Users" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Devices</CardTitle>
                <CardDescription>
                  Traffic by device type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Mobile', value: 65, color: '#8884d8' },
                        { name: 'Desktop', value: 25, color: '#83a6ed' },
                        { name: 'Tablet', value: 10, color: '#8dd1e1' },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Mobile', value: 65, color: '#8884d8' },
                        { name: 'Desktop', value: 25, color: '#83a6ed' },
                        { name: 'Tablet', value: 10, color: '#8dd1e1' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
