import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, Navigation, Users } from "lucide-react";
import {
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";

import { LocationMap } from "@/components/bi/location-map";
import { PageHeader, ScoreBar, SectionCard, StatCard } from "@/components/bi/primitives";
import { DEFAULT_LOCATION, locationMetrics } from "@/lib/mock-data";

export const Route = createFileRoute("/location-analysis")({
  head: () => ({
    meta: [
      { title: "Location Analysis — BizIntel AI" },
      {
        name: "description",
        content:
          "Deep location scoring for Gachibowli, Hyderabad: population, business density, competition, demand, accessibility and growth potential.",
      },
      { property: "og:title", content: "Location Analysis — BizIntel AI" },
      {
        property: "og:description",
        content:
          "Population, density, competition, demand and accessibility scoring for your site.",
      },
    ],
  }),
  component: LocationAnalysisPage,
});

const chartAxis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  fontSize: 12,
};

function LocationAnalysisPage() {
  const radarData = locationMetrics.map((m) => ({ metric: m.label, value: m.value }));

  return (
    <div className="space-y-6">
      <PageHeader title="Location Analysis" subtitle={DEFAULT_LOCATION} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Catchment Population" value="4.2 L" icon={Users} hint="within 5 km" />
        <StatCard label="Registered Businesses" value="1,240" icon={Building2} hint="1,240 units" />
        <StatCard label="Direct Competitors" value="18" icon={MapPin} hint="3 km radius" />
        <StatCard label="Accessibility" value="82/100" icon={Navigation} hint="Metro 1.8 km" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <SectionCard title="Location Scorecard" description="Eight weighted signals" icon={MapPin}>
          <div className="grid gap-5 sm:grid-cols-2">
            {locationMetrics.map((m) => (
              <div key={m.label}>
                <ScoreBar
                  label={m.label}
                  value={m.value}
                  detail={m.detail}
                  tone={m.value >= 85 ? "success" : m.value >= 70 ? "primary" : "warning"}
                />
                <p className="mt-1 text-xs text-muted-foreground/80">{m.hint}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Signal Profile" description="Radar view of the same metrics">
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Radar
                  dataKey="value"
                  stroke="var(--color-chart-1)"
                  fill="var(--color-chart-1)"
                  fillOpacity={0.35}
                />
                <RTooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Interactive Location Map"
        description="Demand drivers and competitor density"
        icon={MapPin}
      >
        <LocationMap height={500} />
      </SectionCard>

      <SectionCard title="Metric Breakdown" description="Comparative scores">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={radarData} layout="vertical" margin={{ left: 40, right: 16 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                {...chartAxis}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="metric"
                width={130}
                {...chartAxis}
                tickLine={false}
                axisLine={false}
              />
              <RTooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="var(--color-chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
