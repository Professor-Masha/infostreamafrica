
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  className?: string;
  onClick?: () => void;
}

export function CategoryCard({
  icon: Icon,
  title,
  count,
  className,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 bg-card border rounded-lg shadow-sm text-center card-hover cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <Icon className="h-8 w-8 mb-2 text-primary" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{count} articles</p>
    </div>
  );
}
