import { Link } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { FOOTER_CATEGORY_LINKS } from "@/lib/navigation";

const SERVICE_LINKS = [
  { label: "Kontakt", to: "/kontakt" },
  { label: "FAQ", to: "/faq" },
  { label: "Levering & returnering", to: "/levering-returnering" },
  { label: "Handelsbetingelser", to: "/handelsbetingelser" },
  { label: "Privatlivspolitik", to: "/privatlivspolitik" },
  { label: "Cookiepolitik", to: "/cookiepolitik" },
  { label: "Om os", to: "/om-os" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container-wk grid gap-10 py-12 md:grid-cols-4 md:py-16">
        <div className="space-y-3 md:col-span-1">
          <p className="font-display text-xl font-extrabold">
            Wow<span className="text-coral">Kidz</span>.dk
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            WowKidz.dk er en dansk webshop for børnefamilier med legetøj, babyudstyr, læring,
            skolestart og praktiske produkter til hverdagen.
          </p>
        </div>

        <nav aria-label="Kundeservice">
          <p className="eyebrow-wk mb-3">Kundeservice</p>
          <ul className="space-y-2">
            {SERVICE_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Kategorier">
          <p className="eyebrow-wk mb-3">Kategorier</p>
          <ul className="space-y-2">
            {FOOTER_CATEGORY_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" className="text-sm font-semibold hover:underline">
                Se alle produkter
              </Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-4">
          <p className="eyebrow-wk">Nyhedsbrev</p>
          <p className="text-sm text-muted-foreground">
            Gaveidéer, skolestartstips og nye familiefund — direkte i indbakken.
          </p>
          <Link to="/" hash="nyhedsbrev" className="btn-base btn-sun text-xs">
            Tilmeld nyhedsbrev
          </Link>
          <div className="flex items-center gap-2 pt-2 text-muted-foreground" aria-label="Betalingsmuligheder">
            <CreditCard className="h-5 w-5" aria-hidden />
            <span className="text-xs">Visa · Mastercard · MobilePay</span>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container-wk flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} WowKidz.dk — alt til børn, baby og familieliv</p>
          <p>WowKidz.dk ejes af Viniko</p>
        </div>
      </div>
    </footer>
  );
}
