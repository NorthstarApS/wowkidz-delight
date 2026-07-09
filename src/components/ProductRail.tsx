import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "./ProductGrid";
import type { ProductQueryParams } from "@/lib/types";

interface ProductRailProps {
  title: string;
  params: ProductQueryParams;
  linkTo?: string;
  accent?: "sun" | "coral" | "sky" | "leaf";
}

export function ProductRail({ title, params, linkTo = "/shop", accent = "sun" }: ProductRailProps) {
  const { data, isLoading, isError } = useProducts({ per_page: 4, ...params });

  if (isError || (data && data.products.length === 0)) return null;

  const accentCls =
    accent === "coral"
      ? "bg-coral"
      : accent === "sky"
        ? "bg-sky"
        : accent === "leaf"
          ? "bg-leaf"
          : "bg-sun";

  return (
    <section aria-label={title} className="container-wk py-8 md:py-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <span className={`mb-2 block h-1.5 w-10 ${accentCls}`} aria-hidden />
          <h2 className="text-xl md:text-2xl">{title}</h2>
        </div>
        <Link to={linkTo} className="flex shrink-0 items-center gap-1 text-sm font-bold hover:underline">
          Se alle
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <ProductGrid products={data?.products} isLoading={isLoading} skeletonCount={4} />
    </section>
  );
}
