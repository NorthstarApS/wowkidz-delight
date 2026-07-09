import type { WooProduct } from "@/lib/types";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

interface ProductGridProps {
  products: WooProduct[] | undefined;
  isLoading: boolean;
  skeletonCount?: number;
  emptyText?: string;
  columns?: "3" | "4";
}

export function ProductGrid({
  products,
  isLoading,
  skeletonCount = 8,
  emptyText = "Ingen produkter fundet. Prøv en anden søgning eller kategori.",
  columns = "4",
}: ProductGridProps) {
  const gridCls =
    columns === "3"
      ? "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
      : "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4";

  if (isLoading) {
    return (
      <div className={gridCls} aria-busy="true" aria-label="Indlæser produkter">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="card-sharp flex flex-col items-center gap-3 p-10 text-center">
        <p className="font-display text-lg font-bold">Hov — her var tomt</p>
        <p className="max-w-sm text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className={gridCls}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
