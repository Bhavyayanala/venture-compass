import type { ReactNode } from "react";
import { AlertTriangle, Inbox, Loader2, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("surface-panel gap-4 overflow-hidden", className)}>
      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {Icon ? (
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-4.5" />
            </span>
          ) : null}
          <div className="min-w-0">
            <CardTitle className="text-base font-semibold sm:text-lg">{title}</CardTitle>
            {description ? (
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
  hint?: string;
}) {
  return (
    <Card className="surface-panel gap-0 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {Icon ? <Icon className="size-4 shrink-0 text-primary" /> : null}
      </div>
      <div className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{value}</div>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {delta ? <span className="font-medium text-success">{delta}</span> : null}
        {hint ? <span className="truncate">{hint}</span> : null}
      </div>
    </Card>
  );
}

export function ScoreBar({
  label,
  value,
  detail,
  tone = "primary",
}: {
  label: string;
  value: number;
  detail?: string;
  tone?: "primary" | "success" | "warning" | "destructive";
}) {
  const toneClass = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  }[tone];

  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="truncate text-sm font-medium">{label}</span>
        <span className="shrink-0 text-sm font-semibold tabular-nums">{value}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-700", toneClass)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {detail ? <p className="mt-1.5 text-xs text-muted-foreground">{detail}</p> : null}
    </div>
  );
}

export function ScoreRing({
  value,
  size = 140,
  label,
}: {
  value: number;
  size?: number;
  label?: string;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, value) / 100) * c;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="fill-none stroke-primary transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-3xl font-bold tabular-nums">{value}</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {label ?? "/ 100"}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RiskBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Low: "border-success/40 bg-success/15 text-success",
    Medium: "border-warning/40 bg-warning/15 text-warning",
    High: "border-destructive/40 bg-destructive/15 text-destructive",
  };
  return (
    <Badge variant="outline" className={cn("font-semibold", map[level] ?? map["Medium"])}>
      {level} Risk
    </Badge>
  );
}

export function LoadingState({
  rows = 3,
  label = "Running analysis…",
}: {
  rows?: number;
  label?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin text-primary" />
        {label}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = Inbox,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div className="min-w-0">
          <p className="text-sm font-semibold">Something went wrong</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="shrink-0">
          Retry
        </Button>
      ) : null}
    </div>
  );
}
