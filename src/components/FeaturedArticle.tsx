
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const navigate = useNavigate();
  
  return (
    <div className="relative group cursor-pointer" onClick={() => navigate(`/article/${article.id}`)}>
      <div className="overflow-hidden rounded-lg">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded">
              {article.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{article.title}</h2>
          <p className="text-white/80 text-sm md:text-base line-clamp-2">{article.description}</p>
          <div className="flex justify-between items-center text-white/70 text-xs">
            <span>{article.author}</span>
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
