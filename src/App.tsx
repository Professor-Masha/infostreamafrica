
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Search from "@/pages/Search";
import ArticleDetail from "@/pages/ArticleDetail";
import NotFound from "@/pages/NotFound";
import BlogEditor from "@/pages/BlogEditor";
import MyArticles from "@/pages/MyArticles";
import Login from "@/pages/Login";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import WorldNews from "@/pages/WorldNews";
import Africa from "@/pages/Africa";
import Sports from "@/pages/Sports";
import HistoryPage from "@/pages/History";
import Trending from "@/pages/Trending";
import Analytics from "@/pages/Analytics";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
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
                  
                  {/* Category pages */}
                  <Route path="/world-news" element={<WorldNews />} />
                  <Route path="/africa" element={<Africa />} />
                  <Route path="/sports" element={<Sports />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/science" element={<Dashboard />} />
                  <Route path="/health" element={<Dashboard />} />
                  <Route path="/technology" element={<Dashboard />} />
                  <Route path="/journals" element={<Dashboard />} />
                  <Route path="/conferences" element={<Dashboard />} />
                  
                  {/* Admin analytics page */}
                  <Route path="/analytics" element={
                    <ProtectedRoute requiredRole="admin">
                      <Analytics />
                    </ProtectedRoute>
                  } />

                  {/* Protected routes for both blogger and admin */}
                  <Route path="/blog/new" element={
                    <ProtectedRoute requiredRole="any">
                      <BlogEditor />
                    </ProtectedRoute>
                  } />
                  <Route path="/blog/edit/:id" element={
                    <ProtectedRoute requiredRole="any">
                      <BlogEditor />
                    </ProtectedRoute>
                  } />
                  <Route path="/my-articles" element={
                    <ProtectedRoute requiredRole="any">
                      <MyArticles />
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
  );
};

export default App;
