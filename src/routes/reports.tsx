import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Printer, Download, Share2, Check, Bookmark, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, SectionCard } from "@/components/bi/primitives";
import { DEFAULT_LOCATION, recommendedBusiness, reportSections } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — BizIntel AI" },
      {
        name: "description",
        content: "Comprehensive business intelligence report generation & export.",
      },
    ],
  }),
  component: ReportsPage,
});

export function ReportsPage() {
  const [activeSection, setActiveSection] = useState("executive-summary");

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportSections, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `BizIntel_Report_${DEFAULT_LOCATION.replace(/\s+/g, "_")}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Report data exported as JSON");
  };

  const handleCopy = () => {
    const fullReport = reportSections.map((s) => `## ${s.title}\n\n${s.body}`).join("\n\n");
    navigator.clipboard.writeText(fullReport);
    toast.success("Full report text copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Full Business Intelligence Report"
        subtitle={`Generated for ${DEFAULT_LOCATION} · ${new Date().toLocaleDateString()}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Share2 className="size-4" /> Copy Text
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="size-4" /> Export JSON
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Printer className="size-4" /> Print / PDF
            </Button>
          </div>
        }
      />

      {/* Overview Banner */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/10 via-background to-accent/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-primary-foreground font-bold">
              <Sparkles className="size-3 mr-1 inline" /> AI Generated Report
            </Badge>
            <span className="text-xs text-muted-foreground">Version 1.4 · Mock ML Engine</span>
          </div>
          <CardTitle className="text-xl font-bold mt-2">
            Market Viability & Business Opportunity: {recommendedBusiness.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Target Location:{" "}
            <span className="font-semibold text-foreground">{DEFAULT_LOCATION}</span> | Capital
            Budget: <span className="font-semibold text-foreground">₹20,00,000</span> | Overall
            Feasibility Score:{" "}
            <span className="font-bold text-primary">{recommendedBusiness.score}/100</span>
          </p>
        </CardContent>
      </Card>

      {/* Main Content Layout with Sidebar ToC */}
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Table of Contents Sticky Nav */}
        <div className="hidden lg:block space-y-2 sticky top-24 h-fit">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
            Table of Contents
          </p>
          <nav className="flex flex-col gap-1">
            {reportSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeSection === sec.id
                    ? "bg-primary/15 text-primary font-bold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {sec.title}
              </a>
            ))}
          </nav>
        </div>

        {/* Report Sections Content */}
        <div className="space-y-6">
          {reportSections.map((sec, idx) => (
            <SectionCard key={sec.id} title={`${idx + 1}. ${sec.title}`} icon={FileText}>
              <div id={sec.id} className="scroll-mt-24 space-y-3">
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                  {sec.body}
                </p>
              </div>
            </SectionCard>
          ))}
        </div>
      </div>
    </div>
  );
}
