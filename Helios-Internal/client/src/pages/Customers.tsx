import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, Phone, Mail, ChevronRight, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobs, SERVICE_COLORS, SERVICE_DOT_COLORS } from "@/lib/data";

const uniqueCustomers = jobs.reduce((acc, job) => {
  if (!acc.find(j => j.customerName === job.customerName)) {
    acc.push(job);
  }
  return acc;
}, [] as typeof jobs);

const boroughs = Array.from(new Set(uniqueCustomers.map(c => c.borough)));

function exportCustomersCSV(data: typeof jobs) {
  const headers = ["Name", "Address", "Borough", "Phone", "Email", "Service", "Stage"];
  const rows = data.map(c => [c.customerName, c.address, c.borough, c.phone, c.email, c.serviceType, c.stage]);
  const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "helios-customers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Customers() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [boroughFilter, setBoroughFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = uniqueCustomers.filter(c => {
    if (boroughFilter !== "all" && c.borough !== boroughFilter) return false;
    if (serviceFilter !== "all" && c.serviceType !== serviceFilter) return false;
    if (search && !(
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase()) ||
      c.borough.toLowerCase().includes(search.toLowerCase())
    )) return false;
    return true;
  });

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-52 mb-6" />
        <Skeleton className="h-9 w-72 mb-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="customers-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {uniqueCustomers.length} customers across all boroughs
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            exportCustomersCSV(filtered);
            toast({ title: "Exported", description: "Customer data exported to CSV" });
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-xs min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-testid="input-search-customers"
            placeholder="Search by name, address, or borough..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <Select value={boroughFilter} onValueChange={setBoroughFilter}>
          <SelectTrigger className="w-[160px] h-9">
            <Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Boroughs</SelectItem>
            {boroughs.map(b => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[170px] h-9">
            <Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="Solar">Solar</SelectItem>
            <SelectItem value="Heat Pump">Heat Pump</SelectItem>
            <SelectItem value="EV Charger">EV Charger</SelectItem>
            <SelectItem value="Smart Home">Smart Home</SelectItem>
            <SelectItem value="Efficiency Audit">Efficiency Audit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No customers match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(customer => (
            <Card
              key={customer.id}
              data-testid={`customer-card-${customer.id}`}
              className="border border-card-border hover:border-primary/30 cursor-pointer transition-all"
              onClick={() => navigate(`/job/${customer.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {customer.firstName[0]}{customer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">{customer.customerName}</h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{customer.address}</span>
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Phone className="w-3 h-3 shrink-0" />
                        {customer.phone}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Mail className="w-3 h-3 shrink-0" />
                        {customer.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className={`text-[10px] border ${SERVICE_COLORS[customer.serviceType]}`}>
                        {customer.serviceType}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {customer.stage}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
