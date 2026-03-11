import { useState, useRef } from "react";
import { useLocation } from "wouter";
import {
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  jobs as initialJobs,
  PIPELINE_STAGES,
  SERVICE_COLORS,
  SERVICE_DOT_COLORS,
  type ServiceType,
  type PipelineStage,
  type Job,
} from "@/lib/data";
import { useEffect } from "react";

const fundingBadgeColors: Record<string, string> = {
  NYSERDA: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Cash: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  "Climate First": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Service Finance": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  GreenSky: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  "Federal ITC": "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

function getFundingLabel(name: string): string {
  if (name.includes("NYSERDA")) return "NYSERDA";
  if (name.includes("Climate First")) return "Climate First";
  if (name.includes("Service Finance")) return "Service Finance";
  if (name.includes("GreenSky")) return "GreenSky";
  if (name.includes("Federal ITC")) return "ITC 30%";
  if (name.includes("Cash")) return "Cash";
  return name;
}

function getFundingColor(name: string): string {
  const label = getFundingLabel(name);
  for (const key of Object.keys(fundingBadgeColors)) {
    if (label.includes(key)) return fundingBadgeColors[key];
  }
  return "bg-muted text-muted-foreground";
}

function PipelineCard({ job, onClick, onDragStart }: { job: Job; onClick: () => void; onDragStart: (e: React.DragEvent) => void }) {
  return (
    <div
      data-testid={`pipeline-card-${job.id}`}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
      className="bg-card border border-card-border rounded-lg p-3 cursor-grab hover:border-primary/30 hover:shadow-sm transition-all group active:cursor-grabbing"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-[13px] truncate">{job.lastName}</span>
        <Avatar className="w-6 h-6 shrink-0">
          <AvatarFallback className="text-[10px] bg-primary/15 text-primary font-semibold">
            {job.salesRepInitials}
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xs text-muted-foreground mb-2 truncate">{job.shortAddress}</p>
      <div className="flex items-center gap-1.5 mb-2">
        <div className={`w-2 h-2 rounded-full ${SERVICE_DOT_COLORS[job.serviceType]}`} />
        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-[18px] border ${SERVICE_COLORS[job.serviceType]}`}>
          {job.serviceType}
        </Badge>
        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded ml-auto">
          {job.daysInStage}d
        </span>
      </div>
      {job.fundingSources.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {job.fundingSources.slice(0, 2).map((fs, i) => (
            <span
              key={i}
              className={`text-[9px] px-1.5 py-0.5 rounded border ${getFundingColor(fs.name)}`}
            >
              {getFundingLabel(fs.name)}
            </span>
          ))}
          {job.fundingSources.length > 2 && (
            <span className="text-[9px] text-muted-foreground">+{job.fundingSources.length - 2}</span>
          )}
        </div>
      )}
    </div>
  );
}

function PipelineColumn({
  stage,
  filteredJobs,
  onCardClick,
  onDragStart,
  onDragOver,
  onDrop,
  isDropTarget,
}: {
  stage: PipelineStage;
  filteredJobs: Job[];
  onCardClick: (id: string) => void;
  onDragStart: (jobId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, stage: PipelineStage) => void;
  isDropTarget: boolean;
}) {
  const stageJobs = filteredJobs.filter(j => j.stage === stage);

  return (
    <div className="min-w-[220px] max-w-[220px] flex-shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
          {stage}
        </h3>
        <Badge variant="secondary" className="text-[10px] px-1.5 h-5 font-medium">
          {stageJobs.length}
        </Badge>
      </div>
      <div
        className={`space-y-2 min-h-[100px] rounded-lg p-2 transition-colors ${
          isDropTarget ? "bg-primary/10 border-2 border-dashed border-primary/30" : "bg-muted/20"
        }`}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, stage)}
      >
        {stageJobs.map(job => (
          <PipelineCard
            key={job.id}
            job={job}
            onClick={() => onCardClick(job.id)}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", job.id);
              onDragStart(job.id);
            }}
          />
        ))}
        {stageJobs.length === 0 && (
          <div className="text-xs text-muted-foreground/50 text-center py-8">
            No jobs
          </div>
        )}
      </div>
    </div>
  );
}

function PipelineListView({ filteredJobs, onCardClick }: { filteredJobs: Job[]; onCardClick: (id: string) => void }) {
  return (
    <div className="border border-card-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/30 border-b border-card-border">
            <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
            <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</th>
            <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
            <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</th>
            <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Days</th>
            <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Sales Rep</th>
            <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Funding</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job, i) => (
            <tr
              key={job.id}
              data-testid={`list-row-${job.id}`}
              className={`border-b border-card-border/50 hover:bg-muted/20 cursor-pointer transition-colors ${
                i === filteredJobs.length - 1 ? "border-b-0" : ""
              }`}
              onClick={() => onCardClick(job.id)}
            >
              <td className="py-3 px-4 font-medium">{job.customerName}</td>
              <td className="py-3 px-4 text-muted-foreground">{job.shortAddress}</td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={`text-xs border ${SERVICE_COLORS[job.serviceType]}`}>
                  {job.serviceType}
                </Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground text-xs">{job.stage}</td>
              <td className="py-3 px-4">
                <span className="text-xs bg-muted px-2 py-0.5 rounded">{job.daysInStage}d</span>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{job.salesRep}</td>
              <td className="py-3 px-4">
                <div className="flex gap-1">
                  {job.fundingSources.slice(0, 2).map((fs, fi) => (
                    <span key={fi} className={`text-[10px] px-1.5 py-0.5 rounded border ${getFundingColor(fs.name)}`}>
                      {getFundingLabel(fs.name)}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function exportToCSV(data: Job[], filename: string) {
  const headers = ["Customer", "Address", "Borough", "Service", "Stage", "Days in Stage", "Days in Pipeline", "Sales Rep", "Project Value"];
  const rows = data.map(j => [
    j.customerName, j.address, j.borough, j.serviceType, j.stage,
    j.daysInStage, j.daysInPipeline, j.salesRep, j.totalProjectValue,
  ]);
  const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Pipeline() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [localJobs, setLocalJobs] = useState<Job[]>(initialJobs);
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = localJobs.filter(j => {
    if (serviceFilter !== "all" && j.serviceType !== serviceFilter) return false;
    if (search && !j.customerName.toLowerCase().includes(search.toLowerCase()) && !j.address.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "priority") return b.daysInStage - a.daysInStage;
    if (sortBy === "borough") return a.borough.localeCompare(b.borough);
    return a.daysInPipeline - b.daysInPipeline;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData("text/plain");
    setLocalJobs(prev => prev.map(j =>
      j.id === jobId ? { ...j, stage: targetStage, daysInStage: 0 } : j
    ));
    setDragOverStage(null);
    const job = localJobs.find(j => j.id === jobId);
    if (job && job.stage !== targetStage) {
      toast({
        title: "Job moved",
        description: `${job.customerName} moved to ${targetStage}`,
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-52 mb-6" />
        <Skeleton className="h-9 w-full mb-5" />
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="min-w-[220px]">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="pipeline-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {localJobs.length} total projects across all stages
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            exportToCSV(filteredJobs, "helios-pipeline.csv");
            toast({ title: "Exported", description: "Pipeline data exported to CSV" });
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
            data-testid="pipeline-search"
            placeholder="Search customers or addresses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger data-testid="filter-service" className="w-[180px] h-9">
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
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger data-testid="sort-by" className="w-[160px] h-9">
            <ArrowUpDown className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date Added</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="borough">Borough</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center border border-card-border rounded-lg overflow-hidden ml-auto">
          <Button
            data-testid="view-kanban"
            variant={viewMode === "kanban" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-none h-9 px-3"
            onClick={() => setViewMode("kanban")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            data-testid="view-list"
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-none h-9 px-3"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {viewMode === "kanban" ? (
        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-4 min-w-max">
            {PIPELINE_STAGES.map(stage => (
              <PipelineColumn
                key={stage}
                stage={stage}
                filteredJobs={filteredJobs}
                onCardClick={(id) => navigate(`/job/${id}`)}
                onDragStart={() => {}}
                onDragOver={(e) => {
                  handleDragOver(e);
                  setDragOverStage(stage);
                }}
                onDrop={handleDrop}
                isDropTarget={dragOverStage === stage}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <PipelineListView filteredJobs={filteredJobs} onCardClick={(id) => navigate(`/job/${id}`)} />
      )}
    </div>
  );
}
