import { useLocation } from "wouter";
import { FileText, DollarSign, Clock, CheckCircle, XCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jobs, SERVICE_COLORS } from "@/lib/data";

const proposals = [
  { id: "p1", jobId: "j001", customer: "Maria Rodriguez", address: "482 Atlantic Ave, BK", serviceType: "Solar" as const, value: 44700, status: "Signed", sentDate: "Feb 25, 2026", version: "v2" },
  { id: "p2", jobId: "j002", customer: "David Chen", address: "89-12 Parsons Blvd, QN", serviceType: "Solar" as const, value: 35200, status: "Sent", sentDate: "Feb 27, 2026", version: "v1" },
  { id: "p3", jobId: "j003", customer: "Priya Patel", address: "1523 Victory Blvd, SI", serviceType: "Heat Pump" as const, value: 21000, status: "Signed", sentDate: "Feb 22, 2026", version: "v1" },
  { id: "p4", jobId: "j004", customer: "Marcus Williams", address: "3847 White Plains Rd, BX", serviceType: "Solar" as const, value: 53600, status: "Signed", sentDate: "Feb 10, 2026", version: "v3" },
  { id: "p5", jobId: "j005", customer: "Jennifer Thompson", address: "156 Court St, BK", serviceType: "EV Charger" as const, value: 4200, status: "Signed", sentDate: "Mar 1, 2026", version: "v1" },
  { id: "p6", jobId: "j006", customer: "Roberto Garcia", address: "1847 Flatbush Ave, BK", serviceType: "Solar" as const, value: 0, status: "Draft", sentDate: "—", version: "v1" },
  { id: "p7", jobId: "j007", customer: "Sun-Hee Kim", address: "42-15 Queens Blvd, QN", serviceType: "Smart Home" as const, value: 8500, status: "Sent", sentDate: "Mar 1, 2026", version: "v1" },
  { id: "p8", jobId: "j012", customer: "Angela Martinez", address: "611 W 180th St, MN", serviceType: "Solar" as const, value: 39000, status: "Signed", sentDate: "Feb 20, 2026", version: "v1" },
];

const statusConfig = {
  Signed: { icon: CheckCircle, color: "border-emerald-500/30 text-emerald-600 bg-emerald-500/10" },
  Sent: { icon: Send, color: "border-blue-500/30 text-blue-600 bg-blue-500/10" },
  Draft: { icon: FileText, color: "border-slate-500/30 text-slate-600 bg-slate-500/10" },
  Expired: { icon: XCircle, color: "border-red-500/30 text-red-600 bg-red-500/10" },
};

export default function Proposals() {
  const [, navigate] = useLocation();

  const signed = proposals.filter(p => p.status === "Signed").length;
  const sent = proposals.filter(p => p.status === "Sent").length;
  const totalValue = proposals.reduce((sum, p) => sum + p.value, 0);

  return (
    <div data-testid="proposals-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Proposals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track and manage customer proposals
          </p>
        </div>
        <Button data-testid="button-new-proposal" size="sm">
          <FileText className="w-4 h-4 mr-2" />
          New Proposal
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border border-card-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{signed}</p>
              <p className="text-xs text-muted-foreground">Signed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-card-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sent}</p>
              <p className="text-xs text-muted-foreground">Awaiting Response</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-card-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">${(totalValue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground">Total Pipeline Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-card-border">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border bg-muted/30">
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Version</th>
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Sent</th>
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((p, i) => {
                const config = statusConfig[p.status as keyof typeof statusConfig];
                return (
                  <tr
                    key={p.id}
                    data-testid={`proposal-row-${p.id}`}
                    className={`border-b border-card-border/50 hover:bg-muted/20 cursor-pointer transition-colors ${
                      i === proposals.length - 1 ? "border-b-0" : ""
                    }`}
                    onClick={() => navigate(`/job/${p.jobId}`)}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{p.customer}</p>
                        <p className="text-xs text-muted-foreground">{p.address}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-xs border ${SERVICE_COLORS[p.serviceType]}`}>
                        {p.serviceType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {p.value > 0 ? `$${p.value.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{p.version}</td>
                    <td className="py-3 px-4 text-muted-foreground">{p.sentDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[10px] ${config.color}`}>
                        <config.icon className="w-3 h-3 mr-1" />
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
