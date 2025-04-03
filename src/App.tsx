
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
const GOOGLE_CLIENT_ID = "AIzaSyDGstr3wQQI-pozTpV3KRlVaWsYMXtNrxk";

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
                  
                  {/* Public routes within layout */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                    <Route path="/trending" element={<Trending />} />
                    
                    {/* YouTube and Videos pages */}
                    <Route path="/youtube" element={<YouTube />} />
                    <Route path="/videos" element={<Videos />} />
                    
                    {/* Category pages */}
                    <Route path="/world-news" element={<WorldNews />} />
                    <Route path="/africa" element={<Africa />} />
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
