import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useCategories, useCategory } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryHero } from "@/components/CategoryHero";
import { FiltersDrawer, priceRangeFromLabel, type FilterState } from "@/components/FiltersDrawer";
import { stripHtml } from "@/lib/format";

const SORT_OPTIONS = [
  { value: "popularity", label: "Populært" },
  { value: "date", label: "Nyeste" },
  { value: "price_asc", label: "Pris lav til høj" },
  { value: "price_desc", label: "Pris høj til lav" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const Route = createFileRoute("/kategori/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Kategori | WowKidz.dk` },
      {
        name: "description",
        content: "Udforsk kategorien hos WowKidz.dk — legetøj, læring og familiefund til fair priser.",
      },
      { property: "og:url", content: `/kategori/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/kategori/${params.slug}` }],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { data: category, isLoading: catLoading } = useCategory(slug);
  const { data: allCategories } = useCategories();
  const [sort, setSort] = useState<SortValue>("popularity");
  const [filters, setFilters] = useState<FilterState>({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const priceRange = priceRangeFromLabel(filters.price);

  const { data, isLoading } = useProducts(
    {
      category: category ? String(category.id) : undefined,
      per_page: 24,
      page,
      on_sale: filters.onSale || undefined,
      min_price: priceRange.min,
      max_price: priceRange.max,
      stock_status: filters.inStock ? "instock" : undefined,
      orderby: sort.startsWith("price") ? "price" : sort === "date" ? "date" : "popularity",
      order: sort === "price_asc" ? "asc" : "desc",
    },
    Boolean(category),
  );

  const related = useMemo(() => {
    if (!allCategories || !category) return [];
    const word = category.name.split(" ")[0].toLowerCase();
    return allCategories
      .filter((c) => c.id !== category.id && c.name.toLowerCase().includes(word))
      .slice(0, 6);
  }, [allCategories, category]);

  if (!catLoading && !category) {
    return (
      <div className="container-wk py-20 text-center">
        <h1 className="text-2xl">Kategorien blev ikke fundet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Den er måske flyttet — se hele udvalget i stedet.
        </p>
        <Link to="/shop" className="btn-base btn-coral mt-6">
          Shop alle produkter
        </Link>
      </div>
    );
  }

  const description = category ? stripHtml(category.description) : "";

  return (
    <div>
      {catLoading || !category ? (
        <div className="border-b bg-card">
          <div className="container-wk space-y-3 py-8">
            <div className="skeleton-wk h-3 w-40" />
            <div className="skeleton-wk h-9 w-72" />
            <div className="skeleton-wk h-4 w-96 max-w-full" />
          </div>
        </div>
      ) : (
        <CategoryHero
          eyebrow={`${category.count} produkter`}
          title={category.name}
          intro={description || undefined}
          crumbs={[{ label: "Shop", to: "/shop" }, { label: category.name }]}
        />
      )}

      <div className="container-wk py-6 md:py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="btn-base btn-outline-ink min-h-11 text-xs"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filtrér
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Sortér:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
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

        <ProductGrid
          products={data?.products}
          isLoading={isLoading || catLoading}
          skeletonCount={12}
          emptyText="Ingen produkter i denne kategori lige nu — kig forbi igen snart."
        />

        {data && data.totalPages > 1 && (
          <nav aria-label="Sider" className="mt-8 flex justify-center gap-2">
            {Array.from({ length: Math.min(data.totalPages, 8) }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i + 1)}
                className={`flex h-11 w-11 items-center justify-center border font-bold ${
                  page === i + 1 ? "bg-ink text-paper" : "hover:border-ink"
                }`}
                aria-current={page === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
      </div>

      {related.length > 0 && (
        <section aria-label="Relaterede kategorier" className="border-t bg-card">
          <div className="container-wk py-8">
            <p className="eyebrow-wk mb-3">Relaterede kategorier</p>
            <div className="flex flex-wrap gap-2">
              {related.map((c) => (
                <Link
                  key={c.id}
                  to="/kategori/$slug"
                  params={{ slug: c.slug }}
                  className="chip-wk min-h-11 text-sm"
                >
                  {c.name} ({c.count})
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {category && description && (
        <section aria-label="Om kategorien" className="container-wk py-8">
          <div className="prose-wk max-w-3xl text-sm text-muted-foreground">
            <h2 className="text-lg">Om {category.name.toLowerCase()}</h2>
            <p>{description}</p>
          </div>
        </section>
      )}

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
