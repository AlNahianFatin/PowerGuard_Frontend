
import {
  useQuery,
} from "@tanstack/react-query";
import { getOperatorAnalytics } from "@/api";

export function useGetOperatorAnalytics() {
  return useQuery({
    queryKey: ["operator-analytics"],
    queryFn: () => getOperatorAnalytics(),
  });
}