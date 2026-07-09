import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { buildCheckoutHandoverUrl } from "@/services/storeApi";
import { TrustBar } from "@/components/TrustBar";
import { CategoryHero } from "@/components/CategoryHero";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Betaling | WowKidz.dk" },
      { name: "description", content: "Gennemfør dit køb sikkert hos WowKidz.dk." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, itemCount, subtotalMinor } = useCart();

  return (
    <div>
      <CategoryHero eyebrow="Sikker betaling" title="Betaling" crumbs={[{ label: "Betaling" }]} />

      <div className="container-wk py-8">
        {items.length === 0 ? (
          <div className="card-sharp flex flex-col items-center gap-3 p-12 text-center">
            <p className="font-display text-lg font-bold">Din kurv er tom</p>
            <Link to="/shop" className="btn-base btn-coral">
              Shop nu
            </Link>
          </div>
        ) : (
          <div className="mx-auto max-w-xl space-y-5">
            <ul className="divide-y border">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 p-3">
                  <img
                    src={item.image}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-12 w-12 border object-contain"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-display text-sm font-extrabold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between p-3">
                <span className="font-display font-extrabold">
                  I alt ({itemCount} {itemCount === 1 ? "vare" : "varer"})
                </span>
                <span className="font-display text-lg font-extrabold">
                  {formatPrice(subtotalMinor)}
                </span>
              </li>
            </ul>

            <div className="card-sharp space-y-3 border-2 border-ink p-4 md:p-5">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-leaf" aria-hidden />
                <p className="text-sm font-bold">Du betaler sikkert via WowKidz.dk’s kasse</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Du sendes videre til vores sikre betalingsside, hvor du kan vælge levering og
                betale med kort eller MobilePay. Dine varer følger med.
              </p>
              <a
                href={buildCheckoutHandoverUrl(items)}
                className="btn-base btn-coral min-h-12 w-full"
              >
                Fortsæt til sikker betaling
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/kurv"
                className="block text-center text-sm underline underline-offset-2"
              >
                Tilbage til kurven
              </Link>
            </div>
          </div>
        )}
      </div>
      <TrustBar />
    </div>
  );
}
