import { useLocation } from "wouter";
import { Calendar as CalendarIcon, Clock, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { todaySchedule, jobs, SERVICE_COLORS } from "@/lib/data";

const upcomingEvents = jobs
  .filter(j => j.nextEvent)
  .map(j => ({
    id: j.id,
    customer: j.customerName,
    type: j.nextEvent!.type,
    date: j.nextEvent!.date,
    time: j.nextEvent!.time,
    crew: j.nextEvent!.crew,
    serviceType: j.serviceType,
    address: j.shortAddress,
  }))
  .slice(0, 10);

export default function Scheduling() {
  const [, navigate] = useLocation();

  return (
    <div data-testid="scheduling-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Scheduling</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage crew schedules and upcoming appointments
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Today's Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-card-border/50">
                {todaySchedule.map(item => (
                  <div
                    key={item.id}
                    data-testid={`schedule-event-${item.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={() => {
                      const job = jobs.find(j => j.customerName === item.customerName);
                      if (job) navigate(`/job/${job.id}`);
                    }}
                  >
                    <div className="w-16 text-center shrink-0">
                      <span className="text-sm font-semibold">{item.time}</span>
                    </div>
                    <div className="w-px h-8 bg-card-border" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-sm">{item.customerName}</span>
                        <Badge variant="outline" className={`text-[10px] border ${SERVICE_COLORS[item.serviceType]}`}>
                          {item.serviceType}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.crew}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {item.stage}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-card-border/50">
                {upcomingEvents.map(event => (
                  <div
                    key={event.id}
                    data-testid={`upcoming-event-${event.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={() => navigate(`/job/${event.id}`)}
                  >
                    <div className="w-24 shrink-0">
                      <span className="text-xs text-muted-foreground">{event.date}</span>
                      <p className="text-xs font-medium">{event.time}</p>
                    </div>
                    <div className="w-px h-8 bg-card-border" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-sm">{event.customer}</span>
                        <Badge variant="outline" className={`text-[10px] border ${SERVICE_COLORS[event.serviceType]}`}>
                          {event.serviceType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.type} — {event.address}</p>
                    </div>
                    {event.crew.length > 0 && (
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {event.crew.length} crew
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border border-card-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md"
              />
            </CardContent>
          </Card>

          <Card className="border border-card-border mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Crew Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Team Alpha", status: "Busy", jobs: 2 },
                  { name: "Team Beta", status: "Available", jobs: 1 },
                  { name: "Team Gamma", status: "Busy", jobs: 2 },
                  { name: "Team Delta", status: "Available", jobs: 1 },
                ].map(crew => (
                  <div key={crew.name} className="flex items-center justify-between py-2 border-b border-card-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{crew.name}</p>
                      <p className="text-xs text-muted-foreground">{crew.jobs} jobs today</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        crew.status === "Available"
                          ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/10"
                          : "border-amber-500/30 text-amber-600 bg-amber-500/10"
                      }`}
                    >
                      {crew.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
