
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Clock, Edit2, Heart, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function WriterDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // In a real application, these would be fetched from an API
  const stats = [
    { 
      title: "My Articles", 
      value: "12", 
      description: "2 published this month", 
      icon: FileText,
      path: "/writer/articles"
    },
    { 
      title: "Total Views", 
      value: "5.2K", 
      description: "12% increase from last month", 
      icon: Eye 
    },
    { 
      title: "Saves", 
      value: "324", 
      description: "18 saves this week", 
      icon: Heart 
    },
    { 
      title: "Scheduled", 
      value: "2", 
      description: "Upcoming publications", 
      icon: Clock,
      path: "/writer/articles?status=scheduled"
    },
  ];

  const recentArticles = [
    { id: "1", title: "Understanding Protein Synthesis in Medical Research", date: "2023-05-20", status: "published", views: 732, saves: 45 },
    { id: "2", title: "CRISPR Technology: A Comprehensive Review", date: "2023-05-15", status: "draft", views: 0, saves: 0 },
    { id: "3", title: "The Future of mRNA Vaccines", date: "2023-05-10", status: "scheduled", views: 0, saves: 0 },
  ];

  const topPerformingArticles = [
    { id: "4", title: "African Medical Innovations", views: 1245, saves: 89 },
    { id: "5", title: "Healthcare Systems in West Africa", views: 978, saves: 67 },
    { id: "6", title: "Traditional Medicine in Modern Africa", views: 864, saves: 52 },
  ];

  const weeklyPerformance = {
    views: [320, 420, 380, 450, 620, 580, 490],
    saves: [12, 18, 15, 22, 30, 25, 20],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  };

  const handleArticleClick = (id: string) => {
    navigate(`/writer/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Writer Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.fullName || user?.username}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card 
            key={stat.title} 
            className={`cursor-pointer hover:shadow-md transition-shadow ${stat.path ? 'hover:border-blue-200' : ''}`}
            onClick={() => stat.path && navigate(stat.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>
              Views and saves for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Views</p>
                  <p className="text-sm text-muted-foreground">3,260 total</p>
                </div>
                <div className="flex items-center gap-1">
                  {weeklyPerformance.views.map((view, index) => (
                    <div key={index} className="relative flex-1">
                      <div 
                        className="bg-primary h-16 rounded-sm" 
                        style={{ height: `${(view / Math.max(...weeklyPerformance.views)) * 60}px` }}
                      ></div>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-5 text-xs">
                        {weeklyPerformance.days[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Saves</p>
                  <p className="text-sm text-muted-foreground">142 total</p>
                </div>
                <div className="flex items-center gap-1">
                  {weeklyPerformance.saves.map((save, index) => (
                    <div key={index} className="relative flex-1">
                      <div 
                        className="bg-green-500 h-8 rounded-sm" 
                        style={{ height: `${(save / Math.max(...weeklyPerformance.saves)) * 40}px` }}
                      ></div>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-5 text-xs">
                        {weeklyPerformance.days[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Articles</CardTitle>
            <CardDescription>
              Your most popular content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topPerformingArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="space-y-2 cursor-pointer hover:bg-muted p-2 rounded-md transition-colors"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <p className="font-medium">{article.title}</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-muted-foreground">Views: {article.views}</p>
                        <Eye className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <Progress value={(article.views / 1500) * 100} className="h-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-muted-foreground">Saves: {article.saves}</p>
                        <Heart className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <Progress value={(article.saves / 100) * 100} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
          <CardDescription>
            Your latest content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <div 
                key={article.id} 
                className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                onClick={() => handleArticleClick(article.id)}
              >
                <div>
                  <p className="font-medium">{article.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground gap-3 mt-1">
                    <p>{article.date}</p>
                    {article.status !== 'draft' && article.status !== 'scheduled' && (
                      <>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{article.saves}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  article.status === 'published' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : article.status === 'draft'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {article.status === 'published' ? 'Published' : article.status === 'draft' ? 'Draft' : 'Scheduled'}
                </span>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/writer/articles')}
            >
              View All Articles
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              onClick={() => navigate('/writer/new')}
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <FileText className="h-6 w-6" />
              <span>Create New Article</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/writer/articles?status=draft')}
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <Edit2 className="h-6 w-6" />
              <span>Continue Draft</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/writer/analytics')}
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <BarChart className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
