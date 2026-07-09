import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import type { WooProduct } from "@/lib/types";
import { priceParts, stripHtml } from "@/lib/format";
import { useCart } from "@/context/CartContext";

const BADGE_RULES: { test: RegExp; label: string; cls: string }[] = [
  { test: /skole|madkasse|penalhus/i, label: "Skolestart", cls: "bg-sky text-sky-foreground" },
  { test: /baby|småbørn|motorik/i, label: "Baby", cls: "bg-sky text-sky-foreground" },
  { test: /kreativ|mal|tegn|perle/i, label: "Kreativ leg", cls: "bg-sun text-sun-foreground" },
  { test: /lær|puslespil|bog/i, label: "Læring", cls: "bg-leaf text-leaf-foreground" },
  { test: /gave/i, label: "Gaveidé", cls: "bg-coral text-coral-foreground" },
];

function deriveBadge(product: WooProduct): { label: string; cls: string } | null {
  if (product.on_sale) return { label: "God pris", cls: "bg-leaf text-leaf-foreground" };
  const haystack = `${product.name} ${product.categories.map((c) => c.name).join(" ")}`;
  for (const rule of BADGE_RULES) {
    if (rule.test.test(haystack)) return { label: rule.label, cls: rule.cls };
  }
  return null;
}

export function ProductCard({ product }: { product: WooProduct }) {
  const { addProduct } = useCart();
  const { price, regular, isOnSale } = priceParts(product.prices);
  const badge = deriveBadge(product);
  const image = product.images[0];
  const category = product.categories[0];
  const valueLine = stripHtml(product.short_description).split(".")[0];

  return (
    <article className="card-sharp group flex h-full flex-col">
      <Link
        to="/produkt/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-secondary"
        aria-label={product.name}
      >
        {image ? (
          <img
            src={image.src}
            alt={image.alt || product.name}
            loading="lazy"
            width={400}
            height={400}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            WowKidz
          </div>
        )}
        {badge && (
          <span className={`absolute left-0 top-3 px-2.5 py-1 text-xs font-bold ${badge.cls}`}>
            {badge.label}
          </span>
        )}
        {!product.is_in_stock && (
          <span className="absolute right-0 top-3 bg-ink px-2.5 py-1 text-xs font-bold text-paper">
            Udsolgt
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
        {category && <p className="eyebrow-wk">{category.name}</p>}
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">
          <Link to="/produkt/$slug" params={{ slug: product.slug }} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        {valueLine && (
          <p className="line-clamp-1 text-xs text-muted-foreground">{valueLine}.</p>
        )}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className={`font-display text-base font-extrabold ${isOnSale ? "text-coral" : ""}`}>
            {price}
          </span>
          {isOnSale && (
            <span className="text-xs text-muted-foreground line-through">{regular}</span>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => addProduct(product)}
            disabled={!product.is_in_stock}
            className="btn-base btn-coral min-h-11 flex-1 text-xs"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden />
            Læg i kurv
          </button>
          <Link
            to="/produkt/$slug"
            params={{ slug: product.slug }}
            className="btn-base btn-outline-ink min-h-11 px-3 text-xs"
          >
            Se
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card-sharp flex flex-col">
      <div className="skeleton-wk aspect-square" />
      <div className="flex flex-col gap-2 p-4">
        <div className="skeleton-wk h-3 w-1/3" />
        <div className="skeleton-wk h-4 w-5/6" />
        <div className="skeleton-wk h-4 w-1/2" />
        <div className="skeleton-wk h-11 w-full" />
      </div>
    </div>
  );
}
