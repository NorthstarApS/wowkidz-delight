import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD_MINOR } from "@/services/storeApi";
import { TrustBar } from "@/components/TrustBar";
import { CategoryHero } from "@/components/CategoryHero";

export const Route = createFileRoute("/kurv")({
  head: () => ({
    meta: [
      { title: "Din kurv | WowKidz.dk" },
      { name: "description", content: "Se din kurv og gå til betaling hos WowKidz.dk." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, itemCount, subtotalMinor, updateQuantity, removeItem, coupon, setCoupon } =
    useCart();

  const missing = FREE_SHIPPING_THRESHOLD_MINOR - subtotalMinor;

  return (
    <div>
      <CategoryHero
        eyebrow={`${itemCount} ${itemCount === 1 ? "vare" : "varer"}`}
        title="Din kurv"
        crumbs={[{ label: "Kurv" }]}
      />

      <div className="container-wk py-8">
        {items.length === 0 ? (
          <div className="card-sharp flex flex-col items-center gap-3 p-12 text-center">
            <p className="font-display text-lg font-bold">Din kurv er tom</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Find noget hyggeligt til børnene — start med det populære.
            </p>
            <Link to="/shop" className="btn-base btn-coral">
              Shop nu
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <ul className="space-y-3 lg:col-span-2">
              {items.map((item) => (
                <li key={item.id} className="card-sharp flex gap-4 p-3 md:p-4">
                  <img
                    src={item.image}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 border object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/produkt/$slug"
                      params={{ slug: item.slug }}
                      className="line-clamp-2 text-sm font-bold hover:underline md:text-base"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatPrice(item.price)} pr. stk.
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-10 w-10 items-center justify-center hover:bg-secondary"
                          aria-label="Én mindre"
                        >
                          <Minus className="h-4 w-4" aria-hidden />
                        </button>
                        <span className="w-9 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-10 w-10 items-center justify-center hover:bg-secondary"
                          aria-label="Én mere"
                        >
                          <Plus className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                        Fjern
                      </button>
                      <span className="ml-auto font-display font-extrabold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="card-sharp h-fit space-y-4 border-2 border-ink p-4 md:p-5">
              <h2 className="text-lg">Oversigt</h2>
              <div className="flex gap-2">
                <label htmlFor="cart-coupon" className="sr-only">
                  Rabatkode
                </label>
                <input
                  id="cart-coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Rabatkode"
                  className="min-h-11 flex-1 border bg-background px-3 text-sm outline-none focus:border-ink"
                />
                <button type="button" className="btn-base btn-outline-ink text-xs">
                  Anvend
                </button>
              </div>
              <div className="space-y-1.5 border-t pt-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatPrice(subtotalMinor)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Fragt</span>
                  <span>{missing > 0 ? "Beregnes ved betaling" : "Fri fragt 🎉"}</span>
                </div>
              </div>
              {missing > 0 && (
                <p className="bg-sun px-3 py-2 text-xs font-semibold">
                  Køb for {formatPrice(missing)} mere og få fri fragt
                </p>
              )}
              <div className="flex justify-between border-t pt-3">
                <span className="font-display font-extrabold">I alt</span>
                <span className="font-display text-lg font-extrabold">
                  {formatPrice(subtotalMinor)}
                </span>
              </div>
              <Link to="/checkout" className="btn-base btn-coral min-h-12 w-full">
                Gå til betaling
              </Link>
              <Link to="/shop" className="block text-center text-sm underline underline-offset-2">
                Fortsæt med at shoppe
              </Link>
            </aside>
          </div>
        )}
      </div>
      <TrustBar />
    </div>
  );
}
