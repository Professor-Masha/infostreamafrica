
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // In a real application, these would be fetched from an API
  const stats = [
    { 
      title: "Total Articles", 
      value: "257", 
      description: "12 new articles this week", 
      icon: FileText,
      path: "/admin/articles"
    },
    { 
      title: "Total Views", 
      value: "24.8K", 
      description: "8.7% increase from last week", 
      icon: Eye,
      path: "/admin/analytics"
    },
    { 
      title: "Registered Users", 
      value: "1,203", 
      description: "145 new users this month", 
      icon: Users,
      path: "/admin/users"
    },
    { 
      title: "Categories", 
      value: "9", 
      description: "Medicine, Biochemistry, and more", 
      icon: BarChart3,
      path: "/admin/settings"
    },
  ];

  const recentArticles = [
    { id: "1", title: "Getting Started with Medical Research", author: "admin", date: "2023-05-20", status: "published" },
    { id: "2", title: "Understanding Protein Synthesis", author: "blogger1", date: "2023-05-15", status: "draft" },
    { id: "3", title: "Recent Advancements in CRISPR Technology", author: "blogger2", date: "2023-05-10", status: "published" },
  ];

  const handleArticleClick = (id: string) => {
    navigate(`/admin/articles/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your InfoStream Africa platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(stat.path)}>
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
              Overview of the latest articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-sm text-muted-foreground">By {article.author} • {article.date}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                  }`}>
                    {article.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequent tasks and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button 
                onClick={() => navigate("/blog/new")} 
                className="w-full flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                <span>Create New Article</span>
              </button>
              <button 
                onClick={() => navigate("/admin/users")} 
                className="w-full flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Manage Users</span>
              </button>
              <button 
                onClick={() => navigate("/admin/analytics")} 
                className="w-full flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                <span>View Analytics</span>
              </button>
              <button 
                onClick={() => navigate("/admin/settings")} 
                className="w-full flex items-center p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Configure Settings</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
