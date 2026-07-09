import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PartyPopper } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ProductRail } from "@/components/ProductRail";

export const Route = createFileRoute("/tak-for-din-ordre")({
  head: () => ({
    meta: [
      { title: "Tak for din ordre | WowKidz.dk" },
      { name: "description", content: "Tak for din ordre hos WowKidz.dk — vi pakker med det samme." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div>
      <section className="border-b bg-sun">
        <div className="container-wk flex flex-col items-center gap-4 py-16 text-center md:py-24">
          <PartyPopper className="h-10 w-10" aria-hidden />
          <h1 className="text-3xl md:text-4xl">Tak for din ordre! 🎈</h1>
          <p className="max-w-md text-sm md:text-base">
            Vi pakker dine varer med det samme. Du får en mail med ordrebekræftelse og
            track & trace, så snart pakken er på vej.
          </p>
          <div className="flex gap-2">
            <Link to="/shop" className="btn-base btn-ink">
              Shop videre
            </Link>
            <Link to="/kontakt" className="btn-base btn-outline-ink">
              Kontakt os
            </Link>
          </div>
        </div>
      </section>
      <ProductRail title="Måske til næste gang" params={{ orderby: "popularity" }} accent="coral" />
    </div>
  );
}
