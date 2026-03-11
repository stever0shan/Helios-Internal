import { useState } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { jobs, SERVICE_COLORS, SERVICE_DOT_COLORS } from "@/lib/data";

const uniqueCustomers = jobs.reduce((acc, job) => {
  if (!acc.find(j => j.customerName === job.customerName)) {
    acc.push(job);
  }
  return acc;
}, [] as typeof jobs);

export default function Customers() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");

  const filtered = uniqueCustomers.filter(c =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase()) ||
    c.borough.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-testid="customers-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {uniqueCustomers.length} customers across all boroughs
          </p>
        </div>
      </div>

      <div className="relative max-w-md mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-testid="input-search-customers"
          placeholder="Search by name, address, or borough..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

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
    </div>
  );
}
