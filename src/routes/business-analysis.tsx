import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  ShieldAlert,
  Zap,
  CheckCircle2,
  ArrowRight,
  PieChart as PieIcon,
  BarChart2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PageHeader,
  RiskBadge,
  ScoreBar,
  ScoreRing,
  SectionCard,
  StatCard,
} from "@/components/bi/primitives";
import { businessOptions, DEFAULT_LOCATION, revenueForecast } from "@/lib/mock-data";

export const Route = createFileRoute("/business-analysis")({
  head: () => ({
    meta: [
      { title: "Business Analysis — BizIntel AI" },
      {
        name: "description",
        content: "Deep business model analysis, unit economics, and financial projections.",
      },
    ],
  }),
  component: BusinessAnalysisPage,
});

const chartAxis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};
const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

const costBreakdownData = [
  { name: "Rent & Utilities", value: 25 },
  { name: "Raw Materials / Food", value: 35 },
  { name: "Staff & Operations", value: 22 },
  { name: "Marketing & Platform Fee", value: 18 },
];

export function BusinessAnalysisPage() {
  const [selectedId, setSelectedId] = useState("cloud-kitchen");
  const business = businessOptions.find((b) => b.id === selectedId) || businessOptions[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Analysis"
        subtitle={`In-depth model evaluation for ${DEFAULT_LOCATION}`}
        actions={
          <div className="flex items-center gap-3">
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-[200px] bg-background">
                <SelectValue placeholder="Select Business" />
              </SelectTrigger>
              <SelectContent>
                {businessOptions.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name} ({b.score}/100)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild>
              <Link to="/ai-advisor">
                <Zap className="size-4" /> Ask AI Advisor
              </Link>
            </Button>
          </div>
        }
      />

      {/* Selected Business Overview Header */}
      <SectionCard
        title={business.name}
        description="Model Overview & Feasibility Score"
        icon={Building2}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <ScoreRing value={business.score} label="Opportunity Score" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold">{business.name}</h2>
              <RiskBadge level={business.risk} />
              <Badge variant="outline" className="text-xs">
                Investment: {business.investment}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{business.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-2">
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Est. Monthly Revenue</p>
                <p className="text-lg font-bold text-foreground">{business.revenue}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Demand Index</p>
                <p className="text-lg font-bold text-primary">{business.demand}/100</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Competition Level</p>
                <p className="text-lg font-bold text-muted-foreground">
                  {business.competition}/100
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Growth Potential</p>
                <p className="text-lg font-bold text-success">+{business.growth}%</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Customer Potential"
          value={`${business.customerPotential}/100`}
          icon={Users}
          hint="High-density IT catchment"
        />
        <StatCard
          label="CapEx Required"
          value={
            business.investment === "High"
              ? "₹35-50L"
              : business.investment === "Medium"
                ? "₹15-25L"
                : "₹5-12L"
          }
          icon={DollarSign}
          hint="Initial setup & inventory"
        />
        <StatCard
          label="Break-even Horizon"
          value="7–9 Months"
          icon={TrendingUp}
          hint="At 55% capacity utilization"
        />
        <StatCard
          label="Risk Factor"
          value={business.risk}
          icon={ShieldAlert}
          hint="Market & operational risk"
        />
      </div>

      {/* Tabs for detailed sections */}
      <Tabs defaultValue="financials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="financials">Financials & Revenue</TabsTrigger>
          <TabsTrigger value="economics">Unit Economics</TabsTrigger>
          <TabsTrigger value="roadmap">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="financials" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="12-Month Revenue Projection (₹ Lakhs)" icon={BarChart2}>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueForecast} margin={{ left: -20, right: 8 }}>
                    <defs>
                      <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                      vertical={false}
                    />
                    <XAxis dataKey="month" {...chartAxis} />
                    <YAxis {...chartAxis} />
                    <RTooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area
                      type="monotone"
                      dataKey="high"
                      name="Optimistic Case"
                      stroke="var(--color-chart-1)"
                      fill="url(#colorHigh)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="expected"
                      name="Expected Case"
                      stroke="var(--color-chart-2)"
                      fill="url(#colorExp)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="low"
                      name="Conservative Case"
                      stroke="var(--color-chart-4)"
                      fill="none"
                      strokeDasharray="4 4"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="Cost Structure Breakdown" icon={PieIcon}>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {costBreakdownData.map((_, i) => (
                        <Cell key={i} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <RTooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="economics" className="space-y-6">
          <SectionCard
            title="Key Operational Metrics"
            description="Benchmark efficiency targets for optimum profitability"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border/60 bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    Average Order Value (AOV)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">₹340</p>
                  <p className="text-xs text-muted-foreground mt-1">Target range: ₹280 - ₹420</p>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    Gross Margin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-success">65%</p>
                  <p className="text-xs text-muted-foreground mt-1">COGS at 35% of revenue</p>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    CAC (Customer Acquisition Cost)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-warning">₹85</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Blended across digital & aggregators
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-sm">Key Feasibility Drivers</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Market Fit Index", val: business.demand },
                  { label: "Customer Potential Index", val: business.customerPotential },
                  { label: "Growth Factor", val: business.growth },
                  { label: "Competitive Defense", val: 100 - business.competition },
                ].map((item) => (
                  <ScoreBar key={item.label} label={item.label} value={item.val} tone="primary" />
                ))}
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <SectionCard
            title="Launch Checklist & Milestones"
            description="Step-by-step roadmap for opening in Gachibowli"
          >
            <div className="space-y-4">
              {[
                {
                  phase: "Phase 1: Setup & Licensing (Weeks 1-4)",
                  desc: "Location lease finalization, FSSAI & GST registrations, kitchen equipment installation.",
                },
                {
                  phase: "Phase 2: Hiring & Soft Launch (Weeks 5-6)",
                  desc: "Staff onboarding, trial menu runs, aggregator onboarding (Swiggy/Zomato).",
                },
                {
                  phase: "Phase 3: Grand Opening & Marketing (Week 7+)",
                  desc: "Targeted localized Instagram campaigns, influencer reviews, WhatsApp order setup.",
                },
                {
                  phase: "Phase 4: Optimization (Months 2-6)",
                  desc: "Menu item rationalization, direct delivery push, loyalty program launch.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-start p-4 rounded-lg border border-border bg-muted/30"
                >
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">{step.phase}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Button variant="outline" asChild>
          <Link to="/comparisons">
            <ArrowRight className="size-4 rotate-180" /> Compare Models
          </Link>
        </Button>
        <Button asChild>
          <Link to="/reports">
            Generate Full Report <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
