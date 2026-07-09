import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, priceParts } from "@/lib/format";
import { useProducts } from "@/hooks/useProducts";

export function MiniCartDrawer() {
  const {
    items,
    itemCount,
    subtotalMinor,
    isMiniCartOpen,
    closeMiniCart,
    updateQuantity,
    removeItem,
    coupon,
    setCoupon,
  } = useCart();

  const { data: addonData } = useProducts(
    { per_page: 3, orderby: "popularity" },
    isMiniCartOpen,
  );
  const addons = addonData?.products.filter((p) => !items.some((i) => i.id === p.id)).slice(0, 2);

  if (!isMiniCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Kurv">
      <button type="button" aria-label="Luk kurv" className="absolute inset-0 bg-ink/50" onClick={closeMiniCart} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <p className="font-display text-lg font-extrabold">
            Din kurv ({itemCount})
          </p>
          <button
            type="button"
            onClick={closeMiniCart}
            className="flex h-11 w-11 items-center justify-center hover:bg-secondary"
            aria-label="Luk kurv"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="font-display font-bold">Din kurv er tom</p>
              <p className="text-sm text-muted-foreground">
                Find noget hyggeligt til børnene — vi hjælper gerne.
              </p>
              <Link to="/shop" onClick={closeMiniCart} className="btn-base btn-coral text-xs">
                Shop nu
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 border p-2.5">
                  <img
                    src={item.image}
                    alt=""
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-16 w-16 shrink-0 border object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/produkt/$slug"
                      params={{ slug: item.slug }}
                      onClick={closeMiniCart}
                      className="line-clamp-2 text-sm font-semibold hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 font-display text-sm font-extrabold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center hover:bg-secondary"
                          aria-label="Én mindre"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center hover:bg-secondary"
                          aria-label="Én mere"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:bg-secondary hover:text-destructive"
                        aria-label={`Fjern ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && addons && addons.length > 0 && (
            <div className="mt-6">
              <p className="eyebrow-wk mb-2">Måske mangler du også</p>
              <ul className="space-y-2">
                {addons.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/produkt/$slug"
                      params={{ slug: p.slug }}
                      onClick={closeMiniCart}
                      className="flex items-center gap-3 border p-2 hover:bg-secondary"
                    >
                      {p.images[0] && (
                        <img
                          src={p.images[0].thumbnail || p.images[0].src}
                          alt=""
                          width={40}
                          height={40}
                          loading="lazy"
                          className="h-10 w-10 border object-contain"
                        />
                      )}
                      <span className="min-w-0 flex-1 truncate text-xs font-semibold">{p.name}</span>
                      <span className="font-display text-xs font-extrabold">
                        {priceParts(p.prices).price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t p-4">
            <div className="flex gap-2">
              <label htmlFor="mini-coupon" className="sr-only">
                Rabatkode
              </label>
              <input
                id="mini-coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Rabatkode"
                className="min-h-11 flex-1 border bg-background px-3 text-sm outline-none focus:border-ink"
              />
              <button type="button" className="btn-base btn-outline-ink text-xs">
                Anvend
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Subtotal</span>
              <span className="font-display text-lg font-extrabold">
                {formatPrice(subtotalMinor)}
              </span>
            </div>
            <Link to="/checkout" onClick={closeMiniCart} className="btn-base btn-coral w-full">
              Gå til betaling
            </Link>
            <Link
              to="/kurv"
              onClick={closeMiniCart}
              className="block text-center text-sm font-semibold underline underline-offset-2"
            >
              Se kurv
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
