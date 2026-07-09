import { Flag, HandCoins, Truck, Undo2, Headset } from "lucide-react";

const ITEMS = [
  { icon: Flag, label: "Dansk webshop" },
  { icon: HandCoins, label: "Fair priser" },
  { icon: Truck, label: "Levering typisk 3–6 dage" },
  { icon: Undo2, label: "Nem retur" },
  { icon: Headset, label: "Kundeservice på dansk" },
];

export function TrustBar() {
  return (
    <section aria-label="Tryghed" className="border-y bg-card">
      <div className="container-wk grid grid-cols-2 gap-x-4 gap-y-3 py-4 sm:grid-cols-3 md:grid-cols-5">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0 text-sky" aria-hidden />
            <span className="text-xs font-semibold md:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
