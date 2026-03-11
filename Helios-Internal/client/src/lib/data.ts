export type ServiceType = "Solar" | "Heat Pump" | "EV Charger" | "Smart Home" | "Efficiency Audit";

export type PipelineStage =
  | "Lead"
  | "Site Audit Scheduled"
  | "Site Audit Complete"
  | "Credit Approved"
  | "Final Design Created"
  | "Planset Approved"
  | "EL Permit Approved"
  | "GC Permit Approved"
  | "Install Scheduled"
  | "Installed"
  | "DOB Inspection"
  | "PTO"
  | "Project Complete";

export const PIPELINE_STAGES: PipelineStage[] = [
  "Lead",
  "Site Audit Scheduled",
  "Site Audit Complete",
  "Credit Approved",
  "Final Design Created",
  "Planset Approved",
  "EL Permit Approved",
  "GC Permit Approved",
  "Install Scheduled",
  "Installed",
  "DOB Inspection",
  "PTO",
  "Project Complete",
];

export const SERVICE_COLORS: Record<ServiceType, string> = {
  Solar: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
  "Heat Pump": "bg-blue-500/15 text-blue-700 border-blue-500/20",
  "EV Charger": "bg-orange-500/15 text-orange-700 border-orange-500/20",
  "Smart Home": "bg-purple-500/15 text-purple-700 border-purple-500/20",
  "Efficiency Audit": "bg-yellow-500/15 text-yellow-700 border-yellow-500/20",
};

export const SERVICE_DOT_COLORS: Record<ServiceType, string> = {
  Solar: "bg-emerald-500",
  "Heat Pump": "bg-blue-500",
  "EV Charger": "bg-orange-500",
  "Smart Home": "bg-purple-500",
  "Efficiency Audit": "bg-yellow-500",
};

export interface Job {
  id: string;
  customerName: string;
  firstName: string;
  lastName: string;
  address: string;
  shortAddress: string;
  borough: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  stage: PipelineStage;
  daysInStage: number;
  daysInPipeline: number;
  assignedCrew: string;
  salesRep: string;
  salesRepInitials: string;
  foreman: string;
  crewMembers: string[];
  designEngineer: string;
  fundingSources: FundingSource[];
  propertyType: string;
  yearBuilt: number;
  utility: string;
  floodZone: boolean;
  openViolations: string;
  meterInfo: string;
  totalProjectValue: number;
  documents: DocumentItem[];
  notes: NoteEntry[];
  checklist: ChecklistItem[];
  nextEvent?: ScheduleEvent;
}

export interface FundingSource {
  name: string;
  amount: number;
  status: string;
  statusType: "approved" | "pending" | "info";
}

export interface DocumentItem {
  name: string;
  type: string;
}

export interface NoteEntry {
  date: string;
  author: string;
  text: string;
}

export interface ChecklistItem {
  label: string;
  checked: boolean;
}

export interface ScheduleEvent {
  type: string;
  date: string;
  time: string;
  crew: string[];
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: "permit" | "photo" | "rebate" | "contract" | "audit" | "design" | "general";
}

export interface AlertItem {
  id: string;
  text: string;
  severity: "warning" | "urgent" | "info";
}

export interface TodayScheduleItem {
  id: string;
  jobId: string;
  customerName: string;
  address: string;
  serviceType: ServiceType;
  stage: string;
  crew: string;
  time: string;
}

const solarChecklist: ChecklistItem[] = [
  { label: "Lead entered into CRM", checked: true },
  { label: "Aurora design created", checked: true },
  { label: "Proposal sent to customer", checked: true },
  { label: "Contract signed via DocuSign", checked: true },
  { label: "Site audit scheduled", checked: true },
  { label: "Drone flight completed", checked: true },
  { label: "Pix4D measurements processed", checked: true },
  { label: "Photos uploaded to CompanyCam", checked: true },
  { label: "Site audit review complete", checked: true },
  { label: "Final design created in AutoCAD", checked: true },
  { label: "Planset created with wiring diagram", checked: true },
  { label: "PE/RA approval received", checked: true },
  { label: "ACP5 asbestos form filed (pre-1987 building)", checked: false },
  { label: "NYSERDA rebate application submitted", checked: false },
  { label: "DOB NOW account activated", checked: false },
  { label: "EL permit filed", checked: false },
  { label: "GC (SL) permit filed", checked: false },
  { label: "Funding verified by Risk Manager", checked: false },
  { label: "Installation scheduled", checked: false },
  { label: "Installation complete", checked: false },
  { label: "DOB inspection — Pass/Fail", checked: false },
  { label: "Utility interconnection (PTO) filed", checked: false },
  { label: "Rebate invoicing complete", checked: false },
  { label: "Letter of Completion (LOC) submitted", checked: false },
  { label: "Client notified — project complete", checked: false },
];

