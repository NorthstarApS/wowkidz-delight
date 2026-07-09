import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryHero } from "@/components/CategoryHero";
import { FiltersDrawer, priceRangeFromLabel, type FilterState } from "@/components/FiltersDrawer";
import type { WooProduct } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "popularity", label: "Populært" },
  { value: "date", label: "Nyeste" },
  { value: "price_asc", label: "Pris lav til høj" },
  { value: "price_desc", label: "Pris høj til lav" },
  { value: "savings", label: "Største besparelse" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    on_sale: search.on_sale ? 1 : undefined,
    sort: (search.sort as SortValue) || undefined,
    page: Number(search.page) || 1,
  }),
  head: () => ({
    meta: [
      { title: "Shop alle produkter | WowKidz.dk" },
      {
        name: "description",
        content:
          "Se hele udvalget af legetøj, babyudstyr, læring, skolestart og praktiske familiefund hos WowKidz.dk. Fair priser og nem retur.",
      },
      { property: "og:title", content: "Shop alle produkter | WowKidz.dk" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function sortBySavings(products: WooProduct[]): WooProduct[] {
  return [...products].sort((a, b) => {
    const savA = Number(a.prices.regular_price) - Number(a.prices.price);
    const savB = Number(b.prices.regular_price) - Number(b.prices.price);
    return savB - savA;
  });
}

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [filters, setFilters] = useState<FilterState>({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sort: SortValue = search.sort ?? "popularity";
  const priceRange = priceRangeFromLabel(filters.price);

  const apiParams = useMemo(
    () => ({
      page: search.page,
      per_page: 24,
      on_sale: Boolean(search.on_sale) || Boolean(filters.onSale) || undefined,
      min_price: priceRange.min,
      max_price: priceRange.max,
      stock_status: filters.inStock ? ("instock" as const) : undefined,
      search: filters.situation === "Skolestart" ? "skole" : filters.situation === "Kreativ leg" ? "kreativ" : undefined,
      orderby:
        sort === "price_asc" || sort === "price_desc"
          ? ("price" as const)
          : sort === "date"
            ? ("date" as const)
            : ("popularity" as const),
      order: sort === "price_asc" ? ("asc" as const) : ("desc" as const),
    }),
    [search.page, search.on_sale, filters, priceRange.min, priceRange.max, sort],
  );

  const { data, isLoading } = useProducts(apiParams);
  const products = useMemo(() => {
    if (!data) return undefined;
    return sort === "savings" ? sortBySavings(data.products) : data.products;
  }, [data, sort]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div>
      <CategoryHero
        eyebrow={search.on_sale ? "Tilbud" : "Hele udvalget"}
        title={search.on_sale ? "Tilbud — gode fund til fair priser" : "Shop alle produkter"}
        intro="Legetøj, babyudstyr, læring, skolestart og praktiske familiefund — nemt at finde og trygt at købe."
        crumbs={[{ label: "Shop" }]}
      />

      <div className="container-wk py-6 md:py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="btn-base btn-outline-ink min-h-11 text-xs"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filtrér{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>

          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Sortér:</span>
            <select
              value={sort}
              onChange={(e) =>
                navigate({
                  to: "/shop",
                  search: { ...search, sort: e.target.value as SortValue, page: 1 },
                })
              }
              className="min-h-11 border bg-card px-2 text-sm outline-none focus:border-ink"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ProductGrid products={products} isLoading={isLoading} skeletonCount={12} />

        {data && data.totalPages > 1 && (
          <nav aria-label="Sider" className="mt-8 flex justify-center gap-2">
            {Array.from({ length: Math.min(data.totalPages, 8) }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => navigate({ to: "/shop", search: { ...search, page: i + 1 } })}
                className={`flex h-11 w-11 items-center justify-center border font-bold ${
                  search.page === i + 1 ? "bg-ink text-paper" : "hover:border-ink"
                }`}
                aria-current={search.page === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
      </div>

      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters({})}
      />
    </div>
  );
}
