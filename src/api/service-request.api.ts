import apiClient from "@/lib/apiClient";
import type { ApiResponse, CancelRequestParams, RejectRequestPayload, ServiceRequest, ServiceRequestParams, SubmitRequestPayload } from "@/types";

export function submitRequest(payload: SubmitRequestPayload) {
  return apiClient("/request/submit-request", {
    method: "POST",
    body: payload,
  });
}

export function getServiceRequests(params: ServiceRequestParams) {
  return apiClient<ApiResponse<ServiceRequest[]>>("/request/all-requests", {
    params,
  });
}

export function getMyServiceRequests(params: ServiceRequestParams) {
  return apiClient<ApiResponse<ServiceRequest[]>>("/request/my-requests", {
    params,
  });
}

export function cancelRequest({ requestId }: CancelRequestParams) {
  return apiClient(`/request/cancel-request/${requestId}`, {
    method: "PATCH",
  });
}

export function rejectRequest(requestId: string, payload: RejectRequestPayload) {
  return apiClient(`/request/reject-request/${requestId}`, {
    method: "PATCH",
    body: payload,
  });
}