export const jobs: Job[] = [
  {
    id: "j001",
    customerName: "Maria Rodriguez",
    firstName: "Maria",
    lastName: "Rodriguez",
    address: "482 Atlantic Ave, Brooklyn, NY 11217",
    shortAddress: "482 Atlantic Ave, BK",
    borough: "Brooklyn",
    phone: "(718) 555-0142",
    email: "m.rodriguez@email.com",
    serviceType: "Solar",
    stage: "Planset Approved",
    daysInStage: 3,
    daysInPipeline: 34,
    assignedCrew: "Team Alpha",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "Carlos Mendez",
    crewMembers: ["James Wilson", "Tony Reyes", "Mike Chang"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "Climate First Loan", amount: 32400, status: "Approved", statusType: "approved" },
      { name: "NYSERDA EFS Rebate", amount: 4200, status: "Submitted, Pending", statusType: "pending" },
      { name: "Federal ITC (30%)", amount: 8100, status: "Applied at filing", statusType: "info" },
    ],
    propertyType: "Row House — Flat Roof",
    yearBuilt: 1972,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 44700,
    documents: [
      { name: "Proposal_v2_Rodriguez.pdf", type: "pdf" },
      { name: "Signed_Agreement_Rodriguez.pdf", type: "pdf" },
      { name: "Final_Design_2pg.pdf", type: "pdf" },
      { name: "Planset_Wiring.pdf", type: "pdf" },
      { name: "ACP5_Form.pdf", type: "pdf" },
      { name: "EL_Permit_Application.pdf", type: "pdf" },
      { name: "Site_Audit_Photos.zip", type: "zip" },
    ],
    notes: [
      { date: "Mar 3", author: "Dean S.", text: "Customer confirmed availability for site audit Thursday" },
      { date: "Mar 1", author: "Alex R.", text: "Uploaded 47 drone photos to CompanyCam" },
      { date: "Feb 28", author: "Maria L.", text: "Credit approved via Climate First, $32,400 loan amount" },
      { date: "Feb 25", author: "Dean S.", text: "Proposal v2 sent after adjusting panel count from 18 to 22" },
      { date: "Feb 20", author: "Sarah K.", text: "Aurora design completed — 22 panels, 8.8kW system" },
      { date: "Feb 15", author: "Dean S.", text: "Initial consultation completed. Customer interested in maximizing roof coverage." },
    ],
    checklist: [...solarChecklist],
    nextEvent: { type: "Installation", date: "Mar 15, 2026", time: "8:00 AM", crew: ["Carlos Mendez", "James Wilson", "Tony Reyes"] },
  },
  {
    id: "j002",
    customerName: "David Chen",
    firstName: "David",
    lastName: "Chen",
    address: "89-12 Parsons Blvd, Jamaica, Queens, NY 11432",
    shortAddress: "89-12 Parsons Blvd, QN",
    borough: "Queens",
    phone: "(718) 555-0287",
    email: "d.chen@email.com",
    serviceType: "Solar",
    stage: "Site Audit Complete",
    daysInStage: 5,
    daysInPipeline: 18,
    assignedCrew: "Team Beta",
    salesRep: "Alex Rivera",
    salesRepInitials: "AR",
    foreman: "Robert Park",
    crewMembers: ["Luis Garcia", "Kevin O'Brien"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "Service Finance", amount: 28000, status: "Pre-Approved", statusType: "approved" },
      { name: "NYSERDA Rebate", amount: 3500, status: "Not Yet Filed", statusType: "info" },
    ],
    propertyType: "Detached — Pitched Roof",
    yearBuilt: 1995,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 35200,
    documents: [
      { name: "Proposal_v1_Chen.pdf", type: "pdf" },
      { name: "Site_Audit_Report_Chen.pdf", type: "pdf" },
      { name: "Drone_Photos_Chen.zip", type: "zip" },
    ],
    notes: [
      { date: "Mar 5", author: "Alex R.", text: "Site audit photos uploaded — 32 images" },
      { date: "Mar 2", author: "Robert P.", text: "Roof in excellent condition, no shading issues" },
      { date: "Feb 27", author: "Alex R.", text: "Initial proposal sent — 16 panel system" },
    ],
    checklist: solarChecklist.map((item, i) => ({ ...item, checked: i < 9 })),
    nextEvent: { type: "Design Review", date: "Mar 12, 2026", time: "2:00 PM", crew: ["Sarah Kim"] },
  },
  {
    id: "j003",
    customerName: "Priya Patel",
    firstName: "Priya",
    lastName: "Patel",
    address: "1523 Victory Blvd, Staten Island, NY 10314",
    shortAddress: "1523 Victory Blvd, SI",
    borough: "Staten Island",
    phone: "(718) 555-0391",
    email: "p.patel@email.com",
    serviceType: "Heat Pump",
    stage: "Credit Approved",
    daysInStage: 2,
    daysInPipeline: 22,
    assignedCrew: "Team Gamma",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "Mike Thompson",
    crewMembers: ["Andre Williams", "Sam Lee"],
    designEngineer: "Tom Rivera",
    fundingSources: [
      { name: "Cash Payment", amount: 18500, status: "Confirmed", statusType: "approved" },
      { name: "NYSERDA Heat Pump Rebate", amount: 2500, status: "Pending", statusType: "pending" },
    ],
    propertyType: "Semi-Detached — Flat Roof",
    yearBuilt: 1988,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 150A panel",
    totalProjectValue: 21000,
    documents: [
      { name: "Proposal_Patel_HeatPump.pdf", type: "pdf" },
      { name: "Signed_Contract_Patel.pdf", type: "pdf" },
    ],
    notes: [
      { date: "Mar 4", author: "Dean S.", text: "Contract signed. Customer paying cash for remainder." },
      { date: "Feb 28", author: "Tom R.", text: "Load calc complete — recommending 3-ton Mitsubishi unit" },
    ],
    checklist: solarChecklist.slice(0, 10).map((item, i) => ({ ...item, checked: i < 5 })),
    nextEvent: { type: "Equipment Delivery", date: "Mar 18, 2026", time: "10:00 AM", crew: ["Mike Thompson", "Andre Williams"] },
  },
  {
    id: "j004",
    customerName: "Marcus Williams",
    firstName: "Marcus",
    lastName: "Williams",
    address: "3847 White Plains Rd, Bronx, NY 10467",
    shortAddress: "3847 White Plains Rd, BX",
    borough: "Bronx",
    phone: "(718) 555-0463",
    email: "m.williams@email.com",
    serviceType: "Solar",
    stage: "EL Permit Approved",
    daysInStage: 1,
    daysInPipeline: 45,
    assignedCrew: "Team Alpha",
    salesRep: "Alex Rivera",
    salesRepInitials: "AR",
    foreman: "Carlos Mendez",
    crewMembers: ["James Wilson", "Tony Reyes"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "GreenSky Loan", amount: 38000, status: "Approved", statusType: "approved" },
      { name: "NYSERDA EFS Rebate", amount: 4200, status: "Submitted", statusType: "pending" },
      { name: "Federal ITC (30%)", amount: 11400, status: "Applied at filing", statusType: "info" },
    ],
    propertyType: "Detached — Flat Roof",
    yearBuilt: 1965,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Dual meter, 200A panel",
    totalProjectValue: 53600,
    documents: [
      { name: "Proposal_v3_Williams.pdf", type: "pdf" },
      { name: "Signed_Agreement_Williams.pdf", type: "pdf" },
      { name: "Final_Design_Williams.pdf", type: "pdf" },
      { name: "EL_Permit_Williams.pdf", type: "pdf" },
    ],
    notes: [
      { date: "Mar 6", author: "Alex R.", text: "EL permit approved by DOB — ready for GC filing" },
      { date: "Mar 1", author: "Sarah K.", text: "Planset finalized with PE stamp" },
      { date: "Feb 22", author: "Dean S.", text: "Customer approved final design — 28 panel system" },
    ],
    checklist: solarChecklist.map((item, i) => ({ ...item, checked: i < 12 })),
    nextEvent: { type: "GC Permit Filing", date: "Mar 10, 2026", time: "9:00 AM", crew: ["Carlos Mendez"] },
  },
  {
    id: "j005",
    customerName: "Jennifer Thompson",
    firstName: "Jennifer",
    lastName: "Thompson",
    address: "156 Court St, Brooklyn, NY 11201",
    shortAddress: "156 Court St, BK",
    borough: "Brooklyn",
    phone: "(718) 555-0528",
    email: "j.thompson@email.com",
    serviceType: "EV Charger",
    stage: "Install Scheduled",
    daysInStage: 4,
    daysInPipeline: 14,
    assignedCrew: "Team Delta",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "Pete Jackson",
    crewMembers: ["Ray Santos"],
    designEngineer: "Tom Rivera",
    fundingSources: [
      { name: "Cash Payment", amount: 4200, status: "Confirmed", statusType: "approved" },
    ],
    propertyType: "Brownstone — Garage",
    yearBuilt: 1910,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 4200,
    documents: [
      { name: "Proposal_Thompson_EV.pdf", type: "pdf" },
      { name: "Contract_Thompson.pdf", type: "pdf" },
    ],
    notes: [
      { date: "Mar 5", author: "Dean S.", text: "Installation scheduled for next week. ChargePoint unit ordered." },
      { date: "Feb 28", author: "Pete J.", text: "Panel has capacity for 50A circuit addition" },
    ],
    checklist: solarChecklist.slice(0, 8).map((item, i) => ({ ...item, checked: i < 6 })),
    nextEvent: { type: "Installation", date: "Mar 14, 2026", time: "9:00 AM", crew: ["Pete Jackson", "Ray Santos"] },
  },
  {
    id: "j006",
    customerName: "Roberto Garcia",
    firstName: "Roberto",
    lastName: "Garcia",
    address: "1847 Flatbush Ave, Brooklyn, NY 11210",
    shortAddress: "1847 Flatbush Ave, BK",
    borough: "Brooklyn",
    phone: "(718) 555-0634",
    email: "r.garcia@email.com",
    serviceType: "Solar",
    stage: "Lead",
    daysInStage: 7,
    daysInPipeline: 7,
    assignedCrew: "Unassigned",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "TBD",
    crewMembers: [],
    designEngineer: "TBD",
    fundingSources: [],
    propertyType: "Multi-Family — Flat Roof",
    yearBuilt: 1948,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "1 open ECB violation",
    meterInfo: "Multi-meter, 400A service",
    totalProjectValue: 0,
    documents: [],
    notes: [
      { date: "Mar 4", author: "Dean S.", text: "Inbound lead from website. Interested in solar for 3-family home." },
    ],
    checklist: solarChecklist.map((item) => ({ ...item, checked: false })),
  },
  {
    id: "j007",
    customerName: "Sun-Hee Kim",
    firstName: "Sun-Hee",
    lastName: "Kim",
    address: "42-15 Queens Blvd, Sunnyside, NY 11104",
    shortAddress: "42-15 Queens Blvd, QN",
    borough: "Queens",
    phone: "(718) 555-0712",
    email: "s.kim@email.com",
    serviceType: "Smart Home",
    stage: "Site Audit Scheduled",
    daysInStage: 2,
    daysInPipeline: 10,
    assignedCrew: "Team Delta",
    salesRep: "Alex Rivera",
    salesRepInitials: "AR",
    foreman: "Pete Jackson",
    crewMembers: ["Ray Santos"],
    designEngineer: "Tom Rivera",
    fundingSources: [
      { name: "Cash Payment", amount: 8500, status: "Confirmed", statusType: "approved" },
    ],
    propertyType: "Condo — High Rise",
    yearBuilt: 2015,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 100A panel",
    totalProjectValue: 8500,
    documents: [
      { name: "Proposal_Kim_SmartHome.pdf", type: "pdf" },
    ],
    notes: [
      { date: "Mar 5", author: "Alex R.", text: "Site audit scheduled for Thursday — smart thermostat + lighting" },
      { date: "Mar 1", author: "Alex R.", text: "Proposal sent — Lutron + Ecobee package" },
    ],
    checklist: solarChecklist.slice(0, 8).map((item, i) => ({ ...item, checked: i < 3 })),
    nextEvent: { type: "Site Audit", date: "Mar 13, 2026", time: "11:00 AM", crew: ["Pete Jackson"] },
  },
  {
    id: "j008",
    customerName: "Andre Jackson",
    firstName: "Andre",
    lastName: "Jackson",
    address: "2901 Grand Concourse, Bronx, NY 10468",
    shortAddress: "2901 Grand Concourse, BX",
    borough: "Bronx",
    phone: "(718) 555-0845",
    email: "a.jackson@email.com",
    serviceType: "Solar",
    stage: "Installed",
    daysInStage: 2,
    daysInPipeline: 68,
    assignedCrew: "Team Alpha",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "Carlos Mendez",
    crewMembers: ["James Wilson", "Tony Reyes", "Mike Chang"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "Service Finance", amount: 42000, status: "Approved", statusType: "approved" },
      { name: "NYSERDA EFS Rebate", amount: 4200, status: "Filed", statusType: "pending" },
      { name: "Federal ITC (30%)", amount: 12600, status: "Applied at filing", statusType: "info" },
    ],
    propertyType: "Detached — Flat Roof",
    yearBuilt: 1978,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 58800,
    documents: [
      { name: "Proposal_Jackson.pdf", type: "pdf" },
      { name: "Contract_Jackson.pdf", type: "pdf" },
      { name: "Final_Design_Jackson.pdf", type: "pdf" },
      { name: "Inspection_Request.pdf", type: "pdf" },
    ],
    notes: [
      { date: "Mar 7", author: "Carlos M.", text: "Installation complete — 30 panels, clean install. Scheduling DOB inspection." },
      { date: "Mar 5", author: "Carlos M.", text: "Day 2 installation — panels mounted, inverter wired" },
      { date: "Mar 4", author: "Carlos M.", text: "Day 1 — racking installed, conduit run complete" },
    ],
    checklist: solarChecklist.map((item, i) => ({ ...item, checked: i < 20 })),
    nextEvent: { type: "DOB Inspection", date: "Mar 17, 2026", time: "10:00 AM", crew: ["Carlos Mendez"] },
  },
  {
    id: "j009",
    customerName: "Kevin Lee",
    firstName: "Kevin",
    lastName: "Lee",
    address: "88-01 Northern Blvd, Jackson Heights, NY 11372",
    shortAddress: "88-01 Northern Blvd, QN",
    borough: "Queens",
    phone: "(718) 555-0956",
    email: "k.lee@email.com",
    serviceType: "Efficiency Audit",
    stage: "Site Audit Scheduled",
    daysInStage: 1,
    daysInPipeline: 5,
    assignedCrew: "Team Beta",
    salesRep: "Alex Rivera",
    salesRepInitials: "AR",
    foreman: "Robert Park",
    crewMembers: [],
    designEngineer: "N/A",
    fundingSources: [
      { name: "Cash Payment", amount: 1200, status: "Pending", statusType: "pending" },
    ],
    propertyType: "Semi-Detached — Pitched Roof",
    yearBuilt: 1982,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 150A panel",
    totalProjectValue: 1200,
    documents: [],
    notes: [
      { date: "Mar 6", author: "Alex R.", text: "Audit scheduled for next week. Customer interested in insulation + solar combo." },
    ],
    checklist: solarChecklist.slice(0, 5).map((item, i) => ({ ...item, checked: i < 1 })),
    nextEvent: { type: "Energy Audit", date: "Mar 13, 2026", time: "1:00 PM", crew: ["Robert Park"] },
  },
  {
    id: "j010",
    customerName: "Lisa Santos",
    firstName: "Lisa",
    lastName: "Santos",
    address: "275 Prospect Park West, Brooklyn, NY 11215",
    shortAddress: "275 Prospect Park W, BK",
    borough: "Brooklyn",
    phone: "(718) 555-1023",
    email: "l.santos@email.com",
    serviceType: "Solar",
    stage: "GC Permit Approved",
    daysInStage: 1,
    daysInPipeline: 52,
    assignedCrew: "Team Beta",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "Robert Park",
    crewMembers: ["Luis Garcia", "Kevin O'Brien"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "Climate First Loan", amount: 28000, status: "Approved", statusType: "approved" },
      { name: "NYSERDA EFS Rebate", amount: 3800, status: "Submitted", statusType: "pending" },
      { name: "Federal ITC (30%)", amount: 8400, status: "Applied at filing", statusType: "info" },
    ],
    propertyType: "Brownstone — Flat Roof",
    yearBuilt: 1899,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 40200,
    documents: [
      { name: "Proposal_Santos.pdf", type: "pdf" },
      { name: "Contract_Santos.pdf", type: "pdf" },
      { name: "Final_Design_Santos.pdf", type: "pdf" },
      { name: "Planset_Santos.pdf", type: "pdf" },
      { name: "GC_Permit_Santos.pdf", type: "pdf" },
    ],
    notes: [
      { date: "Mar 7", author: "Dean S.", text: "GC permit approved. Scheduling installation for next week." },
      { date: "Mar 2", author: "Sarah K.", text: "PE stamp received on planset" },
    ],
    checklist: solarChecklist.map((item, i) => ({ ...item, checked: i < 14 })),
    nextEvent: { type: "Installation", date: "Mar 19, 2026", time: "8:00 AM", crew: ["Robert Park", "Luis Garcia", "Kevin O'Brien"] },
  },
  {
    id: "j011",
    customerName: "Terrence Brown",
    firstName: "Terrence",
    lastName: "Brown",
    address: "4512 Avenue D, Brooklyn, NY 11203",
    shortAddress: "4512 Avenue D, BK",
    borough: "Brooklyn",
    phone: "(718) 555-1134",
    email: "t.brown@email.com",
    serviceType: "Heat Pump",
    stage: "Lead",
    daysInStage: 3,
    daysInPipeline: 3,
    assignedCrew: "Unassigned",
    salesRep: "Alex Rivera",
    salesRepInitials: "AR",
    foreman: "TBD",
    crewMembers: [],
    designEngineer: "TBD",
    fundingSources: [],
    propertyType: "Row House — Flat Roof",
    yearBuilt: 1960,
    utility: "National Grid",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 100A panel",
    totalProjectValue: 0,
    documents: [],
    notes: [
      { date: "Mar 8", author: "Alex R.", text: "Referral from Kim job. Interested in ducted mini-split for 2nd floor." },
    ],
    checklist: [],
  },
  {
    id: "j012",
    customerName: "Angela Martinez",
    firstName: "Angela",
    lastName: "Martinez",
    address: "611 West 180th St, Washington Heights, NY 10033",
    shortAddress: "611 W 180th St, MN",
    borough: "Manhattan",
    phone: "(212) 555-0478",
    email: "a.martinez@email.com",
    serviceType: "Solar",
    stage: "Final Design Created",
    daysInStage: 4,
    daysInPipeline: 28,
    assignedCrew: "Team Alpha",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "Carlos Mendez",
    crewMembers: ["James Wilson", "Tony Reyes"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "GreenSky Loan", amount: 35000, status: "Approved", statusType: "approved" },
      { name: "NYSERDA Rebate", amount: 4000, status: "Not Filed", statusType: "info" },
    ],
    propertyType: "Multi-Family — Flat Roof",
    yearBuilt: 1940,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Multi-meter, 400A service",
    totalProjectValue: 39000,
    documents: [
      { name: "Proposal_Martinez.pdf", type: "pdf" },
      { name: "Contract_Martinez.pdf", type: "pdf" },
      { name: "Final_Design_Martinez.pdf", type: "pdf" },
    ],
    notes: [
      { date: "Mar 6", author: "Sarah K.", text: "Final design complete — 24 panel system, 9.6kW" },
      { date: "Mar 1", author: "Dean S.", text: "Customer signed contract. Proceeding with design." },
    ],
    checklist: solarChecklist.map((item, i) => ({ ...item, checked: i < 10 })),
    nextEvent: { type: "Planset Review", date: "Mar 14, 2026", time: "3:00 PM", crew: ["Sarah Kim"] },
  },
  {
    id: "j013",
    customerName: "Yolanda Price",
    firstName: "Yolanda",
    lastName: "Price",
    address: "1290 Ocean Ave, Brooklyn, NY 11230",
    shortAddress: "1290 Ocean Ave, BK",
    borough: "Brooklyn",
    phone: "(718) 555-1267",
    email: "y.price@email.com",
    serviceType: "Solar",
    stage: "DOB Inspection",
    daysInStage: 3,
    daysInPipeline: 72,
    assignedCrew: "Team Gamma",
    salesRep: "Alex Rivera",
    salesRepInitials: "AR",
    foreman: "Mike Thompson",
    crewMembers: ["Andre Williams", "Sam Lee"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "Service Finance", amount: 36000, status: "Approved", statusType: "approved" },
      { name: "NYSERDA EFS Rebate", amount: 4200, status: "Submitted", statusType: "pending" },
    ],
    propertyType: "Detached — Pitched Roof",
    yearBuilt: 1991,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 40200,
    documents: [],
    notes: [
      { date: "Mar 8", author: "Mike T.", text: "DOB inspection scheduled for Monday. All paperwork ready." },
    ],
    checklist: solarChecklist.map((item, i) => ({ ...item, checked: i < 21 })),
    nextEvent: { type: "DOB Inspection", date: "Mar 11, 2026", time: "9:00 AM", crew: ["Mike Thompson"] },
  },
  {
    id: "j014",
    customerName: "Frank DiNapoli",
    firstName: "Frank",
    lastName: "DiNapoli",
    address: "78 Bay St, Staten Island, NY 10301",
    shortAddress: "78 Bay St, SI",
    borough: "Staten Island",
    phone: "(718) 555-1345",
    email: "f.dinapoli@email.com",
    serviceType: "EV Charger",
    stage: "Lead",
    daysInStage: 1,
    daysInPipeline: 1,
    assignedCrew: "Unassigned",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "TBD",
    crewMembers: [],
    designEngineer: "TBD",
    fundingSources: [],
    propertyType: "Detached — Driveway",
    yearBuilt: 2003,
    utility: "Con Edison",
    floodZone: true,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 0,
    documents: [],
    notes: [
      { date: "Mar 10", author: "Dean S.", text: "New lead — just purchased Tesla Model Y, needs Level 2 charger installed." },
    ],
    checklist: [],
  },
  {
    id: "j015",
    customerName: "William Torres",
    firstName: "William",
    lastName: "Torres",
    address: "534 East Tremont Ave, Bronx, NY 10457",
    shortAddress: "534 E Tremont Ave, BX",
    borough: "Bronx",
    phone: "(718) 555-1456",
    email: "w.torres@email.com",
    serviceType: "Solar",
    stage: "PTO",
    daysInStage: 5,
    daysInPipeline: 85,
    assignedCrew: "Team Beta",
    salesRep: "Alex Rivera",
    salesRepInitials: "AR",
    foreman: "Robert Park",
    crewMembers: ["Luis Garcia"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "Climate First Loan", amount: 30000, status: "Approved", statusType: "approved" },
      { name: "NYSERDA EFS Rebate", amount: 4200, status: "Approved", statusType: "approved" },
      { name: "Federal ITC (30%)", amount: 9000, status: "Applied at filing", statusType: "info" },
    ],
    propertyType: "Row House — Flat Roof",
    yearBuilt: 1955,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 43200,
    documents: [],
    notes: [
      { date: "Mar 6", author: "Robert P.", text: "PTO application submitted to Con Edison. Awaiting meter swap." },
    ],
    checklist: solarChecklist.map((item, i) => ({ ...item, checked: i < 22 })),
    nextEvent: { type: "Meter Swap", date: "Mar 20, 2026", time: "TBD", crew: [] },
  },
  {
    id: "j016",
    customerName: "Natasha Volkov",
    firstName: "Natasha",
    lastName: "Volkov",
    address: "2215 Brighton Beach Ave, Brooklyn, NY 11235",
    shortAddress: "2215 Brighton Beach, BK",
    borough: "Brooklyn",
    phone: "(718) 555-1567",
    email: "n.volkov@email.com",
    serviceType: "Solar",
    stage: "Project Complete",
    daysInStage: 2,
    daysInPipeline: 95,
    assignedCrew: "Team Alpha",
    salesRep: "Dean Santa",
    salesRepInitials: "DS",
    foreman: "Carlos Mendez",
    crewMembers: ["James Wilson", "Tony Reyes"],
    designEngineer: "Sarah Kim",
    fundingSources: [
      { name: "Service Finance", amount: 32000, status: "Approved", statusType: "approved" },
      { name: "NYSERDA EFS Rebate", amount: 4200, status: "Paid", statusType: "approved" },
      { name: "Federal ITC (30%)", amount: 9600, status: "Applied at filing", statusType: "info" },
    ],
    propertyType: "Semi-Detached — Flat Roof",
    yearBuilt: 1975,
    utility: "Con Edison",
    floodZone: false,
    openViolations: "None",
    meterInfo: "Single meter, 200A panel",
    totalProjectValue: 45800,
    documents: [],
    notes: [
      { date: "Mar 9", author: "Dean S.", text: "Project complete. LOC submitted. Customer very satisfied." },
    ],
    checklist: solarChecklist.map((item) => ({ ...item, checked: true })),
  },
];

