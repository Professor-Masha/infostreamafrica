
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// Mock data
const trendingArticles = [
  {
    id: "tr1",
    title: "UN Calls for Humanitarian Aid as Crisis Deepens",
    description: "Emergency response teams mobilize as conflict zones face severe food and medical shortages.",
    date: "June 16, 2023",
    author: "Michael Chang",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "tr2",
    title: "African Continental Free Trade Agreement Shows Early Success",
    description: "Intra-continental trade increases by 25% in first year of implementation as barriers are reduced.",
    date: "June 16, 2023",
    author: "Amina Mohammed",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "tr3",
    title: "Basketball Tournament Showcases Rising African Talent",
    description: "Scouts from international leagues attend championship as young players demonstrate world-class skills.",
    date: "June 15, 2023",
    author: "Charles Njoku",
    category: "Sports",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "tr4",
    title: "Lost Medieval Trade Routes Discovered in Desert Region",
    description: "Satellite imagery reveals forgotten commercial networks that connected ancient African kingdoms.",
    date: "June 15, 2023",
    author: "Dr. Sarah Mensah",
    category: "History",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1682687981907-170c006e3744?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: false,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "tr5",
    title: "Global Summit Addresses Climate Change Crisis",
    description: "World leaders gather to discuss urgent actions against rising global temperatures and extreme weather events.",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    category: "World News",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1623830551224-f89786251030?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
    isTrending: true,
    isUpdated: false,
  },
  {
    id: "tr6",
    title: "Renewable Energy Initiative Transforms Rural Communities",
    description: "Solar power projects bring electricity to previously unserved villages across multiple African nations.",
    date: "June 15, 2023",
    author: "Nana Akufo",
    category: "Africa",
    content: "",
    status: "published" as const,
    image: "https://images.unsplash.com/photo-1604004218771-c87c13fd96e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    isNew: true,
    isTrending: true,
    isUpdated: false,
  },
];

export default function Trending() {
  const navigate = useNavigate();
  
  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Trending Articles</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingArticles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              date={article.date}
              author={article.author}
              category={article.category}
              image={article.image}
              isNew={article.isNew}
              isTrending={article.isTrending}
              isUpdated={article.isUpdated}
              onClick={() => handleArticleClick(article.id)}
            />
          ))}
        </div>
      </section>

      <div className="lg:col-span-1 max-w-md mx-auto">
        <NewsletterSignup />
      </div>
    </div>
  );
}
