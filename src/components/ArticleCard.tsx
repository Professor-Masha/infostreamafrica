
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isUpdated?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ArticleCard({
  title,
  description,
  date,
  author,
  category,
  image,
  isNew,
  isTrending,
  isUpdated,
  className,
  onClick,
}: ArticleCardProps) {
  return (
    <div
      className={cn(
        "article-card flex flex-col cursor-pointer animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1 p-2">
            {isNew && <span className="badge-new">New</span>}
            {isTrending && <span className="badge-trending">Trending</span>}
            {isUpdated && <span className="badge-updated">Updated</span>}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 text-xs font-medium text-muted-foreground">
          {category} • {date}
        </div>
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <div className="text-xs text-muted-foreground">By {author}</div>
      </div>
    </div>
  );
}
