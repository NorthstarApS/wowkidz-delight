import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "@/services/woocommerce";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug({ data: { slug } }),
    staleTime: 5 * 60_000,
    enabled: Boolean(slug),
  });
}
