import { User, Bell, Shield, Building, Users, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const teamMembers = [
  { name: "Steve Roshan", role: "Super Admin", initials: "SR", email: "steve@helios.com" },
  { name: "Alex Rivera", role: "Sales Rep", initials: "AR", email: "alex@helios.com" },
  { name: "Carlos Mendez", role: "Foreman", initials: "CM", email: "carlos@helios.com" },
  { name: "Sarah Kim", role: "Design Engineer", initials: "SK", email: "sarah@helios.com" },
  { name: "Robert Park", role: "Foreman", initials: "RP", email: "robert@helios.com" },
  { name: "Tom Rivera", role: "Design Engineer", initials: "TR", email: "tom@helios.com" },
  { name: "Pete Jackson", role: "Foreman", initials: "PJ", email: "pete@helios.com" },
  { name: "Mike Thompson", role: "Foreman", initials: "MT", email: "mike@helios.com" },
];

export default function Settings() {
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div data-testid="settings-page">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account and platform settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger data-testid="tab-profile" value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger data-testid="tab-team" value="team">
            <Users className="w-4 h-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger data-testid="tab-company" value="company">
            <Building className="w-4 h-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger data-testid="tab-notifications" value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border border-card-border">
            <CardHeader>
              <CardTitle className="text-base">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary/15 text-primary text-xl font-bold">
                    SR
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Steve Roshan</h3>
                  <p className="text-sm text-muted-foreground">Super Admin</p>
                  <Button variant="outline" size="sm" className="mt-2">Change Photo</Button>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Steve" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Roshan" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="steve@helios.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="(718) 555-0100" />
                </div>
              </div>
              <Button data-testid="button-save-profile" size="sm" onClick={() => handleSave("Profile")}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="border border-card-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Team Members</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast({ title: "Invite sent", description: "Team invitation email has been sent." })}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {teamMembers.map((member, i) => (
                  <div
                    key={member.name}
                    className={`flex items-center justify-between py-3 ${
                      i < teamMembers.length - 1 ? "border-b border-card-border/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-muted text-xs font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card className="border border-card-border">
            <CardHeader>
              <CardTitle className="text-base">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Helios Energy" />
                </div>
                <div className="space-y-2">
                  <Label>License Number</Label>
                  <Input defaultValue="NYC-SOL-2024-1847" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue="456 Atlantic Ave, Brooklyn, NY 11217" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="(718) 555-0100" />
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3">Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {["Brooklyn", "Queens", "Bronx", "Staten Island", "Manhattan", "Parts of NJ"].map(area => (
                    <Badge key={area} variant="outline" className="text-xs">{area}</Badge>
                  ))}
                </div>
              </div>
              <Button data-testid="button-save-company" size="sm" onClick={() => handleSave("Company")}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border border-card-border">
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New Lead Notifications", desc: "Get notified when a new lead is added" },
                { label: "Permit Updates", desc: "Receive alerts for permit status changes" },
                { label: "Contract Signatures", desc: "Notify when a customer signs a contract" },
                { label: "Schedule Changes", desc: "Alert when schedules are modified" },
                { label: "Rebate Status Updates", desc: "Track NYSERDA and other rebate changes" },
                { label: "Daily Summary Email", desc: "Receive a daily activity summary" },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{pref.label}</p>
                    <p className="text-xs text-muted-foreground">{pref.desc}</p>
                  </div>
                  <Switch defaultChecked={i < 4} />
                </div>
              ))}
              <Button data-testid="button-save-notifications" size="sm" onClick={() => handleSave("Notification")}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
