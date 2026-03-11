import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Upload,
  FileText,
  FileArchive,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Send,
  User,
  Users as UsersIcon,
  Wrench,
  DollarSign,
  Building,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  jobs,
  PIPELINE_STAGES,
  SERVICE_COLORS,
  type Job,
} from "@/lib/data";

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

function StageProgress({ currentStage }: { currentStage: string }) {
  const currentIndex = PIPELINE_STAGES.indexOf(currentStage as any);
  const progress = ((currentIndex + 1) / PIPELINE_STAGES.length) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">Pipeline Progress</span>
        <span className="text-xs text-muted-foreground">{currentIndex + 1}/{PIPELINE_STAGES.length}</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex gap-1">
        {PIPELINE_STAGES.map((stage, i) => (
          <div
            key={stage}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i <= currentIndex ? "bg-primary" : "bg-muted"
            }`}
            title={stage}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] text-muted-foreground">Lead</span>
        <span className="text-[10px] text-primary font-medium">{currentStage}</span>
        <span className="text-[10px] text-muted-foreground">Complete</span>
      </div>
    </div>
  );
}

function TeamMember({ role, name }: { role: string; name: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="text-[11px] bg-muted font-medium">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-[13px] font-medium">{name}</p>
        <p className="text-[11px] text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

export default function JobDetail({ id }: { id: string }) {
  const [, navigate] = useLocation();
  const [newNote, setNewNote] = useState("");
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Job not found</h2>
          <Button variant="outline" onClick={() => navigate("/pipeline")}>
            Back to Pipeline
          </Button>
        </div>
      </div>
    );
  }

  const checkedCount = job.checklist.filter(c => c.checked).length;
  const totalCount = job.checklist.length;

  return (
    <div data-testid="job-detail-page">
      <Button
        data-testid="button-back"
        variant="ghost"
        size="sm"
        onClick={() => navigate("/pipeline")}
        className="mb-4 -ml-2 text-muted-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Pipeline
      </Button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold tracking-tight">{job.customerName}</h1>
            <Badge variant="outline" className={`border ${SERVICE_COLORS[job.serviceType]}`}>
              {job.serviceType}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {job.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {job.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {job.email}
            </span>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="secondary" className="text-xs mb-1">
            <Clock className="w-3 h-3 mr-1" />
            {job.daysInPipeline} days in pipeline
          </Badge>
        </div>
      </div>

      <Card className="mb-6 border border-card-border">
        <CardContent className="p-5">
          <StageProgress currentStage={job.stage} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-primary" />
                Project Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-6">
                <TeamMember role="Sales Rep" name={job.salesRep} />
                <TeamMember role="Foreman" name={job.foreman} />
                {job.crewMembers.map(member => (
                  <TeamMember key={member} role="Crew" name={member} />
                ))}
                <TeamMember role="Design Engineer" name={job.designEngineer} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Workflow Checklist
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  {checkedCount}/{totalCount} complete
                </span>
              </div>
              <Progress value={totalCount > 0 ? (checkedCount / totalCount) * 100 : 0} className="h-1.5 mt-2" />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-3">
                <div className="space-y-1">
                  {job.checklist.map((item, i) => (
                    <div
                      key={i}
                      data-testid={`checklist-item-${i}`}
                      className={`flex items-center gap-3 py-2 px-2 rounded-md ${
                        item.checked ? "opacity-70" : ""
                      }`}
                    >
                      <Checkbox checked={item.checked} className="shrink-0" />
                      <span className={`text-[13px] ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Notes & Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {job.notes.map((note, i) => (
                  <div
                    key={i}
                    data-testid={`note-${i}`}
                    className={`py-3 ${i < job.notes.length - 1 ? "border-b border-card-border/50" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">{note.date}</span>
                      <span className="text-xs text-muted-foreground">—</span>
                      <span className="text-xs font-medium">{note.author}</span>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex gap-2">
                <Textarea
                  data-testid="input-note"
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                />
                <Button data-testid="button-send-note" size="sm" className="shrink-0 self-end">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Funding & Incentives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {job.fundingSources.map((fs, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-card-border/50 last:border-0">
                    <div>
                      <p className="text-[13px] font-medium">{fs.name}</p>
                      <p className="text-xs text-muted-foreground">${fs.amount.toLocaleString()}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        fs.statusType === "approved"
                          ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/10"
                          : fs.statusType === "pending"
                          ? "border-amber-500/30 text-amber-600 bg-amber-500/10"
                          : "border-blue-500/30 text-blue-600 bg-blue-500/10"
                      }`}
                    >
                      {fs.status}
                    </Badge>
                  </div>
                ))}
                {job.fundingSources.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">No funding sources added yet</p>
                )}
              </div>
              {job.totalProjectValue > 0 && (
                <>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Total Project Value</span>
                    <span className="text-lg font-bold text-primary">
                      ${job.totalProjectValue.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                <DetailRow label="Property Type" value={job.propertyType} />
                <DetailRow label="Borough" value={job.borough} />
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-muted-foreground">Built</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]">{job.yearBuilt}</span>
                    {job.yearBuilt < 1987 && (
                      <Badge variant="outline" className="text-[9px] border-amber-500/30 text-amber-600 bg-amber-500/10">
                        <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
                        ACP5 Required
                      </Badge>
                    )}
                  </div>
                </div>
                <DetailRow label="Utility" value={job.utility} />
                <DetailRow label="Flood Zone" value={job.floodZone ? "Yes" : "No"} />
                <DetailRow label="Open Violations" value={job.openViolations} />
                <DetailRow label="Meter Info" value={job.meterInfo} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {job.documents.map((doc, i) => (
                  <div
                    key={i}
                    data-testid={`doc-${i}`}
                    className="flex items-center gap-2.5 py-2 px-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    {doc.type === "zip" ? (
                      <FileArchive className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    )}
                    <span className="text-[13px] truncate">{doc.name}</span>
                  </div>
                ))}
                {job.documents.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">No documents uploaded</p>
                )}
              </div>
              <Button data-testid="button-upload" variant="outline" size="sm" className="w-full mt-3">
                <Upload className="w-3.5 h-3.5 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>

          {job.nextEvent && (
            <Card className="border border-card-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Next Scheduled Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                  <p className="text-sm font-semibold">{job.nextEvent.type}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {job.nextEvent.date} at {job.nextEvent.time}
                  </p>
                  {job.nextEvent.crew.length > 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      <UsersIcon className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {job.nextEvent.crew.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-[13px] text-right">{value}</span>
    </div>
  );
}
