import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "./ProductGrid";
import { Breadcrumbs } from "./CategoryHero";
import type { ProductQueryParams } from "@/lib/types";
import { NAV_ITEMS } from "@/lib/navigation";

interface LandingPageTemplateProps {
  eyebrow: string;
  title: string;
  lead: string;
  guide: ReactNode;
  checklist: string[];
  checklistTitle?: string;
  productParams: ProductQueryParams;
  relatedLabels?: string[];
  ctaLabel?: string;
  ctaTo?: string;
}

export function LandingPageTemplate({
  eyebrow,
  title,
  lead,
  guide,
  checklist,
  checklistTitle = "Tjekliste",
  productParams,
  relatedLabels = [],
  ctaLabel = "Se hele udvalget",
  ctaTo = "/shop",
}: LandingPageTemplateProps) {
  const { data, isLoading } = useProducts({ per_page: 8, ...productParams });
  const related = NAV_ITEMS.filter((n) => relatedLabels.includes(n.label));

  return (
    <div>
      <header className="border-b bg-card">
        <div className="container-wk space-y-3 py-8 md:py-12">
          <Breadcrumbs items={[{ label: title }]} />
          <p className="eyebrow-wk">{eyebrow}</p>
          <h1 className="max-w-2xl text-2xl md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{lead}</p>
        </div>
      </header>

      <div className="container-wk grid gap-8 py-8 md:grid-cols-3 md:py-12">
        <div className="prose-wk md:col-span-2">{guide}</div>
        <aside className="card-sharp h-fit border-2 border-ink p-4 md:p-5">
          <h2 className="mb-3 text-base">{checklistTitle}</h2>
          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section aria-label="Udvalgte produkter" className="container-wk pb-8 md:pb-12">
        <h2 className="mb-4 text-xl md:text-2xl">Udvalgte produkter</h2>
        <ProductGrid products={data?.products} isLoading={isLoading} skeletonCount={8} />
        <div className="mt-6 flex justify-center">
          <Link to={ctaTo} className="btn-base btn-coral">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-label="Relaterede kategorier" className="border-t bg-card">
          <div className="container-wk py-8">
            <p className="eyebrow-wk mb-3">Udforsk også</p>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link key={r.label} to={r.to} className="chip-wk min-h-11 text-sm">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
