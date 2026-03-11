import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { alerts } from "@/lib/data";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function NotificationsDropdown() {
  const urgentCount = alerts.filter(a => a.severity === "urgent").length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
          <Bell className="w-[18px] h-[18px]" />
          {urgentCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {urgentCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3 border-b border-card-border">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Notifications</h4>
            <Badge variant="destructive" className="text-[10px]">
              {urgentCount} urgent
            </Badge>
          </div>
        </div>
        <ScrollArea className="max-h-[320px]">
          <div className="p-2">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  alert.severity === "urgent" ? "bg-red-500" :
                  alert.severity === "warning" ? "bg-amber-500" : "bg-blue-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-snug">{alert.text}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {alert.severity === "urgent" ? "Action required" : "Review when available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-2 border-t border-card-border">
          <Button variant="ghost" size="sm" className="w-full text-xs h-8">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile
          ? `fixed left-0 top-0 bottom-0 z-50 transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
          : ""
        }
      `}>
        <Sidebar onClose={isMobile ? () => setSidebarOpen(false) : undefined} />
      </div>

      <main className={`${isMobile ? "" : "ml-[240px]"} min-h-screen`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-card-border/50">
          <div className="flex items-center justify-between px-6 h-12">
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <NotificationsDropdown />
            </div>
          </div>
        </div>
        <div className="p-6 max-w-[1600px]">{children}</div>
      </main>
    </div>
  );
}
