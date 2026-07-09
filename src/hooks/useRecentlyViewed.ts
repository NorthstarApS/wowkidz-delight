import { useCallback, useEffect, useState } from "react";

const KEY = "wowkidz-recently-viewed";
const MAX = 8;

export interface RecentlyViewedItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: string;
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as RecentlyViewedItem[]);
    } catch {
      // ignore
    }
  }, []);

  const track = useCallback((item: RecentlyViewedItem) => {
    setItems((prev) => {
      const next = [item, ...prev.filter((i) => i.id !== item.id)].slice(0, MAX);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { items, track };
}
