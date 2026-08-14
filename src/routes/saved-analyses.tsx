import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Save,
  Trash2,
  ExternalLink,
  Plus,
  Search,
  Calendar,
  Building2,
  Gauge,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState, PageHeader, RiskBadge, SectionCard } from "@/components/bi/primitives";
import { useSavedAnalyses } from "@/lib/saved-analyses";

export const Route = createFileRoute("/saved-analyses")({
  head: () => ({
    meta: [
      { title: "Saved Analyses — BizIntel AI" },
      {
        name: "description",
        content: "Access your saved business and location intelligence evaluations.",
      },
    ],
  }),
  component: SavedAnalysesPage,
});

export function SavedAnalysesPage() {
  const { items, loading, remove, clear } = useSavedAnalyses();
  const [search, setSearch] = useState("");

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.recommended.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string, name: string) => {
    remove(id);
    toast.success(`Deleted "${name}"`);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all saved analyses?")) {
      clear();
      toast.success("Cleared all saved analyses");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Analyses"
        subtitle="Manage and re-examine your saved business opportunity reports"
        actions={
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 className="size-4 text-destructive" /> Clear All
              </Button>
            )}
            <Button asChild>
              <Link to="/dashboard">
                <Plus className="size-4" /> New Analysis
              </Link>
            </Button>
          </div>
        }
      />

      {items.length > 0 && (
        <SectionCard title="Search Workspace">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by location, business name or recommendation..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </SectionCard>
      )}

      {loading ? (
        <SectionCard title="Loading saved items...">
          <p className="text-sm text-muted-foreground">Reading from local storage...</p>
        </SectionCard>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={items.length === 0 ? "No saved analyses yet" : "No matching analyses found"}
          description={
            items.length === 0
              ? "Run an opportunity analysis from the dashboard and click 'Save analysis' to store it here."
              : "Try adjusting your search terms."
          }
          icon={Save}
          action={
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between border-border/80 transition-all hover:border-primary/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-bold line-clamp-1">{item.name}</CardTitle>
                    <CardDescription className="text-xs mt-1 flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <RiskBadge level={item.risk} />
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2 rounded-lg border border-border/60 bg-muted/30 p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-semibold text-foreground truncate max-w-[140px]">
                      {item.location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Type:</span>
                    <span className="font-semibold text-foreground capitalize">
                      {item.businessType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recommendation:</span>
                    <span className="font-semibold text-primary">{item.recommended}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Opportunity Score:</span>
                    <span className="font-bold text-primary">{item.score}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Demand / Competition:</span>
                    <span className="font-semibold text-foreground">
                      {item.demandScore ?? 94} / {item.competitionScore ?? 65}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-semibold text-foreground">
                      ₹{(item.budget / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Revenue:</span>
                    <span className="font-semibold text-foreground">{item.revenue}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="secondary" size="sm" className="flex-1 text-xs" asChild>
                    <Link to="/dashboard">
                      <ExternalLink className="size-3.5 mr-1" /> View Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(item.id, item.name)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
