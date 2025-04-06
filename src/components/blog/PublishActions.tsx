
import { Save, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import { SchedulePublishButton } from "./SchedulePublishButton";

interface PublishActionsProps {
  article: Article;
  isLoading: boolean;
  isAdmin: boolean;
  onSave: (status: 'draft' | 'published') => void;
}

export function PublishActions({ 
  article, 
  isLoading, 
  isAdmin, 
  onSave 
}: PublishActionsProps) {
  return (
    <div className="flex gap-2">
      {article.status === 'scheduled' ? (
        <SchedulePublishButton 
          article={article} 
          isLoading={isLoading} 
          onSave={onSave} 
        />
      ) : (
        <Button 
          variant="outline" 
          onClick={() => onSave('draft')} 
          disabled={isLoading}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
      )}
      
      {isAdmin && article.status !== 'scheduled' && (
        <Button 
          onClick={() => onSave('published')} 
          disabled={isLoading}
        >
          <FileCheck className="mr-2 h-4 w-4" />
          {isLoading ? "Publishing..." : "Publish"}
        </Button>
      )}
    </div>
  );
}
