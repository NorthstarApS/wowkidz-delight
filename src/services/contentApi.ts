/**
 * WordPress content API (wp/v2) — fetches pages/posts so content pages can
 * later be edited in WordPress and rendered in the React design.
 */
import { createServerFn } from "@tanstack/react-start";

export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
}

export const fetchWpPageBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<WpPage | null> => {
    const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
    try {
      const res = await fetch(
        `${base}/wp-json/wp/v2/pages?slug=${encodeURIComponent(data.slug)}&_fields=id,slug,title,content,excerpt`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return null;
      const pages = (await res.json()) as WpPage[];
      return pages[0] ?? null;
    } catch {
      return null;
    }
  });
