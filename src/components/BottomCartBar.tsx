import { Link, useRouterState } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD_MINOR } from "@/services/storeApi";

export function BottomCartBar() {
  const { items, itemCount, subtotalMinor, openMiniCart } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (itemCount === 0) return null;
  if (pathname === "/kurv" || pathname === "/checkout") return null;

  const progress = Math.min(1, subtotalMinor / FREE_SHIPPING_THRESHOLD_MINOR);
  const missing = FREE_SHIPPING_THRESHOLD_MINOR - subtotalMinor;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-card">
      <div className="h-1 bg-secondary">
        <div className="h-full bg-leaf transition-all" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="container-wk flex items-center gap-3 py-2.5">
        <div className="hidden items-center sm:flex">
          {items.slice(0, 3).map((i) => (
            <img
              key={i.id}
              src={i.image}
              alt=""
              width={36}
              height={36}
              loading="lazy"
              className="-ml-1.5 h-9 w-9 border bg-card object-contain first:ml-0"
            />
          ))}
          {items.length > 3 && (
            <span className="-ml-1.5 flex h-9 w-9 items-center justify-center border bg-secondary text-xs font-bold">
              +{items.length - 3}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold md:text-sm">
            {itemCount} {itemCount === 1 ? "vare" : "varer"} ·{" "}
            <span className="font-display font-extrabold">{formatPrice(subtotalMinor)}</span>
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            {missing > 0
              ? `Køb for ${formatPrice(missing)} mere og få fri fragt`
              : "Du har fri fragt 🎉"}
          </p>
        </div>
        <button type="button" onClick={openMiniCart} className="text-xs font-semibold underline underline-offset-2">
          Se kurv
        </button>
        <Link to="/checkout" className="btn-base btn-coral text-xs md:text-sm">
          Gå til betaling
        </Link>
      </div>
    </div>
  );
}
