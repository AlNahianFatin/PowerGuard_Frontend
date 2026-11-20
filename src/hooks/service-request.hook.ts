import { cancelRequest, getMyServiceRequests, getServiceRequests, rejectRequest, submitRequest } from "@/api/service-request.api";
import type { CancelRequestParams, RejectRequestPayload, ServiceRequestParams } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function useSubmitRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["service-requests"] });
            queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
        },
    });
}

export function useSuspenseGetServiceRequest(params: ServiceRequestParams) {
    return useSuspenseQuery({
        queryKey: ["service-requests", params],
        queryFn: () => getServiceRequests(params),
    });
}

export function useGetServiceRequest(params: ServiceRequestParams) {
    return useQuery({
        queryKey: ["service-requests", params],
        queryFn: () => getServiceRequests(params),
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
            queryClient.invalidateQueries({ queryKey: ["service-requests"] });
            queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
        },
    });
}

interface RejectRequestVariables {
    requestId: string;
    payload: RejectRequestPayload;
}

export function useRejectRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ requestId, payload }: RejectRequestVariables) =>
            rejectRequest(requestId, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["service-requests"] });
            queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
        },
    });
}