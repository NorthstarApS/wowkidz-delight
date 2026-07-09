import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";
import { useCategories } from "@/hooks/useCategories";
import type { WooCategory } from "@/lib/types";

function matchCategories(cats: WooCategory[], keywords: string[]): WooCategory[] {
  if (keywords.length === 0) return [];
  return cats
    .filter((c) => {
      const hay = `${c.slug} ${c.name}`.toLowerCase();
      return keywords.some((k) => hay.includes(k));
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function MegaMenu({ activeLabel, onClose }: { activeLabel: string; onClose: () => void }) {
  const { data: categories, isLoading } = useCategories();
  const item = NAV_ITEMS.find((n) => n.label === activeLabel);
  if (!item) return null;

  const matched = categories ? matchCategories(categories, item.keywords) : [];
  const columnA = matched.slice(0, 5);
  const columnB = matched.slice(5, 10);
  const withImages = matched.filter((c) => c.image).slice(0, 2);

  return (
    <div className="absolute inset-x-0 top-full border-b-2 border-ink bg-card shadow-[0_16px_32px_-16px_rgba(32,32,32,0.25)]">
      <div className="container-wk grid grid-cols-4 gap-8 py-8">
        <div className="col-span-1 border-r pr-6">
          <p className="eyebrow-wk mb-2">{item.label}</p>
          <p className="mb-4 font-display text-lg font-extrabold leading-snug">{item.tagline}</p>
          <Link to={item.to} onClick={onClose} className="btn-base btn-coral text-xs">
            Se alt i {item.label.toLowerCase()}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {isLoading ? (
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-wk h-5 w-4/5" />
            ))}
          </div>
        ) : (
          <div className="col-span-2 grid grid-cols-2 gap-x-8">
            {[columnA, columnB].map((col, ci) => (
              <ul key={ci} className="space-y-2.5">
                {col.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to="/kategori/$slug"
                      params={{ slug: cat.slug }}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-2 text-sm hover:underline"
                    >
                      <span className="font-semibold">{cat.name}</span>
                      <span className="text-xs text-muted-foreground">({cat.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
            {matched.length === 0 && (
              <p className="col-span-2 text-sm text-muted-foreground">
                Udforsk hele universet under “{item.label}”.
              </p>
            )}
          </div>
        )}

        <div className="col-span-1 grid gap-3">
          {withImages.map((cat) => (
            <Link
              key={cat.id}
              to="/kategori/$slug"
              params={{ slug: cat.slug }}
              onClick={onClose}
              className="group relative block aspect-[2/1] overflow-hidden border"
            >
              <img
                src={cat.image!.src}
                alt={cat.image!.alt || cat.name}
                loading="lazy"
                width={400}
                height={200}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-0 left-0 bg-ink px-2 py-1 text-xs font-bold text-paper">
                {cat.name}
              </span>
            </Link>
          ))}
          {withImages.length === 0 && (
            <div className={`flex aspect-[2/1] items-center justify-center border-2 border-ink p-4 text-center font-display text-sm font-extrabold ${
              item.accent === "sun"
                ? "bg-sun"
                : item.accent === "coral"
                  ? "bg-coral text-coral-foreground"
                  : item.accent === "sky"
                    ? "bg-sky text-sky-foreground"
                    : "bg-leaf"
            }`}>
              {item.tagline}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
