import { createFileRoute } from "@tanstack/react-router";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryHero } from "@/components/CategoryHero";
import { POPULAR_SEARCHES } from "@/services/searchApi";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/soeg")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Søg | WowKidz.dk" },
      { name: "description", content: "Søg blandt legetøj, babyudstyr, læring og skolestart hos WowKidz.dk." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const { data, isLoading } = useProducts({ search: q, per_page: 24 }, Boolean(q));

  return (
    <div>
      <CategoryHero
        eyebrow="Søgning"
        title={q ? `Resultater for “${q}”` : "Hvad leder du efter?"}
        intro={
          data
            ? `${data.total} ${data.total === 1 ? "produkt" : "produkter"} fundet`
            : "Søg efter legetøj, babyudstyr, skolestart eller gaver."
        }
        crumbs={[{ label: "Søg" }]}
      />
      <div className="container-wk py-6 md:py-8">
        {q ? (
          <ProductGrid
            products={data?.products}
            isLoading={isLoading}
            skeletonCount={8}
            emptyText={`Ingen resultater for “${q}”. Prøv fx “legetøj”, “skolestart” eller “baby”.`}
          />
        ) : (
          <div>
            <p className="eyebrow-wk mb-3">Populære søgninger</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <Link key={s} to="/soeg" search={{ q: s }} className="chip-wk min-h-11 text-sm">
                  {s}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
