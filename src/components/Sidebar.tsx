
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Home,
  Leaf,
  Menu,
  Pill,
  Search,
  Thermometer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Search", icon: Search, href: "/search" },
  { label: "Medicine", icon: Pill, href: "/medicine" },
  { label: "Biochemistry", icon: FlaskConical, href: "/biochemistry" },
  { label: "Biology", icon: Leaf, href: "/biology" },
  { label: "Clinical Research", icon: Thermometer, href: "/clinical-research" },
  { label: "Latest Journals", icon: BookOpen, href: "/journals" },
  { label: "Conferences", icon: Calendar, href: "/conferences" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center px-4">
        {!collapsed && (
          <h2 className="text-lg font-bold text-sidebar-foreground">
            MediBrite
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "flex items-center justify-start gap-3 px-3",
                !collapsed ? "justify-start" : "justify-center"
              )}
              onClick={() => navigate(item.href)}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          {!collapsed && (
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
