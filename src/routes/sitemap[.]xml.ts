import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// TODO: replace with your project URL once a project name or custom domain is set.
// Note: the WordPress sitemap at wowkidz.dk/sitemap_index.xml remains untouched;
// this sitemap only covers the headless storefront routes.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/shop", changefreq: "daily", priority: "0.9" },
          { path: "/gaveideer-til-born", changefreq: "weekly", priority: "0.8" },
          { path: "/skolestart", changefreq: "weekly", priority: "0.8" },
          { path: "/legetoj-efter-alder", changefreq: "weekly", priority: "0.8" },
          { path: "/kreativ-leg", changefreq: "weekly", priority: "0.8" },
          { path: "/leg-og-laering", changefreq: "weekly", priority: "0.8" },
          { path: "/babyudstyr", changefreq: "weekly", priority: "0.8" },
          { path: "/praktisk-familieliv", changefreq: "weekly", priority: "0.8" },
          { path: "/boernetoej", changefreq: "weekly", priority: "0.8" },
          { path: "/om-os", changefreq: "monthly", priority: "0.4" },
          { path: "/levering-returnering", changefreq: "monthly", priority: "0.4" },
          { path: "/handelsbetingelser", changefreq: "yearly", priority: "0.3" },
          { path: "/privatlivspolitik", changefreq: "yearly", priority: "0.3" },
          { path: "/cookiepolitik", changefreq: "yearly", priority: "0.3" },
          { path: "/kontakt", changefreq: "monthly", priority: "0.4" },
          { path: "/faq", changefreq: "monthly", priority: "0.5" },
        ];

        try {
          const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
          const res = await fetch(
            `${base}/wp-json/wc/store/v1/products/categories?per_page=100&hide_empty=true`,
            { headers: { Accept: "application/json" } },
          );
          if (res.ok) {
            const cats = (await res.json()) as { slug: string }[];
            for (const c of cats) {
              entries.push({ path: `/kategori/${c.slug}`, changefreq: "weekly", priority: "0.6" });
            }
          }
        } catch {
          // categories unavailable — ship static entries only
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
