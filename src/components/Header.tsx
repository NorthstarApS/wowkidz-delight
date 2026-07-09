import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";
import { useCart } from "@/context/CartContext";
import { MegaMenu } from "./MegaMenu";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const { itemCount, openMiniCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <>
      <div className="bg-ink py-1.5 text-center text-xs font-semibold text-paper">
        Dansk webshop · Fair priser · Levering typisk 3–6 dage · Nem retur
      </div>

      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="container-wk flex h-16 items-center gap-3 md:gap-6">
          <button
            type="button"
            className="btn-base btn-outline-ink min-h-11 border px-2.5 lg:hidden"
            aria-label="Åbn menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>

          <Link to="/" className="font-display text-xl font-extrabold tracking-tight md:text-2xl">
            Wow<span className="text-coral">Kidz</span>
            <span className="text-sky">.dk</span>
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden min-h-11 flex-1 items-center gap-2 border bg-background px-4 text-left text-sm text-muted-foreground transition-colors hover:border-ink md:flex md:max-w-md"
          >
            <Search className="h-4 w-4" aria-hidden />
            Søg efter legetøj, babyudstyr, skolestart eller gave…
          </button>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-11 w-11 items-center justify-center hover:bg-secondary md:hidden"
              aria-label="Søg"
            >
              <Search className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center hover:bg-secondary sm:flex"
              aria-label="Min konto (kommer snart)"
              title="Min konto — kommer snart"
            >
              <User className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center hover:bg-secondary sm:flex"
              aria-label="Ønskeliste (kommer snart)"
              title="Ønskeliste — kommer snart"
            >
              <Heart className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={openMiniCart}
              className="relative flex h-11 w-11 items-center justify-center hover:bg-secondary"
              aria-label={`Kurv, ${itemCount} varer`}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center bg-coral px-1 text-[11px] font-bold text-coral-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav
          aria-label="Hovedmenu"
          className="hidden border-t lg:block"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="container-wk flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} onMouseEnter={() => setActiveMenu(item.label)}>
                <Link
                  to={item.to}
                  className={`flex h-12 items-center border-b-2 px-3 text-sm font-bold transition-colors ${
                    activeMenu === item.label
                      ? "border-coral text-coral"
                      : "border-transparent hover:border-coral"
                  } ${item.label === "Tilbud" ? "text-coral" : ""}`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
          {activeMenu && activeMenu !== "Tilbud" && (
            <MegaMenu
              activeLabel={activeMenu}
              onClose={() => setActiveMenu(null)}
            />
          )}
        </nav>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenuDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
