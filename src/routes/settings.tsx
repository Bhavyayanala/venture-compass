import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Settings,
  Server,
  Key,
  Globe,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { PageHeader, SectionCard } from "@/components/bi/primitives";
import { DEFAULT_BUDGET, DEFAULT_LOCATION } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — BizIntel AI" },
      {
        name: "description",
        content: "Configure ML service backend endpoints, location defaults, and API options.",
      },
    ],
  }),
  component: SettingsPage,
});

export function SettingsPage() {
  const [fastApiUrl, setFastApiUrl] = useState("http://localhost:8000/api/v1");
  const [apiKey, setApiKey] = useState("");
  const [useMock, setUseMock] = useState(true);
  const [defaultLoc, setDefaultLoc] = useState(DEFAULT_LOCATION);
  const [currency, setCurrency] = useState("INR");
  const [testing, setTesting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      if (useMock) {
        setConnected(true);
        toast.success("Connected successfully (Mock Mode active)");
      } else {
        setConnected(false);
        toast.error("Could not connect to FastAPI endpoint at " + fastApiUrl);
      }
    }, 1000);
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Platform Settings"
        subtitle="Manage ML service connectivity, location parameters, and environment configuration"
        actions={
          <Button onClick={handleSaveSettings}>
            <Save className="size-4" /> Save Preferences
          </Button>
        }
      />

      {/* ML Backend Configuration */}
      <SectionCard
        title="ML Backend Service Connection"
        description="Connect your python FastAPI predictive model service or toggle mock mode"
        icon={Server}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30">
            <div>
              <p className="font-semibold text-sm">Use Mock ML Backend</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Simulate model inference with pre-computed location metrics and predictions
              </p>
            </div>
            <Switch checked={useMock} onCheckedChange={setUseMock} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="api-url">FastAPI Service Endpoint URL</Label>
              <div className="relative">
                <Server className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="api-url"
                  className="pl-9"
                  disabled={useMock}
                  value={fastApiUrl}
                  onChange={(e) => setFastApiUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">Service API Key</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="api-key"
                  type="password"
                  className="pl-9"
                  placeholder="Bearer token or API key..."
                  disabled={useMock}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status:</span>
              {useMock ? (
                <Badge variant="outline" className="text-warning border-warning/40 bg-warning/10">
                  Mock Engine Active
                </Badge>
              ) : connected ? (
                <Badge className="bg-success/15 text-success">
                  <CheckCircle2 className="size-3 mr-1 inline" /> Connected
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-destructive border-destructive/40 bg-destructive/10"
                >
                  <AlertCircle className="size-3 mr-1 inline" /> Disconnected
                </Badge>
              )}
            </div>

            <Button variant="outline" size="sm" onClick={handleTestConnection} disabled={testing}>
              <RefreshCw className={`size-4 ${testing ? "animate-spin" : ""}`} />
              {testing ? "Testing..." : "Test Endpoint"}
            </Button>
          </div>
        </div>
      </SectionCard>

      {/* General Preferences */}
      <SectionCard
        title="Location & Financial Defaults"
        description="Configure default fallback values"
        icon={Globe}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="default-location">Default Location Catchment</Label>
            <Input
              id="default-location"
              value={defaultLoc}
              onChange={(e) => setDefaultLoc(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Display Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR (₹ - Indian Rupee)</SelectItem>
                <SelectItem value="USD">USD ($ - US Dollar)</SelectItem>
                <SelectItem value="EUR">EUR (€ - Euro)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
