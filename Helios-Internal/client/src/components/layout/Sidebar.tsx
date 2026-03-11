import { useLocation, Link } from "wouter";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Calendar,
  FileText,
  FolderOpen,
  BarChart3,
  Settings,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Pipeline", icon: Kanban, href: "/pipeline" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Scheduling", icon: Calendar, href: "/scheduling" },
  { label: "Proposals", icon: FileText, href: "/proposals" },
  { label: "Documents", icon: FolderOpen, href: "/documents" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside
      data-testid="sidebar"
      className="fixed left-0 top-0 bottom-0 w-[240px] bg-sidebar flex flex-col z-50"
    >
      <div className="p-5 flex items-center gap-3">
        <div
          data-testid="logo-icon"
          className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground tracking-tight">
          Solanta
        </span>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            location === item.href ||
            (item.href !== "/" && location.startsWith(item.href));
          return (
            <Tooltip key={item.href} delayDuration={500}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <div
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium cursor-pointer transition-colors duration-150",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-[18px] h-[18px] shrink-0",
                        isActive ? "text-primary" : ""
                      )}
                    />
                    {item.label}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-sidebar-border">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
              DS
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-sidebar-foreground truncate">
              Dean Santa
            </p>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 border-primary/30 text-primary font-medium mt-0.5"
            >
              Super Admin
            </Badge>
          </div>
        </div>
      </div>
    </aside>
  );
}
