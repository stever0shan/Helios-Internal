import { BarChart3, TrendingUp, DollarSign, MapPin, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { jobs } from "@/lib/data";

const boroughBreakdown = [
  { name: "Brooklyn", count: jobs.filter(j => j.borough === "Brooklyn").length, color: "bg-emerald-500" },
  { name: "Queens", count: jobs.filter(j => j.borough === "Queens").length, color: "bg-blue-500" },
  { name: "Bronx", count: jobs.filter(j => j.borough === "Bronx").length, color: "bg-purple-500" },
  { name: "Staten Island", count: jobs.filter(j => j.borough === "Staten Island").length, color: "bg-orange-500" },
  { name: "Manhattan", count: jobs.filter(j => j.borough === "Manhattan").length, color: "bg-teal-500" },
];

const serviceBreakdown = [
  { name: "Solar", count: jobs.filter(j => j.serviceType === "Solar").length, color: "bg-emerald-500" },
  { name: "Heat Pump", count: jobs.filter(j => j.serviceType === "Heat Pump").length, color: "bg-blue-500" },
  { name: "EV Charger", count: jobs.filter(j => j.serviceType === "EV Charger").length, color: "bg-orange-500" },
  { name: "Smart Home", count: jobs.filter(j => j.serviceType === "Smart Home").length, color: "bg-purple-500" },
  { name: "Efficiency Audit", count: jobs.filter(j => j.serviceType === "Efficiency Audit").length, color: "bg-yellow-500" },
];

const totalRevenue = jobs.reduce((sum, j) => sum + j.totalProjectValue, 0);
const avgProjectValue = totalRevenue / jobs.filter(j => j.totalProjectValue > 0).length;
const totalMax = Math.max(...boroughBreakdown.map(b => b.count));

export default function Reports() {
  return (
    <div data-testid="reports-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Analytics and performance metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
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

      <div className="grid grid-cols-2 gap-6">
        <Card className="border border-card-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Projects by Borough
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {boroughBreakdown.map(b => (
                <div key={b.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{b.name}</span>
                    <span className="text-sm text-muted-foreground">{b.count}</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${b.color} transition-all`}
                      style={{ width: `${(b.count / totalMax) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
            <div className="space-y-4">
              {serviceBreakdown.map(s => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="text-sm text-muted-foreground">{s.count}</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.color} transition-all`}
                      style={{ width: `${(s.count / jobs.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-card-border col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Pipeline Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {["Lead", "Site Audit Scheduled", "Site Audit Complete", "Credit Approved", "Final Design Created", "Planset Approved", "EL Permit Approved", "GC Permit Approved", "Install Scheduled", "Installed", "DOB Inspection", "PTO", "Project Complete"].map(stage => {
                const count = jobs.filter(j => j.stage === stage).length;
                return (
                  <div key={stage} className="flex-1 min-w-[100px] bg-muted/30 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold">{count}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-1">{stage}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
