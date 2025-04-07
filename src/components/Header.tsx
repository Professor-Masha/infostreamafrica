
import { User, LogOut, UserCircle, Shield, Settings, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { MainNavigation } from "@/components/MainNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col bg-background/95 backdrop-blur">
      {/* Top bar with user controls */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {/* Mobile menu toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        {/* Center section with logo */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Link to="/" className="text-xl md:text-2xl font-bold hover:text-primary transition-colors">
            Info Stream Africa
          </Link>
        </div>
        
        {/* Right section with user controls */}
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full" size="icon">
                  <Avatar>
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.username} />
                    ) : (
                      <AvatarFallback>
                        {user?.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {user?.fullName || user?.username} 
                  <span className="text-xs text-muted-foreground block">
                    {user?.email}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.role}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/my-articles')}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>My Articles</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Portal</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </div>
      </div>
      
      {/* Navigation bar */}
      <div className={`border-b ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <MainNavigation />
      </div>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-background/95 pt-32 px-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-4 py-4">
            <div className="space-y-1">
              <h3 className="font-medium text-sm">Main Navigation</h3>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/'); toggleMobileMenu(); }}>
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/trending'); toggleMobileMenu(); }}>
                Trending
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/youtube'); toggleMobileMenu(); }}>
                YouTube Channel
              </Button>
              {isAdmin && (
                <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/admin'); toggleMobileMenu(); }}>
                  Admin Portal
                </Button>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="font-medium text-sm">Categories</h3>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/world-news'); toggleMobileMenu(); }}>
                World News
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/africa'); toggleMobileMenu(); }}>
                Africa
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/business'); toggleMobileMenu(); }}>
                Business
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/science'); toggleMobileMenu(); }}>
                Science
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/health'); toggleMobileMenu(); }}>
                Health
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/technology'); toggleMobileMenu(); }}>
                Technology
              </Button>
            </div>
            
            {isAuthenticated && (
              <div className="mt-auto pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
