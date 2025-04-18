
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  LogOut,
  PlusCircle,
  Home,
  User,
  Settings,
  BookOpen,
  BarChart2,
  Heart,
  MessageSquare,
  Calendar,
  Clock,
  Video
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

export function WriterSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const mainMenuItems: SidebarItem[] = [
    { name: "Dashboard", path: "/writer", icon: LayoutDashboard },
    { name: "My Articles", path: "/writer/articles", icon: FileText, badge: 3 },
    { name: "Analytics", path: "/writer/analytics", icon: BarChart2 },
    { name: "Saved", path: "/writer/saved", icon: Heart },
    { name: "Comments", path: "/writer/comments", icon: MessageSquare },
    { name: "Scheduled", path: "/writer/scheduled", icon: Clock },
  ];

  const toolsMenuItems: SidebarItem[] = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Preferences", path: "/writer/preferences", icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`h-full flex flex-col bg-slate-900 text-white ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-bold text-lg">InfoStream Africa</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="mx-auto">
            <BookOpen className="h-5 w-5" />
          </Link>
        )}
      </div>

      {/* New Article Button */}
      <div className="p-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => navigate('/writer/new')}
                className={`w-full bg-blue-600 hover:bg-blue-700 ${collapsed ? 'px-0' : ''}`}
              >
                <PlusCircle className={`h-5 w-5 ${collapsed ? '' : 'mr-2'}`} />
                {!collapsed && <span>New Article</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">New Article</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 py-2">
          {!collapsed && <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Content</h3>}
          <ul className="mt-2 space-y-1">
            {mainMenuItems.map((item) => (
              <li key={item.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive(item.path)
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${!collapsed && 'mr-3'}`} />
                        {!collapsed && (
                          <span className="flex-1">{item.name}</span>
                        )}
                        {!collapsed && item.badge && (
                          <Badge variant="outline" className="ml-auto bg-blue-900 hover:bg-blue-900 text-white border-blue-800">
                            {item.badge}
                          </Badge>
                        )}
                        {collapsed && item.badge && (
                          <Badge variant="outline" className="absolute -right-1 -top-1 text-xs h-4 w-4 flex items-center justify-center p-0 bg-blue-600 text-white border-blue-800">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3 py-2">
          {!collapsed && <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</h3>}
          <ul className="mt-2 space-y-1">
            {toolsMenuItems.map((item) => (
              <li key={item.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive(item.path)
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${!collapsed && 'mr-3'}`} />
                        {!collapsed && <span>{item.name}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Area */}
      <div className="p-4 border-t border-slate-800">
        <div className={`flex ${collapsed ? 'justify-center' : 'items-center'}`}>
          {collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.username} />
                    ) : (
                      <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div>
                    <p className="font-medium">{user?.username}</p>
                    <p className="text-xs text-slate-400">Writer</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Avatar className="h-8 w-8">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.username} />
                ) : (
                  <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.username}</p>
                <p className="text-xs text-slate-400">Writer</p>
              </div>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={`mt-3 ${collapsed ? 'mx-auto' : 'w-full'} text-white hover:bg-slate-800`}
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
