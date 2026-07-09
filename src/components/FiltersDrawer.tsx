import { X } from "lucide-react";

export interface FilterState {
  age?: string;
  price?: string;
  situation?: string;
  neutral?: string;
  giftable?: boolean;
  onSale?: boolean;
  inStock?: boolean;
}

export const AGE_OPTIONS = ["0–1 år", "1–3 år", "3–6 år", "6–9 år", "9+ år"];
export const PRICE_OPTIONS = ["Under 100 kr.", "100–200 kr.", "200–500 kr.", "Over 500 kr."];
export const SITUATION_OPTIONS = [
  "Hverdag",
  "Gave",
  "Skolestart",
  "Kreativ leg",
  "Udendørs",
  "Rejse",
];
export const NEUTRAL_OPTIONS = ["Neutral", "Pige", "Dreng"];

export function priceRangeFromLabel(label?: string): { min?: number; max?: number } {
  switch (label) {
    case "Under 100 kr.":
      return { max: 100 };
    case "100–200 kr.":
      return { min: 100, max: 200 };
    case "200–500 kr.":
      return { min: 200, max: 500 };
    case "Over 500 kr.":
      return { min: 500 };
    default:
      return {};
  }
}

interface FiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}

function OptionGroup({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: string[];
  value?: string;
  onSelect: (v?: string) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow-wk mb-2">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(value === opt ? undefined : opt)}
            className={`chip-wk min-h-10 ${value === opt ? "border-ink bg-sun" : ""}`}
            aria-pressed={value === opt}
          >
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function FiltersDrawer({ open, onClose, filters, onChange, onReset }: FiltersDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filtre">
      <button type="button" aria-label="Luk filtre" className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-card">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <p className="font-display text-lg font-extrabold">Filtrér</p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center hover:bg-secondary"
            aria-label="Luk filtre"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          <OptionGroup
            label="Alder"
            options={AGE_OPTIONS}
            value={filters.age}
            onSelect={(v) => onChange({ ...filters, age: v })}
          />
          <OptionGroup
            label="Pris"
            options={PRICE_OPTIONS}
            value={filters.price}
            onSelect={(v) => onChange({ ...filters, price: v })}
          />
          <OptionGroup
            label="Brugssituation"
            options={SITUATION_OPTIONS}
            value={filters.situation}
            onSelect={(v) => onChange({ ...filters, situation: v })}
          />
          <OptionGroup
            label="Køn / neutralitet"
            options={NEUTRAL_OPTIONS}
            value={filters.neutral}
            onSelect={(v) => onChange({ ...filters, neutral: v })}
          />

          <fieldset className="space-y-2">
            <legend className="eyebrow-wk mb-2">Andet</legend>
            {[
              { key: "giftable" as const, label: "Gaveegnet" },
              { key: "onSale" as const, label: "På tilbud" },
              { key: "inStock" as const, label: "På lager" },
            ].map(({ key, label }) => (
              <label key={key} className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(filters[key])}
                  onChange={(e) => onChange({ ...filters, [key]: e.target.checked || undefined })}
                  className="h-5 w-5 accent-[#FF6B5F]"
                />
                <span className="text-sm font-semibold">{label}</span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className="flex gap-2 border-t p-4">
          <button type="button" onClick={onReset} className="btn-base btn-outline-ink flex-1 text-xs">
            Nulstil
          </button>
          <button type="button" onClick={onClose} className="btn-base btn-coral flex-1 text-xs">
            Vis resultater
          </button>
        </div>
      </div>
    </div>
  );
}
