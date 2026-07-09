import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, X } from "lucide-react";
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
    .slice(0, 8);
}

export function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: categories } = useCategories();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        aria-label="Luk menu"
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-card">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <p className="font-display text-lg font-extrabold">
            Wow<span className="text-coral">Kidz</span>.dk
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center hover:bg-secondary"
            aria-label="Luk menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto" aria-label="Mobilmenu">
          {NAV_ITEMS.map((item) => {
            const children = categories ? matchCategories(categories, item.keywords) : [];
            const isOpen = expanded === item.label;
            return (
              <div key={item.label} className="border-b">
                <div className="flex items-stretch">
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={`flex min-h-14 flex-1 items-center px-4 font-display text-base font-bold ${
                      item.label === "Tilbud" ? "text-coral" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                  {children.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex w-14 items-center justify-center border-l"
                      aria-expanded={isOpen}
                      aria-label={`Vis underkategorier for ${item.label}`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  )}
                </div>
                {isOpen && (
                  <ul className="bg-background pb-2">
                    {children.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to="/kategori/$slug"
                          params={{ slug: cat.slug }}
                          onClick={onClose}
                          className="flex min-h-12 items-center justify-between pl-8 pr-4 text-sm"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-muted-foreground">({cat.count})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <Link to="/kontakt" onClick={onClose} className="text-sm font-semibold underline">
            Kundeservice & kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
