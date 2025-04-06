
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SaveButtonProps {
  itemId: string;
  itemType: "article" | "video";
  initialSaved?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
  className?: string;
}

export function SaveButton({
  itemId,
  itemType,
  initialSaved = false,
  size = "sm",
  variant = "ghost",
  className = "",
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to save this item.",
        action: <Button onClick={() => navigate('/login')}>Login</Button>,
      });
      return;
    }

    setIsLoading(true);
    
    // In a real app, this would be an API call to save/unsave the item
    setTimeout(() => {
      setIsSaved(!isSaved);
      setIsLoading(false);
      
      toast({
        title: isSaved ? "Removed from saved items" : "Saved successfully",
        description: isSaved 
          ? `${itemType === 'article' ? 'Article' : 'Video'} removed from your saved items` 
          : `${itemType === 'article' ? 'Article' : 'Video'} added to your saved items`,
      });
    }, 300);
  };

  const buttonSizes = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          disabled={isLoading}
          onClick={handleSave}
          className={`${buttonSizes[size]} ${isSaved ? "text-red-500 hover:text-red-600" : ""} ${className}`}
          aria-label={isSaved ? "Unsave" : "Save"}
        >
          <Heart className={`${iconSizes[size]} ${isSaved ? "fill-current" : ""}`} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isSaved ? "Remove from saved" : "Save for later"}
      </TooltipContent>
    </Tooltip>
  );
}
