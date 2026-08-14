import { useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Badge } from "@/components/ui/badge";
import { GACHIBOWLI, mapCategoryColors, mapPoints, type MapCategory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categories = Object.keys(mapCategoryColors) as MapCategory[];

export default function MapCanvas({ height = 440 }: { height?: number }) {
  const [active, setActive] = useState<MapCategory[]>(categories);

  const visible = useMemo(() => mapPoints.filter((p) => active.includes(p.category)), [active]);

  const toggle = (c: MapCategory) =>
    setActive((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const on = active.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                on
                  ? "border-border bg-muted text-foreground"
                  : "border-border/60 text-muted-foreground",
              )}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: mapCategoryColors[c], opacity: on ? 1 : 0.35 }}
              />
              {c}
            </button>
          );
        })}
        <Badge variant="outline" className="ml-auto">
          {visible.length} points
        </Badge>
      </div>

      <div className="overflow-hidden rounded-xl border border-border" style={{ height }}>
        <MapContainer
          center={GACHIBOWLI}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {visible.map((p) => {
            const isSelected = p.category === "Selected Location";
            return (
              <CircleMarker
                key={p.id}
                center={p.position}
                radius={isSelected ? 12 : 8}
                pathOptions={{
                  color: mapCategoryColors[p.category],
                  fillColor: mapCategoryColors[p.category],
                  fillOpacity: isSelected ? 0.85 : 0.55,
                  weight: isSelected ? 3 : 2,
                }}
              >
                <Tooltip direction="top">{p.name}</Tooltip>
                <Popup>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs opacity-80">{p.category}</p>
                    <p className="text-xs">{p.note}</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
