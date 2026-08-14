import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Building2,
  FileText,
  GitCompareArrows,
  LayoutDashboard,
  Lightbulb,
  MapPin,
  Menu,
  Save,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/location-analysis", label: "Location Analysis", icon: MapPin },
  { to: "/business-analysis", label: "Business Analysis", icon: Building2 },
  { to: "/recommendations", label: "Recommendations", icon: Lightbulb },
  { to: "/comparisons", label: "Comparisons", icon: GitCompareArrows },
  { to: "/market-opportunities", label: "Market Opportunities", icon: TrendingUp },
  { to: "/ai-advisor", label: "AI Advisor", icon: Bot },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/saved-analyses", label: "Saved Analyses", icon: Save },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function Brand() {
  return (
    <Link to="/dashboard" className="flex min-w-0 items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
        <Sparkles className="size-4.5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold leading-tight">BizIntel AI</span>
        <span className="block truncate text-[11px] text-muted-foreground">Decision Platform</span>
      </span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0_var(--color-primary)]"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className={cn("size-4.5 shrink-0", active && "text-primary")} />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Brand />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <NavList />
        </div>
        <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4">
          <p className="text-xs font-semibold">ML Backend</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Mock mode active. Connect your FastAPI service in Settings.
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-warning">
            <span className="size-1.5 rounded-full bg-warning" /> Not connected
          </span>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-sidebar p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <div className="flex h-16 items-center border-b border-sidebar-border px-5">
                    <Brand />
                  </div>
                  <div className="py-4">
                    <NavList onNavigate={() => setOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
              <span className="lg:hidden">
                <Brand />
              </span>
            </div>

            <div className="relative hidden min-w-0 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search locations, businesses, reports…"
                className="w-full max-w-md pl-9"
                aria-label="Search"
              />
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
              </Button>
              <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
                <span className="grid size-7 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                  BY
                </span>
                <span className="hidden text-sm font-medium sm:block">Bhavya</span>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
