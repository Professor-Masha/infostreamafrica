
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FlaskConical,
  Pill,
  Leaf,
  BookOpen,
  Thermometer,
  Search,
  Home,
  Calendar,
  FileEdit,
  FilePlus,
  FileText,
} from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "Search",
      href: "/search",
      icon: Search,
    },
  ];

  const categoryNavItems = [
    {
      name: "Medicine",
      href: "/medicine",
      icon: Pill,
    },
    {
      name: "Biochemistry",
      href: "/biochemistry",
      icon: FlaskConical,
    },
    {
      name: "Biology",
      href: "/biology",
      icon: Leaf,
    },
    {
      name: "Clinical Research",
      href: "/clinical-research",
      icon: Thermometer,
    },
    {
      name: "Journals",
      href: "/journals",
      icon: BookOpen,
    },
    {
      name: "Conferences",
      href: "/conferences",
      icon: Calendar,
    },
  ];

  const blogNavItems = [
    {
      name: "My Articles",
      href: "/my-articles",
      icon: FileText,
    },
    {
      name: "Write New Article",
      href: "/blog/new",
      icon: FilePlus,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background pb-10 sm:flex",
        className
      )}
    >
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-semibold">MediScience Hub</h2>
        <p className="text-xs text-muted-foreground">
          Latest medical and scientific research
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={location.pathname === item.href}
              onClick={() => navigate(item.href)}
            />
          ))}
        </nav>

        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
            Categories
          </h3>
          <nav className="flex flex-col gap-1">
            {categoryNavItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={location.pathname === item.href}
                onClick={() => navigate(item.href)}
              />
            ))}
          </nav>
        </div>

        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
            Blog Writing
          </h3>
          <nav className="flex flex-col gap-1">
            {blogNavItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={location.pathname === item.href}
                onClick={() => navigate(item.href)}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  isActive,
  onClick,
}: {
  item: { name: string; icon: any };
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-foreground/70 hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {item.name}
    </button>
  );
}