export const todaySchedule: TodayScheduleItem[] = [
  { id: "ts1", jobId: "j001", customerName: "Maria Rodriguez", address: "482 Atlantic Ave, Brooklyn", serviceType: "Solar", stage: "Site Audit", crew: "Carlos Mendez", time: "8:00 AM" },
  { id: "ts2", jobId: "j002", customerName: "David Chen", address: "89-12 Parsons Blvd, Queens", serviceType: "Solar", stage: "Design Review", crew: "Sarah Kim", time: "9:30 AM" },
  { id: "ts3", jobId: "j005", customerName: "Jennifer Thompson", address: "156 Court St, Brooklyn", serviceType: "EV Charger", stage: "Installation", crew: "Pete Jackson", time: "10:00 AM" },
  { id: "ts4", jobId: "j007", customerName: "Sun-Hee Kim", address: "42-15 Queens Blvd, Sunnyside", serviceType: "Smart Home", stage: "Site Audit", crew: "Pete Jackson", time: "11:30 AM" },
  { id: "ts5", jobId: "j009", customerName: "Kevin Lee", address: "88-01 Northern Blvd, Jackson Heights", serviceType: "Efficiency Audit", stage: "Energy Audit", crew: "Robert Park", time: "1:00 PM" },
  { id: "ts6", jobId: "j013", customerName: "Yolanda Price", address: "1290 Ocean Ave, Brooklyn", serviceType: "Solar", stage: "DOB Inspection", crew: "Mike Thompson", time: "2:00 PM" },
  { id: "ts7", jobId: "j004", customerName: "Marcus Williams", address: "3847 White Plains Rd, Bronx", serviceType: "Solar", stage: "Permit Filing", crew: "Carlos Mendez", time: "3:30 PM" },
  { id: "ts8", jobId: "j010", customerName: "Lisa Santos", address: "275 Prospect Park W, Brooklyn", serviceType: "Solar", stage: "Installation Prep", crew: "Robert Park", time: "4:00 PM" },
];

