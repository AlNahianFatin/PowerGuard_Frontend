
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { payServiceRequest } from "@/api";

export function usePayServiceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payServiceRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["my-assignments"] });
    },
  });
}