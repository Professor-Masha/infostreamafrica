
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
  Menu,
  Globe,
  Flag,
  History,
  Sport,
  TrendingUp,
  Newspaper
} from "lucide-react";
import { 
  Sidebar as UISidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { useEffect } from "react";

export function Sidebar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setOpen } = useSidebar();

  useEffect(() => {
    const handleHover = () => {
      const group = document.querySelector('.group');
      if (!group) return;

      group.addEventListener('mouseenter', () => {
        setOpen(true);
      });

      group.addEventListener('mouseleave', () => {
        setOpen(false);
      });
    };

    handleHover();
    
    return () => {
      const group = document.querySelector('.group');
      if (group) {
        group.removeEventListener('mouseenter', () => setOpen(true));
        group.removeEventListener('mouseleave', () => setOpen(false));
      }
    };
  }, [setOpen]);

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
    {
      name: "Trending",
      href: "/trending",
      icon: TrendingUp,
    },
  ];

  const categoryNavItems = [
    {
      name: "World News",
      href: "/world-news",
      icon: Globe,
    },
    {
      name: "Africa",
      href: "/africa",
      icon: Flag,
    },
    {
      name: "Sports",
      href: "/sports",
      icon: Sport,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
    {
      name: "Science",
      href: "/science",
      icon: FlaskConical,
    },
    {
      name: "Health",
      href: "/health",
      icon: Pill,
    },
    {
      name: "Technology",
      href: "/technology",
      icon: Leaf,
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
    <>
      <UISidebar className={className}>
        <div className="flex h-full flex-col">
          <SidebarHeader className="border-b p-5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Info Stream Africa</h2>
              <p className="text-xs text-muted-foreground">
                Latest news from Africa and around the world
              </p>
            </div>
            <SidebarTrigger className="ml-auto md:flex">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.href}
                        onClick={() => navigate(item.href)}
                        tooltip={state === "collapsed" ? item.name : undefined}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categoryNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.href}
                        onClick={() => navigate(item.href)}
                        tooltip={state === "collapsed" ? item.name : undefined}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Blog Writing</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {blogNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.href}
                        onClick={() => navigate(item.href)}
                        tooltip={state === "collapsed" ? item.name : undefined}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </UISidebar>
      
      <SidebarTrigger className="absolute left-4 top-4 z-50 md:hidden">
        <Menu className="h-5 w-5" />
      </SidebarTrigger>
    </>
  );
}
