
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/types/article";

interface NewsGridProps {
  articles: Article[];
  title?: string;
}

export function NewsGrid({ articles, title }: NewsGridProps) {
  const navigate = useNavigate();
  
  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <section className="space-y-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
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
  );
}
