/**
 * SEO service — integration-ready for Rank Math / WP SEO head data.
 * When the Rank Math REST endpoint is enabled on the WordPress site,
 * `fetchSeoHead` returns the raw head markup for a URL so meta can be
 * upgraded from the local defaults without breaking WordPress sitemaps
 * (sitemaps keep being served from wowkidz.dk/sitemap_index.xml).
 */
import { createServerFn } from "@tanstack/react-start";

export interface SeoHeadResult {
  success: boolean;
  head: string | null;
}

export const fetchSeoHead = createServerFn({ method: "GET" })
  .inputValidator((data: { url: string }) => data)
  .handler(async ({ data }): Promise<SeoHeadResult> => {
    const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
    try {
      const res = await fetch(
        `${base}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(data.url)}`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return { success: false, head: null };
      const json = (await res.json()) as { success?: boolean; head?: string };
      return { success: Boolean(json.success), head: json.head ?? null };
    } catch {
      return { success: false, head: null };
    }
  });

/** Build a Danish meta title with the shop suffix. */
export function metaTitle(title: string): string {
  return `${title} | WowKidz.dk`;
}
