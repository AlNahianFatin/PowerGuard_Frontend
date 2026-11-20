import { cancelRequest, getMyServiceRequests, submitRequest } from "@/api/service-request.api";
import type { CancelRequestParams, ServiceRequestParams } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function useSubmitRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-service-requests", "service-requests"] });
        },
    });
}

export function useSuspenseGetMyServiceRequest(params: ServiceRequestParams) {
    return useSuspenseQuery({
        queryKey: ["my-service-requests", params],
        queryFn: () => getMyServiceRequests(params),
    });
}

export function useGetMyServiceRequest(params: ServiceRequestParams) {
    return useQuery({
        queryKey: ["my-service-requests", params],
        queryFn: () => getMyServiceRequests(params),
    });
}

export function useCancelRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CancelRequestParams) => cancelRequest(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
            queryClient.invalidateQueries({ queryKey: ["service-requests"] });
        },
    });
}