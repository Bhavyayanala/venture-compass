import { useCallback, useEffect, useState } from "react";

export interface SavedAnalysis {
  id: string;
  name: string;
  location: string;
  budget: number;
  businessType: string;
  recommended: string;
  score: number;
  demandScore?: number;
  competitionScore?: number;
  revenue: string;
  risk: string;
  createdAt: string;
}

const KEY = "bi-saved-analyses";

function read(): SavedAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedAnalysis[]) : [];
  } catch {
    return [];
  }
}

function write(items: SavedAnalysis[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("saved-analyses-changed"));
}

export function saveAnalysis(item: Omit<SavedAnalysis, "id" | "createdAt">): SavedAnalysis {
  const entry: SavedAnalysis = {
    ...item,
    id: `an_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  write([entry, ...read()]);
  return entry;
}

export function useSavedAnalyses() {
  const [items, setItems] = useState<SavedAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => setItems(read()), []);

  useEffect(() => {
    refresh();
    setLoading(false);
    const handler = () => refresh();
    window.addEventListener("saved-analyses-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("saved-analyses-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  const remove = useCallback((id: string) => {
    write(read().filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  return { items, loading, remove, clear, refresh };
}
