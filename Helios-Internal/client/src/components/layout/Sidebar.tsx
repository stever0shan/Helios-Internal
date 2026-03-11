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
  Moon,
  LogOut,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/lib/theme";

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

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("helios-auth");
    window.location.reload();
  };

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
          Helios
        </span>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-8 w-8 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
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
                    onClick={onClose}
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

      <div className="px-3 pb-2">
        <div className="flex items-center gap-1">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors w-full"
              >
                {theme === "dark" ? (
                  <Sun className="w-[18px] h-[18px] shrink-0" />
                ) : (
                  <Moon className="w-[18px] h-[18px] shrink-0" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Toggle theme
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-sidebar-border">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
              SR
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-sidebar-foreground truncate">
              Steve Roshan
            </p>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 border-primary/30 text-primary font-medium mt-0.5"
            >
              Super Admin
            </Badge>
          </div>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors p-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Sign out
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}
