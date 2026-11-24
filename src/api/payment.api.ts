import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  PayServiceRequestPayload,
  PayServiceRequestResponse,
} from "@/types";

export function payServiceRequest(payload: PayServiceRequestPayload) {
  return apiClient<ApiResponse<PayServiceRequestResponse>>(
    "/payment/pay-service-request",
    {
      method: "POST",
      body: payload
    });
}