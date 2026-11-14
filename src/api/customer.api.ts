import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CustomerAnalyticsResponse,
} from "@/types";

export function getCustomerAnalytics() {
  return apiClient<ApiResponse<CustomerAnalyticsResponse>>("/analytics/customer-analytics");
}