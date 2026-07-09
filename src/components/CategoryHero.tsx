import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brødkrumme" className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
      <Link to="/" className="hover:underline">
        Forside
      </Link>
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" aria-hidden />
          {c.to ? (
            <Link to={c.to} className="hover:underline">
              {c.label}
            </Link>
          ) : (
            <span className="font-semibold text-foreground">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

interface CategoryHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  /** Rich HTML intro zone (e.g. WooCommerce category description) */
  html?: string;
}

export function CategoryHero({ eyebrow, title, intro, crumbs, html }: CategoryHeroProps) {
  return (
    <header className="border-b bg-card">
      <div className="container-wk space-y-3 py-6 md:py-10">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow-wk">{eyebrow}</p>}
        <h1 className="text-2xl md:text-4xl">{title}</h1>
        {intro && <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{intro}</p>}
        {html && (
          <div
            className="prose-wk max-w-2xl text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </header>
  );
}
