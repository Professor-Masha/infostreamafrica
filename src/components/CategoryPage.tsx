
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, LucideIcon } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Article } from "@/types/article";

interface CategoryPageProps {
  title: string;
  icon: LucideIcon;
  articles: Article[];
  trendingArticles: Article[];
}

export function CategoryPage({
  title,
  icon: Icon,
  articles,
  trendingArticles,
}: CategoryPageProps) {
  const navigate = useNavigate();
  
  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Trending in {title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingArticles.map((article) => (
              <ArticleCard
                key={article.id}
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
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <section className="lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold">Latest in {title}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
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
          <div className="lg:col-span-1">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
