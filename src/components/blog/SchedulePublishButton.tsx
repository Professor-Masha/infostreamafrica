
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";

interface SchedulePublishButtonProps {
  article: Article;
  isLoading: boolean;
  onSave: (status: 'draft' | 'published') => void;
}

export function SchedulePublishButton({ 
  article, 
  isLoading, 
  onSave 
}: SchedulePublishButtonProps) {
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-1" 
      disabled={isLoading}
    >
      <Calendar className="h-4 w-4" />
      Scheduled
    </Button>
  );
}
