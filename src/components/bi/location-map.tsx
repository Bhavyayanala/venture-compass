import { lazy, Suspense, useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

const MapCanvas = lazy(() => import("./map-canvas"));

export function LocationMap({ height = 440 }: { height?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Skeleton className="w-full rounded-xl" style={{ height }} />;
  }

  return (
    <Suspense fallback={<Skeleton className="w-full rounded-xl" style={{ height }} />}>
      <MapCanvas height={height} />
    </Suspense>
  );
}
