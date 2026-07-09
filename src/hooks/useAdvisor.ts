/**
 * AI advisor hook — UI-ready, integration-ready.
 * Today it answers with curated product matches from the live catalogue;
 * the `askAdvisor` transport can later be pointed at a real AI backend
 * receiving { shop: "wowkidz.dk", prompt }.
 */
import { useCallback, useState } from "react";
import { fetchSearchSuggestions } from "@/services/searchApi";
import type { AdvisorMessage } from "@/lib/types";

const KEYWORD_MAP: [RegExp, string][] = [
  [/skolestart|skole|madkasse|penalhus/i, "skole"],
  [/baby|småbørn|motorik/i, "baby"],
  [/kreativ|tegn|mal|perle/i, "kreativ"],
  [/lær|læring|tal|bogstav/i, "læring"],
  [/gave|fødselsdag/i, "legetøj"],
  [/tøj/i, "tøj"],
];

function deriveSearchTerm(prompt: string): string {
  for (const [re, term] of KEYWORD_MAP) {
    if (re.test(prompt)) return term;
  }
  return "legetøj";
}

export function useAdvisor() {
  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ask = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setIsLoading(true);
    try {
      // Integration point: replace with AI backend call —
      // POST { shop: "wowkidz.dk", prompt } → recommendations.
      const term = deriveSearchTerm(prompt);
      const products = await fetchSearchSuggestions({ data: { query: term, limit: 4 } });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            products.length > 0
              ? "Hvis du leder efter noget, der både er sjovt og nemt at vælge, ville jeg starte her."
              : "Jeg fandt ikke et oplagt match — prøv at beskrive alder eller interesse, så leder jeg videre.",
          products,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => setMessages([]), []);

  return { messages, isLoading, ask, reset };
}
