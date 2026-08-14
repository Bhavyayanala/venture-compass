import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Lightbulb,
  Sparkles,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  DollarSign,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, RiskBadge, ScoreRing, SectionCard } from "@/components/bi/primitives";
import { businessOptions, DEFAULT_LOCATION, recommendedBusiness } from "@/lib/mock-data";
import { saveAnalysis } from "@/lib/saved-analyses";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "Recommendations — BizIntel AI" },
      {
        name: "description",
        content: "Top AI recommendations ranked for your location and budget.",
      },
    ],
  }),
  component: RecommendationsPage,
});

export function RecommendationsPage() {
  const [filterRisk, setFilterRisk] = useState<string>("All");

  const filtered = businessOptions.filter((b) => filterRisk === "All" || b.risk === filterRisk);

  const handleSaveTop = () => {
    saveAnalysis({
      name: `${recommendedBusiness.name} — ${DEFAULT_LOCATION}`,
      location: DEFAULT_LOCATION,
      budget: 2000000,
      businessType: recommendedBusiness.id,
      recommended: recommendedBusiness.name,
      score: recommendedBusiness.score,
      revenue: recommendedBusiness.revenue,
      risk: recommendedBusiness.risk,
    });
    toast.success("Top recommendation saved to your workspace!");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Recommendations"
        subtitle={`Ranked business models optimized for ${DEFAULT_LOCATION}`}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveTop}>
              <Award className="size-4 text-warning" /> Save Top Recommendation
            </Button>
            <Button asChild>
              <Link to="/business-analysis">
                <Building2 className="size-4" /> Deep Dive Analysis
              </Link>
            </Button>
          </div>
        }
      />

      {/* Hero #1 Recommended Card */}
      <Card className="relative overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-background to-accent/30 shadow-lg">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <Badge className="bg-gradient-primary text-primary-foreground font-bold px-3 py-1 text-xs">
            <Sparkles className="size-3.5 mr-1 inline" /> #1 RECOMMENDED MATCH
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            {recommendedBusiness.name}
            <RiskBadge level={recommendedBusiness.risk} />
          </CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-1 max-w-3xl">
            {recommendedBusiness.summary}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-[auto_1fr]">
            <ScoreRing value={recommendedBusiness.score} label="Match Score" size={130} />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <p className="text-xs uppercase text-muted-foreground font-medium">Est. Revenue</p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {recommendedBusiness.revenue}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Monthly steady state</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <p className="text-xs uppercase text-muted-foreground font-medium">Demand Index</p>
                <p className="mt-1 text-xl font-bold text-primary">
                  {recommendedBusiness.demand}/100
                </p>
                <p className="text-xs text-muted-foreground mt-1">High office density</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <p className="text-xs uppercase text-muted-foreground font-medium">Capital Fit</p>
                <p className="mt-1 text-xl font-bold text-success">Optimal</p>
                <p className="text-xs text-muted-foreground mt-1">Fits ₹20L budget</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <p className="text-xs uppercase text-muted-foreground font-medium">Growth YoY</p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  +{recommendedBusiness.growth}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">Rising delivery market</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-muted/40 p-4 space-y-3">
            <h4 className="text-sm font-bold flex items-center gap-2 text-foreground">
              <Lightbulb className="size-4 text-warning" /> Why this is your top recommendation:
            </h4>
            <ul className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success shrink-0" />
                72% delivery-first order volume in Gachibowli
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success shrink-0" />
                58% lower rent compared to high-street retail
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success shrink-0" />
                Fast 7-9 month break-even timeline
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success shrink-0" />
                High 89/100 composite opportunity index
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Recommendations Section */}
      <SectionCard
        title="All Recommendation Rankings"
        description="Candidate models evaluated against your criteria"
        icon={TrendingUp}
        actions={
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Filter Risk:</span>
            {["All", "Low", "Medium", "High"].map((level) => (
              <Button
                key={level}
                variant={filterRisk === level ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setFilterRisk(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between border-border/80 transition-all hover:border-primary/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-semibold">
                    Rank #{businessOptions.findIndex((b) => b.id === item.id) + 1}
                  </Badge>
                  <RiskBadge level={item.risk} />
                </div>
                <CardTitle className="text-lg font-bold mt-2">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">{item.summary}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="flex items-baseline justify-between border-t border-b border-border/60 py-2">
                  <span className="text-xs text-muted-foreground">Score</span>
                  <span className="text-lg font-extrabold text-primary">{item.score}/100</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground block">Demand</span>
                    <span className="font-semibold text-foreground">{item.demand}/100</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Est. Revenue</span>
                    <span className="font-semibold text-foreground">{item.revenue}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Investment</span>
                    <span className="font-semibold text-foreground">{item.investment}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Growth</span>
                    <span className="font-semibold text-success">+{item.growth}%</span>
                  </div>
                </div>

                <Button variant="secondary" size="sm" className="w-full text-xs" asChild>
                  <Link to="/business-analysis">
                    Analyze Model <ArrowRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
