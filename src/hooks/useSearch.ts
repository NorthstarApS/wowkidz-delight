import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchSuggestions } from "@/services/searchApi";

export function useSearch(query: string) {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const enabled = debounced.trim().length >= 2;

  const result = useQuery({
    queryKey: ["search-suggestions", debounced],
    queryFn: () => fetchSearchSuggestions({ data: { query: debounced, limit: 6 } }),
    staleTime: 60_000,
    enabled,
  });

  return { ...result, enabled, debounced };
}
