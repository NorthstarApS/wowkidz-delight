/**
 * WooCommerce Store API service (server functions — avoids CORS, keeps
 * the frontend integration-ready against https://wowkidz.dk).
 */
import { createServerFn } from "@tanstack/react-start";
import type { ProductsResult, WooCategory, WooProduct } from "@/lib/types";

export const fetchProducts = createServerFn({ method: "GET" })
  .inputValidator(
    (data: {
      page?: number;
      per_page?: number;
      search?: string;
      category?: string;
      orderby?: string;
      order?: string;
      on_sale?: boolean;
      min_price?: number;
      max_price?: number;
      stock_status?: string;
    }) => data ?? {},
  )
  .handler(async ({ data }): Promise<ProductsResult> => {
    const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
    const params = new URLSearchParams();
    params.set("per_page", String(data.per_page ?? 12));
    params.set("page", String(data.page ?? 1));
    if (data.search) params.set("search", data.search);
    if (data.category) params.set("category", data.category);
    if (data.orderby) params.set("orderby", data.orderby);
    if (data.order) params.set("order", data.order);
    if (data.on_sale) params.set("on_sale", "true");
    if (data.min_price != null) params.set("min_price", String(data.min_price * 100));
    if (data.max_price != null) params.set("max_price", String(data.max_price * 100));
    if (data.stock_status) params.set("stock_status", data.stock_status);

    const res = await fetch(`${base}/wp-json/wc/store/v1/products?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`WooCommerce products request failed [${res.status}]`);
    const products = (await res.json()) as WooProduct[];
    return {
      products,
      total: Number(res.headers.get("X-WP-Total") ?? products.length),
      totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 1),
    };
  });

export const fetchProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<WooProduct | null> => {
    const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
    const res = await fetch(
      `${base}/wp-json/wc/store/v1/products?slug=${encodeURIComponent(data.slug)}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) throw new Error(`WooCommerce product request failed [${res.status}]`);
    const products = (await res.json()) as WooProduct[];
    return products[0] ?? null;
  });

export const fetchCategories = createServerFn({ method: "GET" })
  .inputValidator((data: { per_page?: number } | undefined) => data ?? {})
  .handler(async ({ data }): Promise<WooCategory[]> => {
    const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
    const res = await fetch(
      `${base}/wp-json/wc/store/v1/products/categories?per_page=${data.per_page ?? 100}&hide_empty=true`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) throw new Error(`WooCommerce categories request failed [${res.status}]`);
    return (await res.json()) as WooCategory[];
  });

export const fetchCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<WooCategory | null> => {
    const base = process.env.VITE_WP_API_BASE || "https://wowkidz.dk";
    const res = await fetch(
      `${base}/wp-json/wc/store/v1/products/categories?per_page=100&hide_empty=true`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) throw new Error(`WooCommerce categories request failed [${res.status}]`);
    const cats = (await res.json()) as WooCategory[];
    return cats.find((c) => c.slug === data.slug) ?? null;
  });
