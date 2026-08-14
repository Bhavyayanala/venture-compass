import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  Building2,
  Gauge,
  Lightbulb,
  MapPin,
  Save,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  RiskBadge,
  ScoreBar,
  ScoreRing,
  SectionCard,
  StatCard,
} from "@/components/bi/primitives";
import { LocationMap } from "@/components/bi/location-map";
import {
  advisorReply,
  businessOptions,
  customerSegments,
  DEFAULT_BUDGET,
  DEFAULT_LOCATION,
  demandTrend,
  keyInsights,
  locationMetrics,
  marketOpportunities,
  mlPredictions,
  recommendedBusiness,
  riskFactors,
} from "@/lib/mock-data";
import { saveAnalysis } from "@/lib/saved-analyses";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Business Intelligence Platform" },
      {
        name: "description",
        content:
          "AI-powered business opportunity analysis: location scoring, ML demand and revenue predictions, risk analysis and recommendations.",
      },
      { property: "og:title", content: "Dashboard — AI Business Intelligence Platform" },
      {
        property: "og:description",
        content: "Find the best business opportunity with AI-powered insights.",
      },
    ],
  }),
  component: DashboardPage,
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

type Status = "idle" | "loading" | "ready" | "error";

function DashboardPage() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [budget, setBudget] = useState(String(DEFAULT_BUDGET));
  const [businessType, setBusinessType] = useState("compare-all");
  const [status, setStatus] = useState<Status>("ready");

  const runAnalysis = () => {
    if (!location.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("ready"), 1400);
  };

  const onSave = () => {
    saveAnalysis({
      name: `${recommendedBusiness.name} — ${location}`,
      location,
      budget: Number(budget) || DEFAULT_BUDGET,
      businessType,
      recommended: recommendedBusiness.name,
      score: recommendedBusiness.score,
      demandScore: recommendedBusiness.demand,
      competitionScore: recommendedBusiness.competition,
      revenue: recommendedBusiness.revenue,
      risk: recommendedBusiness.risk,
    });
    toast.success("Analysis saved", { description: "Open it any time from Saved Analyses." });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI BUSINESS INTELLIGENCE PLATFORM"
        subtitle="Find the Best Business Opportunity with AI-Powered Insights"
        actions={
          <>
            <Button variant="outline" onClick={onSave}>
              <Save className="size-4" /> Save analysis
            </Button>
            <Button asChild>
              <Link to="/reports">
                <Sparkles className="size-4" /> Generate report
              </Link>
            </Button>
          </>
        }
      />

      {/* Analysis form */}
      <SectionCard
        title="Analysis Parameters"
        description="Mock engine — plug your FastAPI ML service in later."
        icon={Gauge}
      >
        <div className="grid gap-4 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:items-end">
          <div className="space-y-2">
            <Label htmlFor="loc">Location</Label>
            <Input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (₹)</Label>
            <Input
              id="budget"
              inputMode="numeric"
              value={budget}
              onChange={(e) => setBudget(e.target.value.replace(/[^\d]/g, ""))}
            />
            <p className="text-xs text-muted-foreground">
              ₹{Number(budget || 0).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Business Type</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compare-all">Compare All</SelectItem>
                {businessOptions.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size="lg"
            onClick={runAnalysis}
            disabled={status === "loading"}
            className="w-full lg:w-auto"
          >
            <Brain className="size-4" />
            {status === "loading" ? "ANALYZING…" : "ANALYZE OPPORTUNITY"}
          </Button>
        </div>

        {status === "error" ? (
          <div className="mt-4">
            <ErrorState
              message="A valid location is required to run the analysis."
              onRetry={() => setStatus("ready")}
            />
          </div>
        ) : null}
      </SectionCard>

      {status === "loading" ? (
        <SectionCard title="Running models" icon={Activity}>
          <LoadingState rows={4} label="Scoring location, demand and competition…" />
        </SectionCard>
      ) : null}

      {status === "ready" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Opportunity Score"
              value="89/100"
              icon={Gauge}
              delta="+7 vs area avg"
            />
            <StatCard label="Demand" value="94/100" icon={TrendingUp} delta="+12% YoY" />
            <StatCard
              label="Competition"
              value="65/100"
              icon={Users}
              hint="18 direct competitors"
            />
            <StatCard
              label="Est. Monthly Revenue"
              value="₹4–6 L"
              icon={Wallet}
              hint="Steady state"
            />
          </div>

          {/* 1. Location Analysis */}
          <SectionCard
            title="1. Location Analysis"
            description={location}
            icon={MapPin}
            actions={
              <Button variant="ghost" size="sm" asChild>
                <Link to="/location-analysis">View details</Link>
              </Button>
            }
          >
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {locationMetrics.map((m) => (
                <ScoreBar
                  key={m.label}
                  label={m.label}
                  value={m.value}
                  detail={m.detail}
                  tone={m.value >= 85 ? "success" : m.value >= 70 ? "primary" : "warning"}
                />
              ))}
            </div>
          </SectionCard>

          {/* 2. Business Recommendation */}
          <SectionCard
            title="2. Business Recommendation"
            description="Top-ranked model for your budget and location"
            icon={Lightbulb}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <ScoreRing value={recommendedBusiness.score} />
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold">{recommendedBusiness.name}</h3>
                  <Badge className="bg-success/15 text-success">Recommended</Badge>
                  <RiskBadge level={recommendedBusiness.risk} />
                </div>
                <p className="text-sm text-muted-foreground">{recommendedBusiness.summary}</p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { k: "Demand", v: "94/100" },
                    { k: "Competition", v: "65/100" },
                    { k: "Investment", v: "Medium" },
                    { k: "Est. Revenue", v: "₹4–6 Lakhs" },
                  ].map((i) => (
                    <div key={i.k} className="rounded-lg border border-border bg-muted/40 p-3">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{i.k}</p>
                      <p className="mt-1 text-base font-semibold">{i.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 3. Map */}
          <SectionCard
            title="3. Interactive Location Map"
            description="Competitors, demand drivers and anchor institutions near your site"
            icon={MapPin}
          >
            <LocationMap />
          </SectionCard>

          {/* 4. Business Comparison */}
          <SectionCard
            title="4. Business Comparison"
            description="Opportunity score across candidate models"
            icon={BarChart3}
            actions={
              <Button variant="ghost" size="sm" asChild>
                <Link to="/comparisons">Compare</Link>
              </Button>
            }
          >
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={businessOptions.slice(0, 4)} margin={{ left: -18, right: 8 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      {...chartAxis}
                      tickLine={false}
                      axisLine={false}
                      interval={0}
                    />
                    <YAxis domain={[0, 100]} {...chartAxis} tickLine={false} axisLine={false} />
                    <RTooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="var(--color-chart-1)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="text-right">Demand</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businessOptions.slice(0, 4).map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell className="text-right tabular-nums">{b.score}/100</TableCell>
                        <TableCell className="text-right tabular-nums">{b.demand}</TableCell>
                        <TableCell className="text-right">{b.revenue}</TableCell>
                        <TableCell className="text-right">
                          <RiskBadge level={b.risk} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </SectionCard>

          {/* 5. Key insights */}
          <SectionCard title="5. Key Insights" description="What the model found" icon={Sparkles}>
            <div className="grid gap-4 sm:grid-cols-2">
              {keyInsights.map((k) => (
                <div key={k.title} className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-sm font-semibold">{k.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{k.body}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 6. ML Predictions */}
          <SectionCard
            title="6. ML Prediction Results"
            description="Mock outputs — replace with your FastAPI model responses"
            icon={Brain}
            actions={<Badge variant="outline">Mock mode</Badge>}
          >
            <div className="grid gap-4 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
              {mlPredictions.map((p) => (
                <div key={p.label} className="rounded-xl border border-border bg-muted/30 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {p.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{p.value}</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${p.numeric}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="h-64">
                <p className="mb-2 text-sm font-medium">Demand vs Competition trend</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandTrend} margin={{ left: -20, right: 8 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                      vertical={false}
                    />
                    <XAxis dataKey="month" {...chartAxis} tickLine={false} axisLine={false} />
                    <YAxis {...chartAxis} tickLine={false} axisLine={false} />
                    <RTooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="demand"
                      stroke="var(--color-chart-1)"
                      strokeWidth={2.5}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="competition"
                      stroke="var(--color-chart-4)"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="h-64">
                <p className="mb-2 text-sm font-medium">Projected monthly revenue (₹ Lakhs)</p>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandTrend} margin={{ left: -20, right: 8 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                      vertical={false}
                    />
                    <XAxis dataKey="month" {...chartAxis} tickLine={false} axisLine={false} />
                    <YAxis {...chartAxis} tickLine={false} axisLine={false} />
                    <RTooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-chart-2)"
                      fill="url(#rev)"
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SectionCard>

          {/* 7. Risk analysis */}
          <SectionCard
            title="7. Risk Analysis"
            description="Overall risk: Medium"
            icon={ShieldAlert}
          >
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="space-y-4">
                {riskFactors.map((r) => (
                  <div key={r.name} className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <p className="truncate text-sm font-medium">{r.name}</p>
                      <RiskBadge level={r.level} />
                    </div>
                    <div className="mt-3">
                      <ScoreBar
                        label="Exposure"
                        value={r.score}
                        detail={r.note}
                        tone={r.score > 65 ? "destructive" : r.score > 45 ? "warning" : "success"}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-72">
                <p className="mb-2 text-sm font-medium">Customer segments</p>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                    >
                      {customerSegments.map((_, i) => (
                        <Cell key={i} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <RTooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SectionCard>

          {/* 8. Market opportunities */}
          <SectionCard
            title="8. Market Opportunities"
            description="Emerging gaps detected in this micro-market"
            icon={TrendingUp}
            actions={
              <Button variant="ghost" size="sm" asChild>
                <Link to="/market-opportunities">See all</Link>
              </Button>
            }
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {marketOpportunities.slice(0, 3).map((o) => (
                <div key={o.id} className="rounded-xl border border-border bg-muted/30 p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                    <p className="truncate font-semibold">{o.name}</p>
                    <Badge className="shrink-0 bg-primary/15 text-primary">{o.score}/100</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline">{o.category}</Badge>
                    <Badge variant="outline">{o.growth}</Badge>
                    <RiskBadge level={o.risk} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 9. AI Advisor */}
          <SectionCard
            title="9. AI Business Advisor"
            description="Ask anything about this analysis"
            icon={Bot}
            actions={
              <Button variant="ghost" size="sm" asChild>
                <Link to="/ai-advisor">Open chat</Link>
              </Button>
            }
          >
            <AdvisorPreview />
          </SectionCard>
        </>
      ) : null}

      {status === "idle" ? (
        <EmptyState
          title="No analysis yet"
          description="Enter a location and budget, then run the analysis to see results."
          icon={Building2}
          action={<Button onClick={runAnalysis}>Analyze opportunity</Button>}
        />
      ) : null}
    </div>
  );
}

function AdvisorPreview() {
  const [q, setQ] = useState("");
  const [a, setA] = useState<string | null>(null);

  const ask = (text: string) => {
    if (!text.trim()) return;
    setA(advisorReply(text));
    setQ("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {["Why did you recommend a cloud kitchen?", "What are the major risks?"].map((s) => (
          <Button key={s} variant="outline" size="sm" onClick={() => ask(s)}>
            {s}
          </Button>
        ))}
      </div>
      {a ? (
        <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed">
          {a}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Pick a suggested question or type your own to get an instant advisory answer.
        </p>
      )}
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(q);
        }}
      >
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask the AI advisor…" />
        <Button type="submit" size="icon" aria-label="Send">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
