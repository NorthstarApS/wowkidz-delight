import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchCategoryBySlug } from "@/services/woocommerce";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories({ data: {} }),
    staleTime: 30 * 60_000,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => fetchCategoryBySlug({ data: { slug } }),
    staleTime: 30 * 60_000,
    enabled: Boolean(slug),
  });
}
