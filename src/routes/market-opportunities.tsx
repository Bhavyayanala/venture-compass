import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp,
  Search,
  Zap,
  DollarSign,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader, RiskBadge, SectionCard, StatCard } from "@/components/bi/primitives";
import { DEFAULT_LOCATION, marketOpportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/market-opportunities")({
  head: () => ({
    meta: [
      { title: "Market Opportunities — BizIntel AI" },
      {
        name: "description",
        content:
          "Emerging business gaps and high-growth opportunities detected in your micro-market.",
      },
    ],
  }),
  component: MarketOpportunitiesPage,
});

export function MarketOpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(marketOpportunities.map((o) => o.category)))];

  const filtered = marketOpportunities.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Market Opportunities"
        subtitle={`High-growth gaps detected in ${DEFAULT_LOCATION}`}
        actions={
          <Button asChild>
            <Link to="/ai-advisor">
              <Sparkles className="size-4" /> Ask AI Advisor for Niche Options
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Detected Opportunities"
          value={String(marketOpportunities.length)}
          icon={TrendingUp}
          hint="High confidence index"
        />
        <StatCard label="Highest Score" value="91/100" icon={Zap} hint="Healthy Meal Service" />
        <StatCard label="Fastest Growth" value="+38% YoY" icon={Sparkles} hint="EV Charging Hub" />
        <StatCard
          label="Avg Revenue Potential"
          value="₹3-5 Lakhs"
          icon={DollarSign}
          hint="Monthly steady state"
        />
      </div>

      {/* Filter and Search Bar */}
      <SectionCard title="Filter & Search Opportunities">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search opportunity name or keyword..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Opportunity Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col justify-between border-border/80 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant="outline" className="text-[11px] mb-2">
                    {item.category}
                  </Badge>
                  <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                </div>
                <Badge className="bg-primary/15 text-primary text-sm font-bold shrink-0">
                  {item.score}/100
                </Badge>
              </div>
              <CardDescription className="text-xs leading-relaxed mt-2">
                {item.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-2 gap-3 text-xs rounded-lg border border-border bg-muted/30 p-3">
                <div>
                  <span className="text-muted-foreground block">Growth YoY</span>
                  <span className="font-bold text-success">{item.growth}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Est. Revenue</span>
                  <span className="font-bold text-foreground">{item.revenue}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Investment</span>
                  <span className="font-semibold text-foreground">{item.investment}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Risk Level</span>
                  <RiskBadge level={item.risk} />
                </div>
              </div>

              <Button variant="secondary" size="sm" className="w-full text-xs" asChild>
                <Link to="/business-analysis">
                  Explore Feasibility <ChevronRight className="size-3.5 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
