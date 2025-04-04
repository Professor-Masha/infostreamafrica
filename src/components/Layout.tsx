
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Layout() {
  // Handle resizing for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu when screen size changes
      const event = new CustomEvent('closeMobileMenu');
      window.dispatchEvent(event);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarProvider defaultOpen={window.innerWidth >= 1024}>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 overflow-hidden">
          <div className="group lg:block hidden">
            <Sidebar className="h-screen" />
            <div className="absolute left-0 top-0 h-full w-4 hover-trigger" />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto p-4 md:p-6">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
        <ThemeToggle />
      </div>
    </SidebarProvider>
  );
}
