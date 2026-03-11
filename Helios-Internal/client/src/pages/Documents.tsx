import { useState } from "react";
import { Search, FileText, FileArchive, FolderOpen, Upload, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jobs } from "@/lib/data";

const allDocs = jobs.flatMap(j =>
  j.documents.map(d => ({
    ...d,
    customer: j.customerName,
    jobId: j.id,
    serviceType: j.serviceType,
  }))
);

const categories = [
  { name: "Proposals", count: allDocs.filter(d => d.name.includes("Proposal")).length, icon: FileText, color: "text-blue-500" },
  { name: "Contracts", count: allDocs.filter(d => d.name.includes("Agreement") || d.name.includes("Contract")).length, icon: FileText, color: "text-emerald-500" },
  { name: "Designs", count: allDocs.filter(d => d.name.includes("Design") || d.name.includes("Planset")).length, icon: FileText, color: "text-purple-500" },
  { name: "Permits", count: allDocs.filter(d => d.name.includes("Permit") || d.name.includes("ACP5")).length, icon: FileText, color: "text-orange-500" },
  { name: "Photos", count: allDocs.filter(d => d.name.includes("Photo") || d.type === "zip").length, icon: FileArchive, color: "text-amber-500" },
];

export default function Documents() {
  const [search, setSearch] = useState("");

  const filtered = allDocs.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div data-testid="documents-page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {allDocs.length} documents across all projects
          </p>
        </div>
        <Button data-testid="button-upload-doc" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {categories.map(cat => (
          <Card key={cat.name} className="border border-card-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <cat.icon className={`w-4 h-4 ${cat.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold">{cat.count}</p>
                <p className="text-xs text-muted-foreground">{cat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-md mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-testid="input-search-docs"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      <Card className="border border-card-border">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border bg-muted/30">
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Document</th>
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, i) => (
                <tr
                  key={`${doc.jobId}-${i}`}
                  data-testid={`doc-row-${i}`}
                  className={`border-b border-card-border/50 hover:bg-muted/20 cursor-pointer transition-colors ${
                    i === filtered.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    {doc.type === "zip" ? (
                      <FileArchive className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    )}
                    <span className="font-medium">{doc.name}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{doc.customer}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="text-[10px] uppercase">
                      {doc.type}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
