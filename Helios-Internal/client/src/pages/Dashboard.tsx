import { useLocation } from "wouter";
import {
  Briefcase,
  FileCheck,
  Send,
  Leaf,
  ClipboardCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  dashboardMetrics,
  todaySchedule,
  recentActivity,
  alerts,
  SERVICE_COLORS,
  type ActivityItem,
  type AlertItem,
} from "@/lib/data";

const metricCards = [
  {
    label: "Active Projects",
    value: dashboardMetrics.activeProjects.value,
    trend: dashboardMetrics.activeProjects.trend,
    direction: dashboardMetrics.activeProjects.direction,
    icon: Briefcase,
    format: (v: number) => v.toString(),
  },
  {
    label: "Pending Permits (DOB)",
    value: dashboardMetrics.pendingPermits.value,
    trend: dashboardMetrics.pendingPermits.trend,
    direction: dashboardMetrics.pendingPermits.direction,
    icon: FileCheck,
    format: (v: number) => v.toString(),
  },
  {
    label: "Proposals Awaiting",
    value: dashboardMetrics.proposalsAwaiting.value,
    trend: dashboardMetrics.proposalsAwaiting.trend,
    direction: dashboardMetrics.proposalsAwaiting.direction,
    icon: Send,
    format: (v: number) => v.toString(),
  },
  {
    label: "NYSERDA Rebates",
    value: dashboardMetrics.nyserdaRebates.value,
    trend: dashboardMetrics.nyserdaRebates.trend,
    direction: dashboardMetrics.nyserdaRebates.direction,
    icon: Leaf,
    format: (v: number) => v.toString(),
  },
  {
    label: "Site Audits This Week",
    value: dashboardMetrics.siteAudits.value,
    trend: dashboardMetrics.siteAudits.trend,
    direction: dashboardMetrics.siteAudits.direction,
    icon: ClipboardCheck,
    format: (v: number) => v.toString(),
  },
  {
    label: "Revenue This Month",
    value: dashboardMetrics.revenueThisMonth.value,
    trend: dashboardMetrics.revenueThisMonth.trend,
    direction: dashboardMetrics.revenueThisMonth.direction,
    icon: DollarSign,
    format: (v: number) =>
      "$" + v.toLocaleString("en-US"),
  },
];

function activityIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "permit": return <FileCheck className="w-3.5 h-3.5 text-emerald-500" />;
    case "photo": return <ClipboardCheck className="w-3.5 h-3.5 text-blue-500" />;
    case "rebate": return <Leaf className="w-3.5 h-3.5 text-teal-500" />;
    case "contract": return <Send className="w-3.5 h-3.5 text-purple-500" />;
    case "design": return <FileCheck className="w-3.5 h-3.5 text-orange-500" />;
    default: return <Info className="w-3.5 h-3.5 text-muted-foreground" />;
  }
}

function alertIcon(severity: AlertItem["severity"]) {
  switch (severity) {
    case "urgent": return <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />;
    case "warning": return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
    default: return <Info className="w-4 h-4 text-blue-500 shrink-0" />;
  }
}

export default function Dashboard() {
  const [, navigate] = useLocation();

  return (
    <div data-testid="dashboard-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back, Dean. Here's what's happening today.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-6">
        {metricCards.map((card) => (
          <Card
            key={card.label}
            data-testid={`metric-${card.label.toLowerCase().replace(/\s+/g, "-")}`}
            className="border border-card-border"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-[18px] h-[18px] text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    card.direction === "up" ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {card.direction === "up" ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {card.trend}%
                </div>
              </div>
              <div className="text-2xl font-bold tracking-tight">
                {card.format(card.value)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6 border border-card-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Today's Schedule</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {todaySchedule.length} jobs
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="schedule-table">
              <thead>
                <tr className="border-b border-card-border bg-muted/30">
                  <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</th>
                  <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
                  <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</th>
                  <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Crew/Foreman</th>
                  <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {todaySchedule.map((item, i) => (
                  <tr
                    key={item.id}
                    data-testid={`schedule-row-${item.id}`}
                    className={`border-b border-card-border/50 hover:bg-muted/20 cursor-pointer transition-colors ${
                      i === todaySchedule.length - 1 ? "border-b-0" : ""
                    }`}
                    onClick={() => navigate(`/job/${item.jobId}`)}
                  >
                    <td className="py-3 px-4 font-medium">{item.customerName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.address}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-xs border ${SERVICE_COLORS[item.serviceType]}`}>
                        {item.serviceType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{item.stage}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.crew}</td>
                    <td className="py-3 px-4 font-medium">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="border border-card-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[320px]">
              <div className="px-4 pb-4 space-y-0">
                {recentActivity.map((item, i) => (
                  <div
                    key={item.id}
                    data-testid={`activity-${item.id}`}
                    className={`flex items-start gap-3 py-3 ${
                      i < recentActivity.length - 1 ? "border-b border-card-border/50" : ""
                    }`}
                  >
                    <div className="mt-0.5 w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                      {activityIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] leading-snug">{item.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border border-card-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Alerts & Follow-ups</CardTitle>
              <Badge variant="destructive" className="text-xs">
                {alerts.filter(a => a.severity === "urgent").length} urgent
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-4 space-y-0">
              {alerts.map((item, i) => (
                <div
                  key={item.id}
                  data-testid={`alert-${item.id}`}
                  className={`flex items-start gap-3 py-3 ${
                    i < alerts.length - 1 ? "border-b border-card-border/50" : ""
                  }`}
                >
                  {alertIcon(item.severity)}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] leading-snug">{item.text}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
