import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GitCompareArrows,
  BarChart3,
  Check,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader, RiskBadge, SectionCard } from "@/components/bi/primitives";
import { businessOptions, DEFAULT_LOCATION } from "@/lib/mock-data";

export const Route = createFileRoute("/comparisons")({
  head: () => ({
    meta: [
      { title: "Comparisons — BizIntel AI" },
      {
        name: "description",
        content: "Side-by-side business model comparison matrix and visual analytics.",
      },
    ],
  }),
  component: ComparisonsPage,
});

const chartAxis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};

export function ComparisonsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "cloud-kitchen",
    "premium-gym",
    "cafe",
    "co-working",
  ]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((i) => i !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedBusinesses = businessOptions.filter((b) => selectedIds.includes(b.id));

  const groupBarData = selectedBusinesses.map((b) => ({
    name: b.name,
    Score: b.score,
    Demand: b.demand,
    Competition: b.competition,
    Growth: b.growth,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Comparisons"
        subtitle={`Compare candidate business models for ${DEFAULT_LOCATION}`}
        actions={
          <Button asChild>
            <Link to="/recommendations">
              <Sparkles className="size-4" /> View AI Recommendations
            </Link>
          </Button>
        }
      />

      {/* Model Selector Strip */}
      <SectionCard
        title="Select Models to Compare"
        description="Choose 2 to 4 models for side-by-side comparison"
        icon={GitCompareArrows}
      >
        <div className="flex flex-wrap gap-4">
          {businessOptions.map((b) => {
            const isChecked = selectedIds.includes(b.id);
            return (
              <label
                key={b.id}
                className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium cursor-pointer transition-all ${
                  isChecked
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                <Checkbox checked={isChecked} onCheckedChange={() => toggleSelect(b.id)} />
                <span>{b.name}</span>
                <Badge variant="outline" className="text-[10px]">
                  {b.score}/100
                </Badge>
              </label>
            );
          })}
        </div>
      </SectionCard>

      {/* Side-by-side Matrix Table */}
      <SectionCard
        title="Comparison Matrix"
        description="Direct metric mapping across selected models"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48 font-bold text-foreground">Metric / Model</TableHead>
                {selectedBusinesses.map((b) => (
                  <TableHead key={b.id} className="text-center min-w-[160px]">
                    <div className="space-y-1 py-1">
                      <p className="font-bold text-foreground text-base">{b.name}</p>
                      {b.id === "cloud-kitchen" && (
                        <Badge className="bg-success/15 text-success text-[10px]">
                          #1 Top Pick
                        </Badge>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Opportunity Score</TableCell>
                {selectedBusinesses.map((b) => (
                  <TableCell key={b.id} className="text-center font-bold text-lg text-primary">
                    {b.score}/100
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Demand Index</TableCell>
                {selectedBusinesses.map((b) => (
                  <TableCell key={b.id} className="text-center tabular-nums font-semibold">
                    {b.demand}/100
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Competition Level</TableCell>
                {selectedBusinesses.map((b) => (
                  <TableCell key={b.id} className="text-center tabular-nums">
                    {b.competition}/100
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CapEx Investment</TableCell>
                {selectedBusinesses.map((b) => (
                  <TableCell key={b.id} className="text-center">
                    <Badge variant="outline">{b.investment}</Badge>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Est. Monthly Revenue</TableCell>
                {selectedBusinesses.map((b) => (
                  <TableCell key={b.id} className="text-center font-semibold text-foreground">
                    {b.revenue}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Growth YoY</TableCell>
                {selectedBusinesses.map((b) => (
                  <TableCell key={b.id} className="text-center font-semibold text-success">
                    +{b.growth}%
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Risk Level</TableCell>
                {selectedBusinesses.map((b) => (
                  <TableCell key={b.id} className="text-center">
                    <RiskBadge level={b.risk} />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      {/* Visual Chart Comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Score & Metrics Breakdown" icon={BarChart3}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupBarData} margin={{ left: -16, right: 8 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis dataKey="name" {...chartAxis} />
                <YAxis domain={[0, 100]} {...chartAxis} />
                <RTooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Score" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Demand" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Competition" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Winning Highlights & Takeaways">
          <div className="space-y-4">
            {selectedBusinesses.map((b) => (
              <div key={b.id} className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-foreground">{b.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    Score: {b.score}/100
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{b.summary}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Button variant="outline" asChild>
          <Link to="/location-analysis">View Location Factors</Link>
        </Button>
        <Button asChild>
          <Link to="/reports">
            Generate Comparison Report <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
