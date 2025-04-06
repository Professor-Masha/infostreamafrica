
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface NavigationItem {
  name: string;
  path: string;
}

export function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    { name: "Home", path: "/" },
    { name: "News", path: "/world-news" },
    { name: "Africa", path: "/africa" },
    { name: "Health", path: "/health" },
    { name: "Science", path: "/science" },
    { name: "Technology", path: "/technology" },
    { name: "Sport", path: "/sports" },
    { name: "Culture", path: "/journals" },
    { name: "Videos", path: "/videos" },
    { name: "YouTube", path: "/youtube" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-background">
      <div className="max-w-7xl mx-auto">
        <ul className="flex overflow-x-auto whitespace-nowrap">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "px-4 py-3 text-sm font-medium relative transition-colors hover:bg-muted/50",
                  location.pathname === item.path && 
                  "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-primary"
                )}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
