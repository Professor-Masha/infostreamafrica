
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from "@/pages/Dashboard";
import Search from "@/pages/Search";
import ArticleDetail from "@/pages/ArticleDetail";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import WorldNews from "@/pages/WorldNews";
import Africa from "@/pages/Africa";
import Sports from "@/pages/Sports";
import HistoryPage from "@/pages/History";
import Trending from "@/pages/Trending";
import Analytics from "@/pages/Analytics";
import YouTube from "@/pages/YouTube";
import Videos from "@/pages/Videos";
import UserProfile from "@/pages/UserProfile";
import Science from "@/pages/Science";
import Health from "@/pages/Health";
import Technology from "@/pages/Technology";
import Journals from "@/pages/Journals";
import Conferences from "@/pages/Conferences";
import Business from "@/pages/Business";
import MyArticles from "@/pages/MyArticles";
import BlogEditor from "@/pages/BlogEditor";
import { AdminLayout } from "@/components/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminArticles from "@/pages/admin/AdminArticles";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminVideos from "@/pages/admin/AdminVideos";
import AdminYouTube from "@/pages/admin/AdminYouTube";
import { WriterLayout } from "@/components/WriterLayout";
import WriterDashboard from "@/pages/writer/WriterDashboard";
import WriterArticles from "@/pages/writer/WriterArticles";
import WriterAnalytics from "@/pages/writer/WriterAnalytics";
import VideoDetail from "@/pages/VideoDetail";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Google Client ID - In a real app, use environment variables
// Updated the Google Client ID with a dummy value for demo purposes
// In a production app, you should replace this with your actual Google OAuth Client ID
const GOOGLE_CLIENT_ID = "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public login route */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* Admin routes with admin layout */}
                  <Route element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/articles" element={<AdminArticles />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/admin/videos" element={<AdminVideos />} />
                    <Route path="/admin/youtube" element={<AdminYouTube />} />
                  </Route>
                  
                  {/* Writer routes with writer layout */}
                  <Route element={
                    <ProtectedRoute requiredRole="blogger">
                      <WriterLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="/writer" element={<WriterDashboard />} />
                    <Route path="/writer/articles" element={<WriterArticles />} />
                    <Route path="/writer/analytics" element={<WriterAnalytics />} />
                    <Route path="/writer/new" element={<BlogEditor />} />
                    <Route path="/writer/edit/:id" element={<BlogEditor />} />
                  </Route>
                  
                  {/* Public routes within layout */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                    <Route path="/video/:id" element={<VideoDetail />} />
                    <Route path="/trending" element={<Trending />} />
                    
                    {/* YouTube and Videos pages */}
                    <Route path="/youtube" element={<YouTube />} />
                    <Route path="/videos" element={<Videos />} />
                    
                    {/* Category pages */}
                    <Route path="/world-news" element={<WorldNews />} />
                    <Route path="/africa" element={<Africa />} />
                    <Route path="/business" element={<Business />} />
                    <Route path="/sports" element={<Sports />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/science" element={<Science />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="/technology" element={<Technology />} />
                    <Route path="/journals" element={<Journals />} />
                    <Route path="/conferences" element={<Conferences />} />
                    
                    {/* User profile page */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } />
                    
                    {/* My Articles page */}
                    <Route path="/my-articles" element={
                      <ProtectedRoute>
                        <MyArticles />
                      </ProtectedRoute>
                    } />
                    
                    {/* Blog Editor routes */}
                    <Route path="/blog/new" element={
                      <ProtectedRoute>
                        <BlogEditor />
                      </ProtectedRoute>
                    } />
                    <Route path="/blog/edit/:id" element={
                      <ProtectedRoute>
                        <BlogEditor />
                      </ProtectedRoute>
                    } />
                    
                    {/* Admin analytics page */}
                    <Route path="/analytics" element={
                      <ProtectedRoute requiredRole="admin">
                        <Analytics />
                      </ProtectedRoute>
                    } />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
