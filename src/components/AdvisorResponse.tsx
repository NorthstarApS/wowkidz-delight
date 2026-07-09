import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import type { AdvisorMessage } from "@/lib/types";
import { priceParts, stripHtml } from "@/lib/format";
import { useCart } from "@/context/CartContext";

interface AdvisorResponseProps {
  message: AdvisorMessage;
  followUps: string[];
  onFollowUp: (chip: string) => void;
}

export function AdvisorResponse({ message, followUps, onFollowUp }: AdvisorResponseProps) {
  const { addProduct } = useCart();

  return (
    <div className="space-y-3 border-t pt-3">
      <p className="text-sm italic text-muted-foreground">“{message.text}”</p>

      {message.products && message.products.length > 0 && (
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {message.products.map((p) => {
            const { price } = priceParts(p.prices);
            const reason = stripHtml(p.short_description).split(".")[0];
            return (
              <li key={p.id} className="card-sharp flex flex-col">
                <Link
                  to="/produkt/$slug"
                  params={{ slug: p.slug }}
                  className="block aspect-square bg-secondary"
                >
                  {p.images[0] && (
                    <img
                      src={p.images[0].src}
                      alt={p.images[0].alt || p.name}
                      loading="lazy"
                      width={300}
                      height={300}
                      className="h-full w-full object-contain"
                    />
                  )}
                </Link>
                <div className="flex flex-1 flex-col gap-1 p-2">
                  <Link
                    to="/produkt/$slug"
                    params={{ slug: p.slug }}
                    className="line-clamp-2 text-xs font-bold hover:underline"
                  >
                    {p.name}
                  </Link>
                  {reason && (
                    <p className="line-clamp-2 text-[11px] text-muted-foreground">{reason}.</p>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-1 pt-1">
                    <span className="font-display text-sm font-extrabold">{price}</span>
                    <button
                      type="button"
                      onClick={() => addProduct(p)}
                      className="flex h-9 w-9 items-center justify-center bg-coral text-coral-foreground hover:bg-coral/90"
                      aria-label={`Læg ${p.name} i kurv`}
                    >
                      <ShoppingCart className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5">
        {followUps.map((chip) => (
          <button key={chip} type="button" className="chip-wk" onClick={() => onFollowUp(chip)}>
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
