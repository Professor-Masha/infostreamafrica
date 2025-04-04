
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultExpanded?: boolean;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search articles, journals, and topics...", 
  defaultExpanded = true 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
    }
  };

  // Mobile search toggle
  const toggleSearch = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      // Focus the input after expanding
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else if (query) {
      // If there's a query and we're expanded, submit the search
      onSearch(query);
    }
  };

  return (
    <div className="flex w-full max-w-3xl">
      {/* Desktop search bar */}
      <form 
        onSubmit={handleSubmit} 
        className="relative hidden md:flex w-full"
      >
        <Input
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Mobile search bar */}
      <div className="flex md:hidden items-center w-full">
        {isExpanded ? (
          <form 
            onSubmit={handleSubmit} 
            className="relative flex w-full animate-fade-in"
          >
            <Input
              ref={inputRef}
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="pr-10"
              autoFocus
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
              onClick={toggleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSearch}
            className="ml-auto"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
