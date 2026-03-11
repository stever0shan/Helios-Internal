import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, MapPin, Zap, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { jobs, PIPELINE_STAGES } from "@/lib/data";

const boroughData = [
  { name: "Brooklyn", count: jobs.filter(j => j.borough === "Brooklyn").length },
  { name: "Queens", count: jobs.filter(j => j.borough === "Queens").length },
  { name: "Bronx", count: jobs.filter(j => j.borough === "Bronx").length },
  { name: "Staten Is.", count: jobs.filter(j => j.borough === "Staten Island").length },
  { name: "Manhattan", count: jobs.filter(j => j.borough === "Manhattan").length },
];

const serviceData = [
  { name: "Solar", count: jobs.filter(j => j.serviceType === "Solar").length },
  { name: "Heat Pump", count: jobs.filter(j => j.serviceType === "Heat Pump").length },
  { name: "EV Charger", count: jobs.filter(j => j.serviceType === "EV Charger").length },
  { name: "Smart Home", count: jobs.filter(j => j.serviceType === "Smart Home").length },
  { name: "Audit", count: jobs.filter(j => j.serviceType === "Efficiency Audit").length },
];

const PIE_COLORS = ["#10b981", "#3b82f6", "#f97316", "#8b5cf6", "#eab308"];

const stageData = PIPELINE_STAGES.map(stage => ({
  name: stage.length > 12 ? stage.slice(0, 12) + "..." : stage,
  count: jobs.filter(j => j.stage === stage).length,
}));

const revenueTrend = [
  { month: "Sep", revenue: 145000 },
  { month: "Oct", revenue: 198000 },
  { month: "Nov", revenue: 167000 },
  { month: "Dec", revenue: 210000 },
  { month: "Jan", revenue: 234000 },
  { month: "Feb", revenue: 258000 },
  { month: "Mar", revenue: 284500 },
];

const totalRevenue = jobs.reduce((sum, j) => sum + j.totalProjectValue, 0);
const avgProjectValue = totalRevenue / jobs.filter(j => j.totalProjectValue > 0).length;

function exportReportCSV() {
  const headers = ["Metric", "Value"];
  const rows = [
    ["Total Projects", jobs.length],
    ["Total Pipeline Value", totalRevenue],
    ["Avg Project Value", Math.round(avgProjectValue)],
    ["Completed Projects", jobs.filter(j => j.stage === "Project Complete").length],
    ...boroughData.map(b => [`Borough: ${b.name}`, b.count]),
    ...serviceData.map(s => [`Service: ${s.name}`, s.count]),
  ];
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "helios-report.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-52 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-lg" />
          <Skeleton className="h-72 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div data-testid="reports-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Analytics and performance metrics
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            exportReportCSV();
            toast({ title: "Exported", description: "Report data exported to CSV" });
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobs.length}</p>
                <p className="text-xs text-muted-foreground">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-muted-foreground">Total Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(avgProjectValue / 1000).toFixed(1)}k</p>
                <p className="text-xs text-muted-foreground">Avg Project Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobs.filter(j => j.stage === "Project Complete").length}</p>
                <p className="text-xs text-muted-foreground">Completed Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-card-border mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Revenue Trend (Monthly)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(158, 64%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(158, 64%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tickFormatter={(v) => `$${v / 1000}k`} className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <RechartsTooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--card-border))", borderRadius: "8px", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(158, 64%, 42%)" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border border-card-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Projects by Borough
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={boroughData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <RechartsTooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--card-border))", borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar dataKey="count" fill="hsl(158, 64%, 42%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-card-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Projects by Service Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="name"
                  label={({ name, count }) => `${name} (${count})`}
                >
                  {serviceData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--card-border))", borderRadius: "8px", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-card-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Pipeline Stage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stageData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} angle={-25} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <RechartsTooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--card-border))", borderRadius: "8px", fontSize: "12px" }}
              />
              <Bar dataKey="count" fill="hsl(195, 70%, 42%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
