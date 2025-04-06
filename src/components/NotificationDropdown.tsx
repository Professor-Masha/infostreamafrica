
import React, { useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Article Published",
      description: "Breaking news on COVID-19 vaccine developments",
      time: "5 minutes ago",
      isRead: false,
    },
    {
      id: "2",
      title: "Comment on your article",
      description: "Dr. Sarah Williams commented on your article",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "3",
      title: "Your article is trending",
      description: "Your article on climate change is trending",
      time: "1 day ago",
      isRead: true,
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: Notification) => {
    toast({
      title: notification.title,
      description: "Opening notification details...",
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleMouseLeave = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    if (dropdownRef.current) {
      dropdownRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative" 
        onClick={toggleDropdown}
      >
        <Bell className="h-5 w-5" />
        {notifications.some(n => !n.isRead) && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 overflow-hidden rounded-md shadow-lg animation-slide-down z-50">
          <div className="bg-primary p-2">
            <h3 className="text-sm font-medium text-primary-foreground">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto divide-y">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 hover:bg-muted cursor-pointer ${
                    !notification.isRead ? "bg-muted/50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {!notification.isRead && (
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            )}
          </div>
          <div className="border-t p-2 bg-muted/30">
            <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
              Mark all as read
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
