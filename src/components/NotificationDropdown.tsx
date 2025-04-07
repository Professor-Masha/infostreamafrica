
import React, { useRef, useEffect, useState } from "react";
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
  content?: string;
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
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
      content: "Scientists have announced a breakthrough in COVID-19 vaccine research, claiming 95% efficacy in preventing infection. The new vaccine uses a novel mRNA delivery system that could revolutionize vaccine development for other diseases as well.",
    },
    {
      id: "2",
      title: "Comment on your article",
      description: "Dr. Sarah Williams commented on your article",
      time: "2 hours ago",
      isRead: false,
      content: "Dr. Sarah Williams commented: 'This is a well-researched piece that brings much-needed attention to climate change issues in Africa. I particularly appreciate the data visualization showing temperature changes over the past decade.'",
    },
    {
      id: "3",
      title: "Your article is trending",
      description: "Your article on climate change is trending",
      time: "1 day ago",
      isRead: true,
      content: "Congratulations! Your article 'Climate Change Impact on African Agriculture' has reached over 10,000 views in the last 24 hours and is currently the most shared content on our platform. This demonstrates significant public interest in the topic.",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (selectedNotification) {
      setSelectedNotification(null);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedNotification(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
        <Card className="absolute right-0 mt-2 w-80 sm:w-96 overflow-hidden rounded-md shadow-lg animation-slide-down z-50">
          <div className="bg-primary p-2">
            <h3 className="text-sm font-medium text-primary-foreground">
              {selectedNotification ? 'Notification Details' : 'Notifications'}
            </h3>
          </div>
          
          {selectedNotification ? (
            <div className="p-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2" 
                onClick={() => setSelectedNotification(null)}
              >
                ← Back to all notifications
              </Button>
              <h4 className="text-base font-semibold mb-1">{selectedNotification.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{selectedNotification.time}</p>
              <p className="text-sm">{selectedNotification.content}</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </Card>
      )}
    </div>
  );
}