export const recentActivity: ActivityItem[] = [
  { id: "a1", text: "EL permit approved for Williams — 3847 White Plains Rd", time: "2 hours ago", type: "permit" },
  { id: "a2", text: "Site audit photos uploaded for Chen — 89-12 Parsons Blvd", time: "3 hours ago", type: "photo" },
  { id: "a3", text: "NYSERDA rebate submitted for Price — $4,200", time: "4 hours ago", type: "rebate" },
  { id: "a4", text: "Contract signed by Patel — 1523 Victory Blvd, SI", time: "5 hours ago", type: "contract" },
  { id: "a5", text: "Installation complete for Jackson — 2901 Grand Concourse", time: "6 hours ago", type: "general" },
  { id: "a6", text: "Final design approved for Martinez — 611 W 180th St", time: "7 hours ago", type: "design" },
  { id: "a7", text: "GC permit approved for Santos — 275 Prospect Park W", time: "8 hours ago", type: "permit" },
  { id: "a8", text: "Drone flight completed for Chen — 47 photos captured", time: "9 hours ago", type: "photo" },
  { id: "a9", text: "PTO filed for Torres — 534 E Tremont Ave", time: "Yesterday", type: "permit" },
  { id: "a10", text: "LOC submitted for Volkov — project complete", time: "Yesterday", type: "general" },
];

export const alerts: AlertItem[] = [
  { id: "al1", text: "Proposal sent 7 days ago — no response (Garcia)", severity: "warning" },
  { id: "al2", text: "Permit expiring in 3 days (Thompson)", severity: "urgent" },
  { id: "al3", text: "Credit approval pending 5 days (Lee)", severity: "warning" },
  { id: "al4", text: "Rebate application incomplete (Jackson)", severity: "info" },
  { id: "al5", text: "Site audit reschedule needed (Brown)", severity: "warning" },
  { id: "al6", text: "DOB inspection follow-up required (Price)", severity: "urgent" },
];

export const dashboardMetrics = {
  activeProjects: { value: 47, trend: 12, direction: "up" as const },
  pendingPermits: { value: 12, trend: 8, direction: "down" as const },
  proposalsAwaiting: { value: 8, trend: 15, direction: "up" as const },
  nyserdaRebates: { value: 15, trend: 5, direction: "up" as const },
  siteAudits: { value: 6, trend: 20, direction: "up" as const },
  revenueThisMonth: { value: 284500, trend: 18, direction: "up" as const },
};
