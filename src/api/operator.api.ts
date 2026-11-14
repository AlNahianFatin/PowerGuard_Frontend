import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  OperatorAnalyticsResponse,
} from "@/types";

export function getOperatorAnalytics() {
  return apiClient<ApiResponse<OperatorAnalyticsResponse>>("/analytics/operator-analytics");
}