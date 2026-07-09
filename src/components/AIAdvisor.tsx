import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useAdvisor } from "@/hooks/useAdvisor";
import { AdvisorResponse } from "./AdvisorResponse";

const QUICK_CHIPS = [
  "Gave til barn",
  "Skolestart",
  "Kreativ leg",
  "Babyudstyr",
  "Læring",
  "Motorik",
  "Praktisk hverdag",
  "Under 200 kr.",
];

const FOLLOW_UP_CHIPS = [
  "Vis billigere",
  "Til yngre barn",
  "Til ældre barn",
  "Mere kreativt",
  "Mere praktisk",
  "Til gave",
  "Til skolestart",
];

export function AIAdvisor({ compact = false }: { compact?: boolean }) {
  const { messages, isLoading, ask } = useAdvisor();
  const [input, setInput] = useState("");
  const lastAnswer = [...messages].reverse().find((m) => m.role === "assistant");

  const submit = (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput("");
    void ask(text);
  };

  return (
    <section
      aria-label="Gaverådgiver"
      className={`card-sharp border-2 border-ink ${compact ? "" : "shadow-[6px_6px_0_0_var(--color-sun)]"}`}
    >
      <div className="space-y-3 p-4 md:p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center bg-sun">
            <Sparkles className="h-4 w-4" aria-hidden />
          </span>
          <h2 className="font-display text-lg font-extrabold md:text-xl">
            Hvad leder du efter til barnet?
          </h2>
        </div>

        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
        >
          <label htmlFor="advisor-input" className="sr-only">
            Beskriv hvad du leder efter
          </label>
          <input
            id="advisor-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fx: Jeg skal finde en gave til en 6-årig der elsker kreativ leg"
            className="min-h-12 flex-1 border-2 border-ink bg-background px-3 text-sm outline-none focus:border-sky"
          />
          <button type="submit" disabled={isLoading} className="btn-base btn-ink min-h-12">
            {isLoading ? "Finder idéer…" : "Få forslag"}
          </button>
        </form>

        <div className="flex flex-wrap gap-1.5">
          {QUICK_CHIPS.map((chip) => (
            <button key={chip} type="button" className="chip-wk" onClick={() => submit(chip)}>
              {chip}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="space-y-2 pt-1" aria-busy="true">
            <div className="skeleton-wk h-4 w-2/3" />
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-wk aspect-[3/4]" />
              ))}
            </div>
          </div>
        )}

        {!isLoading && lastAnswer && (
          <AdvisorResponse
            message={lastAnswer}
            followUps={FOLLOW_UP_CHIPS}
            onFollowUp={(chip) => submit(chip)}
          />
        )}
      </div>
    </section>
  );
}
