
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Clock, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

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
      title: "Drafts", 
      value: "3", 
      description: "Pending completion", 
      icon: Edit2,
      path: "/writer/articles?status=draft"
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
    { id: "1", title: "Understanding Protein Synthesis in Medical Research", date: "2023-05-20", status: "published" },
    { id: "2", title: "CRISPR Technology: A Comprehensive Review", date: "2023-05-15", status: "draft" },
    { id: "3", title: "The Future of mRNA Vaccines", date: "2023-05-10", status: "scheduled" },
  ];

  const notifications = [
    { id: "1", message: "Your article 'Understanding Protein Synthesis' has been published.", time: "2 hours ago" },
    { id: "2", message: "Editor suggested changes to your draft 'CRISPR Technology'.", time: "1 day ago" },
  ];

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
                    <p className="text-sm text-muted-foreground">{article.date}</p>
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
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Recent updates and messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <p>{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No new notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
              onClick={() => navigate('/profile')}
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <Eye className="h-6 w-6" />
              <span>View Published Content</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
