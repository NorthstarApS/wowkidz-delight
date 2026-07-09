import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { POPULAR_SEARCHES } from "@/services/searchApi";
import { priceParts } from "@/lib/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { data: suggestions, isFetching, enabled } = useSearch(query);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  const submit = (q: string) => {
    if (!q.trim()) return;
    onClose();
    navigate({ to: "/soeg", search: { q: q.trim() } });
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Søg">
      <button type="button" aria-label="Luk søgning" className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 border-b-2 border-ink bg-card">
        <div className="container-wk py-4 md:py-6">
          <form
            className="flex items-center gap-2 border-2 border-ink bg-background px-3"
            onSubmit={(e) => {
              e.preventDefault();
              submit(query);
            }}
          >
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Søg efter legetøj, babyudstyr, skolestart eller gave…"
              className="min-h-13 flex-1 bg-transparent text-base outline-none"
              aria-label="Søgefelt"
            />
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center hover:bg-secondary"
              aria-label="Luk"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </form>

          <div className="mt-4">
            {!enabled && (
              <div>
                <p className="eyebrow-wk mb-2">Populære søgninger</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((s) => (
                    <button key={s} type="button" className="chip-wk" onClick={() => submit(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {enabled && isFetching && (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="skeleton-wk h-12 w-12" />
                    <div className="flex-1 space-y-1.5">
                      <div className="skeleton-wk h-3.5 w-2/3" />
                      <div className="skeleton-wk h-3 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {enabled && !isFetching && suggestions && suggestions.length > 0 && (
              <ul className="divide-y border">
                {suggestions.map((p) => {
                  const { price } = priceParts(p.prices);
                  return (
                    <li key={p.id}>
                      <Link
                        to="/produkt/$slug"
                        params={{ slug: p.slug }}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 hover:bg-secondary"
                      >
                        {p.images[0] && (
                          <img
                            src={p.images[0].thumbnail || p.images[0].src}
                            alt=""
                            loading="lazy"
                            width={48}
                            height={48}
                            className="h-12 w-12 border object-contain"
                          />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{p.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {p.categories[0]?.name}
                            {!p.is_in_stock && " · Udsolgt"}
                          </span>
                        </span>
                        <span className="font-display text-sm font-extrabold">{price}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    type="button"
                    onClick={() => submit(query)}
                    className="flex w-full items-center justify-center gap-2 p-3 text-sm font-bold hover:bg-secondary"
                  >
                    Se alle resultater for “{query}”
                  </button>
                </li>
              </ul>
            )}

            {enabled && !isFetching && suggestions && suggestions.length === 0 && (
              <p className="p-3 text-sm text-muted-foreground">
                Ingen resultater for “{query}” — prøv fx “legetøj” eller “skolestart”.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
