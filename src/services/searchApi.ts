/** Live search suggestions backed by the WooCommerce Store API. */
import { createServerFn } from "@tanstack/react-start";
import type { WooProduct } from "@/lib/types";

export const fetchSearchSuggestions = createServerFn({ method: "GET" })
  .inputValidator((data: { query: string; limit?: number }) => data)
  .handler(async ({ data }): Promise<WooProduct[]> => {
    const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
    if (!data.query || data.query.trim().length < 2) return [];
    const res = await fetch(
      `${base}/wp-json/wc/store/v1/products?search=${encodeURIComponent(data.query)}&per_page=${data.limit ?? 6}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return [];
    return (await res.json()) as WooProduct[];
  });

export const POPULAR_SEARCHES = [
  "skolestart",
  "gaveidéer",
  "legetøj",
  "babyudstyr",
  "kreativ leg",
  "læring",
  "madkasse",
  "børnetøj",
];
