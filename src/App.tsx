
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Search from "@/pages/Search";
import ArticleDetail from "@/pages/ArticleDetail";
import NotFound from "@/pages/NotFound";
import BlogEditor from "@/pages/BlogEditor";
import MyArticles from "@/pages/MyArticles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/medicine" element={<Dashboard />} />
              <Route path="/biochemistry" element={<Dashboard />} />
              <Route path="/biology" element={<Dashboard />} />
              <Route path="/clinical-research" element={<Dashboard />} />
              <Route path="/journals" element={<Dashboard />} />
              <Route path="/conferences" element={<Dashboard />} />
              
              {/* Blog writing platform routes */}
              <Route path="/blog/new" element={<BlogEditor />} />
              <Route path="/blog/edit/:id" element={<BlogEditor />} />
              <Route path="/my-articles" element={<MyArticles />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
